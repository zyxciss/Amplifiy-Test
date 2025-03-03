#!/bin/bash


echo ███████╗██╗   ██╗██╗  ██╗ ██████╗██╗███████╗███████╗
echo ╚══███╔╝╚██╗ ██╔╝╚██╗██╔╝██╔════╝██║██╔════╝██╔════╝
echo   ███╔╝  ╚████╔╝  ╚███╔╝ ██║     ██║███████╗███████╗
echo  ███╔╝    ╚██╔╝   ██╔██╗ ██║     ██║╚════██║╚════██║
echo ███████╗   ██║   ██╔╝ ██╗╚██████╗██║███████║███████║
echo ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝╚══════╝╚══════╝


echo "Starting setup for AWS Amplify Web App..."

# Check for Node.js installation
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing..."
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Check for AWS CLI installation
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Installing..."
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
fi

# Check for Amplify CLI installation
if ! command -v amplify &> /dev/null; then
    echo "Amplify CLI is not installed. Installing..."
    npm install -g @aws-amplify/cli
fi

# Configure AWS Amplify
echo "Initializing AWS Amplify..."
chmod +x init-amplify.sh
./init-amplify.sh

# Deploy Amplify Backend
amplify init
amplify push

# Install frontend dependencies and start the app
cd src
npm install
npm start

echo "Setup complete!"
