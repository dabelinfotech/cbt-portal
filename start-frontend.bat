@echo off
cd /d "%~dp0"
echo Starting Student CBT Frontend Server on http://localhost:3000 ...
node "%~dp0frontend-server.js"
pause

