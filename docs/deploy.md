# Deployment

## Topology

| Host | Runs | Where |
|---|---|---|
| `cms.frends.ro` | WordPress (headless) behind Caddy, Docker Compose | Hetzner VPS `65.109.134.217`, `/opt/frends-website/wordpress` |
| `frends.ro` | The static Astro site | A static host (Cloudflare Pages / Netlify / Vercel) building from this repo |

The site is built from the CMS at build time; WordPress triggers a rebuild through `BUILD_HOOK_URL` on every publish and once a day (cron on the VPS) so date-derived statuses roll over.

## VPS (done once, reproducible)

Ubuntu 26.04 with `docker.io`, `docker-compose-v2`, `ufw` (22/80/443 only), `fail2ban` (sshd jail), unattended upgrades, `restic`. SSH: `ssh -i ~/.ssh/id_frends root@65.109.134.217`.

```
/opt/frends-website/wordpress/   the wordpress/ folder from this repo, synced by GitHub Actions
  .env                           production secrets (mode 600, not in git, never synced)
/etc/cron.d/frends-cms           03:30 backup (once backup/.env.backup exists), 04:00 build hook
```

### Updating the backend (CI/CD)

`.github/workflows/deploy-cms.yml` runs on every push to `main` that touches `wordpress/` (or the workflow itself):

1. **check** — `php -l` on every PHP file, `bash -n` on the scripts, `docker compose config` against `.env.example`. A broken file never reaches the server.
2. **deploy** — `rsync --delete` of `wordpress/` to `/opt/frends-website/wordpress` (`.env` and `backup/.env.backup` are excluded), then `wordpress/deploy.sh` on the VPS: `docker compose --profile prod up -d`, Caddy reload if the `Caddyfile` changed, PHP restart if `uploads.ini` changed, `setup.sh` (idempotent: plugins, options, theme), a REST health check, and a `BUILD_HOOK_URL` POST so the site rebuilds.

Theme, mu-plugin and ACF JSON are bind mounts, so most changes are live as soon as the files land. Secrets only change on the server: edit `.env` there and run `docker compose --profile prod up -d`.

GitHub settings the workflow needs (repo → Settings):

| Kind | Name | Value |
|---|---|---|
| Secret | `CMS_SSH_KEY` | private key of a dedicated ed25519 key whose public half is in `/root/.ssh/authorized_keys` on the VPS |
| Secret | `CMS_SSH_KNOWN_HOSTS` | `ssh-keyscan -t ed25519 65.109.134.217` output (pins the host key) |
| Variable | `CMS_HOST` | `65.109.134.217` |

Run it by hand from the Actions tab (*Deploy CMS → Run workflow*) or from a laptop:

```sh
rsync -rlpz --checksum --delete --itemize-changes --exclude .env --exclude backup/.env.backup \
  wordpress/ root@65.109.134.217:/opt/frends-website/wordpress/ | ssh root@65.109.134.217 /opt/frends-website/wordpress/deploy.sh
```

Monthly image updates: `docker compose --profile prod pull && docker compose --profile prod up -d` on the VPS.

## Going live — checklist

1. **DNS** (`frends.ro` zone):
   - `cms` → `A 65.109.134.217`. If the zone is on Cloudflare, proxy it (orange cloud) with SSL mode *Full (strict)* — Caddy still issues the origin certificate.
   - `@` / `www` → whatever the static host asks for (CNAME to the Pages/Netlify/Vercel target).
2. **TLS + proxy**: once `cms.frends.ro` resolves, on the VPS run
   `cd /opt/frends-website/wordpress && docker compose --profile prod up -d` — Caddy obtains the Let's Encrypt certificate automatically. Check with `curl -I https://cms.frends.ro/wp-json/`.
3. **Admin login**: `https://cms.frends.ro/wp-admin`, credentials in `/opt/frends-website/wordpress/.env` (`WP_ADMIN_USER` / `WP_ADMIN_PASSWORD`). Change the password from the profile page afterwards and create personal accounts for editors (role *Editor*).
4. **Static host**: connect the GitHub repo, build command `pnpm run build`, output directory `dist`, Node 22, environment variable `WP_API_URL=https://cms.frends.ro`. Create a deploy/build hook and paste its URL into `BUILD_HOOK_URL` in the VPS `.env`, then `docker compose --profile prod up -d` to apply.
5. **Backups**: `cp backup/.env.backup.example backup/.env.backup`, fill in an S3-compatible bucket (Backblaze B2 / Hetzner Storage Box), `restic init`, run `./backup/backup.sh` once by hand. The cron job starts using it automatically.
6. **Content**: the 22 image slots and the contact settings are already filled; events, projects, partners and posts are empty until authored (the site renders its empty states meanwhile).

## Local checks against production

The CMS port is bound to localhost on the VPS; a tunnel lets you build or inspect without DNS:

```sh
ssh -i ~/.ssh/id_frends -N -L 8081:127.0.0.1:8080 root@65.109.134.217 &
WP_API_URL=http://127.0.0.1:8081 pnpm run build
```

## Restore

`./backup/restore.sh [snapshot]` restores the database dump and `wp-content/uploads` into the running containers (see `docs/cms.md`).
