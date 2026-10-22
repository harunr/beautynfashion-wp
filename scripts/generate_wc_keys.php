<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$user_id = 1;
$description = 'Next.js Headless Frontend';
$permissions = 'read_write';
$consumer_key = 'ck_' . wc_rand_hash();
$consumer_secret = 'cs_' . wc_rand_hash();

global $wpdb;
$table = $wpdb->prefix . 'woocommerce_api_keys';

$wpdb->insert(
    $table,
    array(
        'user_id'         => $user_id,
        'description'     => $description,
        'permissions'     => $permissions,
        'consumer_key'    => wc_api_hash( $consumer_key ),
        'consumer_secret' => $consumer_secret,
        'truncated_key'   => substr( $consumer_key, -7 ),
    ),
    array( '%d', '%s', '%s', '%s', '%s', '%s' )
);

echo "WOO_CK=" . $consumer_key . "\n";
echo "WOO_CS=" . $consumer_secret . "\n";
