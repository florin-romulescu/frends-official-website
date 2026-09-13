#!/usr/bin/env bash
set -euo pipefail

snapshot="${1:-latest}"

cd "$(dirname "$0")/.."
set -a
source .env
source backup/.env.backup
set +a

workdir="$(mktemp -d)"
trap 'rm -rf "$workdir"' EXIT

restic restore "$snapshot" --target "$workdir"
dump="$(find "$workdir" -name 'db-*.sql.gz' | sort | tail -n 1)"
uploads="$(find "$workdir" -type d -name uploads | head -n 1)"

gunzip -c "$dump" | docker compose exec -T db mariadb \
  --user="$DB_USER" --password="$DB_PASSWORD" "$DB_NAME"

docker compose cp "$uploads/." wordpress:/var/www/html/wp-content/uploads
docker compose exec -T wordpress chown -R www-data:www-data /var/www/html/wp-content/uploads
echo "restored $snapshot"
