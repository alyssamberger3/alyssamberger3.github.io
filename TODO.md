# TODO

Shared to-do list for this repo. Items are removed once complete, but only after confirming with Joel or Alyssa first.

- [ ] Consider making the text and icon match the color of the border for both projects and publications. Right now, they are all green, regardless of border color.
- [ ] Create a little extra space in the current job box between Currently and her job title.
- [ ] Consider icons for work and education positions?
  - Decision: means actual organization logos (OCLC, Purdue), not generic icons. Note: these logo files are not currently in this repo (astro-migration branch) — they exist on the `main` branch at `assets/images/sections/experiences/OCLC.png` and `assets/images/sections/education/Purdue.png` (plus a `Purdue-Dark.png` dark-mode variant) and will need to be copied over when this work happens. Tied to the resume redesign decision above.
- [ ] Consider removing Resume section header and top nav link and replacing with dedicated sections for Experience and Education
  - Note: TBD, not being worked on yet, tied to the resume redesign decision above.
- [ ] Make the skill pill text a little bigger
- [ ] Consider rounding the corners a bit more of the skill pills
- [ ] Remove the dedicated Projects/Portfolio page since all projects fit on the home page
  - Decision: keep individual project detail pages (`/portfolio/[project]`), since homepage cards link to them. Remove the `/portfolio` index/listing page and tag pages. Individual project pages currently have no back-navigation link at all, so one will need to be added (pointing back to the homepage Projects section) once the listing page is gone.
- [ ] Review AI-written summary text in each section of the homepage
  - Decision: this is a personal reminder for Joel/Alyssa to review themselves, not a coding task.
- [ ] Deepen individual project pages beyond the current condensed summaries
  - Context: the 6 real project MDX files ported in above are intentionally condensed (role/timeline/overview/a couple of narrative sections + 1-2 images), not a full port of the old Hugo case studies, which each had ~150 lines of shortcodes and 5-10 images (stakeholder breakdowns, process galleries, next-steps/limitations grids, multiple self-reflection entries).
  - Decision (deferred): revisit each project page and decide whether/how much of that deeper gallery content to add, converting Hugo shortcodes (`{{< split >}}`, `{{< textbox >}}`, `{{< split-icons >}}`, `{{< quotes >}}`) to MDX/Astro equivalents.
- [ ] Add support for custom domain (alyssaberger.org and www.alyssaberger.org)
  - Context: the old Hugo site already served both the apex and `www` via a `static/CNAME` file (GitHub Pages custom domain) with `baseURL: https://alyssaberger.org` in `hugo.yaml`. The Astro site has neither yet — `astro.config.mjs` still has `site: 'https://accessible-astro-starter.incluud.dev'` (the starter's default), there's no `CNAME` in `public/`, and the only workflow in `.github/workflows/` is the starter's own release-prep automation, not a Pages deploy step.
  - Decision: keep GitHub Pages + alyssaberger.org. Set this up with the GitHub Action that ships with the Astro template (Astro's official GitHub Pages deploy action), not a hand-rolled workflow — needs a `public/CNAME` file, `astro.config.mjs` `site` updated to `https://alyssaberger.org`, and the deploy workflow added under `.github/workflows/`.
- [ ] Do we need to make an OpenGraph card for sharing?
  - Decision: yes, build one. Exact image/copy details still to be worked out later.
- [ ] Add support for GoatCounter analytics

## Final Cleanup
- [ ] Once the site is complete, delete the gh-pages branch
- [ ] Once the site is complete, have Alyssa audit the site for accessibility.
- [ ] Update CLAUDE.md to direct commits to the develop branch vs. the feature branch we are currently using once the migration is complete.
