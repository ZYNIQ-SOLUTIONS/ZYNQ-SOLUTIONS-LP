# ZYNIQ Studio landing page: Factory Blueprint redesign

Date: 2026-10-08
Status: awaiting review

## Goal

Replace the current black/red "military terminal" landing page with a distinctive
design for the whole company under the name **ZYNIQ Studio**. Scope of content is
unchanged (four sectors, ten services, four use cases, consultation form). The
design concept is taken from the page's own vocabulary: software factory,
assembly line, crews, commanders.

Success: a visitor can tell within the first screen what ZYNIQ Studio does, can
reach every piece of today's content, and can send a consultation request that
actually arrives. The page does not look like a generic dark AI-startup template.

## Agreed with the user

- Whole-company page, brand renamed from ZYNIQ Solutions to ZYNIQ Studio.
- Direction: Factory Blueprint (page as a technical drawing of a software factory).
- Existing copy is kept; only section labels change tone.
- The decisions listed under "Changes to behaviour and content" below.

## Visual system

### Colour

Defined as CSS variables in `src/index.css`, switched by the existing
`:root.light` class. Light remains the default.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#F2EEE4` | `#101214` | page background |
| `--paper-raised` | `#FAF7F0` | `#181B1E` | panels, form fields |
| `--ink` | `#15140F` | `#ECE8DD` | text, rules |
| `--ink-muted` | `#6B675C` | `#8F8B80` | secondary text |
| `--rule` | `rgba(21,20,15,.16)` | `rgba(236,232,221,.16)` | hairlines |
| `--grid` | `rgba(21,20,15,.06)` | `rgba(236,232,221,.05)` | background grid |
| `--red` | `#EA2323` | `#EA2323` | production line, active state, primary button |

Red is the only accent. Body text on paper must meet WCAG AA; red is never used
for body text on paper in light mode at small sizes (use ink, with red as a marker).

### Type

Loaded from Google Fonts in `index.css`.

- Display: Big Shoulders Display (700/800/900), uppercase, tight leading.
- Annotation: JetBrains Mono (400/500/600), uppercase, wide tracking, 10–12px.
- Body: Inter Tight (400/500/600).

### Motifs

- Background drafting grid (24px minor, 120px major) drawn with CSS gradients.
- Corner registration marks on framed blocks.
- Dimension lines (`|<— label —>|`) as decorative annotations.
- Sheet numbers (`SHEET 00`, `STATION 01` …) on every section.
- Square corners everywhere.
- **Production line:** a fixed vertical rail at the left of the content column
  (desktop, ≥1024px). A red fill grows with scroll progress; a node sits at each
  station and turns red when its station has been reached. Below 1024px it becomes
  a 2px horizontal progress bar under the nav.

### Motion

Uses the existing `motion` package. Section content fades/slides in once on
entering view. Gauges count up once. Hero schematic loops slowly. All of it is
disabled under `prefers-reduced-motion: reduce` (static final state shown).

## Page structure

| # | Id | Section | Content source | Treatment |
|---|---|---|---|---|
| – | – | Nav | – | Logo icon + wordmark + "STUDIO" set in display type. Links: Sectors, Services, Use cases, Consultation. Theme toggle. "Start a build" button scrolls to consultation. Mobile: menu panel. |
| 00 | `top` | Hero | current hero copy | Left: tag line, headline "The future is coded by us", subcopy, two buttons ("Start a build" → consultation, "See the line" → sectors). Right: animated SVG schematic of four connected stages (Intake → Crews → Checks → Ship) with items moving along the line. Stacks on mobile. |
| – | – | Parts strip | 8 technologies + use text | Continuous ticker. Hover/focus/tap on a part pauses it and shows the use text. |
| 01 | `output` | Output | "Architecting Synthetic Brains" + 3 stats | Three gauge readouts (arc + number), count up on view. |
| 02 | `sectors` | Sectors | 4 pillars | Floor plan of four bays in a 2×2 grid (4×1 on wide, 1×4 on mobile). Selecting a bay shows `detailTitle`, `detailExplanation` and a small schematic for that sector. |
| – | – | Manifesto | quote + two supporting lines | Full-width statement with an "APPROVED" style stamp. |
| 03 | `services` | Services | 10 services | Spec-sheet table: number, title, subtitle. Row expands in place to show description and deliverables. One open at a time, first open by default. Each has a "Request this" button that scrolls to the form. |
| 04 | `usecases` | Use cases | 4 use cases | Work-order tickets: selector on the left, ticket on the right with description, three metrics, guidelines, tools and log readout. |
| 05 | `consultation` | Consultation | form | Work-order form: first name, last name, email, brief. Submit, pending, success and error states. |
| – | – | Title block | footer content | Grid laid out like a drawing title block: brand + description, quick links, contacts, socials, HQ, copyright, legal. |

