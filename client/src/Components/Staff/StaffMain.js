import React, { useEffect } from "react";
import AdminSidebar from "./StaffSidebar";
import AdminDashboard from "./StaffDashboard";
import "../../Assets/Styles/AdminCall.css";

import { useNavigate } from "react-router-dom";
import StaffSidebar from "./StaffSidebar";
import StaffDashboard from "./StaffDashboard";
import StaffViewProfile from "./StaffViewProfile";
import StaffEditProfile from "./StaffEditProfile";




function StaffMain({ type }) {

  const navigate=useNavigate()

  useEffect(() => {
    if (localStorage.getItem("staff") ==null) {
      navigate("/admin-login");
    }
  });

  return (
    <div className="container-fluid admin_main">
      <div className="row">
        <div
          className="col-lg-3 col-md-6 col-sm-12 adminmain-sidebar"
          style={{ padding: 0 }}
        >
          <StaffSidebar />
        </div>
        <div className=" col-lg-9 col-md-6 col-sm-12 adminmain-content">
          {type === "staff-home" ? (
            <StaffDashboard />
          )  : type === "staff-profile" ? (
            <StaffViewProfile  />
          )  : type === "staff-edit-profile" ? (
            <StaffEditProfile  />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default StaffMain;
