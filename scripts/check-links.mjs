#!/usr/bin/env node
// Link check: run after `astro build`.
// (a) every internal href found in dist/**/*.html resolves to a real file in dist/
// (b) every source path in public/_redirects resolves to a real target
//     (either a redirect destination that is itself a real dist/ page, or an
//      external https:// URL, which we don't chase further)
//
// Deliberately dependency-free (just node:fs + node:path) per the "no new heavy
// dependencies" instruction.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");

if (!existsSync(dist)) {
  console.error("dist/ not found — run `npm run build` first.");
  process.exit(1);
}

/** Recursively list files under a dir. */
function walk(dir) {
  let out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(p));
    else out.push(p);
  }
  return out;
}

const htmlFiles = walk(dist).filter((f) => f.endsWith(".html"));

/** Does this dist-relative path resolve to a real emitted page? */
function resolves(urlPath) {
  let p = urlPath.split("#")[0].split("?")[0];
  if (p === "") p = "/";
  if (!p.startsWith("/")) return true; // not a site-internal path, skip
  const rel = p.endsWith("/") ? p + "index.html" : p;
  const withSlashIndex = join(dist, rel);
  const withoutSlash = join(dist, p + ".html");
  const asDir = join(dist, p, "index.html");
  return (
    existsSync(withSlashIndex) || existsSync(withoutSlash) || existsSync(asDir)
  );
}

let errors = [];

// (a) internal hrefs in built HTML
const hrefRe = /href="([^"]+)"/g;
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  let m;
  while ((m = hrefRe.exec(html))) {
    const href = m[1];
    if (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      continue; // external — out of scope for this check
    }
    if (!resolves(href)) {
      errors.push(`${file.replace(dist, "dist")}: broken internal link -> ${href}`);
    }
  }
}

// (b) redirect map sources -> targets
const redirectsFile = join(root, "public", "_redirects");
if (existsSync(redirectsFile)) {
  const lines = readFileSync(redirectsFile, "utf8").split("\n");
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const parts = line.split(/\s+/);
    if (parts.length < 2) continue;
    const [source, target] = parts;
    if (target.startsWith("http://") || target.startsWith("https://")) continue;
    if (!resolves(target)) {
      errors.push(`public/_redirects: "${source}" -> "${target}" does not resolve to a built page`);
    }
  }
} else {
  console.warn("No public/_redirects file found — skipping redirect-map check.");
}

if (errors.length) {
  console.error(`check:links found ${errors.length} problem(s):\n`);
  for (const e of errors) console.error(" - " + e);
  process.exit(1);
}

console.log(`check:links OK — ${htmlFiles.length} pages scanned, redirect map verified.`);
