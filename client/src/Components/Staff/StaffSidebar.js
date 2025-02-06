import React, { useEffect, useState } from "react";
import "../../Assets/Styles/AdminSidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function StaffSidebar() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("staff") == null) navigate("/admin-login");
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("staff");
    toast.success("Logged out successfully.");
    navigate("/admin-login");
    setShowModal(false);
  };

  const handleView = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const [showMoviesDropdown, setShowMoviesDropdown] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);

  const toggleMoviesDropdown = () => {
    setShowMoviesDropdown(!showMoviesDropdown);
  };

  const toggleSubscriptionDropdown = () => {
    setShowSubscription(!showSubscription);
  };

  return (
    <div className="row-4">
      <div className="admin-sidebar">
        <div className="profile-div">
          <div className="row">
            <div className="col-md-12 col-sm-12 d-flex justify-content-center ">
              <label className="profile-label-staff fs-24">Staff</label>
            </div>
          </div>
        </div>

        <div className="content-div">
          <div className="div-style">
            <div>
              <div className="adjust-space">
                <Link to={"/staff-home"}>
                  <label className="label-sub">Dashboard</label>
                </Link>
              </div>

              <div className="adjust-space">
                <Link to={"/staff-view-ticket-booking"}>
                  <label className="label-sub">Ticket Bookings</label>
                </Link>
              </div>

              <div className="adjust-space">
                <Link to={"/staff-view-bookig-history"}>
                  <label className="label-sub">Order History</label>
                </Link>
              </div>

              <div className="adjust-space">
                <Link className="adjust-space" to={"/staff-view-movies-queues"}>
                  <label className="label-sub">Manage Queue</label>
                </Link>
              </div>
              <div className="adjust-space">
                <Link className="adjust-space" to={"/staff-view-queue-history"}>
                  <label className="label-sub">Queue History</label>
                </Link>
              </div>

              <div className="adjust-space">
                <div
                  className="adjust-space"
                  onClick={toggleSubscriptionDropdown}
                >
                  <label className="label-sub">Food Orders</label>
                </div>
                {showSubscription && (
                  <div className="custom-dropdown-menu">
                    <Link to={"/staff-view-food"}>
                      <div className="custom-dropdown-item">
                        <label className="label-sub">Food Items</label>
                      </div>
                    </Link>
                    <Link to={"/staff-food-booking-req"}>
                      <div className="custom-dropdown-item">
                        <label className="label-sub">Food Ordered</label>
                      </div>
                    </Link>

                    <Link to={"/staff-view-delivered-foods"}>
                      <div className="custom-dropdown-item">
                        <label className="label-sub">Food Delivered</label>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <div className="adjust-space">
                <Link to={"/staff-parking-details"}>
                  <label className="label-sub">Parking</label>
                </Link>
              </div>
{/* 
              <div className="adjust-space">
                <Link to={""}>
                  <label className="label-sub">Feedback</label>
                </Link>
              </div> */}
              <div className="adjust-space">
                <Link to={"/staff-profile"}>
                  <label className="label-sub">Profile</label>
                </Link>
              </div>
              <div className="adjust-space">
                <Link onClick={handleLogout}>
                  <label className="label-sub">Logout</label>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffSidebar;
