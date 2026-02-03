
# Hero Section Viewport Fit and Complete UI Refinements

## Overview

This plan combines two sets of changes:
1. **New request**: Hero section fits exactly in viewport (100vh), logo NOT at the top
2. **Previous approved changes**: Top navigation, waitlist page, artist updates, audio auto-play, remove EventInfo

---

## Hero Section Layout Changes

### Current Issue
- Hero uses `min-h-screen` which allows content to exceed viewport
- Logo is at the very top of the content
- Content doesn't fit perfectly within one screen

### Solution: Viewport-Fit Hero with Centered Content

```text
+----------------------------------------------------------+
|  [TOP NAVIGATION - Fixed, 64px height]                    |
+----------------------------------------------------------+
|                                                          |
|           [Event Subtitle Badge]                          |
|                                                          |
|           NEPALESE NEW YEAR 2082                          |
|           (Large gradient title)                          |
|                                                          |
|           "Experience the ultimate celebration..."        |
|                                                          |
|           [London, UK]  [April 14, 2026]                  |
|                                                          |
|           [LOGO - Centered, with glow]                    |
|                                                          |
|           +------+ +------+ +------+ +------+             |
|           | DAYS | | HRS  | | MINS | | SECS |             |
|           +------+ +------+ +------+ +------+             |
|                                                          |
|           [JOIN THE WAITLIST - Gradient Button]           |
|                                                          |
+----------------------------------------------------------+
```

### Key Layout Changes

**EventHero.tsx restructure:**
- Change from `min-h-screen` to `h-screen` (exact viewport height)
- Account for top navigation with `pt-16` (64px)
- Use `justify-between` or careful spacing to distribute content
- Move logo to center position (between location badges and countdown)
- Reduce margins/padding to fit all elements
- Remove scroll indicator, add waitlist button at bottom

---

## Files Summary

### Files to Create (2)
| File | Purpose |
|------|---------|
| `src/components/layout/TopNavigation.tsx` | Fixed top navigation bar (iOS 26 style) |
| `src/pages/Waitlist.tsx` | Waitlist registration page with form |

### Files to Modify (8)
| File | Changes |
|------|---------|
| `src/components/home/EventHero.tsx` | Viewport fit, reorder content, logo in center, add waitlist CTA |
| `src/components/home/MysteryArtistCard.tsx` | Remove "?", rename to "Upcoming Artist" |
| `src/components/home/AudioPreviewModal.tsx` | Enable autoplay parameter |
| `src/data/content.ts` | Update text strings, add waitlist strings |
| `src/pages/Home.tsx` | Remove EventInfo import and usage |
| `src/components/layout/PageWrapper.tsx` | Replace SideNavigation with TopNavigation, add top padding |
| `src/App.tsx` | Add `/waitlist` route |
| `src/components/home/ArtistBentoGrid.tsx` | Remove "Discover the Lineup" heading if present |

### Files to Delete (2)
| File | Reason |
|------|--------|
| `src/components/layout/SideNavigation.tsx` | Replaced by TopNavigation |
| `src/components/home/EventInfo.tsx` | No longer used |

---

## Detailed Implementation

### 1. EventHero.tsx - Viewport-Fit Redesign

**Layout structure (top to bottom):**
1. Event subtitle badge ("Nepalese New Year 2082 Eve")
2. Main title with gradient text
3. Tagline
4. Location and date badges (row)
5. Logo (centered, with glow animation)
6. Countdown timer (compact, 4 cells)
7. "Join the Waitlist" button

**CSS changes:**
```css
/* From */
min-h-screen flex flex-col items-center justify-center px-4 py-20

/* To */
h-screen flex flex-col items-center justify-center px-4 pt-20 pb-8
```

**Spacing adjustments:**
- Reduce all `mb-*` margins by 30-40%
- Logo size: `w-32 md:w-40 lg:w-48` (slightly smaller)
- Countdown: More compact padding
- Remove scroll indicator completely
- Add gradient "Join the Waitlist" button at bottom

### 2. TopNavigation.tsx - iOS 26 Style

**Features:**
- Fixed position: `fixed top-0 left-0 right-0 z-50`
- Height: `h-16` (64px)
- Glassmorphism: `backdrop-blur-xl bg-background/70`
- Logo on left (small version)
- Text links on right: Home, About Us, Contact
- No icons, text only
- Mobile: Hamburger menu with slide-down overlay

**Styling:**
```css
.top-nav {
  border-bottom: 1px solid hsl(var(--border) / 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
```

### 3. PageWrapper.tsx Updates

**Changes:**
- Replace `SideNavigation` import with `TopNavigation`
- Remove `lg:ml-20` margin for side nav
- Add `pt-16` padding-top to account for fixed header

### 4. Waitlist Page

**Route:** `/waitlist`

**Layout:**
- "Back to Home" link at top
- Two-column bento layout (desktop)
- Left: Event info card with countdown, venue/date badges
- Right: Registration form with glassmorphism inputs

**Form fields:**
- First Name, Last Name (row)
- Email Address
- Phone, Postcode (row)
- Privacy checkbox
- Gradient submit button

### 5. Artist Card Updates

**MysteryArtistCard.tsx:**
- Remove animated "?" question mark
- Change title from "Mystery Artist" to "Upcoming Artist"
- Keep gradient text styling matching other artists
- Keep "Coming Soon" badge
- Use the new silhouette image

### 6. Audio Auto-Play

**AudioPreviewModal.tsx:**
- Add `autoplay=1` to Spotify embed URL
- Add `auto_play=true` to SoundCloud embed URL

### 7. Remove EventInfo

**Home.tsx:**
- Remove `EventInfo` import
- Remove `<EventInfo />` component usage

---

## Technical Details

### Viewport Height Calculation

To ensure hero fits exactly with top nav:
```typescript
// Hero section
className="h-screen pt-16" // Full height minus nav space

// Or using CSS calc
style={{ height: 'calc(100vh - 64px)', marginTop: '64px' }}
```

### Responsive Countdown Sizing

For viewport fit on mobile:
```css
/* Mobile-first compact countdown */
.countdown-cell {
  padding: 0.5rem;
}
.countdown-number {
  font-size: 1.5rem; /* 24px on mobile */
}

/* Scale up for larger screens */
@media (min-width: 640px) {
  .countdown-number { font-size: 2rem; }
}
@media (min-width: 768px) {
  .countdown-number { font-size: 3rem; }
}
```

### Logo Positioning

Logo moves from top to center of hero:
```text
Before: Logo -> Title -> Tagline -> Badges -> Countdown
After:  Title -> Tagline -> Badges -> Logo -> Countdown -> CTA
```

---

## Animation Details

| Element | Animation |
|---------|-----------|
| Top nav | Glassmorphism intensifies on scroll |
| Logo (center) | Glow pulse, subtle float |
| Countdown | Staggered fade-in, number pulse |
| Waitlist button | Gradient shift, hover scale |
| Page load | Sequential reveal (0.1s delays) |

---

## Summary

This implementation ensures:
- Hero section fits exactly within viewport (100vh)
- Logo positioned in center, not at top
- Countdown integrated within hero
- Top navigation replaces side navigation
- New waitlist page with stunning form
- "Upcoming Artist" replaces "Mystery Artist"
- Audio auto-plays on preview click
- EventInfo section removed
- Fully responsive across all devices
