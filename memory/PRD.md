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

## Placeholders
Studio addresses, review texts, project names/ratings, idea counts, featured story, estimator rates, social links

## Backlog
- P1: Save leads to an admin list / email alerts
- P1: Real projects, reviews and studio addresses
- P2: Project detail pages, style finder quiz, WhatsApp button
