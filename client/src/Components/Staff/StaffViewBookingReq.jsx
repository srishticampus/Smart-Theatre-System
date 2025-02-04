import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../Services/BaseURL";
import { toast } from "react-toastify";

function StaffViewFoodBookingReq() {
  const [data, setData] = useState([]); // Stores all bookings
  const [filteredData, setFilteredData] = useState([]); // Stores filtered bookings
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewAllFoodBookings`)
      .then((res) => {
        if (res.data.status === 200) {
          const bookings = res.data.data.reverse();
          setData(bookings);
          setFilteredData(bookings); // Initially set filtered data same as all data
        } else {
          setData([]);
          setFilteredData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to check if the "Delivered" button should be enabled
  const canDeliver = (movieDate, showTime) => {
    const today = new Date();
    const currentDate = today.toISOString().slice(0, 10); // Format: YYYY-MM-DD
    const currentTime = today.toTimeString().slice(0, 5); // Format: HH:MM

    if (movieDate === currentDate) {
      return showTime <= currentTime; // Show time should be <= current time
    }
    return movieDate < currentDate;
  };

  // Function to filter bookings by selected date
  const handleDateChange = (event) => {
    const selected = event.target.value;
    setSelectedDate(selected);

    if (selected === "") {
      setFilteredData(data); // Reset if no date selected
    } else {
      const filtered = data.filter((booking) => booking.movieDate.slice(0, 10) === selected);
      setFilteredData(filtered);
    }
  };

  // Function to confirm delivery and update the state
  const confirmDelivery = (id) => {
    axios
      .post(`${API_BASE_URL}/confirmDelivery/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Delivery Confirmed");
          setFilteredData((prevData) => prevData.filter((item) => item._id !== id));
          setData((prevData) => prevData.filter((item) => item._id !== id)); // Also update main data
        }
      })
      .catch((err) => {
        console.error("Error confirming delivery:", err);
      });
  };

  return (
    <div>
      <div className="admin_view_tickets">
        <div className="admin_view_tickets_title">
          <p>View Food Bookings</p>
        </div>

        {/* Date Filter Section */}
        <div className="d-flex justify-content-end">
          <p className="mx-2">Filter by Date:</p>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </div>

        <div className="mt-5">
          {filteredData.some((e) => e.status === false) ? (
            <table className="table table-bordered">
              <thead>
                <tr className="bg-danger table-head-column-size">
                  <th>Sl No</th>
                  <th>Movie Name</th>
                  <th>Name</th>
                  <th>Seats</th>
                  <th>Food Items</th>
                  <th>Screen</th>
                  <th>Date & Time</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((e, i) => {
                  if (e.status === false) {
                    const movieDate = e.movieDate.slice(0, 10);
                    const showTime = e.ticketId.showId.startTime;

                    return (
                      <tr key={e._id}>
                        <td>{i + 1}</td>
                        <td>
                          <p>{e.ticketId.movieId.movieName}</p>
                        </td>
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
                          <p>
                            {e.ticketId.seatNumber
                              .map((seat) => `${seat.label}-${seat.number}`)
                              .join(", ")}
                          </p>
                        </td>
                        <td>
                          <p>
                            {e.foodItems
                              .map((food) => `${food.foodItem}(${food.quantity})`)
                              .join(", ")}
                          </p>
                        </td>
                        <td>
                          <p>{e.ticketId.screenId.screenName}</p>
                        </td>
                        <td>
                          <p>
                            {movieDate} <br />
                            <span className="text-secondary">
                              <small>{showTime}</small>
                            </span>
                          </p>
                        </td>
                        <td>
                          <p>₹{e.totalAmount}/-</p>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => confirmDelivery(e._id)}
                            disabled={!canDeliver(movieDate, showTime)}
                          >
                            Delivered
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          ) : (
            <h1 className="text-center">No Bookings Found</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default StaffViewFoodBookingReq;
