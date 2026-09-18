# Go-live plan: Google Sites → this repo

**Status: planning only. Nothing below has been executed except where marked done.**
Companion to `docs/staging-runbook.md` (staging setup — do that first) and the vault note
[[Albany CERT Website — Pages CMS Migration]] (the original decision + design notes:
[[Albany CERT Website — Current Site Inventory (CC, 2026-09-12)]] and
[[Albany CERT Website — Agent-Operable Design (CC, 2026-09-11)]]).

## Why this is a small migration, not a big one

The live site (`albanycert.org`, Google Sites) is genuinely small: **2 pages** reachable
from its nav — Home and a nearly-empty "Fall 2026" stub (title + a `mailto:` line, no
schedule) — per the 9/12 inventory, re-checked live today and unchanged. All the
substantive content is on Home: mission/about, CERT training blurb, Block Captains, Radio
Club, Donate, mailing-list signup. There's no CMS export, no API, and DNS for the domain
currently sits in Raymond's **personal** Cloudflare account, not a CERT-owned one — those
three facts are *why* this migration was decided (see the platform-options note), not new
information.

Almost all of Home's content is **already ported** into this repo's content collections
(`src/content/pages/home.md`, `about.md`, `training/fall-2026.md`, `block-captains.md`,
`radio-club.md`, `donate.md`) — done 9/12, verbatim-marked for revision, currently sitting
in open PRs #2–#4. The main net-new work below is: (1) actually stand up staging so people
can look at it, (2) a content-parity pass against the *live* site (things drift in 6 days),
(3) the DNS cutover itself, and (4) not breaking anything currently pointing at the old URLs.

## Phase 0 — Already done

