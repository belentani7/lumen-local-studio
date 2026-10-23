# PROJECT MASTER PROMPT — LUMEN LOCAL STUDIO

> Canonical repository: `belentani7/lumen-local-studio`. Identity: **Lumen Local Studio**, a private-first creative desktop-in-browser experience, distinct from Belentani Judas, NOIACORE LAB, and music-production systems.

## Verified implementation, not assumptions

React/TypeScript/Vite frontend `client/src/`; composition UI `client/src/pages/Home.tsx`, deterministic vector primitives in `client/src/lib/composition.ts`, stylesheet `client/src/index.css`; Express serves the production static bundle in `server/index.ts`. There are no demonstrated live image/video/audio generation backends. The original UI contained missing remote hero assets, pretend recent creations and simulated "generation" timers. Brand, concept and high-end editorial feel must be preserved while all claims become testable.

## Maximum coherent product destination

1. Real self-contained offline visual creation with responsive, accessible canvas, deterministic vector compositions and export in the true chosen aspect ratio.
2. Safe user-directed file operations: explicit upload/preview/export, bounded file sizes, unsupported type rejection, object URL cleanup and transparent handling of images that are not included in SVG export.
3. Genuine creative library: local IndexedDB projects, versioned drafts, import/export and human-readable provenance. Never label sample templates as real saved projects.
4. Real image editing (crop/rotate/adjust), vector layers and undo/redo through user-controlled in-browser algorithms before claiming "AI editing".
5. Optional image/video/audio providers only when technically implemented, permissioned, cost-bounded, explicit about remote processing, and accompanied by real output acceptance tests; no automatic paid calls.
6. Reliability: correct PNG/SVG dimensions, XML escape, visual consistency, responsive phone previews, keyboard access, reduced motion, performance, source-media rights and secure CSP.
7. Privacy/security: no debug collector or session replay without explicit opt-in; audit any runtime proxy before production; never send private prompts to a provider unexpectedly.
8. Release gates: `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm test`, `pnpm build`; inspect compiled static assets, browser upload/export round-trip and real checked CI.

## Construction phases

- **P1 Functional baseline:** replace dead external hero with locally generated art; make generation create actual repeatable variations; SVG exporter matches aspect and escapes user text; file upload validation and cleanup; tests.
- **P2 Local workspace:** save and revisit compositions, consented persistent drafts, edit/toggle layers, import/export projects.
- **P3 Media engine:** raster rendering/canvas effects, image transforms and quality control; maintain UI continuity and responsive accessibility.
- **P4 Integrations:** optional external providers with explicit model naming, budgets, security/PII guards, rights and failure fallback, no misleading sample results.
- **P5 Production verification:** isolated scripts, typecheck, tests, build, security/a11y/mobile and live health.

## Operating prompt

Inspect the actual branch, past PRs, source assets and tests first. Build meaningful features and their regression tests in existing project only. Keep users in control of cost, credentials, data and exports. Distinguish proofs from static demos; write a branch and draft PR, do not merge, publish, generate paid assets or create other repositories without authorization. Report progress to `belentani7/workflow-orchestrator` issue #2 under #308.

## 2026-10-23 checkpoint

Branch `factory/308-real-offline-vector-compositions-20261023`: actual deterministic palette compositions, strict XML-safe SVG exporter matching 4 ratios, bounded JPG/PNG/WebP preview, object URL cleanup, no remote demo image dependency; Vite session debug collection disabled by default; Vitest suite added. Tests, live browser, production build and CI not yet verified.
