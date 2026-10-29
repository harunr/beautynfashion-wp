<?php
/**
 * Plugin Name: ABeauty & Fashion - Headless Store Customizer & ACF Fields
 * Description: Allows administrators to dynamically manage Announcement Bar, Header, Footer, Hero, Value Props, and Pages for the Next.js headless frontend.
 * Version: 1.1.0
 * Author: ABeauty & Fashion Dev Team
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class ABF_Store_Customizer {

    private $option_key = 'abf_store_settings';

    public function __construct() {
        add_action( 'after_setup_theme', [ $this, 'setup_theme_features' ] );
        add_action( 'admin_menu', [ $this, 'add_admin_menu' ] );
        add_action( 'admin_init', [ $this, 'register_settings' ] );
        add_action( 'rest_api_init', [ $this, 'register_rest_routes' ] );
        add_action( 'init', [ $this, 'register_default_pages_and_fields' ] );
        add_action( 'acf/init', [ $this, 'register_acf_field_groups' ] );
    }

    /**
     * Enable classic menus in block theme
     */
    public function setup_theme_features() {
        add_theme_support( 'menus' );
        register_nav_menus( [
            'primary' => 'Primary Navigation Menu',
            'footer'  => 'Footer Navigation Menu',
        ] );
    }

    /**
     * Add top-level menu in WP Admin
     */
    public function add_admin_menu() {
        add_menu_page(
            'Store Customizer',
            'Store Customizer',
            'manage_options',
            'abf-store-settings',
            [ $this, 'render_settings_page' ],
            'dashicons-admin-customizer',
            25
        );
    }

    /**
     * Default store settings fallback
     */
    public function get_default_settings() {
        return [
            // Announcement Bar
            'announcement_active' => '1',
            'announcement_text_en' => 'Eid Glow Collection 2026 — Up to 40% OFF',
            'announcement_text_bn' => 'ঈদ স্পেশাল বিউটি অফার ২০২৬ — ৪০% পর্যন্ত বিশেষ ছাড়',
            'announcement_link' => '/sale',

            // Header
            'header_logo_url' => 'https://abeautynfashion.com/logo.png',
            'header_hotline' => '+880 1712-377577',
            'header_search_placeholder_en' => 'Search serums, lipsticks, stylers…',
            'header_search_placeholder_bn' => 'সিরাম, লিপস্টিক, স্কিনকেয়ার খুঁজুন...',

            // Footer
            'footer_about_en' => 'ABeauty & Fashion is Bangladesh\'s premier destination for 100% authentic, luxury skincare, cosmetics, and fragrances.',
            'footer_about_bn' => 'এবিউটি অ্যান্ড ফ্যাশন বাংলাদেশে ১০০% খাঁটি ও আন্তর্জাতিক মানের প্রিমিয়াম বিউটি ও স্কিনকেয়ারের বিশ্বস্ত ঠিকানা।',
            'footer_newsletter_title_en' => 'Join the Glow Club',
            'footer_newsletter_title_bn' => 'গ্লো ক্লাবে যুক্ত হন',
            'footer_newsletter_sub_en' => 'Subscribe for early access to sales, skincare tips, and exclusive drops.',
            'footer_newsletter_sub_bn' => 'নতুন অফার, বিউটি টিপস ও বিশেষ ডিসকাউন্টের আপডেট সবার আগে পেতে সাবস্ক্রাইব করুন।',
            'footer_copyright' => '© ' . date('Y') . ' ABeauty & Fashion. All rights reserved.',
            'footer_trade_license' => 'TRAD/DSCC/042819/2024',
            'social_facebook' => 'https://facebook.com/abeautynfashion',
            'social_instagram' => 'https://instagram.com/abeautynfashion',
            'social_whatsapp' => '+8801811377577',
            'social_youtube' => 'https://youtube.com',

            // Homepage Hero
            'hero_eyebrow_en' => '100% Genuine Imported Brands',
            'hero_eyebrow_bn' => '১০০% খাঁটি আন্তর্জাতিক ব্র্যান্ড',
            'hero_title_prefix_en' => 'Beauty made ',
            'hero_title_accent_en' => 'effortless',
            'hero_title_suffix_en' => ', fashion made personal.',
            'hero_title_prefix_bn' => 'আপনার ত্বকের ',
            'hero_title_accent_bn' => 'নিখুঁত যত্ন',
            'hero_title_suffix_bn' => ' ও আসল আভিজাত্য।',
            'hero_subtitle_en' => 'Curated skincare, makeup, hair care, and beauty tools — clinically tested so you only buy what works.',
            'hero_subtitle_bn' => 'ডার্মাটোলজিস্ট পরীক্ষিত ও আসল বিউটি কালেকশন যা আপনার ত্বকের প্রাকৃতিক উজ্জ্বলতা ফিরিয়ে আনে।',
            'hero_cta_shop_text_en' => 'Shop the Collection',
            'hero_cta_shop_text_bn' => 'কালেকশন দেখুন',
            'hero_cta_shop_url' => '/shop',
            'hero_cta_routine_text_en' => 'Explore Rituals',
            'hero_cta_routine_text_bn' => 'স্কিনকেয়ার রুটিন',
            'hero_cta_routine_url' => '/journal',
            'hero_image_url' => 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=900&auto=format&fit=crop',

            // Trust Props
            'trust_1_title_en' => '100% Genuine Products',
            'trust_1_title_bn' => '১০০% আসল পণ্যের নিশ্চয়তা',
            'trust_1_desc_en' => 'Directly sourced from authorized brand distributors with batch verification.',
            'trust_1_desc_bn' => 'অনুমোদিত আন্তর্জাতিক ডিস্ট্রিবিউটর থেকে সরাসরি আমদানিকৃত পণ্য।',

            'trust_2_title_en' => 'Fast & Reliable Shipping',
            'trust_2_title_bn' => 'দ্রুততম হোম ডেলিভারি',
            'trust_2_desc_en' => '24-48h inside Dhaka, 3-4 days nationwide via premium couriers.',
            'trust_2_desc_bn' => 'ঢাকার ভেতরে ২৪-৪৮ ঘণ্টায় ও সারা বাংলাদেশে ৩-৪ দিনে ডেলিভারি।',

            'trust_3_title_en' => 'Dedicated Beauty Support',
            'trust_3_title_bn' => 'বিশেষজ্ঞদের পরামর্শ ও সহায়তা',
            'trust_3_desc_en' => 'Expert guidance from trained consultants for your skin and hair concerns.',
            'trust_3_desc_bn' => 'সঠিক প্রসাধন ও রুটিন নির্বাচনে সার্বক্ষণিক সহায়তা।',

            'trust_4_title_en' => 'Secure Checkout & COD',
            'trust_4_title_bn' => 'ক্যাশ অন ডেলিভারি ও নিরাপদ পেমেন্ট',
            'trust_4_desc_en' => 'Pay with cash upon receipt or via encrypted bKash / cards.',
            'trust_4_desc_bn' => 'পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা এবং বিকাশ পেমেন্ট।',

            // Navigation Menu
            'primary_menu' => [
                [ 'id' => 1, 'title' => 'Shop All', 'url' => '/shop' ],
                [ 'id' => 2, 'title' => 'Skincare', 'url' => '/category/skincare' ],
                [ 'id' => 3, 'title' => 'Makeup', 'url' => '/category/makeup' ],
                [ 'id' => 4, 'title' => 'Hair Care', 'url' => '/category/hair-care' ],
                [ 'id' => 5, 'title' => 'Beauty Tools', 'url' => '/category/beauty-tools' ],
                [ 'id' => 6, 'title' => 'Journal', 'url' => '/journal' ],
                [ 'id' => 7, 'title' => 'Sale', 'url' => '/sale' ],
            ],
        ];
    }

    /**
     * Get saved settings merged with defaults and WordPress live menu
     */
    public function get_settings() {
        $saved = get_option( $this->option_key, [] );
        $defaults = $this->get_default_settings();
        $merged = wp_parse_args( $saved, $defaults );

        // Fetch dynamic WordPress menu if available
        $locations = get_nav_menu_locations();
        $menu_id = $locations['primary'] ?? 0;
        if ( ! $menu_id ) {
            $nav_menu = wp_get_nav_menu_object( 'Main Header Menu' );
            if ( $nav_menu ) {
                $menu_id = $nav_menu->term_id;
            }
        }

        if ( $menu_id ) {
            $items = wp_get_nav_menu_items( $menu_id );
            if ( ! empty( $items ) ) {
                $nav = [];
                foreach ( $items as $item ) {
                    $nav[] = [
                        'id'    => (int) $item->ID,
                        'title' => $item->title,
                        'url'   => $item->url,
                    ];
                }
                $merged['primary_menu'] = $nav;
            }
        }

        return $merged;
    }

    /**
     * Register settings in WP
     */
    public function register_settings() {
        register_setting( 'abf_store_settings_group', $this->option_key );
    }

    /**
     * REST API Routes
     */
    public function register_rest_routes() {
        register_rest_route( 'abf/v1', '/store-settings', [
            'methods'  => 'GET',
            'callback' => function() {
                return rest_ensure_response( $this->get_settings() );
            },
            'permission_callback' => '__return_true',
        ] );

        register_rest_route( 'abf/v1', '/store-settings', [
            'methods'  => 'POST',
            'callback' => function( $request ) {
                $params = $request->get_json_params();
                if ( empty( $params ) ) {
                    return new WP_Error( 'invalid_data', 'No data provided', [ 'status' => 400 ] );
                }
                $current = $this->get_settings();
                $updated = array_merge( $current, $params );
                update_option( $this->option_key, $updated );
                return rest_ensure_response( [
                    'success' => true,
                    'message' => 'Settings saved successfully',
                    'settings' => $updated,
                ] );
            },
            'permission_callback' => function() {
                return current_user_can( 'manage_options' );
            },
        ] );

        // Contact & Support Chat Inquiries API
        register_rest_route( 'abf/v1', '/contact-inquiry', [
            'methods'  => 'POST',
            'callback' => [ $this, 'handle_contact_inquiry' ],
            'permission_callback' => '__return_true',
        ] );

        register_rest_route( 'abf/v1', '/inquiries', [
            'methods'  => 'GET',
            'callback' => function() {
                $inquiries = get_option( 'abf_customer_inquiries', [] );
                return rest_ensure_response( array_values( array_reverse( $inquiries ) ) );
            },
            'permission_callback' => function() {
                return current_user_can( 'manage_options' );
            },
        ] );

        // Customer Authentication & Account APIs
        register_rest_route( 'abf/v1', '/auth/login', [
            'methods'  => 'POST',
            'callback' => [ $this, 'handle_auth_login' ],
            'permission_callback' => '__return_true',
        ] );

        register_rest_route( 'abf/v1', '/auth/register', [
            'methods'  => 'POST',
            'callback' => [ $this, 'handle_auth_register' ],
            'permission_callback' => '__return_true',
        ] );

        register_rest_route( 'abf/v1', '/auth/forgot-password', [
            'methods'  => 'POST',
            'callback' => [ $this, 'handle_auth_forgot_password' ],
            'permission_callback' => '__return_true',
        ] );

        register_rest_route( 'abf/v1', '/auth/reset-password', [
            'methods'  => 'POST',
            'callback' => [ $this, 'handle_auth_reset_password' ],
            'permission_callback' => '__return_true',
        ] );

        register_rest_route( 'abf/v1', '/auth/me', [
            'methods'  => 'GET',
            'callback' => [ $this, 'handle_auth_me' ],
            'permission_callback' => '__return_true',
        ] );

        register_rest_route( 'abf/v1', '/auth/update-profile', [
            'methods'  => 'POST',
            'callback' => [ $this, 'handle_auth_update_profile' ],
            'permission_callback' => '__return_true',
        ] );

        register_rest_route( 'abf/v1', '/auth/orders', [
            'methods'  => 'GET',
            'callback' => [ $this, 'handle_auth_orders' ],
            'permission_callback' => '__return_true',
        ] );

        register_rest_route( 'abf/v1', '/checkout/place-order', [
            'methods'  => 'POST',
            'callback' => [ $this, 'handle_checkout_place_order' ],
            'permission_callback' => '__return_true',
        ] );

        register_rest_route( 'abf/v1', '/orders/track', [
            'methods'  => 'GET',
            'callback' => [ $this, 'handle_orders_track' ],
            'permission_callback' => '__return_true',
        ] );
    }

    /**
     * Handle incoming contact inquiries from storefront
     */
    public function handle_contact_inquiry( $request ) {
        $params = $request->get_json_params();
        if ( empty( $params ) ) {
            $params = $request->get_body_params();
        }

        $name = sanitize_text_field( $params['name'] ?? 'Website Visitor' );
        $phone = sanitize_text_field( $params['phone'] ?? '' );
        $email = sanitize_email( $params['email'] ?? '' );
        $subject = sanitize_text_field( $params['subject'] ?? 'New Customer Inquiry' );
        $message = sanitize_textarea_field( $params['message'] ?? '' );
        $source = sanitize_text_field( $params['source'] ?? 'contact-page' );

        if ( empty( $message ) && empty( $phone ) ) {
            return new WP_Error( 'missing_fields', 'Please provide a message or contact number', [ 'status' => 400 ] );
        }

        $inquiry = [
            'id'        => uniqid( 'inq_' ),
            'name'      => $name,
            'phone'     => $phone,
            'email'     => $email,
            'subject'   => $subject,
            'message'   => $message,
            'source'    => $source,
            'date'      => current_time( 'mysql' ),
            'status'    => 'new',
        ];

        $inquiries = get_option( 'abf_customer_inquiries', [] );
        if ( ! is_array( $inquiries ) ) {
            $inquiries = [];
        }
        $inquiries[] = $inquiry;
        if ( count( $inquiries ) > 200 ) {
            $inquiries = array_slice( $inquiries, -200 );
        }
        update_option( 'abf_customer_inquiries', $inquiries, false );

        // Send notification email to admin
        $admin_email = get_option( 'admin_email' );
        $email_subject = "[ABeauty & Fashion] New Inquiry: " . $name . " (" . $source . ")";
        $email_body = "You received a new inquiry from ABeauty & Fashion storefront:\n\n"
                    . "Name: " . $name . "\n"
                    . "Phone: " . $phone . "\n"
                    . "Email: " . $email . "\n"
                    . "Subject: " . $subject . "\n"
                    . "Source: " . $source . "\n"
                    . "Date: " . current_time( 'r' ) . "\n\n"
                    . "Message:\n" . $message . "\n\n"
                    . "---\n"
                    . "Reply directly via WhatsApp or view all in WordPress > Store Customizer > Customer Inquiries";

        wp_mail( $admin_email, $email_subject, $email_body );

        return rest_ensure_response( [
            'success' => true,
            'message' => 'Thank you! Your message has been received. Our beauty concierge will get in touch shortly.',
            'inquiry_id' => $inquiry['id'],
        ] );
    }

    /**
     * Generate secure stateless token for customer session
     */
    public function generate_auth_token( $user ) {
        $hash = wp_hash( $user->ID . '|' . $user->user_pass . '|' . wp_salt( 'auth' ) );
        return base64_encode( $user->ID . ':' . $hash );
    }

    /**
     * Verify customer auth token
     */
    public function verify_auth_token( $token ) {
        if ( empty( $token ) ) return false;
        $decoded = base64_decode( $token, true );
        if ( ! $decoded || strpos( $decoded, ':' ) === false ) return false;
        list( $user_id, $hash ) = explode( ':', $decoded, 2 );
        $user = get_user_by( 'id', (int) $user_id );
        if ( ! $user ) return false;
        $expected = wp_hash( $user->ID . '|' . $user->user_pass . '|' . wp_salt( 'auth' ) );
        if ( hash_equals( $expected, $hash ) ) {
            return $user;
        }
        return false;
    }

    /**
     * Format unified customer data object
     */
    public function format_customer_data( $user ) {
        $user_id = $user->ID;
        $first_name = get_user_meta( $user_id, 'first_name', true );
        $last_name  = get_user_meta( $user_id, 'last_name', true );
        $phone      = get_user_meta( $user_id, 'billing_phone', true );

        $billing = [
            'first_name' => $first_name ?: get_user_meta( $user_id, 'billing_first_name', true ),
            'last_name'  => $last_name ?: get_user_meta( $user_id, 'billing_last_name', true ),
            'phone'      => $phone,
            'email'      => $user->user_email,
            'address_1'  => get_user_meta( $user_id, 'billing_address_1', true ),
            'city'       => get_user_meta( $user_id, 'billing_city', true ),
            'state'      => get_user_meta( $user_id, 'billing_state', true ),
            'postcode'   => get_user_meta( $user_id, 'billing_postcode', true ),
            'country'    => get_user_meta( $user_id, 'billing_country', true ) ?: 'BD',
        ];

        $shipping = [
            'first_name' => get_user_meta( $user_id, 'shipping_first_name', true ) ?: $billing['first_name'],
            'last_name'  => get_user_meta( $user_id, 'shipping_last_name', true ) ?: $billing['last_name'],
            'address_1'  => get_user_meta( $user_id, 'shipping_address_1', true ) ?: $billing['address_1'],
            'city'       => get_user_meta( $user_id, 'shipping_city', true ) ?: $billing['city'],
            'state'      => get_user_meta( $user_id, 'shipping_state', true ) ?: $billing['state'],
            'postcode'   => get_user_meta( $user_id, 'shipping_postcode', true ) ?: $billing['postcode'],
            'country'    => get_user_meta( $user_id, 'shipping_country', true ) ?: 'BD',
        ];

        return [
            'id'          => $user_id,
            'name'        => trim( $user->display_name ?: ( $first_name . ' ' . $last_name ) ) ?: $user->user_login,
            'firstName'   => $first_name,
            'lastName'    => $last_name,
            'email'       => $user->user_email,
            'phone'       => $phone,
            'username'    => $user->user_login,
            'registered'  => $user->user_registered,
            'billing'     => $billing,
            'shipping'    => $shipping,
        ];
    }

    /**
     * REST: Handle customer login
     */
    public function handle_auth_login( $request ) {
        $params = $request->get_json_params() ?: $request->get_body_params();
        $identifier = sanitize_text_field( trim( $params['identifier'] ?? $params['email'] ?? '' ) );
        $password   = $params['password'] ?? '';

        if ( empty( $identifier ) || empty( $password ) ) {
            return new WP_Error( 'missing_fields', 'Please enter your email or phone and password.', [ 'status' => 400 ] );
        }

        $user = null;
        if ( is_email( $identifier ) ) {
            $user = get_user_by( 'email', $identifier );
        } else {
            $user = get_user_by( 'login', $identifier );
            if ( ! $user ) {
                $users = get_users( [
                    'meta_key'   => 'billing_phone',
                    'meta_value' => $identifier,
                    'number'     => 1,
                ] );
                if ( ! empty( $users ) ) {
                    $user = $users[0];
                }
            }
        }

        if ( ! $user || ! wp_check_password( $password, $user->user_pass, $user->ID ) ) {
            return new WP_Error( 'invalid_credentials', 'The email or password you entered is incorrect.', [ 'status' => 401 ] );
        }

        $token = $this->generate_auth_token( $user );
        $customer = $this->format_customer_data( $user );

        return rest_ensure_response( [
            'success' => true,
            'token'   => $token,
            'user'    => $customer,
            'message' => 'Signed in successfully',
        ] );
    }

    /**
     * REST: Handle customer registration
     */
    public function handle_auth_register( $request ) {
        $params = $request->get_json_params() ?: $request->get_body_params();
        $name     = sanitize_text_field( trim( $params['name'] ?? '' ) );
        $email    = sanitize_email( trim( $params['email'] ?? '' ) );
        $phone    = sanitize_text_field( trim( $params['phone'] ?? '' ) );
        $password = $params['password'] ?? '';

        if ( empty( $name ) || empty( $email ) || empty( $password ) ) {
            return new WP_Error( 'missing_fields', 'Please provide your full name, email, and password.', [ 'status' => 400 ] );
        }

        if ( ! is_email( $email ) ) {
            return new WP_Error( 'invalid_email', 'Please provide a valid email address.', [ 'status' => 400 ] );
        }

        if ( strlen( $password ) < 6 ) {
            return new WP_Error( 'weak_password', 'Password must be at least 6 characters long.', [ 'status' => 400 ] );
        }

        if ( email_exists( $email ) ) {
            return new WP_Error( 'email_exists', 'An account with this email address already exists. Please sign in.', [ 'status' => 409 ] );
        }

        $username_base = sanitize_user( current( explode( '@', $email ) ), true );
        $username = $username_base;
        $counter = 1;
        while ( username_exists( $username ) ) {
            $username = $username_base . '_' . $counter;
            $counter++;
        }

        $parts = explode( ' ', $name, 2 );
        $first_name = $parts[0] ?? '';
        $last_name  = $parts[1] ?? '';

        $user_id = wp_insert_user( [
            'user_login'   => $username,
            'user_pass'    => $password,
            'user_email'   => $email,
            'display_name' => $name,
            'first_name'   => $first_name,
            'last_name'    => $last_name,
            'role'         => 'customer',
        ] );

        if ( is_wp_error( $user_id ) ) {
            return $user_id;
        }

        if ( ! empty( $phone ) ) {
            update_user_meta( $user_id, 'billing_phone', $phone );
        }
        update_user_meta( $user_id, 'billing_email', $email );
        update_user_meta( $user_id, 'billing_first_name', $first_name );
        update_user_meta( $user_id, 'billing_last_name', $last_name );

        $user = get_user_by( 'id', $user_id );
        $token = $this->generate_auth_token( $user );
        $customer = $this->format_customer_data( $user );

        return rest_ensure_response( [
            'success' => true,
            'token'   => $token,
            'user'    => $customer,
            'message' => 'Account created successfully',
        ] );
    }

    /**
     * REST: Handle forgot password request
     */
    public function handle_auth_forgot_password( $request ) {
        $params = $request->get_json_params() ?: $request->get_body_params();
        $identifier = sanitize_text_field( trim( $params['identifier'] ?? $params['email'] ?? '' ) );

        if ( empty( $identifier ) ) {
            return new WP_Error( 'missing_fields', 'Please enter your email address.', [ 'status' => 400 ] );
        }

        $user = null;
        if ( is_email( $identifier ) ) {
            $user = get_user_by( 'email', $identifier );
        } else {
            $user = get_user_by( 'login', $identifier );
        }

        if ( ! $user ) {
            return rest_ensure_response( [
                'success' => true,
                'message' => 'If an account matches this email, a password reset link has been sent.',
            ] );
        }

        $key = get_password_reset_key( $user );
        if ( is_wp_error( $key ) ) {
            return new WP_Error( 'key_error', 'Unable to initiate password reset at this time.', [ 'status' => 500 ] );
        }

        $reset_url = 'https://abeautynfashion.com/account/reset-password?key=' . rawurlencode( $key ) . '&login=' . rawurlencode( $user->user_login );

        $subject = '[ABeauty & Fashion] Password Reset Request';
        $message = "Hello " . $user->display_name . ",\n\n"
                 . "We received a request to reset your password for your ABeauty & Fashion account.\n\n"
                 . "Click the link below to set a new password:\n"
                 . $reset_url . "\n\n"
                 . "If you didn't request a password reset, you can safely ignore this email.\n\n"
                 . "Warm regards,\n"
                 . "The ABeauty & Fashion Concierge Team\n"
                 . "https://abeautynfashion.com";

        wp_mail( $user->user_email, $subject, $message );

        return rest_ensure_response( [
            'success' => true,
            'message' => 'Password reset instructions have been sent to your email address.',
        ] );
    }

    /**
     * REST: Handle password reset completion
     */
    public function handle_auth_reset_password( $request ) {
        $params = $request->get_json_params() ?: $request->get_body_params();
        $key      = sanitize_text_field( $params['key'] ?? '' );
        $login    = sanitize_text_field( $params['login'] ?? '' );
        $password = $params['password'] ?? '';

        if ( empty( $key ) || empty( $login ) || empty( $password ) ) {
            return new WP_Error( 'missing_fields', 'Invalid request. Missing reset parameters.', [ 'status' => 400 ] );
        }

        if ( strlen( $password ) < 6 ) {
            return new WP_Error( 'weak_password', 'Password must be at least 6 characters long.', [ 'status' => 400 ] );
        }

        $user = check_password_reset_key( $key, $login );
        if ( is_wp_error( $user ) ) {
            return new WP_Error( 'invalid_key', 'This password reset link is invalid or has expired. Please request a new one.', [ 'status' => 400 ] );
        }

        reset_password( $user, $password );

        return rest_ensure_response( [
            'success' => true,
            'message' => 'Your password has been reset successfully! You can now sign in.',
        ] );
    }

    /**
     * REST: Get current customer profile
     */
    public function handle_auth_me( $request ) {
        $auth_header = $request->get_header( 'authorization' );
        $token = str_replace( 'Bearer ', '', $auth_header );
        if ( empty( $token ) ) {
            $token = $request->get_param( 'token' );
        }

        $user = $this->verify_auth_token( $token );
        if ( ! $user ) {
            return new WP_Error( 'unauthorized', 'Session expired. Please sign in.', [ 'status' => 401 ] );
        }

        return rest_ensure_response( [
            'success' => true,
            'user'    => $this->format_customer_data( $user ),
        ] );
    }

    /**
     * REST: Update customer profile and addresses
     */
    public function handle_auth_update_profile( $request ) {
        $auth_header = $request->get_header( 'authorization' );
        $token = str_replace( 'Bearer ', '', $auth_header );
        $params = $request->get_json_params() ?: $request->get_body_params();
        if ( empty( $token ) && ! empty( $params['token'] ) ) {
            $token = $params['token'];
        }

        $user = $this->verify_auth_token( $token );
        if ( ! $user ) {
            return new WP_Error( 'unauthorized', 'Session expired. Please sign in.', [ 'status' => 401 ] );
        }

        $user_id = $user->ID;

        if ( ! empty( $params['name'] ) ) {
            $name = sanitize_text_field( $params['name'] );
            $parts = explode( ' ', $name, 2 );
            wp_update_user( [
                'ID'           => $user_id,
                'display_name' => $name,
                'first_name'   => $parts[0] ?? '',
                'last_name'    => $parts[1] ?? '',
            ] );
            update_user_meta( $user_id, 'first_name', $parts[0] ?? '' );
            update_user_meta( $user_id, 'last_name', $parts[1] ?? '' );
        }

        if ( isset( $params['phone'] ) ) {
            update_user_meta( $user_id, 'billing_phone', sanitize_text_field( $params['phone'] ) );
        }

        if ( ! empty( $params['billing'] ) && is_array( $params['billing'] ) ) {
            $b = $params['billing'];
            if ( isset( $b['address_1'] ) ) update_user_meta( $user_id, 'billing_address_1', sanitize_text_field( $b['address_1'] ) );
            if ( isset( $b['city'] ) ) update_user_meta( $user_id, 'billing_city', sanitize_text_field( $b['city'] ) );
            if ( isset( $b['postcode'] ) ) update_user_meta( $user_id, 'billing_postcode', sanitize_text_field( $b['postcode'] ) );
        }

        if ( ! empty( $params['shipping'] ) && is_array( $params['shipping'] ) ) {
            $s = $params['shipping'];
            if ( isset( $s['address_1'] ) ) update_user_meta( $user_id, 'shipping_address_1', sanitize_text_field( $s['address_1'] ) );
            if ( isset( $s['city'] ) ) update_user_meta( $user_id, 'shipping_city', sanitize_text_field( $s['city'] ) );
            if ( isset( $s['postcode'] ) ) update_user_meta( $user_id, 'shipping_postcode', sanitize_text_field( $s['postcode'] ) );
        }

        if ( ! empty( $params['new_password'] ) ) {
            $current_pass = $params['current_password'] ?? '';
            if ( empty( $current_pass ) || ! wp_check_password( $current_pass, $user->user_pass, $user_id ) ) {
                return new WP_Error( 'invalid_password', 'Current password is incorrect.', [ 'status' => 400 ] );
            }
            if ( strlen( $params['new_password'] ) < 6 ) {
                return new WP_Error( 'weak_password', 'New password must be at least 6 characters long.', [ 'status' => 400 ] );
            }
            wp_set_password( $params['new_password'], $user_id );
        }

        $fresh_user = get_user_by( 'id', $user_id );
        return rest_ensure_response( [
            'success' => true,
            'token'   => $this->generate_auth_token( $fresh_user ),
            'user'    => $this->format_customer_data( $fresh_user ),
            'message' => 'Profile updated successfully',
        ] );
    }

    /**
     * REST: Get customer WooCommerce orders
     */
    public function handle_auth_orders( $request ) {
        $auth_header = $request->get_header( 'authorization' );
        $token = str_replace( 'Bearer ', '', $auth_header );
        if ( empty( $token ) ) {
            $token = $request->get_param( 'token' );
        }

        $user = $this->verify_auth_token( $token );
        if ( ! $user ) {
            return new WP_Error( 'unauthorized', 'Session expired. Please sign in.', [ 'status' => 401 ] );
        }

        if ( ! function_exists( 'wc_get_orders' ) ) {
            return rest_ensure_response( [] );
        }

        $wc_orders = wc_get_orders( [
            'customer_id' => $user->ID,
            'limit'       => 50,
            'orderby'     => 'date',
            'order'       => 'DESC',
        ] );

        if ( empty( $wc_orders ) && ! empty( $user->user_email ) ) {
            $wc_orders = wc_get_orders( [
                'billing_email' => $user->user_email,
                'limit'         => 50,
                'orderby'       => 'date',
                'order'         => 'DESC',
            ] );
        }

        $formatted = [];
        foreach ( $wc_orders as $o ) {
            $items = [];
            foreach ( $o->get_items() as $item ) {
                $product = $item->get_product();
                $img_url = '';
                if ( $product && $product->get_image_id() ) {
                    $img_url = wp_get_attachment_image_url( $product->get_image_id(), 'thumbnail' );
                }
                $items[] = [
                    'name'     => $item->get_name(),
                    'quantity' => $item->get_quantity(),
                    'total'    => (float) $item->get_total(),
                    'image'    => $img_url,
                ];
            }

            $date_created = $o->get_date_created();
            $formatted[] = [
                'id'            => 'ABF-' . $o->get_id(),
                'orderNumber'   => $o->get_order_number(),
                'date'          => $date_created ? $date_created->date( 'M j, Y' ) : '',
                'status'        => $o->get_status(),
                'statusLabel'   => wc_get_order_status_name( $o->get_status() ),
                'total'         => (float) $o->get_total(),
                'currency'      => $o->get_currency(),
                'paymentMethod' => $o->get_payment_method_title(),
                'itemsCount'    => count( $items ),
                'items'         => $items,
            ];
        }

        return rest_ensure_response( $formatted );
    }

    /**
     * REST: Place order via Storefront Checkout
     */
    public function handle_checkout_place_order( $request ) {
        if ( ! function_exists( 'wc_create_order' ) ) {
            return new WP_Error( 'woocommerce_inactive', 'WooCommerce is not available.', [ 'status' => 500 ] );
        }

        $params = $request->get_json_params();
        if ( empty( $params ) ) {
            $params = $request->get_body_params();
        }

        // 1. Identify or register customer
        $customer_id = 0;
        $auth_token = null;
        $user_data = null;

        $auth_header = $request->get_header( 'authorization' );
        $token = str_replace( 'Bearer ', '', $auth_header );
        if ( ! empty( $token ) ) {
            $verified_user = $this->verify_auth_token( $token );
            if ( $verified_user ) {
                $customer_id = $verified_user->ID;
            }
        }

        $full_name = sanitize_text_field( $params['fullName'] ?? '' );
        $phone = sanitize_text_field( $params['phoneNumber'] ?? '' );
        $email = sanitize_email( $params['email'] ?? '' );
        $district = sanitize_text_field( $params['district'] ?? 'Dhaka' );
        $thana = sanitize_text_field( $params['thana'] ?? '' );
        $street = sanitize_textarea_field( $params['streetAddress'] ?? '' );
        $order_notes = sanitize_textarea_field( $params['orderNotes'] ?? '' );
        $payment_method = sanitize_text_field( $params['paymentMethod'] ?? 'cod' );
        $create_account = ! empty( $params['createAccount'] );
        $account_password = $params['accountPassword'] ?? '';

        // If guest opted to create account during checkout
        if ( empty( $customer_id ) && $create_account && ! empty( $email ) && ! empty( $account_password ) ) {
            if ( ! email_exists( $email ) ) {
                $name_parts = explode( ' ', $full_name, 2 );
                $first = $name_parts[0] ?? '';
                $last = $name_parts[1] ?? '';
                $new_id = wc_create_new_customer( $email, '', $account_password );
                if ( ! is_wp_error( $new_id ) ) {
                    $customer_id = $new_id;
                    wp_update_user( [
                        'ID'           => $new_id,
                        'display_name' => $full_name,
                        'first_name'   => $first,
                        'last_name'    => $last,
                    ] );
                    update_user_meta( $new_id, 'billing_phone', $phone );
                    $new_user = get_userdata( $new_id );
                    $auth_token = $this->generate_auth_token( $new_user );
                    $user_data = $this->format_customer_response( $new_user );
                }
            } else {
                $existing_user = wp_authenticate( $email, $account_password );
                if ( ! is_wp_error( $existing_user ) ) {
                    $customer_id = $existing_user->ID;
                    $auth_token = $this->generate_auth_token( $existing_user );
                    $user_data = $this->format_customer_response( $existing_user );
                }
            }
        }

        // Split name for billing/shipping
        $name_parts = explode( ' ', $full_name, 2 );
        $first_name = $name_parts[0] ?? $full_name;
        $last_name = $name_parts[1] ?? '';

        // 2. Create WooCommerce order
        $order = wc_create_order( [
            'customer_id' => $customer_id,
        ] );

        if ( is_wp_error( $order ) ) {
            return new WP_Error( 'order_creation_failed', $order->get_error_message(), [ 'status' => 400 ] );
        }

        // 3. Set address
        $address = [
            'first_name' => $first_name,
            'last_name'  => $last_name,
            'email'      => $email,
            'phone'      => $phone,
            'address_1'  => ! empty( $thana ) ? $street . ', ' . $thana : $street,
            'city'       => $district,
            'state'      => $district,
            'postcode'   => '',
            'country'    => 'BD',
        ];

        $order->set_address( $address, 'billing' );
        $order->set_address( $address, 'shipping' );

        // 4. Add items
        $items = $params['items'] ?? [];
        if ( is_array( $items ) ) {
            foreach ( $items as $item ) {
                $pid = isset( $item['id'] ) ? absint( $item['id'] ) : 0;
                $qty = isset( $item['quantity'] ) ? max( 1, absint( $item['quantity'] ) ) : 1;
                $product = $pid ? wc_get_product( $pid ) : null;
                if ( $product ) {
                    $order->add_product( $product, $qty );
                } else {
                    $title = sanitize_text_field( $item['titleEn'] ?? $item['titleBn'] ?? 'Product' );
                    $price = (float) ( $item['priceBDT'] ?? 0 );
                    $item_fee = new WC_Order_Item_Product();
                    $item_fee->set_name( $title );
                    $item_fee->set_quantity( $qty );
                    $item_fee->set_subtotal( $price * $qty );
                    $item_fee->set_total( $price * $qty );
                    $order->add_item( $item_fee );
                }
            }
        }

        // 5. Add shipping fee
        $shipping_charge = (float) ( $params['shippingCostBDT'] ?? 60 );
        if ( $shipping_charge >= 0 ) {
            $is_dhaka = stripos( $district, 'dhaka' ) !== false;
            $item_shipping = new WC_Order_Item_Shipping();
            $item_shipping->set_method_title( $is_dhaka ? 'Inside Dhaka Delivery (24-48 Hours)' : 'Outside Dhaka Courier Delivery (3-4 Days)' );
            $item_shipping->set_method_id( 'flat_rate' );
            $item_shipping->set_total( $shipping_charge );
            $order->add_item( $item_shipping );
        }

        // 6. Set payment method
        $pm_titles = [
            'cod'   => 'Cash on Delivery (COD)',
            'bkash' => 'bKash / Nagad Mobile Banking',
            'card'  => 'Credit / Debit Card (Visa / Mastercard)',
        ];
        $order->set_payment_method( $payment_method );
        $order->set_payment_method_title( $pm_titles[ $payment_method ] ?? ucfirst( $payment_method ) );

        if ( ! empty( $order_notes ) ) {
            $order->set_customer_note( $order_notes );
        }

        // 7. Calculate total and update status
        $order->calculate_totals();
        $initial_status = $payment_method === 'cod' ? 'processing' : 'on-hold';
        $order->update_status( $initial_status, 'Order placed through ABeauty & Fashion storefront.' );

        // 8. If authenticated or newly registered, save addresses to user profile
        if ( $customer_id ) {
            update_user_meta( $customer_id, 'billing_first_name', $first_name );
            update_user_meta( $customer_id, 'billing_last_name', $last_name );
            update_user_meta( $customer_id, 'billing_phone', $phone );
            update_user_meta( $customer_id, 'billing_address_1', $address['address_1'] );
            update_user_meta( $customer_id, 'billing_city', $district );
            update_user_meta( $customer_id, 'shipping_first_name', $first_name );
            update_user_meta( $customer_id, 'shipping_last_name', $last_name );
            update_user_meta( $customer_id, 'shipping_phone', $phone );
            update_user_meta( $customer_id, 'shipping_address_1', $address['address_1'] );
            update_user_meta( $customer_id, 'shipping_city', $district );
        }

        return rest_ensure_response( [
            'success'      => true,
            'order_id'     => $order->get_id(),
            'order_number' => $order->get_order_number(),
            'status'       => $order->get_status(),
            'status_label' => wc_get_order_status_name( $order->get_status() ),
            'total'        => (float) $order->get_total(),
            'currency'     => $order->get_currency(),
            'payment'      => $order->get_payment_method_title(),
            'auth_token'   => $auth_token,
            'user'         => $user_data,
        ] );
    }

    /**
     * REST: Track order by Order ID + Phone number
     */
    public function handle_orders_track( $request ) {
        if ( ! function_exists( 'wc_get_order' ) ) {
            return new WP_Error( 'woocommerce_inactive', 'WooCommerce is not available.', [ 'status' => 500 ] );
        }

        $raw_id = sanitize_text_field( $request->get_param( 'order_id' ) ?? '' );
        $phone  = sanitize_text_field( $request->get_param( 'phone' ) ?? '' );

        if ( empty( $raw_id ) ) {
            return new WP_Error( 'missing_order_id', 'Please provide an Order ID.', [ 'status' => 400 ] );
        }

        $numeric_id = absint( preg_replace( '/[^0-9]/', '', $raw_id ) );

        $order = null;
        if ( $numeric_id ) {
            $order = wc_get_order( $numeric_id );
        }

        if ( ! $order ) {
            return new WP_Error( 'order_not_found', 'No order found with reference #' . esc_html( $raw_id ) . '. Please check your Order ID.', [ 'status' => 404 ] );
        }

        $billing_phone = preg_replace( '/[^0-9]/', '', $order->get_billing_phone() );
        if ( ! empty( $phone ) ) {
            $input_phone = preg_replace( '/[^0-9]/', '', $phone );
            $last_billing = substr( $billing_phone, -8 );
            $last_input   = substr( $input_phone, -8 );
            if ( $last_billing !== $last_input ) {
                return new WP_Error( 'phone_mismatch', 'The phone number does not match the order records.', [ 'status' => 403 ] );
            }
        }

        $items = [];
        foreach ( $order->get_items() as $item ) {
            $items[] = [
                'name'     => $item->get_name(),
                'quantity' => $item->get_quantity(),
                'total'    => (float) $item->get_total(),
            ];
        }

        $status = $order->get_status();
        $date_created = $order->get_date_created();
        $date_formatted = $date_created ? $date_created->date( 'M j, Y • g:i A' ) : 'Recently';

        $timeline = [];
        $timeline[] = [
            'time'    => $date_formatted,
            'labelEn' => 'Order Placed & Confirmed',
            'labelBn' => 'অর্ডার প্লেস করা হয়েছে ও নিশ্চিত করা হয়েছে',
            'done'    => true,
        ];

        $is_processing = in_array( $status, [ 'processing', 'completed' ] );
        $timeline[] = [
            'time'    => $is_processing ? 'In Progress' : 'Pending',
            'labelEn' => 'Quality Inspected & Packed for Dispatch',
            'labelBn' => 'পণ্যের মান পরীক্ষা ও প্যাকেজিং সম্পন্ন',
            'done'    => $is_processing,
        ];

        $is_shipped = $status === 'completed';
        $timeline[] = [
            'time'    => $is_shipped ? 'Handed to Courier' : 'Estimated 24-48h',
            'labelEn' => 'Handed to Courier Partner (Steadfast / Pathao Express)',
            'labelBn' => 'কুরিয়ার পার্টনারকে হস্তান্তর করা হয়েছে (স্টেডফাস্ট / পাঠাও)',
            'done'    => $is_shipped,
        ];

        $timeline[] = [
            'time'    => $status === 'completed' ? 'Delivered' : 'Estimated 2-4 Days',
            'labelEn' => $status === 'completed' ? 'Package Delivered Successfully' : 'Out for Doorstep Delivery',
            'labelBn' => $status === 'completed' ? 'পার্সেল সফলভাবে ডেলিভারি সম্পন্ন হয়েছে' : 'ডেলিভারির জন্য পাঠানো হয়েছে',
            'done'    => $status === 'completed',
        ];

        $status_bn_map = [
            'processing' => 'প্রক্রিয়াধীন • প্যাকেজিং সম্পন্ন',
            'completed'  => 'বিতরণ সম্পন্ন (Delivered)',
            'on-hold'    => 'যাচাই করা হচ্ছে (On-Hold)',
            'cancelled'  => 'বাতিল করা হয়েছে',
            'refunded'   => 'মূল্য ফেরত দেওয়া হয়েছে',
            'pending'    => 'পেমেন্ট মুলতুবি রয়েছে',
        ];

        return rest_ensure_response( [
            'success'       => true,
            'orderNumber'   => $order->get_order_number(),
            'status'        => $status,
            'statusEn'      => wc_get_order_status_name( $status ),
            'statusBn'      => $status_bn_map[ $status ] ?? wc_get_order_status_name( $status ),
            'courier'       => 'Steadfast / Pathao Express BD',
            'estDelivery'   => stripos( $order->get_shipping_city(), 'dhaka' ) !== false ? 'Within 24-48 Hours' : '3-4 Business Days',
            'total'         => (float) $order->get_total(),
            'currency'      => $order->get_currency(),
            'paymentMethod' => $order->get_payment_method_title(),
            'customerName'  => $order->get_formatted_billing_full_name(),
            'address'       => $order->get_billing_address_1() . ', ' . $order->get_billing_city(),
            'items'         => $items,
            'timeline'      => $timeline,
        ] );
    }

    /**
     * Render the Customizer Admin UI
     */
    public function render_settings_page() {
        $settings = $this->get_settings();
        $active_tab = isset( $_GET['tab'] ) ? sanitize_key( $_GET['tab'] ) : 'header';

        // Handle inquiry deletion and clearing
        if ( isset( $_GET['inq_action'] ) && current_user_can( 'manage_options' ) ) {
            $inquiries = get_option( 'abf_customer_inquiries', [] );
            if ( $_GET['inq_action'] === 'delete' && ! empty( $_GET['inq_id'] ) && check_admin_referer( 'abf_inquiry_action' ) ) {
                $target_id = sanitize_text_field( $_GET['inq_id'] );
                $inquiries = array_filter( $inquiries, function( $i ) use ( $target_id ) {
                    return ( $i['id'] ?? '' ) !== $target_id;
                } );
                update_option( 'abf_customer_inquiries', array_values( $inquiries ), false );
                echo '<div class="notice notice-success is-dismissible" style="border-left-color: #e11d48;"><p>Inquiry deleted successfully.</p></div>';
            } elseif ( $_GET['inq_action'] === 'clear_all' && check_admin_referer( 'abf_inquiry_action' ) ) {
                update_option( 'abf_customer_inquiries', [], false );
                echo '<div class="notice notice-success is-dismissible" style="border-left-color: #e11d48;"><p>All inquiries have been cleared.</p></div>';
            }
        }
        ?>
        <div class="wrap" style="max-width: 1100px;">
            <h1 style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                <span class="dashicons dashicons-admin-customizer" style="font-size: 30px; width: 30px; height: 30px;"></span>
                ABeauty & Fashion — Headless Store Customizer
            </h1>
            <p style="color: #64748b; font-size: 14px; margin-bottom: 25px;">
                Edit global site content, announcement bar, navigation, home hero, value props, and footer for the live storefront (<strong>https://abeautynfashion.com</strong>). Changes save instantly to the database and sync to the Next.js frontend.
            </p>

            <?php if ( isset( $_GET['settings-updated'] ) && $_GET['settings-updated'] === 'true' ) : ?>
                <div class="notice notice-success is-dismissible" style="border-left-color: #e11d48;">
                    <p><strong>Success!</strong> Store settings updated successfully. The Next.js storefront will display your changes.</p>
                </div>
            <?php endif; ?>

            <h2 class="nav-tab-wrapper" style="margin-bottom: 20px;">
                <a href="?page=abf-store-settings&tab=header" class="nav-tab <?php echo $active_tab === 'header' ? 'nav-tab-active' : ''; ?>">Announcement & Header</a>
                <a href="?page=abf-store-settings&tab=hero" class="nav-tab <?php echo $active_tab === 'hero' ? 'nav-tab-active' : ''; ?>">Homepage Hero & Rituals</a>
                <a href="?page=abf-store-settings&tab=trust" class="nav-tab <?php echo $active_tab === 'trust' ? 'nav-tab-active' : ''; ?>">Trust Badges & Value Props</a>
                <a href="?page=abf-store-settings&tab=footer" class="nav-tab <?php echo $active_tab === 'footer' ? 'nav-tab-active' : ''; ?>">Footer & Social Links</a>
                <a href="?page=abf-store-settings&tab=nav" class="nav-tab <?php echo $active_tab === 'nav' ? 'nav-tab-active' : ''; ?>">Navigation Menu</a>
                <a href="?page=abf-store-settings&tab=pages" class="nav-tab <?php echo $active_tab === 'pages' ? 'nav-tab-active' : ''; ?>">Core Pages & ACF Fields</a>
                <?php $inquiry_count = count( get_option('abf_customer_inquiries', []) ); ?>
                <a href="?page=abf-store-settings&tab=inquiries" class="nav-tab <?php echo $active_tab === 'inquiries' ? 'nav-tab-active' : ''; ?>">
                    Customer Inquiries
                    <?php if ( $inquiry_count > 0 ) : ?>
                        <span style="background: #e11d48; color: #fff; border-radius: 10px; padding: 1px 7px; font-size: 11px; margin-left: 4px; font-weight: bold;"><?php echo $inquiry_count; ?></span>
                    <?php endif; ?>
                </a>
            </h2>

            <form method="post" action="options.php" style="background: #fff; padding: 25px 30px; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <?php
                settings_fields( 'abf_store_settings_group' );
                ?>

                <!-- TAB 1: HEADER & ANNOUNCEMENT -->
                <?php if ( $active_tab === 'header' ) : ?>
                    <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-top: 0;">Top Announcement Bar</h3>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Enable Announcement Bar</th>
                            <td>
                                <label>
                                    <input type="checkbox" name="<?php echo $this->option_key; ?>[announcement_active]" value="1" <?php checked( $settings['announcement_active'], '1' ); ?> />
                                    Show announcement bar at the top of the storefront
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Announcement Text (English)</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[announcement_text_en]" value="<?php echo esc_attr( $settings['announcement_text_en'] ); ?>" class="large-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Announcement Text (বাংলা)</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[announcement_text_bn]" value="<?php echo esc_attr( $settings['announcement_text_bn'] ); ?>" class="large-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Announcement Link</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[announcement_link]" value="<?php echo esc_attr( $settings['announcement_link'] ); ?>" class="regular-text" placeholder="/sale" />
                            </td>
                        </tr>
                    </table>

                    <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-top: 30px;">Header Configuration</h3>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Storefront Logo URL</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[header_logo_url]" value="<?php echo esc_attr( $settings['header_logo_url'] ); ?>" class="large-text" />
                                <p class="description">URL to the transparent PNG / SVG store logo.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Hotline Phone Number</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[header_hotline]" value="<?php echo esc_attr( $settings['header_hotline'] ); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Search Placeholder (English)</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[header_search_placeholder_en]" value="<?php echo esc_attr( $settings['header_search_placeholder_en'] ); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Search Placeholder (বাংলা)</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[header_search_placeholder_bn]" value="<?php echo esc_attr( $settings['header_search_placeholder_bn'] ); ?>" class="regular-text" />
                            </td>
                        </tr>
                    </table>

                <!-- TAB 2: HERO & RITUALS -->
                <?php elseif ( $active_tab === 'hero' ) : ?>
                    <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-top: 0;">Homepage Hero Banner</h3>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Eyebrow Badge (English)</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[hero_eyebrow_en]" value="<?php echo esc_attr( $settings['hero_eyebrow_en'] ); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Eyebrow Badge (বাংলা)</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[hero_eyebrow_bn]" value="<?php echo esc_attr( $settings['hero_eyebrow_bn'] ); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Main Title Prefix (English)</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[hero_title_prefix_en]" value="<?php echo esc_attr( $settings['hero_title_prefix_en'] ); ?>" class="regular-text" placeholder="Beauty made " />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Main Title Italic Accent (English)</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[hero_title_accent_en]" value="<?php echo esc_attr( $settings['hero_title_accent_en'] ); ?>" class="regular-text" placeholder="effortless" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Main Title Suffix (English)</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[hero_title_suffix_en]" value="<?php echo esc_attr( $settings['hero_title_suffix_en'] ); ?>" class="regular-text" placeholder=", fashion made personal." />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Main Title (বাংলা)</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[hero_title_prefix_bn]" value="<?php echo esc_attr( $settings['hero_title_prefix_bn'] ); ?>" class="large-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Hero Subtitle (English)</th>
                            <td>
                                <textarea name="<?php echo $this->option_key; ?>[hero_subtitle_en]" rows="3" class="large-text"><?php echo esc_textarea( $settings['hero_subtitle_en'] ); ?></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Hero Subtitle (বাংলা)</th>
                            <td>
                                <textarea name="<?php echo $this->option_key; ?>[hero_subtitle_bn]" rows="3" class="large-text"><?php echo esc_textarea( $settings['hero_subtitle_bn'] ); ?></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Hero Main Image URL</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[hero_image_url]" value="<?php echo esc_attr( $settings['hero_image_url'] ); ?>" class="large-text" />
                                <p class="description">Paste direct image URL or upload to Media Library.</p>
                            </td>
                        </tr>
                    </table>

                <!-- TAB 3: TRUST BADGES -->
                <?php elseif ( $active_tab === 'trust' ) : ?>
                    <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-top: 0;">Store Trust Value Props (4 Pillars)</h3>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Pillar 1: Authenticity</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[trust_1_title_en]" value="<?php echo esc_attr( $settings['trust_1_title_en'] ); ?>" class="regular-text" placeholder="Title (EN)" style="margin-bottom: 6px;" /><br/>
                                <input type="text" name="<?php echo $this->option_key; ?>[trust_1_title_bn]" value="<?php echo esc_attr( $settings['trust_1_title_bn'] ); ?>" class="regular-text" placeholder="Title (BN)" style="margin-bottom: 6px;" /><br/>
                                <textarea name="<?php echo $this->option_key; ?>[trust_1_desc_en]" rows="2" class="large-text" placeholder="Description (EN)"><?php echo esc_textarea( $settings['trust_1_desc_en'] ); ?></textarea><br/>
                                <textarea name="<?php echo $this->option_key; ?>[trust_1_desc_bn]" rows="2" class="large-text" placeholder="Description (BN)"><?php echo esc_textarea( $settings['trust_1_desc_bn'] ); ?></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Pillar 2: Shipping</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[trust_2_title_en]" value="<?php echo esc_attr( $settings['trust_2_title_en'] ); ?>" class="regular-text" placeholder="Title (EN)" style="margin-bottom: 6px;" /><br/>
                                <input type="text" name="<?php echo $this->option_key; ?>[trust_2_title_bn]" value="<?php echo esc_attr( $settings['trust_2_title_bn'] ); ?>" class="regular-text" placeholder="Title (BN)" style="margin-bottom: 6px;" /><br/>
                                <textarea name="<?php echo $this->option_key; ?>[trust_2_desc_en]" rows="2" class="large-text" placeholder="Description (EN)"><?php echo esc_textarea( $settings['trust_2_desc_en'] ); ?></textarea><br/>
                                <textarea name="<?php echo $this->option_key; ?>[trust_2_desc_bn]" rows="2" class="large-text" placeholder="Description (BN)"><?php echo esc_textarea( $settings['trust_2_desc_bn'] ); ?></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Pillar 3: Support</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[trust_3_title_en]" value="<?php echo esc_attr( $settings['trust_3_title_en'] ); ?>" class="regular-text" placeholder="Title (EN)" style="margin-bottom: 6px;" /><br/>
                                <input type="text" name="<?php echo $this->option_key; ?>[trust_3_title_bn]" value="<?php echo esc_attr( $settings['trust_3_title_bn'] ); ?>" class="regular-text" placeholder="Title (BN)" style="margin-bottom: 6px;" /><br/>
                                <textarea name="<?php echo $this->option_key; ?>[trust_3_desc_en]" rows="2" class="large-text" placeholder="Description (EN)"><?php echo esc_textarea( $settings['trust_3_desc_en'] ); ?></textarea><br/>
                                <textarea name="<?php echo $this->option_key; ?>[trust_3_desc_bn]" rows="2" class="large-text" placeholder="Description (BN)"><?php echo esc_textarea( $settings['trust_3_desc_bn'] ); ?></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Pillar 4: Payment</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[trust_4_title_en]" value="<?php echo esc_attr( $settings['trust_4_title_en'] ); ?>" class="regular-text" placeholder="Title (EN)" style="margin-bottom: 6px;" /><br/>
                                <input type="text" name="<?php echo $this->option_key; ?>[trust_4_title_bn]" value="<?php echo esc_attr( $settings['trust_4_title_bn'] ); ?>" class="regular-text" placeholder="Title (BN)" style="margin-bottom: 6px;" /><br/>
                                <textarea name="<?php echo $this->option_key; ?>[trust_4_desc_en]" rows="2" class="large-text" placeholder="Description (EN)"><?php echo esc_textarea( $settings['trust_4_desc_en'] ); ?></textarea><br/>
                                <textarea name="<?php echo $this->option_key; ?>[trust_4_desc_bn]" rows="2" class="large-text" placeholder="Description (BN)"><?php echo esc_textarea( $settings['trust_4_desc_bn'] ); ?></textarea>
                            </td>
                        </tr>
                    </table>

                <!-- TAB 4: FOOTER & SOCIAL -->
                <?php elseif ( $active_tab === 'footer' ) : ?>
                    <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-top: 0;">Footer Content</h3>
                    <table class="form-table">
                        <tr>
                            <th scope="row">About Us Blurb (English)</th>
                            <td>
                                <textarea name="<?php echo $this->option_key; ?>[footer_about_en]" rows="3" class="large-text"><?php echo esc_textarea( $settings['footer_about_en'] ); ?></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">About Us Blurb (বাংলা)</th>
                            <td>
                                <textarea name="<?php echo $this->option_key; ?>[footer_about_bn]" rows="3" class="large-text"><?php echo esc_textarea( $settings['footer_about_bn'] ); ?></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Newsletter Headline (EN)</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[footer_newsletter_title_en]" value="<?php echo esc_attr( $settings['footer_newsletter_title_en'] ); ?>" class="large-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Newsletter Headline (BN)</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[footer_newsletter_title_bn]" value="<?php echo esc_attr( $settings['footer_newsletter_title_bn'] ); ?>" class="large-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Trade License Number</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[footer_trade_license]" value="<?php echo esc_attr( $settings['footer_trade_license'] ); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Copyright Notice</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[footer_copyright]" value="<?php echo esc_attr( $settings['footer_copyright'] ); ?>" class="large-text" />
                            </td>
                        </tr>
                    </table>

                    <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-top: 30px;">Social Media & Contact Channels</h3>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Facebook Page URL</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[social_facebook]" value="<?php echo esc_attr( $settings['social_facebook'] ); ?>" class="large-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Instagram Handle / URL</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[social_instagram]" value="<?php echo esc_attr( $settings['social_instagram'] ); ?>" class="large-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">WhatsApp Direct Number</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[social_whatsapp]" value="<?php echo esc_attr( $settings['social_whatsapp'] ); ?>" class="regular-text" placeholder="+8801811377577" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">YouTube Channel URL</th>
                            <td>
                                <input type="text" name="<?php echo $this->option_key; ?>[social_youtube]" value="<?php echo esc_attr( $settings['social_youtube'] ); ?>" class="large-text" />
                            </td>
                        </tr>
                    </table>

                <!-- TAB 5: NAVIGATION -->
                <?php elseif ( $active_tab === 'nav' ) : ?>
                    <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-top: 0;">Main Navigation Menu</h3>
                    <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">
                        Manage the links that appear in the desktop header and the mobile drawer navigation. You can customize menu items directly in WordPress.
                    </p>

                    <div style="margin-bottom: 25px;">
                        <a href="nav-menus.php?action=edit&menu=29" class="button button-primary button-large" style="background: #e11d48; border-color: #be123c;">
                            <span class="dashicons dashicons-menu" style="margin-top: 4px;"></span>
                            Open WordPress Menu Builder (Appearance &gt; Menus)
                        </a>
                    </div>

                    <h4 style="margin-top: 20px;">Currently Active Menu Links</h4>
                    <table class="wp-list-table widefat fixed striped">
                        <thead>
                            <tr>
                                <th style="width: 50px;">#</th>
                                <th>Menu Label</th>
                                <th>Destination URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if ( ! empty( $settings['primary_menu'] ) ) : ?>
                                <?php foreach ( $settings['primary_menu'] as $idx => $item ) : ?>
                                    <tr>
                                        <td><strong><?php echo $idx + 1; ?></strong></td>
                                        <td><strong><?php echo esc_html( $item['title'] ); ?></strong></td>
                                        <td><code><?php echo esc_html( $item['url'] ); ?></code></td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php else : ?>
                                <tr><td colspan="3">No menu items found.</td></tr>
                            <?php endif; ?>
                        </tbody>
                    </table>

                <!-- TAB 6: CORE PAGES & ACF -->
                <?php elseif ( $active_tab === 'pages' ) : ?>
                    <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-top: 0;">Core Store Pages &amp; ACF Custom Fields</h3>
                    <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">
                        All non-post pages are fully editable from the WordPress Dashboard. Click "Edit Content" to update the Gutenberg/rich content or "ACF Fields" to configure structured fields.
                    </p>

                    <div style="margin-bottom: 25px; display: flex; gap: 12px;">
                        <a href="edit.php?post_type=page" class="button button-secondary">
                            <span class="dashicons dashicons-admin-page" style="margin-top: 4px;"></span>
                            View All WordPress Pages
                        </a>
                        <a href="edit.php?post_type=acf-field-group" class="button button-secondary">
                            <span class="dashicons dashicons-forms" style="margin-top: 4px;"></span>
                            Manage ACF Field Groups
                        </a>
                    </div>

                    <table class="wp-list-table widefat fixed striped">
                        <thead>
                            <tr>
                                <th style="width: 50px;">ID</th>
                                <th>Page Title</th>
                                <th>Slug / Frontend Route</th>
                                <th>ACF Custom Fields</th>
                                <th style="width: 240px;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>20</td>
                                <td><strong>About Us</strong></td>
                                <td><code>/about</code></td>
                                <td><span class="badge" style="background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 4px; font-weight: 600;">group_abf_about_page</span></td>
                                <td>
                                    <a href="post.php?post=20&action=edit" class="button button-small button-primary">Edit Content &amp; ACF</a>
                                    <a href="https://abeautynfashion.com/about" target="_blank" class="button button-small">View Live ↗</a>
                                </td>
                            </tr>
                            <tr>
                                <td>21</td>
                                <td><strong>Contact Us</strong></td>
                                <td><code>/contact</code></td>
                                <td><span class="badge" style="background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 4px; font-weight: 600;">group_abf_contact_page</span></td>
                                <td>
                                    <a href="post.php?post=21&action=edit" class="button button-small button-primary">Edit Content &amp; ACF</a>
                                    <a href="https://abeautynfashion.com/contact" target="_blank" class="button button-small">View Live ↗</a>
                                </td>
                            </tr>
                            <tr>
                                <td>22</td>
                                <td><strong>Frequently Asked Questions</strong></td>
                                <td><code>/faq</code></td>
                                <td><span class="badge" style="background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 4px; font-weight: 600;">group_abf_faq_page</span></td>
                                <td>
                                    <a href="post.php?post=22&action=edit" class="button button-small button-primary">Edit Content &amp; ACF</a>
                                    <a href="https://abeautynfashion.com/faq" target="_blank" class="button button-small">View Live ↗</a>
                                </td>
                            </tr>
                            <tr>
                                <td>23</td>
                                <td><strong>Shipping &amp; Returns Policy</strong></td>
                                <td><code>/shipping-returns</code></td>
                                <td><span style="color: #64748b;">WordPress Rich Editor</span></td>
                                <td>
                                    <a href="post.php?post=23&action=edit" class="button button-small button-primary">Edit Content</a>
                                    <a href="https://abeautynfashion.com/shipping-returns" target="_blank" class="button button-small">View Live ↗</a>
                                </td>
                            </tr>
                            <tr>
                                <td>24</td>
                                <td><strong>100% Authenticity Guarantee</strong></td>
                                <td><code>/authenticity</code></td>
                                <td><span style="color: #64748b;">WordPress Rich Editor</span></td>
                                <td>
                                    <a href="post.php?post=24&action=edit" class="button button-small button-primary">Edit Content</a>
                                    <a href="https://abeautynfashion.com/authenticity" target="_blank" class="button button-small">View Live ↗</a>
                                </td>
                            </tr>
                            <tr>
                                <td>25</td>
                                <td><strong>Terms &amp; Conditions</strong></td>
                                <td><code>/terms</code></td>
                                <td><span style="color: #64748b;">WordPress Rich Editor</span></td>
                                <td>
                                    <a href="post.php?post=25&action=edit" class="button button-small button-primary">Edit Content</a>
                                    <a href="https://abeautynfashion.com/terms" target="_blank" class="button button-small">View Live ↗</a>
                                </td>
                            </tr>
                            <tr>
                                <td>26</td>
                                <td><strong>Privacy Policy</strong></td>
                                <td><code>/privacy</code></td>
                                <td><span style="color: #64748b;">WordPress Rich Editor</span></td>
                                <td>
                                    <a href="post.php?post=26&action=edit" class="button button-small button-primary">Edit Content</a>
                                    <a href="https://abeautynfashion.com/privacy" target="_blank" class="button button-small">View Live ↗</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                <!-- TAB 7: CUSTOMER INQUIRIES & CHAT MESSAGES -->
                <?php elseif ( $active_tab === 'inquiries' ) : ?>
                    <?php
                    $all_inquiries = get_option( 'abf_customer_inquiries', [] );
                    if ( ! is_array( $all_inquiries ) ) {
                        $all_inquiries = [];
                    }
                    $reversed_inquiries = array_reverse( $all_inquiries );
                    ?>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; margin-top: 0; margin-bottom: 16px;">
                        <div>
                            <h3 style="margin: 0 0 4px 0; font-size: 18px; color: #0f172a;">Customer Inquiries &amp; Live Chat Messages</h3>
                            <p style="margin: 0; color: #64748b; font-size: 13px;">Messages submitted via the Contact Us form and the storefront Live Support Chat widget.</p>
                        </div>
                        <?php if ( ! empty( $all_inquiries ) ) : ?>
                            <a href="<?php echo esc_url( wp_nonce_url( admin_url( 'admin.php?page=abf-store-settings&tab=inquiries&inq_action=clear_all' ), 'abf_inquiry_action' ) ); ?>" 
                               class="button button-link-delete" 
                               onclick="return confirm('Are you sure you want to delete all inquiries? This action cannot be undone.');"
                               style="color: #e11d48; text-decoration: none; font-weight: 600;">
                               Clear All Inquiries
                            </a>
                        <?php endif; ?>
                    </div>

                    <?php if ( empty( $all_inquiries ) ) : ?>
                        <div style="padding: 60px 20px; text-align: center; color: #94a3b8;">
                            <span class="dashicons dashicons-format-chat" style="font-size: 48px; width: 48px; height: 48px; margin-bottom: 12px; color: #cbd5e1;"></span>
                            <h4 style="margin: 0 0 6px 0; color: #475569; font-size: 16px;">No customer inquiries yet</h4>
                            <p style="margin: 0; font-size: 13px;">When customers submit the contact form or leave a message via the support chat widget, their details will appear here with 1-click WhatsApp reply actions.</p>
                        </div>
                    <?php else : ?>
                        <table class="wp-list-table widefat fixed striped">
                            <thead>
                                <tr>
                                    <th style="width: 140px;">Date &amp; Time</th>
                                    <th style="width: 180px;">Customer</th>
                                    <th style="width: 120px;">Source</th>
                                    <th>Message &amp; Subject</th>
                                    <th style="width: 170px;">Quick Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ( $reversed_inquiries as $inq ) : 
                                    $raw_phone = $inq['phone'] ?? '';
                                    $clean_phone = preg_replace( '/[^0-9]/', '', $raw_phone );
                                    if ( strpos( $clean_phone, '01' ) === 0 && strlen( $clean_phone ) === 11 ) {
                                        $clean_phone = '88' . $clean_phone;
                                    }
                                    $customer_name = $inq['name'] ?? 'Website Visitor';
                                    $wa_text = rawurlencode( "Hello " . $customer_name . ", thank you for contacting ABeauty & Fashion regarding your inquiry. How may we assist you further today?" );
                                    $wa_url = ! empty( $clean_phone ) ? "https://wa.me/{$clean_phone}?text={$wa_text}" : '';
                                    $is_chat = ( $inq['source'] ?? '' ) === 'live-support-chat';
                                ?>
                                    <tr>
                                        <td>
                                            <div style="font-size: 12px; color: #475569; font-weight: 500;">
                                                <?php echo esc_html( date( 'M j, Y', strtotime( $inq['date'] ?? 'now' ) ) ); ?>
                                            </div>
                                            <div style="font-size: 11px; color: #94a3b8;">
                                                <?php echo esc_html( date( 'g:i A', strtotime( $inq['date'] ?? 'now' ) ) ); ?>
                                            </div>
                                        </td>
                                        <td>
                                            <div style="font-weight: 600; color: #0f172a; margin-bottom: 2px;">
                                                <?php echo esc_html( $customer_name ); ?>
                                            </div>
                                            <?php if ( ! empty( $inq['phone'] ) ) : ?>
                                                <div style="font-size: 12px;">
                                                    <a href="tel:<?php echo esc_attr( $inq['phone'] ); ?>" style="color: #0284c7; text-decoration: none;">
                                                        📞 <?php echo esc_html( $inq['phone'] ); ?>
                                                    </a>
                                                </div>
                                            <?php endif; ?>
                                            <?php if ( ! empty( $inq['email'] ) ) : ?>
                                                <div style="font-size: 12px;">
                                                    <a href="mailto:<?php echo esc_attr( $inq['email'] ); ?>" style="color: #64748b; text-decoration: none;">
                                                        ✉️ <?php echo esc_html( $inq['email'] ); ?>
                                                    </a>
                                                </div>
                                            <?php endif; ?>
                                        </td>
                                        <td>
                                            <?php if ( $is_chat ) : ?>
                                                <span class="badge" style="background: #fdf2f8; color: #be185d; border: 1px solid #fbcfe8; padding: 3px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                                                    💬 Live Chat
                                                </span>
                                            <?php else : ?>
                                                <span class="badge" style="background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; padding: 3px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                                                    ✉️ Contact Page
                                                </span>
                                            <?php endif; ?>
                                        </td>
                                        <td>
                                            <?php if ( ! empty( $inq['subject'] ) && $inq['subject'] !== 'New Customer Inquiry' ) : ?>
                                                <div style="font-weight: 600; font-size: 13px; color: #1e293b; margin-bottom: 4px;">
                                                    <?php echo esc_html( $inq['subject'] ); ?>
                                                </div>
                                            <?php endif; ?>
                                            <div style="font-size: 13px; line-height: 1.5; color: #334155; white-space: pre-wrap; background: #f8fafc; padding: 8px 12px; border-radius: 6px; border: 1px solid #e2e8f0;"><?php echo esc_html( $inq['message'] ?? '' ); ?></div>
                                        </td>
                                        <td>
                                            <div style="display: flex; flex-direction: column; gap: 6px;">
                                                <?php if ( ! empty( $wa_url ) ) : ?>
                                                    <a href="<?php echo esc_url( $wa_url ); ?>" target="_blank" class="button button-small" style="background: #25D366; color: #fff; border-color: #1ebe5d; font-weight: 600; text-align: center;">
                                                        WhatsApp Reply ↗
                                                    </a>
                                                <?php endif; ?>
                                                <div style="display: flex; gap: 6px;">
                                                    <?php if ( ! empty( $inq['phone'] ) ) : ?>
                                                        <a href="tel:<?php echo esc_attr( $inq['phone'] ); ?>" class="button button-small" title="Call Customer">Call</a>
                                                    <?php endif; ?>
                                                    <a href="<?php echo esc_url( wp_nonce_url( admin_url( 'admin.php?page=abf-store-settings&tab=inquiries&inq_action=delete&inq_id=' . urlencode( $inq['id'] ?? '' ) ), 'abf_inquiry_action' ) ); ?>" 
                                                       class="button button-small button-link-delete" 
                                                       onclick="return confirm('Delete this inquiry?');"
                                                       style="color: #ef4444;">
                                                       Delete
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php endif; ?>
                <?php endif; ?>

                <?php if ( in_array( $active_tab, [ 'header', 'hero', 'trust', 'footer' ], true ) ) : ?>
                    <p class="submit" style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #f1f5f9;">
                        <input type="submit" name="submit" id="submit" class="button button-primary button-large" style="background: #e11d48; border-color: #be123c; padding: 0 25px; height: 40px; font-weight: bold;" value="Save All Changes" />
                    </p>
                <?php endif; ?>
            </form>
        </div>
        <?php
    }

    /**
     * Programmatic ACF Field Groups for Pages
     */
    public function register_acf_field_groups() {
        if ( ! function_exists( 'acf_add_local_field_group' ) ) {
            return;
        }

        // About Page Field Group
        acf_add_local_field_group( [
            'key' => 'group_abf_about_page',
            'title' => 'About Page Custom Content',
            'fields' => [
                [
                    'key' => 'field_about_eyebrow_en',
                    'label' => 'Eyebrow (English)',
                    'name' => 'about_eyebrow_en',
                    'type' => 'text',
                    'default_value' => 'Our Heritage & Philosophy',
                ],
                [
                    'key' => 'field_about_eyebrow_bn',
                    'label' => 'Eyebrow (বাংলা)',
                    'name' => 'about_eyebrow_bn',
                    'type' => 'text',
                    'default_value' => 'আমাদের পরিচিতি ও দর্শন',
                ],
                [
                    'key' => 'field_about_heading_en',
                    'label' => 'Main Heading (English)',
                    'name' => 'about_heading_en',
                    'type' => 'text',
                    'default_value' => 'Curating the World\'s Finest Beauty & Fashion for Discerning Bangladesh.',
                ],
                [
                    'key' => 'field_about_heading_bn',
                    'label' => 'Main Heading (বাংলা)',
                    'name' => 'about_heading_bn',
                    'type' => 'text',
                    'default_value' => 'বিশুদ্ধ সৌন্দর্য ও আভিজাত্যের নির্ভরযোগ্য ঠিকানা।',
                ],
                [
                    'key' => 'field_about_story_en',
                    'label' => 'Mission & Story (English)',
                    'name' => 'about_story_en',
                    'type' => 'textarea',
                    'rows' => 4,
                ],
                [
                    'key' => 'field_about_story_bn',
                    'label' => 'Mission & Story (বাংলা)',
                    'name' => 'about_story_bn',
                    'type' => 'textarea',
                    'rows' => 4,
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'page',
                        'operator' => '==',
                        'value' => (string) ( get_page_by_path('about') ? get_page_by_path('about')->ID : 0 ),
                    ],
                ],
            ],
            'show_in_graphql' => true,
            'graphql_field_name' => 'aboutPageFields',
        ] );

        // Contact Page Field Group
        acf_add_local_field_group( [
            'key' => 'group_abf_contact_page',
            'title' => 'Contact Page Details',
            'fields' => [
                [
                    'key' => 'field_contact_phone',
                    'label' => 'Customer Care Hotline',
                    'name' => 'contact_phone',
                    'type' => 'text',
                    'default_value' => '+880 1712-377577',
                ],
                [
                    'key' => 'field_contact_email',
                    'label' => 'Support Email',
                    'name' => 'contact_email',
                    'type' => 'email',
                    'default_value' => 'support@abeautynfashion.com',
                ],
                [
                    'key' => 'field_contact_whatsapp',
                    'label' => 'WhatsApp Number',
                    'name' => 'contact_whatsapp',
                    'type' => 'text',
                    'default_value' => '+8801811377577',
                ],
                [
                    'key' => 'field_contact_address_en',
                    'label' => 'Physical Address (English)',
                    'name' => 'contact_address_en',
                    'type' => 'textarea',
                    'rows' => 3,
                    'default_value' => "House 42, Road 11, Block D\nBanani, Dhaka 1213, Bangladesh",
                ],
                [
                    'key' => 'field_contact_address_bn',
                    'label' => 'Physical Address (বাংলা)',
                    'name' => 'contact_address_bn',
                    'type' => 'textarea',
                    'rows' => 3,
                    'default_value' => "বাড়ি ৪২, রোড ১১, ব্লক ডি\nবনানী, ঢাকা ১২১৩, বাংলাদেশ",
                ],
                [
                    'key' => 'field_contact_hours',
                    'label' => 'Operating Hours',
                    'name' => 'contact_hours',
                    'type' => 'text',
                    'default_value' => 'Saturday – Thursday: 10:00 AM – 10:00 PM',
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'page',
                        'operator' => '==',
                        'value' => (string) ( get_page_by_path('contact') ? get_page_by_path('contact')->ID : 0 ),
                    ],
                ],
            ],
            'show_in_graphql' => true,
            'graphql_field_name' => 'contactPageFields',
        ] );
    }

    /**
     * Ensure core pages exist in WordPress
     */
    public function register_default_pages_and_fields() {
        if ( ! get_option( 'abf_pages_initialized' ) ) {
            $pages = [
                'about' => [
                    'title' => 'About Us',
                    'content' => 'ABeauty & Fashion was founded with a single mission: to provide authentic, dermatologically tested, high-performance beauty and skincare.',
                ],
                'contact' => [
                    'title' => 'Contact Us',
                    'content' => 'Get in touch with our beauty concierge team.',
                ],
                'faq' => [
                    'title' => 'Frequently Asked Questions',
                    'content' => 'Find answers to common questions about orders, authenticity, and shipping.',
                ],
                'shipping-returns' => [
                    'title' => 'Shipping & Returns Policy',
                    'content' => 'Comprehensive information on delivery rates, timelines, and 7-day hassle-free returns.',
                ],
                'authenticity' => [
                    'title' => '100% Authenticity Guarantee',
                    'content' => 'Every single product is 100% genuine and directly imported from authorized brand distributors.',
                ],
                'terms' => [
                    'title' => 'Terms & Conditions',
                    'content' => 'General terms and conditions for using abeautynfashion.com.',
                ],
                'privacy' => [
                    'title' => 'Privacy Policy',
                    'content' => 'Information on how we handle and protect customer privacy.',
                ],
            ];

            foreach ( $pages as $slug => $data ) {
                $existing = get_page_by_path( $slug );
                if ( ! $existing ) {
                    wp_insert_post( [
                        'post_title'   => $data['title'],
                        'post_name'    => $slug,
                        'post_content' => $data['content'],
                        'post_status'  => 'publish',
                        'post_type'    => 'page',
                    ] );
                }
            }

            update_option( 'abf_pages_initialized', 1 );
        }
    }
}

new ABF_Store_Customizer();
