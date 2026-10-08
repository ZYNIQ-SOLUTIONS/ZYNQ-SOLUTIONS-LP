# ZYNIQ Studio Factory Blueprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the landing page as "ZYNIQ Studio" in the Factory Blueprint design, keeping all existing content and making the consultation form work.

**Architecture:** `App.tsx` becomes a thin shell that renders sections in order. Copy lives in `src/content/`, each section in `src/sections/`, shared drawing primitives in `src/components/blueprint/`. Theme is CSS variables switched by the existing `:root.light` class.

**Tech Stack:** React 19, Vite 6, Tailwind 4 (`@theme` tokens), `motion` 12, `lucide-react`. Netlify Forms for the form.

**Spec:** `docs/superpowers/specs/2026-10-08-zyniq-studio-factory-blueprint-design.md`

## Global Constraints

- No new dependencies. There is no test runner, so each task is verified by `npm run lint` (tsc), `npm run build`, and the browser checks listed in the task.
- Work on branch `redesign/factory-blueprint`. Run `npm install` once before Task 1.
- Brand name is "ZYNIQ Studio". Email addresses and social URLs are unchanged.
- Body copy, service titles/descriptions and all statistics are copied verbatim from the current components. Only the section labels named in this plan change.
- Colour tokens (light / dark): paper `#F2EEE4` / `#101214`; raised `#FAF7F0` / `#181B1E`; ink `#15140F` / `#ECE8DD`; muted `#6B675C` / `#8F8B80`; rule `rgba(21,20,15,.16)` / `rgba(236,232,221,.16)`; grid `rgba(21,20,15,.06)` / `rgba(236,232,221,.05)`; red `#EA2323` both.
- Fonts: Big Shoulders Display 700/800/900 (display), JetBrains Mono 400/500/600 (annotation), Inter Tight 400/500/600 (body).
- Red is the only accent. Square corners everywhere (no `rounded-*`).
- Light theme is the default. All motion is disabled under `prefers-reduced-motion: reduce`, showing the final static state.
- Every interactive element has a visible 2px red focus outline. Decorative SVG is `aria-hidden`.
- Breakpoint for the desktop layout and vertical production line is 1024px (`lg`).

## Review Focus

1. **Narrow screens (320–375px) with long uppercase words** ("ARTIFICIAL INTELLIGENCE", "DECENTRALIZED TRUST" in display type): nothing overflows and the page never scrolls horizontally. Checked in Tasks 3, 5 and 7.
2. **Form submission fails or the host is not Netlify** (network error, 404, non-2xx): the user's input is kept, an inline error with `contact@zyniq.solutions` appears, and the button is usable again. Checked in Task 6.
3. **Double submit while a request is pending:** the second click does nothing. Checked in Task 6.
4. **Touch devices on the parts strip (no hover):** tapping a part shows its use text and tapping elsewhere or another part changes/dismisses it. Checked in Task 3.
5. **Sticky nav covering section headings** when arriving by nav link or a URL hash on load: the station heading is fully visible below the nav. Checked in Tasks 2 and 7.

---

### Task 1: Tokens, content and clean slate

**Files:**
- Modify: `src/index.css`, `index.html`, `metadata.json`, `src/types.ts`, `src/App.tsx`
- Create: `src/content/brands.ts`, `src/content/stats.ts`, `src/content/sectors.ts`, `src/content/services.ts`, `src/content/useCases.ts`, `src/content/site.ts`
- Delete: `src/components/AgentSandbox.tsx`, `ParticleGrid.tsx`, `PillarsSection.tsx`, `ServicesSection.tsx`, `UseCasesSection.tsx`, `ConsultationSection.tsx`

**Interfaces:**
- Produces (Tailwind classes from `@theme`): colours `paper`, `raised`, `ink`, `muted`, `rule`, `grid`, `red` (e.g. `bg-paper`, `text-ink`, `text-muted`, `border-rule`, `bg-red`); fonts `font-display`, `font-mono`, `font-sans`.
- Produces (CSS classes in `index.css`): `.bp-grid` (drafting grid background: 24px minor lines in `--grid`, 120px major lines in `--rule`), `.bp-label` (mono, uppercase, 11px, tracking 0.14em, muted).
- Produces (`src/types.ts`): `Brand {name; useCase}`, `Stat {value: number; suffix: string; fill: number; label: string; note: string}`, `Pillar` (unchanged), `Service {id; number; title; subtitle; description; deliverables: string[]}`, `UseCase` (unchanged), `StationDef {id: string; number: string; label: string}`. Remove `AgentStep`, `AgentPreset`.
- Produces (`src/content/*`): `BRANDS: Brand[]`, `STATS: Stat[]`, `SECTORS: Pillar[]`, `SERVICES: Service[]`, `USE_CASES: UseCase[]`, and from `site.ts`: `STATIONS: StationDef[]`, `CONTACT_EMAILS: string[]`, `SOCIALS: {name: string; href: string}[]`, `SITE = {name: 'ZYNIQ Studio', tagline, hq: 'Dubai, UAE'}`.

