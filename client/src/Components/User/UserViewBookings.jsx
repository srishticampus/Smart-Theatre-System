import React, { useEffect, useState } from "react";
import "../../Assets/Styles/UserViewBookings.css";
import axios from "axios";
import { API_BASE_URL } from "../../Services/BaseURL";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function UserViewBookings() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState({});
  const [parkingData, setParkingData] = useState({});
  const [foodData, setFoodData] = useState({ foodItems: [] });

  const id = localStorage.getItem("user");

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewTicketsByUserId/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const tickets = res.data.data || [];
          setData(tickets);
          fetchParkingDetails(tickets);
          fetchFoodDetails(tickets); // Fetch food details
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching tickets:", err);
      });
  }, []);

  const fetchParkingDetails = (tickets) => {
    const parkingPromises = tickets.map((ticket) =>
      axios
        .post(`${API_BASE_URL}/viewParkingByTicketId/${ticket._id}`)
        .then((res) => {
          if (res.data.data && res.data.data._id) {
            return { ticketId: ticket._id, parking: res.data.data };
          } else {
            return { ticketId: ticket._id, parking: null };
          }
        })
        .catch((err) => {
          console.error(
            `Error fetching parking for ticket ${ticket._id}:`,
            err
          );
          return { ticketId: ticket._id, parking: null };
        })
    );

    Promise.all(parkingPromises)
      .then((results) => {
        const parkingInfo = {};
        results.forEach((result) => {
          if (result) {
            parkingInfo[result.ticketId] = result.parking;
            // parkingInfo[result.ticketId] = result.parking;
          }
        });
        setParkingData(parkingInfo);
      })
      .catch((err) => {
        console.error("Error processing parking data:", err);
      });
  };

  const fetchFoodDetails = (tickets) => {
    const foodPromises = tickets.map((ticket) =>
      axios
        .post(`${API_BASE_URL}/viewFoodBookingByTicketId/${ticket._id}`)
        .then((res) => {
          if (res.data.data && res.data.data._id) {
            return { ticketId: ticket._id, food: res.data.data };
          } else {
            return { ticketId: ticket._id, food: null };
          }
        })
        .catch((err) => {
          console.error(`Error fetching food for ticket ${ticket._id}:`, err);
          return { ticketId: ticket._id, food: null };
        })
    );

    Promise.all(foodPromises)
      .then((results) => {
        const foodInfo = {};
        results.forEach((result) => {
          if (result) {
            foodInfo[result.ticketId] = result.food;
          }
        });
        setFoodData(foodInfo);
      })
      .catch((err) => {
        console.error("Error processing food data:", err);
      });
  };

  const getMonthName = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleString("default", { month: "long" });
  };

  const cancelTicket = (tId) => {
    axios
      .post(`${API_BASE_URL}/deleteTicketById/${tId}`)
      .then((res) => {
        if (res.data.status === 200) {
          toast.error("Ticket Cancelled");
          setData((prevData) =>
            prevData.filter((ticket) => ticket._id !== tId)
          );
        }
      })
      .catch((err) => {
        console.error("Error canceling ticket:", err);
      });
  };

  console.log(data);
  


  return (
    <div className="user_view_bookings_container">
      <div className="container">
        <div className="row">
          <div className="user_view_bookings_title">
            <p>My Orders</p>
          </div>
          {data.length ? (
            data.map((details) => {
              const parking = parkingData[details._id];
              const food = foodData[details._id];

              return (
                <div key={details._id} className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-5 col-md-4 col-sm-12">
                      <div className="user_view_bookings_card">
                        <p className="user_view_bookings_movie_title">
                          {details.movieId.movieName}
                        </p>
                        <p className="user_view_bookings_movie_type">
                          {details.movieId.movieType} |{" "}
                          {details.movieId.language}
                        </p>
                        <p className="user_view_bookings_time">
                          Maxus Cinemas | {details.showId.day},{" "}
                          {getMonthName(details.movieDate)},{" "}
                          {details.showId.startTime}
                        </p>
                      </div>
                    </div>

                    <div className="col-lg-5 col-md-4 col-sm-12">
                      <div className="user_view_bookings_card">
                        <p className="user_view_bookings_ticket text-uppercase">
                          Ticket Number : {details._id.slice(1, 6)}
                        </p>
                        <div className="d-flex justify-content-between">
                          <p className="user_view_bookings_seats">
                            Seat -{" "}
                            {details.seatNumber.map((seat, index) => (
                              <span key={index}>
                                {seat.label}
                                {seat.number}
                                {index !== details.seatNumber.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))}
                            <span className="user_view_bookings_movie_type">
                              ({details.seatNumber.length} Tickets)
                            </span>
                          </p>

                          <p className="user_view_bookings_seats">
                            ₹ {details.amount} /-
                          </p>
                        </div>

                        <div className="d-flex justify-content-between">
                          {foodData[details._id] ? (
                            <>
                              <p className="user_view_bookings_seats mb-0">
                                {foodData[details._id].foodItems.map(
                                  (item, index) => (
                                    <span key={index}>
                                      {item.foodItem}-{item.quantity}
                                      {index !==
                                      foodData[details._id].length - 1
                                        ? ", "
                                        : ""}
                                    </span>
                                  )
                                )}
                              </p>
                              <p className="user_view_bookings_seats">
                                ₹ {foodData[details._id].totalAmount} /-
                              </p>
                            </>
                          ) : (
                            <p className="user_view_bookings_seats m-0">
                              No food booked
                            </p>
                          )}
                        </div>

                        {/* Parking Details */}
                        <div className="d-flex justify-content-between">
                          {parking ? (
                            <>
                              <p className="user_view_bookings_seats m-0">
                                {parking.vehicleType} Parking - {parking.slotNo}
                              </p>
                              <p className="user_view_bookings_seats m-0">
                                ₹ {parking.amount} /-
                              </p>
                            </>
                          ) : (
                            <p className="user_view_bookings_seats m-0">
                              No parking booked
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-2 col-md-4 col-sm-12">
                      <div className="user_view_bookings_buttons">
                        <div>
                        {!food && (

                          <Link
                            to={`/user-view-foods/${details._id}`}
                            className="btn btn-danger w-100 rounded-5"
                          >
                            Pre - Order Food
                          </Link>
                          )}

                          {!parking && (
                            <Link to={`/user-view-parking/${details._id}`}>
                              <button className="btn btn-danger w-100 rounded-5 mt-3">
                                Book Parking
                              </button>
                            </Link>
                          )}
                          <button
                            type="button"
                            onClick={() => cancelTicket(details._id)}
                            className="btn btn-outline-danger w-100 rounded-5 mt-3"
                          >
                            Cancel ticket
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h1 className="text-center fs-1 mt-5">No Booking Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserViewBookings;
