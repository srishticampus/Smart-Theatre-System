import React from 'react'
import "../../Assets/Styles/LandingPageFooter.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import streambox from '../../Assets/Images/streambox.png'
import facebook_logo from '../../Assets/Images/facebook_logo.png'
import insta_logo from '../../Assets/Images/insta_logo.png';
import pinterest_logo from '../../Assets/Images/pinterest_logo.png';
import twitter_logo from '../../Assets/Images/twitter_logo.png';


function FooterLandingPage() {
    return (
        <div>
            <hr></hr>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <img className='streambox_img' src={streambox} alt='streambox' />
                        <p>streambox</p>
                        <div className='logos mt-5'>
                            <img className='Footer_logo_space' src={facebook_logo} alt="facebook"/>
                            <img className='Footer_logo_space' src={insta_logo} alt="insta"/>
                            <img className='Footer_logo_space' src={pinterest_logo} alt="pinterest"/>
                            <img className='Footer_logo_space' src={twitter_logo} alt="pinterest"/>
                            
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <h5 className='Footer_heading'>Quick Links</h5>
                        <ul className='Footer_list1'>
                            <li>Home</li>
                            <li>About</li>
                            <li>Book Movies</li>
                            <li>Contact</li>
                        </ul>

                    </div>

                    <div className="col-sm-3">
                        <h5 className='Footer_heading'>Terms & Policies</h5>
                        <ul className='Footer_list2'>
                            <li>Terms of Conditions</li>
                            <li>F&Q</li>
                            <li>Privacy Policy</li>
                            
                        </ul>

                    </div>
                    <div className="col-sm-3">
                        <h5 className='Footer_heading'>Get in touch</h5>
                        <ul className='Footer_list2'>
                            <li>0471-2525444</li>
                            <li>streambox@gmail.com</li>  
                        </ul>

                    </div>
                </div>
                <div className="container"><hr></hr></div>
            </div>

        </div>
    )
}

export default FooterLandingPage
