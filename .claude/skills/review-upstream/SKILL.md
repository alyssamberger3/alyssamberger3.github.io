---
name: review-upstream
description: Review new commits on the upstream incluud/accessible-astro-starter repo since the last sync, propose which are worth porting into this site, and implement the ones the user approves. Use when the user asks to check upstream, sync with the starter template, see what's new on accessible-astro-starter, or pull in updates from incluud/accessible-astro-starter.
user-invocable: true
---

# /review-upstream — review and port changes from the upstream starter

This site started as a scaffold of `incluud/accessible-astro-starter` (see
`package.json`'s `repository` field) at `v5.2.5`, and has since diverged:
Hugo-to-Astro migration cleanup, a real portfolio content collection,
resume/portfolio pages, and removal of starter demo content (blog,
accessible-components/launcher/color-contrast-checker demos, MDX examples,
HTML sitemap) per `CLAUDE.md`. The upstream starter still ships useful fixes,
a11y improvements, and features. This skill finds what's new since the last
sync, filters it down to things actually worth having *given how far this
fork has diverged*, proposes them to the user, and ports the approved ones,
adapted to this repo's current structure rather than blindly cherry-picked.

This repo is also the source for the `packages/create-accessible-astro-starter`
CLI, which scaffolds new projects from this same starter lineage. When an
upstream change touches something the CLI's generation logic mirrors or
depends on (`astro.config.mjs`, `scripts/workspace-config.js`, the preset
file sets under `packages/create-accessible-astro-starter`), flag that
explicitly, since it may need porting in two places, not just the root site.

State from the last run lives in `.claude/skills/review-upstream/state.json`
(checked into git, so it persists across machines).

## Steps

1. **Get oriented.** In parallel: read `.claude/skills/review-upstream/state.json`
   for the `last_synced_sha` and `branch`, and run `git remote -v` to confirm
   the `upstream` remote exists (pointing at
   `https://github.com/incluud/accessible-astro-starter.git`, push disabled).
   If the remote is missing, add it and disable push:
   `git remote add upstream <url> && git remote set-url --push upstream no_push`.

2. **Fetch.** `git fetch upstream`.

3. **Diff the range.** `git log <last_synced_sha>..upstream/<branch> --oneline`
   to list what's new. If there's nothing new, tell the user the fork is
   already caught up (referencing the last synced SHA and date) and stop,
   don't re-review the same range twice.

4. **Review each new commit.** For each one, `git show` it (or `git diff
   <last_synced_sha> upstream/<branch> -- <touched paths>` for a combined
   view across a series of related commits) to understand the actual change,
   not just the message. Skip anything upstream marked as a merge commit with
   no unique content of its own, and skip routine dependency bumps unless
   they fix a real bug or vulnerability (those are better handled as a normal
   `npm update`, not a manual port).

5. **Filter for what's actually worth porting.** Judge each candidate change
   against this fork's current state, not upstream's:
   - Bug fixes, accessibility improvements, and small robustness fixes are
     usually worth it regardless of how far content has diverged.
   - Changes to demo/starter-only content this site has already removed
     (blog, accessible-components/launcher/color-contrast-checker demos,
     markdown/MDX example pages, HTML sitemap, accessibility statement demo
     copy) are not relevant here, skip them.
   - Changes to files this site still owns and actively uses (`DefaultLayout.astro`,
     `theme.config.ts` and `defineThemeConfig.ts`, the SCSS/OKLCH color
     system, path aliases, the portfolio content collection wiring in
     `content.config.ts`) need to be checked against this repo's current
     version of those files before deciding they're portable as-is, since
     they may have been customized here.
   - Changes under upstream's CLI-equivalent scaffolding logic, or to
     `astro.config.mjs`/`scripts/workspace-config.js`, should be checked
     against `packages/create-accessible-astro-starter`'s generation logic
     too, per `CLAUDE.md`'s note that the two need to be kept in sync.
   - When in doubt about whether something is a fit, lean toward including it
     in the proposal and let the user decide rather than silently dropping it.

6. **Propose, don't implement yet.** Present the filtered list to the user:
   one or two lines per item (what it is, why it's worth having or notable,
   and whether it touches the root site, the CLI package, or both), grouped
   by rough theme if there are several (a11y, bug fixes, features). Ask which
   ones to bring in, don't assume "all of them" or "none of them." Use
   AskUserQuestion if a compact multiple-choice framing fits; otherwise plain
   text is fine for an open-ended list.

7. **Implement the approved changes.** Adapt each one to this repo's current
   files rather than pasting upstream's diff verbatim, this fork's content
   model, theming, and removed-demo-page state have moved on from upstream's.
   Follow this repo's own conventions (see `CLAUDE.md`): Conventional Commits
   style, logical CSS properties, strict `jsx-a11y` compliance, no em dashes
   in any written copy. Run `npx eslint .` and `npm run build` after porting
   UI-touching changes, per `CLAUDE.md`'s pre-PR checklist.

8. **Update the sync marker.** Once the user is satisfied with what's been
   ported (whether that's everything proposed or a subset), rewrite
   `.claude/skills/review-upstream/state.json` with the new `last_synced_sha`
   (the current `upstream/<branch>` tip from step 2) and today's date. Do
   this even if the user declined every proposed change, it means "already
   reviewed," not "already ported," so the same commits aren't re-proposed
   next time. Mention in the commit/summary which upstream commits were
   reviewed but declined, so that decision isn't silently lost.

9. **Commit, if asked.** This repo's rule is commit only when the user asks
   (see `CLAUDE.md`), don't commit automatically just because this skill ran.
   Work from the `develop` branch (check it out first if it isn't active) and
   don't push to origin until told to. If/when committing, use a Conventional
   Commits message (e.g. `feat(a11y): ...` or `fix(...): ...`, following the
   style of the earlier manual upstream port in `4241f38`), ending with
   `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`, no em dashes.
   Commit the updated `state.json` alongside the ported changes.

## Notes

- This is a review-and-propose skill, not an auto-merge. Never run
  `git merge upstream/<branch>`, the two repos have diverged too far
  (different content model, removed demo pages, custom theming) for that to
  make sense; everything goes through the manual adapt-and-port process
  above.
- If the user wants to see the raw diff for something before deciding,
  `git diff <last_synced_sha> upstream/<branch> -- <path>` or `git show <sha>`
  is fine to run and show them directly.
