# ZYNIQ Studio landing page: Signed Drawing Set

Date: 2026-11-20
Builds on: `2026-10-08-zyniq-studio-factory-blueprint-design.md`

## Goal

Push the Factory Blueprint toward a premium, recognisable signature without
changing direction: the page reads as a set of engineering sheets, and each sheet
gets a red inspection stamp as the visitor passes it. That ties the visuals to
the brand story (agent crews build, human leads sign off before anything ships).

## Signature elements

- **Sheet block** (`Station.tsx`): every numbered section carries a small title
  block (sheet n / 06, rev, drawn by, checked by).
- **Inspection stamp** (`Stamp.tsx`): presses in once when it scrolls into view.
  Reduced motion shows it already in place.
- **Intro** (`Intro.tsx`): about 1.3s, once per session. The sheet frame draws in,
  the "Approved 00" stamp lands, and the sheet lifts away. A click, key, wheel or
  touch skips it, and it never plays with `prefers-reduced-motion`.
- **Crosshair** (`Crosshair.tsx`): cyan hairlines and an X/Y readout. Only shown
  for fine pointers at 1024px and up; it never takes pointer events and does not
  re-render React.

## Visual system changes

- `--cyan` annotation accent (light `#1D5F78`, dark `#6FB7CF`), used only for
  drafting notes and dimensions, never for actions. Red stays the only action colour.
- `.sheet-night` scope: a deeper second neutral for inverted bands (Portfolio,
  Manifesto). It redefines both the raw tokens and Tailwind's `--color-*` tokens
  so `bg-paper`, `text-ink` and the rest follow it.
- Paper grain on the light theme only (fixed SVG noise, 3.5% opacity).
- Display weights are explicit: `font-bold` (700) for section titles and
  `font-black` (900) for the hero, stats and stage numerals. Only 700/800/900
  are loaded.
- Section padding varies with `spacing="tight|normal|loose"` and background with
  `tone="paper|raised|night"`.

## Page order

Hero, Spec band (stats and stack, keeps `#output`), 01 The line (pinned
centerpiece), 02 Services, 03 Portfolio (night), 04 Sectors, 05 Use cases,
Manifesto (night), 06 Consultation, Title block footer.

Station lookups go through `station(id)` in `content/site.ts` instead of array
indexes, so the order can change without breaking sections.

## The line

On desktop, the section pins for one viewport plus 75svh per stage. Scroll
position selects the stage. A plan view inks the current housing, stamps passed
ones "PASSED" and fills the belt. Step buttons jump to each stage. On phones and
tablets, the stages stack as cards with no pinning.