## Changes to behaviour and content

1. **Name.** "ZYNIQ Studio" in `<title>`, nav, footer text and copyright, and
   `metadata.json`. Email addresses and social URLs are unchanged.
2. **Labels.** Military section labels are replaced with factory terms
   ("Operational Directives" → "Services", "Initiate Protocol" → "Request this",
   "Submit Transmission" → "Send work order"). Service titles, descriptions and
   all body copy are unchanged.
3. **Sector panels.** The four mock readouts (memory vector index, API schema,
   rules tree, schema graph) are removed. Each sector gets a small static SVG
   schematic instead.
4. **Form.** Wired to Netlify Forms: `data-netlify="true"`, a hidden
   `form-name` field, a honeypot field, a static copy of the form in
   `index.html` so Netlify detects it at build, and a `fetch` POST with
   URL-encoded body. Required fields: first name, email, brief. On success the
   form is replaced by a confirmation; on failure an inline error shows the
   contact email as a fallback.
5. **Dead links.** "API Docs [V3]" is removed. Terms and Privacy stay as
   placeholder anchors.
6. **Removed files.** `AgentSandbox.tsx` (never rendered), `ParticleGrid.tsx`
   (replaced), and the `AgentStep`/`AgentPreset` types.
7. **Bug fixed in passing.** Use cases default to id `prod-ops`, which does not
   exist; default becomes the first use case.
8. **Statistics.** All figures are kept exactly as written.

## Code structure

No new dependencies.

```
src/
  App.tsx                      shell: nav, sections in order, footer, production line
  index.css                    tokens, grid, fonts, base
  types.ts                     Pillar, UseCase, Service, Brand
  content/
    brands.ts  stats.ts  sectors.ts  services.ts  useCases.ts  site.ts
  components/
    LogoIcon.tsx  ZyniqTextLogo.tsx  ThemeToggle.tsx      (kept)
    blueprint/
      Station.tsx              section frame: id, station number, label, title, intro
      CornerMarks.tsx          registration marks for a framed block
      ProductionLine.tsx       scroll rail (desktop) / progress bar (mobile)
      Gauge.tsx                arc + count-up number
  sections/
    Nav.tsx  Hero.tsx  PartsStrip.tsx  Output.tsx  Sectors.tsx  Manifesto.tsx
    Services.tsx  UseCases.tsx  Consultation.tsx  TitleBlock.tsx
```

Each section owns its own state. `Station` registers its id so
`ProductionLine` can mark nodes; station list is a constant in `content/site.ts`
shared by nav, line and footer links.

The old Tailwind colour names (`brand-accent`, `surface`, inverted
`black`/`white`) are removed with the components that used them.

## Accessibility

- Nav and footer links are real anchors to section ids; smooth scroll via CSS
  `scroll-behavior` with `scroll-margin-top` on sections.
- Service rows and sector bays are buttons with `aria-expanded` / `aria-pressed`
  and `aria-controls`.
- Visible focus ring (2px red outline) on all interactive elements.
- Form fields have labels, `required`, `autocomplete`, and errors announced via
  `role="alert"`.
- Decorative SVG is `aria-hidden`.
- Reduced motion respected.

## Verification

- `npm install`, `npm run lint` (tsc), `npm run build` all pass.
- Viewed in a browser at 1440, 1024, 768 and 375 widths, in light and dark:
  no horizontal scroll, every section reachable from nav, service rows and
  sector bays toggle, ticker pauses, gauges animate once.
- Form: client validation and error path checked locally. The Netlify
  submission itself can only be confirmed on a Netlify deploy.

## Out of scope

- Terms / Privacy pages, API docs.
- Removing unused dependencies (`@google/genai`, `express`, `dotenv`).
- Changes to copy beyond the labels listed above.
- Analytics, SEO work beyond title/description.
