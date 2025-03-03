import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listVendorRequests } from '../../graphql/queries';
import { updateVendorRequest } from '../../graphql/mutations';
import {
  Table,
  Button,
  Badge,
  Collection,
} from '@aws-amplify/ui-react';

const HistoryTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await API.graphql({ query: listVendorRequests });
      setRequests(data.listVendorRequests.items);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleReRequest = async (request) => {
    try {
      await API.post('vendorAPI', '/reRequest', {
        body: {
          requestId: request.id,
          vendorEmail: request.vendorEmail
        }
      });
      alert('Re-request submitted successfully');
    } catch (error) {
      console.error('Error re-requesting:', error);
    }
  };

  return (
    <div>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Vendor Name</Table.Cell>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>Date</Table.Cell>
            <Table.Cell>Actions</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {requests.map((request) => (
            <Table.Row key={request.id}>
              <Table.Cell>{request.vendorName}</Table.Cell>
              <Table.Cell>
                <Badge variation={request.status === 'APPROVED' ? 'success' : 'warning'}>
                  {request.status}
                </Badge>
              </Table.Cell>
              <Table.Cell>{new Date(request.createdAt).toLocaleDateString()}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => handleReRequest(request)}>Re-Request</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default HistoryTable;