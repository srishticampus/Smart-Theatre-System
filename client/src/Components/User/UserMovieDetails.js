import React, { useEffect, useState } from "react";
import { viewCount, approveById } from "../../Services/AdminService";
import { IMG_BASE_URL } from "../../Services/BaseURL";
import { toast } from "react-toastify";
import { ViewById } from "../../Services/CommonServices";
import FooterLandingPage from "../Footers/FooterLandingPage";
import "../../Assets/Styles/UserHome.css";
import { Link, useNavigate, useParams } from "react-router-dom";
function UserMovieDetails() {
  const userId = localStorage.getItem("user");
  const { id } = useParams();
  const [movieId, setMovieId] = useState(id);

  const [data, setData2] = useState({
    movieImage: { filename: "" },
    coverImage: { filename: "" },
    screenId: { sreenName: "" },
  });
  const [genre, setGenre] = useState([]);
  const [castdata, setCastData] = useState([]);

  const [data2, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData2 = async () => {
    try {
      const result = await viewCount("nowShowingMovies");

      if (result.success) {
        console.log(result);
        if (result.user.length > 0) {
          setData(result.user);
        } else {
          setData([]);
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
    fetchData2(); // Call the async function
  }, [movieId]);

  const fetchData3 = async () => {
    try {
      const result = await ViewById("viewMovieById", movieId);
      if (result.success) {
        console.log("mov", result.user);

        setData2(result.user || null);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);    }
  };

  useEffect(() => {
    fetchData();
  }, [movieId]);
  const fetchData = async () => {
    try {
      const result = await ViewById("viewMovieById", movieId);
      if (result.success) {
        console.log("mov", result.user);

        setData2(result.user || null);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);    }
  };

  useEffect(() => {
    fetchData();
  }, [movieId]);
  const movieDetailView = (id) => {
    console.log("data", id);
    setMovieId(id);
    navigate(`/user-movie-details/${id}`);
  };
  const book = (id) => {
    navigate(`/user-book-ticket/${movieId}`);
  };
  const fetchCastData = async () => {
    try {
      const result = await ViewById("viewCastByMovieId", id);

      if (result.success) {
        console.log("cast", result);
        if (result.user.length > 0) setCastData(result.user || []);
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
  }, [movieId]);
  return (
    <div className="mt-10">
      {console.log(`${IMG_BASE_URL}${data.coverImage.filename}`)}
      <div
        className="imageContainer2 mt-5"
        style={{
          backgroundImage: `url(${
            data.coverImage?.filename
              ? `${IMG_BASE_URL}/${encodeURIComponent(
                  data.coverImage.filename
                )}`
              : "https://via.placeholder.com/400"
          })`,
        }}
      >
        <img
          src={`${IMG_BASE_URL}/${data.movieImage.filename}`}
          alt="Screen 2 Left"
        />
        <div className="screen2-text">
          <h4>{data.movieName}</h4>
          <h5>{data.movieType}</h5>
          <h5>{data.duration}</h5>
          <div className="screen2-lang">{data.screenId.screenName}</div>{" "}
          <div className="screen2-lang">{data.language}</div>
          <br />
          <div className="screen2-btn" onClick={book}>
            Book Now
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <h1 className="user-movie-head1">Movie Description</h1>
        <p className="user-movie-head2">{data.description}</p>

        {castdata.length > 0 ? (
          <div className="row">
            <p className='className="user-movie-head1 '>Cast</p>

            {castdata.map((item) => {
              return (
                <div className="col-sm-2 d-flex flex-column align-items-center">
                  {item?.castImage?.length > 0 ? (
                    <img
                      src={`${IMG_BASE_URL}/${item.castImage[0].filename}`}
                      className="cast-img"
                      alt={item.castName || "Cast Image"}
                    />
                  ) : (
                    <div className="no-image-placeholder">
                      <p>No Cast Available</p>
                    </div>
                  )}
                  <p className="cast-name">{item.castName}</p>
                  <p className="cast-designation">{item.role}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <h2>Cast Not available</h2>
        )}
      </div>
      <div className="container mt-5">
        <h1 className="user-movie-head1">You May Also Like</h1>

        <div className="row g-4">
          {data2.map((item, index) => (
            <div
              key={item._id || index}
              className="col-md-3 "
              onClick={() => {
                movieDetailView(item._id);
              }}
            >
              <div className="h-100 p-3" style={{ width: "18rem" }}>
                <img
                  src={`${IMG_BASE_URL}/${item.movieImage.filename}`}
                  alt={item.movieName}
                  className="card-img-top"
                  style={{width:'18rem',height:'50vh',objectFit:'cover'}}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.movieName}</h5>
                  <p className="card-text"> {item.movieType}</p>
                  <p className="card-text"> {item.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserMovieDetails;
