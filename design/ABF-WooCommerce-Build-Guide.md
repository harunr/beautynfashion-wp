# ABeauty & Fashion — WooCommerce Build Guide (EN + বাংলা)

**Handover to:** Antigravity (implementation agent)
**Owner:** Webtricker LLC — Mosharaf
**Site:** https://www.abeautynfashion.com
**Design source:** Claude Design canvas "ABeauty & Fashion — WooCommerce Store" (34 artboards). The canvas is private, so ask the owner for a share link, or use the exported `design-source/` folder bundled with this guide.
**Status:** Design complete; build not started.

---

## 0. Read this first

1. **Source of truth.** Each artboard in the canvas has a matching `design-source/project/<Name>.dc.html` file. They are static HTML mockups with inline styles. `<sc-for>` / `<sc-if>` / `{{…}}` are the design tool's template syntax; read them as "loop / condition / data". The data arrays are in the `<script data-dc-script>` block at the bottom of each file.
2. **Don't copy mockup markup verbatim into production.** Rebuild it as theme templates using the tokens in §4. The mockups define layout, spacing, hierarchy, copy and states.
3. **Placeholders.** Anything in `[square brackets]` is a missing business fact (address, phone, return window, response time, retention period, legal entity, etc.). Never ship a bracket. Collect the values from the owner (§13).
4. **Sample catalogue.** All product names, prices, ratings and review counts in the designs are samples. Import the real catalogue.
5. **Images.** The designs use labelled pastel placeholders. A shot list is in §12.
6. **Workflow rule.** Every task in §14 has scope, acceptance criteria and a verification checklist. Do not mark a task done until its checklist passes. Do not commit or push unless the owner asks.

---

## 1. Current state of the live site (must fix before anything else)

The current abeautynfashion.com is a WordPress affiliate blog using a "Product Affiliate" theme. **The homepage contains injected spam links (online casinos and sports betting, many languages). The site is compromised.**

Effects: SEO penalties, possible Google Safe Browsing flags, and a risk of reinfecting the new build if old files or DB rows are carried over.

**Task 0 (blocking): Clean and secure** (details in §14, T0)
- Full backup (files + DB) to offline storage. Keep it as forensic evidence and do not restore from it blindly.
- Scan: Wordfence or Sucuri scanner, plus manual grep for `eval(`, `base64_decode(`, `gzinflate(`, `str_rot13(`, unknown files in `wp-content/uploads/*.php`, and unknown mu-plugins.
- DB: search `wp_options` (`siteurl`, `home`, widget options, `active_plugins`) and `wp_posts.post_content` for spam domains and `<script>`/hidden link blocks.
- Rotate everything: WP admin passwords, DB password, SFTP/SSH, hosting panel, salts (`wp-config.php` keys), and API keys.
- Remove unused themes and plugins. Update core.
- Google Search Console: check Security Issues and Manual Actions, then request review after cleanup.
- **Migrate only content (posts, pages, media), not the old theme or plugins.** Export clean content via WXR and re-import into a fresh install.

---

## 2. Scope

### 2.1 Pages and templates (all have desktop + mobile designs; Home, Shop and Product also have tablet)

| # | Page / state | Artboards |
|---|---|---|
| 1 | Home | `Main` (desktop), `Tablet-Home`, `Mobile-Home`, `Desktop-Home-BN`, `Mobile-Home-BN` |
| 2 | Shop / category archive | `Desktop-Shop`, `Tablet-Shop`, `Mobile-Shop` |
| 3 | Single product | `Desktop-Product`, `Tablet-Product`, `Mobile-Product` |
| 4 | Cart | `Desktop-Cart`, `Mobile-Cart` |
| 5 | Checkout | `Desktop-Checkout`, `Mobile-Checkout`, `Mobile-Checkout-BN` |
| 6 | My Account (dashboard, orders, wishlist) | `Desktop-Account` |
| 7 | Search results + filters + live search | `Desktop-Search`, `Mobile-Search`, `Mobile-Search-Filter` |
| 8 | Contact | `Desktop-Contact`, `Mobile-Contact` |
| 9 | About | `Desktop-About`, `Mobile-About` |
| 10 | Privacy Policy | `Desktop-Privacy`, `Mobile-Legal` (tab 1) |
| 11 | Terms & Conditions | `Desktop-Terms`, `Mobile-Legal` (tab 2) |
| 12 | 404 | `Desktop-404`, `Mobile-404` |
| 13 | Mobile menu drawer | `Mobile-Menu` |
| 14 | Modals and popups | `Desktop-Modals` (7 states), `Mobile-Modal-Bag`, `Mobile-Modal-Order`, `Mobile-Modal-Success` |
| 15 | Blog / Journal (existing articles) | Uses Home journal cards; build archive and single templates in the same system |

