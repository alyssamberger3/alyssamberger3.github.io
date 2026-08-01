# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is **Accessible Astro Starter**, an SEO- and accessibility-focused Astro 6 starter theme (WCAG 2.2 AA / EAA compliant). It ships as both a standalone static site (this repo's root) and a scaffolding CLI (`packages/create-accessible-astro-starter`) that generates new projects from it. It is an npm workspaces monorepo: the root `package.json` declares `workspaces: ["packages/*"]`.

### What this repo actually is

This is the personal website of **Alyssa Berger**, a Senior at Purdue University majoring in UX Design with a focus on accessibility. The site is being migrated from a Hugo template to this Accessible Astro starter, chosen specifically because accessibility is central to Alyssa's work and identity. Beyond the migration, the starter needs real modifications to support **resume** and **portfolio** sections/pages tailored to her — this isn't just a theme swap, it's an active build-out on top of the migration.

## Commands

Run from the repo root unless noted.

```bash
npm install          # install deps
npm run dev           # astro dev server at localhost:4321
npm run build         # production build to ./dist/
npm run preview       # preview the production build
npx eslint .           # lint (accessibility rules are strict — jsx-a11y)
npx prettier --write .  # format
npx tsc --noEmit        # typecheck
```

CLI package (`packages/create-accessible-astro-starter`), run from repo root via workspace scripts:

```bash
npm run build:cli        # tsc build of the CLI
npm run create:local      # scaffold a project locally from the CLI, without publishing
npm run test:cli           # npm --workspace create-accessible-astro-starter run test (builds, then node --test on dist-test)
npm run test:cli:e2e        # end-to-end scaffold test
```

To run a single CLI test, build it first (`npm run build:cli && npm --workspace create-accessible-astro-starter run build:test`), then run `node --test dist-test/test/<file>.test.js` directly from `packages/create-accessible-astro-starter`.

No test suite exists for the Astro site itself (root package) — verification is via `npm run build` succeeding and `npx eslint .` passing.

## Architecture

### Content source: portfolio

**Portfolio (`src/content/projects/*.mdx`)** is a real Astro **content collection**, defined in `src/content.config.ts` with a `glob` loader and a Zod schema (`title`, `author`, `description`, `tags`). Pages `src/pages/portfolio/[...page].astro`, `[project].astro`, and `tag/[tag]/[...page].astro` query it with `getCollection()`.

The starter's demo blog (JSONPlaceholder-backed, not a content collection) and other starter-template demo pages (accessible-components, accessible-launcher, color-contrast-checker, markdown/MDX examples, accessibility statement, HTML sitemap) have been removed from this site — only the portfolio content source remains.

### Theme configuration is the single source of site identity

`theme.config.ts` (aliased as `@theme-config`) is a typed config — validated/defaulted by `src/utils/defineThemeConfig.ts` — that drives: site name/SEO defaults, brand colors (injected as CSS custom properties in `DefaultLayout.astro` via `define:vars`, then consumed by the OKLCH-based palette in `src/assets/scss`), the primary navigation, and the social links in the footer. Change site branding/nav here, not by hardcoding in components. The starter's Cmd/Ctrl+K command launcher (`accessible-astro-launcher`) has been removed from this site.

### Layouts

- `DefaultLayout.astro` — used by nearly every page; wires up global CSS, `astro-seo`'s `<SEO>` component (title templating, OpenGraph/Twitter cards derived from `theme.config.ts` + per-page props), `ClientRouter` (View Transitions), and the persistent `Header`/`Footer`.
- `MarkdownLayout.astro` — wraps `.md`/`.mdx` pages (e.g. `markdown-page.md`, `mdx-page.mdx`, `accessibility-statement.mdx`, project MDX content).

### Path aliases

Defined in both `astro.config.mjs` (Vite `resolve.alias`, for runtime) and `tsconfig.json` (for the TS language server) — keep them in sync if adding one. Available: `@components`, `@layouts`, `@assets`, `@content`, `@pages`, `@public`, `@post-images` (→ `public/posts`), `@project-images` (→ `public/projects`), `@utils`, `@theme-config`.

