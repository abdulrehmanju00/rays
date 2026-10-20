# ESTA Website — Reference Preservation Package

## Important
This repository contains a captured reference of the Rays Pakistan homepage. The files in `reference/` are preserved as-is and must be treated as a visual/structural reference, not as a complete source project or working e-commerce backend.

### Reference files
- `reference/index.html` — captured homepage HTML
- `reference/styles.css` — captured stylesheet

### Known limitations
- The capture contains many external `rays.com.pk` URLs and WordPress/WooCommerce/Elementor dependencies.
- Only the homepage capture and stylesheet are included; separate category/product pages and the original server/backend are not included.
- Images, scripts, fonts and product data may load from the original website and can change or become unavailable.
- A static capture does not provide a functioning ESTA checkout, customer accounts, order management, or inventory system.

## Workflow
1. Import this repository into Google AI Studio.
2. First ask it to inspect the reference files and create an inventory only.
3. Do not ask it to "build a modern website" or "create a website inspired by" the reference; those instructions commonly lead to redesign.
4. Use `docs/AI_STUDIO_FIRST_PROMPT.md` for the first task.
5. Do not modify `reference/index.html` or `reference/styles.css`. Implement any future application in separate files only after the audit.
