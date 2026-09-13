<?php
/**
 * Plugin Name: FRENDS Headless
 * Description: Tipuri de conținut, declanșarea build-ului pentru frends.ro și întărirea securității pentru un WordPress folosit headless.
 * Version: 1.0.0
 * Author: Asociația FRENDS Pentru Dezvoltare
 */

declare(strict_types=1);

const FRENDS_SYNCED_POST_TYPES = ['post', 'event', 'project', 'partner', 'site_settings'];

add_action('init', static function (): void {
    register_post_type('event', [
        'labels' => frends_labels('Evenimente', 'Eveniment'),
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true,
        'rest_base' => 'events',
        'menu_position' => 5,
        'menu_icon' => 'dashicons-calendar-alt',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'revisions'],
        'rewrite' => ['slug' => 'evenimente'],
    ]);

    register_post_type('project', [
        'labels' => frends_labels('Proiecte', 'Proiect'),
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true,
        'rest_base' => 'projects',
        'menu_position' => 6,
        'menu_icon' => 'dashicons-portfolio',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'revisions'],
        'rewrite' => ['slug' => 'proiecte'],
    ]);

    register_post_type('partner', [
        'labels' => frends_labels('Parteneri', 'Partener'),
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true,
        'rest_base' => 'partners',
        'menu_position' => 7,
        'menu_icon' => 'dashicons-groups',
        'supports' => ['title', 'thumbnail'],
        'rewrite' => ['slug' => 'parteneri'],
    ]);

    register_post_type('site_settings', [
        'labels' => frends_labels('Setări site', 'Setări site'),
        'public' => true,
        'exclude_from_search' => true,
        'has_archive' => false,
        'show_in_rest' => true,
        'rest_base' => 'site-settings',
        'menu_position' => 8,
        'menu_icon' => 'dashicons-admin-settings',
        'supports' => ['title', 'revisions'],
    ]);
});

function frends_labels(string $plural, string $singular): array
{
    return [
        'name' => $plural,
        'singular_name' => $singular,
        'menu_name' => $plural,
        'all_items' => "Toate: $plural",
        'add_new' => 'Adaugă',
        'add_new_item' => "Adaugă $singular",
        'edit_item' => "Editează $singular",
        'new_item' => "$singular nou",
        'view_item' => "Vezi $singular",
        'search_items' => "Caută $plural",
        'not_found' => 'Nimic găsit',
        'not_found_in_trash' => 'Nimic în coș',
        'featured_image' => 'Imagine principală',
        'set_featured_image' => 'Alege imaginea principală',
        'remove_featured_image' => 'Elimină imaginea principală',
        'use_featured_image' => 'Folosește ca imagine principală',
    ];
}

add_action('transition_post_status', static function (string $new, string $old, WP_Post $post): void {
    if (!in_array($post->post_type, FRENDS_SYNCED_POST_TYPES, true)) {
        return;
    }
    if ($new !== 'publish' && $old !== 'publish') {
        return;
    }
    frends_trigger_build();
}, 10, 3);

add_action('deleted_post', static function (int $id, WP_Post $post): void {
    if (in_array($post->post_type, FRENDS_SYNCED_POST_TYPES, true)) {
        frends_trigger_build();
    }
}, 10, 2);

function frends_trigger_build(): void
{
    if (!defined('FRENDS_BUILD_HOOK_URL') || FRENDS_BUILD_HOOK_URL === '') {
        return;
    }
    static $fired = false;
    if ($fired) {
        return;
    }
    $fired = true;
    wp_remote_post(FRENDS_BUILD_HOOK_URL, ['blocking' => false, 'timeout' => 5]);
}

add_filter('xmlrpc_enabled', '__return_false');
add_action('init', static function (): void {
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH) ?? '';
    if (str_ends_with($path, '/xmlrpc.php')) {
        status_header(403);
        exit;
    }
}, 0);
add_filter('wp_headers', static function (array $headers): array {
    unset($headers['X-Pingback']);
    return $headers;
});

add_action('init', static function (): void {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_oembed_add_host_js');
    remove_action('wp_head', 'wp_generator');
});

add_filter('rest_endpoints', static function (array $endpoints): array {
    if (is_user_logged_in()) {
        return $endpoints;
    }
    unset($endpoints['/wp/v2/users'], $endpoints['/wp/v2/users/(?P<id>[\d]+)']);
    return $endpoints;
});

add_filter('login_errors', static fn(): string => 'Date de autentificare incorecte.');
