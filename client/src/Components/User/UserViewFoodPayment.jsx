import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Assets/Styles/UserViewFoodPayment.css";
import axios from "axios";
import { API_BASE_URL } from "../../Services/BaseURL";
import { toast } from "react-toastify";

function UserViewFoodPayment() {
  const location = useLocation();
  const navigate=useNavigate();
  const { selectedItems = [], tId = null } = location.state || {};


    const [ticketDetails,setTicketDetails]=useState({})

  // Calculate total amount
  const totalAmount = selectedItems.reduce((total, item) => {
    return total + item.amount * item.quantity;
  }, 0);
  console.log(selectedItems);

  useEffect(()=>{
    axios
    .post(`${API_BASE_URL}/viewTicketById/${tId}`,)
    .then((res) => {
      console.log(res);
      setTicketDetails(res.data.data)
      
    })
    .catch((err) => {
      console.log(err);
      
    });
  },[])

  console.log(ticketDetails);
  

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

  console.log(tId);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Payment Successful");
      
      axios
        .post(`${API_BASE_URL}/addFoodBooking`, {
          userId: localStorage.getItem("user"),
          ticketId: tId,
          foodItems:selectedItems,
          movieDate: ticketDetails.movieDate,
          totalAmount: totalAmount,
        })
        .then((res) => {
          console.log(res);
          if(res.data.status==200){
            toast.success('Order Confirmed')
            navigate('/user-view-bookings')
          }
          
        })
        .catch((err) => {
          console.log(err);
          
        });
    }
  };

  return (
    <div>
      <div className="user_food_payment">
        <div className="user_food_payment_title mb-3">
            <h1>Payment</h1>
        </div>
        <div className="user_food_payment_table">
          <table>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            {selectedItems.length
              ? selectedItems.map((e) => {
                  return (
                    <tr>
                      <td>{e.foodItem}</td>
                      <td>{e.quantity}</td>
                      <th>&#8377;{e.amount*e.quantity}/-</th>
                    </tr>
                  );
                })
              : ""}
              <tr>
               
              </tr>
              <tr>
                <th>TOTAL</th>
                <th></th>
                <th className="fs-4" >&#8377;{totalAmount}/-</th>
              </tr>

          </table>
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
                  Pay &#8377;{totalAmount}/-
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}

export default UserViewFoodPayment;
