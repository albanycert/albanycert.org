# Keeping the site timely — the 5-minute routine

Prompted by the peer-site review (suggestion 5): the single clearest "is this org alive"
signal on a small nonprofit site is a dated events trail that's actually kept up. This is
the routine for when a Fifth Wednesday meeting (or any dated event) gets announced —
meant to join the existing [[Fifth Wednesday — Announcement Kit Runbook (living)]] as its
website step.

## When a Fifth Wednesday meeting is announced

1. **Add a meeting file** — `src/content/meetings/YYYY-MM-DD-<slug>.md`, frontmatter:
   `title`, `date`, `time`, `location`, `agenda_url` (the bit.ly link), `zoom_url`. Copy an
   existing file (e.g. `2026-09-30-fifth-wednesday.md`) as the template.
2. **Write 2–4 sentences of body text** — what the meeting's actually about, in plain
   language. This can be the same text that went into the groups.io post / announcement
   Doc; it doesn't need to be original.
3. **Check `src/content/pages/home.md`** — update the "Next community meeting" line if
   it's stale (date/time/location) once the new file exists.
4. **Build and eyeball it** — `npm run build` (or `astro dev` if you're already running
   it) and look at `/meetings` and `/` to confirm the new meeting shows under "Next
   meeting" and the old one moved to "Past meetings" automatically (it's date-driven,
   nothing to hand-edit there).
5. **Commit and push** on a content branch, PR it in (or, once Pages CMS is live, do
   steps 1–2 directly in the Pages CMS web editor — no git needed for a non-technical
   editor).

## Doing it in Pages CMS instead of git

Once Pages CMS is connected (see the Pages CMS Migration project), the same file lives
under the `meetings` collection in the CMS's editor — a board member can fill in the same
fields (title/date/time/location/links) and the body text through the web form, no GitHub
account required. The collection schema (`src/content.config.ts`) enforces the required
fields, so a CMS editor can't accidentally publish a meeting with no date.

## The failure mode this guards against

Per the peer review: several peer sites (Point Richmond CERT, CERT-LA) have almost no
visible timestamping, so a visitor can't tell if the org is active. Albany's plan already
has an Announcements collection and now a dated Meetings trail with an honest "no upcoming
meetings" state (see `src/pages/meetings.astro`) — the discipline this checklist protects
is simply: **when a meeting is announced elsewhere (groups.io, e-news), spend the same 5
minutes putting it on the website too**, rather than letting the website lag the mailing
list by weeks or months.