- [ ] **Step 1:** Rewrite `src/index.css`: new Google Fonts import, `@theme` mapping the seven colours to `--paper` … `--red` variables and the three fonts, `:root` (dark values) and `:root.light` (light values), `html { scroll-behavior: smooth }`, `section[id] { scroll-margin-top: 5rem }`, `:focus-visible { outline: 2px solid var(--red); outline-offset: 2px }`, `.bp-grid`, `.bp-label`, scrollbar styling in the new tokens, and a `prefers-reduced-motion` block that sets `scroll-behavior: auto` and disables CSS animations.
- [ ] **Step 2:** `index.html`: title `ZYNIQ Studio | AI-Driven Software Factory`, add `<meta name="description">` using the footer tagline. `metadata.json`: name `ZYNIQ Studio - AI-Driven Software Factory`.
- [ ] **Step 3:** Move the data arrays out of the old components into `src/content/` with the types above. `STATS`: `{97,'%',0.97,'Task success rate',…}`, `{88,'%',0.88,'Logical Accuracy',…}`, `{3,'X',0.75,'Schema adaptation',…}` with notes verbatim. `SERVICES` drops the `icon` field. `STATIONS`: `output/01/Output`, `sectors/02/Sectors`, `services/03/Services`, `usecases/04/Use cases`, `consultation/05/Consultation`. `SOCIALS` and `CONTACT_EMAILS` copied from the current footer.
- [ ] **Step 4:** Delete the six old components. Reduce `App.tsx` to a shell: `<div className="min-h-screen bg-paper text-ink font-sans antialiased bp-grid"><main id="top" /></div>`.
- [ ] **Step 5:** Run `npm run lint && npm run build`. Expected: both pass with no errors.
- [ ] **Step 6:** Commit: `refactor: add blueprint tokens, extract content, remove old sections`.

### Task 2: Blueprint primitives, nav, footer, production line

**Files:**
- Create: `src/components/blueprint/Station.tsx`, `CornerMarks.tsx`, `Gauge.tsx`, `ProductionLine.tsx`; `src/sections/Nav.tsx`, `src/sections/TitleBlock.tsx`
- Modify: `src/App.tsx`, `src/components/ThemeToggle.tsx` (token class names only)

**Interfaces:**
- Consumes: `STATIONS`, `SITE`, `SOCIALS`, `CONTACT_EMAILS`, `Stat`.
- Produces:
  - `Station({id, number, label, title, intro?, children}: {id: string; number: string; label: string; title: string; intro?: string; children: React.ReactNode})`: renders `<section id={id}>` with a top rule, `STATION {number} / {label}` in `.bp-label`, an `h2` in display type, optional intro paragraph, then children. Content fades up once on entering view.
  - `CornerMarks()`: four absolutely positioned 12px L-shaped marks in `--ink`; parent must be `relative`.
  - `Gauge({value, suffix, fill}: Pick<Stat, 'value' | 'suffix' | 'fill'>)`: SVG 240° arc, track in `--rule`, red arc drawn to `fill`, number counting from 0 to `value` once when in view; static final state under reduced motion.
  - `ProductionLine({stations}: {stations: StationDef[]})`: at `lg+`, a fixed vertical rail at the left of the content column with a red fill bound to page scroll progress and one node per station that turns red once that station's top has passed the viewport middle; below `lg`, a fixed 2px red progress bar under the nav.
  - `Nav()`: sticky, `bg-paper/90` with backdrop blur and bottom rule. Logo icon + wordmark + "STUDIO" in display type linking to `#top`; anchors to the four content stations (labels Sectors, Services, Use cases, Consultation); `ThemeToggle`; "Start a build" anchor to `#consultation`; mobile menu button with `aria-expanded` that closes on link click.
  - `TitleBlock()`: `<footer>` as a bordered grid of cells: brand + tagline, quick links (no API Docs), contacts, socials as text links with `rel="noopener noreferrer"`, HQ, `© {year} ZYNIQ Studio. All rights reserved.`, Terms and Privacy placeholder anchors.

