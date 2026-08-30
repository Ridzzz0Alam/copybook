# Strata — Design Archive

An open reference of motion, gradient and typographic specimens for people who build
interfaces. Every specimen is documented, inspectable, and ready to lift into production code.

Built as a static single-page app: React 19, TypeScript, Tailwind CSS v4, Framer Motion.

---

## Contents

| # | Section | Specimens |
|---|---------|-----------|
| 01 | Motion — hover, click, continuous, loading, text | 60 |
| 02 | Gradients — mesh, aurora, neon, metallic, glass, organic, brand | 50 |
| 03 | Typefaces — filed by classification, with import lines | 50 |

---

## Quick start

```bash
npm install     # or: npm ci
npm run dev     # http://localhost:5173
```

| Script | Does |
|--------|------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Typecheck (`tsc -b`) then production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint across the repo |

Node 22 is pinned via `.nvmrc` and used by CI.

---

## Design system

Tokens live in `src/index.css` under Tailwind v4's `@theme` block — there is no
`tailwind.config.js`. Semantic colours are HSL triples; brand colours are flat hex.

```css
--color-ocean:      #3B82F6;   /* primary accent */
--color-ocean-deep: #1D4ED8;   /* pressed / darker-on-light */
--color-ocean-soft: #93C5FD;   /* tints, mid-tier badges */
--color-mist:       #E2E8F0;   /* neutral highlight */
--color-ink:        #0B1220;   /* navy-tinted, not neutral black */
--color-paper:      #F1F5F9;
```

`--color-mist` is a near-white neutral, so it reads as a quiet highlight rather than a
second accent. Don't use it for anything that needs to pop on the light scheme — it
disappears against `--background`. Reach for `--color-ocean` there instead.

**Type.** Bricolage Grotesque (display), Inter Tight (body), Instrument Serif
(editorial accents), JetBrains Mono (labels and code).

**Shape.** Sharp by default — radius tokens are `0px`/`2px`. Depth comes from solid
offset shadows (`.hard-shadow`) and hairline rules, not blur or glow.

**Utilities.** `.rule-label` (monospace section labels), `.rule-grid` /
`.halftone` / `.diagonal-hatch` (background textures), `.underline-sweep`,
`.hover-nudge`. Ticker and blink animations respect `prefers-reduced-motion`.

### Colour scheme

**Dark is the default.** The dark scale lives on `:root`, and `.light` is the opt-in
override — the inverse of the usual arrangement. Doing it this way means the correct
colours are painted before JavaScript runs, so there's no white flash on first load.

`ThemeProvider` still adds a literal `dark` or `light` class to `<html>`, so the `dark:`
variant keeps working normally.

Colour scheme is class-based, not media-query based. Tailwind v4 defaults the `dark:`
variant to `prefers-color-scheme`, so the class strategy **requires** this line in
`src/index.css`:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Remove it and every `dark:` utility silently stops responding to the toggle.

To flip the default back to light, change `defaultTheme` in `src/App.tsx` — but also
swap which scale sits on `:root` in `index.css`, or you'll reintroduce the flash.

---

## Structure

```
src/
├── components/
│   ├── navigation.tsx        # fixed bar, mobile drawer, scheme toggle
│   ├── footer.tsx
│   ├── ticker.tsx            # looping marquee band
│   ├── section-header.tsx    # shared numbered editorial header
│   ├── specimen-card.tsx     # flat card frame used by all galleries
│   ├── scroll-progress.tsx
│   ├── theme-provider.tsx    # component only
│   ├── magnetic-button.tsx
│   └── text-reveal.tsx
├── sections/
│   ├── hero.tsx
│   ├── animation-effects.tsx # lazy
│   ├── gradient-gallery.tsx  # lazy
│   └── font-showcase.tsx     # lazy
├── lib/
│   ├── theme-context.ts      # context + types
│   ├── use-theme.ts          # hook
│   └── utils.ts              # cn()
├── index.css                 # all design tokens
├── App.tsx
└── main.tsx
```

The three gallery sections are `React.lazy` imports, so they ship as separate chunks
behind a `Suspense` fallback.

---

## Deployment

CI and deployment run from `.github/workflows/ci.yml`. See **[DEPLOYMENT.md](./DEPLOYMENT.md)**
for the full setup walkthrough.

---

## Licence

MIT.
