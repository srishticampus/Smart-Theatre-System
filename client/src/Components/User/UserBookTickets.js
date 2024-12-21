import "../../Assets/Styles/UserBookTickets.css";
import demonte from "../../Assets/Images/demonte.png";

import React, { useEffect, useState, useRef } from "react";
import { viewCount, approveById } from '../../Services/AdminService';
import { IMG_BASE_URL } from '../../Services/BaseURL'
import { toast } from "react-toastify";
import { resetPassword, ViewById } from "../../Services/CommonServices";
import FooterLandingPage from "../Footers/FooterLandingPage";
import '../../Assets/Styles/UserHome.css'
import { Link, useNavigate, useParams } from "react-router-dom";
function UserBookTickets() {
  const [selectedDate, setSelectedDate] = useState({
    date:new Date().getDate(),
    month:new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date()),
    day:new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date())
  });

  const userId = localStorage.getItem("user");
  const { id } = useParams()
  const [movieId, setMovieId] = useState(id);
  const [data, setData2] = useState({
    movieImage: { filename: '' },
    coverImage: { filename: '' },
    screenId: {
      _id: '',
      screenName: '',
    }
  });
  const [genre, setGenre] = useState([]);
  const [castdata, setCastData] = useState([])

  const [showTime, setShowtime] = useState([]);
  const navigate = useNavigate()



  const fetchScreen = async () => {
    try {
      console.log("id", data.screenId._id);

      const result = await resetPassword({day:selectedDate.day},'viewShowsByScreenIdForDay', data.screenId._id);

      if (result.success) {
        console.log(result);
        if (result.user.length > 0) {
          setShowtime(result.user);
        } else {
          setShowtime([]);
        }
      } else {
        console.error('Data error:', result);
      }

    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred during Data View');
    }
  };
  useEffect(() => {


    fetchScreen(); // Call the async function
  }, [selectedDate]);


  const fetchData = async () => {
    try {
      const result = await ViewById('viewMovieById', movieId);
      if (result.success) {
        console.log("mov", result.user);

        setData2(result.user || null);

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
  const movieDetailView = (id) => {
    console.log("data", id);
    setMovieId(id)
    navigate(`/user-movie-details/${id}`)
  }
  const redirect = (id) => {


    navigate(`/user-book-ticket-seat/${movieId}/${id}`)
  }
  const fetchCastData = async () => {
    try {
      const result = await ViewById('viewCastByMovieId', id);

      if (result.success) {
        console.log("cast", result);
        if (result.user.length > 0)
          setCastData(result.user || []);


      } else {
        console.error('Data error:', result);
        toast.error(result.message);
      }

    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred during Data View');
    }
  };
  useEffect(() => {


    fetchCastData(); // Call the async function
  }, [movieId]);




  const calendarRef = useRef();

  // Function to scroll the calendar left
  const scrollLeft = () => {
    calendarRef.current.scrollBy({
      left: -150, // Adjust the scroll amount as needed
      behavior: 'smooth',
    });
  };

  // Function to scroll the calendar right
  const scrollRight = () => {
    calendarRef.current.scrollBy({
      left: 150, // Adjust the scroll amount as needed
      behavior: 'smooth',
    });
  };

  // Handle selecting a calendar button
  const handleSelectDate = (date,month,day) => {
    setSelectedDate({ date, month ,day});

    console.log(day);
    
  };

  const filteredShowTimes = showTime.filter(
    (show) => show.day === selectedDate.day
  );
  return (
    <div className='container'>
      <div className='user-book-ticket-section-one d-flex'>
        <div className='d-flex'>
          <img src={`${IMG_BASE_URL}/${data.movieImage.filename}`} alt='demonteimg' className='user-book-ticket-img' />
          <div className='mt-4 ms-2'>
            <p className='user-book-ticket-banner-head'>{data.movieName}</p>
            <div className='d-flex'>
              <p className='user-book-ticket-2d'>{data.screenId.screenName}</p>
              <p className='user-book-ticket-tamil'>{data.language}</p>
            </div>
            <p className='user-book-ticket-genre'>{data.movieType}</p>
            <p className="user-book-ticket-time">{data.duration}</p>
          </div>
        </div>

        {/* Calendar Carousel */}
        <div className='ms-auto calendar-carousel-container'>
          <button onClick={scrollLeft} className="carousel-button left">&#8592;</button>

          <div className="calendar-wrapper" ref={calendarRef}>
            <button
              className={`btn user-book-ticket-calender `}
              onClick={() => handleSelectDate(new Date().getDate(),new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date()),
              new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                new Date(new Date().setDate(new Date().getDate()))),
                new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                  new Date(new Date().setDate(new Date().getDate()))))}
            >
              <p>{new Date().getDate()}</p>
              <p>{new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())}</p>
              <p>{
                new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                  new Date(new Date().setDate(new Date().getDate()))
                )
              }</p>              </button>
            <button
              className={`btn user-book-ticket-calender`}
              onClick={() => handleSelectDate(new Date().getDate()+1,
                new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date()),
                new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                  new Date(new Date().setDate(new Date().getDate() + 1))
                ))}
            >
              <p>{new Date().getDate() + 1}</p>
              <p>{new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())}</p>
              <p>{
                new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                  new Date(new Date().setDate(new Date().getDate() + 1))
                )
              }</p>             </button>
            <button
              className={`btn user-book-ticket-calender ${selectedDate === new Date().getDate()+2 ? 'selected' : ''}`}
              onClick={() => handleSelectDate(new Date().getDate()+2,
                new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())
              ,new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                new Date(new Date().setDate(new Date().getDate() + 2))
              ))}
            >
              <p>{new Date().getDate() + 2}</p>
              <p>{new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())}</p>
              <p>{
                new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                  new Date(new Date().setDate(new Date().getDate() + 2))
                )
              }</p>            </button>
            <button
              // className={`btn user-book-ticket-calender ${selectedDate === '23' ? 'selected' : ''}`}
              onClick={() => handleSelectDate(new Date().getDate()+3,
                new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())
              , new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                new Date(new Date().setDate(new Date().getDate()+3))))}
            >
              <p>{new Date().getDate() + 3}</p>
              <p>{new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())}</p>
              <p>{
                new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                  new Date(new Date().setDate(new Date().getDate() +3))
                )
              }</p>
            </button>
            <button
              // className={`btn user-book-ticket-calender ${selectedDate === '24' ? 'selected' : ''}`}
              onClick={() => handleSelectDate(new Date().getDate()+4,
                new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date()),
                new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                  new Date(new Date().setDate(new Date().getDate() + 4))
                ))}
            >
              <p>{new Date().getDate() + 4}</p>
              <p>{new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())}</p>
              <p>{
                new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                  new Date(new Date().setDate(new Date().getDate() + 4))
                )
              }</p>
            </button>
            <button
              // className={`btn user-book-ticket-calender ${selectedDate === '25' ? 'selected' : ''}`}
              onClick={() => handleSelectDate(new Date().getDate()+5,
                new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date()),
                new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                  new Date(new Date().setDate(new Date().getDate() + 5))
                ))
                
              }
            >
              <p>{new Date().getDate() + 5}</p>
              <p>{new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())}</p>
              <p>{
                new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                  new Date(new Date().setDate(new Date().getDate() + 5))
                )
              }</p>
            </button>
          </div>

          <button onClick={scrollRight} className="carousel-button right">&#8594;</button>
        </div>
      </div>
      <hr></hr>
      <div>
        <div className="user-book-ticket-section-two">
          <div className="section-two">
            <div className="card user-book-ticket-card">
              <div className="card-header user-book-ticket-card-header">
                <p className='card-header-align'><p> {selectedDate.date} {selectedDate.month}</p>
                </p>
              </div>
              <div className="card-body d-flex user-book-ticket-cardbody" >
                <p className='user-book-ticket-time'>Show time</p>
                {/* <button className='user-book-ticket-show-button'>
                  <p>07:00 AM</p>
                  <p className='text-muted user-book-ticket-show-time'>Closed</p>
                </button>
                <button className='user-book-ticket-show-button'>
                  <p>12:00 PM</p>

                </button>
                <button className='user-book-ticket-show-button'>
                  <p>04:00 PM</p>

                </button> */}
                  {filteredShowTimes.length > 0 ? (
                  filteredShowTimes.map((show, index) => (
                    <button
                      key={index}
                      className="user-book-ticket-show-button"
                      disabled={show.status === 'Closed'}
                      onClick={()=>{redirect(show._id)}}
                    >
                      <p>{show.startTime}</p>
                      <p className="text-muted user-book-ticket-show-time">
                        {show.status}
                      </p>
                    </button>
                  ))
                ) : (
                  <p>No shows available for this date.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBookTickets;
