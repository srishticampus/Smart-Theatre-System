import React, { useEffect, useState, useRef } from "react";
import { viewCount, approveById } from '../../Services/AdminService';
import { IMG_BASE_URL } from '../../Services/BaseURL'
import { toast } from "react-toastify";
import { resetPassword, ViewById } from "../../Services/CommonServices";
import FooterLandingPage from "../Footers/FooterLandingPage";
import '../../Assets/Styles/UserHome.css'
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import "../../Assets/Styles/UserBookTicketselectSeat.css";


function UserBookTicketSelectSeat() {

  const [selectedSeat, setSelectedSeat] = useState(null);
  const { mId } = useParams()
  const { showId } = useParams()
  const {count}=useParams()
  const [showData, setShowData] = useState({
    day: '',
    startTime: '',
    endTime: '',

  });
  const navigate = useNavigate()
  const [seats, setSeats] = useState([])
  const [data, setData] = useState({
    movieName: '',
    movieImage: { filename: '' },
    coverImage: { filename: '' },
    screenId: {
      _id: '',
      screenName: '',
      gold: {
        seatCount: 0,
        amount: 0,
        seatLabel: ''
      },
      silver: {
        seatCount: 0,
        amount: 0,
        seatLabel: ''
      },
      platinum: {
        seatCount: 0,
        amount: 0,
        seatLabel: ''
      }
    }
  });
  const [movieId, setMovieId] = useState(mId);
  // Handle button click event

  const fetchData = async () => {
    try {
      const result = await ViewById('viewMovieById', movieId);
      if (result.success) {
        console.log("mov", result.user);

        setData(result.user || null);

      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred during Data View');
    }
  };

  useEffect(() => {
    fetchData();
  }, [movieId]);
  const fetchShowData = async () => {
    try {
      const result = await ViewById('viewShowsById', showId);
      if (result.success) {
        console.log("shows", result.user);

        setShowData(result.user || null);

      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred during Data View');
    }
  };

  useEffect(() => {
    fetchShowData();
  }, [showId]);
  // const handleSeatSelection = (seatNumber,type) => {
  //   console.log(seatNumber,type);

  //   setSeats((prevSeats) =>
  //     prevSeats.includes(seatNumber)
  //       ? prevSeats.filter((seat) => seat !== seatNumber) 
  //       : [...prevSeats, seatNumber]
  //   );
  // };


  const handleSeatSelection = (seatNumber, type) => {
    setSeats((prevSeats) => {
      const seatExists = prevSeats.find(
        (seat) => seat.number === seatNumber && seat.type === type
      );
  
      if (seatExists) {
        // If seat is already selected, remove it
        return prevSeats.filter(
          (seat) => !(seat.number === seatNumber && seat.type === type)
        );
      } else {
        if (prevSeats.length < count) {
          // Add the seat if the limit is not exceeded
          return [...prevSeats, { number: seatNumber, type }];
        } else {
          // Replace the first selected seat with the new one
          const updatedSeats = [...prevSeats];
          updatedSeats.shift(); // Remove the first seat
          updatedSeats.push({ number: seatNumber, type }); // Add the new seat
          return updatedSeats;
        }
      }
    });
  };
  





  return (
    <div>
      <div className='user-book-ticket-seat-count-sectionone container'>
        <p className='user-book-ticket-seat-select-header'>{data.movieName}</p>
        <p className='user--book-ticket-seat-select-genre'>{data.movieType}</p>
        <p className='user-book-ticket-seat-select-date'>Maxus Cinemas | {showData.day},{showData.startTime}</p>
        <hr />
      </div>
      <div className='card user-book-ticket-seat-select-card'>
        <div className='d-flex justify-content-evenly'>
          <div className='d-flex'>
            <button className='btn btn-outline-success user-book-ticket-seat-select-top-button-size'></button><span><p>Available</p></span>
            <button className='btn btn-success user-book-ticket-seat-select-top-button-size'></button><span><p>Selected</p></span>
            <button className='btn btn-secondary user-book-ticket-seat-select-top-button-size'></button><span><p>Sold</p></span>
          </div>
          {data.screenId.platinum.seatCount > 0 ?
            <div className='d-flex justify-content-evenly mt-4'>

              <div>

                <p>Platinum - &#8377;&nbsp;{data.screenId.platinum.amount}/-</p>
              </div>


              <div className='d-flex blank-space-for-alignment'>
              </div>

              <div className='d-flex'>
                <button className='btn me-4' style={{ border: '0' }} disabled>{data.screenId.platinum.seatLabel}</button>
                <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
                  {Array.from({ length: data.screenId.platinum.seatCount }).map((_, index) => (
                    <button
                      key={index}
                      className={`btn ${index < 10
                        ? "btn-outline-success user-book-ticket-seat-select-seatbuttons me-2"
                        : "btn-outline-success user-book-ticket-seat-select-seatbuttons"
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

              </div>


            </div>
            : ''
          }
        </div>
        {data.screenId.gold.seatCount > 0 ?

          <div className='d-flex justify-content-evenly mt-4'>
            <div>
              <p>Gold - &#8377;&nbsp;{data.screenId.gold.amount}/-</p>
            </div>
            <div className='d-flex blank-space-for-alignment'>
            </div>

            <div className='d-flex justify-content-center'>
              <button className='btn me-4' style={{ border: '0' }} disabled>{data.screenId.gold.seatLabel}</button>
              {Array.from({ length: data.screenId.gold.seatCount }).map((_, index) => (
                <button
                  key={index}
                  className={`btn ${index < 10
                    ? "btn-outline-success user-book-ticket-seat-select-seatbuttons me-2"
                    : "btn-outline-success user-book-ticket-seat-select-seatbuttons"
                    }`}
                >
                  {index + 1}
                </button>
              ))}                    </div>
          </div>
          : ''}

        {data.screenId.gold.seatCount > 0 ?
          <div className='d-flex justify-content-evenly mt-4'>
            <div>
              <p>Silver - &#8377;&nbsp;{data.screenId.silver.amount}/-</p>
            </div>
            <div className='d-flex blank-space-for-alignment'>
            </div>

            <div className='d-flex justify-content-center'>
              <button className='btn me-4' style={{ border: '0' }} disabled>
                {data.screenId.silver.seatLabel}</button>
              {Array.from({ length: data.screenId.silver.seatCount }).map((_, index) => (
                <button
                  key={index}
                  className={`btn ${index < 10
                    ? "btn-outline-success user-book-ticket-seat-select-seatbuttons me-2"
                    : "btn-outline-success user-book-ticket-seat-select-seatbuttons"
                    }`}
                  onClick={() => handleSeatSelection(index + 1,'silver')}                >
                  {index + 1}
                </button>
              ))}                    </div>
          </div>



          : ''}

      </div>
      <div className='theater-screen'>

      </div>
    </div>
  );
}

export default UserBookTicketSelectSeat;
