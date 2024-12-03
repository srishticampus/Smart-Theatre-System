import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import "../../Assets/Styles/AdminCall.css";

import { useNavigate } from "react-router-dom";

import AdminViewComplaints from "./AdminViewComplaints";
import AdminViewAllUsers from "./AdminViewAllUsers";
import ViewReviews from "../Common/ViewReviews";
import AdminAddStaff from "./AdminAddStaff";
import AdminViwAllStaff from "./AdminViwAllStaff";
import AdminEditStaff from "./AdminEditStaff";
import AdminAddScreen from "./AdminAddScreen";
import AdminViewScreen from "./AdminViewScreen";
import AdminViewLounge from "./AdminViewLounge";
import AdminEditScreen from "./AdminEditScreen";
import AdminAddShow from "./AdminAddShow";
import AdminViewShowTime from "./AdminViewShowTime";
import AdminEditShowTime from "./AdminEditShowTime";

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
          ) : type === "admin_view_users" ? (
            <AdminViewAllUsers  />
          ) : type === "view_review" ? (
            <ViewReviews  />
          ) : type === "admin_add_staff" ? (
            <AdminAddStaff  />
          ) : type === "admin-view-staff" ? (
            <AdminViwAllStaff  />
          ) : type === "admin-edit-staff" ? (
            <AdminEditStaff  />
          ) : 
            type ==="admin-add-screen" ?(
            <AdminAddScreen/>
            ):
            type ==="admin-view-screen" ? (
              <AdminViewScreen/>
            ):
            type==="admin-view-lounge" ?(

              <AdminViewLounge/>
            ):
            type==="admin-edit-screen"?(
              <AdminEditScreen/>
            ):
            type === "admin-add-show" ? (
              <AdminAddShow/>
            ):
            type === "admin-view-show-time"?(
              <AdminViewShowTime/>
            ):
            type === "admin-edit-show-time"?(
              <AdminEditShowTime/>
            ):

            ""
          }
        </div>
      </div>
    </div>
  );
}

export default AdminCall;
