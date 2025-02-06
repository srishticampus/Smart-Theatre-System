import React, { useEffect } from "react";
import AdminSidebar from "./StaffSidebar";
import AdminDashboard from "./StaffDashboard";
import "../../Assets/Styles/AdminCall.css";

import { useNavigate } from "react-router-dom";
import StaffSidebar from "./StaffSidebar";
import StaffDashboard from "./StaffDashboard";
import StaffViewProfile from "./StaffViewProfile";
import StaffEditProfile from "./StaffEditProfile";
import StaffViewFood from "./StaffViewFood";
import StaffViewTicketBooking from "./StaffViewTicketBooking";
import StaffViewBookingHistory from "./StaffViewBookingHistory";
import StaffViewParking from "./StaffViewParking";
import StaffViewFoodBookingReq from "./StaffViewBookingReq";
import StaffViewTicketDetails from "./StaffViewTicketDetails";
import StaffViewDeliveredFood from "./StaffViewDeliveredFood";
import StaffViewQueues from "./StaffViewQueues";
import StaffViewMoviesForQueues from "./StaffViewMoviesForQueues";
import StaffSelectQueueSeat from "./StaffSelectQueueSeat";
import StaffConfirmQueue from "./StaffConfirmQueue";
import StaffViewQueueHistory from "./StaffViewQueueHistory";
import StaffAddUser from "./StaffAddUser";
import StaffViewMoviesOffline from "./StaffViewMoviesOffline";
import StaffViewMovieDetailsOffline from "./StaffViewMovieDetailsOffline";
import StaffBookTicketOffline from "./StaffBookTicketOffline";
import StaffBookTicketSeatOffline from "./StaffBookTicketSeatOffline";
import StaffSelectTicketSeat from "./StaffSelectTicketSeat";
import StaffBookTicketPayment from "./StaffBookTicketPayment";




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
          )  : type === "staff-view-food" ? (
            <StaffViewFood  />
          )  : type === "staff-view-ticket-booking" ? (
            <StaffViewTicketBooking  />
          )  : type === "staff-view-bookig-history" ? (
            <StaffViewBookingHistory  />
          )  : type === "staff-booking-details-single" ? (
            <StaffViewTicketDetails  />
          )  : type === "staff-parking-details" ? (
            <StaffViewParking />
          )  : type === "staff-food-booking-req" ? (
            <StaffViewFoodBookingReq />
          )  : type === "staff-view-delivered-foods" ? (
            <StaffViewDeliveredFood />
          )  : type === "staff-view-queues" ? (
            <StaffViewQueues />
          )  : type === "staff-view-movies-queues" ? (
            <StaffViewMoviesForQueues />
          ) : type === "staff-select-queue-seat" ? (
            <StaffSelectQueueSeat />
          ) : type === "staff-confirm-queue" ? (
            <StaffConfirmQueue />
          ) : type === "staff-view-queue-history" ? (
            <StaffViewQueueHistory />
          ) : type === "staff-add-user" ? (
            <StaffAddUser />
          ) : type === "staff-view-movies-offline" ? (
            <StaffViewMoviesOffline />
          ) : type === "staff-view-movie-details-offline" ? (
            <StaffViewMovieDetailsOffline />
          ) : type === "staff-book-ticket-offline" ? (
            <StaffBookTicketOffline />
          ) : type === "staff-book-ticket-seat" ? (
            <StaffBookTicketSeatOffline />
          ) : type === "staff-book-ticket-select-seat" ? (
            <StaffSelectTicketSeat />
          ) : type === "staff-book-ticket-payment" ? (
            <StaffBookTicketPayment />
          ): (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default StaffMain;
