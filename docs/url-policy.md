# URL policy — albanycert.org

Built on Tim Berners-Lee's ["Cool URIs don't change"](https://www.w3.org/Provider/Style/URI):
design every URI to still work in 20 years, because the cost of a broken link (to a
donor, a volunteer, a printed flyer, a City partner) is much higher than the cost of
being careful now.

## Rules

1. **Short, lowercase, hyphenated.** `/block-captains`, not `/BlockCaptains` or
   `/block_captains`.
2. **No file extensions.** `/about`, never `/about.html` — the extension is an
   implementation detail (Berners-Lee's core point) and Astro/Cloudflare assets don't
   need it.
3. **No dates in evergreen pages.** `/about`, `/donate`, `/radio-club` never carry a
   date or version.
4. **Dated slugs for time-bound content.** Meetings and announcements get
   `YYYY-MM-DD-short-title`, e.g. `/meetings/2026-09-30-fifth-wednesday/`. This makes
   the URL itself a permanent historical record — the September 30 meeting page never
   gets renamed or reused, even after the meeting has passed.
5. **Trailing slash, always, permanently.** Every route resolves with a trailing
   slash (`/about/`, not `/about`). Bare paths 301-redirect to the slashed form (see
   `public/_redirects`) instead of relying on the platform's default temporary
   redirect.
6. **Never rename a published URL.** If a page must move, add a 301 redirect from the
   old path — never let it 404, never silently change what a URL means.
7. **No tool or platform names in URLs.** Nothing like `/pages-cms/` or `/astro/`.
8. **Stable anchors for sections people cite.** Where a page is likely to be quoted
   (e.g. training eligibility, the emergency page's steps), give that section a fixed
   `id` and don't change it once published.

## Canonical URL table (current build)

| Route | Page | Notes |
|---|---|---|
| `/` | Home | |
| `/about/` | About | |
| `/training/` | Training index | |
| `/training/fall-2026/` | Fall 2026 training offering | dated-offering slug |
| `/block-captains/` | Block Captains | |
| `/radio-club/` | Radio Club | thin/draft, flagged in `docs/ia.md` |
| `/meetings/` | Meetings (next + past) | |
| `/announcements/` | Announcements | |
| `/donate/` | Donate | |
| `/contact/` | Contact | |
| `/gallery/` | Gallery index | |
| `/gallery/fall-2026-kickoff/` | Gallery entry | |
| `/during-an-emergency/` | Emergency quick-reference | `[DRAFT]`, not yet in nav |

Meeting and announcement entries not yet published as of 2026-09-18: none beyond the
three meetings and one announcement already in `src/content/`. Each new one gets a
`YYYY-MM-DD-slug` file/URL per rule 4.

## Old-site inventory (Google Sites, checked 2026-09-18)

The live https://albanycert.org (Google Sites) answers to exactly these public paths
(confirmed by curl; nav only surfaces the first two):

| Old path | Title | Content | New home |
|---|---|---|---|
| `/` , `/home` | Albany CERT | Landing page | `/` |
| `/fall2026` | Albany CERT — Training Fall 2026 | Fall 2026 enrollment info | `/training/fall-2026/` |
| `/ready` | Albany CERT - Get Disaster Ready | Emergency-prep content | `/during-an-emergency/` |
| `/survey` | Albany CERT - CERT Survey | Training-interest survey/form | `/training/fall-2026/` (closest current equivalent; no dedicated survey page exists yet on the new site — **open decision**, see below) |

All four redirect to `www.albanycert.org` (301, platform-level) and return HTTP 200
today. `/survey` and `/ready` are not in the visible nav but are live and are the ones
already showing up in published links (see below) — they'd 404 on launch day without
the redirects in `public/_redirects`.

## Published links found (Obsidian vault + local docs, 2026-09-18)

`grep -rhoE "https?://(www\.)?albanycert\.org[^ )>\"']*" ~/obsidian/Main --include="*.md"`
and a lighter pass over `~/D/Document/Albany.CERT` text files. Counts collapse trivial
punctuation variants (trailing backtick/quote):

- `https://www.albanycert.org/` and bare domain — 8 total mentions
- `https://www.albanycert.org/fall2026` — 7 total mentions (vault + `Listos.Grant`
  mailing drafts, grad emails, agenda drafts)
- `https://www.albanycert.org/survey` — 2 mentions
- `https://www.albanycert.org/ready` — 1 mention

**All four would have 404'd at launch without the redirects above** — `/fall2026`,
`/survey`, and `/ready` don't exist as paths on the new Astro site. `public/_redirects`
now covers all of them with 301s.

## Before you publish a link — volunteer checklist

1. Link to the **live page's own URL**, not a screenshot or a shortened/bit.ly link
   pointing at something that might move.
2. Prefer the **trailing-slash form** shown in the canonical table above.
3. If you're linking to a *specific* meeting or announcement, use its dated slug
   (`/meetings/2026-09-30-fifth-wednesday/`), not the generic `/meetings/` index — the
   dated page is permanent, the index isn't a stable pointer to "that" meeting.
4. Before sending anything to print (flyers, mailers, QR codes), ask: "if this page's
   content changes in six months, does the URL still make sense?" If not, it's the
   wrong URL — link to the section/category page instead of a one-off.
5. If a page you're linking to doesn't exist yet, don't invent the URL — ask whoever
   maintains the site (currently Raymond Yee) what the slug will be.
