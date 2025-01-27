import React from "react";
import "../../Assets/Styles/UserPreOrderFood.css";
import img from "../../Assets/Images/image.png";

function UserPreOrderFood() {
  return (
    <div>
      <div className="user_order_food_head">
        <h1>Pre - Order Now</h1>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-6 col-md-6 col-sm-12 mt-2">
            <div className="user_order_food_card">
              <div className="user_order_food_details">
                <div className="user_order_food_details_img">
                  <img src={img} alt="" />
                </div>
                <div className="user_order_food_details_sub">
                  <div className="user_order_food_details_titile mx-3">
                    <p className="fw-bold mb-1">Pepsi</p>
                    <p>500 ml</p>
                    <p id="user_order_food_details_amount">₹ 200/-</p>
                  </div>
                  <div className="user_order_food_details_quantity d-flex align-items-center">
                    <p>Quantity</p>
                    <div>
                      <button className="btn btn-danger fs-5">+</button>
                      <button className="btn btn-danger mx-1 fs-5">1</button>
                      <button className="btn btn-danger fs-5">-</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
         

          <div className="user_order_food_details_pay">
            <button className="btn btn-danger">Pay ₹250/-</button>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default UserPreOrderFood;
