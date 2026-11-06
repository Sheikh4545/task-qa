@echo off
setlocal
cd /d "%~dp0"

echo Checking project requirements...
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed or is not on PATH.
    echo Install Node.js 20 or newer, then run this file again.
    pause
    exit /b 1
)

for /f %%V in ('node -p "process.versions.node.split('.')[0]"') do set "NODE_MAJOR=%%V"
if not defined NODE_MAJOR (
    echo ERROR: Could not determine the installed Node.js version.
    pause
    exit /b 1
)
if %NODE_MAJOR% LSS 20 (
    echo ERROR: This project requires Node.js 20 or newer.
    pause
    exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
    echo ERROR: npm is not available on PATH.
    pause
    exit /b 1
)

if not exist ".env" (
    echo ERROR: .env is missing.
    echo Create .env using .env.example and set your test account credentials.
    pause
    exit /b 1
)

if not exist "node_modules\@playwright\test\package.json" (
    echo Installing project dependencies...
    call npm ci
    if errorlevel 1 (
        echo ERROR: Dependency installation failed.
        pause
        exit /b 1
    )
)

echo Ensuring the Playwright Chromium browser is installed...
call npx playwright install chromium
if errorlevel 1 (
    echo ERROR: Playwright Chromium installation failed.
    pause
    exit /b 1
)

echo Running the full Playwright test suite...
set "CI=1"
call npm test
set "TEST_EXIT_CODE=%ERRORLEVEL%"

if exist "playwright-report\index.html" (
    echo Opening the Playwright HTML report...
    start "" "%~dp0playwright-report\index.html"
)

if not "%TEST_EXIT_CODE%"=="0" (
    echo Tests failed with exit code %TEST_EXIT_CODE%.
    pause
    exit /b %TEST_EXIT_CODE%
)

echo All tests passed.
exit /b 0
