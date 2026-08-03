# TODO

Shared to-do list for this repo. Items are removed once complete, but only after confirming with Joel or Alyssa first.

- [ ] Review AI-written summary text in each section of the homepage
  - Decision: this is a personal reminder for Joel/Alyssa to review themselves, not a coding task.
- [ ] Deepen individual project pages beyond the current condensed summaries
  - Context: the 6 real project MDX files ported in above are intentionally condensed (role/timeline/overview/a couple of narrative sections + 1-2 images), not a full port of the old Hugo case studies, which each had ~150 lines of shortcodes and 5-10 images (stakeholder breakdowns, process galleries, next-steps/limitations grids, multiple self-reflection entries).
  - Decision (deferred): revisit each project page and decide whether/how much of that deeper gallery content to add, converting Hugo shortcodes (`{{< split >}}`, `{{< textbox >}}`, `{{< split-icons >}}`, `{{< quotes >}}`) to MDX/Astro equivalents.
- [ ] Add support for custom domain (alyssaberger.org and www.alyssaberger.org)
  - Context: the old Hugo site already served both the apex and `www` via a `static/CNAME` file (GitHub Pages custom domain) with `baseURL: https://alyssaberger.org` in `hugo.yaml`. The Astro site has neither yet — `astro.config.mjs` still has `site: 'https://accessible-astro-starter.incluud.dev'` (the starter's default), there's no `CNAME` in `public/`, and the only workflow in `.github/workflows/` is the starter's own release-prep automation, not a Pages deploy step.
  - Decision: keep GitHub Pages + alyssaberger.org. Set this up with the GitHub Action that ships with the Astro template (Astro's official GitHub Pages deploy action), not a hand-rolled workflow — needs a `public/CNAME` file, `astro.config.mjs` `site` updated to `https://alyssaberger.org`, and the deploy workflow added under `.github/workflows/`.
- [ ] Add support for GoatCounter analytics
- [ ] Update the LinkedIn icon, choosing from https://icon-sets.iconify.design/?query=Linkedin

## Final Cleanup
- [ ] Once the site is complete, delete the gh-pages branch
- [ ] Once the site is complete, have Alyssa audit the site for accessibility.
- [ ] Update CLAUDE.md to direct commits to the develop branch vs. the feature branch we are currently using once the migration is complete.
