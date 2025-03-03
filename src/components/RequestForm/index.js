import React, { useState } from 'react';
import { API, Auth } from 'aws-amplify';
import { createVendorRequest } from '../../graphql/mutations';
import {
  TextField,
  Select,
  Button,
  Alert,
} from '@aws-amplify/ui-react';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorEmail: '',
    prefix: '',
    s3NamingConvention: '',
    destinationAccount: 'S3'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.currentAuthenticatedUser();
      const input = {
        ...formData,
        requestorEmail: user.attributes.email,
        status: 'PENDING'
      };

      await API.graphql({
        query: createVendorRequest,
        variables: { input }
      });

      // Trigger Lambda functions for email notifications
      await API.post('vendorAPI', '/notify', {
        body: {
          type: 'NEW_REQUEST',
          ...input
        }
      });

      alert('Request submitted successfully!');
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Vendor Name"
        value={formData.vendorName}
        onChange={e => setFormData({...formData, vendorName: e.target.value})}
        required
      />
      <TextField
        label="Vendor Email"
        type="email"
        value={formData.vendorEmail}
        onChange={e => setFormData({...formData, vendorEmail: e.target.value})}
        required
      />
      <TextField
        label="Prefix"
        value={formData.prefix}
        onChange={e => setFormData({...formData, prefix: e.target.value})}
        required
      />
      <TextField
        label="S3 Naming Convention"
        value={formData.s3NamingConvention}
        onChange={e => setFormData({...formData, s3NamingConvention: e.target.value})}
        required
      />
      <Select
        label="Destination Account"
        value={formData.destinationAccount}
        onChange={e => setFormData({...formData, destinationAccount: e.target.value})}
      >
        <option value="S3">S3</option>
        <option value="SHAREPOINT">SharePoint</option>
      </Select>
      <Button type="submit">Submit Request</Button>
    </form>
  );
};

export default RequestForm;