### Workspace/symlink dev mode

`scripts/workspace-config.js` (`enhanceConfigForWorkspace`, called from `astro.config.mjs`) auto-detects if `accessible-astro-components` or `accessible-astro-launcher` are `npm link`-ed into `node_modules` and, if so, patches the Vite config (`preserveSymlinks`, `server.fs.allow`, `ssr.noExternal`) and adds a watcher that triggers a full reload when the linked package's `.astro`/`.css` files change. This only matters when developing those component libraries alongside this starter — irrelevant for normal consumers, and stripped out entirely from CLI-generated projects.

### The scaffolding CLI (`packages/create-accessible-astro-starter`)

Invoked as `npm create accessible-astro-starter@latest`. Prompts (via `@clack/prompts`) for project directory, site name, and a **preset** (`full`, `blog`, `portfolio`, `minimal`, `barebones`), then uses `giget` to fetch/scaffold. Generated projects always strip contributor-only tooling (`scripts/workspace-config.js`) and simplify `astro.config.mjs` accordingly — when editing that script or `astro.config.mjs`, consider whether the change needs to be mirrored in the CLI's generation logic.

## Styling

- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (no separate `tailwind.config.js` — v4 is CSS-first; see `src/styles/tailwind.css`).
- **SCSS** utilities/base styles live in `src/assets/scss/` (`base/_root.scss`, `_general.scss`, `_mixins.scss`, etc.) and are imported globally in `DefaultLayout.astro`.
- Colors use an **OKLCH-based system**: brand primary/secondary/neutral/outline are set once in `theme.config.ts` and the rest of the palette is derived automatically.
- Prefer logical CSS properties (`inline-start` over `left`, etc.) — this is an explicit accessibility/i18n convention in this codebase.

## Accessibility conventions (enforced, not optional)

This repo is the reference implementation for the Accessible Astro ecosystem — accessibility regressions are treated as bugs, not style nits.

- `eslint-plugin-jsx-a11y` runs in **strict** mode (`eslint.config.js`) for `.astro`/`.jsx`/`.tsx` files — run `npx eslint .` before considering UI work done.
- Never remove a focus outline without providing an equally visible accessible alternative.
- Respect `prefers-reduced-motion` for any new animation/transition.
- Maintain correct heading hierarchy (h1–h6) and use native semantic elements before reaching for ARIA.
- Forms should follow the existing pattern in `contact.astro` / the `Form`/`Input`/`Textarea`/`Checkbox`/`Radio`/`Fieldset` components (from `accessible-astro-components`): proper `<label>` association, input types, and screen-reader-friendly error handling.

## Commit / PR conventions

- Conventional Commits: `type(scope): subject` (types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`; this project also uses `a11y(scope): ...` for accessibility-specific fixes).
- PR titles are prefixed `[starter] Brief description`.
- Before opening a PR: `npm run build` must succeed, `npx eslint .` must be clean, and keyboard/screen-reader behavior should be spot-checked for any UI change.

## My Preferences
- Writing style
   - Don't use em dashes in any written copy (site content, commit messages, etc.). Use a comma, period, or restructure the sentence instead.
   - End every response to me with "Big day!" (e.g. "I've written the code for you. Let me know if you need anything else. Big day!")
- Version Control
   - Only commit to the repo when asked.
   - Work from the astro-migration branch. Check it out if not active before committing.
   - Do not merge to main from develop unless instructed to do so.
   - When committing, include untracked files.
   - When committing, if there are unstaged changes predating your session, please include them.
   - When committing, you should not push to origin until I tell you to.
- I will run the dev server myself in a separate session with npm run dev. You don't have to start it up yourself.
- I store our shared to-do list in TODO.md. Please create it if it doesn't exist already. When you finish a to-do, ask me to confirm it's done, then delete it from the file. Don't append status updates or progress notes to items in TODO.md instead of asking.
- I don't always leave Google Chrome running. So feel free to check if it is running before launching your /claude-in-chrome skill.
