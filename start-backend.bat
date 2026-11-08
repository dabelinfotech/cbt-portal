@echo off
cd /d "%~dp0"
echo Starting Admin Backend Server on http://localhost:4000 ...
start "" "http://localhost:4000"
node "%~dp0backend-server.js"
pause
