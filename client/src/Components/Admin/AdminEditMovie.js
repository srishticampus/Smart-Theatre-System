import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  register,
  registerWithFile,
  registerWithFileforCaste,
  updateWithFile,
  ViewById,
} from "../../Services/CommonServices";
import "../../Assets/Styles/AdminEditMovie.css";

function AdminEditMovie() {
  const { id } = useParams();
  const [casts, setCasts] = useState([
    { castName: "", role: "", castImage: null },
  ]);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // Function to add a new cast row
  const handleAddCast = () => {
    setCasts([...casts, { castName: "", role: "", castImage: null }]);
  };

  // Function to handle changes in cast fields
  const handleCastChange = (index, field, value) => {
    const updatedCasts = [...casts];
    updatedCasts[index][field] = value;
    setCasts(updatedCasts);
  };

  const [movieDetails, setMovieDetails] = useState({
    movieName: "",
    movieImage: null,
    coverImage: null,
    language: "",
    screenType: "",
    startDate: "",
    endDate: "",
    movieType: "",
    duration: "",
    trailer: null,
    description: "",
    cast: [], // Array of cast objects {name, role, image}
  });

  // Function to handle general form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log("in on cha", files);

    if (files) {
      setMovieDetails((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setMovieDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handlechangeCoverImage = (e) => {
    const file = e.target.files[0];
    console.log("in cov");

    setMovieDetails({
      ...movieDetails,
      coverImage: file,
    });
  };
  const handlechangemovImage = (e) => {
    const file = e.target.files[0];

    setMovieDetails({
      ...movieDetails,
      movieImage: file,
    });
  };
  const handlechangeTrailer = (e) => {
    const file = e.target.files[0];

    setMovieDetails({
      ...movieDetails,
      trailer: file,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!movieDetails.movieName) {
      newErrors.movieName = "Movie Name size is required";
    }

    if (!movieDetails.movieImage) {
      newErrors.movieImage = "Image name is required";
    }

    if (!movieDetails.movieType) {
      newErrors.movieType = "Screen format is required";
    }

    if (!movieDetails.coverImage) {
      newErrors.coverImage = "coverImage  is required";
    }

    if (!movieDetails.trailer) {
      newErrors.trailer = "Trailer is required";
    }

    if (!movieDetails.duration) {
      newErrors.duration = "Duration is required";
    }

    if (!movieDetails.endDate) {
      newErrors.endDate = "End Date is required";
    }

    if (!movieDetails.startDate) {
      newErrors.startDate = "Start Date is required";
    }

    if (!movieDetails.movieType) {
      newErrors.movieType = "Movie Type is required";
    }
    if (!movieDetails.description) {
      newErrors.description = "Descriptionis required";
    }
    if (!movieDetails.language) {
      newErrors.language = "Language is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Validation passes if there are no errors
  };
  // Function to handle the submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(errors);

    console.log("api called", validate());

    if (!validate()) {
        toast.error('Please fix the errors in the form.');
        return;
    }

    console.log("data", movieDetails);
    console.log("casrs", casts);
    const formData = new FormData();
    casts.forEach((cast, index) => {
      formData.append(`casts[${index}][castName]`, cast.castName);
      formData.append(`casts[${index}][role]`, cast.role);
      if (cast.castImage) {
        formData.append(`casts[${index}][castImage]`, cast.castImage);
      }
    });

             try {
                  console.log("before",movieDetails);
                  
                  const result = await updateWithFile(movieDetails, 'updateMovieById',id);
                  console.log(result);
                  
                  if (result.success) {
                      console.log(result);
        
                      toast.success('Movie Added successfully !');
                   
                      try {
                  
                        const result2 = await updateWithFile(formData, 'updateCast',id);
                        if (result2.success) {
                            console.log(result2);
              
                         
              
                            navigate(`/admin-view-movie`);

        
                        } else {
                            console.error('Registration error:', result2);
                        }
                    } catch (error) {
                        console.error('Unexpected error:', error);
                        toast.error('An unexpected error occurred during Registration');
                    }
                      

                  } else {
                      console.error('Registration error:', result);
                      toast.error(result.message);
                  }
              } catch (error) {
                  console.error('Unexpected error:', error);
                  toast.error('An unexpected error occurred during Registration');
              }

              
    };

  const fetchData = async () => {
    try {
      const result = await ViewById("viewMovieById", id);

      if (result.success) {
        console.log(result);
        if (result.user) {
          setMovieDetails(result.user);
        } else {
          setMovieDetails(null);
        }
      } else {
        console.error("Data error:", result);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      console.log(error);    }
  };
  useEffect(() => {
    fetchData(); // Call the async function
  }, [id]);

  const fetchCastData = async () => {
    try {
      const result = await ViewById("viewCastByMovieId", id);

      if (result.success) {
        console.log("cast", result);
        if (result.user.length > 0) setCasts(result.user || []);
      } else {
        console.error("Data error:", result);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
  useEffect(() => {
    fetchCastData(); // Call the async function
  }, [id]);
  return (
    <div>
      <p className="admin-edit-movie-head">Edit Movie</p>
      <div className="cneter-edit-movie-card">
        <div className="card admin-edit-movie-card">


        <div className="row">
            <div className="col-6">
            <input
              type="text"
              placeholder="Movie Name"
              style={{ height: "40px",width:'100%' }}
              className="admin-edit-movie-moviename"
              value={movieDetails.movieName}
              onChange={handleChange}
            />
            </div>
            <div className="col-3">
            <label
                htmlFor="movieImage"
                style={{
                  cursor: "pointer",
                  padding: "10px 20px",
                  backgroundColor: "#BDBDBD",
                  color: "black",
                  borderRadius: "5px",
                  margin: "10px 10px 0 10px",
                  width:'100%'
                }}
              >
                Movie Image
              </label>
              <input
                type="file"
                id="movieImage"
                name="movieImage"
                accept="image/*"
                onChange={handlechangemovImage}
                style={{
                  display: "none",
                }}
              ></input>
            </div>
            <div className="col-3">
            <label
                htmlFor="coverImage"
                style={{
                  cursor: "pointer",
                  padding: "10px 20px",
                  backgroundColor: "#BDBDBD",
                  color: "black",
                  borderRadius: "5px",
                  margin: "10px 10px 0 10px",
                }}
              >
                Cover Image
              </label>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                accept="image/*"
                onChange={handlechangeCoverImage}
                style={{
                  display: "none",
                }}
              ></input>
            </div>
        </div>



                <div className="row mt-2">
                    <div className="col-6">
                    <div class="dropdown">
              <select
                name="language"
                value={movieDetails.language}
                onChange={handleChange}
                className="admin-add-movie-dropdown"
              >
                <option value="">Select Language</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
              </select>
            </div>
            {errors.language && (
              <div className="text-danger">{errors.language}</div>
            )}
                    </div>
                    <div className="col-6">
                    <select
              name="screenType"
              value={movieDetails.screenType}
              onChange={handleChange}
              className="admin-add-movie-dropdown"
            >
              <option value="">Select Screen Type</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="IMAX">IMAX</option>
            </select>
            {errors.screenType && (
              <div className="text-danger">{errors.screenType}</div>
            )}
                    </div>
                </div>


            <div className="row mt-2">
                <div className="col-4">
                <input
                type="date"
                onChange={handleChange}
                name="startDate"
                min={new Date().toISOString().split("T")[0]}
                value={movieDetails.startDate}
                className="admin-add-movie-enddate"
                placeholder="Start Date"
                style={{
                  backgroundColor: "#ADADAD",
                  width: "100%",
                }}
              ></input>
              {errors.startDate && (
                <div className="text-danger">{errors.startDate}</div>
              )}
                </div>
                <div className="col-4">
                <input
                type="date"
                onChange={handleChange}
                name="endDate"
                value={movieDetails.endDate}
                placeholder="End Date"
                min={new Date().toISOString().split("T")[0]}
                className="admin-add-movie-startdate"
                style={{
                  backgroundColor: "#ADADAD",
                  width: "100%",
                }}
              ></input>
              {errors.endDate && (
                <div className="text-danger">{errors.endDate}</div>
              )}
                </div>
                <div className="col-4">
                <select
              name="movieType"
              value={movieDetails.movieType}
              onChange={handleChange}
              className="admin-add-movie-dropdown"
              style={{width: "100%",}}
            >
              <option value="">Select Type</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Horror">Horror</option>
              <option value="Romantic">Romantic</option>
              <option value="Documentary">Documentary</option>
            </select>
            {errors.movieType && (
              <div className="text-danger">{errors.movieType}</div>
            )}
                </div>
            </div>


            <div className="row">
                <div className="col-6">
                <input
              type="text"
              value={movieDetails.duration}
              placeholder="Duration"
              className="admin-add-movie-duration"
              name="duration"
              onChange={handleChange}
              style={{ width: "100%" }}

            ></input>
            {errors.duration && (
              <div className="text-danger">{errors.duration}</div>
            )}
                </div>
                <div className="col-6">
                <label
              htmlFor="video"
              style={{
                cursor: "pointer",
                padding: "10px 20px",
                backgroundColor: "#BDBDBD",
                color: "black",
                borderRadius: "5px",
                margin: "10px",
                width: "97%",
              }}
            >
              Upload Trailer
            </label>
            <input
              type="file"
              className="admin-add-movie-trailer"
              id="video"
              name="trailer"
              onChange={handlechangeTrailer}
              accept="video/*"
              style={{ display: "none" }}
            ></input>
                </div>
            </div>



       
          <div className="row">
            <div className="col-12">
            <textarea
              className="form-control admin-add-show-textarea"
              value={movieDetails.description}
              placeholder="Description"
              name="description"
              onChange={handleChange}
            ></textarea>
            {errors.description && (
              <div className="text-danger">{errors.description}</div>
            )}
            </div>
           
          </div>
        </div>

        {/* <div className="card admin-add-movie-card-two">
                    <p className='admin-add-movie-card-two'>Cast</p>
                    {casts.map((cast, index) => (
                        <div className='d-flex justify-content-evenly' key={index}>
                            <input
                                type='text'
                                placeholder='Cast Name'
                                className='admin-add-movie-duration'
                                value={cast.castName}
                                name="castName"
                                onChange={(e) => handleCastChange(index, "castName", e.target.value)}
                            />


                            <input
                                type='text'
                                placeholder='Cast Role'
                                className='admin-add-movie-duration'
                                value={cast.role}
                                onChange={(e) => handleCastChange(index, "role", e.target.value)}
                            />
                            <label htmlFor={`castImage${index}`} style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#BDBDBD', color: 'black', borderRadius: '5px', margin: '10px', fontWeight: 'normal' }}>
                                Image
                            </label>
                            <input
                                type="file"
                                id={`castImage${index}`}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => handleCastChange(index, "castImage", e.target.files[0])}
                            />
                        </div>
                    ))}
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-outline-danger admin-add-movie-addmorebutton' type="button" onClick={handleAddCast}>ADD More</button>
                    </div>
                </div> */}

        <div>
          <button
            className="btn btn-danger admin-add-movie-addbutton"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminEditMovie;
