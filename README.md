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

## Deploying to GitHub Pages

Not done yet by design (kept local for review first). When ready:

```
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/aperasmo/<repo-name>.git
git push -u origin main
```

Then in the GitHub repo: **Settings → Pages → Source → Deploy from branch →
main / (root)**.

## Facts used in the project sections

Sourced directly from the two codebases (not invented) — see:
- GlaucomaAI: `glaucoma-detection/backend/metrics/evaluation_results.json`,
  `docker-compose.yml`, `.github/workflows/deploy.yml`,
  `backend/app/ml_inference/llm_referral.py`
- AI Git Assistant: `ai-git-assistant/README.md`, `package.json`,
  `sidecar/pyproject.toml`, `src-tauri/Cargo.toml`, `docs/RELEASE_NOTES.md`

Two claims in the copy could not be verified from either codebase and were
taken as given from outside knowledge: the IEEE MIPR 2026 publication, and
AI Git Assistant's "real users."
