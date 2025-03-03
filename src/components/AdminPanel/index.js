import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listVendorRequests } from '../../graphql/queries';
import { updateVendorRequest } from '../../graphql/mutations';
import {
  Table,
  Button,
  SearchField,
  SelectField,
  Flex,
} from '@aws-amplify/ui-react';

const AdminPanel = () => {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    date: '',
    search: ''
  });

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

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await API.graphql({
        query: updateVendorRequest,
        variables: {
          input: {
            id: requestId,
            status: newStatus
          }
        }
      });
      fetchRequests();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleEmailChange = async (requestId, newEmail) => {
    try {
      await API.post('vendorAPI', '/updateEmail', {
        body: {
          requestId,
          newEmail
        }
      });
      fetchRequests();
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  return (
    <div>
      <Flex direction="row" gap="1rem" marginBottom="1rem">
        <SelectField
          label="Status"
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="DENIED">Denied</option>
        </SelectField>
        <SearchField
          label="Search"
          onChange={(e) => setFilters({...filters, search: e.target.value})}
        />
      </Flex>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Vendor Name</Table.Cell>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>Actions</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {requests.map((request) => (
            <Table.Row key={request.id}>
              <Table.Cell>{request.vendorName}</Table.Cell>
              <Table.Cell>{request.vendorEmail}</Table.Cell>
              <Table.Cell>{request.status}</Table.Cell>
              <Table.Cell>
                <Flex gap="0.5rem">
                  <Button onClick={() => handleStatusChange(request.id, 'APPROVED')}>
                    Approve
                  </Button>
                  <Button onClick={() => handleStatusChange(request.id, 'DENIED')}>
                    Deny
                  </Button>
                  <Button onClick={() => handleEmailChange(request.id)}>
                    Update Email
                  </Button>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AdminPanel;