### 2.2 Modals and popups (all must be accessible dialogs, §9)
1. Added to bag (desktop modal / mobile bottom sheet), with a free-shipping progress bar and cross-sells
2. Order confirmed / thank you (also the `order-received` endpoint page)
3. Newsletter subscribed (modal plus mobile toast)
4. Contact message sent
5. Sign in / Create account (tabs)
6. Quick view
7. Cookie consent (bottom bar, granular)

---

## 3. Bilingual architecture (EN + বাংলা): decision required

The owner asked for **"2 language options, and 2 DB/dashboards for Bangla and English."** There are three ways to do this. Pick one before starting T2.

### Option A: one site, translation plugin (simplest)
- One WordPress + WooCommerce install, **one database, one dashboard**.
- Polylang Pro (or WPML + WooCommerce Multilingual & Multicurrency) gives EN at `/` and BN at `/bn/`.
- Shared stock and orders. Multi-currency (USD / BDT) through the multilingual plugin's currency module.
- ✅ Lowest maintenance, single inventory, single order list.
- ❌ Doesn't meet the "2 dashboards" requirement. Per-language payment gateways and shipping need conditional logic.

### Option B: WordPress Multisite, two sub-sites (recommended if separate dashboards are a must)
- One WordPress install, **network-activated custom theme**, two sites:
  - Site 1 `abeautynfashion.com/` → **English**, USD, Stripe + PayPal, international shipping zones
  - Site 2 `abeautynfashion.com/bn/` → **বাংলা**, BDT (৳), COD + bKash + Nagad + cards (SSLCommerz or similar), Inside / Outside Dhaka zones
- Each site has its **own wp-admin dashboard, its own WooCommerce settings, orders, customers and reports, and its own set of DB tables** (`wp_` and `wp_2_` prefixes in one MySQL database). For most purposes that counts as separate databases.
- Link translations and hreflang with **MultilingualPress** (connects products/posts across sites, language switcher, hreflang).
- **Inventory:** if both stores sell from the same physical stock, add stock sync (WooMultistore-type plugin, or a small custom sync on `woocommerce_product_set_stock` / `woocommerce_reduce_order_stock` through Action Scheduler). If the stock is separate, skip sync.
- ✅ Separate dashboards, currencies, gateways, shipping and teams. Clean BD-market checkout.
- ❌ More moving parts: two catalogues to maintain (or sync) and two sets of settings.

### Option C: two completely separate installs and databases
- Two WordPress installs, two MySQL databases (e.g. `abeautynfashion.com` and `bn.abeautynfashion.com` or a `.com.bd` domain).
- ✅ Total isolation.
- ❌ Double updates and security surface, manual sync of everything, weaker cross-language SEO signals. **Not recommended** unless the two businesses are legally or operationally separate.

> **Operator note:** if the real market is Bangladesh and the English site exists mainly for SEO and content, consider making EN a content and catalogue site that still sells, and running the full BD commerce stack only on BN. Confirm with the owner where orders actually come from before building two full checkouts.

**Default if the owner doesn't answer:** Option B (subdirectory Multisite + MultilingualPress).

---

## 4. Design tokens

Put these in `theme.json` (palette, typography, spacing) **and** as CSS custom properties in `assets/css/tokens.css`.

