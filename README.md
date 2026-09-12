# albanycert.org

The website for Albany CERT (Community Emergency Response Team), a 501(c)(3) nonprofit
(EIN 86-2658175) supporting emergency preparedness in Albany, California, in partnership
with the Albany Fire Department.

Built with [Astro](https://astro.build/) (content collections + Zod schema validation) and
edited by volunteers through [Pages CMS](https://pagescms.org/), deployed on Cloudflare
Pages. See the vault note
[[Albany CERT Website — Pages CMS Migration]] and
[[Albany CERT Website — Agent-Operable Design (CC, 2026-09-11)]] for the full plan and
guardrails this scaffold follows.

## Run locally

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the built site locally
```

Requires Node.js 22+.

## Content model

```
src/content/
  pages/           # home, about, block-captains, radio-club, donate, contact
  training/        # one entry per training offering (e.g. fall-2026.md)
  announcements/   # short dated posts, optionally pinned
  meetings/        # community meeting entries
  gallery/         # media-first: one entry per event/training/meeting photo album
public/images/gallery/   # gallery photos, referenced by the gallery collection
```

Every collection is schema-validated (`src/content.config.ts`, Zod) — a malformed date or
missing field fails `npm run build` (and the CI check) instead of shipping silently broken.

## How publishing works

1. Make a change on a branch (by hand, or an agent working a scoped task).
2. Open a pull request. GitHub Actions runs `npm run build` — it must pass before merging.
3. Once Cloudflare Pages is connected (see the checklist below), every PR gets its own
   preview URL. Look at the preview before merging.
4. Merge to `main` → Cloudflare Pages builds and deploys production automatically.

Nothing reaches production without a PR + a human look at the preview and merge — no
"agent commits straight to main" path exists in this design.

## How a volunteer edits content (once Pages CMS is connected)

A non-technical volunteer can be invited to Pages CMS by email — no GitHub account
needed. They get a web editor (`.pages.yml` defines the field layout for every
collection above) and can edit text, dates, and upload photos directly. Their saves write
straight to the repository; **this interacts with branch protection in ways that need a
hands-on check before this is relied on for gated agent workflows** — see the "open
question" in [[Albany CERT Website — Agent-Operable Design (CC, 2026-09-11)]] §2 and §6.

If Pages CMS is ever unavailable, the floor is: anyone with repo access can edit a
Markdown file directly in GitHub's own web editor and merge it. That floor requires no
extra tooling and should be rehearsed once with a second human.

## NOT DONE YET

This scaffold is PR-only — nothing below has been done, and none of it should be done
without Raymond's explicit go:

- [ ] Connect this repo to Cloudflare Pages (production + preview deployments)
- [ ] Connect Pages CMS to this repo (GitHub App install + OAuth — Raymond's own click)
- [ ] Turn on branch protection on `main` (require PR + required status check) —
      run the Pages CMS coexistence spike (§6 of the agent-operable design note) first
- [ ] DNS cutover: point the real `albanycert.org` at Cloudflare Pages (currently sits in
      Raymond's personal Cloudflare account — see [[Albany CERT Compliance Calendar]])
- [ ] Apply for GitHub's nonprofit plan for the `albanycert` org
- [ ] Re-check the Fall 2026 registration Google Form URL and swap it in for the
      `mailto:` placeholder currently in `src/content/training/fall-2026.md`
- [ ] Replace every placeholder image (`public/images/gallery/fall-2026-kickoff/*.svg`,
      and the cover image referenced from that album) with real photos
- [ ] Revise all ported text — everything in `src/content/pages/` and
      `src/content/training/fall-2026.md` was copied verbatim from the live Google Sites
      pages on 2026-09-12 and is marked as such; it needs Raymond's own edit pass
- [ ] Decide on `docs/adr/0001-photo-storage.md` (in-repo photos vs. Cloudflare R2/Images)
      once the gallery starts growing
- [ ] Decide whether `albany-cert-ops` (currently under `rdhyee`) also moves into the
      `albanycert` org

## Attribution

Scaffolded by a Claude Code agent on 2026-09-12 from the plan in
[[Albany CERT Website — Pages CMS Migration]]. Content ported from the live
albanycert.org (Google Sites) is marked verbatim in each file and awaits Raymond's
revision.
