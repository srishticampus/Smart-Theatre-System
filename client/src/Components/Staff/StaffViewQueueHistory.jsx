import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../Services/BaseURL';

function StaffViewQueueHistory() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        axios.post(`${API_BASE_URL}/viewAllQueues`)
            .then((res) => {
                if (res.data.status === 200) {
                    setData(res.data.data);
                    setFilteredData(res.data.data); // Initialize filtered data with all records
                } else {
                    setData([]);
                    setFilteredData([]);
                }
            })
            .catch((err) => {
                console.log("Error fetching booked seats:", err);
            });
    }, []);

    // Handle date filtering
    const handleDateChange = (event) => {
        const selected = event.target.value;
        setSelectedDate(selected);

        if (selected) {
            const filtered = data.filter(details =>
                details.date.slice(0, 10) === selected &&
                (details.status === "completed" || details.status === "cancel")
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(data); // Reset to all data if no date is selected
        }
    };

    return (
        <div>
            <div className="admin_view_tickets_title">
                <p>Manage Queues</p>
            </div>
            <div className="d-flex justify-content-end">
                <p className="mx-2">Filter by Date</p>
                <input type="date" value={selectedDate} onChange={handleDateChange} />
            </div>

            <div className="mt-5">
                {filteredData.length > 0 ? (
                    <table className="table table-bordered">
                        <thead>
                            <tr className="bg-secondary text-white">
                                <th>Sl No</th>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Movie Date</th>
                                <th>Show Time</th>
                                <th>Seat Count</th>
                                <th>Status</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((details, i) => (
                                <tr key={i}>
                                    <td>{i + 1}.</td>
                                    <td>{details.userId.name}</td>
                                    <td>{details.userId.contact}</td>
                                    <td>{details.date.slice(0, 10)}</td>
                                    <td>
                                        {details.showId.startTime} - {details.showId.endTime}
                                    </td>
                                    <td>{details.seatCount}</td>
                                    <td>{details.status}</td>
                                    <td>₹100/-</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center mt-5">
                        <h1>No Completed or Canceled Queues Found</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StaffViewQueueHistory;
