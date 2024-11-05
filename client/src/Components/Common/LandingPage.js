import React from "react";
import "../../Assets/Styles/LandingPage.css";
import logo from "../../Assets/Images/Vector.png";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div className="landing_banner">
        <div className=" container">
          <div className="row ">
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_left_box">
              <img src={logo} alt="logo" />
              <p><span className='logo_red' >Maxus</span>Cinemas</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_right_box mt-5">
              <p className="landing_banner_right_box_title">
              MaxusCinemas  - Your Destination for an Unforgettable Cinema Experience
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
      <div className="landing_banner_1 mt-2">
        <p className="landing_banner_left_title mt-5">Next-Gen Entertainment</p>
        <p className="landing_banner_left_content mt-4">
          Experience a digital revolution with <br />
          MaxusCinemas – where the future of <br />
          entertainment unfolds.
        </p>
      </div>
      <div className="landing_banner_2 mt-2">
        <p className="landing_banner_right_title mt-4">
        Seamless Streaming, <br/>Unmatched Experience
        </p>
        <p className="landing_banner_right_content mt-4">
        Join MaxusCinemas for a journey into limitless content, <br/>seamlessly delivered for an unparalleled <br/>viewing adventure.
        </p>
      </div>
      <div className="landing_banner_1 mt-2">
        <p className="landing_banner_left_title mt-5">Special Screenings & Events
       </p>
        <p className="landing_banner_left_content mt-4">
        Join us for special screenings, themed movie nights, <br/> and exclusive events that make your movie experience one-of-a-kind
        </p>
      </div>
      <div className="landing_banner_2 mt-2">
        <p className="landing_banner_right_title mt-5">
        Now Showing

        </p>
        <p className="landing_banner_right_content mt-4">
        From action-packed thrillers to heartwarming dramas, <br/>,hilarious comedies,Book your tickets<br/>view trailers, and find the best seats in the house!
        </p>
      </div>
      
    </div>
  );
}

export default LandingPage;
