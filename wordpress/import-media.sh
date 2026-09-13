#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
repo="$(cd .. && pwd)"
set -a
source .env
set +a

declare -A files=(
  [header_sky]="src/assets/img/sky.jpg"
  [hero_photo]="src/assets/img/hero-group.jpg"
  [about_photo]="src/assets/img/about-group.jpg"
  [goals_background]="src/assets/img/goals-bg.jpg"
  [impact_greenup]="src/assets/img/impact-greenup.jpg"
  [impact_poster]="src/assets/img/impact-poster.jpg"
  [impact_event]="src/assets/img/impact-event.jpg"
  [community_hero]="src/assets/img/community-hero.jpg"
  [community_comedy]="src/assets/img/community-comedy.jpg"
  [community_univibes]="src/assets/img/community-univibes.jpg"
  [community_band_background]="src/assets/img/community-band-bg.jpg"
  [community_steps_background]="src/assets/img/community-steps-bg.jpg"
  [projects_banner]="src/assets/img/projects-banner.jpg"
  [logo]="public/icons/logo.svg"
  [logo_footer]="public/icons/logo-footer.svg"
  [logo_mark]="public/icons/logo-mark.svg"
  [icon_facebook]="public/icons/facebook.svg"
  [icon_instagram]="public/icons/instagram.svg"
  [icon_tiktok]="public/icons/tiktok.svg"
  [icon_caret]="public/icons/caret.svg"
  [icon_arrow]="public/icons/arrow.png"
  [icon_help]="public/icons/help.png"
)

declare -A alts=(
  [hero_photo]="Voluntarii FRENDS adunați în fața cortului taberei de la Oarja"
  [about_photo]="Voluntarii FRENDS într-o sală de conferință la evenimentul din Predeal"
  [impact_greenup]="Voluntar FRENDS plantând un puiet într-o pădure"
  [impact_poster]="Vizitatori la standurile evenimentului Fii Artă"
  [impact_event]="Voluntari FRENDS la târgul de ONG-uri"
  [community_hero]="Voluntar FRENDS ținând o pancartă „I'm volunteer” la târgul Fii Voluntar"
  [community_comedy]="Scena Comedy Point la evenimentul Râsete la orice vârstă"
  [community_univibes]="Voluntari FRENDS la standul UniVibes discutând cu participanții"
  [logo]="FRENDS"
  [logo_footer]="FRENDS"
)

docker compose exec -T wordpress mkdir -p /var/www/html/import
for slot in "${!files[@]}"; do
  docker compose cp "$repo/${files[$slot]}" "wordpress:/var/www/html/import/$(basename "${files[$slot]}")" >/dev/null 2>&1
done

assignments=""
for slot in "${!files[@]}"; do
  name="$(basename "${files[$slot]}")"
  id="$(docker compose run --rm -T wpcli wp media import "/var/www/html/import/$name" \
    --title="$slot" --alt="${alts[$slot]:-}" --user="$WP_ADMIN_USER" --porcelain 2>/dev/null | tail -n 1)"
  echo "$slot -> attachment #$id ($name)"
  assignments+="update_field('$slot', $id, \$settings->ID);"
done

docker compose exec -T wordpress rm -rf /var/www/html/import

docker compose run --rm -T wpcli wp eval "
\$settings = get_posts(['post_type' => 'site_settings', 'numberposts' => 1])[0];
$assignments
echo 'Slots assigned to Setări site #' . \$settings->ID . PHP_EOL;
" 2>/dev/null | tail -n 1