- [ ] **Step 1:** Build the four primitives as specified.
- [ ] **Step 2:** Build `Nav` and `TitleBlock`; update `ThemeToggle` classes to the new tokens.
- [ ] **Step 3:** In `App.tsx` render `Nav`, `ProductionLine`, `<main id="top">` containing one empty `Station` per `STATIONS` entry (temporary, so the line can be checked), then `TitleBlock`.
- [ ] **Step 4:** Run `npm run lint && npm run build`. Expected: pass.
- [ ] **Step 5:** `npm run dev`, open `http://localhost:3000`. Check: theme toggle flips paper/graphite and persists on reload; each nav link lands with the station heading fully visible below the nav; loading `/#services` directly does the same; the rail fills while scrolling and nodes turn red in order; at 375px the rail is a top progress bar and the mobile menu opens, navigates and closes.
- [ ] **Step 6:** Commit: `feat: add blueprint primitives, nav, title block and production line`.

### Task 3: Hero and parts strip

**Files:**
- Create: `src/sections/Hero.tsx`, `src/sections/PartsStrip.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `CornerMarks`, `BRANDS`.
- Produces: `Hero()`, `PartsStrip()`.

- [ ] **Step 1:** `Hero`: framed block with `CornerMarks` and a `SHEET 00 / DWG 001-A` label. Left: tag `AI-DRIVEN SOFTWARE FACTORY & INNOVATION LAB`, `h1` "The future is coded by us" in display type using `clamp()` so it fits 320px, the current subcopy verbatim, primary anchor "Start a build" → `#consultation` (red), secondary anchor "See the line" → `#sectors` (outlined). Right: `aria-hidden` SVG schematic of four labelled boxes (INTAKE, CREWS, CHECKS, SHIP) joined by a line, with small red squares travelling along it on a loop and one decorative dimension line. Stacks below `lg`.
- [ ] **Step 2:** `PartsStrip`: label `POWERED BY`; brand names as buttons in a CSS marquee (list duplicated, second copy `aria-hidden` and not focusable). Hover, focus or click on a part pauses the marquee and shows `{name}: {useCase}` in a line below; clicking the same part again or pressing Escape clears it. Under reduced motion the list wraps statically instead of scrolling.
- [ ] **Step 3:** Render both at the top of `<main>`. Run `npm run lint && npm run build`. Expected: pass.
- [ ] **Step 4:** Browser check at 1440 and 375, both themes: headline does not overflow at 320px; both hero buttons scroll to the right place; tapping a part (touch emulation) shows its use and tapping another replaces it; no horizontal page scroll caused by the marquee.
- [ ] **Step 5:** Commit: `feat: add hero schematic and parts strip`.

### Task 4: Output, sectors, manifesto

**Files:**
- Create: `src/sections/Output.tsx`, `src/sections/Sectors.tsx`, `src/sections/Manifesto.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Station`, `Gauge`, `CornerMarks`, `STATS`, `SECTORS`, `STATIONS`.
- Produces: `Output()`, `Sectors()`, `Manifesto()`.

- [ ] **Step 1:** `Output`: `Station` id `output`, title "Architecting Synthetic Brains", intro = the current paragraph verbatim. Three cells each with `Gauge`, the stat label in `.bp-label` and the note. An "Explore services" anchor to `#services`.
- [ ] **Step 2:** `Sectors`: `Station` id `sectors`, title "The Software Factory of the Next Era", intro verbatim. Bays as buttons (`aria-pressed`, `aria-controls="sector-detail"`) labelled `BAY 01`…`04` with title and description; grid 1 col → 2 cols at `sm` → 4 cols at `lg`; active bay has a red top edge. Detail panel `id="sector-detail"` shows `detailTitle`, `detailExplanation`, and a small static `aria-hidden` SVG per sector: cloud = three linked node clusters, core = central square with radiating lines, studio = drawing board with cursor, solutions = interlocking blocks. Default active: `cloud`. No scroll jump on select.
- [ ] **Step 3:** `Manifesto`: full-width band with the quote verbatim in display type, the two supporting lines beside it, and a rotated outlined "APPROVED / ZYNIQ STUDIO" stamp (`aria-hidden`).
- [ ] **Step 4:** Replace the temporary empty stations for `output` and `sectors`; insert `Manifesto` after `Sectors`. Run `npm run lint && npm run build`. Expected: pass.
- [ ] **Step 5:** Browser check: gauges count up once and do not replay on scroll back; each bay swaps the detail and schematic; keyboard Tab + Enter selects bays; with reduced motion emulated the gauges show final values immediately.
- [ ] **Step 6:** Commit: `feat: add output gauges, sector floor plan and manifesto`.

### Task 5: Services and use cases

**Files:**
- Create: `src/sections/Services.tsx`, `src/sections/UseCases.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Station`, `CornerMarks`, `SERVICES`, `USE_CASES`.
- Produces: `Services()`, `UseCases()`.

