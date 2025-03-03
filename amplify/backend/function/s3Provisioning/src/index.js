const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const iam = new AWS.IAM();

exports.handler = async (event) => {
  const { vendorEmail, prefix, s3NamingConvention } = event;
  const bucketName = process.env.STORAGE_BUCKET;

  try {
    // Create vendor-specific IAM policy
    const policyDocument = {
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Action: [
          's3:PutObject',
          's3:GetObject',
          's3:ListBucket'
        ],
        Resource: [
          `arn:aws:s3:::${bucketName}/${prefix}/*`,
          `arn:aws:s3:::${bucketName}`
        ]
      }]
    };

    const policyName = `VendorAccess-${prefix}`;
    await iam.createPolicy({
      PolicyName: policyName,
      PolicyDocument: JSON.stringify(policyDocument)
    }).promise();

    // Create folder structure in S3
    await s3.putObject({
      Bucket: bucketName,
      Key: `${prefix}/`,
      Body: ''
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'S3 access provisioned successfully' })
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};