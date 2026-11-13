# POIESIZ Interiors: Calm Editorial Motion and Warm Palette

The POIESIZ website gets a slower, calmer motion style and hover feel inspired by the shared Dribbble concept, along with that concept's warm beige-and-brown colours.
The layout, sections, content and admin dashboard stay the same. Only the colours, transitions and hover effects change.

## What the reference shows
- The Dribbble link is a single still picture of a page, with no video and no real animation. Any motion has to be inferred from its style.
- Its look is calm and editorial: a large headline over a full-width room photo, a round "Consultation" button with an arrow, alternating photo-and-text blocks, and lots of empty space.
- Its colours are cream (#E3E0D6), near-black brown (#130C08), deep brown (#50321F), mid browns (#6A5647, #8C6E57, #A28D73) and taupe/grey (#AEA496, #7D7E83).
- The motion below is an original interpretation of that feel. None of the reference's text, images or branding is used.

## Who it's for
- Homeowners and businesses browsing POIESIZ Interiors who expect a premium, unhurried experience.
- The POIESIZ team, who keep managing all content from the admin dashboard as before.

## Core features and experience
- **Warm palette across the site:** cream page backgrounds, deep brown dark sections, taupe and mid-brown for small labels and lines. The logo yellow (#FEBD1C) stays only in the logo and the main buttons.
- **Slower, softer pacing:** all reveals become longer and smoother, about one second or more, with gentler easing. Nothing snaps.
- **Hero opening:**
  - The room photo settles slowly from a slight zoom to rest.
  - The headline lines rise one after another from behind a mask.
  - The menu items and the booking card fade in last, one by one.
- **Round arrow button:**
  - The main "Book Free Consultation" calls to action get a round outline version with an arrow.
  - On hover the circle fills, the arrow slides across, and on desktop the button gently drifts toward the pointer.
- **Photo hover:**
  - Project, idea and style photos zoom in very slowly on hover, and their caption slides up.
  - On desktop, a small round "View" label follows the pointer, but only while it's over the project photos.
- **Scroll depth:** on alternating photo-and-text blocks (featured project, services, why choose us), photos move slightly slower than the text beside them, for a soft sense of depth.
- **Text reveals:** paragraphs and small labels fade up with a short stagger after their heading. Section headings keep their word-by-word reveal, but slowed down.
- **Menu hover:** a menu link's letters roll up and are replaced by a brown copy of the same word. The thin underline stays on footer links.
- **Page changes:**
  - The yellow sweep becomes a cream-to-brown panel that lifts away slowly.
  - The new page then fades up.
- **Opening screen:** the first-visit counter screen switches to the brown and cream colours, with a slower lift-away.
- **Comfort and phones:**
  - All motion is switched off for visitors who've turned off animations on their phone or computer.
  - On phones, the pointer-follow label and button drift are left out.
  - Text and photos stay readable even if an animation doesn't run.

## User flow
- **Visitor:**
  - The opening screen counts up and lifts away, then the hero photo settles while the headline rises.
  - Scrolling down, photos unveil and drift, and text fades in after its heading.
  - Hovering a project shows the "View" label and a slow zoom.
  - Clicking a project, the brown panel lifts and the project page fades up.
- **Admin:** nothing changes. Content, photos, enquiries and calculator rates are managed exactly as today.

## UI/UX feel
- Unhurried, warm and editorial, like turning pages in an interiors magazine.
- Motion is felt rather than noticed: slow, small movements.
- The colours lean on cream and deep brown, so photography stands out. The yellow appears only in the logo and buttons.

## Implementation phases
1. **Phase 1 (MVP, built now):**
   - Switch the whole site to the warm palette, with yellow kept for the logo and main buttons.
   - Add the slower pacing, hero opening, round arrow button, photo hover with the "View" label, scroll depth on photo-and-text blocks, staggered text, rolling menu links, and the restyled page change and opening screen.
   - Keep phone and reduced-motion handling in place.
2. **Phase 2:** let the admin dashboard control motion: turn the opening screen on or off, pick slow, normal or minimal motion, and choose the page-change colour.
3. **Phase 3:** add custom entrance sequences for project pages (cover photo, then facts, then gallery) and an option for a short looping video in the hero.

## Assumptions
- Only motion, hover and colour change. The layout, section order, headline font, content and admin all stay as they are, as chosen.
- Colours follow the reference's palette, with yellow kept only in the logo and main buttons, as chosen. The admin dashboard keeps its current neutral look.
- The light-background logo version (black text) stays. The white version is still used on the brown sections.
- The motion is an original interpretation, since the reference is a still image with no animation to copy.
- The existing photo unveil and the word-by-word heading reveal are kept but slowed down to match the calmer pace.
- Text colours are checked for readable contrast on cream and brown backgrounds and adjusted where needed.
