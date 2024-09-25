import React, { useEffect, useState } from 'react';
import StudentPage from '../pages/StudentPage';
import DataTable from '../components/DataTable';

const StudentRoom = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/rooms');
            const jsonData = await response.json();
            setData(jsonData);
        }
        fetchData();
    }, []);
    const handleAdd = () => {
        console.log('Add button clicked');
    };


    const handleBookRoom = () => {
        console.log('Book Room button clicked');
    };
  return (
    <div>
        <StudentPage />
        {data && <DataTable columns={["name", "roomID", "type", "role"]} data={data} />}
      <h2>Room Info</h2>
      <p>Check your room information and current status.</p>
      <button onClick={handleAdd} className="add-btn">Add</button>
            <button onClick={handleBookRoom} className="book-room-btn">Book Room</button>
    </div>
  );
};

export default StudentRoom;
