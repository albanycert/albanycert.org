# albanycert.org — Information Architecture (first pass)

## Why this structure

Albany CERT has four jobs: get people into training, activate block captains once
trained, keep the radio club and community meetings running, and raise a little money.
Nearly everyone who lands on this site is mid-errand — "is training open," "how do I
become a block captain," "when's the next meeting," "how do I give $20" — so every page
below answers one of those in the first two sentences and ends with one action, not
three. Old-Google-Sites text about mission and history moves off the home page onto
`about`, so the front door reads as a call to action instead of a brochure. The nav stays
flat (no dropdowns) because the whole site is 9 pages — a volunteer editing it in Pages
CMS should never need to think about hierarchy.

## Peer-site review addendum (2026-09-18)

A peer-site review of nearby CERT/emergency-prep orgs (BDPNN, Lamorinda CERT, El
Cerrito–Kensington CERT, and others) surfaced one page this sitemap didn't have and one
gap worth stating explicitly. Full seven-suggestion tracking: `docs/peer-review-decisions.md`.

- **During an Emergency** (`src/content/pages/during-an-emergency.md`) — a 10th page,
  not yet in the flat 9-page nav above: "the ground just shook, what now," built only
  from ready.gov + readyalbany.org + AC Alert. Marked `[DRAFT]`, not linked from the nav
  — needs AFD/CERT leadership review first (same convention as the utility-shutoffs
  draft below).
- **Role-based email recommendation, not adopted:** the review recommends aliases like
  `registrar@`, `webmaster@`, `treasurer@` once the site has more than one person behind
  it, following Lamorinda's and BDPNN's pattern. Albany's plan still centers on the
  single `AlbanyCERT@gmail.com`, which stays right-sized for now — do not create or
  imply mailboxes that don't exist.

## Sitemap (9 pages)

```
Home
├── About
├── Training
├── Block Captains
├── Radio Club
├── Meetings
├── Announcements
├── Donate
├── Contact
└── Gallery
```

## Per-page IA

### Home (`src/content/pages/home.md`)
- **Audience:** everyone — first stop for a prospective trainee, a donor, a curious
  neighbor, a reporter.
- **Job:** understand what Albany CERT is in one paragraph, see today's most important
  fact (training status), and get to the next-most-likely destination (training,
  meetings, donate).
- **Source of truth:** [[CERT 2017]] (purpose statement, four coordinated groups),
  [[CERT Fall 2026 Training]] (enrollment status), [[Fifth Wednesday CERT Meeting
  September 2026]] (next meeting).
- **Owner role:** Secretary/Registrar (Raymond Yee) for training status; any Pages CMS
  editor for the rest.

### About (`src/content/pages/about.md`)
- **Audience:** someone deciding whether this is a legitimate organization (donor,
  press, City partner) or wanting the origin story.
- **Job:** confirm nonprofit status and mission, see who's accountable (board).
- **Source of truth:** [[Albany CERT Compliance Calendar]] (incorporation date, EIN),
  [[Albany CERT — Volunteer Roles Inventory (CC, 2026-09-12)]] (officers).
- **Owner role:** President/Secretary.

### Training (`src/content/training/fall-2026.md`, one entry per offering)
- **Audience:** a prospective trainee.
- **Job:** know whether a class is open, when/where it meets, and how to get in — or, if
  full, how to get on the waitlist for the next one.
- **Source of truth:** [[CERT Fall 2026 Training]], [[2026-06-15 CERT Registrar Fall
  2026 (CC)]], [[Albany CERT — AFD Block Captain Meeting 2026.08.05]] §4.
- **Owner role:** Secretary/Training Registrar (Raymond Yee); instructors (Susan
  Yeaman, Bill Springer) for curriculum.

### Block Captains (`src/content/pages/block-captains.md`)
- **Audience:** a CERT grad or engaged resident wondering what it takes to lead their
  block, or a current captain looking up what's expected.
