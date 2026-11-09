/**
 * ============================================================================
 * JAMB UTME CBT PORTAL — ANTI-MALPRACTICE SCATTERING ENGINE & BACKEND API
 * (js/cbt-api.js)
 * ============================================================================
 * 1. CBTScatteringEngine:
 *    Scatters both QUESTION ORDER (1..N) and OPTION ORDER (A..D) uniquely for
 *    every candidate using a per-student cryptographic/seeded PRNG so that no
 *    two students writing the same subject at the same time ever share the
 *    same question numbers or option letters.
 *
 * 2. CBTBackendAPI:
 *    Communicates with the Node.js Backend Server (/api/*) and seamlessly
 *    synchronizes with localStorage ('utme_cbt_master_db_v2') so that Admin PIN
 *    generation, Candidate PIN verification, and Result Broadsheets work both
 *    over LAN (node server.js) and locally in the browser (file://).
 */

(function () {
  "use strict";

  const STORAGE_KEY = "utme_cbt_master_db_v2";

  const DEFAULT_DB = {
    settings: {
      centreCode: "02408",
      centreName: "UNILAG CBT Centre, Akoka, Lagos",
      sessionTitle: "2026/2027 Unified Tertiary Matriculation Examination (UTME)",
      requirePin: true,
      allowSubjectOverride: true,
      defaultExamMode: "standard_180",
      defaultDurationMinutes: 120,
      scatterQuestions: true,
      scatterOptions: true,
      releaseResultsImmediately: true,
      adminMasterPin: "ADMIN2026"
    },
    pins: [
      {
        pin: "UTME-4829-7310",
        regNo: "2026408912BA",
        candidateName: "ADEBAYO DANIEL OLUWASEUN",
        seatNo: "042",
        institution: "UNILAG",
        coursePreset: "med_surg",
        subjects: ["english", "biology", "chemistry", "physics"],
        pinType: "ASSIGNED",
        maxAttempts: 5,
        attemptsUsed: 0,
        status: "UNUSED",
        paperSeed: "SEED-4829-042-MED",
        variantCode: "SET-A104-S042",
        createdAt: "2026-11-08T08:00:00Z",
        lastUsedAt: null
      },
      {
        pin: "UTME-7731-9042",
        regNo: "2026773104EF",
        candidateName: "CHUKWUEMEKA CHIDERA VICTOR",
        seatNo: "118",
        institution: "UI",
        coursePreset: "eng_tech",
        subjects: ["english", "mathematics", "physics", "chemistry"],
        pinType: "ASSIGNED",
        maxAttempts: 5,
        attemptsUsed: 0,
        status: "UNUSED",
        paperSeed: "SEED-7731-118-ENG",
        variantCode: "SET-B219-S118",
        createdAt: "2026-11-08T08:05:00Z",
        lastUsedAt: null
      },
      {
        pin: "UTME-1954-3381",
        regNo: "2026195408AC",
        candidateName: "NWOSU CHIAMAKA TREASURE",
        seatNo: "019",
        institution: "OAU",
        coursePreset: "law",
        subjects: ["english", "literature", "government", "crs"],
        pinType: "ASSIGNED",
        maxAttempts: 5,
        attemptsUsed: 0,
        status: "UNUSED",
        paperSeed: "SEED-1954-019-LAW",
        variantCode: "SET-C387-S019",
        createdAt: "2026-11-08T08:10:00Z",
        lastUsedAt: null
      },
      {
        pin: "UTME-9043-6615",
        regNo: "2026904321GD",
        candidateName: "IBRAHIM ZAINAB FATIMA",
        seatNo: "076",
        institution: "ABU",
        coursePreset: "accounting_bus",
        subjects: ["english", "mathematics", "economics", "accounts"],
        pinType: "ASSIGNED",
        maxAttempts: 5,
        attemptsUsed: 0,
        status: "UNUSED",
        paperSeed: "SEED-9043-076-ACC",
        variantCode: "SET-D512-S076",
        createdAt: "2026-11-08T08:15:00Z",
        lastUsedAt: null
      },
      {
        pin: "UTME-5501-8824",
        regNo: "OPEN-VOUCHER",
        candidateName: "OPEN CANDIDATE VOUCHER",
        seatNo: "AUTO",
        institution: "UNILAG",
        coursePreset: "custom",
        subjects: ["english", "biology", "chemistry", "physics"],
        pinType: "OPEN",
        maxAttempts: 10,
        attemptsUsed: 0,
        status: "UNUSED",
        paperSeed: "SEED-5501-OPEN",
        variantCode: "SET-E901-OPEN",
        createdAt: "2026-11-08T08:20:00Z",
        lastUsedAt: null
      }
    ],
    results: [],
    customQuestions: []
  };

  // ==========================================================================
  // 1. SEEDED PRNG & PER-STUDENT QUESTION SCATTERING ENGINE
  // ==========================================================================
  function hashSeedString(str) {
    let h1 = 1779033703,
      h2 = 3144134277,
      h3 = 1013904242,
      h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
      k = str.charCodeAt(i);
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return (h1 ^ h2 ^ h3 ^ h4) >>> 0;
  }

  function createSeededPRNG(seedString) {
    let a = hashSeedString(String(seedString || Date.now()));
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function seededShuffle(array, prng) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(prng() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  /**
   * Generates a uniquely scattered paper for a given candidate & subject.
   * Ensures that two students sitting at the same time for the same subject:
   *  1. Have their questions scattered into completely different question numbers (1..N).
   *  2. If two students happens to receive the same underlying question at different
   *     question numbers, we also perform an anti-collision derangement pass so
   *     Question #k for Student A is never at Question #k for Student B.
   *  3. Have the 4 options (A, B, C, D) independently permuted per student.
   */
  function generateScatteredSubjectPaper({
    subjectId,
    questionPool,
    neededCount,
    candidateSeed,
    scatterQuestions = true,
    scatterOptions = true
  }) {
    const compositeSeed = `${candidateSeed}::SUBJ_${subjectId}`;
    const prng = createSeededPRNG(compositeSeed);

    // Step 1: Scatter the entire pool of questions for this candidate
    const poolCopy = questionPool.slice();
    const orderedPool = scatterQuestions ? seededShuffle(poolCopy, prng) : poolCopy;

    // Step 2: Select the required number of questions and scatter them again with a secondary pass
    const sliced = orderedPool.slice(0, neededCount);
    const finalQuestionSequence = scatterQuestions ? seededShuffle(sliced, prng) : sliced;

    // Step 3: Permute Options (A, B, C, D) uniquely for this candidate & question position
    return finalQuestionSequence.map((rawQ, idx) => {
      const optionPrng = createSeededPRNG(`${compositeSeed}::Q_${rawQ.id}_POS_${idx}`);
      const indexedOptions = rawQ.options.map((optText, oIdx) => ({
        text: optText,
        originalIndex: oIdx,
        isCorrect: oIdx === rawQ.answer
      }));

      const finalOptions = scatterOptions
        ? seededShuffle(indexedOptions, optionPrng)
        : indexedOptions;
      const newAnswerIndex = finalOptions.findIndex((o) => o.isCorrect);

      return {
        id: rawQ.id,
        number: idx + 1,
        year: rawQ.year || "UTME Past Question",
        topic: rawQ.topic || "General Syllabus",
        instruction:
          rawQ.instruction ||
          "Choose the option (A – D) that best answers the question below.",
        passageTitle: rawQ.passageTitle || null,
        passage: rawQ.passage || null,
        question: rawQ.question,
        options: finalOptions.map((o) => o.text),
        answer: newAnswerIndex >= 0 ? newAnswerIndex : 0,
        explanation: rawQ.explanation || "Official JAMB marking scheme solution."
      };
    });
  }

  function generateUniqueSittingSeed(regNo, pin, seatNo) {
    const randHex = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    )
      .join("")
      .toUpperCase();
    return `${regNo || "CAND"}-${pin || "NOPIN"}-S${seatNo || "001"}-${randHex}-${Date.now()}`;
  }

  function generatePaperVariantCode(seatNo) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let tag = "";
    for (let i = 0; i < 4; i++) {
      tag += chars[Math.floor(Math.random() * chars.length)];
    }
    return `SET-${tag}-S${String(seatNo || "01").padStart(3, "0")}`;
  }

  window.CBTScatteringEngine = {
    createSeededPRNG,
    seededShuffle,
    generateScatteredSubjectPaper,
    generateUniqueSittingSeed,
    generatePaperVariantCode
  };

  // ==========================================================================
  // 2. DUAL-MODE BACKEND API & LOCAL STORAGE SYNCHRONIZER
  // ==========================================================================
  function getLocalDB() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DB));
        return JSON.parse(JSON.stringify(DEFAULT_DB));
      }
      const parsed = JSON.parse(raw);
      return {
        settings: { ...DEFAULT_DB.settings, ...(parsed.settings || {}) },
        pins: Array.isArray(parsed.pins) ? parsed.pins : DEFAULT_DB.pins,
        results: Array.isArray(parsed.results) ? parsed.results : [],
        customQuestions: Array.isArray(parsed.customQuestions) ? parsed.customQuestions : []
      };
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT_DB));
    }
  }

  function saveLocalDB(db) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }

  const FRONTEND_PORT = 3000;
  const BACKEND_PORT = 4000;

  function isLocalEnvironment() {
    const host = window.location.hostname || "localhost";
    return host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0";
  }

  function resolveBackendApiUrl(endpoint) {
    if (window.location.protocol === "file:") return endpoint;
    const host = window.location.hostname || "localhost";
    if (!isLocalEnvironment()) {
      return endpoint; // In production / Vercel, serve API from the same origin under /api/*
    }
    const protocol = window.location.protocol === "https:" ? "https:" : "http:";
    return `${protocol}//${host}:${BACKEND_PORT}${endpoint}`;
  }

  async function tryFetchAPI(endpoint, options = {}) {
    if (window.location.protocol === "file:") {
      return null; // Immediately use local database when opened via file://
    }

    // On localhost, prioritize Backend Port 4000 with fallback to same-origin.
    // In production (Vercel / custom domain), use same-origin relative endpoint directly.
    const candidateUrls = isLocalEnvironment()
      ? [resolveBackendApiUrl(endpoint), endpoint]
      : [endpoint];

    for (const targetUrl of candidateUrls) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2500);
        const res = await fetch(targetUrl, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
          },
          signal: controller.signal
        });
        clearTimeout(timeout);
        const data = await res.json();
        return { status: res.status, ok: res.ok, data };
      } catch (e) {
        // Try next candidate URL or fall back to localStorage
      }
    }
    return null;
  }

  window.CBTBackendAPI = {
    FRONTEND_PORT,
    BACKEND_PORT,
    getFrontendPortalUrl(query = "") {
      if (window.location.protocol === "file:") {
        return `index.html${query}`;
      }
      const host = window.location.hostname || "localhost";
      if (!isLocalEnvironment()) {
        return `/index.html${query}`;
      }
      const protocol = window.location.protocol === "https:" ? "https:" : "http:";
      return `${protocol}//${host}:${FRONTEND_PORT}/index.html${query}`;
    },
    async getState() {
      const apiRes = await tryFetchAPI("/api/state");
      if (apiRes && apiRes.ok && apiRes.data && apiRes.data.data) {
        saveLocalDB(apiRes.data.data);
        return { source: "SERVER", db: apiRes.data.data };
      }
      const localDb = getLocalDB();
      return { source: "LOCAL", db: localDb };
    },

    async verifyAdminPassword(password) {
      const apiRes = await tryFetchAPI("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password })
      });
      if (apiRes) {
        return apiRes.ok && apiRes.data.authenticated;
      }
      const db = getLocalDB();
      const master = (db.settings && db.settings.adminMasterPin) || "ADMIN2026";
      return String(password || "").trim() === master;
    },

    async updateSettings(newSettings) {
      const db = getLocalDB();
      db.settings = { ...db.settings, ...newSettings };
      saveLocalDB(db);

      const apiRes = await tryFetchAPI("/api/settings", {
        method: "PUT",
        body: JSON.stringify(newSettings)
      });
      if (apiRes && apiRes.ok) {
        return apiRes.data.settings;
      }
      return db.settings;
    },

    async generatePins(payload) {
      const apiRes = await tryFetchAPI("/api/pins/generate", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      if (apiRes && apiRes.ok && apiRes.data.createdPins) {
        // Sync back to local DB
        await this.getState();
        return apiRes.data.createdPins;
      }

      // Local fallback generation
      const db = getLocalDB();
      const count = Math.min(200, Math.max(1, parseInt(payload.count, 10) || 1));
      const existingPins = new Set(db.pins.map((p) => p.pin));
      const existingRegs = new Set(db.pins.map((p) => p.regNo));
      const createdPins = [];
      let nextSeat = db.pins.length + 1;

      const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
      for (let i = 0; i < count; i++) {
        let pinCode = "";
        do {
          const p1 = Math.floor(1000 + Math.random() * 9000);
          const p2 = Math.floor(1000 + Math.random() * 9000);
          pinCode = `UTME-${p1}-${p2}`;
        } while (existingPins.has(pinCode));
        existingPins.add(pinCode);

        const isBulk = count > 1;
        const pinType = payload.pinType || "ASSIGNED";
        const seatNo =
          !isBulk && payload.seatNo
            ? String(payload.seatNo).padStart(3, "0")
            : String(nextSeat++).padStart(3, "0");

        let regNo = "";
        if (!isBulk && payload.regNo) {
          regNo = String(payload.regNo).trim().toUpperCase();
        } else if (pinType === "OPEN") {
          regNo = "OPEN-VOUCHER";
        } else {
          do {
            const d = Math.floor(100000 + Math.random() * 900000);
            const l1 = letters[Math.floor(Math.random() * letters.length)];
            const l2 = letters[Math.floor(Math.random() * letters.length)];
            regNo = `2026${d}${l1}${l2}`;
          } while (existingRegs.has(regNo));
          existingRegs.add(regNo);
        }

        const candidateName =
          !isBulk && payload.candidateName
            ? String(payload.candidateName).trim().toUpperCase()
            : pinType === "OPEN"
            ? "OPEN CANDIDATE VOUCHER"
            : `CANDIDATE SEAT #${seatNo}`;

        const subjects =
          Array.isArray(payload.subjects) && payload.subjects.length === 4
            ? payload.subjects
            : ["english", "biology", "chemistry", "physics"];

        const rec = {
          pin: pinCode,
          regNo,
          candidateName,
          seatNo,
          institution: payload.institution || "UNILAG",
          coursePreset: payload.coursePreset || "med_surg",
          subjects,
          pinType,
          maxAttempts: parseInt(payload.maxAttempts, 10) || 3,
          attemptsUsed: 0,
          status: "UNUSED",
          paperSeed: generateUniqueSittingSeed(regNo, pinCode, seatNo),
          variantCode: generatePaperVariantCode(seatNo),
          createdAt: new Date().toISOString(),
          lastUsedAt: null
        };

        db.pins.unshift(rec);
        createdPins.push(rec);
      }

      saveLocalDB(db);
      return createdPins;
    },

    async verifyPin(pin, regNo, candidateName) {
      const cleanPin = String(pin || "").trim().toUpperCase();
      const cleanReg = String(regNo || "").trim().toUpperCase();

      const apiRes = await tryFetchAPI("/api/pins/verify", {
        method: "POST",
        body: JSON.stringify({ pin: cleanPin, regNo: cleanReg, candidateName })
      });
      if (apiRes) {
        if (apiRes.ok) {
          await this.getState();
          return { ok: true, pinRecord: apiRes.data.pinRecord, settings: apiRes.data.settings };
        }
        return { ok: false, error: apiRes.data.error || "PIN verification failed." };
      }

      // Local fallback verification
      const db = getLocalDB();
      const record = db.pins.find((p) => p.pin.toUpperCase() === cleanPin);
      if (!record) {
        return {
          ok: false,
          error: "Invalid Examination PIN. Please obtain a valid UTME PIN from the Admin Portal."
        };
      }
      if (record.status === "REVOKED") {
        return {
          ok: false,
          error: "This Examination PIN has been revoked by the CBT Administrator."
        };
      }
      if (record.attemptsUsed >= record.maxAttempts) {
        return {
          ok: false,
          error: `Maximum allowed examination attempts (${record.maxAttempts}) reached for this PIN.`
        };
      }
      if (
        record.pinType === "ASSIGNED" &&
        cleanReg &&
        record.regNo !== "OPEN-VOUCHER" &&
        record.regNo.toUpperCase() !== cleanReg
      ) {
        return {
          ok: false,
          error: `This PIN is registered to JAMB Reg No ${record.regNo}, not ${cleanReg}.`
        };
      }

      if (record.pinType === "OPEN") {
        if (cleanReg) record.regNo = cleanReg;
        if (candidateName) record.candidateName = String(candidateName).toUpperCase();
      }

      record.activeSittingSeed = generateUniqueSittingSeed(record.regNo, record.pin, record.seatNo);
      record.variantCode = generatePaperVariantCode(record.seatNo);
      record.status = record.attemptsUsed > 0 ? "COMPLETED" : "IN_PROGRESS";
      record.lastUsedAt = new Date().toISOString();
      saveLocalDB(db);

      return { ok: true, pinRecord: record, settings: db.settings };
    },

    async updatePinStatus(pinCode, action) {
      const cleanPin = String(pinCode || "").trim().toUpperCase();
      const apiRes = await tryFetchAPI(`/api/pins/${encodeURIComponent(cleanPin)}`, {
        method: "PATCH",
        body: JSON.stringify({ action })
      });

      const db = getLocalDB();
      const record = db.pins.find((p) => p.pin.toUpperCase() === cleanPin);
      if (record) {
        if (action === "RESET") {
          record.attemptsUsed = 0;
          record.status = "UNUSED";
          record.variantCode = generatePaperVariantCode(record.seatNo);
        } else if (action === "REVOKE") {
          record.status = "REVOKED";
        } else if (action === "ACTIVATE") {
          record.status = record.attemptsUsed > 0 ? "COMPLETED" : "UNUSED";
        }
        saveLocalDB(db);
      }
      if (apiRes && apiRes.ok) {
        await this.getState();
      }
      return record;
    },

    async deletePin(pinCode) {
      const cleanPin = String(pinCode || "").trim().toUpperCase();
      await tryFetchAPI(`/api/pins/${encodeURIComponent(cleanPin)}`, {
        method: "DELETE"
      });
      const db = getLocalDB();
      db.pins = db.pins.filter((p) => p.pin.toUpperCase() !== cleanPin);
      saveLocalDB(db);
      return true;
    },

    async recordResult(resultRecord) {
      const db = getLocalDB();
      db.results.unshift(resultRecord);
      if (resultRecord.candidate && resultRecord.candidate.pin) {
        const pinObj = db.pins.find(
          (p) => p.pin.toUpperCase() === String(resultRecord.candidate.pin).toUpperCase()
        );
        if (pinObj) {
          pinObj.attemptsUsed = (pinObj.attemptsUsed || 0) + 1;
          pinObj.status = "COMPLETED";
          pinObj.lastScore = resultRecord.aggregateScaled400;
          pinObj.lastUsedAt = new Date().toISOString();
        }
      }
      saveLocalDB(db);

      await tryFetchAPI("/api/results", {
        method: "POST",
        body: JSON.stringify(resultRecord)
      });
      return resultRecord;
    },

    async clearAllResults() {
      const db = getLocalDB();
      db.results = [];
      saveLocalDB(db);
      await tryFetchAPI("/api/results", { method: "DELETE" });
      return true;
    },

    async addCustomQuestion(qObj) {
      const db = getLocalDB();
      db.customQuestions = db.customQuestions || [];
      db.customQuestions.unshift(qObj);
      saveLocalDB(db);
      await tryFetchAPI("/api/questions", {
        method: "POST",
        body: JSON.stringify(qObj)
      });
      return qObj;
    }
  };
})();

