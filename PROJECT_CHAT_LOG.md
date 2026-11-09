# JAMB UTME CBT Portal — Project Conversation & Development Record

**Project**: Standard JAMB UTME Computer-Based Test (CBT) Portal  
**Organization**: **DABELTECH** (`dabelinfotech`)  
**Repository**: [https://github.com/dabelinfotech/cbt-portal](https://github.com/dabelinfotech/cbt-portal)  
**Date**: November 8, 2026  

---

## 📋 Summary of User Requests & Delivered Solutions

### 1. Standard UTME CBT Portal with Official 4-Subject Pattern & Past Questions
- Built a standard JAMB UTME Computer-Based Testing portal containing all 19 official UTME subjects.
- Enforced the official UTME 4-subject combination structure: Compulsory *Use of English* (60 questions) + 3 chosen electives (40 questions each) for an aggregate score of 400 marks.
- Loaded syllabus-accurate UTME past questions with passages, options, answers, and solutions.

### 2. Per-Student Question & Option Scattering + Admin PIN Generator Backend
- Engineered a deterministic pseudorandom permutation engine (`CBTScatteringEngine` in `js/cbt-api.js`).
- Every student seat receives a unique cryptographic seed (`paperSeed`). Two or more candidates writing the same subject simultaneously receive completely different question numbering (1..60 / 1..40) and permuted options (A, B, C, D).
- Developed a comprehensive Admin Control Portal (`admin.html` & `js/admin.js`):
  1. **Executive Dashboard**: Real-time KPIs & monitoring.
  2. **Student PIN Generator**: Single & Bulk generation (`UTME-XXXX-XXXX`) with printable PIN vouchers.
  3. **Live 3-Student Question Scatter Verifier**: Real-time collision detection.
  4. **UTME Question Bank Manager**: Manage all 19 subjects.
  5. **Master Results Broadsheet**: CSV export and print options.
  6. **Centre Configuration & Security Settings**: Master Key `ADMIN2026`.

### 3. Port Separation & Admin Button Removal from Student UI
- **Port Separation**:
  - **Student Frontend Port (`3000`)**: Restricted exclusively to candidate test-taking. Blocks `/admin.html`, `/js/admin.js`, `/data/*`, and `/api/*` with `403 Restricted`.
  - **Admin Backend Port (`4000`)**: Dedicated to examination control and the REST API (`/api/*`), configured with dual-stack CORS support for Port `3000`.
- **UI Clean-up on Student Page**:
  - Removed the `Admin Backend & PIN Generator` header menu tab.
  - Removed the admin-generated PIN list dropdown from the login accreditation box.
  - Removed question authoring forms from the candidate modal.

### 4. "Powered by DABELTECH" Across All Pages
- Integrated *"Powered by DABELTECH"* branding across every single page, screen, modal, printable PIN voucher, and result notification slip on both Frontend and Backend.

### 5. GitHub Push to `dabelinfotech`
- Initialized git repository, added `.gitignore` and `README.md`.
- Created and pushed to public repository: **`https://github.com/dabelinfotech/cbt-portal`**.

### 6. Full Mobile Responsiveness System Across All Devices
- **Fluid Multi-Breakpoint Architecture**: Built responsive layouts tailored for Desktops, Tablets (`<= 1024px`), Phablets (`<= 768px`), and Smartphones (`<= 480px` & `<= 360px`).
- **Student Examination Workstation (Port 3000)**:
  - Header: Compact branding, sticky timer, Aa sizing, and quick submit buttons.
  - Setup Screen: Single-column accreditation and 2x2 responsive subject slot cards.
  - Live Exam Workspace: Stacked layout with full-width question card and touch-friendly option rows (minimum 48px height, `touch-action: manipulation`).
  - Mobile Palette Navigation: Quick "📋 Palette Grid" jump button and automatic smooth-scroll to questions when grid numbers are tapped.
  - 4-Subject Tabs: 2x2 touch-friendly subject switcher with clear active highlights.
  - Official Result Slip: Centered crest, prominent aggregate score box, and horizontally scrollable tables.
- **Admin Control Centre (Port 4000)**:
  - Horizontal Swipeable Sticky Navigation: Converts the vertical admin sidebar into a thumb-scrollable top bar on mobile/tablets.
  - Touch-ready tables and KPI cards with zero clipping.
- **Modals & Calculator**:
  - Auto-centering, touch-friendly 48px calculator keys, and full-viewport adaptation.

---

## 🛠️ Architecture & Port Mapping

| Service | Port | File | Description |
| :--- | :--- | :--- | :--- |
| **Candidate CBT Portal** | `http://localhost:3000` | `frontend-server.js` | Candidate workstation portal (Restricted) |
| **Admin Control Centre & API** | `http://localhost:4000` | `backend-server.js` | Admin portal & REST API (Master Key: `ADMIN2026`) |
| **Dual-Port Orchestrator** | Concurrently starts `3000` & `4000` | `server.js` | Boots both servers simultaneously |

---

## 🚀 How to Run the Portal
```powershell
# Run both Frontend (3000) and Backend (4000) together:
node "C:\Users\DABELTECH\CBT PORTAL\server.js"

# Or using the Windows Batch Launchers:
# Double-click start-portal.bat, start-frontend.bat, or start-backend.bat
```

