#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
set -a
source .env
source backup/.env.backup
set +a

stamp="$(date +%Y%m%d-%H%M%S)"
workdir="$(mktemp -d)"
trap 'rm -rf "$workdir"' EXIT

docker compose exec -T db mariadb-dump \
  --user="$DB_USER" --password="$DB_PASSWORD" --single-transaction --quick \
  "$DB_NAME" | gzip > "$workdir/db-$stamp.sql.gz"

docker compose cp wordpress:/var/www/html/wp-content/uploads "$workdir/uploads"

restic backup "$workdir" --tag frends-cms --host frends-cms
restic forget --tag frends-cms --keep-daily 30 --keep-weekly 12 --keep-monthly 12 --prune
echo "backup $stamp done"
