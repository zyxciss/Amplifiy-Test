#!/bin/bash
echo "Initializing Amplify project..."

# Check for Node.js installation
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check for AWS Amplify CLI
if ! command -v amplify &> /dev/null; then
    echo "Installing AWS Amplify CLI..."
    npm install -g @aws-amplify/cli
fi

# Install project dependencies
echo "Installing project dependencies..."
npm install aws-amplify @aws-amplify/ui-react

# Initialize Amplify project
echo "Configuring Amplify project..."
if ! amplify init; then
    echo "Error: Failed to initialize Amplify project."
    exit 1
fi

# Add authentication
echo "Setting up authentication..."
if ! amplify add auth; then
    echo "Error: Failed to add authentication."
    exit 1
fi

# Add API
echo "Setting up API..."
if ! amplify add api; then
    echo "Error: Failed to add API."
    exit 1
fi

# Add storage
echo "Setting up storage..."
if ! amplify add storage; then
    echo "Error: Failed to add storage."
    exit 1
fi

# Add functions
echo "Setting up Lambda functions..."
if ! amplify add function; then
    echo "Error: Failed to add functions."
    exit 1
fi

# Push changes to cloud
echo "Deploying Amplify project..."
if ! amplify push; then
    echo "Error: Failed to deploy Amplify project."
    exit 1
fi

echo "Setup completed successfully!"