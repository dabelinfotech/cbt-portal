# JAMB UTME Standard CBT Portal & Examination Control System

A full-fledged, standard Joint Admissions and Matriculation Board (JAMB) Unified Tertiary Matriculation Examination (UTME) Computer-Based Testing (CBT) portal with an isolated Admin Backend and Student Examination Workstation architecture.

**Powered by DABELTECH**

---

## 🌟 Key Features

### 🎓 Candidate CBT Examination Portal (Port 3000)
- **Authentic JAMB UTME UI**: Built precisely to match official JAMB CBT center workstation screens.
- **Official 4-Subject Combination Selection**: Compulsory *Use of English* + 3 chosen electives across 19 official UTME subjects with JAMB Brochure course presets.
- **Anti-Malpractice Question Scattering Engine**: Every candidate gets a unique cryptographic seed (`paperSeed`). Question numbers (1..60 / 1..40) and answer options (A, B, C, D) are scattered and permuted per student seat. Two students sitting side-by-side never receive questions in the same order.
- **JAMB 8-Key Shortcut System**: Full support for official JAMB 8-key keyboard controls (`A`, `B`, `C`, `D`, `N`ext, `P`revious, `R`everse/Clear, `F`lag for Review, and `S`ubmit).
- **On-Screen CBT Calculator & Text Resizer**: Accurate standard exam calculator (`C`, `√x`, `x²`, `÷`, `×`, `−`, `+`, `⌫`, `=`) and font sizing toggles.
- **Official UTME Result Slip**: Instant automated grading scaled to standard 400 marks with printable result notification slips, subject performance breakdowns, and admission cut-off analytics.

### 🔐 CBT Centre Administrator Backend (Port 4000)
- **Executive Centre Dashboard**: Real-time KPI summaries of PIN allocations, active candidates, test submissions, and question bank stats.
- **Student PIN Generator (Single & Bulk Batch)**: Generates 12-digit format UTME PINs (`UTME-XXXX-XXXX`) pre-assigned to seat numbers, JAMB registration numbers, and selected subject combinations.
- **Live 3-Student Question Scatter Verifier**: Real-time side-by-side simulator proving non-identical question distribution across simultaneous examinee seats.
- **Central Question Bank Manager**: Browse, filter, and add verified UTME past questions with solutions across all 19 subjects.
- **Master Results Broadsheet**: Comprehensive centre log of all graded examinations with CSV export and printing options.
- **Printable Student PIN Vouchers**: Standard two-column printable voucher slips for candidate hall distribution.

---

## 🚀 Port Architecture

| Service | Port / URL | Server Script | Description |
| :--- | :--- | :--- | :--- |
| **Student CBT Portal** | `http://localhost:3000` | `frontend-server.js` | Restricted Candidate Examination Portal (Blocks Admin UI) |
| **Admin Control Centre & REST API** | `http://localhost:4000` | `backend-server.js` | Full CBT Control, PIN Generator, and API (Default Master Key: `ADMIN2026`) |
| **Dual-Port Orchestrator** | Starts `3000` & `4000` | `server.js` | Boots both servers concurrently |

---

## 💻 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)

### Installation & Launch
```bash
# Clone the repository
git clone https://github.com/dabelinfotech/jamb-utme-cbt-portal.git
cd jamb-utme-cbt-portal

# Start both servers (Frontend: 3000, Backend: 4000)
node server.js
```

Or using npm scripts:
```bash
npm start                 # Starts both Frontend and Backend
npm run start:frontend    # Starts only Student Portal (Port 3000)
npm run start:backend     # Starts only Admin Backend (Port 4000)
```

### Windows One-Click Launchers
- `start-portal.bat` — Launches both servers and opens them in your browser.
- `start-frontend.bat` — Launches only the Student CBT Portal (`http://localhost:3000`).
- `start-backend.bat` — Launches only the Admin Backend (`http://localhost:4000`).

---

## 🛡️ License
MIT License. Developed and maintained by **DABELTECH**.
