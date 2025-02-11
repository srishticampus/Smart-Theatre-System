import React, { useEffect, useState } from 'react';
import "../../Assets/Styles/AdminViewLounge.css";
import { ViewById } from '../../Services/CommonServices';
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';

function AdminViewLounge() {
  // State to track the current button selection (Gold, Silver, Platinum)
  const [selectedButton, setSelectedButton] = useState(null);
  const [showPrevious, setShowPrevious] = useState(false);
  const { id } = useParams();

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

  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const result = await ViewById('viewScreenById', id);

      if (result.success) {
        console.log(result);
        if (result.user) {
          setData(result.user);
        } else {
          setData(null);
        }
      } else {
        console.error('Data error:', result);
        toast.error(result.message);
      }

    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred during Data View');
    }
  };

  useEffect(() => {
    fetchData(); // Call the async function
  }, []);

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
            <p>Number of Seats</p>
            <button className='btn btn-outline-dark admin-view-buttonfour'>
              {
                selectedButton === 'platinum' ?
                  data.platinum?.seatCount || 0 :
                  selectedButton === 'gold' ?
                    data.gold?.seatCount || 0 :
                    selectedButton === 'silver' ?
                      data.silver?.seatCount || 0 : 0
              }
            </button>
          </div>
          <div className='d-flex mt-4'>
            <p>Amount</p>
            <button className='btn btn-outline-dark admin-view-buttonfive'>
              {selectedButton === 'platinum' ?
                data.platinum?.amount || 0 :
                selectedButton === 'gold' ?
                  data.gold?.amount || 0 :
                  selectedButton === 'silver' ?
                    data.silver?.amount || 0 : 0}
            </button>
          </div>
          {/* <div className='d-flex mt-4'>
            <p>Show Time</p>
            <button className='btn btn-outline-dark admin-view-buttonsix'>
              {data.showTime || '9AM'}
            </button>
          </div> */}
          <div className='d-flex mt-4'>
            <p>Format</p>
            <button className='btn btn-outline-dark admin-view-buttonseven'>
              {data.screenFormat || '2D'}
            </button>
          </div>
          <div className='d-flex mt-4'>
            <p>Seat Number</p>
            <button className='btn btn-outline-dark admin-view-buttoneight'>
              {selectedButton === 'platinum' ?
                data.platinum?.seatLabel || 0 :
                selectedButton === 'gold' ?
                  data.gold?.seatLabel || 0 :
                  selectedButton === 'silver' ?
                    data.silver?.seatLabel || 0 : 0}
            </button>
          </div>
        </div>
        <div className="col-sm-12">
          <div className='d-flex justify-content-end'>
            {showPrevious && (
              <button className='btn btn-danger view-previous-button' onClick={handlePreviousClick}>
                Previous
              </button>
            )}
            <button className='btn btn-danger' onClick={handleNextClick}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewLounge;
