import React, { useEffect, useState } from "react";
import "../../Assets/Styles/AdminDashboard.css";
import "../../Assets/Styles/StaffDashboard.css";

import img from "../../Assets/Images/admin.jpg";
import { Link, useNavigate } from "react-router-dom";

function StaffDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("staff") == null) {
      navigate("/admin_login");
    }
  });

  const [users, setUsers] = useState(0);
  const [parking, setParking] = useState(0);
  const [staff, setStaff] = useState(0);

  useEffect(() => {}, []);

  return (
    <div className="admin_dashboard">
      <div className="container">
        <Link to={'/staff-add-user'}>
        <button className="btn btn-danger text-end">Book Tickets</button>
        </Link>
      

        <div className="row">
          <div className="admin_dashboard_card_container">
            <div className="staff_dashboard_cards_new mt-2">
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
                  <p>{users}</p>
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
                  <p>{staff}</p>
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
                    <p>{parking}</p>
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
                    <p>{parking}</p>
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
