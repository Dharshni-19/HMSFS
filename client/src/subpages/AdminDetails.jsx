import React, { useEffect, useState } from 'react';
import AdminPage from '../pages/AdminPage';
import DataTable from '../components/DataTable';

const AdminDetails = () => {
        const [data, setData] = useState([]);
    
        useEffect(() => {
            const fetchData = async () => {
                const response = await fetch('http://localhost:3000/users');
                const jsonData = await response.json();
                setData(jsonData);
            }
            fetchData();
        }, []);
    return (
        <div>
            <AdminPage />
            {data && <DataTable columns={["name", "userID", "password", "role"]} data={data} />}
            <h2>Admin Details</h2>
            <p>Manage hostel details and oversee operations.</p>
        </div>
    );
};

export default AdminDetails;
