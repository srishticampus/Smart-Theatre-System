import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ViewById } from '../../Services/CommonServices';
import axios from 'axios';
import { API_BASE_URL } from '../../Services/BaseURL';

function StaffSelectQueueSeat() {

  const { mId } = useParams();
  const { showId } = useParams();
  const { count } = useParams();
  const { movieDate } = useParams();
  const { sId } = useParams();
  const { uId } = useParams();
  const { qId } = useParams();
  const [bookedSetas, setBookedSetas] = useState([]);
  const [showData, setShowData] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [data, setData] = useState({
    movieName: "",
    movieImage: { filename: "" },
    coverImage: { filename: "" },
    screenId: {
      _id: "",
      screenName: "",
      gold: {
        seatCount: 0,
        amount: 0,
        seatLabel: "",
      },
      silver: {
        seatCount: 0,
        amount: 0,
        seatLabel: "",
      },
      platinum: {
        seatCount: 0,
        amount: 0,
        seatLabel: "",
      },
    },
  });
  const [movieId, setMovieId] = useState(mId);
  // Handle button click event

  const fetchData = async () => {
    try {
      const result = await ViewById("viewMovieById", movieId);
      if (result.success) {
        setData(result.user || null);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);    }
  };

  useEffect(() => {
    fetchData();
  }, [movieId]);
  const fetchShowData = async () => {
    try {
      const result = await ViewById("viewShowsById", showId);
      if (result.success) {
        setShowData(result.user || null);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);    }
  };

  useEffect(() => {
    fetchShowData();
  }, [showId]);

  

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


  const handleSeatSelection = (seatNumber, Type) => {
    setSeats((prevSeats) => {
      const seatExists = prevSeats.find(
        (seat) => seat.number === seatNumber && seat.Type === Type
      );
  
      let seatLabel = "";
      if (Type === "platinum") {
        seatLabel = data.screenId.platinum.seatLabel;
      } else if (Type === "gold") {
        seatLabel = data.screenId.gold.seatLabel;
      } else if (Type === "silver") {
        seatLabel = data.screenId.silver.seatLabel;
      }

      console.log("Seat Selected:", { number: seatNumber, Type, label: seatLabel });
      console.log("Updated Seats Array:", seats);

  
      if (seatExists) {
        // If seat is already selected, remove it
        return prevSeats.filter(
          (seat) => !(seat.number === seatNumber && seat.Type === Type)
        );
      } else {
        if (prevSeats.length < count) {
          // Add the seat if the limit is not exceeded
          return [...prevSeats, { number: seatNumber, Type, label: seatLabel }];
        } else {
          // Replace the first selected seat with the new one
          const updatedSeats = [...prevSeats];
          updatedSeats.shift(); // Remove the first seat
          updatedSeats.push({ number: seatNumber, Type, label: seatLabel }); // Add the new seat
          return updatedSeats;
        }
      }
    });
  };
  
  

  const calculateTotalPrice = () => {
    return seats.reduce((total, seat) => {
      const seatPrice =
        seat.Type === "platinum"
          ? data.screenId.platinum.amount
          : seat.Type === "gold"
          ? data.screenId.gold.amount
          : data.screenId.silver.amount;
      return total + seatPrice;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();
  const isAllSeatsSelected = seats.length == count;


  const isSeatBooked = (seatNumber, seatType) => {
    return bookedSetas.some(
      (seat) => seat.number === seatNumber && seat.Type === seatType
    );
  };

  console.log(seats);
  

  if (!bookedSetas || !seats) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="user-book-ticket-seat-count-sectionone container">
        <p className="user-book-ticket-seat-select-header">{data.movieName}</p>
        <p className="user--book-ticket-seat-select-genre">{data.movieType}</p>
        <p className="user-book-ticket-seat-select-date">
          Maxus Cinemas | {showData.day},{showData.startTime}
        </p>
        <hr />
      </div>
      <div className="container card user-book-ticket-seat-select-card">
        <div className="d-flex justify-content-evenly">
          <div className="d-flex">
            <button className="btn btn-outline-success user-book-ticket-seat-select-top-button-size"></button>
            <span>
              <p>Available</p>
            </span>
            <button className="btn btn-success user-book-ticket-seat-select-top-button-size"></button>
            <span>
              <p>Selected</p>
            </span>
            <button className="btn btn-secondary user-book-ticket-seat-select-top-button-size"></button>
            <span>
              <p>Sold</p>
            </span>
          </div>
          {data.screenId.platinum.seatCount > 0 ? (
            <div className="d-flex justify-content-evenly mt-4">
              <div>
                <p>Platinum - &#8377;&nbsp;{data.screenId.platinum.amount}/-</p>
              </div>

              <div className="d-flex blank-space-for-alignment"></div>

              <div className="d-flex">
                <button className="btn me-4" style={{ border: "0" }} disabled>
                  {data.screenId.platinum.seatLabel}
                </button>

                <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                  
                  {Array.from({ length: data.screenId.platinum.seatCount }).map(
                    (_, index) => {
                      const seatNumber = index + 1;
                      const isBooked = isSeatBooked(seatNumber, "platinum");
                      const isSelected = seats.some(
                        (seat) =>
                          seat.number === seatNumber && seat.Type === "platinum"
                      );

                      return (
                        <button
                          key={index}
                          className={`btn ${
                            isBooked
                              ? "btn-secondary"
                              : isSelected
                              ? "btn-success"
                              : "btn-outline-success"
                          } user-book-ticket-seat-select-seatbuttons me-2`}
                          onClick={() =>
                            !isBooked &&
                            handleSeatSelection(seatNumber, "platinum")
                          }
                          disabled={isBooked}
                        >
                          {seatNumber}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {data.screenId.gold.seatCount > 0 ? (
          <div className="d-flex justify-content-evenly mt-4">
            <div>
              <p>Gold - &#8377;&nbsp;{data.screenId.gold.amount}/-</p>
            </div>
            <div className="d-flex blank-space-for-alignment"></div>

            <div className="d-flex justify-content-center">
              <button className="btn me-4" style={{ border: "0" }} disabled>
                {data.screenId.gold.seatLabel}
              </button>
              <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                
                {Array.from({ length: data.screenId.gold.seatCount }).map(
                  (_, index) => {
                    const seatNumber = index + 1;
                    const isBooked = isSeatBooked(seatNumber, "gold");
                    const isSelected = seats.some(
                      (seat) =>
                        seat.number === seatNumber && seat.Type === "gold"
                    );

                    return (
                      <button
                        key={index}
                        className={`btn ${
                          isBooked
                            ? "btn-secondary"
                            : isSelected
                            ? "btn-success"
                            : "btn-outline-success"
                        } user-book-ticket-seat-select-seatbuttons me-2`}
                        onClick={() =>
                          !isBooked && handleSeatSelection(seatNumber, "gold")
                        }
                        disabled={isBooked}
                      >
                        {seatNumber}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {isAllSeatsSelected && (
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-danger"
              onClick={() => {
                navigate("/staff-confirm-queue", {
                  state: {
                    mId,
                    showId,
                    count,
                    seats,
                    totalPrice,
                    movieDate,
                    uId,
                    qId
                  },
                });
              }}
            >
              Pay ₹{totalPrice}
            </button>
          </div>
        )}

        {data.screenId.silver.seatCount > 0 ? (
          <div className="d-flex justify-content-evenly mt-4">
            <div>
              <p>Silver - &#8377;&nbsp;{data.screenId.silver.amount}/-</p>
            </div>
            <div className="d-flex blank-space-for-alignment"></div>

            <div className="d-flex justify-content-center">
              <button className="btn me-4" style={{ border: "0" }} disabled>
                {data.screenId.silver.seatLabel}
              </button>

              <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                
                {Array.from({ length: data.screenId.silver.seatCount }).map(
                  (_, index) => {
                    const seatNumber = index + 1;
                    const isBooked = isSeatBooked(seatNumber, "silver");
                    const isSelected = seats.some(
                      (seat) =>
                        seat.number === seatNumber && seat.Type === "silver"
                    );

                    return (
                      <button
                        key={index}
                        className={`btn ${
                          isBooked
                            ? "btn-secondary"
                            : isSelected
                            ? "btn-success"
                            : "btn-outline-success"
                        } user-book-ticket-seat-select-seatbuttons me-2`}
                        onClick={() =>
                          !isBooked && handleSeatSelection(seatNumber, "silver")
                        }
                        disabled={isBooked}
                      >
                        {seatNumber}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="theater-screen"></div>
    </div>
  )
}

export default StaffSelectQueueSeat
