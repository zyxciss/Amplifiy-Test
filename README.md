# Project: AWS Amplify Web App


Created by Zyxciss aka Atah Alam  
GitHub: [github.com/zyxciss](https://github.com/zyxciss)  


## Overview
This project is an AWS Amplify-powered web application with backend services for authentication, API handling, and storage. It includes frontend components built using React and backend functions running on AWS Lambda.

## Features
- User authentication with AWS Cognito.
- API endpoints managed via AWS AppSync (GraphQL).
- AWS Lambda functions for automated backend processing.
- Cloud storage integration using S3.
- CloudWatch monitoring for performance tracking.

## Project Structure
```
sourcecode/
│-- init-amplify.bat          # Windows setup script
│-- init-amplify.sh           # Linux/Mac setup script
│-- amplify/                  # AWS Amplify backend configurations
│   ├── api/                  # API configurations (GraphQL, REST)
│   ├── auth/                 # User authentication setup
│   ├── function/             # AWS Lambda functions
│   ├── integrations/         # External service integrations (e.g., SharePoint)
│   ├── monitoring/           # CloudWatch setup
│   ├── storage/              # S3 storage policy
│-- src/                      # React frontend
│   ├── components/           # UI components (Admin Panel, Request Form, etc.)
│   ├── App.js                # Main app entry point
│   ├── aws-exports.js        # AWS Amplify configuration
│   ├── index.js              # Application bootstrap file
```

## Installation
See `setup.txt` for detailed setup instructions.
