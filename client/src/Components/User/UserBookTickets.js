import React, { useState, useRef } from 'react';
import "../../Assets/Styles/UserBookTickets.css";
import demonte from "../../Assets/Images/demonte.png";

function UserBookTickets() {
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef();

  // Function to scroll the calendar left
  const scrollLeft = () => {
    calendarRef.current.scrollBy({
      left: -150, // Adjust the scroll amount as needed
      behavior: 'smooth',
    });
  };

  // Function to scroll the calendar right
  const scrollRight = () => {
    calendarRef.current.scrollBy({
      left: 150, // Adjust the scroll amount as needed
      behavior: 'smooth',
    });
  };

  // Handle selecting a calendar button
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className='container'>
      <div className='user-book-ticket-section-one d-flex'>
        <div className='d-flex'>
          <img src={demonte} alt='demonteimg' className='user-book-ticket-img' />
          <div className='mt-4 ms-2'>
            <p className='user-book-ticket-banner-head'>Demonte Colony 2</p>
            <div className='d-flex'>
              <p className='user-book-ticket-2d'>2D</p>
              <p className='user-book-ticket-tamil'>Tamil</p>
            </div>
            <p className='user-book-ticket-genre'>Horror, Comedy</p>
            <p className="user-book-ticket-time">2hr 26min</p>
          </div>
        </div>

        {/* Calendar Carousel */}
        <div className='ms-auto calendar-carousel-container'>
          <button onClick={scrollLeft} className="carousel-button left">&#8592;</button>

          <div className="calendar-wrapper" ref={calendarRef}>
            <button
              className={`btn user-book-ticket-calender ${selectedDate === '20' ? 'selected' : ''}`}
              onClick={() => handleSelectDate('20')}
            >
              <p>20</p>
              <p>November</p>
              <p>&#40;Monday&#41;</p>
            </button>
            <button
              className={`btn user-book-ticket-calender ${selectedDate === '21' ? 'selected' : ''}`}
              onClick={() => handleSelectDate('21')}
            >
              <p>21</p>
              <p>November</p>
              <p>&#40;Tuesday&#41;</p>
            </button>
            <button
              className={`btn user-book-ticket-calender ${selectedDate === '22' ? 'selected' : ''}`}
              onClick={() => handleSelectDate('22')}
            >
              <p>22</p>
              <p>November</p>
              <p>&#40;Wednesday&#41;</p>
            </button>
            <button
              className={`btn user-book-ticket-calender ${selectedDate === '23' ? 'selected' : ''}`}
              onClick={() => handleSelectDate('23')}
            >
              <p>23</p>
              <p>November</p>
              <p>&#40;Thursday&#41;</p>
            </button>
            <button
              className={`btn user-book-ticket-calender ${selectedDate === '24' ? 'selected' : ''}`}
              onClick={() => handleSelectDate('24')}
            >
              <p>24</p>
              <p>November</p>
              <p>&#40;Friday&#41;</p>
            </button>
            <button
              className={`btn user-book-ticket-calender ${selectedDate === '25' ? 'selected' : ''}`}
              onClick={() => handleSelectDate('25')}
            >
              <p>25</p>
              <p>November</p>
              <p>&#40;Saturday&#41;</p>
            </button>
          </div>

          <button onClick={scrollRight} className="carousel-button right">&#8594;</button>
        </div>
      </div>
      <hr></hr>
      <div>
        <div className="user-book-ticket-section-two">
          <div className="section-two">
            <div className="card user-book-ticket-card">
              <div className="card-header user-book-ticket-card-header">
                <p className='card-header-align'>Novermber 28th</p>
              </div>
              <div className="card-body d-flex user-book-ticket-cardbody" >
                <p className='user-book-ticket-time'>Show time</p>
                <button className='user-book-ticket-show-button'>
                  <p>07:00 AM</p>
                  <p className='text-muted user-book-ticket-show-time'>Closed</p>
                </button>
                <button className='user-book-ticket-show-button'>
                  <p>12:00 PM</p>

                </button>
                <button className='user-book-ticket-show-button'>
                  <p>04:00 PM</p>

                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBookTickets;
