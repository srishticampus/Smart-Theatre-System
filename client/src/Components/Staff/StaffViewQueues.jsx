import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../Services/BaseURL";
import "../../Assets/Styles/StaffViewQueues.css";
import { toast } from "react-toastify";

function StaffViewQueues() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  console.log(id);

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewQueueByMovieId`, { movieId: id })
      .then((res) => {
        // console.log("res", res.data);
        if (res.data.status == 200) {
          setData(res.data.data);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log("Error fetching booked seats:", err);
      });
    axios
      .post(`${API_BASE_URL}/viewMovieById/${id}`)
      .then((res) => {
        console.log("res", res);
        if (res.status == 200) {
          setMovieDetails(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error fetching booked seats:", err);
      });
  }, []);

  console.log(data);

  const cancelTicket=(qId)=>{
    axios.post(`${API_BASE_URL}/cancelBooking/${qId}`)
    .then((res)=>{
      if(res.data.status==200){
        toast.success('Cancelled Successfully')
        setData((prevData) => prevData.filter((ticket) => ticket._id !== qId));
      }
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }

  return (
    <div>
      <div className="admin_view_tickets_title">
        <p>Manage Queues</p>
      </div>
      {/* <div className="d-flex justify-content-end">
        <p className="mx-2">Filter by Date</p>
        <input type="date" />
      </div>
      <div className="staff_view_queues_head mt-5">
        <p className="staff_view_queues_head_title">{movieDetails.movieName}</p>
        <p>Available Tickets : 25</p>
      </div> */}
      <div className="mt-5">
  {data.some((details) => details.status === "pending") ? ( // ✅ Check if any booking is "pending"
    <table className="table table-bordered">
      <thead>
        <tr className="bg-secondary text-white">
          <th>Sl No</th>
          <th>Name</th>
          <th>Contact</th>
          <th>Movie Date</th>
          <th>Show Time</th>
          <th>Seat Count</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  {data.map((details, i) => {
    if (details.status === "pending") {
      // Convert show end time to a valid Date object
      const showEndTime = new Date(details.date.slice(0, 10) + " " + details.showId.endTime);
      const currentTime = new Date();

      // Check if the show has ended
      const isShowEnded = showEndTime < currentTime;

      return (
        <tr key={i}>
          <td>{i + 1}.</td>
          <td>{details.userId.name}</td>
          <td>{details.userId.contact}</td>
          <td>{details.date.slice(0, 10)}</td>
          <td>
            {details.showId.startTime} - {details.showId.endTime}
          </td>
          <td>{details.seatCount}</td>
          <td>₹100/-</td>
          <td>
            <button className="btn btn-outline-danger mx-1" onClick={()=>{cancelTicket(details._id)}} >Cancel</button>

            {!isShowEnded ? ( // ✅ Show button only if the show hasn't ended
              <Link
                to={`/staff-select-queue-seat/${details.movieId._id}/${details.showId._id}/${details.seatCount}/${details.date}/${details.screenId._id}/${details.userId._id}/${details._id}`}
              >
                <button className="btn btn-danger">Book Now</button>
              </Link>
            ) : (
              <button className="btn btn-secondary" disabled>
                Show Ended
              </button> // ✅ Disable if the show has ended
            )}
          </td>
        </tr>
      );
    }
    return null;
  })}
</tbody>

    </table>
  ) : (
    <div className="text-center mt-5">
      <h1>No Pending Queues Found</h1> {/* ✅ Show only if no pending bookings */}
    </div>
  )}
</div>

    </div>
  );
}

export default StaffViewQueues;
