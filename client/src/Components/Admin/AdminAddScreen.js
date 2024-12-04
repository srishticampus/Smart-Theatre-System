import React, { useState } from 'react';
import "../../Assets/Styles/AdminAddScreen.css";

const AdminAddScreen = () => {

  const [selectedLounge, setSelectedLounge] = useState('gold');
  const [isPreviousVisible, setIsPreviousVisible] = useState(false);

  const handleLoungeClick = (lounge) => {
    setSelectedLounge(lounge);
  };


  const handleNextClick = () => {
    if (selectedLounge === 'gold') {
      setSelectedLounge('silver');
    } else if (selectedLounge === 'silver') {
      setSelectedLounge('platinum');
    } else if (selectedLounge === 'platinum') {
      setSelectedLounge('gold');
    }

    setIsPreviousVisible(true);
  };


  const handlePreviousClick = () => {
    if (selectedLounge === 'gold') {
      setSelectedLounge('platinum');
    } else if (selectedLounge === 'silver') {
      setSelectedLounge('gold');
    } else if (selectedLounge === 'platinum') {
      setSelectedLounge('silver');
    }
  };

  return (
    <>
      <div className='admin-add-screen-sectionone'>
        <p className='admin-add-screen-haedone'>Add Screen</p>
        <input type='text' placeholder='64ft*101.6ft' className='admin-add-screen-sectionone-field-screensize' />
        <input type='text' placeholder='Screen Name' className='admin-add-screen-sectionone-field-screenname' />
        <div className="dropdown">
          <button className="btn dropdown-toggle admin-add-screen-dropdown-button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
           Format
            <i className="bi bi-chevron-down ms-auto"></i>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a className="dropdown-item" href="#">2D</a></li>
            <li><a className="dropdown-item" href="#">3D</a></li>
            <li><a className="dropdown-item" href="#">IMAX</a></li>
          </ul>
        </div>
      </div>
      <div className='admin-add-screen-sectiontwo'>
        <p className='admin-add-screen-haedtwo'>Set Lounge</p>
        <div className="btn-group">
          <button
            type="button"
            className={`btn admin-add-screen-sectiontwo-buttonone ${selectedLounge === 'gold' ? 'bg-red' : ''}`}
            onClick={() => handleLoungeClick('gold')}
          >
            GOLD
          </button>
          <button
            type="button"
            className={`btn admin-add-screen-sectiontwo-buttontwo ${selectedLounge === 'silver' ? 'bg-red' : ''}`}
            onClick={() => handleLoungeClick('silver')}
          >
            SILVER
          </button>
          <button
            type="button"
            className={`btn admin-add-screen-sectiontwo-buttonthree ${selectedLounge === 'platinum' ? 'bg-red' : ''}`}
            onClick={() => handleLoungeClick('platinum')}
          >
            PLATINUM
          </button>
        </div>
        <br />
        <div className='d-flex'>
          <input type='text' placeholder='Number Of Seat' className='admin-add-screen-sectiontwo-numberofseat' />
          <input type='text' placeholder='Amount' className='admin-add-screen-sectiontwo-amount' />
        </div>
        <input type='text' placeholder='Seat Number' className='admin-add-screen-sectiontwo-seatnumber' />
        
        {/* Render Next button */}
        <button
          type="button"
          className="btn btn-danger admin-add-screen-sectiontwo-buttonfour"
          onClick={handleNextClick}
        >
          Next
        </button>

        {/* Render Previous button conditionally */}
        {isPreviousVisible && (
          <button
            type="button"
            className="btn btn-danger admin-add-screen-sectiontwo-buttonprev"
            onClick={handlePreviousClick}
          >
            Previous
          </button>
        )}
      </div>
    </>
  );
};

export default AdminAddScreen;
