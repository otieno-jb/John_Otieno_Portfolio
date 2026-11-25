# Portfolio submission — John Otieno

## Live link

**Short link:** [https://is.gd/john_otieno_security](https://is.gd/john_otieno_security)

**Direct URL:** [https://elaborate-griffin-326bdf.netlify.app](https://elaborate-griffin-326bdf.netlify.app)

No password or login is required.

## What is in this folder

| File | Purpose |
|---|---|
| `John_Otieno_Portfolio_Submission.pdf` | Final grading document (14 pages, includes live link, QR code and screenshots). |
| `John_Otieno_Portfolio_Submission.docx` | Editable Word source for the submission document. |
| `cover.png` | Designed cover used on page 1 of the document. |
| `qr-code.png` | QR code pointing to the live portfolio short link. |
| `John_Otieno_CV.pdf` | Two-page CV, also downloadable from the live site. |
| `John_Otieno_Portfolio_Site.zip` | Complete static site source (HTML, CSS, JS, fonts, images, CV). |
| `screenshots/` | Full-resolution desktop captures used in the document. |
| `mobile/` | Mobile viewport captures used in the document. |
| `PORTFOLIO_LINK.txt` | Quick plain-text link sheet. |

## Requirement map

- **Home:** portrait, name, role, professional statement, availability, calls to action.
- **Resume:** academic background, three work roles, Cyber Shujaa training, skills and leadership.
- **Projects:** three projects — People First SACCO human-risk programme, Sentinel SOC Lab, Campus Network Reliability.
- **Lab challenges:** three writeups with problem statement, approach, tools, sanitized evidence and lessons learned.
- **Contacts:** email, telephone, location, availability and downloadable CV.
- **Submission document:** live link, QR code and screenshots of every section.

## Notes

- The site is a single static page with self-hosted fonts and no build step.
- Lab evidence is sanitized output from isolated, intentionally vulnerable training environments. No production data is shown.
- The professional links supplied in the CV were email and telephone. LinkedIn/GitHub can be added to `index.html` later using the existing contact-row markup.
- The live site is an anonymous Netlify preview. To keep it permanently, claim it into a Netlify account or redeploy the source zip to Netlify/GitHub Pages.

## Run locally

```powershell
cd portfolio
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`.
