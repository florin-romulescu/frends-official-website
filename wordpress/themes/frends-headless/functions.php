<?php
add_action('after_setup_theme', static function (): void {
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_image_size('frends-card', 880, 0, false);
    add_image_size('frends-wide', 1400, 0, false);
});

add_filter('acf/settings/save_json', static fn(): string => get_stylesheet_directory() . '/acf-json');

add_filter('acf/settings/load_json', static function (array $paths): array {
    $paths[] = get_stylesheet_directory() . '/acf-json';
    return array_unique($paths);
});
