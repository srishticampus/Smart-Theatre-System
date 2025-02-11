import React, { useEffect, useState } from "react";
import "../../Assets/Styles/AdminViewTicketBookingDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, IMG_BASE_URL } from "../../Services/BaseURL";

function AdminViewTicketBookingDetails() {
  const { id } = useParams();
  const [data, setData] = useState({
    bookingDate: "",
    movieDate: "",
    seatNumber: [],
    showId: { startTime: "" },
    userId: { name: "", contact: "", email: "" },
    movieId: { movieImage: { filename: "" } },
    screenId: { screenFormat: "" },
  });

  const [foodDetails, setFoodDetails] = useState();
  const [parkingDetails, setParkingDetails] = useState({});

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewTicketById/${id}`)
      .then((res) => {
        console.log(res+"resss");
        
        if (res.data.status == 200) {
          setData(res.data.data);
        } else {
          setData({});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewParkingByTicketId/${id}`)
      .then((res) => {
        if (res.data.status == 200) {
          //   console.log(res);
          setParkingDetails(res.data.data);
        }
        //   else {
        //     setData({});
        //   }
      })
      .catch((err) => {
        console.log(err);
        setParkingDetails(null);
      });
  }, []);
  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewFoodBookingByTicketId/${id}`)
      .then((res) => {
        if (res.data.status == 200) {
          //   console.log(res);
          setFoodDetails(res.data.data);
        }
        //   else {
        //     setData({});
        //   }
      })
      .catch((err) => {
        console.log(err);
        setFoodDetails(null);
      });
  }, []);

  console.log(foodDetails);
  console.log(data);
  

  return (
    <div>
      <div className="admin_view_ticket_details">
        <div className="admin_view_tickets_title">
          <p>View Ticket Bookings</p>
        </div>
        <div className="admin_view_ticket_details_head">
          <div className="admin_view_ticket_details_img">
            <img
              src={`${IMG_BASE_URL}/${data?.movieId?.movieImage?.filename}`}
              alt="Screen 2 Left"
            />
          </div>
          <p>{data?.movieId?.movieName}</p>
        </div>

        <div className="admin_view_ticket_details_body">
          <div className="row">
            <div className="col-6">
              <div className="admin_view_ticket_details_box1">
                <div>
                  <p className="fs-5 fw-bold">Booking Details</p>
                  <p className="text-secondary m-0">
                    {" "}
                    <small>Booking Date & Time</small>{" "}
                  </p>
                  <p className="p-0 m-0 fw-bold">
                    {data?.bookingDate.slice(0, 10)}
                  </p>
                </div>
              </div>
              <div className="admin_view_ticket_details_box2">
                <div>
                  <p className="fs-5 fw-bold m-0">User Details</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="text-secondary m-0">
                        {" "}
                        <small>Name</small>{" "}
                      </p>
                      <p className="p-0 m-0 fw-bold">{data?.userId?.name}</p>
                    </div>
                    <div>
                      <p className="text-secondary m-0">
                        {" "}
                        <small>Contact</small>{" "}
                      </p>
                      <p className="p-0 m-0 fw-bold">{data?.userId?.contact}</p>
                    </div>
                  </div>
                  <p className="text-secondary m-0">
                    {" "}
                    <small>E-mail</small>{" "}
                  </p>
                  <p className="p-0 m-0 fw-bold">{data?.userId?.email}</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="admin_view_ticket_details_box3">
                <p className="fs-5 fw-bold m-0">Ticket Details</p>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="text-secondary m-0">
                      {" "}
                      <small>Show Time</small>{" "}
                    </p>
                    <p className="p-0 m-0 fw-bold">{data?.showId?.startTime}</p>
                  </div>
                  <div>
                    <p className="text-secondary m-0">
                      {" "}
                      <small>Screen</small>{" "}
                    </p>
                    <p className="p-0 m-0 fw-bold">
                      {data?.screenId?.screenFormat}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="text-secondary m-0">
                      {" "}
                      <small>Show Date</small>{" "}
                    </p>
                    <p className="p-0 m-0 fw-bold">
                      {data?.movieDate.slice(0, 10)}
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary m-0">
                      {" "}
                      <small>Tickets</small>{" "}
                    </p>
                    <p className="p-0 m-0 fw-bold">{data?.seatNumber?.length}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    <p className="text-secondary m-0">
                      {" "}
                      <small>Seats</small>{" "}
                    </p>
                    <p className="p-0 m-0 fw-bold">
                      {data.seatNumber
                        .map((seat) => `${seat.label}-${seat.number}`)
                        .join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary m-0">
                      {" "}
                      <small>Amount</small>{" "}
                    </p>
                    <p className="p-0 m-0 fw-bold">{data?.amount}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="admin_view_ticket_details_box1">
                <div>
                  <p className="fs-5 fw-bold">Pre-Ordered Snacks</p>
                  {foodDetails != null ? (
                    <>
                      <p className="text-secondary m-0">
                        {" "}
                        <small>Food Items</small>{" "}
                      </p>
                      <p className="p-0 m-0 fw-bold">
                        {foodDetails.foodItems
                          .map((food) => `${food.foodItem}-${food.quantity}`)
                          .join(", ")}
                      </p>
                    </>
                  ) : (
                    <p>No Food Ordered</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="admin_view_ticket_details_box1">
                <div>
                  <p className="fs-5 fw-bold m-0">Parking</p>
                  {parkingDetails != null ? (
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-secondary m-0">
                          {" "}
                          <small>Vehicle Type</small>{" "}
                        </p>
                        <p className="p-0 m-0 fw-bold">
                          {parkingDetails.vehicleType}
                        </p>
                      </div>
                      <div>
                        <p className="text-secondary m-0">
                          {" "}
                          <small>Parking Slot</small>{" "}
                        </p>
                        <p className="p-0 m-0 fw-bold">
                          {parkingDetails.slotNo}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p>No Parking Booked</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewTicketBookingDetails;
