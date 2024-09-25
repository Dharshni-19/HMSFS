import React, { useEffect, useState } from 'react';
import StudentPage from '../pages/StudentPage';
import DataTable from '../components/DataTable';

const StudentIssue = () => {
    const [data, setData] = useState([]);

    // Fetching the data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/issues');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching issues:", error);
            }
        }
        fetchData();
    }, []);

    // Function to handle adding a new issue
    const handleAdd = async () => {
        try {
            const rawResponse = await fetch('http://localhost:3000/issues', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: "Veevan",
                    roomID: "08",
                    role: "guest",
                    issue: "Water leakage"
                })
            });

            if (rawResponse.ok) {
                const newIssue = await rawResponse.json();
                // Update the state to include the new issue
                setData(prevData => [...prevData, newIssue]);
            } else {
                console.error('Failed to add the issue');
            }
        } catch (error) {
            console.error("Error adding issue:", error);
        }
    };

    return (
        <div>
            <StudentPage />
            {data && <DataTable columns={["name", "roomID", "issue", "role"]} data={data} />}
            {/* <h2>Report Issues</h2>
            <p>Students can report any issues related to hostel facilities here.</p> */}
            <button onClick={handleAdd} className="add-btn btn btn-primary">Add</button>
        </div>
    );
};

export default StudentIssue;
