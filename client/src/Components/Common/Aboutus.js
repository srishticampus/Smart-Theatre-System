import React from 'react'
import "../../Assets/Styles/ContactUs.css";
import "../../Assets/Styles/AboutUs.css";
import Aboutus_Section2 from '../../Assets/Images/Aboutus_Section2.png';

function Aboutus() {
  return (
    <>
      <div className='Section_one'>
        <p className="Section_one_head1">ABOUT US</p>
        <p className='Section_one_head2'>Welcome to Smart Theatre – Your Smart <br /> Solution for Movie Night!</p>
        <p className='Section_one_para'>At Smart Theatre, we believe that a night at the movies should be fun, easy, and hassle-free. Founded by a team of movie lovers and tech<br /> enthusiasts, we set out to transform the way people experience cinema by bringing convenience and joy back to every step of the process.<br /> Our app offers a seamless, all-in-one solution to make your movie night as smooth as possible, from booking tickets to ordering snacks and<br /> securing parking.</p>
      </div>
      <div className='Section_two'>
        <div className='container'>
          {/* <div className='row '>
          <div className='col-sm-5 ms-5'>
           <img src={Aboutus_Section2}/>
          </div>
          <div className='col-sm-5 ms-5'>
           <p className='Section_two_righthead1'>OUR MISSION</p>
           <p className='Section_two_righthead2'>Our mission is simple!</p>
           <p className='Section_two_rightpara'>To enhance every part of your movie-going experience. By combining <br/> technology with a passion for cinema, we’ve built an app that caters to your <br/> needs—giving you more time to relax and enjoy the magic on the big screen.</p>
          </div>
        </div> */}
          <img src={Aboutus_Section2} />
          <div>
            <p className='Section_two_righthead1'>OUR MISSION</p>
            <p className='Section_two_righthead2'>Our mission is simple!</p>
            <p className='Section_two_rightpara'>To enhance every part of your movie-going experience. By combining <br /> technology with a passion for cinema, we’ve built an app that caters to your <br /> needs—giving you more time to relax and enjoy the magic on the big screen.</p>
          </div>
        </div>
      </div>
      <div className='Section_three'>
        <div className='container'>
        <p className='Section_three_head1'>Why Choose Smart Theatre?</p>
        <p className='Section_three_para1'>We know how frustrating it can be to deal with long lines, sold-out tickets, and parking hassles on your night out. Our goal is to make sure you spend less time waiting and more time enjoying your favorite movies. We’ve packed our app with innovative features to keep things simple and convenient, making sure you have a memorable experience every time.</p>
        </div>
      </div>
    </>
  )
}

export default Aboutus