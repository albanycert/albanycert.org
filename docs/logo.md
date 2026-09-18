# Logo files

`public/images/albany-cert-logo.svg` is a **stopgap vector**, auto-traced (vtracer) from the
only copy we have — `Albany-CERT-logo.bmp` in the CERT Google Drive, 640×455 px. The sky
gradient was flattened before tracing and re-added as an SVG `<linearGradient>`. It is
faithful at header sizes; letter edges are slightly soft when blown up large.

- `albany-cert-logo.svg` — use this on the site (≈20 KB, scales cleanly).
- `albany-cert-logo.png` (1280 px) and `-640.png` — rasters for email, social previews,
  and anything that can't take SVG. Rendered from the SVG with headless Chrome on white.

If a real vector or large original turns up (asked Blake Yeaman, 2026-09-12), replace all
three and delete this note. Rebuild recipe (scratch venv, not the project):
`pip install vtracer pillow numpy` → upscale 4× → classify pixels black / green / sky →
`vtracer.convert_image_to_svg_py(..., colormode='color', hierarchical='stacked',
mode='spline', filter_speckle=16, path_precision=0)` → `svgo --multipass -p 0` →
swap the sky fill for `url(#sky)` with `gradientUnits="userSpaceOnUse"`.
