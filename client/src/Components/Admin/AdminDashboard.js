import React, { useState, useEffect } from "react";
import "../../Assets/Styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
// FontAwesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../Services/BaseURL";
import axios from "axios";

function AdminDashboard() {
  const [value1, setValue1] = useState(0); // Total number of movies
  const [value2, setValue2] = useState(0); // Now showing movies
  const [value3, setValue3] = useState(0); // Upcoming movies
  const [foodValue, setFoodValue] = useState(0); // Total food items
  const [parkingValue, setParkingValue] = useState(0); // Total parking slots

  const maxValue = 2000; // Maximum value
  const circleSize = 200; // The new size for the circle (width and height)
  const radius = circleSize / 2; // Radius is half the size
  const circumference = 2 * Math.PI * radius; // Calculate the dynamic circumference

  const navigate = useNavigate();

  // Ensure user is logged in as admin
  useEffect(() => {
    if (localStorage.getItem("admin") !== "1") {
      navigate("/admin_login");
    }
  }, [navigate]);

  const [users, setUsers] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {}, []);

  // Handle the scroll event to update the value
  const handleScroll = (e, setValue) => {
    e.preventDefault();
    const scrollDirection = e.deltaY > 0 ? -1 : 1; // Determine scroll direction
    setValue((prevValue) => {
      let newValue = prevValue + scrollDirection * 10; // Adjust the value increment/decrement by 10
      newValue = Math.min(Math.max(newValue, 0), maxValue); // Ensure value stays between 0 and maxValue
      return newValue;
    });
  };

  const [bookings, setsetBookings] = useState([]);
  const [parking, setParking] = useState([]);
  const [food, setFood] = useState([]);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewAllTickets`)
      .then((res) => {
        if (res.data.status == 200) {
          setsetBookings(res.data.data);
        } else {
          setsetBookings([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(`${API_BASE_URL}/viewAllQueues`)
      .then((res) => {
        if (res.data.status == 200) {
          setQueue(res.data.data);
        } else {
          setQueue([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(`${API_BASE_URL}/viewAllParking`)
      .then((res) => {
        if (res.data.status == 200) {
          setParking(res.data.data);
        } else {
          setParking([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(`${API_BASE_URL}/viewAllFoodBookings`)
      .then((res) => {
        if (res.data.status == 200) {
          setFood(res.data.data);
        } else {
          setFood([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(`${API_BASE_URL}/viewAllUsers`)
      .then((res) => {
        if (res.data.status == 200) {
          setUsers(res.data.data);
        } else {
          setUsers([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(`${API_BASE_URL}/viewAllStaff`)
      .then((res) => {
        console.log(res);

        setStaff(res.data.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.post(`${API_BASE_URL}/viewAllFoodBookings`)
      .then((res) => {
        if (res.data.status == 200) {
          setFood(res.data.data);
          setFoodValue(res.data.data.length); // Update food count
        } else {
          setFood([]);
          setFoodValue(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  
    axios.post(`${API_BASE_URL}/viewAllParking`)
      .then((res) => {
        if (res.data.status == 200) {
          setParking(res.data.data);
          setParkingValue(res.data.data.length); // Update parking count
        } else {
          setParking([]);
          setParkingValue(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(staff);

  return (
    <div className="admin_dashboard">
      <div className="container">
        <div className="row">
          <div className="admin_dashboard_card_container">
            <div className="admin_dashboard_cards_new">
              <div>
                <div className="admin_dashboard_cards_icon mx-1">
                  <i className="ri-user-line"></i>
                </div>
              </div>
              <div className="text-center">
                <div className="admin_dashboard_cards_user_type fs-6">
                  <p>Users</p>
                </div>
                <div className="admin_dashboard_cards_count">
                  <p>{users.length}</p>
                </div>
              </div>
            </div>
            <div className="admin_dashboard_cards_new">
              <div>
                <div className="admin_dashboard_cards_icon mx-1">
                  <i className="ri-movie-2-line"></i>
                </div>
              </div>
              <div className="text-center">
                <div className="admin_dashboard_cards_user_type fs-6">
                  <p>Staffs</p>
                </div>
                <div className="admin_dashboard_cards_count">
                  <p>{staff.length}</p>
                </div>
              </div>
            </div>
            <div className="admin_dashboard_cards_new">
              <div>
                <div className="admin_dashboard_cards_icon mx-1">
                  <i className="ri-ball-pen-line"></i>
                </div>
              </div>
              <div className="text-center">
                <div className="admin_dashboard_cards_user_type fs-6">
                  <p className="ms-3">Parkings</p>
                </div>
                <div className="admin_dashboard_cards_count">
                  <p>{parking.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="admin-dashboard-movie-head">Movies</p>
        <div className="row circle-row">
        <div className="circle-container">
  <div className="progress-ring-wrapper">
    <svg className="progress-ring" width={circleSize} height={circleSize}>
      <circle className="background" cx={radius} cy={radius} r={radius} stroke="#ddd" />
      <circle
        className="foreground"
        cx={radius}
        cy={radius}
        r={radius}
        stroke="#4CAF50"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (foodValue / maxValue) * circumference}
      />
    </svg>
  </div>
  <div className="circle-value">{foodValue}</div>  {/* Display Food Count */}
  <div className="circle-label">Total Food Orders</div>
</div>


<div className="circle-container">
  <div className="progress-ring-wrapper">
    <svg className="progress-ring" width={circleSize} height={circleSize}>
      <circle className="background" cx={radius} cy={radius} r={radius} stroke="#ddd" />
      <circle
        className="foreground"
        cx={radius}
        cy={radius}
        r={radius}
        stroke="#4CAF50"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (parkingValue / maxValue) * circumference}
      />
    </svg>
  </div>
  <div className="circle-value">{parkingValue}</div>  {/* Display Parking Count */}
  <div className="circle-label">Total Parking Slots</div>
</div>


          {/* <div
            className="circle-container"
            onWheel={(e) => handleScroll(e, setValue3)} // Listen for the scroll event
          >
            <div className="progress-ring-wrapper">
              <svg
                className="progress-ring"
                width={circleSize}
                height={circleSize}
              >
                <circle
                  className="background"
                  cx={radius}
                  cy={radius}
                  r={radius}
                  stroke="#ddd"
                />
                <circle
                  className="foreground"
                  cx={radius}
                  cy={radius}
                  r={radius}
                  stroke="#4CAF50"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference - (value3 / maxValue) * circumference
                  }
                />
              </svg>
            </div>
            <div className="circle-value">{Math.round(value3)}</div>
            <div className="circle-label">Upcoming Movies</div>
          </div> */}
        </div>

        {/* <p className="admin-dashboard-food-list">Food List</p>
        <table className="table table-hover table-responsive">
          <thead style={{ backgroundColor: "red", color: "white" }}>
            <tr>
              <th>S No</th>
              <th>Image</th>
              <th>Food Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Edit & Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <img
                  src="image_url"
                  alt="Food Item"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>Popcorn</td>
              <td>Snacks</td>
              <td>100</td>
              <td>
                <div className="d-flex justify-content-center">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ color: "#f20202" }}
                  />{" "}
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#ff0000", marginLeft: "10px" }}
                  />{" "}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <a className="admin-dashboard-viewall" href="#">
            View All
          </a>
        </div> */}
      </div>
    </div>
  );
}

export default AdminDashboard;
