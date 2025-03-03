const securityConfig = {
  iamRoles: {
    adminRole: {
      name: 'VendorAccessAdmin',
      policies: [
        'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
        'arn:aws:iam::aws:policy/AmazonS3FullAccess',
        'arn:aws:iam::aws:policy/AmazonSESFullAccess'
      ],
      customPolicies: {
        vendorManagement: {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Action: [
                'dynamodb:*',
                'cognito-idp:*',
                'cloudwatch:PutMetricData'
              ],
              Resource: '*'
            }
          ]
        }
      }
    },
    vendorRole: {
      name: 'VendorUser',
      policies: [
        'arn:aws:iam::aws:policy/AWSLambdaBasicExecutionRole'
      ],
      customPolicies: {
        s3Access: {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Action: [
                's3:GetObject',
                's3:PutObject',
                's3:ListBucket'
              ],
              Resource: [
                'arn:aws:s3:::${bucket}/${prefix}/*',
                'arn:aws:s3:::${bucket}'
              ]
            }
          ]
        }
      }
    }
  },
  cognitoGroups: {
    admin: {
      groupName: 'Administrators',
      description: 'Admin group with full access',
      precedence: 1,
      roleArn: '${adminRoleArn}'
    },
    vendor: {
      groupName: 'Vendors',
      description: 'Vendor group with limited access',
      precedence: 2,
      roleArn: '${vendorRoleArn}'
    }
  },
  securityHeaders: {
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  }
};

module.exports = securityConfig;