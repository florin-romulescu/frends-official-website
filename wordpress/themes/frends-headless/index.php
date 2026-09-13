<?php
if (defined('FRENDS_SITE_URL') && FRENDS_SITE_URL !== '') {
    wp_redirect(FRENDS_SITE_URL, 302);
    exit;
}

status_header(404);
nocache_headers();
echo 'Acest domeniu găzduiește doar conținutul. Site-ul public este frends.ro.';
