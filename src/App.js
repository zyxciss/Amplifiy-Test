import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Tabs } from '@aws-amplify/ui-react';
import RequestForm from './components/RequestForm';
import HistoryTable from './components/HistoryTable';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Tabs>
          <Tabs.Item title="Request">
            <RequestForm />
          </Tabs.Item>
          <Tabs.Item title="History">
            <HistoryTable />
          </Tabs.Item>
          <Tabs.Item title="Admin">
            <AdminPanel />
          </Tabs.Item>
        </Tabs>
      </div>
    </Router>
  );
}

export default App;