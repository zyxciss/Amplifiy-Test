const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {
  const records = event.Records;

  for (const record of records) {
    if (record.eventName === 'MODIFY') {
      const newImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      const oldImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);

      if (newImage.status !== oldImage.status) {
        await sendStatusUpdateEmail(newImage);
      }
    }
  }
};

async function sendStatusUpdateEmail(request) {
  const template = getEmailTemplate(request.status);
  const params = {
    Source: process.env.SENDER_EMAIL,
    Destination: {
      ToAddresses: [request.vendorEmail, request.requestorEmail]
    },
    Message: {
      Subject: {
        Data: `Vendor Access Request Status Update - ${request.status}`
      },
      Body: {
        Html: {
          Data: template
        }
      }
    }
  };

  await ses.sendEmail(params).promise();
}