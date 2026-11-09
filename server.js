/**
 * ============================================================================
 * JAMB UTME STANDARD CBT PORTAL — UNIVERSAL SERVER & DUAL-PORT ORCHESTRATOR
 * - When run locally (node server.js / start-portal.bat):
 *   Concurrently boots Candidate Portal (Port 3000) & Admin Backend (Port 4000).
 * - When deployed to Vercel (or any serverless cloud platform):
 *   Acts as the root entrypoint handler serving static pages, assets,
 *   and delegating /api/* requests to api/index.js.
 * ============================================================================
 */

const fs = require("fs");
const path = require("path");

const apiHandler = require("./api/index");
const { startFrontendServer, FRONTEND_PORT } = require("./frontend-server");
const { startBackendServer, BACKEND_PORT } = require("./backend-server");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

/**
 * Universal Request Handler for Vercel Serverless Function & Cloud deployments
 */
async function universalHandler(req, res) {
  // Extract path safely
  let rawPath = (req.url || "/").split("?")[0];
  let pathname = decodeURIComponent(rawPath || "/");

  // 1. Delegate API requests to api/index.js
  if (pathname.startsWith("/api")) {
    return apiHandler(req, res);
  }

  // 2. Map root and admin route aliases
  if (pathname === "/" || pathname === "/index") {
    pathname = "/index.html";
  } else if (pathname === "/admin") {
    pathname = "/admin.html";
  }

  // 3. Security: prevent directory traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(__dirname, safePath);

  // Check if file exists within project directory
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    try {
      const data = fs.readFileSync(filePath);
      res.writeHead(200, {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600"
      });
      return res.end(data);
    } catch (readErr) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Error loading file: " + readErr.message);
    }
  }

  // 4. Fallback 404
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>404 Not Found - JAMB UTME CBT Portal</title></head>
<body style="font-family:sans-serif;text-align:center;padding:50px;">
  <h2>404 - Page or Resource Not Found</h2>
  <p>The requested URL <code>${pathname}</code> was not found on this server.</p>
  <p><a href="/">Return to Student Portal</a> | <a href="/admin">Admin Control</a></p>
</body>
</html>`);
}

/**
 * Dual-port local orchestrator for Windows localhost development
 */
async function bootDualPortPortal() {
  console.log("=======================================================================");
  console.log("  JAMB UTME CBT PORTAL — SEPARATED FRONTEND & BACKEND SERVERS");
  console.log("=======================================================================");
  try {
    await startBackendServer(BACKEND_PORT);
    await startFrontendServer(FRONTEND_PORT);
    console.log("-----------------------------------------------------------------------");
    console.log(`  ▶ Candidate CBT Portal (Students): http://localhost:${FRONTEND_PORT}`);
    console.log(`  ▶ Admin Backend & PIN Generator:   http://localhost:${BACKEND_PORT}`);
    console.log(`  ▶ Admin Master Key:                ADMIN2026`);
    console.log("=======================================================================");
  } catch (err) {
    console.error("Error starting CBT Portal servers:", err.message);
  }
}

// When invoked directly from the CLI or batch launcher, start local servers
if (require.main === module) {
  bootDualPortPortal();
}

// Export handler for Vercel Serverless Function entrypoint
module.exports = universalHandler;