- **Job:** understand the (proposed) two-requirement job description and how to sign up.
- **Source of truth:** [[Albany CERT — AFD Block Captain Meeting 2026.08.05]] §2
  (Michael Gold's definition — marked proposed, pending AFD confirmation).
- **Owner role:** Vice President (Michael Gold).

### Radio Club (`src/content/pages/radio-club.md`)
- **Audience:** a ham/FRS operator or a captain wanting comms backup.
- **Job:** know the weekly check-in time/channel; the page says plainly that more detail
  is coming, since no net-control operator is named in any sourced note.
- **Source of truth:** live Google Sites text (Wednesday 7pm, Channel 19 Simplex) —
  no vault note names an owner ([[Albany CERT — Volunteer Roles Inventory (CC,
  2026-09-12)]] open question #2).
- **Owner role:** unassigned — flagged as an open question.

### Meetings (`src/content/meetings/*.md`)
- **Audience:** a member or captain wanting to attend the next community meeting.
- **Job:** know the next Fifth-Wednesday date, time, and room.
- **Source of truth:** [[Fifth Wednesday CERT Meeting September 2026]] (Sept 30,
  7:00–8:30pm, Senior Center MPR, room confirmed 9/2).
- **Owner role:** whoever convenes (still open per the note — "who convenes and who
  presents?").

### Announcements (`src/content/announcements/*.md`)
- **Audience:** a repeat visitor or groups.io member checking for news.
- **Job:** see the single most current fact fast (right now: training is full, waitlist
  open).
- **Source of truth:** [[CERT Fall 2026 Training]].
- **Owner role:** Secretary/Registrar.

### Donate (`src/content/pages/donate.md`)
- **Audience:** a donor.
- **Job:** give money in under a minute; confirm it's tax-deductible.
- **Source of truth:** [[Albany CERT Compliance Calendar]] (EIN, 501(c)(3) status),
  live site PayPal link.
- **Owner role:** Treasurer (Nick Peterson).

### Contact (`src/content/pages/contact.md`)
- **Audience:** anyone with a question that isn't answered elsewhere.
- **Job:** find the right inbox or list fast.
- **Source of truth:** [[CERT Fall 2026 Training]] (albanycert@gmail.com), live site
  (groups.io, City of Albany cross-links).
- **Owner role:** Secretary (de facto inbox owner, per the roles inventory).

### Gallery (`src/content/gallery/*.md`)
- **Audience:** anyone wanting to see CERT in action — recruiting value for
  prospective trainees.
- **Job:** browse photos; know that more are wanted and who to send them to.
- **Source of truth:** [[Albany CERT Policies and Practices]] §1 (photo policy,
  proposed), roles inventory (Nona Refi, photographer).
- **Owner role:** Photographer (Nona Refi) supplies photos; any Pages CMS editor posts
  them.

## What's public-safe-omitted

- No volunteer emails or phone numbers beyond the shared `AlbanyCERT@gmail.com` and the
  City of Albany's published Senior Center front desk number is not included either
  (kept out — not verified as intended for the public site).
- No roster names except the four named board officers (Blake Yeaman, Nick Peterson,
  Michael Gold, Raymond Yee) and instructors already named on the live site (Susan
  Yeaman, Bill Springer, per [[CERT Fall 2026 Training]] — not independently confirmed
  as public on the current Google Sites page, so marked `verify` on the training page).
- No block-captain roster counts, no privacy-policy internal deliberation, no AFD
  meeting negotiating detail, no compliance-calendar detail beyond EIN + 501(c)(3) +
  incorporation date.
- Radio club and gallery pages are deliberately thin rather than padded with unsourced
  claims.

## Verify list (flagged inline with `<!-- verify: ... -->` in the pages)

1. Whether Susan Yeaman and Bill Springer being named as instructors on the training
   page is fine publicly (they're not named on the current live site's visible text,
   per the site inventory).
2. Block-captain two-requirement definition is Michael Gold's proposal, not yet
   confirmed by AFD (Chief Smyser) — marked proposed on the block-captains page.
3. Fifth-Wednesday meeting topic is still TBD (to be finalized at the Sept 15
   organizing meeting, per the vault note) — page says "topic to be announced."
4. Radio club page has no named net-control operator or current activity level beyond
   the weekly check-in time carried over from the old site — flagged as thin.
5. Registration URL on the training page is still the `mailto:` placeholder — the
   README already tracks swapping in the real Google Form URL.
6. PayPal donation link (`paypal.me/AlbanyCERT`) carried over from the old site,
   unverified as still active.
