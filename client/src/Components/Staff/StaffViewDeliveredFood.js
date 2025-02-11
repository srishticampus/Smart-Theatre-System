import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../Services/BaseURL";

function StaffViewDeliveredFood() {
  const [data, setData] = useState([]); // Stores all delivered bookings
  const [filteredData, setFilteredData] = useState([]); // Stores filtered bookings
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewAllFoodBookings`)
      .then((res) => {
        if (res.data.status === 200) {
          const deliveredBookings = res.data.data.filter((e) => e.status === true);
          setData(deliveredBookings);
          setFilteredData(deliveredBookings); // Initially set filtered data same as all data
        } else {
          setData([]);
          setFilteredData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return (
    <div>
      <div className="admin_view_tickets">
        <div className="admin_view_tickets_title">
          <p>View Delivered Food Orders</p>
        </div>

        {/* Date Filter Section */}
        <div className="d-flex justify-content-end">
          <p className="mx-2">Filter by Date:</p>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </div>

        <div className="mt-5">
          {filteredData.length > 0 ? ( 
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
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((e, i) => {
                  const movieDate = e.movieDate.slice(0, 10);
                  const showTime = e.ticketId.showId.startTime;

                  return (
                    <tr key={e._id}>
                      <td>{i + 1}</td>
                      <td>
                        <p>{e?.ticketId?.movieId?.movieName}</p>
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
                    </tr>
                  );
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

export default StaffViewDeliveredFood;
