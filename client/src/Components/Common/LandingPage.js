import React from "react";
import "../../Assets/Styles/LandingPage.css";
import logo from "../../Assets/Images/Vector.png";
import { Link } from "react-router-dom";
import film1 from '../../Assets/Images/film1.png'
import film2 from '../../Assets/Images/film2.png'
import film3 from '../../Assets/Images/film3.png'
import film4 from '../../Assets/Images/film4.png'
import film5 from '../../Assets/Images/film5.png'
function LandingPage() {
  return (
    <div className="landing-page-container">
      <div className="landing_banner ">
        <div className=" container">
          <div className="row ">
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_left_box">
              <img src={logo} alt="logo" />
              <p><span className='logo_red' >Maxus</span>Cinemas</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_right_box mt-5">
              <p className="landing_banner_right_box_title">
              MaxusCinemas  - The Smart Way to Enjoy Every Show
              </p>
              <p className="landing_banner_right_box_sub_title mt-5">
              Stay ahead of the game! Explore upcoming films and be the first to secure your spot for the most anticipated releases.!
              </p>
              <Link to='/user_login' ><button className="btn btn-danger landing_banner_register_btn mt-5 fw-bolder">
                Start Now
              </button></Link>
            </div>
          </div>
        </div>
      </div>
     <div className="landing-sec2 ">
 
<p className="landing-div2 mt-5 mb-5">Now Showing movies</p>
<div className="landing-now-showing-container mt-5">

  <div className="row">

  <div className="landing-now-showing-img">
      <img src={film1} alt="film 1" />
    </div>
    <div className="landing-now-showing-img">
      <img src={film2} alt="film 2" />
    </div>
    <div className="landing-now-showing-img">
      <img src={film3} alt="film 3" />
    </div>
    <div className="landing-now-showing-img">
      <img src={film4} alt="film 4" />
    </div>
    <div className="landing-now-showing-img">
      <img src={film5} alt="film 5" />
    </div>
  </div>
</div>
     </div>
     </div>
  
  );
}

export default LandingPage;
