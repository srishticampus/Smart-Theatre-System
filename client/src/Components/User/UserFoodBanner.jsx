import React from 'react'
import '../../Assets/Styles/UserFoodBanner.css'

function UserFoodBanner() {
  return (
    <div>
      <div className="food_banner">
        <div className="food_title_container">
            <div className="food_heading_container">
                <p className='food_heading' >Order Your Snack Here !!!</p>
                <div className="food_sub_heading">“Grab Your Snack At Your Seat Through <span className='text-danger' >Maxus</span>” </div>
            </div>
            <div className="food_category_list_container">
                <ul>
                    <li>Snacks</li>
                    <li>Puffs</li>
                    <li>Deserts</li>
                    <li>Beverages</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserFoodBanner
