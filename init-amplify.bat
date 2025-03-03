@echo off
echo Initializing Amplify project...

:: Check for Node.js installation
node --version > nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js first.
    exit /b 1
)

:: Check for AWS Amplify CLI
amplify --version > nul 2>&1
if %errorlevel% neq 0 (
    echo Installing AWS Amplify CLI...
    call npm install -g @aws-amplify/cli
)

:: Install project dependencies
echo Installing project dependencies...
call npm install aws-amplify @aws-amplify/ui-react

:: Initialize Amplify project
echo Configuring Amplify project...
call amplify init || (
    echo Error: Failed to initialize Amplify project.
    exit /b 1
)

:: Add authentication
echo Setting up authentication...
call amplify add auth || (
    echo Error: Failed to add authentication.
    exit /b 1
)

:: Add API
echo Setting up API...
call amplify add api || (
    echo Error: Failed to add API.
    exit /b 1
)

:: Add storage
echo Setting up storage...
call amplify add storage || (
    echo Error: Failed to add storage.
    exit /b 1
)

:: Add functions
echo Setting up Lambda functions...
call amplify add function || (
    echo Error: Failed to add functions.
    exit /b 1
)

:: Push changes to cloud
echo Deploying Amplify project...
call amplify push || (
    echo Error: Failed to deploy Amplify project.
    exit /b 1
)

echo Setup completed successfully!