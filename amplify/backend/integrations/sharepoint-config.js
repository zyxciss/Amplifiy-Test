const sharepointConfig = {
  auth: {
    clientId: process.env.SHAREPOINT_CLIENT_ID,
    clientSecret: process.env.SHAREPOINT_CLIENT_SECRET,
    tenantId: process.env.SHAREPOINT_TENANT_ID,
    siteUrl: process.env.SHAREPOINT_SITE_URL
  },
  permissions: {
    defaultPermissionLevel: 'Contribute',
    availablePermissions: [
      'Read',
      'Contribute',
      'Edit',
      'FullControl'
    ]
  },
  folderStructure: {
    rootFolder: 'VendorAccess',
    templateFolders: [
      'Incoming',
      'Processed',
      'Archive'
    ]
  },
  integration: {
    syncInterval: 300, // 5 minutes
    maxRetries: 3,
    timeoutSeconds: 30,
    batchSize: 100
  },
  monitoring: {
    enableMetrics: true,
    metricNamespace: 'VendorAccess/SharePoint',
    metrics: [
      'FolderCreationSuccess',
      'FolderCreationFailure',
      'PermissionUpdateSuccess',
      'PermissionUpdateFailure',
      'SyncOperationSuccess',
      'SyncOperationFailure'
    ]
  },
  errorHandling: {
    retryableErrors: [
      'ETIMEDOUT',
      'ECONNRESET',
      'ECONNREFUSED'
    ],
    notificationEmails: [
      process.env.ADMIN_EMAIL
    ]
  }
};

module.exports = sharepointConfig;