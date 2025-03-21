import "../../Assets/Styles/AdminViewMovie.css";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { viewCount, approveById } from "../../Services/AdminService";
import { API_BASE_URL, IMG_BASE_URL } from "../../Services/BaseURL";
import "../../Assets/Styles/AdminViewScreen.css";
import { ViewById } from "../../Services/CommonServices";
import { Modal } from "bootstrap"; // Import only Modal component
import axios from "axios";


function AdminViewMovie() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filteredData, setFilteredData] = useState([]); // Filtered data for display
  const [trailerPath, setTrailerPath] = useState(""); // Store trailer file path
  const [modalInstance, setModalInstance] = useState(null);



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
  const redirect = async (id) => {
    navigate("/admin-view-movie-details/" + id);
  };

  const handleShowTrailer = (trailerObj) => {
    if (trailerObj?.filename) {
      setTrailerPath(`${IMG_BASE_URL}/${trailerObj.filename}`);
    } else {
      setTrailerPath("");
    }
  
    const modalElement = document.getElementById("trailerModal");
  
    if (modalElement) {
      // Create a new Bootstrap modal instance only if it doesn't already exist
      const newModalInstance = new Modal(modalElement, { backdrop: "static" });
      setModalInstance(newModalInstance);
  
      // Show modal
      newModalInstance.show();
  
      // Cleanup event listener before adding a new one
      modalElement.removeEventListener("hidden.bs.modal", cleanupModal);
      modalElement.addEventListener("hidden.bs.modal", cleanupModal, { once: true });
    }
  };
  
  
  
  // Function to properly cleanup modal and remove backdrop
  const cleanupModal = () => {
    const modalElement = document.getElementById("trailerModal");
    const videoElement = document.querySelector("#trailerModal video");
  
    // Pause the video if it exists
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0; // Reset video to the start
    }
  
    if (modalInstance) {
      modalInstance.dispose(); // Dispose of modal safely
      setModalInstance(null); // Reset modal instance in state
    }
  
    // Remove any lingering modal backdrops
    setTimeout(() => {
      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
      document.body.classList.remove("modal-open"); // Ensure scrolling is restored
    }, 500);
  };
  
  
  
  useEffect(() => {
    return () => {
      cleanupModal();
    };
  }, []);


  const handleRemove = (id) => {
    axios.post(`${API_BASE_URL}/deactivateMovieById/${id}`)
      .then((res) => {
        console.log(res);
        setFilteredData(filteredData.filter(movie => movie._id !== id));
        setData(data.filter(movie => movie._id !== id)); // Also update main data list
        if (res.status==200) {
          toast.success('Movie Removed')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  
  
 

  return (
    <div>
      <div className="d-flex justify-content-between mt-3">
        <p className="admin-view-movie-head">Movie List</p>
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
      <div className="movie-cards-container">
        {filteredData.length > 0 ? (
          <div className="row justify-content-center view-details-rows">
            {filteredData.map((item) => {
                console.log(`${IMG_BASE_URL}/${item.movieImage.filename}`);
                
                
              return (
                <div
                 
                >
                  <div className="card admin-view-card"
                   onClick={() => {
                    redirect(item._id);
                  }}
                  >
                  <img
                    src={`${IMG_BASE_URL}/${item.movieImage.filename}`}
                    className="admin-view-movie-img"
                    alt="film2"
                  />
                  <div className="admin-view-card-footer">
                    <p className="admin-view-card-footer-head">
                      {item.movieName}
                    </p>
                    <p className="admin-view-card-footer-description">
                      {item.movieType}
                    </p>
                    <p className="admin-view-card-footer-duration">
                      {item.duration}
                    </p>
                  </div>
                  </div>
                  <div className="text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowTrailer(item.trailer)}
                    data-bs-toggle="modal"
                    data-bs-target="#trailerModal"
                  >
                    View Trailer
                  </button>
                  <button className="btn btn-outline-danger mx-2" onClick={()=>{handleRemove(item._id)}} >Delete</button>
                </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h3>No Movies Found</h3>
        )}
      </div>
      <div className="modal fade w-100" id="trailerModal" tabIndex="-1" aria-labelledby="trailerModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="trailerModalLabel">Movie Trailer</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              {trailerPath ? (
                <video width="100%" controls>
                  <source src={trailerPath} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <p>Trailer not available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewMovie;
