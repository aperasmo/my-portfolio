# Portfolio — Allan Erasmo

Single-page, static (no build step) professional portfolio. Plain HTML/CSS/JS
so it loads fast and deploys to GitHub Pages with zero configuration.

## Run locally

Just open `index.html` in a browser, or serve it so relative paths behave
identically to production:

```
npx serve .
```

## Adding your photo / project screenshots

Nothing to rebuild — the page probes for images at load time and shows
whatever it finds.

- Headshot: `assets/photo/photo.jpg` (see `assets/photo/HOW_TO_ADD.md`)
- GlaucomaAI screenshots: `assets/screenshots/glaucoma-ai/1.png` ... `6.png`
- AI Git Assistant screenshots: `assets/screenshots/ai-git-assistant/1.png` ... `6.png`
