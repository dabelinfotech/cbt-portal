/**
 * ============================================================================
 * JAMB UTME STANDARD CBT PORTAL — VERCEL SERVERLESS API HANDLER (api/index.js)
 * Supports full REST API on Vercel Serverless Functions:
 * - GET    /api/state
 * - POST   /api/admin/login
 * - PUT    /api/settings
 * - POST   /api/pins/generate
 * - POST   /api/pins/verify
 * - PATCH  /api/pins/:pin
 * - DELETE /api/pins/:pin
 * - POST   /api/results
 * - DELETE /api/results
 * - POST   /api/questions
 * ============================================================================
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const url = require("url");
const os = require("os");

const SEED_DB_PATH = path.join(__dirname, "..", "data", "cbt-db.json");
const TMP_DB_PATH = path.join(os.tmpdir(), "cbt-db.json");

// In-memory fallback if disk writes are restricted
let inMemoryDb = null;

function getActiveDbPath() {
  try {
    if (!fs.existsSync(TMP_DB_PATH)) {
      if (fs.existsSync(SEED_DB_PATH)) {
        fs.copyFileSync(SEED_DB_PATH, TMP_DB_PATH);
      }
    }
    return TMP_DB_PATH;
  } catch (e) {
    return SEED_DB_PATH;
  }
}

function readDatabase() {
  if (inMemoryDb) return inMemoryDb;
  const dbPath = getActiveDbPath();
  try {
    if (fs.existsSync(dbPath)) {
      const raw = fs.readFileSync(dbPath, "utf8");
      inMemoryDb = JSON.parse(raw);
      return inMemoryDb;
    }
  } catch (err) {
    console.warn("Could not read db from file, using fallback:", err.message);
  }
  inMemoryDb = { settings: {}, pins: [], results: [], customQuestions: [] };
  return inMemoryDb;
}

function writeDatabase(db) {
  inMemoryDb = db;
  try {
    const dbPath = getActiveDbPath();
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");
    return true;
  } catch (err) {
    console.warn("Notice: Saved to memory cache (serverless disk restricted):", err.message);
    return true;
  }
}

function generateUniquePinCode(existingPinsSet) {
  let code = "";
  do {
    const part1 = crypto.randomInt(1000, 9999);
    const part2 = crypto.randomInt(1000, 9999);
    code = `UTME-${part1}-${part2}`;
  } while (existingPinsSet.has(code));
  existingPinsSet.add(code);
  return code;
}

function generateUniqueRegNo(existingRegSet) {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let reg = "";
  do {
    const digits = crypto.randomInt(100000, 999999);
    const l1 = letters[crypto.randomInt(0, letters.length)];
    const l2 = letters[crypto.randomInt(0, letters.length)];
    reg = `2026${digits}${l1}${l2}`;
  } while (existingRegSet.has(reg));
  existingRegSet.add(reg);
  return reg;
}

function generateVariantCode(seatNo) {
  const hex = crypto.randomBytes(2).toString("hex").toUpperCase();
  const seatTag = String(seatNo || "001").padStart(3, "0");
  return `SET-${hex}-S${seatTag}`;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  });
  res.end(JSON.stringify(payload));
}

function parseRequestBody(req) {
  if (req.body) {
    if (typeof req.body === "object") return Promise.resolve(req.body);
    if (typeof req.body === "string") {
      try {
        return Promise.resolve(JSON.parse(req.body));
      } catch (e) {
        return Promise.resolve({});
      }
    }
  }
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      if (body.length > 5 * 1024 * 1024) reject(new Error("Payload too large"));
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        resolve({});
      }
    });
    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return sendJson(res, 200, { ok: true });
  }

  const rawPath = (req.url || "/").split("?")[0];
  let pathname = decodeURIComponent(rawPath || "/");

  // Normalize path if /api prefix is stripped or present
  if (!pathname.startsWith("/api") && pathname !== "/") {
    pathname = "/api" + (pathname.startsWith("/") ? pathname : "/" + pathname);
  }

  try {
    // 1. GET /api/state
    if ((pathname === "/api/state" || pathname === "/state") && req.method === "GET") {
      const db = readDatabase();
      return sendJson(res, 200, { ok: true, data: db });
    }

    // 2. POST /api/admin/login
    if ((pathname === "/api/admin/login" || pathname === "/admin/login") && req.method === "POST") {
      const body = await parseRequestBody(req);
      const db = readDatabase();
      const masterKey = (db.settings && db.settings.adminMasterPin) || "ADMIN2026";
      if (String(body.password || "").trim() === masterKey) {
        return sendJson(res, 200, { ok: true, authenticated: true });
      }
      return sendJson(res, 401, { ok: false, error: "Invalid Admin Master Key." });
    }

    // 3. PUT /api/settings
    if ((pathname === "/api/settings" || pathname === "/settings") && req.method === "PUT") {
      const body = await parseRequestBody(req);
      const db = readDatabase();
      db.settings = { ...db.settings, ...body };
      writeDatabase(db);
      return sendJson(res, 200, { ok: true, settings: db.settings });
    }

    // 4. POST /api/pins/generate (Single or Bulk PIN Generator)
    if ((pathname === "/api/pins/generate" || pathname === "/pins/generate") && req.method === "POST") {
      const body = await parseRequestBody(req);
      const db = readDatabase();
      const count = Math.min(200, Math.max(1, parseInt(body.count, 10) || 1));
      const existingPinsSet = new Set(db.pins.map((p) => p.pin));
      const existingRegSet = new Set(db.pins.map((p) => p.regNo));
      const createdPins = [];

      let nextSeatNum = db.pins.length + 1;

      for (let i = 0; i < count; i++) {
        const pinCode = generateUniquePinCode(existingPinsSet);
        const isBulk = count > 1;
        const pinType = body.pinType || "ASSIGNED";
        const seatNo =
          !isBulk && body.seatNo
            ? String(body.seatNo).padStart(3, "0")
            : String(nextSeatNum++).padStart(3, "0");

        const regNo =
          !isBulk && body.regNo
            ? String(body.regNo).trim().toUpperCase()
            : pinType === "OPEN"
            ? "OPEN-VOUCHER"
            : generateUniqueRegNo(existingRegSet);

        const candidateName =
          !isBulk && body.candidateName
            ? String(body.candidateName).trim().toUpperCase()
            : pinType === "OPEN"
            ? "OPEN CANDIDATE VOUCHER"
            : `CANDIDATE BATCH #${seatNo}`;

        const subjects =
          Array.isArray(body.subjects) && body.subjects.length === 4
            ? body.subjects
            : ["english", "biology", "chemistry", "physics"];

        const newPinRecord = {
          pin: pinCode,
          regNo,
          candidateName,
          seatNo,
          institution: body.institution || "UNILAG",
          coursePreset: body.coursePreset || "med_surg",
          subjects,
          pinType,
          maxAttempts: parseInt(body.maxAttempts, 10) || 3,
          attemptsUsed: 0,
          status: "UNUSED",
          paperSeed: `SEED-${crypto.randomBytes(4).toString("hex").toUpperCase()}-S${seatNo}`,
          variantCode: generateVariantCode(seatNo),
          createdAt: new Date().toISOString(),
          lastUsedAt: null
        };

        db.pins.unshift(newPinRecord);
        createdPins.push(newPinRecord);
      }

      writeDatabase(db);
      return sendJson(res, 201, { ok: true, createdPins, totalPins: db.pins.length });
    }

    // 5. POST /api/pins/verify (Candidate Login & PIN Verification)
    if ((pathname === "/api/pins/verify" || pathname === "/pins/verify") && req.method === "POST") {
      const body = await parseRequestBody(req);
      const db = readDatabase();
      const inputPin = String(body.pin || "").trim().toUpperCase();
      const inputRegNo = String(body.regNo || "").trim().toUpperCase();

      const record = db.pins.find((p) => p.pin.toUpperCase() === inputPin);
      if (!record) {
        return sendJson(res, 404, {
          ok: false,
          error: "Invalid Examination PIN. Please obtain a valid UTME PIN from the Administrator."
        });
      }

      if (record.status === "REVOKED") {
        return sendJson(res, 403, {
          ok: false,
          error: "This Examination PIN has been revoked by the CBT Administrator."
        });
      }

      if (record.attemptsUsed >= record.maxAttempts) {
        return sendJson(res, 403, {
          ok: false,
          error: `Maximum allowed examination attempts (${record.maxAttempts}) reached for this PIN.`
        });
      }

      if (
        record.pinType === "ASSIGNED" &&
        inputRegNo &&
        record.regNo !== "OPEN-VOUCHER" &&
        record.regNo.toUpperCase() !== inputRegNo
      ) {
        return sendJson(res, 403, {
          ok: false,
          error: `This PIN is assigned strictly to JAMB Reg No ${record.regNo}.`
        });
      }

      if (record.pinType === "OPEN") {
        if (inputRegNo) record.regNo = inputRegNo;
        if (body.candidateName) record.candidateName = String(body.candidateName).toUpperCase();
      }

      record.lastUsedAt = new Date().toISOString();
      record.status = record.attemptsUsed > 0 ? "COMPLETED" : "IN_PROGRESS";
      record.activeSittingSeed = `${record.paperSeed}-SIT${record.attemptsUsed + 1}-${crypto
        .randomBytes(3)
        .toString("hex")
        .toUpperCase()}`;
      record.variantCode = generateVariantCode(record.seatNo);

      writeDatabase(db);
      return sendJson(res, 200, { ok: true, pinRecord: record, settings: db.settings });
    }

    // 6. PATCH /api/pins/:pin (Reset, Revoke, Activate)
    if (pathname.includes("/pins/") && req.method === "PATCH") {
      const match = pathname.match(/\/pins\/([^/?#]+)/);
      const targetPin = match ? decodeURIComponent(match[1]).trim().toUpperCase() : "";
      const body = await parseRequestBody(req);
      const db = readDatabase();
      const record = db.pins.find((p) => p.pin.toUpperCase() === targetPin);
      if (!record) {
        return sendJson(res, 404, { ok: false, error: "PIN not found." });
      }

      if (body.action === "RESET") {
        record.attemptsUsed = 0;
        record.status = "UNUSED";
        record.paperSeed = `SEED-${crypto.randomBytes(4).toString("hex").toUpperCase()}-S${record.seatNo}`;
        record.variantCode = generateVariantCode(record.seatNo);
      } else if (body.action === "REVOKE") {
        record.status = "REVOKED";
      } else if (body.action === "ACTIVATE") {
        record.status = record.attemptsUsed > 0 ? "COMPLETED" : "UNUSED";
      }

      writeDatabase(db);
      return sendJson(res, 200, { ok: true, pinRecord: record });
    }

    // 7. DELETE /api/pins/:pin
    if (pathname.includes("/pins/") && req.method === "DELETE") {
      const match = pathname.match(/\/pins\/([^/?#]+)/);
      const targetPin = match ? decodeURIComponent(match[1]).trim().toUpperCase() : "";
      const db = readDatabase();
      db.pins = db.pins.filter((p) => p.pin.toUpperCase() !== targetPin);
      writeDatabase(db);
      return sendJson(res, 200, { ok: true });
    }

    // 8. POST /api/results (Record Completed Exam Result)
    if ((pathname === "/api/results" || pathname === "/results") && req.method === "POST") {
      const resultRecord = await parseRequestBody(req);
      const db = readDatabase();
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

      writeDatabase(db);
      return sendJson(res, 201, { ok: true, result: resultRecord });
    }

    // 9. DELETE /api/results (Clear All Results)
    if ((pathname === "/api/results" || pathname === "/results") && req.method === "DELETE") {
      const db = readDatabase();
      db.results = [];
      writeDatabase(db);
      return sendJson(res, 200, { ok: true });
    }

    // 10. POST /api/questions (Add Custom Question)
    if ((pathname === "/api/questions" || pathname === "/questions") && req.method === "POST") {
      const newQ = await parseRequestBody(req);
      const db = readDatabase();
      if (!Array.isArray(db.customQuestions)) db.customQuestions = [];
      db.customQuestions.unshift(newQ);
      writeDatabase(db);
      return sendJson(res, 201, { ok: true, question: newQ });
    }

    // Fallback: return 404 for unknown API route
    return sendJson(res, 404, { ok: false, error: `Route not found: ${pathname}` });
  } catch (apiErr) {
    console.error("API Error:", apiErr);
    return sendJson(res, 500, { ok: false, error: apiErr.message || "Internal Server Error" });
  }
};

