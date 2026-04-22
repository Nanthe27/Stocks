# StockFlow v1.0.0
### Production-grade Inventory Management System

---

## Quick Start

```bash
# Serve locally (any method works):
python3 -m http.server 8080
# or
npx serve .
# or open index.html directly in Chrome/Firefox
```

Then visit `http://localhost:8080`

**Default credentials:**
| Field | Value |
|---|---|
| Username | `nan` |
| Password | `admin@nan` |
| Role | Owner (full access) |

---

## File Structure

```
stockflow/
├── index.html                  # Main SPA shell + all page HTML
├── css/
│   └── app.css                 # Full design system + components
├── js/
│   ├── app.js                  # Main app logic, pages, router
│   ├── store.js                # In-memory store + Google Sheets sync
│   └── locale.js               # i18n strings (English v1.0.0)
├── google-apps-script.js       # Copy → paste into Google Apps Script editor
└── README.md
```

---

## Google Sheets Setup (optional — for cloud persistence)

1. Go to [script.google.com](https://script.google.com) → New project
2. Paste the contents of `google-apps-script.js`
3. Run the `autoSetup()` function once (to create sheet tabs + seed data)
4. Deploy → **New deployment** → Web App
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the deployed Web App URL
6. In StockFlow → Settings → paste the URL → Save Settings
7. Click **Force Sync** to verify connection

---

## GitHub Pages Deployment

```bash
git init
git add .
git commit -m "StockFlow v1.0.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stockflow.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: main branch → / (root)**

No API keys or secrets are stored in the repository. The Apps Script URL is stored in localStorage only.

---

## Roles & Permissions

| Permission | Owner | Admin | Sale | Customer |
|---|---|---|---|---|
| View Dashboard | Yes | Yes | Yes | No |
| Manage Stock | Yes | Yes | Yes | No |
| Manage Users | Yes | Yes | No | No |
| View Reports | Yes | Yes | Yes | No |
| Edit Records | Yes | Yes | Yes | No |
| Delete Records | Yes | Yes | No | No |
| Access Settings | Yes | No | No | No |

Role permissions are configurable by the Owner via Settings → Role Permission Matrix.

---

## Architecture Notes

- **In-memory first:** All reads/writes hit in-memory store instantly. localStorage provides offline persistence. Google Sheets sync runs in the background (non-blocking).
- **i18n-ready:** All UI strings are defined in `js/locale.js` under the `LOCALES` object. To add a language, add a new key and call `setLocale('langCode')`.
- **Modular:** Each page is a self-contained object in `Pages`. Add new pages by adding a new `Pages.pageName` entry and a `<main id="page-pageName">` in `index.html`.
- **No build step required.** Pure ES modules served as static files.

---

## Currency

- Primary: **USD**
- Built-in USD ↔ KHR calculator (default rate: 1 USD = 4,100 KHR)
- Exchange rate configurable in Settings

---

*StockFlow v1.0.0 — MIT License*
