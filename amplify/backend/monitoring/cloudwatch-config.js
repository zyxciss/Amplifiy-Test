const cloudwatchConfig = {
  alarms: {
    // API Gateway alarms
    apiLatency: {
      namespace: 'AWS/ApiGateway',
      metricName: 'Latency',
      threshold: 1000, // 1 second
      evaluationPeriods: 3,
      period: 300, // 5 minutes
      statistic: 'Average',
      alarmDescription: 'API Gateway latency is too high'
    },
    api4xxErrors: {
      namespace: 'AWS/ApiGateway',
      metricName: '4XXError',
      threshold: 10,
      evaluationPeriods: 3,
      period: 300,
      statistic: 'Sum',
      alarmDescription: 'Too many 4XX errors in API Gateway'
    },
    // Lambda function alarms
    lambdaErrors: {
      namespace: 'AWS/Lambda',
      metricName: 'Errors',
      threshold: 2,
      evaluationPeriods: 2,
      period: 300,
      statistic: 'Sum',
      alarmDescription: 'Lambda function errors detected'
    },
    lambdaThrottles: {
      namespace: 'AWS/Lambda',
      metricName: 'Throttles',
      threshold: 5,
      evaluationPeriods: 2,
      period: 300,
      statistic: 'Sum',
      alarmDescription: 'Lambda function throttling detected'
    }
  },
  // Custom metrics for business logic monitoring
  customMetrics: {
    vendorRequestsCreated: {
      namespace: 'VendorAccessManagement',
      metricName: 'VendorRequestsCreated',
      unit: 'Count'
    },
    vendorRequestsApproved: {
      namespace: 'VendorAccessManagement',
      metricName: 'VendorRequestsApproved',
      unit: 'Count'
    },
    vendorRequestsDenied: {
      namespace: 'VendorAccessManagement',
      metricName: 'VendorRequestsDenied',
      unit: 'Count'
    },
    vendorRequestsExpired: {
      namespace: 'VendorAccessManagement',
      metricName: 'VendorRequestsExpired',
      unit: 'Count'
    }
  },
  // Log retention settings
  logRetention: {
    apiGatewayLogs: 30, // 30 days
    lambdaLogs: 30,     // 30 days
    customMetricLogs: 90 // 90 days
  }
};

module.exports = cloudwatchConfig;