# Ujjwal Patel — Portfolio

A modern, premium, fully responsive personal portfolio for **Ujjwal Patel**, AI/ML Engineer. Built as a single self-contained page (React + Tailwind CSS + Framer Motion via CDN) so it runs anywhere with **zero build step** — just open it or drop it on any static host.

All content is sourced exclusively from the résumé and the [github.com/ujjwal0909](https://github.com/ujjwal0909) profile and repository READMEs.

---

## Features

- **Single-file, no build** — `index.html` + `app.js`, no `npm install` required
- **Dark / light mode** with preference saved to `localStorage`
- **Hero typing animation** cycling through target roles
- **Framer Motion** scroll-reveal animations and section transitions
- **Glassmorphism** cards, hover lift effects, smooth scrolling
- **Live GitHub stats** pulled from the GitHub API + contribution / language / streak widgets
- **Working contact form** via Formspree (no backend)
- **Fully responsive** (desktop / tablet / mobile, mobile-first)
- **Accessible** — semantic HTML, ARIA labels, keyboard focus rings, skip link, reduced-motion support
- **SEO-ready** — meta tags, Open Graph, Twitter Card, JSON-LD structured data, `robots.txt`, `sitemap.xml`, favicon

---

## File structure

```
portfolio/
├── index.html               # Document head: SEO, fonts, Tailwind config, CSS, CDN libs
├── app.js                   # The entire React application (data + components)
├── Ujjwal_Patel_Resume.pdf  # Résumé served by the download buttons
├── og-image.svg             # Social-share preview image (see note below)
├── robots.txt               # Search-engine directives
├── sitemap.xml              # Sitemap
├── .nojekyll                # Tells GitHub Pages to serve files as-is
└── README.md
```

> **Why two files instead of one?** Browsers won't transpile a very large inline `<script type="text/babel">` reliably, so the React code lives in `app.js`. If you truly need one file, paste the contents of `app.js` into a `<script type="text/babel">` block at the bottom of `index.html`.

---

## Run locally

Because `app.js` is loaded as a module-style script, open it through a local web server (not `file://`):

```bash
cd portfolio

# Option A — Python (built in on most machines)
python3 -m http.server 8000

# Option B — Node
npx serve .
```

Then visit **http://localhost:8000**.

> Opening `index.html` directly via `file://` will work for most of the page, but the contact form and some browsers' fetch calls behave better over `http://`.

---

## Configuration

All editable settings live at the top of **`app.js`** in the `CONFIG` object:

```js
const CONFIG = {
  name: "Ujjwal Patel",
  email: "ujjwalpersonal09@gmail.com",
  phone: "+1 (469) 494-2266",
  github: "https://github.com/ujjwal0909",
  githubUser: "ujjwal0909",
  linkedin: "https://linkedin.com/in/ujjwal-patel09",
  resume: "Ujjwal_Patel_Resume.pdf",
  formspreeId: "YOUR_FORMSPREE_ID",   // 👈 set this to enable the contact form
};
```

### Enable the contact form (Formspree)

1. Create a free account at **https://formspree.io**.
2. Create a new form; copy its ID (the part after `/f/` in the endpoint, e.g. `xpzgkqwl`).
3. Paste it into `CONFIG.formspreeId` in `app.js`.

Until you do this, the form shows a friendly "setup needed" notice and points visitors to your email.

### Add a profile photo (optional)

In `app.js`, find the comment `Replace this block with an <img …>` inside the `Hero` component and swap the placeholder for:

```jsx
<img src="profile.jpg" alt="Ujjwal Patel" className="w-full h-full object-cover" />
```

Then drop `profile.jpg` into the folder.

### Convert the OG image to PNG (recommended)

Social platforms prefer PNG/JPG for share previews. Convert `og-image.svg` → `og-image.png` (any online converter or `rsvg-convert og-image.svg -o og-image.png`) and keep the filename, since the meta tags reference `og-image.png`.

---

## Deploy

### GitHub Pages

1. Create a repo named **`ujjwal0909.github.io`** (for a root user site) or any repo (for a project site).
2. Push all files in this folder to the repository root.
3. In **Settings → Pages**, set the source to the `main` branch, `/ (root)` folder.
4. Your site goes live at `https://ujjwal0909.github.io/`.

The included `.nojekyll` file ensures GitHub Pages serves everything correctly.

> If you deploy to a **project** repo (e.g. `github.com/ujjwal0909/portfolio`), the site URL becomes `https://ujjwal0909.github.io/portfolio/`. Update the absolute URLs in `index.html`, `robots.txt`, and `sitemap.xml` accordingly.

### Vercel

1. Push this folder to a Git repository.
2. Import it at **https://vercel.com/new**.
3. Framework preset: **Other**. Build command: *(leave empty)*. Output directory: `./`.
4. Deploy. Vercel will serve the static files directly.

### Netlify / Cloudflare Pages

Drag-and-drop the folder onto the dashboard, or connect the repo with **no build command** and the publish directory set to the project root.

---

## Tech stack

| Layer        | Technology                                  |
|--------------|---------------------------------------------|
| UI           | React 18 (UMD, via CDN)                      |
| Styling      | Tailwind CSS (CDN) + custom CSS             |
| Animation    | Framer Motion (UMD, via CDN)                |
| Transpile    | Babel Standalone (in-browser JSX)           |
| Fonts        | Inter, Sora, JetBrains Mono (Google Fonts)  |
| Icons        | Inline SVG (no icon dependency)             |
| Contact form | Formspree                                   |
| GitHub stats | GitHub REST API + public README widgets     |

---

## A note on accuracy

Every figure, project, skill, and credential on this site comes directly from the résumé or GitHub. Wording has been polished for readability, but no facts were invented. Placeholders are clearly marked where personalization is needed (Formspree ID, profile photo).

© Ujjwal Patel
