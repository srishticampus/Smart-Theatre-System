import React, { useState } from 'react';
import "../../Assets/Styles/AdminViewLounge.css";

function AdminViewLounge() {
  // State to track the current button selection (Gold, Silver, Platinum)
  const [selectedButton, setSelectedButton] = useState(null);
  const [showPrevious, setShowPrevious] = useState(false);

  // Handle button click to update the selected button and change background
  const handleNextClick = () => {
    if (selectedButton === null) {
      setSelectedButton('gold');
    } else if (selectedButton === 'gold') {
      setSelectedButton('silver');
    } else if (selectedButton === 'silver') {
      setSelectedButton('platinum');
    }
    setShowPrevious(true); // Show the "Previous" button when "Next" is clicked
  };

  // Handle previous button click
  const handlePreviousClick = () => {
    if (selectedButton === 'platinum') {
      setSelectedButton('silver');
    } else if (selectedButton === 'silver') {
      setSelectedButton('gold');
    } else {
      setSelectedButton(null);
    }
    if (selectedButton !== null) {
      setShowPrevious(true);
    }
  };

  return (
    <div className='admin-view-lounge-container'>
      <div className="row">
        <div className="col-sm-4">
          <p className='admin-view-lounge-head'>View Lounge Screen</p>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="btn-group">
            <button
              type="button"
              className={`btn admin-view-lounge-screen-buttonone ${selectedButton === 'gold' ? 'selected' : ''}`}
              onClick={() => setSelectedButton('gold')}
            >
              GOLD
            </button>
            <button
              type="button"
              className={`btn admin-view-lounge-screen-buttontwo ${selectedButton === 'silver' ? 'selected' : ''}`}
              onClick={() => setSelectedButton('silver')}
            >
              SILVER
            </button>
            <button
              type="button"
              className={`btn admin-view-lounge-screen-buttonthree ${selectedButton === 'platinum' ? 'selected' : ''}`}
              onClick={() => setSelectedButton('platinum')}
            >
              PLATINUM
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-5">
          <div className='d-flex mt-4'>
            <p>Number of Seats</p><button className='btn btn-outline-dark admin-view-buttonfour'>30</button>
          </div>
          <div className='d-flex mt-4'>
            <p>Amount</p><button className='btn btn-outline-dark admin-view-buttonfive'>300</button>
          </div>
          <div className='d-flex mt-4'>
            <p>Show Time</p><button className='btn btn-outline-dark admin-view-buttonsix'>9AM</button>
          </div>
          <div className='d-flex mt-4'>
            <p>Format</p><button className='btn btn-outline-dark admin-view-buttonseven'>30</button>
          </div>
          <div className='d-flex mt-4'>
            <p>Seat Number</p><button className='btn btn-outline-dark admin-view-buttoneight'>A1</button>
          </div>
        </div>
        <div className="col-sm-12">
          <div className='d-flex justify-content-end'>
            {showPrevious && (
              <button className='btn btn-danger view-previous-button' onClick={handlePreviousClick}>Previous</button>
            )}
            <button className='btn btn-danger' onClick={handleNextClick}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewLounge;