- [ ] **Step 1:** `Services`: `Station` id `services`, title "Services", intro = the current services paragraph verbatim. A spec sheet: header row `NO. / SERVICE / TYPE`; each row a button (`aria-expanded`, `aria-controls`) showing number, title (display type, allowed to wrap) and subtitle. Expanded region shows description, `DELIVERABLES` list and a "Request this" anchor to `#consultation`. One row open at a time; `SERVICES[0]` open by default; clicking the open row closes it. Height animates with `motion`.
- [ ] **Step 2:** `UseCases`: `Station` id `usecases`, title "Boosting Capabilities Beyond Limits", intro verbatim. Left: list of four buttons (`aria-pressed`) with category and title. Right: a "work order" ticket with `CornerMarks`, header `WORK ORDER {index+1}/04`, description, three metric cells, `GUIDELINES` list, `TOOLS` tags, and the sample logs in a mono readout (success lines marked with a red square). Default active: `USE_CASES[0].id`. Stacks below `lg`.
- [ ] **Step 3:** Replace the temporary stations. Run `npm run lint && npm run build`. Expected: pass.
- [ ] **Step 4:** Browser check at 1440 and 320: all ten rows open and close; long service titles wrap without overflow at 320px; all four use cases render their ticket; no horizontal scroll.
- [ ] **Step 5:** Commit: `feat: add services spec sheet and use case work orders`.

### Task 6: Consultation form

**Files:**
- Create: `src/sections/Consultation.tsx`, `src/lib/encodeForm.ts`
- Modify: `src/App.tsx`, `index.html`

**Interfaces:**
- Consumes: `Station`, `CornerMarks`, `CONTACT_EMAILS`.
- Produces: `encodeForm(data: Record<string, string>): string` (URL-encoded `key=value&…` body); `Consultation()`.

- [ ] **Step 1:** `index.html`: add a hidden static form so Netlify detects it at build: `<form name="consultation" netlify netlify-honeypot="bot-field" hidden>` with inputs named `firstName`, `lastName`, `email`, `bot-field` and a textarea named `message`.
- [ ] **Step 2:** `Consultation`: `Station` id `consultation`, title "Get Free Consultation", intro verbatim. Form `name="consultation"`, `method="POST"`, `data-netlify="true"`, `data-netlify-honeypot="bot-field"`, hidden `form-name` input, visually hidden `bot-field`. Fields with labels: First name (`required`, `autocomplete="given-name"`), Last name (`autocomplete="family-name"`), Email (`type="email"`, `required`, `autocomplete="email"`), Project brief (`textarea`, `required`). Plain placeholders ("Jane", "Doe", "you@company.com", "What do you want to build?"). Submit button "Send work order".
- [ ] **Step 3:** State machine `'idle' | 'sending' | 'sent' | 'error'`. On submit: `preventDefault`; return if already `sending`; `fetch('/', {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: encodeForm({...})})`; non-ok response or thrown error → `error`. `sending`: button disabled, label "Sending…". `sent`: form replaced by a confirmation block ("Work order received. We'll reply to {email}."). `error`: field values kept, `role="alert"` message "That didn't send. Please try again, or email contact@zyniq.solutions." with a `mailto:` link, button enabled again.
- [ ] **Step 4:** Replace the temporary station. Run `npm run lint && npm run build`. Expected: pass.
- [ ] **Step 5:** Browser check on `npm run dev` (not Netlify, so the POST is expected to fail): submitting empty shows native required validation; a valid submit shows "Sending…", then the error message with values intact and the button usable; with the network throttled, clicking the button twice sends one request (Network tab). Using devtools to override the response to 200 shows the confirmation.
- [ ] **Step 6:** Commit: `feat: add consultation work order form with Netlify Forms`.

### Task 7: Full-page verification

**Files:**
- Modify: whichever files the checks below show need fixing.

- [ ] **Step 1:** Run `npm run lint && npm run build`. Expected: pass, no warnings about missing exports.
- [ ] **Step 2:** `npm run preview`; walk the whole page at 1440, 1024, 768, 375 and 320 widths in light and dark. For each: no horizontal scroll, text contrast readable, every nav and footer link lands on a visible heading, production line/progress bar tracks scroll.
- [ ] **Step 3:** Keyboard-only pass: Tab reaches every control in visual order with a visible focus ring; Escape clears the parts strip.
- [ ] **Step 4:** Emulate `prefers-reduced-motion: reduce`: no marquee, no hero animation, gauges at final values, sections visible without entrance animation.
- [ ] **Step 5:** `grep -rn "Solutions" src index.html metadata.json`: the only matches are the "ZYNIQ Solutions" sector, the `zyniq.solutions` domain and social handles.
- [ ] **Step 6:** Fix anything found, re-run Step 1, commit: `fix: polish from full-page verification`.
