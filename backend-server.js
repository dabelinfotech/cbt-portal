/**
 * ============================================================================
 * JAMB UTME STANDARD CBT PORTAL — ADMIN BACKEND & API SERVER (backend-server.js)
 * Dedicated REST API + CBT Administrator Control Server on Port 4000
 * Separated from the Student Frontend Port (3000) with full CORS support.
 * Run standalone with: node backend-server.js
 * ============================================================================
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const url = require("url");
const { execSync } = require("child_process");

const BACKEND_PORT = parseInt(process.env.BACKEND_PORT || "4000", 10);
const FRONTEND_PORT = parseInt(process.env.FRONTEND_PORT || "3000", 10);
const ROOT_DIR = __dirname;
const DB_PATH = path.join(ROOT_DIR, "data", "cbt-db.json");

function freePortOnWindows(port) {
  if (process.platform !== "win32") return;
  try {
    const output = execSync("netstat -ano", { encoding: "utf8" });
    const lines = output.split(/\r?\n/).filter(Boolean);
    const killedPids = new Set();
    const portPattern = new RegExp(`:${port}\\s+`);
    for (const line of lines) {
      if (!line.includes("LISTENING") || !portPattern.test(line)) continue;
      const parts = line.trim().split(/\s+/);
      const pid = parseInt(parts[parts.length - 1], 10);
      if (pid && pid !== process.pid && !killedPids.has(pid)) {
        killedPids.add(pid);
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
        } catch (e) {}
      }
    }
  } catch (e) {
    // Ignore if netstat is unavailable
  }
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon"
};

function readDatabase() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { settings: {}, pins: [], results: [], customQuestions: [] };
    }
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database:", err);
    return { settings: {}, pins: [], results: [], customQuestions: [] };
  }
}

function writeDatabase(db) {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing database:", err);
    return false;
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
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      if (body.length > 5 * 1024 * 1024) {
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function createBackendServer() {
  return http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = decodeURIComponent(parsedUrl.pathname || "/");

    if (req.method === "OPTIONS") {
      return sendJson(res, 200, { ok: true });
    }

    // ========================================================================
    // REST API ROUTES (Served on Backend Port 4000)
    // ========================================================================
    try {
      // 1. GET /api/state
      if (pathname === "/api/state" && req.method === "GET") {
        const db = readDatabase();
        return sendJson(res, 200, { ok: true, data: db });
      }

      // 2. POST /api/admin/login
      if (pathname === "/api/admin/login" && req.method === "POST") {
        const body = await parseRequestBody(req);
        const db = readDatabase();
        const masterKey = (db.settings && db.settings.adminMasterPin) || "ADMIN2026";
        if (String(body.password || "").trim() === masterKey) {
          return sendJson(res, 200, { ok: true, authenticated: true });
        }
        return sendJson(res, 401, { ok: false, error: "Invalid Admin Master Key." });
      }

      // 3. PUT /api/settings
      if (pathname === "/api/settings" && req.method === "PUT") {
        const body = await parseRequestBody(req);
        const db = readDatabase();
        db.settings = { ...db.settings, ...body };
        writeDatabase(db);
        return sendJson(res, 200, { ok: true, settings: db.settings });
      }

      // 4. POST /api/pins/generate (Single or Bulk Student PIN Generator)
      if (pathname === "/api/pins/generate" && req.method === "POST") {
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

      // 5. POST /api/pins/verify (Candidate Login & PIN Verification from Port 3000)
      if (pathname === "/api/pins/verify" && req.method === "POST") {
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
        // Issue a fresh cryptographic sitting seed so every sitting is 100% uniquely scattered
        record.activeSittingSeed = `${record.paperSeed}-SIT${record.attemptsUsed + 1}-${crypto
          .randomBytes(3)
          .toString("hex")
          .toUpperCase()}`;
        record.variantCode = generateVariantCode(record.seatNo);

        writeDatabase(db);
        return sendJson(res, 200, { ok: true, pinRecord: record, settings: db.settings });
      }

      // 6. PATCH /api/pins/:pin (Reset, Revoke, or Activate a PIN)
      if (pathname.startsWith("/api/pins/") && req.method === "PATCH") {
        const targetPin = pathname.replace("/api/pins/", "").trim().toUpperCase();
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
      if (pathname.startsWith("/api/pins/") && req.method === "DELETE") {
        const targetPin = pathname.replace("/api/pins/", "").trim().toUpperCase();
        const db = readDatabase();
        db.pins = db.pins.filter((p) => p.pin.toUpperCase() !== targetPin);
        writeDatabase(db);
        return sendJson(res, 200, { ok: true });
      }

      // 8. POST /api/results (Record Completed Candidate Exam Result)
      if (pathname === "/api/results" && req.method === "POST") {
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
      if (pathname === "/api/results" && req.method === "DELETE") {
        const db = readDatabase();
        db.results = [];
        writeDatabase(db);
        return sendJson(res, 200, { ok: true });
      }

      // 10. POST /api/questions (Add Custom UTME Question to Backend Bank)
      if (pathname === "/api/questions" && req.method === "POST") {
        const newQ = await parseRequestBody(req);
        const db = readDatabase();
        if (!Array.isArray(db.customQuestions)) db.customQuestions = [];
        db.customQuestions.unshift(newQ);
        writeDatabase(db);
        return sendJson(res, 201, { ok: true, question: newQ });
      }
    } catch (apiErr) {
      return sendJson(res, 500, { ok: false, error: apiErr.message || "Internal Server Error" });
    }

    // ========================================================================
    // ADMIN PORTAL STATIC FILE SERVING (Port 4000 defaults to admin.html)
    // ========================================================================
    if (pathname === "/index.html") {
      // Redirect any /index.html request on Port 4000 to the Student Frontend on Port 3000
      res.writeHead(302, { Location: `http://localhost:${FRONTEND_PORT}/index.html` });
      res.end();
      return;
    }

    let safePath = pathname === "/" || pathname === "/admin" ? "/admin.html" : pathname;
    const filePath = path.join(ROOT_DIR, safePath);

    if (!filePath.startsWith(ROOT_DIR) || safePath.startsWith("/data/")) {
      res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("403 Forbidden");
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 Not Found");
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": contentType });
      fs.createReadStream(filePath).pipe(res);
    });
  });
}

function startBackendServer(port = BACKEND_PORT) {
  freePortOnWindows(port);
  const server = createBackendServer();
  return new Promise((resolve, reject) => {
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.warn(`⚠️  Port ${port} is already active in another window.`);
        return resolve(server);
      }
      reject(err);
    });
    server.listen(port, () => {
      console.log(
        `🔐 [BACKEND  - PORT ${port}] Admin Control & PIN API running at: http://localhost:${port}`
      );
      resolve(server);
    });
  });
}

if (require.main === module) {
  startBackendServer(BACKEND_PORT).catch((err) => {
    console.error("Failed to start Backend Server:", err.message);
    process.exit(1);
  });
}

module.exports = { createBackendServer, startBackendServer, BACKEND_PORT };

