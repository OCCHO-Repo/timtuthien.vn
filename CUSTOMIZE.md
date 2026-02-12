# Customization Guide

To make the site easier to maintain, styles are now split into focused files:

- `styles/theme.css`: global tokens (colors, fonts, spacing, motion)
- `styles/components.css`: reusable UI pieces (buttons, nav, table, FAQ, footer)
- `styles/sections.css`: section-specific visuals
- `styles/responsive.css`: all breakpoints
- `styles.css`: imports the files above

## 1. Fast theme changes

Edit these variables in `styles/theme.css`:

- `--color-bg`, `--color-bg-soft`, `--color-card`
- `--color-text`, `--color-border`, `--color-border-strong`
- `--color-brand`, `--color-verified`, `--color-caution`, `--color-action`
- `--color-accent` (alias for highlighted/verified text)
- `--font-display`, `--font-body`, `--font-mono`
- `--section-space`, `--container-max`, `--page-padding`

Suggested semantic usage:

- `brand`: platform trust surfaces (nav, structure, dark section backgrounds)
- `verified`: Green List badges/positive metrics
- `caution`: Tier-3/high-risk labels and warnings
- `action`: donate/start CTAs and conversion buttons

## 2. Font system (Vietnamese-first)

Current stack:

- Display: `Bricolage Grotesque`
- Body/UI: `Be Vietnam Pro`
- Mono labels: `IBM Plex Mono`

These fonts are selected for modern look and reliable Vietnamese diacritics.

## 3. Animation tuning

Edit `CONFIG` at the top of `script.js`:

- `reveal.threshold`
- `barAnimation.delayMs`
- `stackAnimation.baseDelayMs`
- `stackAnimation.staggerMs`
- `accordion.singleOpen`

## 4. Content updates

Most text is in `index.html`. Reusable section IDs:

- `#how-it-works`
- `#top-charities`
- `#about`
- `#start-giving`

## 5. Safe workflow

1. Update tokens in `styles/theme.css` first.
2. If needed, adjust components in `styles/components.css`.
3. Only then tweak section-level styles.
