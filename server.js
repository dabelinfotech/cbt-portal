/**
 * ============================================================================
 * JAMB UTME STANDARD CBT PORTAL — DUAL-PORT ORCHESTRATOR (server.js)
 * Boots the separated Student Frontend Server (Port 3000) and
 * Admin Backend + REST API Server (Port 4000) simultaneously.
 *
 * - Student CBT Portal (Frontend): http://localhost:3000
 * - Admin Control & PIN Backend:   http://localhost:4000
 * ============================================================================
 */

const { startFrontendServer, FRONTEND_PORT } = require("./frontend-server");
const { startBackendServer, BACKEND_PORT } = require("./backend-server");

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

bootDualPortPortal();
