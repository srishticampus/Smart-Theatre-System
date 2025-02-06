import React, { useEffect, useState } from "react";
import "../../Assets/Styles/AdminDashboard.css";
import "../../Assets/Styles/StaffDashboard.css";

import img from "../../Assets/Images/admin.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../Services/BaseURL";

function StaffDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("staff") == null) {
      navigate("/admin_login");
    }
  });

  const [bookings, setsetBookings] = useState([]);
  const [parking, setParking] = useState([]);
  const [food, setFood] = useState([]);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewAllTickets`)
      .then((res) => {
        if (res.data.status == 200) {
          setsetBookings(res.data.data);
        } else {
          setsetBookings([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios.post(`${API_BASE_URL}/viewAllQueues`).then((res) => {
      if (res.data.status == 200) {
        setQueue(res.data.data);
      } else {
        setQueue([]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
    axios.post(`${API_BASE_URL}/viewAllParking`).then((res) => {
      if (res.data.status == 200) {
        setParking(res.data.data);
      } else {
        setParking([]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
    axios.post(`${API_BASE_URL}/viewAllFoodBookings`).then((res) => {
      if (res.data.status == 200) {
        setFood(res.data.data);
      } else {
        setFood([]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="admin_dashboard">
      <div className="container">
        <Link to={"/staff-add-user"}>
          <button className="btn btn-danger text-end">Book Tickets</button>
        </Link>

        <div className="row mt-2">
          <div className="admin_dashboard_card_container">
            <div className="staff_dashboard_cards_new mb-2">
              <div>
                <div className="admin_dashboard_cards_icon mx-1">
                  <i class="ri-user-line"></i>
                </div>
              </div>
              <div className="text-center">
                <div className="admin_dashboard_cards_user_type ">
                  <p className="fs-24">Ticket Booking</p>
                </div>
                <div className="admin_dashboard_cards_count">
                  <p>{bookings.length}</p>
                </div>
              </div>
            </div>
            <div className="staff_dashboard_cards_new">
              <div>
                <div className="admin_dashboard_cards_icon mx-1">
                  <i class="ri-movie-2-line"></i>
                </div>
              </div>
              <div className="text-center">
                <div className="admin_dashboard_cards_user_type">
                  <p className="fs-24">Virtual Queue </p>
                </div>
                <div className="admin_dashboard_cards_count">
                  <p>{queue.length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="admin_dashboard_card_container">
              <div className="staff_dashboard_cards_new">
                <div>
                  <div className="admin_dashboard_cards_icon mx-1">
                    <i class="ri-ball-pen-line"></i>
                  </div>
                </div>
                <div className="text-center">
                  <div className="admin_dashboard_cards_user_type ">
                    <p className="ms-3 fs-24">Food Orders</p>
                  </div>
                  <div className="admin_dashboard_cards_count">
                    <p>{food.length}</p>
                  </div>
                </div>
              </div>
              <div className="staff_dashboard_cards_new">
                <div>
                  <div className="admin_dashboard_cards_icon mx-1">
                    <i class="ri-ball-pen-line"></i>
                  </div>
                </div>
                <div className="text-center">
                  <div className="admin_dashboard_cards_user_type">
                    <p className="ms-3 fs-24">Parking Booking</p>
                  </div>
                  <div className="admin_dashboard_cards_count">
                    <p>{parking.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
