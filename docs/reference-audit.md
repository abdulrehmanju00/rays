# Reference Audit — Rays Pakistan Captured Homepage

**Scope**: Pure audit and preservation documentation. No redesign, restyling, mockup, or layout modifications have been performed. The reference source files (`reference/index.html` and `reference/styles.css`) remain completely unmodified.

---

## 1. Homepage Sections (in Exact Captured DOM Order)

| # | Section Name | DOM Container / Class Selector | Content & Elements Present |
|---|---|---|---|
| 1 | **Skip Navigation** | `.wd-skip-links` | Accessibility anchor links: `Skip to navigation`, `Skip to main content`. |
| 2 | **Top Bar** | `.whb-row.whb-top-bar` | Top-level contact header displaying official corporate email (`info@rays.com.pk`) and circular social share icons (Facebook, X/Twitter, Pinterest, LinkedIn, Telegram). |
| 3 | **General Header & Navigation** | `.whb-row.whb-general-header` | Sticky desktop header with company logo (`.site-logo`), primary mega-dropdown navigation bar (`.wd-header-main-nav`), customer search trigger (`wd-header-search`), compare counter, wishlist counter (`.wd-header-wishlist`), and WooCommerce mini-cart button (`.wd-header-cart`). |
| 4 | **Mega Dropdown Menus** | `.wd-dropdown-menu` | Rich dropdown panels containing categorized thumbnails and link lists: <br>• **Built-in Kitchen Appliances**: Built-in Microwave Ovens, Built-in Ovens, Cooking Plates, Kitchen Hobs, Kitchen Hoods.<br>• **Large Domestic Appliances**: Microwave Ovens, Oven Toasters.<br>• **Small Electronics**: Electric Kettles, Sandwiches & Toasters, Food Prep, Irons. |
| 5 | **Hero Slider Carousel** | `.elementor-widget-smartslider3` (`n2-ss-3`) | Full-width responsive carousel featuring flagship promotional slides, seasonal offers, and inverter series banners with bullet transition pagination and previous/next arrow widgets. |
| 6 | **Product Category Grid** | `.elementor-element-categories` | Visual icon grid highlighting major home appliance categories with direct category archive links. |
| 7 | **Featured Products Grid (Small Domestic)** | `.wd-products-element` (`wd-grid-g-4`) | 4-column WooCommerce product showcase containing product cards with inlined base64 WebP previews, titles, pricing (PKR), discount tags, star rating placeholders, and quick-action overlay buttons ("Add to Cart", "Quick View", "Compare", "Wishlist"). |
| 8 | **Featured Products Grid (Built-in Kitchen)** | `.elementor-element` / `.wd-products-element` | Showcase grid specifically displaying built-in microwave ovens, combi microwave ovens, and electric/gas ovens. |
| 9 | **Promotional Feature Banners** | `.e-con.e-parent` | High-impact promotional banner tiles highlighting product advantages: T3 Inverter technology, energy conservation, long-term warranty, and safety standards. |
| 10 | **Hobs & Hoods Collection** | `.wd-products-element` | Showcase blocks displaying stainless steel and tempered glass top gas hobs (1, 2, 3, 4, and 5 burners) and kitchen range hoods (60cm & 90cm, wall-mounted and island). |
| 11 | **Brand Trust & Guarantees** | `.wd-info-box` | Corporate value proposition badges: Official Nationwide Warranty, Certified Service Centers, Genuine Spare Parts, and Dedicated Customer Support Hotline. |
| 12 | **Footer Area** | `.footer-container` / `.whb-footer` | Detailed footer containing: <br>• Company overview and headquarters contact info.<br>• Helpline telephone link (`tel:0340 1111925`).<br>• Link columns: Categories, Customer Support, Shop, Warranty, Service Centers.<br>• Legal & Policy links: Terms & Conditions, Privacy Policy.<br>• Copyright statement (`© Rays Pakistan`). |

---

## 2. Layout, Styling & Typography Evidence

1. **CSS Engine**:
   - Built on WoodMart e-commerce theme (`theme-woodmart`, `wp-child-theme-woodmart-child`).
   - Integrated with Elementor core (4.1.4) flexbox and grid container system (`.e-con`, `.e-flex`, `.e-grid`).
   - CSS custom property design tokens for spacing, container max-widths (`1140px` and full-width `1900px`), entity title colors (`--wd-entities-title-color: #333333`), and hover animations.

2. **Typography**:
   - Primary Headings and Body: Montserrat / Roboto / system sans-serif hierarchy.
   - Fallback typography defined in `reference/styles.css`.

3. **Iconography & Web Fonts**:
   - `Font Awesome 5 Free` (weights 400 and 900) and `Font Awesome 5 Brands`.
   - Elementor icon font `eicons` (v5.50.0).
   - Remote fonts referenced in `reference/styles.css` point to `https://rays.com.pk/wp-content/plugins/...`.

