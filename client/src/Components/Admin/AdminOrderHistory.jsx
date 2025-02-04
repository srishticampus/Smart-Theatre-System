import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Services/BaseURL";
import { Link } from "react-router-dom";

function AdminOrderHistory() {
  const [pastBookings, setPastBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewAllTickets`)
      .then((res) => {
        if (res.data.status === 200) {
          const history = filterPastBookings(res.data.data || []);
          setPastBookings(history);
          setFilteredBookings(history);
        } else {
          setPastBookings([]);
          setFilteredBookings([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterPastBookings = (bookings) => {
    const now = new Date();
    const currentDate = now.toISOString().slice(0, 10); // Format: YYYY-MM-DD
    const currentTime = now.toTimeString().slice(0, 5); // Format: HH:mm

    return bookings.filter((details) => {
      const bookingDate = details.movieDate.slice(0, 10);
      const showTime = details.showId.startTime;

      if (bookingDate < currentDate) return true;
      if (bookingDate === currentDate && showTime < currentTime) return true;

      return false;
    });
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);

    if (date) {
      const filtered = pastBookings.filter(
        (booking) => booking.movieDate.slice(0, 10) === date
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(pastBookings);
    }
  };

  return (
    <div>
      <div className="admin_order_history">
        <div className="admin_view_tickets_title">
          <p>Order History</p>
        </div>

        {/* Filter Section */}
        <div className="d-flex justify-content-end">
          <p className="mx-2">Filter by Date</p>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </div>

        <div className="mt-5">
          {filteredBookings.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr className="bg-secondary text-white">
                  <th>Sl No</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Movie Date</th>
                  <th>Show Time</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((details, i) => (
                  <tr key={i}>
                    <td>{i + 1}.</td>
                    <td>{details.userId.name}</td>
                    <td>{details.userId.contact}</td>
                    <td>{details.movieDate.slice(0, 10)}</td>
                    <td>{details.showId.startTime}</td>
                    <td>₹{details.amount}/-</td>
                    <td>
                      <Link
                        to={`/admin-booking-details-single/${details._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <p className="text-danger text-center">
                          <i className="ri-eye-fill"></i>
                        </p>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center mt-5">
              <h1>No Past Bookings Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOrderHistory;