### 4.1 Colour
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#1F1219` | Primary text, primary buttons |
| `--plum-900` | `#2A1220` | Footer, dark sections |
| `--plum-800` | `#3A1830` | Announcement bar, dark promo |
| `--plum-700` | `#52283F` | Placeholders on dark |
| `--rose` | `#C8325F` | Accent, sale badges, CTAs (5.1:1 on white) |
| `--rose-dark` | `#A3244B` | Rose hover; rose text on blush |
| `--rose-light` | `#F4A9C0` | Accent text on plum |
| `--blush-50` | `#FFF7F8` | Soft panels |
| `--blush-100` | `#FCEEF1` | Hero / section backgrounds |
| `--blush-200` | `#F6D7E0` | Image tints |
| `--line` | `#F1E4E8` | Dividers |
| `--line-strong` | `#EADBE0` / `#E3D3D9` | Pills / inputs |
| `--muted` | `#6E5A63` | Secondary text (≥4.5:1 on white and blush) |
| `--strike` | `#7A6570` | Was-price |
| `--success` | `#2E6B45` (bg `#E4F2E9`) | Stock, verified |
| Pastel tints | `#FBE4EA #FCE6D9 #FAF0D4 #E2EEE5 #ECE4F6 #E2ECF6 #F1E8DF` | Product and category image backgrounds |

### 4.2 Type
| Role | EN | BN |
|---|---|---|
| Display / headings | **Bricolage Grotesque** 700, letter-spacing −0.03em | **Anek Bangla** 700, letter-spacing **0** (never negative: it breaks conjuncts) |
| Accent word in headings | **Instrument Serif** italic (rose) | None. Use rose colour only |
| Body / UI | **DM Sans** 400/500/600/700 | **Hind Siliguri** 400/500/600/700, line-height ≥1.7 |

- **Self-host the fonts** (download woff2, `font-display: swap`) for performance and privacy. Don't hot-link Google Fonts in production.
- Load only the needed weights. BN fonts only on the BN site / `lang="bn"`.
- Scale (desktop → mobile): H1 92/76 → 48/40 · H2 48 → 32 · H3 28 → 22 · body 16–19 → 15–16 · small 13.

### 4.3 Shape and spacing
- Radius: pills and buttons `999px`; cards and images `20–32px`; inputs `14px`; modals `28px`.
- Spacing base 8px. Section padding desktop 88–112px vertical, 56px gutter; tablet 32px gutter; mobile 16px gutter.
- Containers: desktop content width 1328px (1440 − 2×56).
- Shadows: modal `0 40px 80px -30px rgba(20,8,14,.6)`; floating card `0 24px 48px -20px rgba(58,24,48,.35)`.
- Buttons: height 52–56 (desktop), 48–52 (mobile); minimum touch target 44×44.
- Breakpoints: `≥1280` desktop · `768–1279` tablet · `<768` mobile.

---

## 5. Tech stack and theme structure

