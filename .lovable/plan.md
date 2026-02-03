
# Nepalese New Year 2082 - World-Class Event Landing Page

## Overview

Transform the website into an immersive, state-of-the-art event landing page for the Nepalese New Year 2082 celebration (April 14, 2026, London). This plan implements a bento grid layout, parallax scrolling, audio-visual teasers, and a fixed left-side navigation - all with world-class animations and responsive design.

---

## Event Details

| Field | Value |
|-------|-------|
| Event | Nepalese New Year 2082 |
| Date | April 14, 2026 |
| Location | London, United Kingdom |

---

## Featured Artists

| Artist | Genre | Origin |
|--------|-------|--------|
| Mr. D | Rap / Hip-Hop | Hetauda, Nepal |
| Sacar aka Lil Buddha | Hip-Hop / Rap | Kathmandu / Sydney |
| Mystery Artist | Experimental / Soulful Rap | TBA |

---

## Architecture & File Structure

```text
src/
+-- data/
|   +-- content.ts                     # NEW: Centralized text for i18n
+-- types/
|   +-- event.ts                       # NEW: Artist, Event interfaces
+-- components/
|   +-- layout/
|   |   +-- SideNavigation.tsx         # NEW: Left-side fixed navigation
|   |   +-- PageWrapper.tsx            # NEW: Consistent cosmic background
|   +-- home/
|   |   +-- EventHero.tsx              # NEW: Hero with countdown
|   |   +-- CountdownTimer.tsx         # NEW: Real-time countdown
|   |   +-- ArtistBentoGrid.tsx        # NEW: Bento grid layout
|   |   +-- ArtistCard.tsx             # NEW: Individual artist card
|   |   +-- MysteryArtistCard.tsx      # NEW: Special mystery treatment
|   |   +-- AudioPreviewModal.tsx      # NEW: Spotify/SoundCloud player
|   |   +-- EventInfo.tsx              # NEW: Venue & CTA section
|   +-- about/ (existing, no changes)
|   +-- ui/
|       +-- ParallaxContainer.tsx      # NEW: Parallax scroll wrapper
+-- pages/
|   +-- Home.tsx                       # NEW: Event landing page
|   +-- About.tsx                      # RENAME from Index.tsx
|   +-- Contact.tsx                    # UPDATE: Add navigation
|   +-- NotFound.tsx                   # Existing
```

---

## Implementation Phases

### Phase 1: Foundation

**1.1 Centralized Content (src/data/content.ts)**
- All text strings for navigation, artists, event details
- Enables future internationalization
- Easy updates without touching components

**1.2 Type Definitions (src/types/event.ts)**
- `Artist` interface: name, genre, description, image, spotifyUrl, isMystery
- `Event` interface: title, date, venue, artists array
- Extensible for future events

### Phase 2: Layout Components

**2.1 Side Navigation (src/components/layout/SideNavigation.tsx)**
- Fixed left position on desktop (w-20 collapsed, w-64 expanded)
- Glassmorphism styling with cosmic glow
- Links: Home, About Us, Contact
- Hover effects with gradient border animation
- Current page indicator with pulsing glow
- Mobile: Hidden by default, hamburger menu triggers slide-in overlay
- Framer Motion for all transitions

**2.2 Page Wrapper (src/components/layout/PageWrapper.tsx)**
- Wraps all pages for consistent cosmic background
- Includes: GlowingInfinity, StarField, ShootingStars
- Left margin adjustment for side navigation
- Responsive padding

**2.3 Parallax Container (src/components/ui/ParallaxContainer.tsx)**
- Uses `useScroll` and `useTransform` from Framer Motion
- Configurable speed offset (images slower, text faster)
- Creates premium "liquid scroll" depth effect

### Phase 3: Home Page Components

**3.1 Event Hero (src/components/home/EventHero.tsx)**
- Milanoir logo with glow animation
- Event title: "NEPALESE NEW YEAR 2082"
- Gradient text tagline
- Location badge: "London, UK | April 14, 2026"
- Countdown timer integration
- Smooth scroll indicator (animated chevron)

**3.2 Countdown Timer (src/components/home/CountdownTimer.tsx)**
- Real-time countdown to April 14, 2026 00:00:00 GMT+1
- Bento-style grid: 4 glassmorphism cells
- Days, Hours, Minutes, Seconds
- Pulsing glow animation on numbers
- useEffect with setInterval, proper cleanup
- Graceful post-event handling

**3.3 Artist Bento Grid (src/components/home/ArtistBentoGrid.tsx)**
- CSS Grid with asymmetric layout
- Desktop: 3 columns, row spans for visual interest
- Tablet: 2 columns
- Mobile: 1 column, stacked
- Parallax: Artist images move 30% slower than scroll
- Staggered entrance animations (0.15s delay per card)

**3.4 Artist Card (src/components/home/ArtistCard.tsx)**
- Glassmorphism card with animated gradient border
- Artist image with parallax offset
- Name with gradient glow on hover
- Genre badge (pill style)
- Description text (truncated on mobile)
- "Play Preview" icon button (Lucide Play icon)
- Hover: Scale 1.02, enhanced drop-shadow, border animation
- Touch-friendly: 48px minimum tap targets

**3.5 Mystery Artist Card (src/components/home/MysteryArtistCard.tsx)**
- Special treatment for unrevealed artist
- Animated silhouette or cosmic cloud visual
- Pulsing "?" with cosmic glow
- "Coming Soon" badge
- Description visible but artist name hidden
- More mysterious animations (slower, dreamier)

