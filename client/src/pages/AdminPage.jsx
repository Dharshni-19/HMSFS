import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className='container'>
      <div>
        <Header title="Admin Dashboard" />
        <ul className='list d-flex'>
          <li><Link to="/admin/details">Admin Details</Link></li>
          <li><Link to="/admin/issues">Manage Issues</Link></li>
          <li><Link to="/admin/status">Hostel Status</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
