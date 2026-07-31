# TODO

Shared to-do list for this repo. Items are removed once complete, but only after confirming with Joel or Alyssa first.

- [ ] Update CLAUDE.md to direct commits to the develop branch vs. the feature branch we are currently using once the migration is complete.
  - Decision: "complete" means all the other items on this list are done, not just merging the current branch.
- [ ] Add support for custom domain (alyssaberger.org and www.alyssaberger.org)
  - Context: the old Hugo site already served both the apex and `www` via a `static/CNAME` file (GitHub Pages custom domain) with `baseURL: https://alyssaberger.org` in `hugo.yaml`. The Astro site has neither yet — `astro.config.mjs` still has `site: 'https://accessible-astro-starter.incluud.dev'` (the starter's default), there's no `CNAME` in `public/`, and the only workflow in `.github/workflows/` is the starter's own release-prep automation, not a Pages deploy step.
  - Decision: keep GitHub Pages + alyssaberger.org. Set this up with the GitHub Action that ships with the Astro template (Astro's official GitHub Pages deploy action), not a hand-rolled workflow — needs a `public/CNAME` file, `astro.config.mjs` `site` updated to `https://alyssaberger.org`, and the deploy workflow added under `.github/workflows/`.
- [ ] Add support for Alyssa's resume
  - Context: the old site exposed a resume as a plain PDF download from the nav (`static/files/Alyssa-Berger-Resume.pdf`, linked via a `customMenus` entry), not a full on-site resume/CV page.
  - Decision: build both — an on-site resume/CV page as the primary presentation, plus a PDF download alongside it. Alyssa will provide a fresh copy of the PDF rather than reusing the one in `main`'s `static/files/`.
- [ ] Source content from Alyssa's resume and current production website.
  - Context: found on the `main` branch under `data/en/`. Real, usable content exists for: `author.yaml` (name/contact/summary), `sections/about.yaml`, `sections/experiences.yaml` (OCLC, Purdue Residences, ...), `sections/education.yaml`, `sections/projects.yaml` (7 real projects, e.g. Azure Health Models, Eclipta), and `sections/publications.yaml`.
  - The 7 placeholder MDX files currently in `src/content/projects/` (project-01.mdx etc.) are still starter demo content (author "John Doe") — none of the real project data has been ported over yet.
  - Decision: skip Skills, Accomplishments, and Achievements — those sections held generic Toha-template placeholder data (Kubernetes/Docker skills, "Best Presenter 2020 XYZ conference," etc.), not real content, and were already disabled (`enable: false`) on the old site. Revisit only if Alyssa has real content for them later.
- [ ] Remove unnecessary sections
  - Context: `src/pages/index.astro` still carries several sections that promote the Accessible Astro starter itself rather than Alyssa: the "Features" grid (Accessible by default, Dark mode, Tailwind 4.0, ESLint, etc.), two `ContentMedia` blocks ("Accessible components", "WCAG 2.2 AA compliant"), the FAQ accordion (generic WCAG/ARIA questions), the "Our community" avatar grid (fake team members), and the "Impact in numbers" counters (GitHub stars/commits for the starter repo).
- [ ] Update footer
  - Context: `Footer.astro` is still the starter's footer: an unrelated "Features" link list, an "Incluud projects" link list, a "Developer tools" link list, and a copyright/credit line crediting Astro and Mark Teekman/Incluud. `theme.config.ts` `socials` also still points at Incluud's GitHub, Bluesky, and Open Collective rather than Alyssa's own.
  - Ideas (not decided yet):
    - Swap the "Features" column for real site nav (Home, Portfolio, Blog, Resume, Contact).
    - Swap "Incluud projects" for Alyssa's own social/professional links (LinkedIn, GitHub, email, resume PDF), sourced from `theme.config.ts` `socials` once that's updated.
    - "Developer tools" could either be dropped, or repurposed as an "Accessibility tools I use" list, which fits her UX/a11y focus better than deleting it outright.
    - The VoiceOver/Narrator screen reader tip is genuinely useful and on-brand for an accessibility-focused portfolio, worth keeping.
    - The "Cute astronaut image by ... Unsplash" credit is already orphaned, that image was removed from the hero when we added the resume snapshot card, so this line has nothing left to credit.
    - Bottom credit line could become "© {year} Alyssa Berger", with an open question on whether to keep a "built with Accessible Astro Starter" attribution or drop it entirely.
- [ ] Update hero section (to the left of the current role) to better reflect Alyssa
  - Context: `Hero.astro`'s left column still has the starter's placeholder H1 ("Accessible Starter for Astro") and CTA buttons ("Star on GitHub", "Read the docs"). The right column now shows the resume snapshot card (current role + "View full resume" link).