import React, { useEffect, useState } from 'react'
import '../../Assets/Styles/StaffViewMoviesForQueues.css'
import { useNavigate } from 'react-router-dom';
import { viewCount } from '../../Services/AdminService';
import { toast } from 'react-toastify';
import { IMG_BASE_URL } from '../../Services/BaseURL';

function StaffViewMoviesForQueues() {

  const navigate=useNavigate()
      const [data, setData] = useState([]);
      const [searchQuery, setSearchQuery] = useState(""); // Search query state
      const [filteredData, setFilteredData] = useState([]); // Filtered data for display
  
      const fetchData = async () => {
          try {
              const result = await viewCount('viewAllMovies');
  
              if (result.success) {
                  console.log(result);
                  if (result.user.length > 0) {
                      setData(result.user);
                      setFilteredData(result.user); // Initialize filtered data
                  } else {
                      setData([]);
                      setFilteredData([]);
                  } 
              }else {
                      console.error('Data error:', result);
                      toast.error(result.message);
                  }
  
              } catch (error) {
                  console.error('Unexpected error:', error);
                  toast.error('An unexpected error occurred during Data View');
              }
          };
          useEffect(() => {
  
  
              fetchData(); // Call the async function
          }, []);
  
          const handleSearch = (event) => {
              const query = event.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
              setSearchQuery(query);
      
              if (query) {
                  const filtered = data.filter(item =>
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
                      <div className='d-flex justify-content-between mt-3'>
                          <p className='admin-view-movie-head'>Movie List</p>
                          <div className="search-container">
                          <input
                              type="text"
                              className="form-control search-input"
                              placeholder="Search by movie name"
                              value={searchQuery}
                              onChange={handleSearch}
                          />                        <i className="fas fa-search search-icon"></i>
                          </div>
                      </div>
                      <div className='movie-cards-container'>
                          {filteredData.length > 0 ? (
      
      
      
      
      
                              <div className="row justify-content-center view-details-rows">
                                  {filteredData.map(item => {
                                      return (
                                          <div className="card admin-view-card">
                                              <img src={`${IMG_BASE_URL}/${item.movieImage.filename}`} className="admin-view-movie-img" alt='film2' />
                                              <div className="admin-view-card-footer">
                                                  <p className='admin-view-card-footer-head'>{item.movieName}</p>
                                                  <p className='admin-view-card-footer-description'>{item.movieType}</p>
                                                  <p className='admin-view-card-footer-duration'>{item.duration}</p>
                                              </div>
                                          </div>
                                      )
                                  })
                                  }
                              </div>
                          ) :
                              <h3>No Movies Found</h3>
                          }
      
      
                      </div>
                  </div>
    </div>
  )
}

export default StaffViewMoviesForQueues
