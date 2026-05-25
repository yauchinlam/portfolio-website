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
| Hosting (IaC) | Azure Static Web Apps via Terraform (`terraform/`) |
| Deployment | Static build (`dist/`) — GitHub Actions (planned) or SWA CLI |

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
├── staticwebapp.config.json # Azure SWA SPA routing (fallback to index.html)
├── terraform/               # Azure Static Web App infrastructure (see DevOps)
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── versions.tf
│   └── terraform.tfvars.example
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

## DevOps — Azure Static Web Apps

Infrastructure for hosting this site is defined as code under `terraform/`. Terraform provisions the Azure resources; the React app is published via a **manually triggered** GitHub Actions workflow (not on every push to `main`).

### What Terraform creates

| Resource | File | Purpose |
|----------|------|---------|
| Resource group | `terraform/main.tf` | Container for the Static Web App |
| Static Web App | `terraform/main.tf` | Hosts the production `dist/` assets |

Provider: [azurerm](https://registry.terraform.io/providers/hashicorp/azurerm/latest) `~> 4.0`.

### Prerequisites (infrastructure)

- [Terraform](https://www.terraform.io/downloads) >= 1.5
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — `az login` and an active subscription
- A **globally unique** `static_web_app_name` (letters and numbers only)

### Provision Azure resources

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars — set static_web_app_name (e.g. swa-yauchinlam-portfolio)

terraform init
terraform plan
terraform apply
```

Sensitive/local files are gitignored: `terraform.tfvars`, `.terraform/`, `*.tfstate*`.

### Terraform outputs

After `terraform apply`:

```bash
terraform output static_web_app_url      # https://<name>.azurestaticapps.net
terraform output -raw api_key            # Deployment token (sensitive)
terraform output vite_build_config       # Suggested SWA build settings
```

| Output | Use |
|--------|-----|
| `static_web_app_url` | Public site URL |
| `api_key` | Deploy with SWA CLI or GitHub Actions secret `AZURE_STATIC_WEB_APPS_API_TOKEN` |
| `vite_build_config` | Aligns CI with this repo’s Vite setup |

### Azure Static Web Apps build settings

When connecting CI/CD (GitHub Actions or Azure’s deployment center), use:

| Setting | Value |
|---------|--------|
| App location | `/` |
| Output location | `dist` |
| Build command | `npm run build` |

`VITE_EMAILJS_*` variables must be available at **build time** (GitHub Actions secrets or pipeline env), not only in local `.env`.

### SPA routing on Azure

`staticwebapp.config.json` rewrites unknown routes to `index.html` so client-side navigation works if you add React Router later. Hash-based section links (`#about`, etc.) work without extra rules.

### GitHub Actions CI/CD (manual deploy)

Workflow: [`.github/workflows/azure-static-web-apps.yml`](.github/workflows/azure-static-web-apps.yml)

**Trigger:** GitHub → **Actions** → **Deploy to Azure Static Web Apps** → **Run workflow** (no automatic runs on push).

**Repository secrets** (Settings → Secrets and variables → Actions):

| Secret | Source |
|--------|--------|
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | `terraform output -raw api_key` after `terraform apply` |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS dashboard |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS dashboard |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS dashboard |

The workflow runs `npm ci`, builds with `npm run build` (including Vite env vars), and uploads `dist/` to the Static Web App.

Optional: create a GitHub **environment** named `production` (Settings → Environments) to gate approvals before deploy.

### Deploy application code (local / CLI alternative)

```bash
npm run build
npx @azure/static-web-apps-cli deploy ./dist --deployment-token "<api_key from terraform output>"
```

### Destroy infrastructure

```bash
cd terraform
terraform destroy
```

### DevOps layout summary

```
┌─────────────────┐     terraform apply      ┌──────────────────────────┐
│  terraform/     │ ───────────────────────► │ Azure Resource Group     │
│  (azurerm)      │                            │ + Static Web App         │
└─────────────────┘                            └────────────┬─────────────┘
                                                            │
┌─────────────────┐     npm run build + deploy              │
│  src/ → dist/   │ ───────────────────────────────────────►│ *.azurestaticapps.net
└─────────────────┘     (Actions: Run workflow, or SWA CLI)   └──────────────────────────┘
```

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

This project is licensed under the [MIT License](LICENSE). You are free to use, copy, modify, merge, publish, distribute, sublicense, and sell copies, subject to the conditions in the license file.
