---
name: MediSlot Playful Neo-Geometric
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#494454'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#7b7486'
  outline-variant: '#cbc3d7'
  surface-tint: '#6d3bd7'
  primary: '#6b38d4'
  on-primary: '#ffffff'
  primary-container: '#8455ef'
  on-primary-container: '#fffbff'
  inverse-primary: '#d0bcff'
  secondary: '#a43073'
  on-secondary: '#ffffff'
  secondary-container: '#fc79bd'
  on-secondary-container: '#76014e'
  tertiary: '#765700'
  on-tertiary: '#ffffff'
  tertiary-container: '#956e00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#ffd8e7'
  secondary-fixed-dim: '#ffafd3'
  on-secondary-fixed: '#3d0026'
  on-secondary-fixed-variant: '#85145a'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  headline-xl:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '800'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system reimagines clinical healthcare scheduling through a playful, high-energy neo-brutalist and Memphis geometric aesthetic. It dismantles the sterile, anxiety-inducing atmosphere typical of clinical SaaS platforms, replacing it with an approachable, dynamic, and reassuring digital environment.

### Target Audience & Emotional Intent
- **Audience:** Forward-thinking medical practitioners, clinic administrators, and patients seeking a frictionless, stress-free appointment lifecycle.
- **Emotional Response:** Reassurance, optimism, agency, and delight. The interface turns scheduling and slot management into a tactile, engaging experience.

### Visual Style
The design merges Neo-Brutalism with playful Memphis geometry:
- **Bold Lineage:** Expressive 2px structural ink lines (`#1E293B`) anchoring all components.
- **Hard-Edged Dimensionality:** Pure directional drop shadows (`4px 4px #1E293B`) without blur diffusion, producing a tactile, sticker-like depth.
- **Chromatic Vibrancy:** High-saturation accents (violet, hot pink, sunny amber, fresh mint) set against a warm, calming linen canvas (`#FFFDF5`).
- **Tactile Motion:** Interactive states simulate physical actuation—buttons and cards depress into their drop shadows upon click or hover.

## Colors

The palette balances clinical legibility with warm, energetic tones. Neutral values provide strong contrast, while vivid accents structure scheduling states and priorities.

### Palette Architecture
- **Primary Accent (`#8B5CF6` - Vivid Violet):** The dominant action color for primary navigation, primary booking actions, and highlighted availability slots.
- **Secondary Accent (`#F472B6` - Hot Pink):** Used for urgent notifications, high-priority patient states, active status badges, and playful visual focal points.
- **Tertiary Accent (`#FBBF24` - Amber Yellow):** Applied to pending states, reminder alerts, attention cards, and decorative geometric shapes.
- **Quaternary Accent (`#34D399` - Mint Green):** Designates confirmed appointments, AI-optimized time slots, success toasts, and positive capacity metrics.
- **Canvas / Background (`#FFFDF5` - Warm Linen):** Replaces harsh sterile whites with an organic, welcoming surface.
- **Card & Surface (`#FFFFFF` - Pure White):** Used inside elevated cards and modal surfaces for optimal contrast.
- **Muted Fill (`#F1F5F9` - Soft Slate Tint):** Inactive slot containers, disabled fields, and table header rows.
- **Ink / Text / Border (`#1E293B` - Dark Slate Navy):** The unifying high-contrast stroke for all typography, 2px borders, and solid hard shadows.
- **Muted Text (`#64748B` - Slate Grey):** Subtitles, meta-information, and secondary timestamps.

## Typography

The typographic strategy balances the expressive geometric flair of **Outfit** for structural headers with the clear legibility of **Plus Jakarta Sans** for complex clinical workflows, patient forms, and dense data tables.

- **Headlines (Outfit):** Geometric, open counters, and high x-height create an inviting tone. Weight scale ranges from 600 to 800 for strong presence.
- **Body & Labels (Plus Jakarta Sans):** Optimized for fast scanning of clinical details, time indicators, and diagnostic notes. Labels utilize bold weights (`700` and `800`) to hold their own inside outlined containers.

## Layout & Spacing

The layout operates on a strict 12-column responsive fluid grid designed to display multi-provider schedules, appointment queues, and interactive calendar views side-by-side.

### Grid & Breakpoints
- **Desktop (1200px+):** 12-column layout with `2rem` outer margins and `1.5rem` gutters. Accommodates persistent left rail navigation, main calendar grids, and expandable side drawers for patient intake.
- **Tablet (768px - 1199px):** 8-column layout with `1.5rem` outer margins and `1.25rem` gutters. Scheduling views reflow into stacked weekly agendas or horizontal scroll lanes.
- **Mobile (320px - 767px):** 4-column layout with `1rem` outer margins and `1rem` gutters. Sidebars fold into bottom sheets and sticky action bars.

