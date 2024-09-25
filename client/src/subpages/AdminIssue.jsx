import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import AdminPage from '../pages/AdminPage';

const AdminIssue = () => {
  const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/issues');
            const jsonData = await response.json();
            setData(jsonData);
        }
        fetchData();
    }, []);

  return (
    <div>
      <AdminPage />
      <h2>Manage Issues</h2>
      {/* <DataTable columns={['Issue', 'Room', 'Status']} data={issues} /> */}
      {data && <DataTable columns={["name", "roomID", "role", "issue"]} data={data} />}
    </div>
  );
};

export default AdminIssue;
