import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../Services/BaseURL';

function StaffViewParking() {

    const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewAllParking`)
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.data);
          setFilteredData(res.data.data); // Set initial filtered data
        } else {
          setData([]);
          setFilteredData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);

    if (date) {
      const filtered = data.filter(
        (booking) => booking.date.slice(0, 10) === date
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div>
      <div className="admin_view_tickets">
        <div className="admin_view_tickets_title">
          <p>View Parking Bookings</p>
        </div>

        {/* Filter Section */}
        <div className="d-flex justify-content-end">
          <p className="mx-2">Filter by Date</p>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </div>

        <div className="mt-5">
          {filteredData.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr className="bg-danger table-head-column-size">
                  <th>Sl No</th>
                  <th>Name</th>
                  <th>Show Date</th>
                  <th>Show Time</th>
                  <th>Seats</th>
                  <th>Slot Booked</th>
                  <th>Vehicle Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((e, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <p>
                        {e.userId.name}
                        <br />
                        <span className="text-secondary">
                          <small>{e.userId.contact}</small>
                        </span>
                      </p>
                    </td>
                    <td>
                      <p>{e.date.slice(0, 10)}</p>
                    </td>
                    <td>
                      <p>{e.ticketId.showId.startTime}</p>
                    </td>
                    <td>
                      <p>
                        {e.ticketId.seatNumber
                          .map((seat) => `${seat.label}-${seat.number}`)
                          .join(", ")}
                      </p>
                    </td>
                    <td>
                      <p>{e.slotNo}</p>
                    </td>
                    <td>
                      <p>{e.vehicleType}</p>
                    </td>
                    <td>
                      <p>₹{e.amount}/-</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1 className="text-center mt-5">No Parking Found</h1>
          )}
        </div>
      </div>
    </div>
  )
}

export default StaffViewParking
