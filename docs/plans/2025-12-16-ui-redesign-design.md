# Jamelna Site UI Redesign

**Date:** 2025-12-16
**Status:** Approved
**Goal:** Transform the site into a unique, expressive digital art gallery that represents Joe Alexander Meléndez-Naharro's personality.

---

## Design Direction

**Mood:** Creative & Expressive
**Palette:** Dark & Moody
**Primary Accent:** Electric/Neon Blue
**Priority:** Express personality — vibe over function
**Scope:** Complete revolution — reimagine everything

---

## Visual Foundation

### Color System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-deep` | `#0a0a0f` | Primary background |
| `--bg-alt` | `#0d1117` | Section variation |
| `--bg-card` | `#1a1a2e` | Card backgrounds |
| `--bg-footer` | `#050508` | Footer |
| `--accent-primary` | `#00a8ff` | Electric blue — links, highlights |
| `--accent-secondary` | `#00d4ff` | Cyan — gradients, glows |
| `--accent-secret` | `#8b5cf6` | Purple/violet — Tech Sovereignty only |
| `--text-primary` | `#e4e4e7` | Body text |
| `--text-heading` | `#fafafa` | Headings |
| `--border-subtle` | `#16161a` | Subtle borders |

### Typography

| Role | Font | Usage |
|------|------|-------|
| Display | Space Grotesk, Clash Display, or Cabinet Grotesk | Hero text, section titles, dramatic moments |
| Body | Inter, Satoshi, or General Sans | Readable content |
| Monospace | JetBrains Mono or Fira Code | Technical accents, labels, tags |

---

## Homepage

### Hero: "The Name Reveal"

Full viewport height. Your complete name displayed prominently:

**Joe Alexander Meléndez-Naharro**

**Animation sequence:**
1. Name appears in muted off-white
2. Letters **J**, **A**, **M**, **E**, **L**, **N**, **A** pulse with electric blue glow
3. Creates visual connection: **J**oe **A**lexander **M**elénd**E**z-**N**ah**A**rro → JAMELNA
4. Glow settles into persistent subtle state or loops slowly

**Background:** Subtle animated gradient (dark blue to dark purple) or noise/grain texture.

**Easter Egg:** Clicking the JAMELNA letters in sequence (J-A-M-E-L-N-A) unlocks the hidden Tech Sovereignty section. Each correct click gives subtle feedback (brighter pulse, ripple). Full sequence triggers portal animation.

### Navigation

**On Hero:** Nearly invisible — small menu icon in corner only.

**On Scroll:** Sleek nav bar fades in with dark translucent background + blur.

**Links (visible):**
- Work
- Services
- K12 CSED
- Photography
- About
- Contact

**Hidden:** Tech Sovereignty (easter egg access only)

**Style:** Clean body font, electric blue underline animation on hover, accent color for active state.

### Core Expertise Section

**Layout:** Asymmetric stagger — one large card left, two stacked smaller right, with intentional overlap.

**Animation:** Cards fade/slide in from different directions, staggered timing.

**Card Style:** Dark glass effect (semi-transparent + blur), thin border, subtle blue glow on hover.

### Featured Work Section

**Title:** Oversized, partially off-screen (cropped left edge).

**Grid:** Masonry or asymmetric — varying card sizes by project importance.

**Hover:** Cards lift, border glows electric blue.

**Cards:** Project title (display font), subtitle (body), category tag (monospace).

### CTA Section

**Layout:** Centered, dramatic scale.

**Headline:** Conversational question in huge display type ("Let's build something?")

**Button:** Electric blue fill, subtle glow animation on hover.

**Background:** Radial glow spotlight effect.

### Footer

**Layout:**
- Left: Name/logo mark
- Center: Key links (Work, About, Contact)
- Right: Social icons with hover glow

**Style:** Darkest section (`#050508`), thin top border, generous spacing.

**Easter Egg Hint (optional):** Tiny text "There's more to find..."

---

## Interior Pages — Shared System

### Page Transitions

Smooth fade or slide between pages. Dark background persists — feels like moving between gallery rooms.

### Page Headers

Bold oversized title in display font, asymmetric (left-aligned, bleeding off edge). Brief subtitle in body font below.

### Consistent Elements

- Dark glass cards for content groupings
- Electric blue for all interactive highlights
- Scroll-triggered fade-in animations
- Generous darkspace — let content breathe

### Mobile

Asymmetric layouts gracefully collapse. Large type scales down but stays bold. Animations simplify for performance. Dramatic feel preserved.

---

## Work Page

**Hero:** Large title "Work" cropped at edge. Optional rotating subtitle ("Engineer. Educator. Builder.")

**Grid:** Masonry layout, flagship projects get larger cards.

**Interaction:** Hover lifts + glows. Click opens modal/expanding panel (stays in gallery).

**Project Detail:** Full-width immersive — large screenshots, clean description, monospace tech tags, glowing buttons for links.

---

## Photography Page

**Hero:** Title with slow crossfade of best shots at low opacity in background.

**Grid:** Clean masonry, dark gaps so photos float.

**Lightbox:** Full-screen, dark background, centered image, arrow navigation, swipe on mobile.

---

## About Page

**Hero:** Feature a personality-forward photo (desaturated or blue-tinted).

**Layout:** Two-column asymmetric — story on one side, photo on other.

**Detail:** Pull quotes in oversized display type breaking up text.

---

## Contact Page

**Layout:** Large headline ("Let's Talk") on one side, form/email on other.

**Form:** Minimal fields (name, email, message). Dark glass inputs, electric blue focus states.

---

## Services Page

**Layout:** Each service as distinct staggered card/section.

**Typography:** Display font for titles, body for descriptions, monospace for specs.

---

## K12 CSED Page

**Approach:** Dark gallery aesthetic with functional tools. AI Planner in dark glass container. Same input styling throughout.

---

## Tech Sovereignty (Hidden Page)

**Access:** Easter egg only (JAMELNA letter sequence on homepage).

**Entry Animation:** Glitch effect or portal opening — reward the discovery.

**Accent Color:** Purple/violet (`#8b5cf6`) instead of blue — distinct "secret room" feel.

**Exit:** Subtle "return to main site" link, no breadcrumbs.

---

## Animation & Interaction Summary

| Element | Animation |
|---------|-----------|
| Hero name | Staggered letter fade-in, JAMELNA letters pulse blue |
| Easter egg | Click feedback per letter, portal on completion |
| Nav | Fade in on scroll |
| Cards | Scroll-triggered fade/slide from varied directions |
| Card hover | Lift + glow |
| Project modal | Smooth expand |
| Photo lightbox | Fade in, dark backdrop |
| Page transitions | Fade/slide between pages |
| CTA button | Glow pulse on hover |

---

## Technical Considerations

- **Framework:** Continue with Next.js + Tailwind
- **Animations:** Framer Motion or CSS animations (prefer CSS for performance)
- **Fonts:** Load via next/font for optimization
- **Dark mode:** This IS the mode — no light mode toggle needed
- **Accessibility:** Maintain focus indicators (blue outline), reduce motion option, proper contrast ratios

---

## Out of Scope (YAGNI)

- Light mode toggle
- Complex 3D effects
- Scroll hijacking
- Background music/sound (except optional subtle easter egg feedback)
- User accounts or personalization

---

## Next Steps

1. Set up color tokens and typography in Tailwind config
2. Implement homepage hero with name reveal animation
3. Build navigation with scroll behavior
4. Create reusable dark glass card component
5. Redesign homepage sections
6. Apply system to interior pages
7. Implement easter egg
8. Final polish and mobile optimization
