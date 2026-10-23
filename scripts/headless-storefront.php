<?php
/**
 * Plugin Name: Headless Storefront Integration
 * Description: Links WordPress login and admin bar back to the live customer storefront.
 */

add_filter( 'login_headerurl', function() {
    return 'https://abeautynfashion.com';
});

add_filter( 'login_headertext', function() {
    return 'Return to ABeauty & Fashion Storefront';
});
