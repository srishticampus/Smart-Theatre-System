import React, { useEffect, useState, useRef } from "react";
import { viewCount, approveById } from "../../Services/AdminService";
import { API_BASE_URL, IMG_BASE_URL } from "../../Services/BaseURL";
import { toast } from "react-toastify";
import { resetPassword, ViewById } from "../../Services/CommonServices";
import FooterLandingPage from "../Footers/FooterLandingPage";
import "../../Assets/Styles/UserHome.css";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import "../../Assets/Styles/UserBookTicketSeatCount.css";
import axios from "axios";

function UserBookTicketSeatCount() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const { mId } = useParams();
  const { showId } = useParams();
  const { movieDate } = useParams();
  const { sId } = useParams();
  const [bookedSetas, setBookedSetas] = useState([]);
  
  const [showData, setShowData] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });
  const navigate = useNavigate();
  const [data, setData] = useState({
    movieImage: { filename: "" },
    coverImage: { filename: "" },
    screenId: {
      _id: "",
      screenName: "",
    },
  });
  const [movieId, setMovieId] = useState(mId);
  // Handle button click event
  const handleButtonClick = (seatNumber) => {
    setSelectedSeat(seatNumber);
    console.log(seatNumber);
  };
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
      toast.error("An unexpected error occurred during Data View");
    }
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
      toast.error("An unexpected error occurred during Data View");
    }
  };

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/getBookedSeats`, { screenId: sId, showId: showId })
      .then((res) => {
        console.log("Booked Seats Raw Response:", res.data);
        const flattenedSeats = res.data.data.bookedSeats.flat() || [];
        console.log("Processed Booked Seats:", flattenedSeats); // Debugging statement
        setBookedSetas(flattenedSeats);
      })
      .catch((err) => {
        console.log("Error fetching booked seats:", err);
      });
  }, []);

  console.log(bookedSetas);
  

  useEffect(() => {
    fetchShowData();
  }, [showId]);
  const redirect = (id) => {
    navigate(
      `/user-book-ticket-select-seat/${movieId}/${showId}/${selectedSeat}/${movieDate}/${sId}`
    );
  };
  return (
    <div>
      <div className="user-book-ticket-seat-count-sectionone container">
        <p className="user-book-ticket-seat-count-header">{data.movieName}</p>
        <p className="user--book-ticket-seat-genre">{data.movieType}</p>
        <p className="user-book-ticket-seat-date">
          Maxus Cinemas | {showData.day},{showData.startTime}
        </p>
        <hr />
      </div>
      <div className="d-flex justify-content-center mt-5">
        <div className="card user-book-ticket-seat-count-card">
          <div className="card-header user-book-ticket-seat-count-card-header">
            <p className="user-book-ticket-head">How many seats?</p>
          </div>
          <div className="card-body d-flex justify-content-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((seatNumber) => (
              <button
                key={seatNumber}
                className={`btn user-book-ticket-roundedbutton ${
                  selectedSeat === seatNumber ? "btn-danger" : ""
                }`}
                onClick={() => handleButtonClick(seatNumber)}
              >
                {seatNumber}
              </button>
            ))}
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button
              className="btn btn-danger user-book-seat-select-button"
              onClick={redirect}
            >
              Select Seats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBookTicketSeatCount;