- [x] Astro site scaffolded, content collections + Zod validation, build passes (PR #1).
- [x] Home/About/Training/Block Captains/Radio Club/Donate/Contact content ported from the
      live site, public-safe (PR #2).
- [x] Styling pass — palette, logo stopgap (PR #3, open, needs your taste pass).
- [x] This week's content — Sept 30 meeting, wait-list wording, draft safety page, About
      framing paragraph (PR #4, open).
- [x] `docs/staging-runbook.md` written.

## Phase 1 — Staging (do this now, together)

Exact clicks in `docs/staging-runbook.md`. Outcome: `staging.albanycert.org` shows the
site (tracking `main` initially, or a specific branch once you want to show something
specific to the board), `noindex`'d so it doesn't show up in search while it's a
work-in-progress. **This doesn't touch the live site at all** — `albanycert.org` keeps
showing Google Sites until Phase 3, below. Zero risk to what's live today.

## Phase 2 — Content parity + QA (before cutover, after your taste pass)

1. **Re-diff against the live site.** The content in this repo was ported 9/12 — re-check
   Home and the Fall 2026 stub against what's *actually live* right now before cutover
   (Google Sites content can be hand-edited by any board member with access, with no PR
   trail — it could have silently changed). A 10-minute manual read-through is enough;
   there's no API/export to automate this diff.
2. **The 4 embedded images on Home** (per the site inventory: `lh3.googleusercontent.com`
   hosted, exact URLs/alt text never captured — needs a human with a browser). Decide
   per-image: recreate on the new site, replace with something better (real event photos
   are already wanted for the gallery collection), or drop if it was filler.
3. **Resolve every open `<!-- verify -->` marker** across PRs #2–#4 — either your decision
   or AFD's, tracked in `docs/ia.md`'s "Verify list." Don't cut over with unresolved
   placeholder/mailto links if avoidable.
4. **Logo**: replace the auto-traced stopgap with Blake's original once it arrives
   (`docs/logo.md` has the swap recipe) — not a hard blocker for cutover, but worth doing
   before board members see the real domain, not just staging.
5. **External cross-links still need to resolve.** Three City of Albany pages link to
   `albanycert.org` today per the site inventory (readyalbany.org/cert,
   albanyca.org's CERT-program and Block-Captain pages) — the domain isn't changing, so
   these keep working automatically; just confirm the *paths* they point to (if any link
   to `/home` or `/fall2026` specifically) get a redirect in Phase 4, not a 404.
6. **Merge order**: #2 → #3 → #4, each after a preview-URL look, per the existing plan.

## Phase 3 — DNS cutover (the actual switch)

This is the one irreversible-feeling step, but it's a DNS change, not a data migration —
nothing about Google Sites' content is destroyed, and DNS can be pointed back in minutes
if needed (see rollback below). **This is RY's click, same as staging** — CC doesn't touch
DNS (denied twice already this week).

1. **Before touching anything: export/screenshot the current DNS records** for
   `albanycert.org` in your personal Cloudflare account — whatever's there today
   (Google Sites' own DNS instructions typically use `A`/`CNAME` records at the apex and
   `www`). This is your rollback reference; Google Sites doesn't show you this from its
   own side.
2. Pick a low-traffic window (this is a small volunteer site — any weekday works, but
   avoid the day of a CERT meeting/training so nobody hits a hiccup while looking something
   up).
3. In the same Cloudflare Pages project, add a **second custom domain**: the bare
   `albanycert.org` (and `www.albanycert.org` if that's how the current site is reached —
   check which one the live site actually redirects to first).
4. This **updates the existing DNS records** at the apex/`www` to point at the Pages
   project instead of Google Sites — Cloudflare handles this the same way it did for
   `staging` in Phase 1, just at the root domain this time.
5. **DNS propagation**: typically minutes since it's already on Cloudflare (no nameserver
   change, just record values) — but budget up to ~24 hours for full global propagation
   before declaring it fully done.
6. **Verify**: `albanycert.org` and `www.albanycert.org` both load the new site over HTTPS
   (Cloudflare issues the certificate automatically — confirm the padlock, don't just
   trust the redirect).

### Rollback (if something's wrong after cutover)

Revert the DNS records to what you captured in step 1. Google Sites itself is untouched by
any of this — it doesn't get deleted or disconnected by pointing DNS elsewhere, so it's
still there to point back to. This is the main advantage of DNS-level cutover over an
export/import migration: the old site is a fallback for free until you deliberately decide
to decommission it (Phase 5).

## Phase 4 — Redirects (don't break existing links)

Google Sites URLs (`/home`, `/fall2026`) won't exist as such on the new site (the new
site's home is `/`, and there's no `/fall2026` route — training content lives at
`/training/fall-2026`). Two calls to make, not urgent enough to block cutover on:

- **Old `/fall2026` path**: if anything printed, emailed, or posted (flyers, past
  groups.io announcements, the `albanycert.org/fall2026` link string that's been used in
  session notes and QR codes this fall) references that exact path, add a redirect rule in
  Cloudflare (Bulk Redirects or a Page Rule) from `/fall2026` → `/training/fall-2026` so
  those links keep working instead of 404ing.
- **`/home`**: Google Sites' own root usually already redirects `/` → `/home`, so this is
  lower risk — the new site's `/` just becomes the real home page.
- This is a **content audit task**, not a technical one: search past emails/flyers/QR
  codes for exact `albanycert.org/...` paths before deciding which redirects are worth
  setting up. Not done in this pass — flagging as a to-do rather than guessing which paths
  matter.

## Phase 5 — Decommission Google Sites (later, not now)

Only after the new site has been live and stable for a while (suggest: through at least
one full Fifth-Wednesday cycle, so any lingering issue surfaces while the old site is
still there as a fallback). At that point: unpublish (not delete) the Google Site — Sites
lets you unpublish while keeping the underlying content, which preserves the option to
look back at exactly what the old copy said, cheaper than trying to archive it any other
way.

## Two things this plan deliberately does NOT decide

- **The Pages CMS / branch-protection spike** (§6 of the Agent-Operable Design note) —
  whether turning on branch protection on `main` blocks Pages CMS's direct-write saves for
  non-technical volunteer editors. This plan's cutover doesn't require branch protection
  to be on; it can go live with the current "PR + human merge" discipline and the spike
  done later, whenever a non-technical editor is actually being onboarded. Don't block
  cutover on it.
- **Whether `albany-cert-ops` also moves into the `albanycert` GitHub org** — unrelated to
  this site's cutover, tracked separately in the README's not-done list.

## Timeline (loose, not a commitment)

Staging (Phase 1) can happen today. Content parity + your taste pass (Phase 2) is the
long pole — however long PR review actually takes, not a fixed number of days. Cutover
(Phase 3) whenever Phase 2 is genuinely done, not on a calendar deadline — a stale Fall
2026 stub page live at the real domain is worse than Google Sites' current stale stub, so
don't rush past Phase 2.
