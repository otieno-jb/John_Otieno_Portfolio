# John Otieno — Portfolio

A dark, vibrant, single-page portfolio built with plain HTML, CSS and JavaScript. No build step and no external runtime dependencies.

## Live

- GitHub Pages: <https://otieno-jb.github.io/John_Otieno_Portfolio/>
- Repository: <https://github.com/otieno-jb/John_Otieno_Portfolio>
- Short link: <https://is.gd/john_otieno_security> (mirror)
- Mirror: <https://elaborate-griffin-326bdf.netlify.app>

GitHub Pages is the primary home for this portfolio. The Netlify deployment is kept as a mirror while the repository is being set up.

## Run locally

```powershell
cd portfolio
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`.

## Structure

```
index.html                 Main portfolio page
styles.css                 Design system and responsive styles
script.js                  Navigation, reveal animations, scrollspy, copy-email
cv.html / cv.css           Print-ready CV source
assets/fonts/              Self-hosted Bricolage Grotesque, Manrope, JetBrains Mono
assets/img/                Portrait, favicon and social card
assets/docs/               Downloadable CV (PDF)
submission/                Capture document, screenshots, QR code and ZIP package
```

## Update contact or social links

Contact details live in `index.html` in the `#contact` section and in the footer. The site currently uses email and telephone because those were the professional links supplied in the CV. Add LinkedIn or GitHub with the same `.contact-row` markup if needed.

## Regenerate the CV PDF

With the local server running:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --print-to-pdf="assets/docs/John_Otieno_CV.pdf" `
  "http://127.0.0.1:4173/cv.html"
```

## Deploy

### GitHub Pages (primary)

Push this folder to the `main` branch of <https://github.com/otieno-jb/John_Otieno_Portfolio>. The included workflow at `.github/workflows/pages.yml` builds and deploys the site with GitHub Pages.

In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions** if it is not already set. The site will publish at:

`https://otieno-jb.github.io/John_Otieno_Portfolio/`

### Netlify mirror

The mirror was deployed with Netlify's anonymous flow:

```powershell
netlify deploy --allow-anonymous --dir . --prod --no-build --created-via cli
```

Anonymous sites can be claimed into a Netlify account from the claim URL printed by the CLI.
