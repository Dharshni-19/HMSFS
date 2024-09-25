import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const StudentPage = () => {
  return (
    <div>
      <Header title="Student Dashboard" />
      <nav>
        <ul>
          <li><Link to="/student/issues">View Issues</Link></li>
          <li><Link to="/student/room">Room Info</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default StudentPage;
