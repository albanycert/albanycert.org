# Peer-site review — decisions

Source: "Albany CERT Website — Peer Site Review (CC, 2026-09-17)" — Raymond's Obsidian
vault note, §5 has the seven ranked suggestions with peer links. This file tracks what
this repo did about each one, so the decision lives next to the code, not only in the
vault.

| # | Suggestion | Peer example | Status |
|---|---|---|---|
| 1 | Add a short "what to do during an emergency" page | none of the 3 named peers do this well; Lamorinda's [evacuation page](https://lamorindacert.org/resource/evacuate/) is the closest | **Done, this PR** — `src/content/pages/during-an-emergency.md`, marked `[DRAFT]`, built only from ready.gov + readyalbany.org + Alameda County AC Alert. **Not linked from the nav yet** — needs AFD/CERT leadership review first, same as the existing utility-shutoffs draft. |
| 2 | Keep radio-club content this specific, or more so | [El Cerrito–Kensington Communications page](https://www.eckcert.org/communications) — exact channel-per-zone schedule + sample check-in script | **Recommended, needs RY decision** — not done here. The gap is a named net-control operator (open question in the Volunteer Roles Inventory), not wording; a copy-editing pass without solving that would just make the page sound more confident than it is. |
| 3 | Don't build a member-location map, ever | Lamorinda's [graduate map](https://lamorindacert.org/map-page/) plots members' last-known addresses | **Rejected — by design.** No page or content collection in this repo does this; `docs/ia.md`'s "public-safe-omitted" list already forbids it. Recorded here so it stays a decision, not a silent absence. |
| 4 | Role-based email addresses for named roles | Lamorinda's [contact page](https://lamorindacert.org/contact-us/) (registrar@, webmaster@, PIO@); BDPNN's info@ | **Recommended, needs RY decision.** Do **not** create or imply mailboxes that don't exist. If Albany wants this, the aliases to consider match the roles already named in `docs/ia.md`: `registrar@albanycert.org` (Training), `webmaster@albanycert.org` (site/Pages CMS), `treasurer@albanycert.org` (Donate). The site currently uses only `AlbanyCERT@gmail.com` everywhere — unchanged in this PR. |
| 5 | Keep an honest, dated events/announcements trail | [BDPNN's Events page](https://www.bdpnn.org/events) — archives to 2017, says plainly "No upcoming events are scheduled right now" | **Done, this PR.** `meetings.astro` now splits Next meeting / Past meetings and backfills July 29 and April 29, 2026 as past entries (facts taken from what was actually publicly announced — see each `.md` file's comment for sourcing). Both `meetings.astro` and `announcements.astro` now say plainly when there's nothing upcoming, instead of an empty list. |
| 6 | A role-based zone/area-coordinator directory, later | [El Cerrito–Kensington's Find Your Area](https://www.eckcert.org/find-your-area) | **Rejected for now, by the peer review's own reasoning** — not urgent at Albany's current scale; the block-captains page already keeps this generic per `docs/ia.md`. No change made. |
| 7 | Don't chase Lamorinda's scale (fees, class levels, Foundation structure) | [Lamorinda CERT](https://lamorindacert.org/) | **Already correct, protect it.** No change — this is a "don't do this" that the existing 9-page flat IA already satisfies. |

## What's genuinely new in this PR vs. what's a recommendation

- **New content/code:** the During an Emergency draft page, the past-meetings backfill,
  the Next/Past meetings split, the honest empty states.
- **Recommendation only, no site change:** role-based email aliases (#4), radio-club
  specificity (#2) — both need a person (AFD, or whoever owns radio) to actually supply
  the missing fact, not just better prose.
- **Explicitly rejected, recorded so it doesn't get re-proposed:** a member/graduate
  location map (#3); matching Lamorinda's scale (#7).
