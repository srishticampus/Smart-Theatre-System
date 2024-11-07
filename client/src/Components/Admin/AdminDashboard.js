import React, { useEffect, useState } from "react";
import "../../Assets/Styles/AdminDashboard.css";
import img from "../../Assets/Images/admin.jpg";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate=useNavigate()

  useEffect(() => {
    console.log("here i am");
    
    if (localStorage.getItem("admin") !=1) {
      navigate("/admin_login");
    }
  }); 

  const [users,setUsers]=useState(0)
  const [parking,setParking]=useState(0)
  const [staff,setStaff]=useState(0)

  useEffect(() => {
    
  }, []);

  return (
    <div className="admin_dashboard">
      <div className="container">
        <div className="row">
        
         
         
            <div className="admin_dashboard_card_container">
              <div className="admin_dashboard_cards_new">
                <div>
                  <div className="admin_dashboard_cards_icon mx-1">
                    <i class="ri-user-line"></i>
                  </div>
                </div>
                <div className="text-center" >
                  <div className="admin_dashboard_cards_user_type fs-6">
                    <p>Users</p>
                  </div>
                  <div className="admin_dashboard_cards_count">
                    <p >{users}</p>
                  </div>
                </div>
              </div>
              <div className="admin_dashboard_cards_new">
                <div>
                  <div className="admin_dashboard_cards_icon mx-1">
                  <i class="ri-movie-2-line"></i>
                  </div>
                </div>
                <div className="text-center" >
                  <div className="admin_dashboard_cards_user_type fs-6">
                    <p>Staffs</p>
                  </div>
                  <div className="admin_dashboard_cards_count">
                    <p>{staff}</p>
                  </div>
                </div>
              </div>
              <div className="admin_dashboard_cards_new">
                <div>
                  <div className="admin_dashboard_cards_icon mx-1">
                  <i class="ri-ball-pen-line"></i>
                  </div>
                </div>
                <div className="text-center" >
                  <div className="admin_dashboard_cards_user_type fs-6">
                    <p className="ms-3">Parking Slots</p>
                  </div>
                  <div className="admin_dashboard_cards_count">
                    <p >{parking}</p>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
   
  );
}

export default AdminDashboard;
