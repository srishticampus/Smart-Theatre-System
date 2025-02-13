import React, { useEffect, useState } from "react";
import "../../Assets/Styles/StaffViewMoviesForQueues.css";
import { Link, useNavigate } from "react-router-dom";
import { viewCount } from "../../Services/AdminService";
import { toast } from "react-toastify";
import { IMG_BASE_URL } from "../../Services/BaseURL";

function StaffViewMoviesForQueues() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filteredData, setFilteredData] = useState([]); // Filtered data for display

  const fetchData = async () => {
    try {
      const result = await viewCount("viewAllMovies");

      if (result.success) {
        console.log(result);
        if (result.user.length > 0) {
          setData(result.user);
          setFilteredData(result.user); // Initialize filtered data
        } else {
          setData([]);
          setFilteredData([]);
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
    fetchData(); // Call the async function
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
    setSearchQuery(query);

    if (query) {
      const filtered = data.filter((item) =>
        item.movieName.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Reset to full list when query is empty
    }
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between mt-5">
          <p className="admin-view-movie-head">Manage Queues</p>
          <div className="search-container">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search by movie name"
              value={searchQuery}
              onChange={handleSearch}
            />{" "}
            <i className="fas fa-search search-icon"></i>
          </div>
        </div>
        <div className="row mt-3">
          {filteredData.length ? (
            filteredData.map((item) => {
              return (
                <div className="col-3">
                  <Link to={`/staff-view-queues/${item._id}`} >
                    <div className="staff_view_movie_card">
                      <div className="staff_view_movie_card_img">
                        <img
                          src={`${IMG_BASE_URL}/${item.movieImage.filename}`}
                          alt="film2"
                        />
                      </div>
                      <div className="staff_view_movie_card_title_head">
                        <p className="staff_view_movie_card_title m-0">
                          {item.movieName}
                        </p>
                        <p className="m-0 text-secondary">{item.movieType}</p>
                        <p className="m-0 text-secondary">
                          <small>{item.duration}</small>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <h1>No Movies Found</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default StaffViewMoviesForQueues;
