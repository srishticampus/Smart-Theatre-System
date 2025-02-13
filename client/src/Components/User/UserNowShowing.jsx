import UserLandingBanner from "./UserHomeNowShowing";

import { toast } from "react-toastify";
import "../../Assets/Styles/LandingPage.css";
import logo from "../../Assets/Images/Vector.png";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { viewCount, approveById } from "../../Services/AdminService";
import { IMG_BASE_URL } from "../../Services/BaseURL";
import { ViewById } from "../../Services/CommonServices";
import FooterLandingPage from "../Footers/FooterLandingPage";

function UserNowShowing() {
  const [data, setData] = useState([]);

  const fetchData2 = async () => {
    try {
      const result = await viewCount("nowShowingMovies");

      if (result.success) {
        console.log(result);
        if (result.user.length > 0) {
          setData(result.user);
        } else {
          setData([]);
        }
      } else {
        console.error("Data error:", result);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
  useEffect(() => {
    fetchData2(); // Call the async function
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user") == null) {
      navigate("/");
    }
  });

  const id = localStorage.getItem("user");
  const [userDetails, setUserDetails] = useState({});
  const [genre, setGenre] = useState([]);

  const fetchData = async () => {
    try {
      const result = await ViewById("viewUserById", id);
      if (result.success) {
        setUserDetails(result.user || null);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const movieDetailView = (id) => {
    navigate(`/user-movie-details/${id}`);
  };

  console.log(data);
  

  return (
    <div className="user-data-container">
      <div className="container mt-5">
        <h1 className="mt-5">Now Showing Movies</h1>

        <div className="row g-4">
          {data.map((item, index) => (
            <div
              key={item._id || index}
              className="col-md-3 "
              onClick={() => {
                movieDetailView(item._id);
              }}
            >
              <div className="h-100 p-3" style={{ width: "18rem" }}>
                <img
                  src={`${IMG_BASE_URL}/${item.movieImage.filename}`}
                  alt={item.movieName}
                  className="card-img-top"
                  style={{width:'18rem',height:'50vh',objectFit:'cover'}}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.movieName}</h5>
                  <p className="card-text"> {item.movieType}</p>
                  <p className="card-text"> {item.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserNowShowing;
