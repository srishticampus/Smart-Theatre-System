import React, { useEffect, useState } from "react";
import "../../Assets/Styles/AdminSidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function AdminSidebar() {

  const navigate=useNavigate()

 
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("admin") != 1)
      navigate('/admin-login');
  }, []);
  const handleLogout = () => {
    localStorage.setItem('admin', 0);   
     toast.success('Logged out successfully.');
    navigate('/admin-login');
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
              <label className="profile-label text-light">Administrator</label>
            </div>
          </div>
        </div>

        <div className="content-div">
          <div className="div-style">
            <div>
           
              <div className="adjust-space">
                <Link to={'/admin-dashboard'}>
                <label className="label-sub">Dashboard</label></Link>
              </div>
              <div className="adjust-space">
                <Link to={'/admin_view_users'}>
                <label className="label-sub">Users</label>
                </Link>
                
              </div>
              <div className="adjust-space" onClick={toggleMoviesDropdown}>
                <label className="label-sub">Staff</label>
              </div>
              {showMoviesDropdown && (
                <div className="custom-dropdown-menu">
                  <Link to={'/admin_add_staff'}>
                    <div className="custom-dropdown-item">
                      <label className="label-sub">Add Staff</label>
                    </div>
                  </Link>
                  <Link to={'/admin-view-staff'}>
                    <div className="custom-dropdown-item">
                      <label className="label-sub">View Staff</label>
                    </div>
                  </Link>
                </div>
              )}
               <div className="adjust-space" onClick={toggleMoviesDropdown}>
                <label className="label-sub">Screen</label>
              </div>
              {showMoviesDropdown && (
                <div className="custom-dropdown-menu">
                  <Link to={'/admin-add-screen'}>
                    <div className="custom-dropdown-item">
                      <label className="label-sub">Add Screen</label>
                    </div>
                  </Link>
                  <Link to={'/admin-view-screen'}>
                    <div className="custom-dropdown-item">
                      <label className="label-sub">View Screen</label>
                    </div>
                  </Link>
                </div>
              )}
              <div className="adjust-space" onClick={toggleSubscriptionDropdown}>
                <label className="label-sub">Movies</label>
              </div>
              {showSubscription && (
                <div className="custom-dropdown-menu">
                  <Link to={'/admin-add-movie'}>
                    <div className="custom-dropdown-item">
                      <label className="label-sub">Add Movie</label>
                    </div>
                  </Link>
                  <Link to={'/admin-view-movie'}>
                    <div className="custom-dropdown-item">
                      <label className="label-sub">View Movies</label>
                    </div>
                  </Link>
                </div>
              )}
                <div className="adjust-space" onClick={toggleSubscriptionDropdown}>
                <label className="label-sub">Manage Food</label>
              </div>
              {showSubscription && (
                <div className="custom-dropdown-menu">
                  <Link to={'/admin-add-food'}>
                    <div className="custom-dropdown-item">
                      <label className="label-sub">Add Food</label>
                    </div>
                  </Link>
                  <Link to={'/admin-view-food'}>
                    <div className="custom-dropdown-item">
                      <label className="label-sub">View Food</label>
                    </div>
                  </Link>
                </div>
              )}
                <div className="adjust-space" onClick={toggleSubscriptionDropdown}>
                <label className="label-sub">Booking</label>
              </div>
              {showSubscription && (
                <div className="custom-dropdown-menu">
                  <Link to={'/admin_add_subscription_plan'}>
                    <div className="custom-dropdown-item">
                      <label className="label-sub">Add Subscription</label>
                    </div>
                  </Link>
                  <Link to={'/admin_view_subscription_plan'}>
                    <div className="custom-dropdown-item">
                      <label className="label-sub">View Subscription</label>
                    </div>
                  </Link>
                </div>
              )}
                <div className="adjust-space" onClick={toggleSubscriptionDropdown}>
                <label className="label-sub">Parking</label>
              </div>
              {showSubscription && (
                <div className="custom-dropdown-menu">
                  <Link to={'/admin_add_subscription_plan'}>
                    <div className="custom-dropdown-item">
                      <label className="label-sub">Add Subscription</label>
                    </div>
                  </Link>
                  <Link to={'/admin_view_subscription_plan'}>
                    <div className="custom-dropdown-item">
                      <label className="label-sub">View Subscription</label>
                    </div>
                  </Link>
                </div>
              )}
              <div className="adjust-space">
                <Link to={'/admin_view_complaints'}>
                <label className="label-sub">Feedback</label>
                </Link>
                
              </div>
              <div className="adjust-space">
                <Link onClick={handleLogout}><label className="label-sub">Logout</label></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
