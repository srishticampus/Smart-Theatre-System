import React, { useState } from "react";
import "../../Assets/Styles/UserPreOrderFood.css";
import { useLocation, useNavigate } from "react-router-dom";
import { IMG_BASE_URL } from "../../Services/BaseURL";

function UserPreOrderFood() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract values from location.state
  const { selectedItems: initialItems = [], tId = null } = location.state || {};

  // Add quantity field to each item
  const [selectedItems, setSelectedItems] = useState(
    initialItems.map((item) => ({ ...item, quantity: 1 }))
  );

    console.log(tId); 
    
  // Function to increase quantity
  const increaseQuantity = (id) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease quantity (minimum: 1)
  const decreaseQuantity = (id) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  // Calculate total price dynamically
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.amount * item.quantity,
    0
  );

  return (
    <div>
      <div className="user_order_food_head">
        <h1>Pre - Order Now</h1>
      </div>
      <div className="container">
        <div className="row mt-5">
          {selectedItems.length ? (
            selectedItems.map((e) => (
              <div className="col-lg-6 col-md-6 col-sm-12 mt-2" key={e._id}>
                <div className="user_order_food_card">
                  <div className="user_order_food_details">
                    <div className="user_order_food_details_img">
                      <img
                        src={`${IMG_BASE_URL}/${e.image.filename}`}
                        alt={e.foodItem}
                      />
                    </div>
                    <div className="user_order_food_details_sub">
                      <div className="user_order_food_details_titile mx-3">
                        <p className="fw-bold mb-1">{e.foodItem}</p>
                        <p>{e.category}</p>
                        <p id="user_order_food_details_amount">
                          ₹ {e.amount}/-
                        </p>
                      </div>
                      <div className="user_order_food_details_quantity d-flex align-items-center">
                        <p>Quantity</p>
                        <div>
                          <button
                            className="btn btn-danger fs-5"
                            onClick={() => increaseQuantity(e._id)}
                          >
                            +
                          </button>
                          <button className="btn btn-danger mx-1 fs-5">
                            {e.quantity}
                          </button>
                          <button
                            className="btn btn-danger fs-5"
                            onClick={() => decreaseQuantity(e._id)}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No food items selected</p>
          )}
        </div>

        {/* Pay Button */}
        <div className="user_order_food_details_pay">
          <button
            className="btn btn-danger"
            onClick={() => {
              navigate("/user-view-food-payment", {
                state: { selectedItems, tId },
              });
            }}
          >
            Pay ₹{totalPrice}/-
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPreOrderFood;
