import React, { useEffect, useState } from "react";
import "../../Assets/Styles/UserViewBookings.css";
import axios from "axios";
import { API_BASE_URL } from "../../Services/BaseURL";
import { Link } from "react-router-dom";
// import { format } from "date-fns";

function UserViewBookings() {
  const [data, setData] = useState([]);

  const id = localStorage.getItem("user");

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewTicketsByUserId/${id}`)
      .then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          setData(res.data.data || []);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getMonthName = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleString("default", { month: "long" }); // Extracts full month name
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
              return (
                <>
                  <div className="col-lg-5 col-md-4 col-sm-12">
                    <div className="user_view_bookings_card">
                      <p className="user_view_bookings_movie_title">
                        {details.movieId.movieName}
                      </p>
                      <p className="user_view_bookings_movie_type">
                        {details.movieId.movieType} | {details.movieId.language}
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
                      <p className="user_view_bookings_ticket">
                        Ticket Number : 23456
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

                        <p className="user_view_bookings_seats">₹ {details.amount} /-</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="user_view_bookings_seats mb-0">
                          Pepsi-1, Puffs-2, Sandwich-3
                        </p>
                        <p className="user_view_bookings_seats">₹ 260 /-</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="user_view_bookings_seats m-0">
                          Bike parking - A12
                        </p>
                        <p className="user_view_bookings_seats m-0">₹ 60 /-</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-2 col-md-4 col-sm-12">
                    <div className="user_view_bookings_buttons">
                      <div>
                        <Link
                          to="/user-view-foods"
                          className="btn btn-danger w-100 rounded-5"
                        >
                          Pre - Order Food
                        </Link>
                        <button className="btn btn-danger w-100 rounded-5 mt-3">
                          Book Parking
                        </button>
                        <button className="btn btn-outline-danger w-100 rounded-5 mt-3">
                          Cancel ticket
                        </button>
                      </div>
                    </div>
                  </div>
                </>
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
