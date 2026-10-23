<?php
/**
 * ABeauty & Fashion - WooCommerce Catalog Seeder & Settings Configurator
 * Configures Shipping Zones (Inside/Outside Dhaka), Payment Gateways, Categories, and Products.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

echo "=== 1. Configuring WooCommerce Store Settings ===\n";

// General Options
update_option( 'woocommerce_default_country', 'BD:BD-13' ); // Bangladesh: Dhaka
update_option( 'woocommerce_allowed_countries', 'all' );
update_option( 'woocommerce_ship_to_countries', 'all' );
update_option( 'woocommerce_currency', 'USD' ); // Default store base currency (Dual-currency displayed via frontend)
update_option( 'woocommerce_currency_pos', 'left' );
update_option( 'woocommerce_price_thousand_sep', ',' );
update_option( 'woocommerce_price_decimal_sep', '.' );
update_option( 'woocommerce_price_num_decimals', 2 );
update_option( 'woocommerce_enable_reviews', 'yes' );
update_option( 'woocommerce_review_rating_verification_required', 'no' );
update_option( 'woocommerce_manage_stock', 'yes' );
update_option( 'woocommerce_notify_low_stock', 'yes' );

echo "Store general settings updated.\n";

echo "=== 2. Configuring Payment Gateways ===\n";

// Enable Cash on Delivery (COD)
$cod_settings = array(
    'enabled'            => 'yes',
    'title'              => 'Cash on Delivery (ক্যাশ অন ডেলিভারি)',
    'description'        => 'Pay securely with cash or mobile banking (bKash/Nagad) upon receiving your delivery at your doorstep.',
    'instructions'       => 'Please keep the exact amount ready when the courier arrives. Unboxing verification is available upon request.',
    'enable_for_methods' => array(),
    'enable_for_virtual' => 'no',
);
update_option( 'woocommerce_cod_settings', $cod_settings );

// Enable bKash / Nagad / Manual Instructions via BACS (Direct Bank Transfer)
$bacs_settings = array(
    'enabled'      => 'yes',
    'title'        => 'bKash / Nagad / Bank Transfer (ম্যানুয়াল পেমেন্ট)',
    'description'  => 'Send payment directly via bKash or Nagad Merchant / Personal number.',
    'instructions' => "bKash Merchant: 01711000000 (Payment)\nNagad Merchant: 01711000000 (Payment)\nPlease enter your Order ID as the reference.",
);
update_option( 'woocommerce_bacs_settings', $bacs_settings );

echo "Payment gateways configured.\n";

echo "=== 3. Configuring Shipping Zones ===\n";

// Purge existing zones to avoid duplication
$existing_zones = WC_Shipping_Zones::get_zones();
foreach ( $existing_zones as $zone_data ) {
    WC_Shipping_Zones::delete_zone( $zone_data['zone_id'] );
}

// 1. Inside Dhaka Zone
$dhaka_zone = new WC_Shipping_Zone();
$dhaka_zone->set_zone_name( 'Inside Dhaka (ঢাকা সিটি)' );
$dhaka_zone->set_zone_order( 1 );
$dhaka_zone->save();

// Inside Dhaka Flat Rate ($0.75 / ~৳80)
$flat_dhaka_id = $dhaka_zone->add_shipping_method( 'flat_rate' );
$flat_dhaka    = WC_Shipping_Zones::get_shipping_method( $flat_dhaka_id );
$flat_dhaka->init_instance_settings();
$flat_dhaka->instance_settings['title'] = 'Inside Dhaka Express (১-২ দিন)';
$flat_dhaka->instance_settings['cost']  = '0.75';
update_option( $flat_dhaka->get_instance_option_key(), $flat_dhaka->instance_settings );

// Inside Dhaka Free Shipping over $50 (~৳2,000)
$free_dhaka_id = $dhaka_zone->add_shipping_method( 'free_shipping' );
$free_dhaka    = WC_Shipping_Zones::get_shipping_method( $free_dhaka_id );
$free_dhaka->init_instance_settings();
$free_dhaka->instance_settings['title']     = 'Free Shipping (অর্ডারে ফ্রি ডেলিভারি)';
$free_dhaka->instance_settings['requires']  = 'min_amount';
$free_dhaka->instance_settings['min_amount'] = '50';
update_option( $free_dhaka->get_instance_option_key(), $free_dhaka->instance_settings );

// 2. Outside Dhaka Zone
$outside_zone = new WC_Shipping_Zone();
$outside_zone->set_zone_name( 'Outside Dhaka (ঢাকার বাইরে)' );
$outside_zone->set_zone_order( 2 );
$outside_zone->save();

// Outside Dhaka Flat Rate ($1.20 / ~৳130)
$flat_out_id = $outside_zone->add_shipping_method( 'flat_rate' );
$flat_out    = WC_Shipping_Zones::get_shipping_method( $flat_out_id );
$flat_out->init_instance_settings();
$flat_out->instance_settings['title'] = 'Nationwide Courier (২-৩ দিন)';
$flat_out->instance_settings['cost']  = '1.20';
update_option( $flat_out->get_instance_option_key(), $flat_out->instance_settings );

// Outside Dhaka Free Shipping over $80 (~৳3,500)
$free_out_id = $outside_zone->add_shipping_method( 'free_shipping' );
$free_out    = WC_Shipping_Zones::get_shipping_method( $free_out_id );
$free_out->init_instance_settings();
$free_out->instance_settings['title']     = 'Free Nationwide Shipping';
$free_out->instance_settings['requires']  = 'min_amount';
$free_out->instance_settings['min_amount'] = '80';
update_option( $free_out->get_instance_option_key(), $free_out->instance_settings );

echo "Shipping zones established successfully.\n";

echo "=== 4. Creating Product Categories ===\n";

$categories = array(
    'Skincare' => array(
        'slug'        => 'skincare',
        'description' => 'Dermatologist-tested serums, creams, cleansers, and sunscreens tailored for radiant, resilient skin.',
        'children'    => array(
            'Serums & Ampoules'   => 'serums',
            'Moisturizers & Creams' => 'moisturizers',
            'Sunscreen & SPF'     => 'sunscreen',
            'Cleansers & Toners'  => 'cleansers',
        ),
    ),
    'Makeup' => array(
        'slug'        => 'makeup',
        'description' => 'Weightless foundations, long-lasting matte lip stains, and eye cosmetics for effortless elegance.',
        'children'    => array(
            'Face & Foundation' => 'face',
            'Lips & Stains'     => 'lips',
            'Eyes & Brows'      => 'eyes',
        ),
    ),
    'Hair Care' => array(
        'slug'        => 'hair-care',
        'description' => 'Nutrient-rich hair masks, scalp treatments, and shampoos for revitalized texture and shine.',
        'children'    => array(),
    ),
    'Beauty Tools' => array(
        'slug'        => 'beauty-tools',
        'description' => 'Sonic facial cleansers, gua sha stones, and precision ionic hair stylers.',
        'children'    => array(),
    ),
    'Fragrance' => array(
        'slug'        => 'fragrance',
        'description' => 'Artisanal Eau de Parfums and body mists with long-lasting floral and woody notes.',
        'children'    => array(),
    ),
);

$cat_map = array();

foreach ( $categories as $parent_name => $cat_data ) {
    $term = term_exists( $cat_data['slug'], 'product_cat' );
    if ( ! $term ) {
        $term = wp_insert_term(
            $parent_name,
            'product_cat',
            array(
                'slug'        => $cat_data['slug'],
                'description' => $cat_data['description'],
            )
        );
    }
    $parent_id = is_array( $term ) ? $term['term_id'] : $term;
    $cat_map[ $cat_data['slug'] ] = $parent_id;
    echo "Category: $parent_name (ID: $parent_id)\n";

    foreach ( $cat_data['children'] as $child_name => $child_slug ) {
        $child_term = term_exists( $child_slug, 'product_cat' );
        if ( ! $child_term ) {
            $child_term = wp_insert_term(
                $child_name,
                'product_cat',
                array(
                    'slug'        => $child_slug,
                    'parent'      => $parent_id,
                )
            );
        }
        $child_id = is_array( $child_term ) ? $child_term['term_id'] : $child_term;
        $cat_map[ $child_slug ] = $child_id;
    }
}

echo "=== 5. Seeding Curated Premium Products ===\n";

$products = array(
    array(
        'name'        => 'Radiance C+ Squalane Serum 30ml',
        'slug'        => 'radiance-c-squalane-serum',
        'price'       => '38.00',
        'regular'     => '44.00',
        'category'    => 'serums',
        'sku'         => 'ABF-SK-001',
        'stock'       => 45,
        'rating'      => 4.9,
        'reviews'     => 128,
        'short_desc'  => 'Concentrated 15% THD Ascorbate Vitamin C infused with plant-derived olive squalane for intense brightening without irritation.',
        'description' => "Experience high-potency antioxidant protection with our Radiance C+ Squalane Serum.\n\nFormulated with an ultra-stable Vitamin C lipid ester (THD Ascorbate) and pure olive squalane, this fast-absorbing serum penetrates deeply to fade dark spots, boost natural collagen synthesis, and restore radiant glow to fatigued skin.",
        'image'       => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    ),
    array(
        'name'        => 'Hydra-Barrier Ceramide Cream 50ml',
        'slug'        => 'hydra-barrier-ceramide-cream',
        'price'       => '34.00',
        'regular'     => '34.00',
        'category'    => 'moisturizers',
        'sku'         => 'ABF-SK-002',
        'stock'       => 60,
        'rating'      => 4.8,
        'reviews'     => 94,
        'short_desc'  => 'Triple ceramide complex (NP, AP, EOP) with centella asiatica to repair the compromised skin moisture barrier.',
        'description' => "Our Hydra-Barrier Ceramide Cream delivers 72-hour sustained hydration while sealing microscopic moisture leaks.\n\nPerfect for sensitive, dry, or over-exfoliated skin, this velvety rich formula calms visible redness and restores skin elasticity.",
        'image'       => 'https://images.unsplash.com/photo-1608248597359-009187ec09a9?q=80&w=800&auto=format&fit=crop',
    ),
    array(
        'name'        => 'Velvet Matte Lip Stain #04 Berry Flush',
        'slug'        => 'velvet-matte-lip-stain-berry-flush',
        'price'       => '24.00',
        'regular'     => '28.00',
        'category'    => 'lips',
        'sku'         => 'ABF-MU-001',
        'stock'       => 35,
        'rating'      => 4.9,
        'reviews'     => 210,
        'short_desc'  => 'Non-drying, transfer-proof velvet lip tint infused with rosehip seed oil and vitamin E for all-day comfort.',
        'description' => "A lightweight, feather-soft matte lip stain designed for high pigment payoff without settling into fine lines.\n\nFormulated with hydrating jojoba and rosehip seed oils to keep lips moisturized throughout Bangladesh's humid weather.",
        'image'       => 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop',
    ),
    array(
        'name'        => 'Pro-Sonic Facial Cleansing Device',
        'slug'        => 'pro-sonic-facial-cleansing-device',
        'price'       => '79.00',
        'regular'     => '95.00',
        'category'    => 'beauty-tools',
        'sku'         => 'ABF-TL-001',
        'stock'       => 20,
        'rating'      => 5.0,
        'reviews'     => 62,
        'short_desc'  => '12,000 sonic pulsations per minute with ultra-hygienic medical grade silicone bristles and thermal massage mode.',
        'description' => "Elevate your daily cleansing ritual. The Pro-Sonic cleansing device removes 99.5% of dirt, oil, sunscreen, and makeup residue while promoting lymphatic drainage.",
        'image'       => 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop',
    ),
    array(
        'name'        => 'Silk Amino Acid Deep Repair Hair Mask 200ml',
        'slug'        => 'silk-amino-acid-repair-hair-mask',
        'price'       => '32.00',
        'regular'     => '38.00',
        'category'    => 'hair-care',
        'sku'         => 'ABF-HC-001',
        'stock'       => 50,
        'rating'      => 4.7,
        'reviews'     => 75,
        'short_desc'  => 'Intensive reconstructive treatment with 18 hydrolyzed silk amino acids and Moroccan argan oil.',
        'description' => "Transforms brittle, heat-damaged, or frizzy strands into lustrous silk. Rebuilds internal hair keratin bonds and locks out ambient humidity.",
        'image'       => 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop',
    ),
    array(
        'name'        => 'Eau de Parfum - Jasmine & Cashmere 50ml',
        'slug'        => 'eau-de-parfum-jasmine-cashmere',
        'price'       => '65.00',
        'regular'     => '65.00',
        'category'    => 'fragrance',
        'sku'         => 'ABF-FR-001',
        'stock'       => 25,
        'rating'      => 4.9,
        'reviews'     => 43,
        'short_desc'  => 'Artisanal perfume blending night-blooming Bengali jasmine, bergamot, creamy sandalwood, and warm amber cashmere.',
        'description' => "An evocative, long-wearing fragrance celebrating the sensory poetry of South Asian florals blended with modern French perfumery elegance.",
        'image'       => 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
    ),
);

foreach ( $products as $item ) {
    $existing = wc_get_product_id_by_sku( $item['sku'] );
    if ( $existing ) {
        $p = wc_get_product( $existing );
    } else {
        $p = new WC_Product_Simple();
    }

    $p->set_name( $item['name'] );
    $p->set_slug( $item['slug'] );
    $p->set_regular_price( $item['regular'] );
    $p->set_price( $item['price'] );
    if ( $item['price'] < $item['regular'] ) {
        $p->set_sale_price( $item['price'] );
    }
    $p->set_sku( $item['sku'] );
    $p->set_manage_stock( true );
    $p->set_stock_quantity( $item['stock'] );
    $p->set_stock_status( 'instock' );
    $p->set_short_description( $item['short_desc'] );
    $p->set_description( $item['description'] );

    // Assign Category
    if ( isset( $cat_map[ $item['category'] ] ) ) {
        $p->set_category_ids( array( $cat_map[ $item['category'] ] ) );
    }

    $pid = $p->save();

    // Set average rating & review count directly for initial showcase
    update_post_meta( $pid, '_wc_average_rating', (string) $item['rating'] );
    update_post_meta( $pid, '_wc_review_count', (int) $item['reviews'] );

    echo "Product seeded: {$item['name']} (ID: $pid, SKU: {$item['sku']}, Price: \${$item['price']})\n";
}

echo "=== SEEDING COMPLETED SUCCESSFULLY ===\n";
