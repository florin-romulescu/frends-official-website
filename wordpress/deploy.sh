#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
set -a
source .env
set +a

if [ -t 0 ]; then
  changes=all
else
  changes="$(cat)"
fi

changed() {
  [ "$changes" = all ] || grep -q " $1\$" <<<"$changes"
}

chown -R 33:33 themes/frends-headless/acf-json

docker compose --profile prod up -d --remove-orphans

if changed Caddyfile; then
  docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
fi

if changed uploads.ini; then
  docker compose restart wordpress
fi

./setup.sh

curl -fsS --retry 5 --retry-delay 3 --retry-all-errors "$WP_HOME/wp-json/wp/v2/site-settings" >/dev/null
echo "CMS healthy at $WP_HOME"

if [ -n "${BUILD_HOOK_URL:-}" ]; then
  curl -fsS -X POST "$BUILD_HOOK_URL" >/dev/null
  echo "site rebuild triggered"
fi
