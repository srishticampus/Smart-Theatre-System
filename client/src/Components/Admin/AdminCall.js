import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import "../../Assets/Styles/AdminCall.css";

import { useNavigate } from "react-router-dom";

import AdminViewComplaints from "./AdminViewComplaints";
import AdminViewAllUsers from "./AdminViewAllUsers";
import ViewReviews from "../Common/ViewReviews";


function AdminCall({ type }) {

  const navigate=useNavigate()

  useEffect(() => {
    if (localStorage.getItem("admin") == 0) {
      navigate("/");
    }
  });

  return (
    <div className="container-fluid admin_main">
      <div className="row">
        <div
          className="col-lg-3 col-md-6 col-sm-12 adminmain-sidebar"
          style={{ padding: 0 }}
        >
          <AdminSidebar />
        </div>
        <div className=" col-lg-9 col-md-6 col-sm-12 adminmain-content">
          {type === "admin_dashboard" ? (
            <AdminDashboard />
          )  : type === "view_complaints" ? (
            <AdminViewComplaints  />
          ) : type === "view_users" ? (
            <AdminViewAllUsers  />
          ) : type === "view_review" ? (
            <ViewReviews  />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminCall;
