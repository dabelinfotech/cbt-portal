/**
 * ============================================================================
 * JAMB UTME STANDARD CBT PORTAL — STUDENT FRONTEND SERVER (frontend-server.js)
 * Dedicated Student Examination Workstation Server on Port 3000
 * Strictly serves ONLY Candidate Frontend assets; blocks Admin & DB routes.
 * Run standalone with: node frontend-server.js
 * ============================================================================
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const { execSync } = require("child_process");

const FRONTEND_PORT = parseInt(process.env.FRONTEND_PORT || "3000", 10);
const BACKEND_PORT = parseInt(process.env.BACKEND_PORT || "4000", 10);
const ROOT_DIR = __dirname;

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

// Routes explicitly forbidden on the Student Frontend Port (3000)
const BLOCKED_STUDENT_PATHS = new Set(["/admin.html", "/admin", "/js/admin.js"]);

function createFrontendServer() {
  return http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = decodeURIComponent(parsedUrl.pathname || "/");

    // Block Admin UI, Admin JS, raw DB files, and Backend API on Student Port 3000
    if (
      BLOCKED_STUDENT_PATHS.has(pathname.toLowerCase()) ||
      pathname.startsWith("/data/") ||
      pathname.startsWith("/api/")
    ) {
      res.writeHead(403, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Access Restricted — Student Workstation Port</title>
          <style>
            body { font-family: system-ui, sans-serif; background: #f1f5f9; color: #0f172a; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .box { background: #fff; padding: 2rem; border-radius: 12px; border-top: 5px solid #dc2626; max-width: 480px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); text-align: center; }
            h2 { margin-top: 0; color: #dc2626; }
            code { background: #f8fafc; padding: 2px 6px; border-radius: 4px; border: 1px solid #cbd5e1; }
            a { display: inline-block; margin-top: 1rem; padding: 0.6rem 1.2rem; background: #006837; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="box">
            <h2>🔒 Restricted on Student Port (${FRONTEND_PORT})</h2>
            <p>This port serves the <strong>Candidate CBT Examination Portal</strong> only.</p>
            <p>The Administrator Backend & PIN Generator runs on a separate port: <code>http://localhost:${BACKEND_PORT}</code></p>
            <a href="/">Return to Student CBT Portal</a>
            <div style="margin-top:1.5rem;padding-top:0.75rem;border-top:1px solid #e2e8f0;font-size:0.8rem;color:#64748b;">
              Powered by <strong style="color:#006837;">DABELTECH</strong>
            </div>
          </div>
        </body>
        </html>
      `);
      return;
    }

    let safePath = pathname === "/" ? "/index.html" : pathname;
    const filePath = path.join(ROOT_DIR, safePath);

    // Prevent directory traversal outside ROOT_DIR
    if (!filePath.startsWith(ROOT_DIR)) {
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

function startFrontendServer(port = FRONTEND_PORT) {
  freePortOnWindows(port);
  const server = createFrontendServer();
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
        `🎓 [FRONTEND - PORT ${port}] Candidate CBT Portal running at: http://localhost:${port}`
      );
      resolve(server);
    });
  });
}

if (require.main === module) {
  startFrontendServer(FRONTEND_PORT).catch((err) => {
    console.error("Failed to start Frontend Server:", err.message);
    process.exit(1);
  });
}

module.exports = { createFrontendServer, startFrontendServer, FRONTEND_PORT };

