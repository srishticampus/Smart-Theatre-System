import React, { useEffect, useState } from "react";
import "../../Assets/Styles/AdminViewTicketBookings.css";
import axios from "axios";
import { API_BASE_URL } from "../../Services/BaseURL";
import { Link } from "react-router-dom";

function AdminViewTicketBookings() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewAllTickets`)
      .then((res) => {
        if (res.data.status === 200) {
          const upcomingBookings = filterUpcomingBookings(res.data.data || []);
          setData(upcomingBookings);
          setFilteredData(upcomingBookings);
        } else {
          setData([]);
          setFilteredData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterUpcomingBookings = (bookings) => {
    const now = new Date();
    const currentDate = now.toISOString().slice(0, 10); // Format: YYYY-MM-DD
    const currentTime = now.toTimeString().slice(0, 5); // Format: HH:mm

    return bookings.filter((details) => {
      const bookingDate = details.movieDate.slice(0, 10);
      const showTime = details.showId.startTime;

      // If movie date is in the future, keep it
      if (bookingDate > currentDate) return true;

      // If movie date is today, check if show time is in the future
      if (bookingDate === currentDate && showTime > currentTime) return true;

      // Otherwise, it's a past booking and should be removed
      return false;
    });
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);

    if (date) {
      const filtered = data.filter(
        (ticket) => ticket.movieDate.slice(0, 10) === date
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
          <p>View Ticket Bookings</p>
        </div>

        <div className="d-flex justify-content-end">
          <p className="mx-2">Filter</p>
          <form>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </form>
        </div>

        <div className="mt-5">
          {filteredData.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr className="bg-danger table-head-column-size">
                  <th className="admin-parking-details-table-head">Sl No</th>
                  <th className="admin-parking-details-table-head">Name</th>
                  <th className="admin-parking-details-table-head">
                    Contact Number
                  </th>
                  <th className="admin-parking-details-table-head">
                    Booked Date
                  </th>
                  <th className="admin-parking-details-table-head">Amount</th>
                  <th className="admin-parking-details-table-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((details, i) => (
                  <tr key={i}>
                    <td>{i + 1}.</td>
                    <td className="admin-parking-details-td">
                      <p className="admin-parking-details-p">
                        {details.userId.name}
                      </p>
                    </td>
                    <td>
                      <p>{details.userId.contact}</p>
                    </td>
                    <td>
                      <p>{details.movieDate.slice(0, 10)}</p>
                    </td>
                    <td className="admin-parking-details-td">
                      <p className="admin-parking-details-p">
                        ₹{details.amount}/-
                      </p>
                    </td>
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
              <h1>No Bookings</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminViewTicketBookings;
