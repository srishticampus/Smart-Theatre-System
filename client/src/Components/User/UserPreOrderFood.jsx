import React from 'react'
import '../../Assets/Styles/UserPreOrderFood.css'
import img from '../../Assets/Images/image.png'

function UserPreOrderFood() {
  return (
    <div>
      <div className="user_order_food_head">
        <h1>Pre - Order Now</h1>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="user_order_food_card">
                <div className="user_order_food_details">
                <div className="user_order_food_details_img">
                  <img src={img} alt="" />
                </div>
                <div className="user_order_food_details_titile">
                  <b><p className='fw-bold' >hgh</p></b>
                  <p>hgh</p>
                </div>
              </div>
              
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="user_order_food_card">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPreOrderFood
