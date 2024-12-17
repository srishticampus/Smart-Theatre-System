import "../../Assets/Styles/UserBookTickets.css";
import demonte from "../../Assets/Images/demonte.png";
import React, { useEffect, useState,useRef } from "react";
import { viewCount, approveById } from '../../Services/AdminService';
import { IMG_BASE_URL } from '../../Services/BaseURL'
import { toast } from "react-toastify";
import { ViewById } from "../../Services/CommonServices";
import FooterLandingPage from "../Footers/FooterLandingPage";
import '../../Assets/Styles/UserHome.css'
import { Link, useNavigate, useParams } from "react-router-dom";
function UserBookTickets() {
  const [selectedDate, setSelectedDate] = useState(null);

const userId = localStorage.getItem("user");
  const {id}=useParams()
  const [movieId, setMovieId] = useState(id);
  const [data, setData2] = useState({
    movieImage:{filename:''},
    coverImage:{filename:''}
  });
  const [genre, setGenre] = useState([]);
  const [castdata,setCastData]=useState([])

const [data2, setData] = useState([]);
 const navigate=useNavigate()

  const fetchData2 = async () => {
    try {
      const result = await viewCount('nowShowingMovies');

      if (result.success) {
        console.log(result);
        if (result.user.length > 0) {
          setData(result.user);
        } else {
          setData([]);
        }
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


    fetchData2(); // Call the async function
  }, [movieId]);


      const fetchData = async () => {
        try {
          const result = await ViewById('viewMovieById', movieId);
          if (result.success) {
            console.log("mov",result.user);
            
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
      const movieDetailView=(id)=>{
        console.log("data",id);
        setMovieId(id)
        navigate(`/user-movie-details/${id}`)
    }
    const book=(id)=>{
 
    
        navigate(`/user-book-ticket/${movieId}`)
    }
                const fetchCastData = async () => {
                    try {
                        const result = await ViewById('viewCastByMovieId',id);
            
                        if (result.success) {
                            console.log("cast",result);
                            if (result.user.length>0) 
                                setCastData(result.user||[]);
                              
                          
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
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className='container'>
      <div className='user-book-ticket-section-one d-flex'>
        <div className='d-flex'>
          <img src={demonte} alt='demonteimg' className='user-book-ticket-img' />
          <div className='mt-4 ms-2'>
            <p className='user-book-ticket-banner-head'>Demonte Colony 2</p>
            <div className='d-flex'>
              <p className='user-book-ticket-2d'>2D</p>
              <p className='user-book-ticket-tamil'>Tamil</p>
            </div>
            <p className='user-book-ticket-genre'>Horror, Comedy</p>
            <p className="user-book-ticket-time">2hr 26min</p>
          </div>
        </div>

        {/* Calendar Carousel */}
        <div className='ms-auto calendar-carousel-container'>
          <button onClick={scrollLeft} className="carousel-button left">&#8592;</button>

          <div className="calendar-wrapper" ref={calendarRef}>
            <button
              className={`btn user-book-ticket-calender ${selectedDate === '20' ? 'selected' : ''}`}
              onClick={() => handleSelectDate('20')}
            >
              <p>20</p>
              <p>November</p>
              <p>&#40;Monday&#41;</p>
            </button>
            <button
              className={`btn user-book-ticket-calender ${selectedDate === '21' ? 'selected' : ''}`}
              onClick={() => handleSelectDate('21')}
            >
              <p>21</p>
              <p>November</p>
              <p>&#40;Tuesday&#41;</p>
            </button>
            <button
              className={`btn user-book-ticket-calender ${selectedDate === '22' ? 'selected' : ''}`}
              onClick={() => handleSelectDate('22')}
            >
              <p>22</p>
              <p>November</p>
              <p>&#40;Wednesday&#41;</p>
            </button>
            <button
              className={`btn user-book-ticket-calender ${selectedDate === '23' ? 'selected' : ''}`}
              onClick={() => handleSelectDate('23')}
            >
              <p>23</p>
              <p>November</p>
              <p>&#40;Thursday&#41;</p>
            </button>
            <button
              className={`btn user-book-ticket-calender ${selectedDate === '24' ? 'selected' : ''}`}
              onClick={() => handleSelectDate('24')}
            >
              <p>24</p>
              <p>November</p>
              <p>&#40;Friday&#41;</p>
            </button>
            <button
              className={`btn user-book-ticket-calender ${selectedDate === '25' ? 'selected' : ''}`}
              onClick={() => handleSelectDate('25')}
            >
              <p>25</p>
              <p>November</p>
              <p>&#40;Saturday&#41;</p>
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
                <p className='card-header-align'>Novermber 28th</p>
              </div>
              <div className="card-body d-flex user-book-ticket-cardbody" >
                <p className='user-book-ticket-time'>Show time</p>
                <button className='user-book-ticket-show-button'>
                  <p>07:00 AM</p>
                  <p className='text-muted user-book-ticket-show-time'>Closed</p>
                </button>
                <button className='user-book-ticket-show-button'>
                  <p>12:00 PM</p>

                </button>
                <button className='user-book-ticket-show-button'>
                  <p>04:00 PM</p>

                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBookTickets;
