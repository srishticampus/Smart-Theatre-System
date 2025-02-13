import React, { useEffect, useState } from "react";
import "../../Assets/Styles/UserBookTicketPayment.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ViewById } from "../../Services/CommonServices";
import axios from "axios";
import { API_BASE_URL } from "../../Services/BaseURL";
function StaffBookTicketPayment() {

    const location = useLocation();
  const { uId, mId, showId, count, seats, totalPrice, movieDate } =
    location.state || {};
  console.log(movieDate);

  const [showData, setShowData] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });

  const navigate = useNavigate();
  const [data, setData] = useState({
    movieName: "",
    movieImage: { filename: "" },
    coverImage: { filename: "" },
    screenId: {
      _id: "",
      screenName: "",
      gold: {
        seatCount: 0,
        amount: 0,
        seatLabel: "",
      },
      silver: {
        seatCount: 0,
        amount: 0,
        seatLabel: "",
      },
      platinum: {
        seatCount: 0,
        amount: 0,
        seatLabel: "",
      },
    },
  });
  const [movieId, setMovieId] = useState(mId);
  // Handle button click event

  const fetchData = async () => {
    try {
      const result = await ViewById("viewMovieById", movieId);
      if (result.success) {
        console.log("mov", result.user);

        setData(result.user || null);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
        console.log(error);    }
  };

  useEffect(() => {
    fetchData();
  }, [movieId]);
  const fetchShowData = async () => {
    try {
      const result = await ViewById("viewShowsById", showId);
      if (result.success) {
        console.log("shows", result.user);

        setShowData(result.user || null);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
        console.log(error);    }
  };

  useEffect(() => {
    fetchShowData();
  }, [showId]);

  console.log(data);

  const [formData, setFormData] = useState({
    creditCardNumber: "",
    expiryDate: "",
    cvvCode: "",
    nameOnCard: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Credit Card Number Validation
    if (!formData.creditCardNumber) {
      newErrors.creditCardNumber = "Credit Card Number is required";
    } else if (!/^\d{16}$/.test(formData.creditCardNumber)) {
      newErrors.creditCardNumber = "Credit Card Number must be 16 digits";
    }

    // Expiry Date Validation
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry Date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Expiry Date must be in MM/YY format";
    } else {
      const [month, year] = formData.expiryDate.split("/").map(Number);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
      const currentYear = parseInt(
        currentDate.getFullYear().toString().slice(-2),
        10
      ); // Get last 2 digits of year

      if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        newErrors.expiryDate = "Expiry Date must be in the future";
      }
    }

    // CVV Code Validation
    if (!formData.cvvCode) {
      newErrors.cvvCode = "CVV Code is required";
    } else if (!/^\d{3}$/.test(formData.cvvCode)) {
      newErrors.cvvCode = "CVV Code must be 3 digits";
    }

    // Name on Card Validation
    if (!formData.nameOnCard) {
      newErrors.nameOnCard = "Name on Card is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      
      axios
        .post(`${API_BASE_URL}/addTicket`, {
          userId: uId,
          movieId: mId,
          screenId:data.screenId._id,
          showId: showId,
          seatNumber: seats,
          bookingDate: new Date().toISOString().split("T")[0],
          movieDate: movieDate,
          amount:totalPrice
        })
        .then((res) => {
          console.log(res);
          if(res.data.status==200){
            toast.success('Booking Confirmed')
            navigate('/staff-home')
          }
          
        })
        .catch((err) => {
          console.log(err);
          
        });
  };

  console.log('seats',seats);

  return (
    <div>
      <div className="user-ticket-payment-head-container">
        <p className="user-ticket-payment-head ">Payment</p>
      </div>
      <div className="d-flex justify-content-evenly">
        <div className="card user-ticket-paymnet-card">
          <p className="user-ticket-payment-card-header text-uppercase">
            {data.movieName}
          </p>
          <p className="user-ticket-payment-card-para">
            {data.movieType} | {data.language}
          </p>
          <p className="user-ticket-payment-card-paratwo">
            Maxus Cinemas | {showData.day}, {showData.endTime}
          </p>{" "}
        </div>
        <div className="card user-ticket-payment-cardtwo">
          <div className="d-flex justify-content-between">
            {/* <p className='user-ticket-payment-seat'>
                            Seats - {seats.map(seat => `${seat.type}-${seat.number}`).join(", ")} 
                            <span className='user-ticket-payment-seat-sub'>({count} Tickets)</span>
                        </p> */}
            <p className="user-ticket-payment-seat">
              Seats -{" "}
              {seats
                .map((seat) => {
                  const seatLabel =
                    seat.Type === "gold"
                      ? data.screenId.gold.seatLabel
                      : seat.Type === "silver"
                      ? data.screenId.silver.seatLabel
                      : seat.Type === "platinum"
                      ? data.screenId.platinum.seatLabel
                      : "";

                  return `${seatLabel}${seat.number}`;
                })
                .join(", ")}
              <span className="user-ticket-payment-seat-sub">
                ({count} Tickets)
              </span>
            </p>
            <p className="user-ticket-payment-payone">&#8377;{totalPrice}/-</p>
          </div>
         
          <hr></hr>
          <div className="d-flex justify-content-between">
            <p className="user-ticket-payment-total">Total</p>
            <p className="user-ticket-payment-total-amount">
              <b>&#8377;{totalPrice}/-</b>
            </p>
          </div>
        </div>
      </div>

      {/* <div className="d-flex justify-content-center mt-4 mb-3">
        <div className="card user-book-ticket-cardtwo">
          <div className="d-flex justify-content-center user-book-ticket-payment-heading">
            <p className="payment-details-style">Payment Details</p>
          </div>
          <div className="container">
            <div className="row justify-content-center mt-4">
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="creditCardNumber">Credit Card Number</label>
                  <input
                    type="text"
                    className="form-control payment-card-number"
                    id="creditCardNumber"
                    placeholder="Enter Credit Card Number"
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    className="form-control payment-expiry-date"
                    id="expiryDate"
                    placeholder="Enter MM/YY"
                  />
                </div>
              </div>
            </div>
            <div className="row justify-content-center mt-4">
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="cvvCode">CVV Code</label>
                  <input
                    type="text"
                    className="form-control payment-cvv-code"
                    id="cvvCode"
                    placeholder="Enter CVV Code"
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="nameOnCard">Name On Credit Card</label>
                  <input
                    type="text"
                    className="form-control payment-name-on-card"
                    id="nameOnCard"
                    placeholder="Enter Name On Card"
                  />
                </div>
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-danger">
                  Pay &#8377;{totalPrice + 60}/-
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="d-flex justify-content-center mt-4 mb-3">
        <div className="card user-book-ticket-cardtwo">
          <div className="d-flex justify-content-center user-book-ticket-payment-heading">
            <p className="payment-details-style">Book Now</p>
          </div>
          <div className="container">
            <form onSubmit={handleSubmit}>
              
              <div className="text-center mt-4">
                <button type="submit" className="btn btn-danger">
                  &#8377;{totalPrice}/-
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffBookTicketPayment
