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

function Carousel({ groupedCards }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % groupedCards.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + groupedCards.length) % groupedCards.length
    );
  };

  return (
    <div className="container mt-5">
      <div
        id="carouselExampleIndicators2"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          {groupedCards.map((group, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === activeIndex ? "active" : ""
              }`}
            >
              <div className="row">
                {/* Previous Button */}
                <button
                  className="btn btn-primary mb-3 mr-1 carousel-control-prev"
                  onClick={prevSlide}
                >
                  <i className="fa fa-arrow-left "></i>
                </button>
                {/* Cards */}
                {group.map((card) => (
                  <div key={card.id} className="col-sm-2 mb-3">
                    <div className="card BootstrapCard">
                      {/* <img className="img-fluid" src={`${IMG_BASE_URL}/${card.movieImage.filename}`} alt={`movie ${card.id}`} /> */}
                    </div>
                  </div>
                ))}
                {/* Next Button */}
                <button
                  className="btn btn-primary mb-3 carousel-control-next"
                  onClick={nextSlide}
                >
                  <i className="fa fa-arrow-right "></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function UserHome() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

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
      toast.error("An unexpected error occurred during Data View");
    }
  };
  useEffect(() => {
    fetchData2(); // Call the async function
  }, []);

  const fetchData3 = async () => {
    try {
      const result = await viewCount("comingSonnMovies");

      if (result.success) {
        console.log(result);
        if (result.user.length > 0) {
          setData2(result.user);
        } else {
          setData2([]);
        }
      } else {
        console.error("Data error:", result);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred during Data View");
    }
  };
  useEffect(() => {
    fetchData3(); // Call the async function
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
      toast.error("An unexpected error occurred during Data View");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <UserLandingBanner className=" userLandingBanner" />

      <div className="landing-sec2 ">
        <p className="landing-div2 mt-5 mb-5">Now Showing movies</p>
      </div>
      <div>
        <div className="container mb-5 mt-5">
          <div className="row g-4">
          {data.map((item, index) => {
            return (
              <div className="col-md-3">
                <div className="card h-100" style={{ width: "18rem" }}>
                  <img src={`${IMG_BASE_URL}/${item?.movieImage?.filename}`} />
                  <p>{item.movieName}</p>
                  <p>{item.duration}</p>
                </div>
              </div>
            );
          })}
        </div>
        </div>
        
      </div>
      <div className="landing-sec3 mt-5">
        <p className="key_features">KEY FEATURES</p>
        <p className="All_You_Need">
          All You Need for the Perfect Movie Experience
        </p>
        <div
          className="container"
          style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
        >
          {/* Key features cards */}
          <div className="card Sec3_Cards" style={{ flex: "1 1 22%" }}>
            <div className="card-header Sec3_Cards_header">Book Tickets</div>
            <p className="Sec3_Cards_Sec_header">
              "Secure Your Seat in Seconds"
            </p>
            <div className="card-body Sec3_card_body">
              <p>
                Choose your favorite show, select your seats, and get ready for
                an incredible movie night—all without standing in line!
              </p>
            </div>
          </div>
          <div className="card Sec3_Cards" style={{ flex: "1 1 22%" }}>
            <div className="card-header Sec3_Cards_header">Order Snacks</div>
            <p className="Sec3_Cards_Sec_header">"Snacks, Always Ready"</p>
            <div className="card-body Sec3_card_body">
              <p>
                Pre-order your favorite movie snacks directly from the app. From
                popcorn to drinks, so you can enjoy the show.
              </p>
            </div>
          </div>
          <div className="card Sec3_Cards" style={{ flex: "1 1 22%" }}>
            <div className="card-header Sec3_Cards_header">Reserve Parking</div>
            <p className="Sec3_Cards_Sec_header">
              "Park with Ease, Every Time"
            </p>
            <div className="card-body Sec3_card_body">
              <p>
                Say goodbye to last-minute parking stress! Reserve your parking
                space in advance and ensure a smooth arrival.
              </p>
            </div>
          </div>
          <div className="card Sec3_Cards" style={{ flex: "1 1 22%" }}>
            <div className="card-header Sec3_Cards_header">Join Queue Slot</div>
            <p className="Sec3_Cards_Sec_header">"Don't Miss Out"</p>
            <div className="card-body Sec3_card_body">
              <p>
                If tickets are fully booked, simply reserve a queue slot to hold
                your place in line. So you never miss a show.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="landing_sec_4">
        {data2.length > 0 ? (
          <>
            <p className="landing_sec_4_head mt-5 mb-5">Coming Soon movies</p>
            <div className="row g-4">
              {data2.map((item, index) => {
                return (
                  <div className="col-md-3">
                    <div className="card h-100" style={{ width: "18rem" }}>
                      <img
                        src={`${IMG_BASE_URL}/${item.movieImage.filename}`}
                      />
                      <p>{item.movieName}</p>
                      <p>{item.duration}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
      </div> */}
      <div className="landing_sec_5">
        <FooterLandingPage />
      </div>
    </div>
  );
}

export default UserHome;
