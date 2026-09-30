# 🚀 UDBHAV 2026 — Department Level Corporate Fest Portal

![UDBHAV 2026 Banner](https://img.shields.io/badge/UDBHAV-2026-00f2fe?style=for-the-badge&logo=rocket&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20TailwindCSS%20%7C%20JavaScript-blue?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-Google%20Sheets%20Webhook-ffb703?style=for-the-badge&logo=googlesheets&logoColor=black)

Welcome to the official web portal for **UDBHAV 2026 — BIZTOPIA**, a premier National Level Corporate Fest organized by the Department of Commerce. This high-performance, responsive web application features dynamic event showcases, live interactive simulations, delegate registration pass generation, and cloud database integration.

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

## 📁 Repository Structure

```
uddd-main/
├── index.html              # Main single-page web application structure
├── app.js                  # Application logic, interactive features, modal & data handlers
├── styles.css              # Custom styling, animations, glassmorphism & responsive rules
├── google_sheets_setup.js  # Google Apps Script Webhook API for Master Database setup
└── sangappa.jpg / .png     # Asset image references
```

---

## 🛠️ Getting Started

### 1. Running Locally
Simply open `index.html` in any standard web browser, or serve it using a simple local HTTP server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js / npx
npx serve .
```
Then visit `http://localhost:8080` in your web browser.

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
6. Paste your Web App URL into `window.GOOGLE_SHEETS_WEBHOOK_URL` inside [`app.js`](app.js#L528):
   ```javascript
   window.GOOGLE_SHEETS_WEBHOOK_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL';
   ```

---

## 💻 Technologies Used

* **Frontend:** HTML5, Vanilla JavaScript (ES6+), CSS3
* **CSS Framework:** Tailwind CSS (via CDN) & Custom CSS Keyframe Animations
* **Database & Cloud:** Google Apps Script, Google Sheets API (no-cors Webhook)
* **Libraries:** Canvas Confetti API

---

## 📜 License

This project is licensed under the MIT License — feel free to customize and use it for your institution's events.
