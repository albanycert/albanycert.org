# Live capture: CERT Survey (`/survey`)

Captured 2026-09-18 via `curl -sL -A "Mozilla/5.0" https://www.albanycert.org/survey`.

## Body text, in order
Title: "ALBANY CERT Survey"

Full visible page body beyond the title: **"Get in touch with us at
AlbanyCERT@gmail.com"** — that is the entire content. No embedded Google Form was found
in the captured HTML; if one exists it's rendered via a client-side embed that a plain
`curl` fetch doesn't execute (Google Sites form embeds are `<iframe>`s pointed at
`docs.google.com/forms/...`, and none appeared in this page's static HTML).

## Links
- `/home`, `/fall2026` (nav)
- No survey/form URL discoverable from this capture.

## Parity note
`docs/url-policy.md` already flags `/survey` → `/training/fall-2026/` as the "closest
current equivalent" with an **open decision** (no dedicated survey page on the new site
yet). This capture doesn't resolve that: the live page's actual content is just the
title and a contact line, so there's no wording to carry over here beyond redirecting
the URL, which the existing `_redirects` rule already does. Flagged for Raymond: if a
real Google Form is live behind `/survey` (title suggests one exists or existed), it
wasn't recoverable by static fetch — would need a browser to check for a client-rendered
form.
