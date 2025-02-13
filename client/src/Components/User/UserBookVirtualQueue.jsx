import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ViewById } from "../../Services/CommonServices";
import axios from "axios";
import { API_BASE_URL } from "../../Services/BaseURL";

function UserBookVirtualQueue() {
  const { mId, showId, movieDate,seatCount } = useParams();

  const [showData, setShowData] = useState({
      day: "",
      startTime: "",
      endTime: "",
    });

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

  const queueStartTime = (() => {
    if (showData.startTime) {
      const showDateTime = new Date(
        `${movieDate}T${showData.startTime}`
      ); // Assuming `movieDate` is in YYYY-MM-DD format
      const queueStart = new Date(showDateTime.getTime() - 15 * 60 * 1000); // Subtract 15 minutes
      return queueStart.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
    return "N/A"; // Default if showData.startTime is unavailable
  })();
  
  const navigate=useNavigate()

  const handleSubmit = (e) => { 
    e.preventDefault();
    if (validate()) {
      console.log("Payment Successful");

      axios
        .post(`${API_BASE_URL}/addQueue`, {
          userId: localStorage.getItem("user"),
          movieId: mId,
          screenId:data.screenId._id,
          showId: showId,
          date: movieDate,
          seatCount:seatCount
        })
        .then((res) => {
          console.log(res);
          if(res.data.status==200){
            toast.success('Booking Confirmed')
            navigate('/user-home')
            window.location.reload();
          }
          
        })
        .catch((err) => {
          console.log(err);
          
        });
    }
  };

  console.log(showData);
  

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
            Maxus Cinemas | {showData.day}, {showData.startTime}
          </p>{" "}
        </div>
        <div className="card user-ticket-payment-cardtwo">
          {/* <div className="d-flex justify-content-between">

            <p className="user-ticket-payment-seat">Available Seat</p>
            <p className="user-ticket-payment-payone">25</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="user-ticket-payment-parafees">Your Queue Position</p>
            <p className="user-ticket-payment-paytwo">10 </p>
          </div> */}
          <div className="d-flex justify-content-between">
  <p className="user-ticket-payment-parafees">Queue Starting Time</p>
  <p className="user-ticket-payment-paytwo">Today, {queueStartTime}</p>
</div>

          <hr></hr>
          <div className="d-flex justify-content-between">
            <p className="user-ticket-payment-total">Amount</p>
            <p className="user-ticket-payment-total-amount">
              <b>&#8377;100/-</b>
            </p>
          </div>
        </div>
      </div>

    
      <div className="d-flex justify-content-center mt-4 mb-3">
        <div className="card user-book-ticket-cardtwo">
          <div className="d-flex justify-content-center user-book-ticket-payment-heading">
            <p className="payment-details-style">Payment Details</p>
          </div>
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-center mt-4">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="creditCardNumber">Credit Card Number</label>
                    <input
                      type="text"
                      className="form-control payment-card-number"
                      id="creditCardNumber"
                      placeholder="Enter Credit Card Number"
                      value={formData.creditCardNumber}
                      onChange={handleChange}
                    />
                    {errors.creditCardNumber && (
                      <small className="text-danger">
                        {errors.creditCardNumber}
                      </small>
                    )}
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
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                    {errors.expiryDate && (
                      <small className="text-danger">{errors.expiryDate}</small>
                    )}
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
                      value={formData.cvvCode}
                      onChange={handleChange}
                    />
                    {errors.cvvCode && (
                      <small className="text-danger">{errors.cvvCode}</small>
                    )}
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
                      value={formData.nameOnCard}
                      onChange={handleChange}
                    />
                    {errors.nameOnCard && (
                      <small className="text-danger">{errors.nameOnCard}</small>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <button type="submit" className="btn btn-danger">
                  Pay &#8377;100/-
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
  
  
}

export default UserBookVirtualQueue;
