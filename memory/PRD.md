# PRD — Aangan Studio (Interiors landing page)

## Original problem statement
"https://www.nobroker.in/interiors/ clone this as same"

## Choices
- Brand: Aangan Studio (own brand, original logo/favicon, original copy & stock photos — no NoBroker assets)
- Consultation form: thank-you message only (no storage)
- Extras: cost estimator + room gallery (defaults)

## Architecture
React (CRA) frontend only. framer-motion, lenis, shadcn accordion/dialog, sonner. Content in src/data/content.js. No backend use.

## Implemented (2026-11-11)
- Sticky nav + mobile menu, hero with masked headline reveal, parallax image, 3D tilt consult form
- Editorial marquee, trending ideas carousel, interactive cost estimator (BHK/tier/rooms, INR lakhs)
- Projects with city filter, room tabbed gallery, featured story (clip-path scroll reveal), styles + categories
- Vaastu banner, Why-us bento, experience studios, how it works, reviews, FAQ, footer
- Book dialog reused from all CTAs; form validation + thank-you state

## Implemented (2026-11-11, iteration 2)
- New /price-calculator page (user pasted NoBroker price-calculator HTML; kept own brand & colours)
- 4 steps: home size + carpet area slider → room quantity steppers, kitchen layout, add-ons → finish level (Economy/Premium/Luxury) → estimate with all-tier comparison bars
- Sticky live estimate sidebar with itemised breakdown; CTA opens booking dialog
- Nav/footer link to calculator; section links work from the calculator page (/#section); home estimator links to full calculator
- Pricing rates live in src/lib/pricing.js (sample values)

## Implemented (2026-11-12, iteration 3) — Rebrand to POIESIZ Interiors
- Brand from user's PDF + logo: POIESIZ Interiors, "Modern & Custom Interiors", Kochi (Palarivattom office)
- Colours matched to logo yellow #FEBD1C with charcoal; yellow buttons use dark text; logo mark used as favicon
- Real project photos cropped from the PDF into /public/projects (Chai Bazaar Munnar, Mr. Vinod's Residence Aluva, Design Platform Thrissur, Cubespace Kakkanad, Geojit Finance, River Showroom, optical store, Indrajith Sukumaran residence Maradu)
- New sections: Services (4 from PDF), Clients, On-going projects gallery, Contact (address, 2 phones, email, website, map)
- Removed sample reviews and invented warranty years; FAQs/steps/why-us rewritten from PDF
- Stock photos still used in hero, trending ideas, rooms and styles sections

## Implemented (2026-11-12, iteration 4) — Admin dashboard + client logos
- Client logos cut from the brochure (public/clients) shown with names in the Clients section
- Logo wordmark uses Chillax font (Fontshare)
- Admin dashboard at /admin (JWT email/password, single seeded admin, brute-force lockout, change password)
- Every home section editable (text, lists, photos) + show/hide/reorder sections; booking form options; contact; footer
- Photo uploads via Emergent object storage (/api/upload, served from /api/files/...)
- Content stored as per-section overrides in Mongo `site_content`; site falls back to built-in defaults; "Restore original" per section
- Price calculator page content/rates not yet editable from admin

## Implemented (2026-11-13, iteration 6) — Motion & transitions (inspired by Dribbble Poliform shot, which is a static image)
- First-visit intro curtain (logo + 0–100 counter, slides up; once per session)
- Yellow page-change curtain wipe + content fade-up on every route change
- Images unveil with a bottom-up wipe + slow zoom-out as they scroll into view (projects, trending, styles, on-going, services, project galleries)
- Section headings reveal word by word; nav/footer links get a sliding underline; header CTA text rolls on hover
- Respects reduced-motion setting

## Implemented (2026-11-12, iteration 5)
- Price calculator rates editable in admin ("Price calculator rates"): finish levels (multiplier, features), rooms (base price in lakhs, max qty), kitchen layouts, add-ons (₹/sq ft or fixed lakhs), note
- Enquiry inbox: booking forms POST /api/enquiries (validated); admin "Enquiries inbox" with call button, status New/Called/Closed, notes, archive (soft)
- Project detail pages /projects/:slug with cover, facts, description, masonry gallery + lightbox, next-project link; project cards link there; description + gallery editable in admin Projects

## Backlog
- P1: Make price calculator rates editable in admin
- P1: Save consultation requests to an admin inbox
- P2: Project detail pages, WhatsApp button

## Placeholders
Studio addresses, review texts, project names/ratings, idea counts, featured story, estimator rates, social links

## Backlog
- P1: Save leads to an admin list / email alerts
- P1: Real projects, reviews and studio addresses
- P2: Project detail pages, style finder quiz, WhatsApp button
