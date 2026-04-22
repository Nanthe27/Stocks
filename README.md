# StockFlow
### Free Inventory Management System

A lightweight, client-side inventory management system. No server required. Works entirely in your browser. Data is stored locally and optionally synced to Google Sheets.

---

## Live Demo

> Deploy your own copy for free using GitHub Pages — no backend, no hosting costs, no setup fees.

---

## Features

- Stock management (add, edit, delete items)
- Income & expense transaction tracking
- Dashboard with analytics and charts
- Role-based access (Owner, Admin, Sale, Customer)
- USD ↔ KHR currency calculator
- Optional Google Sheets cloud sync
- Dark / light theme
- Works offline — data stored in your browser

---

## How to Use

### Option 1 — Online (GitHub Pages, Recommended)

1. [Fork this repository](https://github.com/) or download and upload files to a new repo
2. In your repo: **Settings → Pages → Source: main branch → / (root)**
3. Visit `https://YOUR_USERNAME.github.io/REPO_NAME/`
4. Log in with your credentials and start using

No installation. No server. Works on any device with a browser.

---

### Option 2 — Offline (Local)

You cannot open `index.html` directly as a file — browsers block JavaScript modules on `file://`. Use a local server instead:

**Python** (if installed):
```bash
cd path/to/stockflow
python -m http.server 8080
```
Then open `http://localhost:8080`

**Node.js** (if installed):
```bash
npx serve path/to/stockflow
```

**VS Code**: Install the **Live Server** extension → right-click `index.html` → Open with Live Server

---

## Google Sheets Sync (Optional)

StockFlow works fully offline without this. If you want cloud backup:

1. Go to [script.google.com](https://script.google.com) → New project
2. Paste the full contents of `google-apps-script.js`
3. Run the `autoSetup()` function once (creates sheet tabs and structure)
4. Click **Deploy → New deployment → Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the deployed Web App URL
6. In StockFlow → **Settings** → paste the URL → **Save Settings**
7. Click **Force Sync** to verify

Your data will now sync to Google Sheets automatically on every change.

---

## File Structure

```
stockflow/
├── index.html              # Main app
├── disclaimer.html         # Terms of use
├── css/
│   └── app.css             # Styles
├── js/
│   ├── app.js              # App logic
│   ├── store.js            # Data store + sync
│   └── locale.js           # Language strings
└── google-apps-script.js   # Paste into Google Apps Script
```

---

## Roles & Permissions

| Permission       | Owner | Admin | Sale | Customer |
|-----------------|-------|-------|------|----------|
| View Dashboard  | Yes   | Yes   | Yes  | No       |
| Manage Stock    | Yes   | Yes   | Yes  | No       |
| Manage Users    | Yes   | Yes   | No   | No       |
| View Reports    | Yes   | Yes   | Yes  | No       |
| Edit Records    | Yes   | Yes   | Yes  | No       |
| Delete Records  | Yes   | Yes   | No   | No       |
| Access Settings | Yes   | No    | No   | No       |

Role permissions are fully configurable by the Owner via **Settings → Role Permission Matrix**.

---

## Currency

- Primary: **USD**
- Built-in USD ↔ KHR calculator (default rate: 1 USD = 4,100 KHR)
- Exchange rate is configurable in Settings

---

## Disclaimer

This project is free to use, as-is.

- Tested with small amounts of data. Bugs may occur.
- **Use at your own risk.** You are responsible for how you use this system.
- **No guaranteed support.** Feedback is welcome but fixes are not promised.
- The creator takes **no responsibility** for any data loss or issues arising from use.
- By using this system, you agree to these terms.

For feedback: [t.me/nann27](https://t.me/nann27)

---

## License

Free to use. No attribution required.

*StockFlow v1.0.0*
