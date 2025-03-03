exports.emailTemplates = {
  NEW_REQUEST: (data) => `
    <h2>New Vendor Access Request</h2>
    <p>A new vendor access request has been created:</p>
    <ul>
      <li>Vendor: ${data.vendorName}</li>
      <li>Email: ${data.vendorEmail}</li>
      <li>Prefix: ${data.prefix}</li>
    </ul>
  `,

  STATUS_UPDATE: (data) => `
    <h2>Request Status Update</h2>
    <p>Your vendor access request has been ${data.status.toLowerCase()}.</p>
    <p>Request Details:</p>
    <ul>
      <li>Vendor: ${data.vendorName}</li>
      <li>Status: ${data.status}</li>
      <li>Updated: ${new Date().toLocaleDateString()}</li>
    </ul>
  `,

  RE_REQUEST: (data) => `
    <h2>Access Re-Request</h2>
    <p>A re-request for vendor access has been submitted:</p>
    <ul>
      <li>Vendor: ${data.vendorName}</li>
      <li>Email: ${data.vendorEmail}</li>
    </ul>
  `
};