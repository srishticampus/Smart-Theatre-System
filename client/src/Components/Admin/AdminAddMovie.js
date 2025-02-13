import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  register,
  registerWithFile,
  registerWithFileforCaste,
} from "../../Services/CommonServices";
import "../../Assets/Styles/AdminAddMovie.css";
import { viewCount } from "../../Services/AdminService";

function AdminAddMovie() {
  const [casts, setCasts] = useState([
    { castName: "", role: "", castImage: null },
  ]);
  const [screen, setScreen] = useState([]);
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
    screenId: "",
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

  const fetchData = async () => {
    try {
      const result = await viewCount("viewAllScreens");
      if (result.success) {
        setScreen(result.user || []);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
        console.log(error);
            }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    console.log(errors);

    console.log("api called", validate());

    // if (!validate()) {
    //     toast.error('Please fix the errors in the form.');
    //     return;
    // }

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
      const result = await registerWithFile(movieDetails, "createMovie");
      console.log(result);

      if (result.success) {
        console.log(result);

        toast.success("Movie Added successfully !");
        // window.location.reload()
        try {
          const result2 = await registerWithFileforCaste(
            formData,
            "createCast",
            result.user._id
          );
          if (result2.success) {
            console.log(result2);

            navigate(`/admin-view-movie`);
          } else {
            console.error("Registration error:", result2);
          }
        } catch (error) {
          console.error("Unexpected error:", error);
          toast.error("An unexpected error occurred during Registration");
        }
      } else {
        console.error("Registration error:", result);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred during Registration");
    }
  };
  return (
    <div>
      <p className="admin-add-movie-head">Add Movie</p>
      <div className="cneter-add-movie-card">
        <div className="card admin-add-movie-card">
          <div className="d-flex justify-content-evenly ">
            <input
              type="text"
              placeholder="Movie Name"
              name="movieName"
              style={{ height: "40px" }}
              className="admin-add-movie-moviename"
              onChange={handleChange}
            ></input>
            {errors.movieName && (
              <div className="text-danger">{errors.movieName}</div>
            )}
            <div>
              <label
                htmlFor="movieImage"
                style={{
                  cursor: "pointer",
                  padding: "10px 20px",
                  backgroundColor: "#BDBDBD",
                  color: "black",
                  borderRadius: "5px",
                  margin: "10px",
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
              {errors.movieImage && (
                <div className="text-danger">{errors.movieImage}</div>
              )}
              <label
                htmlFor="coverImage"
                style={{
                  cursor: "pointer",
                  padding: "10px 20px",
                  backgroundColor: "#BDBDBD",
                  color: "black",
                  borderRadius: "5px",
                  margin: "10px",
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
              {errors.coverImage && (
                <div className="text-danger">{errors.coverImage}</div>
              )}
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-evenly mt-2">
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
            <select
              name="screenId"
              value={movieDetails.screenId}
              onChange={handleChange}
              className="admin-add-movie-dropdown"
            >
              <option value="">Select Screen</option>
              {screen.map((screenType, index) => (
                <option key={index} value={screenType._id}>
                  {screenType.screenName}
                </option>
              ))}
            </select>

            {errors.screenType && (
              <div className="text-danger">{errors.screenType}</div>
            )}
          </div>

          <div className="d-flex justify-content-evenly mt-3">
            <div className="d-flex">
              <input
                type="date"
                onChange={handleChange}
                name="startDate"
                min={new Date().toISOString().split("T")[0]}
                className="admin-add-movie-enddate"
                placeholder="Start Date"
                style={{
                  backgroundColor: "#ADADAD",
                }}
              ></input>
              {errors.startDate && (
                <div className="text-danger">{errors.startDate}</div>
              )}
              <input
                type="date"
                onChange={handleChange}
                name="endDate"
                placeholder="End Date"
                min={new Date().toISOString().split("T")[0]}
                className="admin-add-movie-startdate"
                style={{
                  backgroundColor: "#ADADAD",
                }}
              ></input>
              {errors.endDate && (
                <div className="text-danger">{errors.endDate}</div>
              )}
            </div>
            <select
              name="movieType"
              value={movieDetails.movieType}
              onChange={handleChange}
              className="admin-add-movie-dropdown"
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

          <div className="d-flex justify-content-evenly mt-2">
            <input
              type="text"
              placeholder="Duration"
              className="admin-add-movie-duration"
              name="duration"
              onChange={handleChange}
            ></input>
            {errors.duration && (
              <div className="text-danger">{errors.duration}</div>
            )}
            <label
              htmlFor="video"
              style={{
                cursor: "pointer",
                padding: "10px 20px",
                backgroundColor: "#BDBDBD",
                color: "black",
                borderRadius: "5px",
                margin: "10px",
                width: "250px",
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
            {errors.trailer && (
              <div className="text-danger">{errors.trailer}</div>
            )}
          </div>
          <div className="test">
            <textarea
              className="form-control admin-add-show-textarea"
              placeholder="Description"
              name="description"
              onChange={handleChange}
            ></textarea>
            {errors.description && (
              <div className="text-danger">{errors.description}</div>
            )}
          </div>
        </div>

        <div className="card admin-add-movie-card-two">
          <p className="admin-add-movie-card-two">Cast</p>
          {casts.map((cast, index) => (
            <div className="d-flex justify-content-evenly" key={index}>
              <input
                type="text"
                placeholder="Cast Name"
                className="admin-add-movie-duration"
                value={cast.castName}
                name="castName"
                onChange={(e) =>
                  handleCastChange(index, "castName", e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Cast Role"
                className="admin-add-movie-duration"
                value={cast.role}
                onChange={(e) =>
                  handleCastChange(index, "role", e.target.value)
                }
              />
              <label
                htmlFor={`castImage${index}`}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  backgroundColor: "#BDBDBD",
                  color: "black",
                  borderRadius: "5px",
                  margin: "10px",
                  fontWeight: "normal",
                }}
              >
                Image
              </label>
              <input
                type="file"
                id={`castImage${index}`}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) =>
                  handleCastChange(index, "castImage", e.target.files[0])
                }
              />
            </div>
          ))}
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-danger admin-add-movie-addmorebutton"
              type="button"
              onClick={handleAddCast}
            >
              ADD More
            </button>
          </div>
        </div>

        <div>
          <button
            className="btn btn-danger admin-add-movie-addbutton"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminAddMovie;
