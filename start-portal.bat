@echo off
cd /d "%~dp0"
echo Starting JAMB UTME CBT Portal (Frontend Port 3000 + Backend Port 4000)...
start "" "http://localhost:4000"
start "" "http://localhost:3000"
node "%~dp0server.js"
pause
