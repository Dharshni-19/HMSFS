import React, { useEffect, useState } from 'react';
import AdminPage from '../pages/AdminPage';
import DataTable from '../components/DataTable';


const AdminStatus = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/rooms');
            const jsonData = await response.json();
            setData(jsonData);
        }
        fetchData();
    }, []);

    const handlePending = (item) => {
        console.log(`Pending for roomID: ${item.roomID}`);
    };

    const handleResolved = (item) => {
        console.log(`Resolved for roomID: ${item.roomID}`);
    };

    const handleRejected = (item) => {
        console.log(`Rejected for roomID: ${item.roomID}`);
    };

    return (
        <div>
            <AdminPage />
            {data && <DataTable columns={["name", "roomID", "type", "role"]} data={data} />}
            <h2>Hostel Status</h2>
            <p>Overview of hostel rooms and availability.</p>
            <button onClick={() => handlePending(row.original)} className="pending-btn">Pending</button>
             <button onClick={() => handleResolved(row.original)} className="resolved-btn">Resolved</button>
            <button onClick={() => handleRejected(row.original)} className="rejected-btn">Rejected</button>
        </div>
    );
};

export default AdminStatus;