- WordPress (latest), WooCommerce (latest), PHP 8.2+, MySQL 8 / MariaDB 10.6+.
- **HPOS** (High-Performance Order Storage) enabled.
- **Custom classic theme** `abf` (hand-coded PHP templates + WooCommerce template overrides + `theme.json` for tokens). No page builders.
- **Cart and checkout: classic (shortcode) templates**, not Blocks, unless every chosen gateway (bKash, Nagad, SSLCommerz, Stripe, PayPal) confirms Blocks support. BD gateway plugins often lag on Blocks. Verify before deciding.
- Front-end JS: vanilla ES modules. Optional build with Vite (`pnpm build`) producing `assets/dist/`.
- Recommended plugins (verify current compatibility before installing):
  - Languages: MultilingualPress (Option B) **or** Polylang Pro / WPML + WCML (Option A)
  - SEO: Rank Math or Yoast (per site)
  - Search: FiboSearch (AJAX search) **or** custom live search on the WooCommerce Store API
  - Filters: WooCommerce native product filters / attribute-based AJAX filtering (custom)
  - Payments EN: WooCommerce Stripe, WooCommerce PayPal Payments
  - Payments BN: SSLCommerz (cards + mobile wallets) and/or official bKash and Nagad gateway plugins, plus COD (core)
  - Forms: native (contact form handled by theme + `wp_mail` + nonce + honeypot), or Fluent Forms
  - Cookie consent: Complianz / CookieYes (styled to the `Desktop-Modals` #07 design)
  - Security: Wordfence (or host WAF), limit-login, 2FA for admins
  - Cache: host-level page cache + object cache (Redis), exclude cart/checkout/account

```
abf/
├── style.css               (theme header only)
├── theme.json              (tokens)
├── functions.php           (bootstrap → /inc)
├── inc/
│   ├── setup.php           (supports, menus, image sizes)
│   ├── assets.php          (enqueue, preload fonts)
│   ├── woocommerce.php     (hooks, wrappers, removals)
│   ├── checkout-bd.php     (BD fields, phone validation, zones)
│   ├── i18n.php            (text domain, Bangla numerals)
│   ├── ajax-search.php     (REST route for live search)
│   ├── filters.php         (AJAX product filters)
│   ├── modals.php          (dialog markup in footer)
│   └── schema.php          (JSON-LD)
├── template-parts/         (header, footer, product-card, lang-switcher, modals/*)
├── woocommerce/            (template overrides: archive-product, content-product,
│                            single-product/*, cart/*, checkout/*, myaccount/*)
├── page-contact.php  page-about.php  page-legal.php  404.php  search.php
├── languages/abf-bn_BD.po/.mo
└── assets/ (css, js, fonts, img, dist)
```

---

## 6. Component specs

Build each once and reuse it.

| Component | Notes |
|---|---|
| **Announcement bar** | Plum; 1–3 messages; editable via Customizer / options page; BN version on BN site |
| **Header (desktop)** | Logo · primary nav (7 items; "Sale/অফার" in rose) · search pill · **language switcher (EN / বাং segmented pill)** · account · wishlist · bag with count badge |
| **Header (tablet/mobile)** | Menu · logo (centred) · icons; search field below the header on mobile; horizontal category pill scroller |
| **Language switcher** | Links to the *translated equivalent* of the current page (MultilingualPress / Polylang API). `lang` attribute on each link, `aria-current` on the active one, `hreflang` in `<head>` |
| **Mobile menu drawer** | Off-canvas `<dialog>` 346px, account CTA, expandable categories (`aria-expanded`), promo tile, utility links; focus trap; Esc closes |
| **Product card** | 4:5 image · optional badge (Bestseller / New / Sale; sale is rose) · wishlist button (top-right) · quick-add "+" (bottom-right, AJAX add-to-cart) · category · name · price + was-price · rating. BN card shows a COD tag |
| **Category tile** | Circle image + label |
| **Flash sale strip (BN)** | Countdown driven by `_sale_price_dates_to` of the campaign; hide when expired; no fake timers |
| **Promo banners** | 2-up; title, short copy, CTA, image |
| **Concern / routine finder** | Chips link to filtered shop URLs (`?pa_concern=dryness`); "quiz" CTA is a phase-2 feature |
| **Journal cards** | Existing posts; tag = category; "Shop the products" links to products attached via an ACF relationship or a product-tag match |
| **Trust row** | 4 value props (from options page) |
| **Newsletter** | Email + consent copy → Mailchimp/Brevo/Klaviyo API (owner to choose); success → modal #3 |
| **Footer** | 4–5 link columns, socials, payment marks, legal links, trade licence (BN) |
| **Filters (shop/search)** | Desktop: left sidebar 272px. Mobile: bottom sheet (`Mobile-Search-Filter`). Facets: category, skin type, key ingredient, concern, price range, brand, rating, in stock, on sale. Counts per facet. Active-filter chips with remove. URL reflects state (shareable, crawl-safe: `noindex` on multi-facet combos) |
| **Sort** | Best match (search only) / popular / newest / price asc / price desc / rating |
| **Live search dropdown** | 2-column: suggestions + recent searches on the left; top 3 products + 1 journal hit + "See all N results" on the right; debounce 200ms; keyboard navigation (↑ ↓ Enter Esc), `role="combobox"` + `listbox` |
| **Search results page** | Tabs: Products (N) / Journal (N); same grid and filters as shop |
| **Product page** | Thumbnail rail + main image (zoom) + video slot · title · rating · price · short description · benefit tags · variation buttons (size, not dropdown) · qty stepper · add to bag · wishlist · stock state · perks · accordions (Details / How to use / Ingredients / Shipping & returns) · "Complete the routine" bundle (−10%) · reviews (summary + bars + filters) · related products |
| **Cart** | Free-shipping progress bar (threshold from settings) · line items with qty stepper · move to wishlist · remove · gift wrap (fee) · coupon · totals · checkout + express pay · cross-sells "Add $X more" |
| **Checkout EN** | Express pay row · numbered cards: Contact → Shipping address → Delivery method → Payment · sticky order summary · "add $X for free shipping" |
| **Checkout BN** | Guest-first, **phone-first** (+880, validate `^01[3-9]\d{8}$`), name, **district (জেলা) and thana/area (থানা) selects**, full address, email optional · delivery zone radio (inside / outside Dhaka) · payment: **COD (default)**, bKash, Nagad, card · coupon · terms consent · CTA "অর্ডার কনফার্ম করুন · ৳…" |
| **My Account** | Sidebar nav · stat cards · recent orders table with status pills · wishlist strip · addresses / payment methods / account details endpoints |
| **Legal template** | Title band + EN/BN tabs to sibling legal page · sticky TOC (desktop) / accordions (mobile) · section numbering · "Last updated" from post modified date |
| **404** | Big background "404", friendly headline, search, popular category pills, bestseller cards |
| **Modals** | See §2.2. One `<dialog>` system, shared JS |

---

## 7. WooCommerce data model

- **Categories (`product_cat`):** Skincare (Cleansers, Serums, Moisturisers, Masks, Sunscreen, Toners) · Makeup · Hair Care · Personal Care · Fragrance · Beauty Tools.
- **Global attributes (for filters):** `pa_skin-type`, `pa_concern`, `pa_key-ingredient`, `pa_size`, `pa_shade`, `pa_brand` (or a brand taxonomy).
- **Product meta / ACF:** benefit tags, how-to-use, full ingredients (INCI), video URL, "routine" related products (3), journal article relation.
- **Badges:** Bestseller (manual flag or top sales, 30 days), New (published < 30 days), Sale (on sale).
- **Reviews:** WooCommerce native reviews (verified-owner flag on) or Judge.me. Show skin type on each review via a custom review field.
- **Bundles ("Complete the routine"):** start with linked products + a dynamic coupon; upgrade to a bundles plugin later if needed.
- **Wishlist:** lightweight custom (user meta + localStorage for guests) or YITH Wishlist styled to the design.

---

## 8. Bangla localisation (BN site)

1. Site language `bn_BD`; `<html lang="bn">`.
2. Theme strings via `__()` / `_e()` with text domain `abf`. Ship `abf-bn_BD.po/.mo`. **No hard-coded strings in templates.**
3. **Currency:** BDT, symbol **৳**, position left, no decimals. Thousand separator `,` (matches the designs: ৳১,২৫০).
4. **Bangla numerals:** convert digits in prices, counts, dates and cart badges on the BN site only. Filter `formatted_woocommerce_price`, `woocommerce_get_price_html` and number outputs through a helper `abf_bn_digits()` (`0-9 → ০-৯`). Keep **form inputs, phone numbers and order IDs in Latin digits** for usability.
5. **Address fields:** replace state/city with **District (64 districts)** and **Thana/Upazila** (dependent select, JSON dataset in the theme). Postcode optional. Remove company and address line 2 or make them optional.
6. **Shipping zones:** "Inside Dhaka" and "Outside Dhaka" (flat rates are owner-defined; the designs show ৳60 / ৳120 as samples). Free shipping over the threshold (sample ৳2,000).
7. **Payments:** COD (default, optional extra fee per owner), bKash, Nagad, cards via SSLCommerz. Show gateway logos **only from each gateway's official brand kit**. Order confirmation by SMS (BD SMS gateway, owner to choose) in addition to email.
8. **Typography:** Hind Siliguri body, Anek Bangla headings; line-height 1.6–1.8; never apply negative letter-spacing or italics to Bangla.
9. **Journal:** BN translations of key articles; same slugs transliterated or translated (decide once and keep consistent).

---

## 9. Accessibility (WCAG 2.2 AA)

- Colour contrast as per tokens (rose on white 5.1:1, muted 6.4:1). Never put white text on pastel tints.
- Real `<button>`, `<a href>`, `<input>` + `<label>` everywhere. Icon-only buttons get an `aria-label` (BN labels on the BN site).
- Modals use native `<dialog>` with `showModal()`: focus moves to the dialog, focus is trapped, **Esc closes**, focus returns to the trigger, background is inert, and `aria-labelledby` points to the title.
- Live search is a combobox pattern; results count is announced with `aria-live="polite"`.
- Filters: `<fieldset>`/`<legend>`; price range uses two labelled number inputs as well as the visual slider.
- Visible focus ring: `outline: 2px solid var(--rose); outline-offset: 2px`.
- `prefers-reduced-motion`: disable hover lifts and countdown animations.

---

## 10. SEO / AEO / GEO

- **Preserve existing article URLs.** Crawl the old site (Screaming Frog) → map every URL → 301 anything that changes. No orphaned posts. Remove spam URLs and return **410** for them.
- **hreflang** `en`, `bn`, `x-default` (EN) on every translatable URL, generated by the multilingual plugin. Self-referencing canonicals.
- **Schema (JSON-LD):** `Organization` + `WebSite` (with `SearchAction`), `Product` + `Offer` (price, currency, availability) + `AggregateRating` + `Review` (real reviews only), `BreadcrumbList`, `Article` (journal), `FAQPage` (Contact quick answers, product FAQs), `ContactPage`, `AboutPage`.
- **AEO / GEO:** each buying guide opens with a 40–60-word direct answer, a comparison table and a "best for" list, and links to the products. Product pages: clear "who it's for / how to use / key ingredients" blocks (already in the design accordions). Add an `llms.txt` at the root listing key guides and categories.
- Faceted URLs: `noindex,follow` for combinations of 2+ facets; index only clean category and attribute landing pages you want ranking (e.g. `/skincare/serums/`, `/concern/dry-skin/`).
- Sitemaps per site/language. Submit both to Search Console.
- Titles and meta in both languages; BN meta written in Bangla, not machine-transliterated.

---

## 11. Performance budget

- LCP < 2.5s (4G mobile), CLS < 0.05, INP < 200ms.
- Hero image: AVIF/WebP, `fetchpriority="high"`, explicit width and height. Everything else `loading="lazy"`.
- Fonts: self-hosted woff2, preload only the two display weights in use, subset BN fonts to Bengali + Latin.
- JS: no jQuery dependency in theme code (WooCommerce core may still load it). Defer all theme JS. Split modals, search and filters into lazily imported modules.
- Disable WooCommerce cart fragments on pages without a cart badge update need, or replace them with a Store API call on interaction.
- Product images: one square-ish 4:5 crop at 3 sizes (480 / 800 / 1200).

---

## 12. Images: shot list (to replace placeholders)

Art direction: soft daylight, blush/pastel backdrops matching the tint tokens, real skin texture, Bangladeshi models and settings for the BN campaign.

| Slot | Shot |
|---|---|
| Home hero (EN) | Model with dewy skin, close crop, blush backdrop |
| Home hero (BN / Eid) | Model in jamdani saree, Eid glow makeup; mehendi and product flat-lay as the secondary image |
| Category circles (6) | One hero product per category on its tint colour |
| Product images | 4–5 per product: packshot on tint, texture swatch, in-hand, on-model, 10–15s video |
| Night Shift promo | Silk pillowcase, sleeping mask, bedside, warm lamp |
| Tools promo | Facial steamer / hair dryer in use |
| About | Founder or team portrait, studio flat-lay, product-testing desk |
| Journal | 16:10 editorial image per article |

Use licensed stock (Unsplash/Pexels) only as temporary placeholders, and replace them with owned photography before launch. **Do not use images from other Bangladeshi e-commerce sites.** Their photos are copyrighted. Use them for inspiration only (layout patterns: flash sale strips, COD badges, wallet offers, Eid campaigns).

---

## 13. Content the owner must supply (all `[placeholders]`)

- Legal entity name, business address, trade licence number (BN footer)
- Support email, privacy email, phone / WhatsApp, opening hours, reply-time promise
- Return window (days), refund timeline, damaged-item reporting window
- Data retention period, minimum age, governing-law jurisdiction
- Shipping rates and zones (EN international, BN inside/outside Dhaka), free-shipping thresholds (USD and BDT)
- Payment gateways and merchant accounts: Stripe, PayPal, SSLCommerz, bKash, Nagad
- Wallet cashback offer terms (% and minimum order), flash sale schedule
- Founder name, year started, city, founder story (About page)
- Real catalogue (CSV) with categories, attributes, images and prices in both currencies
- Newsletter provider; SMS gateway (BN)
- **Legal review:** the Privacy and Terms copy in the designs is a starting template. A lawyer must review it before launch (BD and any other target-market requirements).

---

## 14. Build plan: numbered tasks

Each task: **Scope → Acceptance → Verify.** Run on staging first. No production deploy until T15.

### T0: Incident cleanup and backup (blocking)
- **Scope:** §1 steps; produce a cleaned content export (WXR) and a media archive; list of spam URLs for 410.
- **Acceptance:** malware scan clean; no spam strings in DB or files; Search Console shows no security issues (or review requested).
- **Verify:** grep report attached · scanner report attached · `site:abeautynfashion.com casino` returns nothing new after recrawl.

### T1: Staging environment
- **Scope:** fresh WP + WooCommerce on staging (HTTPS, PHP 8.2+, Redis), HPOS on, debug log on, search engines discouraged.
- **Verify:** WooCommerce › Status shows no red items; `WP_DEBUG_LOG` is empty after a smoke test.

### T2: Language architecture
- **Scope:** implement the chosen option from §3 (default B: Multisite subdirectory `/bn/` + MultilingualPress). Site 2 locale `bn_BD`, currency BDT.
- **Acceptance:** two dashboards (if B/C); the switcher on any page lands on the translated equivalent; hreflang tags present.
- **Verify:** view-source shows correct `hreflang` pairs on Home, a product, a category and a post; each site has independent Woo settings.

### T3: Theme scaffold and tokens
- **Scope:** §5 structure, `theme.json`, `tokens.css`, self-hosted fonts (EN + BN), base typography, buttons, pills, inputs, focus styles.
- **Verify:** a style-guide page renders all components in both languages; contrast checks pass.

### T4: Header, footer, menus, language switcher, mobile drawer
- **Verify:** keyboard-only navigation works; drawer traps focus and closes on Esc; switcher keeps context.

### T5: Product card, shop archive, filters, sort, pagination / load more
- **Scope:** `content-product.php` override, archive layout (desktop sidebar / mobile sheet), AJAX filtering with URL state, facet counts, active chips.
- **Verify:** filter combinations return correct results; back button restores state; multi-facet URLs are `noindex`.

### T6: Single product
- **Scope:** gallery + zoom + video, variation buttons, qty stepper, accordions, routine bundle, reviews UI, related products.
- **Verify:** variable product price and stock update on selection; add to bag opens modal #1; schema validates in Rich Results Test.

### T7: Cart, mini-cart modal, free-shipping progress, cross-sells
- **Verify:** the progress bar uses the real threshold per site/currency; coupon errors are inline; gift-wrap fee applies.

### T8: Checkout EN (classic) + Stripe / PayPal / express pay
- **Verify:** test-mode payments succeed and fail correctly; the order-received page uses the thank-you design.

### T9: Checkout BN: BD fields, phone validation, district/thana, zones, COD, bKash, Nagad, SSLCommerz, SMS
- **Verify:** an invalid BD phone blocks submit with a Bangla error; zone fee changes the total live; sandbox payments complete for each gateway; COD order lands as "Processing".

### T10: My Account (dashboard, orders, wishlist, addresses, details), login/register modal
- **Verify:** guest → register at checkout works; wishlist persists across login.

### T11: Search: live dropdown + results page (products + journal tabs)
- **Verify:** typo tolerance (FiboSearch or a custom fuzzy layer); keyboard combobox works; "no results" state shows suggestions and the 404-style helpers.

### T12: Content pages: Home (EN/BN), About, Contact (form + success modal), Privacy, Terms (EN/BN tabs), 404, Journal archive and single
- **Verify:** contact form sends email, has a nonce and honeypot, rate-limits; all `[placeholders]` replaced.

### T13: Modals, newsletter, cookie consent
- **Verify:** all 7 dialogs meet §9; cookie consent blocks analytics until accepted; newsletter double opt-in works.

### T14: SEO / AEO / GEO, redirects, schema, sitemaps, performance pass
- **Verify:** 301 map tested (100% of old URLs resolve 200 or 301 → 200); Lighthouse mobile ≥ 90 Performance / 100 Accessibility / 100 SEO on Home, Shop, Product and Checkout; PageSpeed CWV targets met.

### T15: Content import, QA and launch
- **Scope:** import catalogue (both sites), translate key content, final QA matrix (§15), backups, uptime monitoring, launch, Search Console + GA4 + Meta pixel (consent-gated).
- **Verify:** QA matrix 100% pass; live smoke test (place a real low-value order on each site and refund it).

---

## 15. QA matrix (run before T15 sign-off)

Browsers: Chrome, Safari (iOS + macOS), Firefox, Samsung Internet. Devices: 390, 834, 1280, 1440 widths.

| Area | Checks |
|---|---|
| Layout | Every artboard matches at its breakpoint (spacing, type, colours); no horizontal scroll at 360px |
| Language | Every string translated on BN; numerals Bangla in prices/counts only; switcher round-trips |
| Commerce | Simple, variable and on-sale products; out of stock; coupon; free-shipping threshold; tax (if any); each gateway; refund |
| Email / SMS | Order received, processing, completed, refunded, password reset: branded, in the site language |
| Accessibility | axe DevTools zero criticals; keyboard-only purchase; screen-reader pass on checkout |
| Performance | §11 targets |
| SEO | hreflang, canonicals, schema, robots, sitemaps, 301s, no spam URLs indexed |
| Security | Admin 2FA, file editing disabled (`DISALLOW_FILE_EDIT`), XML-RPC off, WAF on, backups verified by restore test |

---

## 16. Artboard → template map

| Artboard | Template / file |
|---|---|
| `Main` / `*-Home*` | `front-page.php` |
| `*-Shop` | `woocommerce/archive-product.php` + `content-product.php` |
| `*-Product` | `woocommerce/single-product.php` + partials |
| `*-Cart` | `woocommerce/cart/cart.php`, `cart-totals.php` |
| `*-Checkout*` | `woocommerce/checkout/form-checkout.php`, `review-order.php` + `inc/checkout-bd.php` |
| `Desktop-Account` | `woocommerce/myaccount/*` |
| `*-Search*` | `search.php` + `inc/ajax-search.php` + `template-parts/search-dropdown.php` |
| `*-Contact` | `page-contact.php` |
| `*-About` | `page-about.php` |
| `Desktop-Privacy`, `Desktop-Terms`, `Mobile-Legal` | `page-legal.php` (one template; tab links to sibling page) |
| `*-404` | `404.php` |
| `Mobile-Menu` | `template-parts/header/drawer.php` |
| `Desktop-Modals`, `Mobile-Modal-*` | `template-parts/modals/*.php` + `assets/js/dialogs.js` |
