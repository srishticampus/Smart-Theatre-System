import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../Assets/Styles/UserLandingBanner.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import test from "../../Assets/Images/complaintBanner.png";
import test2 from "../../Assets/Images/paniTitle.png";
import test3 from "../../Assets/Images/kanguva 2.avif";
import logo from "../../Assets/Images/Vector.png";
import { Link } from "react-router-dom";
import { IMG_BASE_URL } from "../../Services/BaseURL";
import { viewCount } from "../../Services/AdminService";
import { toast } from "react-toastify";
function UserHomeNowShowing() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1, // Show 1 slide at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    arrows: true,
  };

  const [data, setData] = useState([]);

  const fetchData2 = async () => {
    try {
      const result = await viewCount("nowShowingMovies");

      if (result.success) {
        console.log(result);
        if (result.user.length > 0) {
          setData(result.user.reverse().slice(0, 2));
        } else {
          setData([]);
        }
      } else {
        console.error("Data error:", result);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred during Data View");
    }
  };
  useEffect(() => {
    fetchData2(); // Call the async function
  }, []);

  console.log("movies", data);

  return (
    <div className="userLandingBanner">
      <Slider {...settings}>
        {/* Screen 1 */}
        <div className="movieSlide">
          <div className="screen1Content">
            <div className="landing_banner">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_left_box">
                    <img src={logo} className="user-home-top-img" alt="logo" />
                    <p>
                      <span className="logo_red">Maxus</span>Cinemas
                    </p>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_right_box mt-5">
                    <p className="landing_banner_right_box_title">
                      MaxusCinemas - The Smart Way to Enjoy Every Show
                    </p>
                    <p className="landing_banner_right_box_sub_title mt-5">
                      Stay ahead of the game! Explore upcoming films and be the
                      first to secure your spot for the most anticipated
                      releases.
                    </p>
                    <Link to="/user-now-showing">
                      <button className="btn btn-danger landing_banner_register_btn mt-5 fw-bolder">
                        Start Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Screen 2 */}
        {data.length
          ? data.map((details) => {
              return (
                <div className="movieSlide">
                  <div className="screen2Content">
                    <div className="imageContainer">
                      <img
                        src={`${IMG_BASE_URL}/${details?.movieImage?.filename}`}
                        alt={details.movieName}
                        className="w-100"
                      />{" "}
                      <div className="screen2-text">
                        <h4>{details.movieName}</h4>
                        <h5>{details.movieType}</h5>
                        <h5>{details.duration}</h5>
                        <div className="screen2-lang">{details.language}</div>
                        <br />
                        <Link to={`/user-movie-details/${details._id}`} >
                        <div className="screen2-btn">Book Now</div>

                        </Link>
                      </div>
                    </div>
                    <h1>Double Feature</h1>
                    <p>Watch back-to-back movies with exciting combo offers.</p>
                    <button className="button">View Details</button>
                  </div>
                </div>
              );
            })
          : ""}

        {/* Screen 3 */}
        {/* <div className="movieSlide">
          <div className="screen3Content">
            <img src={test3} alt="Screen 3" className="fullWidthImage" />
            <div className="screen3-text">
              <h3>Releasing On 14 Nov 2024</h3>
            </div>
          </div>
        </div> */}
      </Slider>
    </div>
  );
}

export default UserHomeNowShowing;
