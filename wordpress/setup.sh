#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
set -a
source .env
set +a

wp() {
  docker compose run --rm -T wpcli wp "$@"
}

until wp db check >/dev/null 2>&1; do
  echo "waiting for the database..."
  sleep 3
done

if ! wp core is-installed >/dev/null 2>&1; then
  wp core install \
    --url="$WP_HOME" \
    --title="FRENDS CMS" \
    --admin_user="$WP_ADMIN_USER" \
    --admin_password="$WP_ADMIN_PASSWORD" \
    --admin_email="$WP_ADMIN_EMAIL" \
    --locale=ro_RO \
    --skip-email
  wp post delete $(wp post list --post_type=post,page --post_status=any --format=ids) --force
fi

wp language core install ro_RO --activate || true
wp option update WPLANG ro_RO
wp option update timezone_string Europe/Bucharest
wp option update date_format 'j F Y'
wp option update blogdescription 'Conținut pentru frends.ro'
wp option update blog_public 0
wp option update default_comment_status closed
wp option update default_ping_status closed
wp option update default_pingback_flag 0
wp rewrite structure '/%postname%/' --hard

wp plugin install advanced-custom-fields --activate
wp plugin install webp-uploads --activate
wp plugin delete hello akismet || true

wp theme activate frends-headless
for theme in $(wp theme list --status=inactive --field=name); do
  wp theme delete "$theme"
done

if [ "$(wp post list --post_type=site_settings --post_status=any --format=count)" = "0" ]; then
  wp post create --post_type=site_settings --post_title='Setări site' --post_status=publish
fi

wp rewrite flush --hard
echo "WordPress is ready at $WP_HOME/wp-admin"
