@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel% equ 0 (
  py serve.py
) else (
  python serve.py
)
pause
