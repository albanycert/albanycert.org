# ADR 0001: Photo storage — in-repo for now

**Status:** Proposed (decision deferred to Raymond)
**Date:** 2026-09-12

## Context

The new `gallery` content collection (`src/content/gallery/`) is media-first: each entry is
an album of event/training/meeting photos. Right now those images live under
`public/images/gallery/` and are committed straight into the git repository, which is what
this scaffold ships with.

That's fine at the current scale (a handful of placeholder SVGs, one sample album) but it
doesn't scale indefinitely:

- Every repo clone (including CI checkouts and any agent working copy) downloads every
  photo ever added, forever.
- Git is not designed for large binary churn — repo size only grows, history bloats, and
  there's no compression benefit the way there is for text.
- Cloudflare Pages has documented limits on total deployment size and file count that a
  large, growing photo library will eventually hit.

## Decision

**Not yet decided.** This ADR records the trade-off for Raymond to decide when the gallery
actually starts growing — it is not blocking this scaffold.

## Options considered

1. **Keep photos in-repo under `public/images/`** (current state)
   - Pros: zero extra infrastructure, works with Pages CMS's built-in `media` config
     out of the box, one system to reason about, free.
   - Cons: repo bloat over time, slower clones, eventual Cloudflare Pages size/file-count
     limits, no image optimization/resizing pipeline.

2. **Move to Cloudflare R2** (S3-compatible object storage)
   - Pros: no practical size limit, cheap (free tier generous, then pennies/GB), decouples
     photo storage from git history, works well behind a Cloudflare Worker for
     presigned uploads.
   - Cons: needs its own auth/upload path — Pages CMS's default `media` config expects a
     path inside the repo, not an external bucket, so this requires either a custom
     media backend integration or a Worker that Pages CMS is pointed at (unverified
     configuration surface as of this writing — check Pages CMS docs before building).

3. **Move to Cloudflare Images**
   - Pros: built-in resizing/optimization/variants, a CDN out of the box, simple API.
   - Cons: paid from the first image (no meaningful free tier for a nonprofit's needs
     beyond a trial), same Pages CMS integration question as R2.

## Suggested thresholds to revisit this decision

- Repo size (via `.git` size or `du -sh public/images`) exceeds roughly 200–500MB, or
- More than a few hundred photos accumulate, or
- Cloudflare Pages build/deploy starts warning about file count or size limits, or
- A volunteer wants to upload photos directly (bypassing Raymond/an agent) at a volume
  that in-repo commits can't reasonably absorb.

## Consequences if deferred indefinitely

None immediately — a small nonprofit site with occasional event photos may simply never
hit these thresholds. This ADR exists so the trade-off is documented before it becomes an
urgent migration rather than a planned one.
