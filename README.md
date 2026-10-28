# Aarvika Living — Static Business Website

A responsive ecommerce-style frontend created for a 25-mark Organisational Behaviour assignment. The proposed brand sells household goods, home essentials and imitation jewellery.

## Run locally
1. Download and extract the project folder.
2. Open `business-website/index.html` in a modern browser.
3. Internet access is needed for the remote Unsplash sample images and Google Fonts. The layout and interactions otherwise run locally.
4. Replace the proposed brand details and placeholders with verified business information before publishing.

No build tools, backend, database or package installation are required.

## Included functionality
- Responsive navigation and mobile menu
- Search, category filtering and product sorting
- Twelve sample products with INR prices and descriptive alt text
- Add to cart, quantity changes, item removal, subtotal and estimated total
- Cart persistence using browser `localStorage`
- Contact and newsletter frontend validation
- Clear demo status messages; no forms are transmitted
- Accessible labels, keyboard focus styles, skip link and reduced-motion support
- Sample testimonials and promotion clearly marked as demonstrations

## Important limitations
- The catalogue and prices are sample data, not a live inventory.
- The cart is only a browser-side demonstration. There is no checkout, order placement, payment gateway, inventory sync or delivery calculation.
- Contact and newsletter forms validate in the browser but do not send or save submissions to a business.
- The cart is stored in the current browser only; clearing browser storage removes it.
- Client-side validation does not replace server-side validation, authorization, spam prevention or security controls.
- Remote images and fonts require internet access. Use images you own or are licensed to use for a public launch.
- Real search indexing requires a published domain, crawlable pages and deployment configuration. Analytics, email delivery, social profiles and online payments require additional services and privacy disclosures.
- A production launch should use HTTPS, a privacy notice, real business policies and a secure backend for any personal data or order processing.

## Before publishing
- Confirm brand name availability and relevant trademark/domain status.
- Replace `[Add ...]` contact placeholders with verified details.
- Confirm actual prices, product descriptions, stock and delivery terms.
- Replace demo testimonials with genuine consented feedback or remove the section.
- Replace sample promotion wording with a valid offer only if the business intends to honour it.
- Audit image rights, accessibility, browser compatibility and mobile performance.
- Add server-side form handling, spam protection and privacy-compliant storage if collecting enquiries.

## Assessment mapping (25 marks)
1. **Purpose and target audience (4):** storefront supports local shoppers, families and jewellery customers.
2. **Content and information architecture (4):** home, categories, shop, story, newsletter, contact and footer.
3. **User experience and visual design (4):** consistent cream, charcoal and gold visual system, responsive cards and clear calls to action.
4. **Technical requirements (4):** semantic HTML, separate CSS/JS, responsive layouts, static hosting-ready architecture.
5. **SEO and digital marketing (3):** title, description, headings, natural keywords, promotional area and newsletter interface.
6. **Security, privacy and accessibility (3):** no payment collection, honest frontend-only forms, labels, focus states and privacy note.
7. **Testing, maintenance and evaluation (2):** use the testing checklist in the assignment submission; update catalogue and verify details before launch.
8. **Organization, presentation and references (1):** clean project structure and references listed below.

## References
- MDN Web Docs, HTML: https://developer.mozilla.org/en-US/docs/Web/HTML
- MDN Web Docs, CSS: https://developer.mozilla.org/en-US/docs/Web/CSS
- MDN Web Docs, JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- MDN Web Docs, Web Storage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
- W3C Web Accessibility Initiative (WAI): https://www.w3.org/WAI/
- Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central, SEO basics: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Unsplash image service: https://unsplash.com/ (sample remote images; verify each image's current license/terms before public commercial use)
