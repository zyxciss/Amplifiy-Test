@echo off


echo ███████╗██╗   ██╗██╗  ██╗ ██████╗██╗███████╗███████╗
echo ╚══███╔╝╚██╗ ██╔╝╚██╗██╔╝██╔════╝██║██╔════╝██╔════╝
echo   ███╔╝  ╚████╔╝  ╚███╔╝ ██║     ██║███████╗███████╗
echo  ███╔╝    ╚██╔╝   ██╔██╗ ██║     ██║╚════██║╚════██║
echo ███████╗   ██║   ██╔╝ ██╗╚██████╗██║███████║███████║
echo ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝╚══════╝╚══════╝


echo Starting setup for AWS Amplify Web App...

:: Check for Node.js installation
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install it manually from https://nodejs.org/
    exit /b
)

:: Check for AWS CLI installation
where aws >nul 2>nul
if %errorlevel% neq 0 (
    echo AWS CLI is not installed. Please install it manually from https://aws.amazon.com/cli/
    exit /b
)

:: Check for Amplify CLI installation
where amplify >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing Amplify CLI...
    npm install -g @aws-amplify/cli
)

:: Initialize Amplify
echo Initializing AWS Amplify...
call init-amplify.bat

:: Deploy Amplify Backend
amplify init
amplify push

:: Install frontend dependencies and start the app
cd src
npm install
npm start

echo Setup complete!
pause