### Spacing Rhythm
Empty space between components is structured around increments of `0.5rem` (`space-sm`) and `1rem` (`space-md`). Dense operational items (such as 15-minute slot chips) use `space-xs` (`4px`) inner padding, ensuring high data density without visual friction.

## Elevation & Depth

This design system rejects blurred Gaussian drop shadows and tonal gradient layering. Depth is communicated strictly via **hard-offset planar drop shadows** paired with structural borders.

### Elevation Levels
- **Level 0 (Flat / Sunken):** 2px solid `#1E293B` border, no shadow (`box-shadow: none`). Used for background wells, time tracks, and disabled slot containers.
- **Level 1 (Base Sticker):** 2px solid `#1E293B` border with `box-shadow: 2px 2px 0px #1E293B`. Applied to inline chips, badges, and segmented toggles.
- **Level 2 (Interactive Card & Button):** 2px solid `#1E293B` border with `box-shadow: 4px 4px 0px #1E293B`. Applied to standard cards, inputs, action buttons, and appointment tiles.
- **Level 3 (Floating Modal & Drag Object):** 2px solid `#1E293B` border with `box-shadow: 6px 6px 0px #1E293B`. Used for active slot drags, overlays, dropdown menus, and dialogs.

### Interactive Physics
Hovering an interactive Level 2 element shifts its position by `-2px, -2px` while expanding the shadow to `6px 6px 0px #1E293B`. Active/pressed states translate the element `+4px, +4px` down and right, collapsing the shadow to `0px 0px 0px #1E293B` to create an authentic mechanical click.

## Shapes

The design uses a **pill-shaped (level 3)** curvature to contrast with its sharp, hard drop shadows and rigid 2px borders.

- **Buttons & Tags:** Fully rounded pill capsules (`border-radius: 9999px`) provide a friendly, soft hand-feel that balances the strict rectangular calendar geometry.
- **Cards & Panels:** Large soft corners (`rounded-xl` / `1.5rem` to `2rem`) generate a sticker-like silhouette.
- **Geometric Accents:** Decorative graphical stamps—such as 4-point sparkle stars, bold half-circles, floating pill dots, and Memphis squiggles—are layered alongside card titles and slot metrics to reinforce brand warmth.

## Components

### Buttons
- **Primary Action:** Background `#8B5CF6`, text `#FFFFFF`, 2px solid `#1E293B` border, `4px 4px 0px #1E293B` shadow. Pill-shaped (`rounded-full`). On hover: translate `(-2px, -2px)` with `6px 6px` shadow. Active: translate `(+4px, +4px)` with zero shadow.
- **Secondary Action:** Background `#F472B6`, text `#1E293B`, 2px solid `#1E293B` border, `4px 4px 0px #1E293B` shadow.
- **Ghost / Neutral:** Background `#FFFFFF`, text `#1E293B`, 2px solid `#1E293B` border, `2px 2px 0px #1E293B` shadow.

### Chips & Badges
- **Slot Time Chip:** Pill shape, background `#FFFDF5`, 2px solid `#1E293B` border, text `label-md`. When available: subtle mint dot (`#34D399`). When booked/locked: diagonal hatching overlay or muted slate background (`#F1F5F9`).
- **Status Badges:** Small pill badges with 2px borders. `#34D399` for "Confirmed", `#FBBF24` for "Awaiting Intake", `#F472B6` for "Emergency/Walk-in".

### Cards & Stickers
- **Patient / Appointment Card:** Background `#FFFFFF`, 2px solid `#1E293B` border, `4px 4px 0px #1E293B` shadow, `rounded-xl` (1.5rem radius). Features a colored accent top tab or pill-shaped provider badge.
- **AI Recommendation Card:** Background `#FFFDF5`, border 2px solid `#1E293B`, accented with an energetic 4-point sparkle star in `#FBBF24` and a high-visibility mint ribbon badge.

### Input Fields
- **Text & Select Inputs:** Background `#FFFFFF`, 2px solid `#1E293B` border, `2px 2px 0px #1E293B` shadow, `rounded-lg` (0.75rem). Active/focus states deepen the shadow to `4px 4px 0px #8B5CF6` with an outline shift to `#8B5CF6`. Placeholder text rendered in `#64748B`.

### Checkboxes & Radios
- **Checkbox:** Square box with `rounded-md` (0.375rem), 2px solid `#1E293B` border, `2px 2px 0px #1E293B` offset shadow. Checked state fills with `#8B5CF6` showing a thick white checkmark.
- **Radio:** Perfect circle with 2px solid `#1E293B` border and hard shadow. Selected state displays an inner solid dot of `#F472B6`.

### Healthcare-Specific: Calendar Timeline & Slot Matrix
- **Time Columns:** Bound by vertical 2px solid `#1E293B` divider rules.
- **Slot Blocks:** Tactile, rounded draggable blocks with 2px borders and `2px 2px 0px #1E293B` shadow. Hover reveals doctor avatar stickers, duration flags, and quick-confirm icons.