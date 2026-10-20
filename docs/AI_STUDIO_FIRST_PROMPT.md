# FIRST TASK — INSPECT AND PRESERVE THE EXISTING WEBSITE (NO REDESIGN)

You are working on the ESTA.pk website project. The files under `reference/` are the supplied captured Rays Pakistan homepage and stylesheet.

## Non-negotiable rules
- THIS TASK IS AN AUDIT ONLY. Do not create a new homepage, new visual design, mockup, or generic e-commerce template.
- Do not change the reference layout, typography, spacing, colors, section order, images, banners, menu structure, product-card design, responsive behavior, or interactions.
- Do not overwrite, reformat, rename, or delete `reference/index.html` or `reference/styles.css`.
- Do not replace the reference with a React/Vite/Tailwind template or generate a different storefront.
- Do not assume that URLs mentioned in the HTML mean those pages are included in this repository.
- Do not invent missing pages, product details, assets, prices, policies, reviews, or business information.

## What to do now
1. Read `reference/index.html` and `reference/styles.css` completely.
2. Create `docs/reference-audit.md` documenting the captured homepage's sections in their existing order, layout and styling evidence, links, assets, scripts, external dependencies, and missing files.
3. Create `docs/page-inventory.json` listing each discovered internal URL, its probable page type, and whether its actual page markup is present locally. Use `unknown` where evidence is insufficient.
4. Report which visible elements depend on external WordPress/WooCommerce/Elementor scripts or the live Rays domain.
5. Explain what additional page captures and assets would be required to reproduce the entire site faithfully.
6. Stop after the audit. Do not implement or redesign anything in this task.

## Future ESTA conversion (not part of this task)
The later project will replace only business-specific details—brand name/logo, product catalogue, images, prices, copy, contact information, policies, and verified domain links—with ESTA details. The reference design must remain visually unchanged unless I explicitly authorize a specific change.

Before any future implementation, explain the exact files you intend to add or modify and why. Keep the reference files untouched.
