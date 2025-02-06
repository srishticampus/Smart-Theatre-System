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
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const id = localStorage.getItem("user");

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewTicketsByUserId/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const tickets = res.data.data.reverse() || [];
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

  const openModal = (ticketId) => {
    setSelectedTicket(ticketId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setRating(0);
    setComment("");
  };

  const submitRating = () => {
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    axios
      .post(`${API_BASE_URL}/addFeedback`, {
        userId: localStorage.getItem('user'),
        rating:rating,
        comment:comment,
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Thank you for your feedback!");
          closeModal();
        }
      })
      .catch((err) => {
        console.error("Error submitting rating:", err);
        toast.error("Something went wrong!");
      });
  };

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

              // Construct show date and time
              const showDateTime = new Date(details.movieDate);
              const [hours, minutes] = details.showId.startTime
                .split(":")
                .map(Number);
              showDateTime.setHours(hours, minutes, 0, 0); // Set show start time

              const currentTime = new Date(); // Get current date and time
              const isShowPassed = currentTime > showDateTime; // Check if show time has passed

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
                          {details.movieDate.slice(8, 10)}{" "}
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
                          {food ? (
                            <>
                              <p className="user_view_bookings_seats mb-0">
                                {food.foodItems.map((item, index) => (
                                  <span key={index}>
                                    {item.foodItem}-{item.quantity}
                                    {index !== food.foodItems.length - 1
                                      ? ", "
                                      : ""}
                                  </span>
                                ))}
                              </p>
                              <p className="user_view_bookings_seats">
                                ₹ {food.totalAmount} /-
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

                    {/* Hide buttons if show has passed */}
                    {/* Buttons Section */}
                    <div className="col-lg-2 col-md-4 col-sm-12">
                      <div className="user_view_bookings_buttons">
                        <div>
                          {!isShowPassed ? (
                            <>
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
                            </>
                          ) : (
                            <button
                              className="btn btn-outline-warning w-100 rounded-5 mt-3"
                              onClick={() => openModal(details._id)}
                            >
                              Rate Us
                            </button>
                          )}
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
        {showModal && (
          <div className="rating-modal-overlay">
            <div className="rating-modal-content">
              <span className="rating-close-button" onClick={closeModal}>
                ✖
              </span>
              <h3 className="text-center">Rate Your Experience</h3>

              {/* Rating Stars */}
              <div className="rating-stars text-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      fontSize: "24px",
                      cursor: "pointer",
                      color: star <= rating ? "#ffc107" : "#ccc",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Comment Box */}
              <textarea
                className="form-control mt-3"
                placeholder="Leave a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              {/* Buttons */}
              <div className="text-center mt-3">
                <button className="btn btn-success me-2" onClick={submitRating}>
                  Submit
                </button>
                <button className="btn btn-danger" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserViewBookings;
