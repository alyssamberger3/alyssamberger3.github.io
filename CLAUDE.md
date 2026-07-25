# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Alyssa Berger's portfolio site (alyssaberger.org), built with Hugo using the [hugo-toha/toha v4](https://github.com/hugo-toha/toha) theme, imported as a Hugo Module (not vendored). Almost all page content and layout comes from the theme; this repo supplies data (YAML), content (Markdown), images, and a handful of overrides in `layouts/`.

## Commands

```bash
hugo mod tidy && hugo mod npm pack && npm install   # sync theme's Hugo module + npm deps (run after pulling changes that touch go.mod/hugo.yaml)
hugo server                                         # local dev server with live reload
hugo --minify                                       # production build -> ./public
```

There is no test suite, linter invocation, or CI step beyond building the site. `.github/workflows/pull-request.yml` runs `hugo --minify` on every PR, then a Lighthouse check and a markdown link checker (`lychee`) against the Netlify deploy preview. There is no single-test/single-page equivalent — build the whole site and check the relevant page in the browser or in `public/`.

`eslint` and `prettier` (with `prettier-plugin-go-template`) are devDependencies but there's no configured npm script for them in `package.json` — invoke via `npx eslint ...` / `npx prettier ...` directly if needed.

## Architecture

**Theme is a Hugo Module.** `hugo.yaml` imports `github.com/hugo-toha/toha/v4` plus icon vendor modules. Theme templates, partials, shortcodes, and default styling live outside this repo (in the Hugo module cache) — read the theme's own source (or its docs) to understand what a partial/shortcode expects, since it won't be found by grepping this repo.

**Data-driven content, not hand-authored HTML.** Most homepage sections (About, Experiences, Education, Skills, Achievements, Accomplishments, Projects, Publications, Recent/Featured Posts) are populated entirely from YAML under `data/<lang>/sections/*.yaml`, keyed by section name and rendered by the theme's partials. To add/edit a résumé entry, project, or skill, edit the corresponding YAML file — don't hunt for a template. `data/<lang>/site.yaml` holds sitewide copy (copyright, meta description, custom navbar menu items), `data/<lang>/author.yaml` holds author/profile info.

**Multilingual structure exists but Bengali is disabled.** Every content and data file has an `en` and `bn` counterpart (`index.md` / `index.bn.md`, `sections/about.yaml` under both `data/en/` and `data/bn/`). `hugo.yaml` sets `languages.bn.disabled: true`, so in practice only the `en` tree needs updating for this site — but keep the pairing in mind if the theme's language switcher is ever re-enabled.

**Blog is disabled; portfolio is the main content type.** `hugo.yaml` → `params.features.blog.enable: false` and `params.features.portfolio.enable: true`. Case-study "posts" under `content/posts/<slug>/index.md` (each with a `_index.bn.md` and image assets alongside) are used for the portfolio detail pages, referenced from `data/en/sections/projects.yaml`/`featured-posts.yaml`/`recent-posts.yaml` by slug. `content/notes/` (Bash/Go notes) exists as theme example content but `params.features.notes.enable: false`, so it isn't built into navigation.

**Local overrides live in `layouts/`.** This project overrides only a small subset of the theme: `layouts/_default/single.html`, `layouts/partials/footer.html`, `layouts/partials/cards/{post,project}.html`, `layouts/partials/sections/{about,experiences}.html`, and shortcodes `quotes.html` / `split-icons.html` / `textbox.html`. When a page looks wrong, check here first before assuming it's a theme bug — a local override may be shadowing the theme's version. `assets/scripts/pages/single.js` and `assets/styles/variables.scss` are similarly local overrides of theme asset pipeline hooks.

**Feature flags live in `hugo.yaml` under `params.features`.** Comments/analytics/support/newsletter/etc. are all toggled here with a `services:` sub-block selecting the provider (e.g., analytics uses `counterDev` + `goatCounter`, not Google Analytics). Check this block before assuming a theme feature is unavailable — it's likely just disabled.

**`package.hugo.json` vs `package.json`:** `hugo mod npm pack` regenerates the npm dependency list from the Hugo module tree (theme + vendored assets) into `package.hugo.json`; the actual installed devDependencies are declared in `package.json`. Both need to be roughly in sync — if you add a new asset dependency via the theme, re-run `hugo mod npm pack` rather than hand-editing both files.

## Deployment

Three independent, redundant deploy paths exist — be aware changes may need to work across all of them:
- **Netlify** (`netlify.toml`): builds via `hugo --gc --minify` on push; deploy previews run `hugo mod tidy && hugo mod npm pack && npm install && hugo ...`.
- **GitHub Actions** (`.github/workflows/merge-to-main.yml`): on push to `main`, builds with Hugo + Node and publishes `public/` to the `gh-pages` branch.
- **GitLab CI** (`.gitlab-ci.yml`): mirrors the same `hugo mod tidy && hugo mod npm pack && npm install` + `hugo` build.

`.github/workflows/theme-update.yml` runs nightly, updates the Hugo module (theme) to latest via `hugo mod get -u`, and opens an automerge PR — `.github/.kodiak.toml` auto-approves/merges PRs from `dependabot` and squash-merges with branch deletion.
