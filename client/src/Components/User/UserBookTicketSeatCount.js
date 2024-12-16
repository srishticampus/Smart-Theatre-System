import React, { useState } from 'react';
import "../../Assets/Styles/UserBookTicketSeatCount.css";

function UserBookTicketSeatCount() {
    const [selectedSeat, setSelectedSeat] = useState(null);

    // Handle button click event
    const handleButtonClick = (seatNumber) => {
        setSelectedSeat(seatNumber);
    };

    return (
        <div>
            <div className='user-book-ticket-seat-count-sectionone container'>
                <p className='user-book-ticket-seat-count-header'>Demonte Colony 2</p>
                <p className='user--book-ticket-seat-genre'>Horror, Comedy</p>
                <p className='user-book-ticket-seat-date'>Maxus Cinemas | Tuesday, November, 7:00 AM</p>
                <hr />
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <div className="card user-book-ticket-seat-count-card">
                    <div className="card-header user-book-ticket-seat-count-card-header">
                        <p className='user-book-ticket-head'>How many seats?</p>
                    </div>
                    <div className="card-body d-flex justify-content-center">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((seatNumber) => (
                            <button
                                key={seatNumber}
                                className={`btn user-book-ticket-roundedbutton ${selectedSeat === seatNumber ? 'btn-danger' : ''}`}
                                onClick={() => handleButtonClick(seatNumber)}
                            >
                                {seatNumber}
                            </button>
                        ))}
                     
                    </div>
                    <div className='d-flex justify-content-center mb-3'>
                    <button className='btn btn-danger user-book-seat-select-button'>Select Seats</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default UserBookTicketSeatCount;
