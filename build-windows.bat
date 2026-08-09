@echo off
setlocal

echo.
echo ========================================
echo       lfmplayr Windows Build
echo ========================================
echo.

set "EXE=lfmplayr.exe"
set "ICON=assets\icon.ico"
set "RESHACKER=ResourceHacker.exe"

REM ----------------------------------------
REM Build
REM ----------------------------------------

echo [1/2] Building Windows executable...
echo.

call bun run build:windows

if errorlevel 1 (
echo.
echo ERROR: Bun build failed.
echo.
exit /b 1
)

if not exist "%EXE%" (
echo.
echo ERROR: %EXE% was not created.
echo.
exit /b 1
)

echo.
echo Bun build completed successfully.
echo.

REM ----------------------------------------
REM Check Resource Hacker
REM ----------------------------------------

if not exist "%RESHACKER%" (
echo ERROR: %RESHACKER% not found.
echo.
echo Download Resource Hacker from:
echo https://www.angusj.com/resourcehacker/
echo.
exit /b 1
)

if not exist "%ICON%" (
echo ERROR: %ICON% not found.
echo.
exit /b 1
)

REM ----------------------------------------
REM Inject icon
REM ----------------------------------------

echo [2/2] Injecting Windows icon...
echo.

"%RESHACKER%" ^
-open "%EXE%" ^
-save "%EXE%" ^
-action addoverwrite ^
-res "%ICON%" ^
-mask ICONGROUP,MAINICON,

if errorlevel 1 (
echo.
echo ERROR: Failed to inject icon.
echo.
exit /b 1
)

echo.
echo ========================================
echo       BUILD SUCCESSFUL
echo ========================================
echo.
echo Executable: %EXE%
echo Icon:       %ICON%
echo Console:    Hidden
echo.

endlocal
exit /b 0
