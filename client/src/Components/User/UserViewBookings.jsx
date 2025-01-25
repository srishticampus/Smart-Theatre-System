import React, { useEffect, useState } from "react";
import "../../Assets/Styles/UserViewBookings.css";
import axios from "axios";
import { API_BASE_URL } from "../../Services/BaseURL";
import { Link } from "react-router-dom";

function UserViewBookings() {
  const [data, setData] = useState([]);

  const id = localStorage.getItem("user");

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewTicketsByUserId/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="user_view_bookings_container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="user_view_bookings_title">
              <p>My Orders</p>
            </div>
          </div>
          <div className="col-lg-5 col-md-4 col-sm-12">
            <div className="user_view_bookings_card">
              <p className="user_view_bookings_movie_title">Demonte Colony</p>
              <p className="user_view_bookings_movie_type">
                Horror, Comedy | Tamil
              </p>
              <p className="user_view_bookings_time">
                Maxus Cinemas | Tuesday, November, 7:00 AM
              </p>
            </div>
          </div>
          <div className="col-lg-5 col-md-4 col-sm-12">
            <div className="user_view_bookings_card">
              <p className="user_view_bookings_ticket">Ticket Number : 23456</p>
              <div className="d-flex justify-content-between">
                <p className="user_view_bookings_seats">
                  Seat - A1, A2{" "}
                  <span className="user_view_bookings_movie_type">
                    (2 Tickets)
                  </span>
                </p>
                <p className="user_view_bookings_seats">₹ 320 /-</p>
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
                <Link to='/user-view-foods' className="btn btn-danger w-100 rounded-5">
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
        </div>
      </div>
    </div>
  );
}

export default UserViewBookings;