**3.6 Audio Preview Modal (src/components/home/AudioPreviewModal.tsx)**
- Uses Radix Dialog for accessibility
- Elegant glassmorphism modal overlay
- Spotify embed iframe (compact mode, 80px height)
- Or SoundCloud embed fallback
- Smooth fade-in animation
- Close on overlay click or ESC
- Artist name displayed in modal header

**3.7 Event Info Section (src/components/home/EventInfo.tsx)**
- Venue details (TBA for now)
- CTA buttons: "Get Notified", "Learn More"
- Social links integration
- Bento-style layout matching theme

### Phase 4: Parallax & Scroll Effects

**4.1 Background Parallax**
- GlowingInfinity component moves at 0.5x scroll speed
- Creates depth as content scrolls over it
- Implemented via `useTransform(scrollY, [...], [...])`

**4.2 Content Parallax**
- Artist images: 0.7x scroll speed (slower = appears to recede)
- Text content: 1x scroll speed (normal)
- Section headers: Slight upward parallax on enter

**4.3 Scroll-Triggered Reveals**
- Elements animate in when entering viewport
- Using `whileInView` with staggered children
- Custom easing for luxury feel

### Phase 5: Page Updates

**5.1 Update App Router (src/App.tsx)**
```text
/           -> Home.tsx (Event Landing)
/about-us   -> About.tsx (Current Index content)
/contact    -> Contact.tsx (Existing)
```

**5.2 About Page (src/pages/About.tsx)**
- Rename Index.tsx to About.tsx
- Wrap with PageWrapper
- Add SideNavigation integration
- Keep all existing sections

**5.3 Contact Page Update**
- Wrap with PageWrapper
- Add SideNavigation
- Update "Back to Home" link styling

---

## Bento Grid Layout Design

```text
Desktop Layout (3 columns):
+------------------+----------+----------+
|                  |          |          |
|    MR. D         |  SACAR   | MYSTERY  |
|    (large)       |          |          |
|                  +----------+----------+
|                  |   COUNTDOWN TIMER   |
+------------------+---------------------+
```

```text
Mobile Layout (1 column):
+------------------------+
|    COUNTDOWN TIMER     |
+------------------------+
|        MR. D           |
+------------------------+
|        SACAR           |
+------------------------+
|       MYSTERY          |
+------------------------+
```

---

## Audio Preview Implementation

Spotify Embed Format:
```text
https://open.spotify.com/embed/track/{TRACK_ID}?theme=0
```

SoundCloud Embed Format:
```text
https://w.soundcloud.com/player/?url={TRACK_URL}&color=%23ff5500
```

Modal triggers on "Play Preview" icon click, opens compact player.

---

## Responsive Breakpoints

| Breakpoint | Navigation | Grid | Touch |
|------------|------------|------|-------|
| < 640px (mobile) | Hamburger overlay | 1 column | 48px targets |
| 640-1024px (tablet) | Mini sidebar | 2 columns | 44px targets |
| > 1024px (desktop) | Full sidebar | 3 columns | Standard |

---

## Animation Guidelines

| Element | Animation | Timing |
|---------|-----------|--------|
| Page enter | Fade + scale in | 0.6s ease-out |
| Section reveal | Fade up | 0.8s ease-out |
| Artist cards | Staggered fade | 0.15s delay each |
| Countdown digits | Pulse glow | 1s infinite |
| Nav hover | Gradient border slide | 0.3s ease |
| Parallax | 50% offset | Linear with scroll |

---

## Files to Create (12 files)

| File | Purpose |
|------|---------|
| `src/data/content.ts` | Centralized text content |
| `src/types/event.ts` | TypeScript interfaces |
| `src/components/layout/SideNavigation.tsx` | Left navigation |
| `src/components/layout/PageWrapper.tsx` | Page structure |
| `src/components/ui/ParallaxContainer.tsx` | Parallax wrapper |
| `src/components/home/EventHero.tsx` | Hero section |
| `src/components/home/CountdownTimer.tsx` | Countdown display |
| `src/components/home/ArtistBentoGrid.tsx` | Bento layout |
| `src/components/home/ArtistCard.tsx` | Artist display |
| `src/components/home/MysteryArtistCard.tsx` | Mystery artist |
| `src/components/home/AudioPreviewModal.tsx` | Audio player |
| `src/pages/Home.tsx` | Event landing page |

---

## Files to Modify (4 files)

| File | Changes |
|------|---------|
| `src/App.tsx` | Update routes (/, /about-us, /contact) |
| `src/pages/Index.tsx` | Rename to About.tsx, add navigation |
| `src/pages/Contact.tsx` | Wrap with PageWrapper, add navigation |
| `src/components/ui/GlowingInfinity.tsx` | Add parallax scroll support |

---

## Technical Notes

### Parallax Implementation (Framer Motion)
```typescript
const { scrollY } = useScroll()
const y = useTransform(scrollY, [0, 1000], [0, -200])
// Element moves 200px up over 1000px of scroll
```

### Bento Grid CSS
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1.5rem;
}
.bento-large {
  grid-row: span 2;
}
```

### Audio Modal Accessibility
- Focus trap within modal
- ARIA labels for play buttons
- ESC key closes modal
- Screen reader announcements

---

## Extensibility for Future Events

The data structure supports multiple events:
```typescript
interface Event {
  id: string
  title: string
  date: Date
  venue: Venue
  artists: Artist[]
  isActive: boolean
}
```

Adding a new event requires only updating `content.ts` - no component changes needed.

---

## Summary

This plan delivers:
- World-class visual design with parallax depth
- Bento grid layout for modern aesthetic
- Audio preview modals for engagement
- Fixed left navigation for easy access
- Fully responsive across all devices
- Extensible architecture for future events
- Centralized content for easy updates
- Premium animations throughout
- Accessibility best practices
