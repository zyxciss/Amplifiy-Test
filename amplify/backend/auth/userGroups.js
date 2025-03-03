exports.userGroups = {
  ADMIN: {
    groupName: "Administrators",
    precedence: 1,
    customPolicies: [
      {
        policyName: "AdminFullAccess",
        policyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Action: [
                "s3:*",
                "dynamodb:*"
              ],
              Resource: "*"
            }
          ]
        }
      }
    ]
  },
  VENDOR: {
    groupName: "Vendors",
    precedence: 2
  }
};