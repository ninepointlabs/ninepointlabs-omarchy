# Nine Point Labs for Omarchy

Landing page for every Nine Point Labs project built for [Omarchy](https://omarchy.org):
bar plugins, apps, themes, and the promo videos.

Plain HTML, CSS and JS with no build step. Live at https://omarchy.ninepointlabs.com/ (GitHub Pages, deploys from `main`).

The page behaves like an Omarchy desktop:

- Waybar-style top bar with workspaces `1`–`6`, a clock, and a theme chip
- `T` rotates through the real palettes from the Nine Point Labs themes (copied from each `colors.toml`)
- `/` opens a Walker-style launcher that searches plugins, apps, themes and videos
- Screenshot lightbox (use `←` `→`), a copy button on every install command, and a video reel

## Layout

```
index.html
assets/css/site.css     theme tokens + layout
assets/js/data.js       all projects, themes, videos (edit this to add things)
assets/js/site.js       rendering and interactions
assets/img/             screenshots (WebP), wallpapers, og.png, npl-mark.svg
assets/video/           promo videos (H.264, faststart) + posters
```

## Adding a project

Add an entry to `plugins`, `apps` or `themes` in `assets/js/data.js`, and drop a screenshot into
`assets/img/` as WebP:

```sh
magick preview.png -resize '1600x1600>' -quality 82 assets/img/my-plugin.webp
```

## Run locally

```sh
python3 -m http.server 8765
```

## Sources

- Screenshots come from each repo's `preview*.png` / `docs/`
- Videos were re-encoded from `~/Projects/{omaforge-promo-video,fm-cli-video}/out/`
  (`ffmpeg -c:v libx264 -crf 25 -preset slow -movflags +faststart`)
