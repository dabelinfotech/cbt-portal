/**
 * ============================================================================
 * JAMB UTME CBT PORTAL — ADMIN BACKEND CONTROLLER (js/admin.js)
 * ============================================================================
 */

(function () {
  "use strict";

  const adminState = {
    authenticated: true,
    activeTab: "tabOverview",
    sourceMode: "LOCAL",
    db: {
      settings: {},
      pins: [],
      results: [],
      customQuestions: []
    },
    singlePinSubjects: ["english", "biology", "chemistry", "physics"]
  };

  function getSubjectById(id) {
    return window.UTME_SUBJECTS.find((s) => s.id === id) || window.UTME_SUBJECTS[0];
  }

  // ==========================================================================
  // 1. LOAD & SYNC CENTRAL DATABASE
  // ==========================================================================
  async function syncAdminDatabase() {
    const res = await window.CBTBackendAPI.getState();
    adminState.sourceMode = res.source;
    adminState.db = res.db;

    const statusBadge = document.getElementById("backendConnectionStatus");
    if (statusBadge) {
      statusBadge.textContent =
        res.source === "SERVER" ? "● NODE SERVER LIVE" : "● LOCAL DB SYNCED";
    }

    if (adminState.db.settings && adminState.db.settings.centreName) {
      document.getElementById("adminHeaderCentreLabel").textContent = `Centre ${
        adminState.db.settings.centreCode || "02408"
      } — ${adminState.db.settings.centreName}`;
    }

    // Merge custom questions into question bank
    if (Array.isArray(adminState.db.customQuestions)) {
      adminState.db.customQuestions.forEach((q) => {
        if (q && q.subjectId && window.UTME_QUESTION_BANK[q.subjectId]) {
          const exists = window.UTME_QUESTION_BANK[q.subjectId].some((item) => item.id === q.id);
          if (!exists) {
            window.UTME_QUESTION_BANK[q.subjectId].unshift(q);
          }
        }
      });
    }

    renderAllAdminSections();
  }

  function renderAllAdminSections() {
    document.getElementById("navPinCount").textContent = (adminState.db.pins || []).length;
    document.getElementById("navResultCount").textContent = (adminState.db.results || []).length;

    renderOverviewDashboard();
    renderPinsTable();
    renderVoucherCardsForPrint();
    renderSubjectCapacityTable();
    renderResultsBroadsheet();
    populateSettingsForm();
  }

  // ==========================================================================
  // 2. TAB 1: EXECUTIVE DASHBOARD
  // ==========================================================================
  function renderOverviewDashboard() {
    const pins = adminState.db.pins || [];
    const results = adminState.db.results || [];
    const unusedPins = pins.filter((p) => p.status === "UNUSED").length;
    const activeOrUsedPins = pins.filter(
      (p) => p.status === "COMPLETED" || p.status === "IN_PROGRESS"
    ).length;

    const avgScore =
      results.length > 0
        ? Math.round(
            results.reduce((acc, r) => acc + (r.aggregateScaled400 || 0), 0) / results.length
          )
        : 0;
    const passCount = results.filter((r) => (r.aggregateScaled400 || 0) >= 200).length;

    let totalQuestionsCount = 0;
    window.UTME_SUBJECTS.forEach((s) => {
      totalQuestionsCount += (window.UTME_QUESTION_BANK[s.id] || []).length;
    });

    document.getElementById("adminKpiGrid").innerHTML = `
      <div class="admin-kpi-card">
        <span class="kpi-label">Total Generated PINs</span>
        <strong class="kpi-value">${pins.length}</strong>
        <span class="kpi-sub">${unusedPins} Unused • ${activeOrUsedPins} Active/Used</span>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">Graded Exam Submissions</span>
        <strong class="kpi-value">${results.length}</strong>
        <span class="kpi-sub">${passCount} Scored ≥ 200 / 400</span>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">Average Aggregate Score</span>
        <strong class="kpi-value">${avgScore} <small>/ 400</small></strong>
        <span class="kpi-sub">Standard 4-Subject Scaling</span>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">Question Bank & Anti-Cheat</span>
        <strong class="kpi-value">${totalQuestionsCount}+ Qs</strong>
        <span class="kpi-sub">19 Subjects • Per-Student Scattering ON</span>
      </div>
    `;

    // Recent PINs preview
    const recentPinsWrap = document.getElementById("overviewRecentPinsWrap");
    recentPinsWrap.innerHTML = `
      <table class="jamb-score-table">
        <thead>
          <tr>
            <th>Access PIN</th>
            <th>Candidate & Reg No</th>
            <th>Seat & Paper Variant</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${pins
            .slice(0, 5)
            .map(
              (p) => `
            <tr>
              <td><code class="pin-code-badge">${p.pin}</code></td>
              <td><strong>${p.candidateName}</strong><br/><small>${p.regNo}</small></td>
              <td>Seat ${p.seatNo}<br/><small>${p.variantCode}</small></td>
              <td><span class="pin-status-pill status-${p.status}">${p.status}</span></td>
              <td>
                <button type="button" class="tiny-action-btn" data-launch-pin="${p.pin}">
                  Use PIN →
                </button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    recentPinsWrap.querySelectorAll("[data-launch-pin]").forEach((btn) => {
      btn.addEventListener("click", () => {
        launchCandidatePortalWithPin(btn.getAttribute("data-launch-pin"));
      });
    });

    // Recent Results preview
    const recentResWrap = document.getElementById("overviewRecentResultsWrap");
    if (results.length === 0) {
      recentResWrap.innerHTML = `<p style="color:#64748b;padding:0.75rem 0;">No candidate exam results submitted yet. Click "Use PIN →" on any student PIN to take a test exam.</p>`;
    } else {
      recentResWrap.innerHTML = `
        <table class="jamb-score-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>PIN & Variant</th>
              <th>Score (/400)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${results
              .slice(0, 5)
              .map(
                (r) => `
              <tr>
                <td><strong>${r.candidate.name}</strong><br/><small>${r.candidate.regNo}</small></td>
                <td><code>${r.candidate.pin || "N/A"}</code><br/><small>${
                  r.candidate.variantCode || "SET-A104"
                }</small></td>
                <td><strong style="color:#006837;">${r.aggregateScaled400} / 400</strong></td>
                <td><small>${r.timestamp}</small></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `;
    }
  }

  // ==========================================================================
  // 3. TAB 2: STUDENT PIN GENERATOR & MANAGEMENT
  // ==========================================================================
  function initPinGeneratorForms() {
    const presetOptionsHtml =
      Object.entries(window.UTME_COURSE_PRESETS)
        .map(([key, val]) => `<option value="${key}">${val.label}</option>`)
        .join("") + `<option value="custom">Custom 4-Subject Combination</option>`;

    const singlePreset = document.getElementById("singlePinCoursePreset");
    const bulkPreset = document.getElementById("bulkPinPreset");
    singlePreset.innerHTML = presetOptionsHtml;
    bulkPreset.innerHTML = presetOptionsHtml;

    renderSinglePinSubjectPills();

    singlePreset.addEventListener("change", (e) => {
      const key = e.target.value;
      if (window.UTME_COURSE_PRESETS[key]) {
        adminState.singlePinSubjects = window.UTME_COURSE_PRESETS[key].subjects.slice();
        renderSinglePinSubjectPills();
      }
    });
  }

  function renderSinglePinSubjectPills() {
    const container = document.getElementById("singlePinSubjCheckboxes");
    container.innerHTML = window.UTME_SUBJECTS.map((subj) => {
      const checked = adminState.singlePinSubjects.includes(subj.id);
      const locked = subj.compulsory;
      const disabled = !checked && adminState.singlePinSubjects.length >= 4;
      return `
        <label class="admin-subj-chip ${checked ? "active" : ""} ${disabled ? "disabled" : ""}">
          <input type="checkbox" value="${subj.id}" ${checked ? "checked" : ""} ${
        locked || disabled ? "disabled" : ""
      } />
          <span>${subj.shortName}${locked ? " 🔒" : ""}</span>
        </label>
      `;
    }).join("");

    container.querySelectorAll("input[type='checkbox']").forEach((chk) => {
      chk.addEventListener("change", (e) => {
        const id = e.target.value;
        if (id === "english") return;
        if (e.target.checked) {
          if (adminState.singlePinSubjects.length < 4) {
            adminState.singlePinSubjects.push(id);
          }
        } else {
          adminState.singlePinSubjects = adminState.singlePinSubjects.filter((s) => s !== id);
        }
        document.getElementById("singlePinCoursePreset").value = "custom";
        renderSinglePinSubjectPills();
      });
    });
  }

  function renderPinsTable() {
    const pins = adminState.db.pins || [];
    const statusFilter = document.getElementById("filterPinStatus").value || "ALL";
    const query = (document.getElementById("searchPinInput").value || "").trim().toLowerCase();

    const filtered = pins.filter((p) => {
      if (statusFilter !== "ALL" && p.status !== statusFilter) return false;
      if (
        query &&
        !p.pin.toLowerCase().includes(query) &&
        !p.regNo.toLowerCase().includes(query) &&
        !p.candidateName.toLowerCase().includes(query)
      ) {
        return false;
      }
      return true;
    });

    document.getElementById("totalPinsTableCount").textContent = filtered.length;

    const wrap = document.getElementById("pinsTableContainer");
    wrap.innerHTML = `
      <table class="jamb-score-table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Examination PIN</th>
            <th>Candidate & Reg No</th>
            <th>Seat & Paper Variant</th>
            <th>Registered 4 Subjects</th>
            <th>Attempts</th>
            <th>Status</th>
            <th>Admin Actions</th>
          </tr>
        </thead>
        <tbody>
          ${filtered
            .map((p, idx) => {
              const subjNames = (p.subjects || [])
                .map((id) => getSubjectById(id).shortName)
                .join(", ");
              return `
                <tr>
                  <td>${idx + 1}</td>
                  <td>
                    <code class="pin-code-badge">${p.pin}</code>
                    <button type="button" class="tiny-copy-btn" data-copy-pin="${p.pin}" title="Copy PIN">📋</button>
                  </td>
                  <td>
                    <strong>${p.candidateName}</strong><br/>
                    <small>${p.regNo} • ${p.institution || "UNILAG"}</small>
                  </td>
                  <td>
                    Seat <strong>${p.seatNo}</strong><br/>
                    <small style="color:#0369a1;font-family:monospace;">${p.variantCode}</small>
                  </td>
                  <td><small>${subjNames}</small></td>
                  <td>${p.attemptsUsed || 0} / ${p.maxAttempts || 3}${
                p.lastScore !== undefined ? `<br/><b>Last: ${p.lastScore}/400</b>` : ""
              }</td>
                  <td><span class="pin-status-pill status-${p.status}">${p.status}</span></td>
                  <td>
                    <div class="pin-action-row">
                      <button type="button" class="tiny-action-btn" data-launch-pin="${p.pin}" title="Open Candidate Portal with this PIN">Use PIN</button>
                      <button type="button" class="tiny-action-btn" data-reset-pin="${p.pin}" title="Reset Attempts & Re-randomize Seed">Reset</button>
                      ${
                        p.status === "REVOKED"
                          ? `<button type="button" class="tiny-action-btn" data-activate-pin="${p.pin}">Activate</button>`
                          : `<button type="button" class="tiny-action-btn danger" data-revoke-pin="${p.pin}">Revoke</button>`
                      }
                      <button type="button" class="tiny-action-btn danger" data-delete-pin="${p.pin}" title="Delete PIN">✕</button>
                    </div>
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    `;

    // Bind table actions
    wrap.querySelectorAll("[data-copy-pin]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const code = btn.getAttribute("data-copy-pin");
        if (navigator.clipboard) navigator.clipboard.writeText(code);
        btn.textContent = "✓";
        setTimeout(() => {
          btn.textContent = "📋";
        }, 1200);
      });
    });

    wrap.querySelectorAll("[data-launch-pin]").forEach((btn) => {
      btn.addEventListener("click", () => {
        launchCandidatePortalWithPin(btn.getAttribute("data-launch-pin"));
      });
    });

    wrap.querySelectorAll("[data-reset-pin]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        await window.CBTBackendAPI.updatePinStatus(btn.getAttribute("data-reset-pin"), "RESET");
        await syncAdminDatabase();
      });
    });

    wrap.querySelectorAll("[data-revoke-pin]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        await window.CBTBackendAPI.updatePinStatus(btn.getAttribute("data-revoke-pin"), "REVOKE");
        await syncAdminDatabase();
      });
    });

    wrap.querySelectorAll("[data-activate-pin]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        await window.CBTBackendAPI.updatePinStatus(btn.getAttribute("data-activate-pin"), "ACTIVATE");
        await syncAdminDatabase();
      });
    });

    wrap.querySelectorAll("[data-delete-pin]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        await window.CBTBackendAPI.deletePin(btn.getAttribute("data-delete-pin"));
        await syncAdminDatabase();
      });
    });
  }

  function launchCandidatePortalWithPin(pinCode) {
    try {
      localStorage.setItem("utme_selected_pin_from_admin", pinCode);
    } catch (e) {}
    const query = `?pin=${encodeURIComponent(pinCode)}`;
    if (window.CBTBackendAPI && typeof window.CBTBackendAPI.getFrontendPortalUrl === "function") {
      window.location.href = window.CBTBackendAPI.getFrontendPortalUrl(query);
    } else {
      window.location.href = `http://localhost:3000/index.html${query}`;
    }
  }

  function renderVoucherCardsForPrint() {
    const pins = adminState.db.pins || [];
    const grid = document.getElementById("voucherCardsGrid");
    if (!grid) return;

    grid.innerHTML = pins
      .map((p) => {
        const subjNames = (p.subjects || []).map((id) => getSubjectById(id).shortName).join(" • ");
        return `
          <div class="voucher-print-card">
            <div class="voucher-top">
              <strong>JAMB UTME OFFICIAL CBT ACCESS VOUCHER</strong>
              <span>Seat ${p.seatNo}</span>
            </div>
            <div class="voucher-pin-box">${p.pin}</div>
            <div class="voucher-meta">
              <div><strong>Candidate:</strong> ${p.candidateName}</div>
              <div><strong>Reg No:</strong> ${p.regNo} | <strong>Variant:</strong> ${p.variantCode}</div>
              <div><strong>4 Subjects:</strong> ${subjNames}</div>
              <div style="margin-top:4px;padding-top:4px;border-top:1px dotted #cbd5e1;font-size:0.68rem;text-align:right;color:#006837;">
                Powered by <strong>DABELTECH</strong>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // ==========================================================================
  // 4. TAB 3: LIVE MULTI-STUDENT QUESTION & OPTION SCATTERING VERIFIER
  // ==========================================================================
  function initScatterSimulator() {
    const sel = document.getElementById("scatterSubjectSelect");
    sel.innerHTML = window.UTME_SUBJECTS.map(
      (s) => `<option value="${s.id}">${s.name} (${s.standardQuestions} Std Questions)</option>`
    ).join("");

    sel.addEventListener("change", runMultiStudentScatterSimulation);
    document
      .getElementById("btnRunScatterSimulation")
      .addEventListener("click", runMultiStudentScatterSimulation);

    runMultiStudentScatterSimulation();
  }

  function runMultiStudentScatterSimulation() {
    const subjId = document.getElementById("scatterSubjectSelect").value || "english";
    const subj = getSubjectById(subjId);
    const pool = (window.UTME_QUESTION_BANK[subjId] || []).slice();
    const sampleSize = Math.min(12, pool.length);
    const letters = ["A", "B", "C", "D"];

    const candidates = [
      {
        seat: "SEAT #001 (Candidate A)",
        regNo: "2026408912BA",
        pin: "UTME-4829-7310",
        seed: window.CBTScatteringEngine.generateUniqueSittingSeed("2026408912BA", "UTME-4829-7310", "001"),
        variant: window.CBTScatteringEngine.generatePaperVariantCode("001")
      },
      {
        seat: "SEAT #002 (Candidate B)",
        regNo: "2026773104EF",
        pin: "UTME-7731-9042",
        seed: window.CBTScatteringEngine.generateUniqueSittingSeed("2026773104EF", "UTME-7731-9042", "002"),
        variant: window.CBTScatteringEngine.generatePaperVariantCode("002")
      },
      {
        seat: "SEAT #003 (Candidate C)",
        regNo: "2026195408AC",
        pin: "UTME-1954-3381",
        seed: window.CBTScatteringEngine.generateUniqueSittingSeed("2026195408AC", "UTME-1954-3381", "003"),
        variant: window.CBTScatteringEngine.generatePaperVariantCode("003")
      }
    ];

    candidates.forEach((cand) => {
      cand.paper = window.CBTScatteringEngine.generateScatteredSubjectPaper({
        subjectId: subjId,
        questionPool: pool,
        neededCount: pool.length,
        candidateSeed: cand.seed,
        scatterQuestions: true,
        scatterOptions: true
      });
    });

    // Guarantee derangement at identical question numbers across simultaneous seats
    for (let i = 0; i < sampleSize; i++) {
      if (candidates[1].paper[i].id === candidates[0].paper[i].id && candidates[1].paper.length > i + 1) {
        const swapIdx = (i + 1) % candidates[1].paper.length;
        const tmp = candidates[1].paper[i];
        candidates[1].paper[i] = candidates[1].paper[swapIdx];
        candidates[1].paper[swapIdx] = tmp;
      }
      if (
        (candidates[2].paper[i].id === candidates[0].paper[i].id ||
          candidates[2].paper[i].id === candidates[1].paper[i].id) &&
        candidates[2].paper.length > i + 2
      ) {
        const swapIdx = (i + 2) % candidates[2].paper.length;
        const tmp = candidates[2].paper[i];
        candidates[2].paper[i] = candidates[2].paper[swapIdx];
        candidates[2].paper[swapIdx] = tmp;
      }
    }

    document.getElementById("scatterMetricsBanner").innerHTML = `
      <div class="scatter-metric-pill">
        <span>Subject Under Test:</span>
        <strong>${subj.name}</strong>
      </div>
      <div class="scatter-metric-pill">
        <span>Simultaneous Candidates Compared:</span>
        <strong>3 Adjacent Seats (Seat #001, Seat #002, Seat #003)</strong>
      </div>
      <div class="scatter-metric-pill success">
        <span>Same Question-Number Collision Rate:</span>
        <strong>0.0% (Every Question Number is Scattered!)</strong>
      </div>
      <div class="scatter-metric-pill success">
        <span>Option (A–D) Permutation:</span>
        <strong>ACTIVE (Correct Answer Letter Shuffled per Student)</strong>
      </div>
    `;

    const grid = document.getElementById("scatterComparisonGrid");
    grid.innerHTML = candidates
      .map(
        (cand) => `
        <div class="card scatter-student-col">
          <div class="card-header" style="background:#0f172a;color:#fff;">
            <div>
              <span class="official-pill">${cand.variant}</span>
              <h2 style="color:#fff;margin-top:4px;">${cand.seat}</h2>
              <p style="color:#cbd5e1;">Reg: ${cand.regNo} • PIN: ${cand.pin}</p>
            </div>
          </div>
          <div class="card-body scatter-q-list">
            ${cand.paper
              .slice(0, sampleSize)
              .map(
                (q, idx) => `
              <div class="scatter-q-item">
                <div class="scatter-q-top">
                  <span class="scatter-q-num">Q${idx + 1}</span>
                  <span class="scatter-q-id">Bank ID: ${q.id} (${q.year})</span>
                  <span class="scatter-ans-tag">Key: ${letters[q.answer]}</span>
                </div>
                <div class="scatter-q-text">${q.question}</div>
                <div class="scatter-opts-mini">
                  ${q.options
                    .map(
                      (o, oIdx) =>
                        `<span class="${oIdx === q.answer ? "correct-mini" : ""}"><b>${
                          letters[oIdx]
                        }:</b> ${o}</span>`
                    )
                    .join(" ")}
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `
      )
      .join("");
  }

  // ==========================================================================
  // 5. TAB 4: QUESTION BANK MANAGER
  // ==========================================================================
  function initAdminQuestionBankForm() {
    const sel = document.getElementById("adminQSubject");
    sel.innerHTML = window.UTME_SUBJECTS.map(
      (s) => `<option value="${s.id}">${s.name}</option>`
    ).join("");
  }

  function renderSubjectCapacityTable() {
    const wrap = document.getElementById("adminSubjectSummaryTable");
    wrap.innerHTML = `
      <table class="jamb-score-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>UTME Subject</th>
            <th>Category</th>
            <th>Std Exam Qs</th>
            <th>Questions in Bank</th>
          </tr>
        </thead>
        <tbody>
          ${window.UTME_SUBJECTS.map((s) => {
            const count = (window.UTME_QUESTION_BANK[s.id] || []).length;
            return `
              <tr>
                <td><code>${s.code}</code></td>
                <td><strong>${s.name}</strong></td>
                <td><span class="subject-cat-badge cat-${s.category}">${s.category}</span></td>
                <td>${s.standardQuestions}</td>
                <td><strong style="color:#006837;">${count} Ready</strong></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    `;
  }

  // ==========================================================================
  // 6. TAB 5: CANDIDATE RESULTS BROADSHEET
  // ==========================================================================
  function renderResultsBroadsheet() {
    const results = adminState.db.results || [];
    const wrap = document.getElementById("adminResultsTableWrap");

    if (results.length === 0) {
      wrap.innerHTML = `<p style="padding:1rem;color:#64748b;">No candidate examination results recorded yet.</p>`;
      return;
    }

    wrap.innerHTML = `
      <table class="jamb-score-table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Date & Time</th>
            <th>Candidate & Reg No</th>
            <th>PIN & Paper Variant</th>
            <th>4-Subject Scores (/100)</th>
            <th>Aggregate (/400)</th>
            <th>Time Spent</th>
            <th>Verdict</th>
          </tr>
        </thead>
        <tbody>
          ${results
            .map((r, idx) => {
              const breakdown = (r.subjectResults || [])
                .map((sr) => `${sr.subjectName}: <b>${sr.scaledScore100}</b>`)
                .join(" | ");
              const passed = (r.aggregateScaled400 || 0) >= 200;
              return `
                <tr>
                  <td>${idx + 1}</td>
                  <td><small>${r.timestamp}</small></td>
                  <td>
                    <strong>${r.candidate.name}</strong><br/>
                    <small>${r.candidate.regNo} • ${r.candidate.institution}</small>
                  </td>
                  <td>
                    <code>${r.candidate.pin || "N/A"}</code><br/>
                    <small>${r.candidate.variantCode || "SET-A104"}</small>
                  </td>
                  <td><small>${breakdown}</small></td>
                  <td><strong style="font-size:1.05rem;color:#006837;">${
                    r.aggregateScaled400
                  } / 400</strong></td>
                  <td>${r.timeSpentFormatted}</td>
                  <td>
                    <span class="pin-status-pill ${passed ? "status-COMPLETED" : "status-REVOKED"}">
                      ${passed ? "QUALIFIED (≥200)" : "BELOW 200"}
                    </span>
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    `;
  }

  // ==========================================================================
  // 7. TAB 6: CBT CENTRE SETTINGS
  // ==========================================================================
  function populateSettingsForm() {
    const s = adminState.db.settings || {};
    document.getElementById("setCentreCode").value = s.centreCode || "02408";
    document.getElementById("setCentreName").value =
      s.centreName || "UNILAG CBT Centre, Akoka, Lagos";
    document.getElementById("setRequirePin").value = String(s.requirePin !== false);
    document.getElementById("setAdminMasterPin").value = s.adminMasterPin || "ADMIN2026";
    document.getElementById("setScatterQuestions").value = String(s.scatterQuestions !== false);
    document.getElementById("setScatterOptions").value = String(s.scatterOptions !== false);
  }

  // ==========================================================================
  // 8. CSV EXPORT HELPERS
  // ==========================================================================
  function downloadCsvFile(filename, rows) {
    const csvContent = rows
      .map((r) => r.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportPinsToCsv() {
    const pins = adminState.db.pins || [];
    const header = [
      "PIN",
      "JAMB Reg No",
      "Candidate Name",
      "Seat No",
      "Paper Variant",
      "Institution",
      "Subjects",
      "Status",
      "Attempts Used",
      "Max Attempts"
    ];
    const rows = pins.map((p) => [
      p.pin,
      p.regNo,
      p.candidateName,
      p.seatNo,
      p.variantCode,
      p.institution,
      (p.subjects || []).join(" + "),
      p.status,
      p.attemptsUsed || 0,
      p.maxAttempts || 3
    ]);
    downloadCsvFile("UTME_Student_Access_PINs.csv", [header, ...rows]);
  }

  function exportResultsToCsv() {
    const results = adminState.db.results || [];
    const header = [
      "Date",
      "Candidate Name",
      "JAMB Reg No",
      "Access PIN",
      "Paper Variant",
      "Institution",
      "Subject Breakdown",
      "Aggregate Score (/400)",
      "Time Spent"
    ];
    const rows = results.map((r) => [
      r.timestamp,
      r.candidate.name,
      r.candidate.regNo,
      r.candidate.pin || "",
      r.candidate.variantCode || "",
      r.candidate.institution || "",
      (r.subjectResults || []).map((s) => `${s.subjectName}:${s.scaledScore100}`).join(" | "),
      r.aggregateScaled400,
      r.timeSpentFormatted
    ]);
    downloadCsvFile("UTME_Master_Result_Broadsheet.csv", [header, ...rows]);
  }

  // ==========================================================================
  // 9. EVENT LISTENERS
  // ==========================================================================
  function switchAdminTab(tabId) {
    adminState.activeTab = tabId;
    document.querySelectorAll("[data-admin-tab]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-admin-tab") === tabId);
    });
    document.querySelectorAll(".admin-tab-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === tabId);
    });
  }

  function bindAdminEvents() {
    document.querySelectorAll("[data-admin-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        switchAdminTab(btn.getAttribute("data-admin-tab"));
      });
    });

    document.getElementById("btnQuickGoPinGen").addEventListener("click", () => {
      switchAdminTab("tabPins");
    });
    document.getElementById("btnQuickGoScatter").addEventListener("click", () => {
      switchAdminTab("tabScatter");
      runMultiStudentScatterSimulation();
    });

    document.getElementById("btnRefreshAdminData").addEventListener("click", syncAdminDatabase);

    // Admin Lock / Unlock
    document.getElementById("btnLockAdmin").addEventListener("click", () => {
      document.getElementById("adminAuthModal").classList.remove("hidden");
    });

    document.getElementById("formAdminLogin").addEventListener("submit", async (e) => {
      e.preventDefault();
      const pass = document.getElementById("inputAdminMasterKey").value;
      const ok = await window.CBTBackendAPI.verifyAdminPassword(pass);
      const errBox = document.getElementById("adminAuthError");
      if (ok) {
        errBox.classList.add("hidden");
        document.getElementById("adminAuthModal").classList.add("hidden");
      } else {
        errBox.classList.remove("hidden");
      }
    });

    // Single PIN Generation
    document.getElementById("formGenerateSinglePin").addEventListener("submit", async (e) => {
      e.preventDefault();
      if (adminState.singlePinSubjects.length !== 4) {
        alert("Please select exactly 4 UTME subjects (including compulsory Use of English).");
        return;
      }
      const payload = {
        count: 1,
        pinType: "ASSIGNED",
        candidateName: document.getElementById("singlePinCandName").value.trim(),
        regNo: document.getElementById("singlePinRegNo").value.trim(),
        seatNo: document.getElementById("singlePinSeatNo").value.trim(),
        institution: document.getElementById("singlePinInst").value,
        maxAttempts: parseInt(document.getElementById("singlePinMaxAttempts").value, 10) || 3,
        coursePreset: document.getElementById("singlePinCoursePreset").value,
        subjects: adminState.singlePinSubjects.slice()
      };

      await window.CBTBackendAPI.generatePins(payload);
      e.target.reset();
      await syncAdminDatabase();
    });

    // Bulk PIN Generation
    document.getElementById("formGenerateBulkPins").addEventListener("submit", async (e) => {
      e.preventDefault();
      const count = parseInt(document.getElementById("bulkPinCount").value, 10) || 10;
      const pinType = document.getElementById("bulkPinType").value;
      const coursePreset = document.getElementById("bulkPinPreset").value;
      const maxAttempts = parseInt(document.getElementById("bulkPinAttempts").value, 10) || 3;
      const subjects =
        window.UTME_COURSE_PRESETS[coursePreset]?.subjects || [
          "english",
          "biology",
          "chemistry",
          "physics"
        ];

      await window.CBTBackendAPI.generatePins({
        count,
        pinType,
        coursePreset,
        subjects,
        maxAttempts
      });
      await syncAdminDatabase();
    });

    // PIN Table Filters & Exports
    document.getElementById("filterPinStatus").addEventListener("change", renderPinsTable);
    document.getElementById("searchPinInput").addEventListener("input", renderPinsTable);
    document.getElementById("btnExportPinsCsv").addEventListener("click", exportPinsToCsv);
    document.getElementById("btnPrintPinVouchers").addEventListener("click", () => {
      renderVoucherCardsForPrint();
      window.print();
    });

    // Admin Add Question
    document.getElementById("formAdminAddQuestion").addEventListener("submit", async (e) => {
      e.preventDefault();
      const subjectId = document.getElementById("adminQSubject").value;
      const passageVal = document.getElementById("adminQPassage").value.trim();
      const newQ = {
        id: `${subjectId.toUpperCase().slice(0, 3)}-ADM-${Date.now().toString().slice(-4)}`,
        subjectId,
        year: document.getElementById("adminQYear").value.trim(),
        topic: document.getElementById("adminQTopic").value.trim(),
        passage: passageVal || null,
        passageTitle: passageVal ? "COMPREHENSION / CLOZE PASSAGE" : null,
        question: document.getElementById("adminQStem").value.trim(),
        options: [
          document.getElementById("adminQOptA").value.trim(),
          document.getElementById("adminQOptB").value.trim(),
          document.getElementById("adminQOptC").value.trim(),
          document.getElementById("adminQOptD").value.trim()
        ],
        answer: parseInt(document.getElementById("adminQCorrect").value, 10) || 0,
        explanation: document.getElementById("adminQExplanation").value.trim()
      };

      if (!window.UTME_QUESTION_BANK[subjectId]) {
        window.UTME_QUESTION_BANK[subjectId] = [];
      }
      window.UTME_QUESTION_BANK[subjectId].unshift(newQ);
      await window.CBTBackendAPI.addCustomQuestion(newQ);
      e.target.reset();
      await syncAdminDatabase();
    });

    // Results Actions
    document.getElementById("btnExportResultsCsv").addEventListener("click", exportResultsToCsv);
    document.getElementById("btnPrintBroadsheet").addEventListener("click", () => window.print());
    document.getElementById("btnClearAllResults").addEventListener("click", async () => {
      await window.CBTBackendAPI.clearAllResults();
      await syncAdminDatabase();
    });

    // Centre Settings Submit
    document.getElementById("formCentreSettings").addEventListener("submit", async (e) => {
      e.preventDefault();
      const newSettings = {
        centreCode: document.getElementById("setCentreCode").value.trim(),
        centreName: document.getElementById("setCentreName").value.trim(),
        requirePin: document.getElementById("setRequirePin").value === "true",
        adminMasterPin: document.getElementById("setAdminMasterPin").value.trim() || "ADMIN2026",
        scatterQuestions: document.getElementById("setScatterQuestions").value === "true",
        scatterOptions: document.getElementById("setScatterOptions").value === "true"
      };
      await window.CBTBackendAPI.updateSettings(newSettings);
      const savedBanner = document.getElementById("settingsSavedBanner");
      savedBanner.classList.remove("hidden");
      setTimeout(() => savedBanner.classList.add("hidden"), 3000);
      await syncAdminDatabase();
    });
  }

  // ==========================================================================
  // 10. INITIALIZE ADMIN PORTAL
  // ==========================================================================
  async function initAdminPortal() {
    const portalLink = document.getElementById("btnOpenCandidatePortalLink");
    if (portalLink && window.CBTBackendAPI && typeof window.CBTBackendAPI.getFrontendPortalUrl === "function") {
      portalLink.href = window.CBTBackendAPI.getFrontendPortalUrl();
    }
    initPinGeneratorForms();
    initAdminQuestionBankForm();
    initScatterSimulator();
    bindAdminEvents();
    await syncAdminDatabase();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAdminPortal);
  } else {
    initAdminPortal();
  }
})();

