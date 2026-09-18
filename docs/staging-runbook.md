# Connecting `staging.albanycert.org` — Raymond's 5-minute part

CC (Claude Code) may **not** create the Cloudflare Pages project or touch DNS — both were
explicitly denied when tried previously (deploying creates a public surface; DNS is a
production-affecting change). This is the exact, complete set of clicks for Raymond to do
it himself. Nothing here needs a developer.

## Why this order

Connect the repo to Cloudflare Pages **first** (you get a working `*.pages.dev` URL
immediately, no DNS needed yet), **then** add the `staging` CNAME once you have a project
name to point it at.

## Part 1 — Connect the repo to Cloudflare Pages

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/) → **Workers & Pages** →
   **Create application** → **Pages** tab → **Connect to Git**.
2. Choose the GitHub account/org — **`albanycert`** (not your personal account) — and
   authorize Cloudflare to access it if prompted. Select the **`albanycert.org`** repo.
3. **Project name**: `albanycert-org` (this becomes part of the free `*.pages.dev` URL —
   e.g. `albanycert-org.pages.dev` — and the target for the `staging` CNAME below).
4. **Production branch**: `main`. (Nothing is on `main` yet — that's fine, the first
   deploy will just build whatever's there. Once PRs start merging, this becomes the live
   site.)
5. **Framework preset**: choose **Astro** if it's offered in the dropdown — Cloudflare
   fills in the build command/output directory for you. If it's not offered, or you want
   to confirm, set these by hand:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. **Root directory**: leave as `/` (default) — the site lives at the repo root, not a
   subfolder.
7. **Environment variables** → **Node version**: add a variable named `NODE_VERSION` with
   value `22` (the repo requires Node ≥22.12, per `package.json`'s `engines` field —
   Cloudflare's default Node version is older and will fail the build without this).
8. Click **Save and Deploy**. First build takes a minute or two — Cloudflare shows live
   build logs.
9. Once it succeeds, you'll have a working URL like `https://albanycert-org.pages.dev`
   (production, tracks `main`) — bookmark it, but note nothing is merged to `main` yet so
   it'll show whatever placeholder content exists there.

## Part 2 — Preview deployments (branch previews, no extra clicks)

This is **on by default** once the project exists: every branch and every pull request
gets its own preview URL automatically (shown as a comment/check on the PR, and listed
under the project's **Deployments** tab in Cloudflare). This is what lets you (and anyone
you invite) look at a PR's actual rendered site before merging — no separate setup step.

## Part 3 — The `staging` subdomain

The idea: `staging.albanycert.org` always shows the **preview** of whichever branch you
point it at (or, once things stabilize, tracks a permanent `staging` branch) — separate
from the eventual production cutover of the bare `albanycert.org` domain.

1. In the Cloudflare Pages project (from Part 1) → **Custom domains** tab →
   **Set up a custom domain**.
2. Enter `staging.albanycert.org` and follow the prompt. Since `albanycert.org`'s DNS is
   **already on Cloudflare** in your personal account (per the compliance-calendar note —
   this hasn't moved to a CERT-owned account yet), Cloudflare should offer to add the DNS
   record for you automatically when the domain and the Pages project are in the same
   Cloudflare account. If it doesn't offer that (e.g. because of how the zone is owned),
   add it by hand instead:
   - Go to the `albanycert.org` zone → **DNS** → **Add record**.
   - **Type**: `CNAME`
   - **Name**: `staging`
   - **Target**: `albanycert-org.pages.dev` (or whatever the project's own domain came out
     to in step 3 above — check the project's **Custom domains** or **Overview** tab if
     unsure)
   - **Proxy status**: Proxied (orange cloud) — this is Cloudflare's default and is fine.
3. By default a custom domain on a Pages project maps to the **production** branch
   (`main`). If you want `staging.albanycert.org` to instead track a specific branch (e.g.
   whatever's currently being reviewed) rather than `main`, that's set per-domain in the
   same **Custom domains** tab — Cloudflare calls this a "branch alias." Pick whichever
   makes sense once there's something worth showing board members; tracking `main` is the
   simplest default to start with.

## Part 4 — Keep staging out of search engines

Cloudflare Pages' own `*.pages.dev` preview URLs are already `noindex` by default. The
custom `staging.albanycert.org` domain is **not** automatically excluded, so add this:

1. In the same Cloudflare Pages project → **Settings** → look for **Response headers** /
   **Transform Rules** (the exact menu name has moved around in Cloudflare's UI —
   look under the zone's **Rules** section if it's not directly in the Pages project).
2. Add a rule that applies **only to the `staging.albanycert.org` hostname** and sets the
   response header:
   ```
   X-Robots-Tag: noindex, nofollow
   ```
3. Alternatively (simpler, no Cloudflare rule needed): once there's a real `robots.txt`
   route people care about, the repo can serve a `staging`-only `robots.txt` that
   disallows everything — flag this back to CC as a small follow-up task if you'd rather
   do it that way; it wasn't added in this pass since it needs a decision about whether it
   should differ from production's `robots.txt`.

## What "done" looks like

- `https://albanycert-org.pages.dev` loads the current `main` branch.
- Opening a PR on GitHub shows a Cloudflare preview-deployment link/comment automatically.
- `https://staging.albanycert.org` resolves and shows the site (not a Cloudflare "not
  found" or DNS error).
- Viewing `staging.albanycert.org` in a browser's page-source or a header-inspector shows
  `X-Robots-Tag: noindex, nofollow` (if Part 4 was done).

## If something doesn't match this doc

Cloudflare's dashboard UI changes fairly often; if a button/tab name above doesn't match
what you see, the underlying steps (connect Git → set build command/output/Node version →
add custom domain → add noindex header) are still the right shape — look for the nearest
equivalent rather than assuming the process changed.
