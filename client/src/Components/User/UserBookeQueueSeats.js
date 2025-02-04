import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../Services/BaseURL';
import axios from 'axios';
import { ViewById } from '../../Services/CommonServices';

function UserBookeQueueSeats() {

    const [selectedSeat, setSelectedSeat] = useState(null);
    const { mId } = useParams();
    const { showId } = useParams();
    const { movieDate } = useParams();
    const { sId } = useParams();
    const [bookedSetas, setBookedSetas] = useState([]);
    const [bookedVirtualQueue,setBookedVirtualQueue]=useState([])
    const [bookedSeatCount,setBookedSeatCount]=useState()
    const [totalBookedQueueSeats, setTotalBookedQueueSeats] = useState(0);

    
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
          setBookedSeatCount(flattenedSeats.length)
        })
        .catch((err) => {
          console.log("Error fetching booked seats:", err);
        });
    }, []);
  
    
  
    useEffect(() => {
      fetchShowData();
    }, [showId]);
    const redirect = () => {
        const totalSeats =
          (data.screenId.gold?.seatCount || 0) +
          (data.screenId.silver?.seatCount || 0) +
          (data.screenId.platinum?.seatCount || 0);
      
        const availableSeats = totalSeats - (bookedSeatCount + totalBookedQueueSeats);
      
        if (availableSeats >= selectedSeat) {
          navigate(
            `/user-book-virtualqueue/${movieId}/${showId}/${movieDate}/${selectedSeat}`
          );
        } else {
          toast.warning(`Only ${availableSeats} seats are available`);
        }
      };
      

    useEffect(()=>{
        axios
        .post(`${API_BASE_URL}/viewQueueByShowId`,{showId:showId})
        .then((res) => {
          console.log('booked queues',res);
            if (res.data.status==200) {
                setBookedVirtualQueue(res.data.data)
            } else {
                setBookedVirtualQueue([])
            }
        })
        .catch((err) => {
          console.log("Error fetching booked seats:", err);
          setBookedVirtualQueue([])
        });
    },[])

    useEffect(() => {
        const totalSeats = bookedVirtualQueue.reduce((sum, queue) => sum + queue.seatCount, 0);
        setTotalBookedQueueSeats(totalSeats);
      }, [bookedVirtualQueue]);
      

    const totalSeats =
    (data.screenId.gold?.seatCount || 0) +
    (data.screenId.silver?.seatCount || 0) +
    (data.screenId.platinum?.seatCount || 0);

    console.log('totseat',totalSeats);
    console.log('bookedseats',bookedSeatCount);
    console.log("Total booked virtual queue seats:", totalBookedQueueSeats);
  

  return (
    <div>
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
    </div>
  )
}

export default UserBookeQueueSeats
