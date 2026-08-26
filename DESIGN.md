---
name: Quiet Refinement
colors:
  surface: '#f7fbec'
  surface-dim: '#d7dccd'
  surface-bright: '#f7fbec'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f5e6'
  surface-container: '#ebf0e1'
  surface-container-high: '#e5eadb'
  surface-container-highest: '#e0e4d5'
  on-surface: '#181d14'
  on-surface-variant: '#474741'
  inverse-surface: '#2d3228'
  inverse-on-surface: '#eef3e3'
  outline: '#787770'
  outline-variant: '#c8c7be'
  surface-tint: '#5f5e5a'
  primary: '#5f5e5a'
  on-primary: '#ffffff'
  primary-container: '#fcf9f3'
  on-primary-container: '#73726e'
  inverse-primary: '#c8c6c1'
  secondary: '#635d59'
  on-secondary: '#ffffff'
  secondary-container: '#eae1db'
  on-secondary-container: '#69635f'
  tertiary: '#6f5a53'
  on-tertiary: '#ffffff'
  tertiary-container: '#fff8f6'
  on-tertiary-container: '#846d66'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2dc'
  primary-fixed-dim: '#c8c6c1'
  on-primary-fixed: '#1c1c18'
  on-primary-fixed-variant: '#474743'
  secondary-fixed: '#eae1db'
  secondary-fixed-dim: '#cdc5bf'
  on-secondary-fixed: '#1f1b18'
  on-secondary-fixed-variant: '#4b4642'
  tertiary-fixed: '#fadcd3'
  tertiary-fixed-dim: '#ddc1b8'
  on-tertiary-fixed: '#271813'
  on-tertiary-fixed-variant: '#56423c'
  background: '#f7fbec'
  on-background: '#181d14'
  surface-variant: '#e0e4d5'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 36px
    fontWeight: '500'
    lineHeight: 42px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-sm:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  metadata:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 840px
  gutter: 32px
  margin-mobile: 20px
  section-gap: 80px
---

## Brand & Style

This design system is built for a thoughtful, quiet, and elegant literary presence. It draws heavily from the **Minimalist** and **Editorial** traditions, prioritizing the written word over decorative interface elements. The emotional response should be one of intellectual calm and sophisticated focus.

The aesthetic is defined by:
- **Generous Whitespace:** Utilizing negative space to provide "breathing room" for complex ideas.
- **Micro-interactions:** Transitions should be slow and deliberate, mimicking the turning of a heavy paper page.
- **Refined Restraint:** Avoiding unnecessary borders or shadows in favor of typographic hierarchy and subtle tonal shifts.
- **Intentionality:** Every element on the screen must serve the clarity of the narrative.

## Colors

The palette is anchored in natural, organic tones that reduce eye strain during long-form reading.

- **Primary (#FCF9F3):** A soft cream used for all main backgrounds to provide a warm, paper-like feel.
- **Secondary (#4A4541):** A deep charcoal-taupe used for primary text and headings. It offers high legibility without the harshness of pure black.
- **Tertiary (#A68D85):** A muted dusty rose used for soft accents, category tags, and subtle hover states.
- **Neutral (#8C9184):** A soft sage used for secondary information, metadata, and decorative dividers.

Contrast is maintained through value rather than saturation, ensuring a sophisticated, low-energy visual environment.

## Typography

The typographic system pairs the classical elegance of **EB Garamond** with the modern, balanced clarity of **Manrope**.

- **Headings:** Use EB Garamond for all editorial titles. It should be set with slightly tight letter-spacing in larger sizes to emphasize its graceful serifs.
- **Body Text:** Use Manrope for long-form content. The line height is intentionally generous (1.6x) to facilitate "deep reading" and reduce cognitive load.
- **Labels & Metadata:** Captions and categories use Manrope in uppercase with increased tracking to create a distinct visual contrast from the narrative text.
- **Hierarchy:** Ensure a clear distinction between the "voice" of the author (Serif) and the "utility" of the interface (Sans-serif).

## Layout & Spacing

This design system uses a **Fixed Grid** philosophy for content-heavy pages to ensure optimal line lengths for readability.

- **Content Width:** Long-form articles are constrained to a maximum width of 840px, centered on the screen, to prevent lines from becoming too long and difficult to track.
- **Vertical Rhythm:** Spacing follows an 8px base unit. Section gaps are intentionally large (80px+) to signify shifts in topic or thought.
- **Mobile Adaptivity:** On mobile devices, side margins shrink to 20px, and the primary focus remains a single-column stack that prioritizes vertical flow.
- **Dividers:** Use very thin (0.5px) horizontal rules in the Neutral Sage color to separate metadata from content without creating hard visual breaks.

## Elevation & Depth

This system avoids physical depth metaphors like shadows or neomorphism. Depth is communicated through **Tonal Layering** and **Subtle Transparency**.

- **Layers:** Most surfaces sit directly on the primary background. To highlight specific areas (like a pull-quote or a newsletter signup), use a slightly darker tint of the primary cream rather than a shadow.
- **Overlays:** Modals or navigation menus should use a subtle backdrop blur (Glassmorphism) with high transparency to maintain a sense of the page underneath.
- **Borders:** When necessary, use low-contrast outlines in the Secondary color at 10% opacity. Avoid heavy or dark borders.

## Shapes

The shape language is **Soft** and understated. 

- **Corners:** Standard UI elements like buttons and input fields use a 0.25rem radius. This provides a hint of softness without feeling overly "bubbly" or informal.
- **Images:** Photography should use the same soft corner radius or remain sharp (0px) to mimic printed editorial layouts.
- **Decorative Elements:** Any iconography should use fine lines (thin stroke weights) to match the delicate nature of the serif typography.

## Components

- **Buttons:** Primary buttons are text-only with a subtle underline or a solid background in the Tertiary Rose color with Charcoal text. Avoid high-contrast black buttons.
- **Input Fields:** Use a simple bottom border (1px) in the Neutral Sage color. When focused, the border transitions to the Tertiary Rose color. Labels should always be visible in the `label-caps` style.
- **Chips/Tags:** Small, pill-shaped elements with a background 5% darker than the primary cream. Text should be in the `metadata` or `label-caps` style.
- **Cards:** Cards should have no borders or shadows. They are defined by their typographic content and a slightly different background tint or a thin divider line between items.
- **Pull-quotes:** Large-scale EB Garamond text, centered, with thin vertical Sage lines on the left and right.
- **Navigation:** Minimalist top-bar with generous spacing between links. Use the `label-caps` style for navigation items to denote utility.