# 🚀 UDBHAV 2026 — Department Level Corporate Fest Portal

![UDBHAV 2026 Banner](https://img.shields.io/badge/UDBHAV-2026-00f2fe?style=for-the-badge&logo=rocket&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20TailwindCSS%20%7C%20JavaScript-blue?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-Google%20Sheets%20Webhook-ffb703?style=for-the-badge&logo=googlesheets&logoColor=black)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Welcome to the official web portal for **UDBHAV 2026 — BIZTOPIA**, a premier National Level Corporate Fest organized by the Department of Commerce. This high-performance, responsive web application features dynamic event showcases, live interactive simulations, delegate registration pass generation, and cloud database integration.

---

## 🌐 Live Website

> ### 🔗 [https://udbhav-seven.vercel.app/](https://udbhav-seven.vercel.app/)

The portal is **live and deployed on Vercel**. Visit the link above to explore all features — event arenas, the mock stock ticker, registration pass generator, and more.

---

## 📌 GitHub Repository Description

> **Short Description (for GitHub About section):**
> 🏆 Official web portal for UDBHAV 2026 National Level Corporate Fest featuring 10 flagship arenas, live mock stock exchange simulator, instant delegate pass generator, and automated Google Sheets Master Database integration.

---

## ✨ Features & Highlights

### 🏛️ 10 Flagship Corporate Arenas
* **BIZ BLITZ** — Business Quiz & Commerce Trivia
* **MANAGIX** — Best Manager & Corporate Crisis Challenge
* **PITCHCRAFT** — Best Marketing Team Showcase
* **INVENZA** — Shark Tank Pitch Arena
* **EXECUTIVE AVENUE** — Corporate Runway & Fashion Walk
* **LEDGER LEGENDS** — Best Accountant & Financial Analytics
* **WALL STREET WARS** — Live Mock Stock Trading Simulation
* **VOICES OF INDUSTRY** — Public Speaking & Corporate Oratory
* **HR X** — Corporate HR Crisis & Talent Mitigation
* **CARNIVAL CORNER** — Fun Arena & Recreational Team Games

### 📈 Live Mock Stock Exchange Ticker
* Interactive real-time simulated stock market ticker for *Wall Street Wars*.
* Virtual Cash Portfolio ($10,000 initial balance) with dynamic price fluctuation indicators.

### 🎫 Automated Delegate Registration & Ticket Pass
* Instant registration form with field validation.
* Real-time generation of custom **Digital Delegate Registration Passes** featuring unique Pass IDs (`UB26-XXXXXX`).

### 📊 Master Database Cloud Integration
* Built-in **Google Apps Script Webhook** integration (`google_sheets_setup.js`).
* Automatically syncs participant registrations into a single unified **Master Database** in Google Sheets in real-time.

### 🎨 Premium Visual Design & Interactive FX
* Futuristic dark mode aesthetics with cyan & gold glowing accents.
* **3D Glassmorphism Card Tilt Engine** with mouse tracking.
* Cyber-pointed custom cursor engine and confetti animation triggers.
* Fully responsive across Mobile, Tablet, and Desktop screens.

---

## 📁 Project Structure

```
UDBHAV-main/
├── index.html              ← Main SPA shell (all sections & UI)
├── app.js                  ← All interactivity, logic & animations
├── styles.css              ← Custom CSS, keyframes & glassmorphism
├── google_sheets_setup.js  ← Google Apps Script webhook for DB
├── sangappa.jpg            ← Image asset (JPG format)
├── sangappa.png            ← Image asset (PNG format)
└── README.md               ← Project documentation
```

### 🗂️ File-by-File Breakdown

---

#### `index.html` — Main Application Shell

The single-page application (SPA) entry point. Contains the complete HTML structure for every section of the portal:

| Section | Description |
|---|---|
| **Navbar** | Sticky top navigation with smooth-scroll links to all sections |
| **Hero** | Animated landing banner with fest title, tagline, countdown timer & CTA buttons |
| **About** | Fest overview, college branding (St. Claret College) & key highlights |
| **Events** | 10 flagship arena cards with glassmorphism 3D tilt effects & descriptions |
| **Wall Street Wars** | Embedded live mock stock ticker UI with virtual portfolio tracker |
| **Registration** | Full delegate registration form with instant digital pass generation modal |
| **Gallery / Sponsors** | Visual showcase panels |
| **Footer** | Contact info, social links & fest credits |

External CDN dependencies loaded in `<head>`:

| Library | Purpose |
|---|---|
| Tailwind CSS | Utility-first responsive layout |
| Three.js (r128) | 3D animated constellation background canvas |
| Canvas Confetti | Confetti burst on pass generation |
| Google Fonts | `Playfair Display`, `Plus Jakarta Sans`, `Space Grotesk` |

---

#### `app.js` — Core Application Logic

The brain of the portal. Handles all interactivity and dynamic behavior:

| Feature | What it Does |
|---|---|
| **Three.js 3D Scene** | Initializes & animates the `#three-bg-canvas` constellation/wave mesh background |
| **Custom Cyber Cursor** | Tracks mouse position to move the `#cyber-arrow-cursor` SVG element |
| **Countdown Timer** | Live JS timer counting down to the fest date |
| **Card Tilt Engine** | Mouse-enter/move/leave events on event cards for a 3D parallax tilt effect |
| **Stock Simulator** | `setInterval`-driven price fluctuation engine for Wall Street Wars stocks |
| **Registration Handler** | Validates inputs, generates `UB26-XXXXXX` Pass IDs, renders pass modal & confetti |
| **Google Sheets Webhook** | Sends registration data via `fetch()` POST to `window.GOOGLE_SHEETS_WEBHOOK_URL` |
| **Scroll Animations** | `IntersectionObserver` for fade-in/slide-in effects on viewport entry |
| **Mobile Menu Toggle** | Hamburger menu open/close logic for small screens |

---

#### `styles.css` — Custom Styling & Animations

Supplements Tailwind CSS with custom rules that cannot be expressed with utility classes alone:

| Rule / Class | Purpose |
|---|---|
| **CSS Variables** | Design tokens: cyan `#00f2fe`, gold `#ffb703`, bg `#070b14` |
| `.glass-card` | `backdrop-filter: blur()`, semi-transparent borders, glow box-shadows |
| `@keyframes float` | Subtle vertical bobbing for hero elements |
| `@keyframes glow-pulse` | Pulsating neon glow on borders and text |
| `@keyframes ticker-scroll` | Horizontal scroll loop for the stock ticker bar |
| `@keyframes fadeInUp` / `slideInLeft` | Scroll-triggered entrance animations |
| `.cyber-arrow-cursor` | Fixed cursor layer with `pointer-events: none` |
| `@media` queries | Mobile-first responsive breakpoints for cards, navbar & hero text |

---

#### `google_sheets_setup.js` — Google Apps Script Webhook

A **server-side Google Apps Script** (not run in the browser) that acts as the cloud database webhook:

1. Defines a `doPost(e)` function — the HTTP endpoint that receives POST requests from `app.js`.
2. Parses the incoming JSON payload (delegate name, college, event, email, pass ID, timestamp).
3. Appends a new row to the active Google Sheet with all registration data.
4. Returns a JSON success/error response back to the client.

> **Note:** Deploy this as a Google Apps Script Web App and paste the generated URL into `app.js` as `window.GOOGLE_SHEETS_WEBHOOK_URL`.

---

#### `sangappa.jpg` / `sangappa.png` — Image Assets

Branding or faculty advisor image assets referenced within the portal's HTML sections.

---

## 🛠️ Getting Started

### 1. View Live
Visit the deployed site directly: **[https://udbhav-seven.vercel.app/](https://udbhav-seven.vercel.app/)**

### 2. Running Locally
Clone the repository and open `index.html` in any modern browser, or use a local server:

```bash
# Clone the repo
git clone https://github.com/likhithgp2006/UDBHAV.git
cd UDBHAV

# Using Python
python -m http.server 8080

# Using Node.js / npx
npx serve .
```
Then visit `http://localhost:8080` in your browser.

---

## 📊 Google Sheets Master Database Setup

To enable real-time cloud database syncing for registrations:

1. Open [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. Go to **Extensions** → **Apps Script**.
3. Copy all contents from [`google_sheets_setup.js`](google_sheets_setup.js) and paste them into the script editor.
4. Click **Deploy** → **New deployment**:
   * Select type: **Web app**
   * Description: `UDBHAV Registration Webhook`
   * Execute as: **Me**
   * Who has access: **Anyone**
5. Authorize access and copy the generated **Web App URL**.
6. Paste your Web App URL into `window.GOOGLE_SHEETS_WEBHOOK_URL` inside [`app.js`](app.js):
   ```javascript
   window.GOOGLE_SHEETS_WEBHOOK_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL';
   ```

---

## 💻 Technologies Used

| Category | Technology |
|---|---|
| Frontend Structure | HTML5, Semantic Markup |
| Styling | Tailwind CSS (CDN) + Custom CSS3 |
| Interactivity | Vanilla JavaScript (ES6+) |
| 3D Graphics | Three.js r128 |
| Animations | CSS Keyframes, Canvas Confetti |
| Cloud Database | Google Apps Script + Google Sheets API |
| Deployment | Vercel |

---

## 📜 License

This project is licensed under the MIT License — feel free to customize and use it for your institution's events.