4. **Responsive Breakpoints**:
   - Desktop: `> 1024px` (Base slider layout calculated at `1200px` to `1900px`).
   - Tablet Portrait: `701px` to `1199px`.
   - Mobile: `<= 700px` (min `320px`).

---

## 3. Scripts & External Dependencies

The captured HTML references external services, scripts, and domain-bound endpoints:

1. **Third-Party Trackers & External Scripts**:
   - Meta / Facebook Pixel: `https://connect.facebook.net/en_US/fbevents.js` and `https://connect.facebook.net/signals/config/2266482563772007`.
   - Google Tag Manager & Google Analytics: `https://www.googletagmanager.com/gtag/js?id=GT-WKX3HSZ`.
   - Google reCAPTCHA v3 / CAPTCHA 4WP: `https://www.google.com/recaptcha/api.js` and `https://www.gstatic.com/recaptcha/releases/...`.

2. **WordPress / WooCommerce Core Scripts**:
   - jQuery 3.7.1: `https://rays.com.pk/wp-includes/js/jquery/jquery.min.js`.
   - WooCommerce Frontend: `wc-add-to-cart-js`, `woocommerce-js`, `wc-cart-fragments-js`, `wc-jquery-blockui-js`.
   - WoodMart Theme JS bundles: `wd-menu-setup-js`, `wd-lazy-loading-js`, `wd-wishlist-js`, `wd-compare-js`, `wd-quick-view-js`, `wd-swiper-carousel-js`.

3. **LiteSpeed Cache Optimized Bundles**:
   - Scripts loaded from `https://rays.com.pk/wp-content/litespeed/js/...`.
   - Contains minified slider and carousel runtimes.

---

## 4. Elements Depending on External Scripts or the Live Rays Domain

1. **High-Resolution Images (`srcset` attributes)**:
   - While image tags embed low-resolution base64 WebP placeholders (`data:image/webp;base64,...`), their `srcset` and `data-src` attributes point directly to `https://rays.com.pk/wp-content/uploads/...`.
   - On retina screens or upon zooming/expanding, the browser requests the full-sized asset from the live Rays Pakistan server.

2. **Interactive Sliders & Carousels**:
   - The hero slider (`n2-ss-3`) and product thumbnail carousels rely on SmartSlider 3 and Swiper libraries originally hosted under `/wp-content/litespeed/js/`.
   - If the live domain blocks cross-origin script execution or CORS requests, dynamic sliding transitions stop advancing unless polyfilled.

3. **Interactive E-Commerce Modals**:
   - Quick View (`.wd-quick-view-btn`) and Add to Cart AJAX trigger WooCommerce background HTTP calls to `/wp-admin/admin-ajax.php` and `/?wc-ajax=`.
   - Without an active backend handling these endpoints, interactive popups cannot fetch dynamic product variations.

4. **Product Search & Auto-complete**:
   - The header search field triggers WoodMart AJAX search calls to query live inventory.

5. **Icon Font Glyphs**:
   - FontAwesome glyphs and Elementor icons in `reference/styles.css` load `@font-face` files from `https://rays.com.pk/wp-content/plugins/...`.

---

## 5. Requirements to Faithfully Reproduce the Entire Site

To transition from this captured reference homepage to a complete, standalone, high-fidelity deployment without relying on external domains, the following page captures and assets are required:

1. **Subpage Captures**:
   - **Category Archives**: Dedicated HTML captures for all 21 identified product categories (e.g., `built-in-kitchen-appliances`, `microwave-ovens`, `kitchen-hobs`, `kitchen-hoods`, `air-fryer-ovens`, `geysers`, `small-domestic-appliances`).
   - **Single Product Pages**: Markup for each individual product SKU (e.g., the 34 discovered product URLs listed in `page-inventory.json`), including product specifications, dimension diagrams, and user manuals.
   - **Transactional & Account Pages**: Cart, Checkout, Order Tracking, User Account / Registration.
   - **Corporate & Service Pages**: About Us, Contact Us with verified branch addresses, Warranty Registration form, and Service Centers directory (`/rays-near-you/`).

2. **Static Asset Localisation**:
   - Download and bundle all product image files locally (preserving original filenames and directory hierarchy under `assets/images/`).
   - Download and host local webfont binaries (`fa-brands-400.woff2`, `fa-regular-400.woff2`, `fa-solid-900.woff2`, `eicons.woff2`).
   - Download or vendor WoodMart theme stylesheets and carousel scripts locally to eliminate runtime third-party domain dependencies.

3. **Backend & Business Logic (For future ESTA conversion)**:
   - ESTA product catalog data schema (SKUs, titles, categories, specs, pricing, and stock status).
   - Functional shopping cart, order placement, and customer lead inquiry forms.
