# Portfolio Website

Personal portfolio site for **Yauchin M. Lam** — a single-page React application built with TypeScript and Vite. The site presents professional background, technical skills, project highlights, and a contact form powered by EmailJS (no custom backend).

**Live repository:** [github.com/yauchinlam/portfolio-website](https://github.com/yauchinlam/portfolio-website)

## Tech stack

| Layer | Choice |
|-------|--------|
| UI | React 19 + TypeScript |
| Build tool | Vite 6 |
| Styling | Component-scoped CSS files |
| Contact form | [EmailJS](https://www.emailjs.com/) (`@emailjs/browser`) |
| Deployment target | Static build (`dist/`) — e.g. GitHub Pages, Azure Static Web Apps, Netlify |

## Project structure

```
portfolio-website/
├── public/
│   └── profile.jpg          # Hero headshot (served at /profile.jpg)
├── src/
│   ├── components/          # Presentational UI sections
│   │   ├── Navbar.tsx       # Sticky nav (hash links)
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx      # EmailJS form + status handling
│   │   └── Footer.tsx
│   ├── data/
│   │   └── portfolio.ts     # Copy, skills, projects, profile links
│   ├── App.tsx              # Composes sections in page order
│   ├── main.tsx             # React root + global CSS import
│   ├── index.css            # Design tokens and shared utilities
│   └── vite-env.d.ts
├── index.html               # Vite entry HTML
├── vite.config.ts
├── tsconfig.json            # Project references (app + node)
├── tsconfig.app.json
├── tsconfig.node.json
├── .env.example             # EmailJS env var template (committed)
└── .env                     # Local secrets (gitignored)
```

### Architecture notes

- **Single-page layout:** `App.tsx` renders all sections in one document. Navigation uses anchor hashes (`#home`, `#about`, `#projects`, `#contact`) with `scroll-behavior: smooth` in global CSS.
- **Content separation:** Editable text, skills, and project metadata live in `src/data/portfolio.ts` so components stay mostly presentational.
- **Styles:** Each component has a co-located `.css` file (no CSS-in-JS or UI framework). Shared variables (colors, spacing) are defined in `src/index.css`.
- **Contact flow:** `Contact.tsx` reads `VITE_EMAILJS_*` from the environment, validates placeholders, and calls `emailjs.send()` with template params: `from_name`, `reply_to`, `message`, `title`.

## Prerequisites

- **Node.js** 18+ (required by Vite 6)
- npm (or compatible package manager)
- EmailJS account (for the contact form)

## Getting started

```bash
git clone https://github.com/yauchinlam/portfolio-website.git
cd portfolio-website
npm install
```

### Environment variables (contact form)

```bash
cp .env.example .env
```

Edit `.env` with values from the [EmailJS dashboard](https://dashboard.emailjs.com/):

| Variable | Description |
|----------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | Email service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Public API key |

EmailJS template should include at least: `{{from_name}}`, `{{reply_to}}`, `{{message}}`, and `{{title}}` (used in subject, e.g. `Contact Us: {{title}}`).

Restart the dev server after changing `.env`.

### Development

```bash
npm run dev
```

Open the URL shown in the terminal (default: `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview   # optional: serve dist locally
```

Output is written to `dist/`.

## Customization

| What to change | Where |
|----------------|--------|
| Name, headline, links, about text | `src/data/portfolio.ts` |
| Projects | `projects` array in `src/data/portfolio.ts` |
| Profile photo | Replace `public/profile.jpg` |
| Navbar initials | `src/components/Navbar.tsx` |
| Colors / typography | CSS variables in `src/index.css` |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Typecheck (`tsc -b`) and production bundle |
| `npm run preview` | Preview production build locally |

## License

Private portfolio project. All rights reserved unless otherwise noted.
