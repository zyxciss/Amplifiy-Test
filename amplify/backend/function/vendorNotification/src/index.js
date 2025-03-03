const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {
  const { type, vendorEmail, requestorEmail, vendorName } = JSON.parse(event.body);

  const params = {
    Source: 'your-verified-email@domain.com',
    Destination: {
      ToAddresses: [type === 'NEW_REQUEST' ? vendorEmail : requestorEmail]
    },
    Message: {
      Subject: {
        Data: `Vendor Access Request - ${type}`
      },
      Body: {
        Text: {
          Data: getEmailContent(type, { vendorName, vendorEmail })
        }
      }
    }
  };

  try {
    await ses.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

function getEmailContent(type, data) {
  switch (type) {
    case 'NEW_REQUEST':
      return `New vendor access request created for ${data.vendorName}`;
    case 'RE_REQUEST':
      return `Access re-request for vendor ${data.vendorName}`;
    default:
      return 'Vendor access request notification';
  }
}