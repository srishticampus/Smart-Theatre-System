import React, { useState } from 'react';
import "../../Assets/Styles/AdminEditScreen.css"

const AdminEditScreen = () => {
    // State to track the selected lounge
    const [selectedLounge, setSelectedLounge] = useState('gold');
    // State to track whether the "Previous" button should be visible
    const [isPreviousVisible, setIsPreviousVisible] = useState(false);

    // Function to handle lounge button click
    const handleLoungeClick = (lounge) => {
        setSelectedLounge(lounge); // Set the selected lounge to the clicked lounge
    };

    // Function to handle next button click
    const handleNextClick = () => {
        if (selectedLounge === 'gold') {
            setSelectedLounge('silver');
        } else if (selectedLounge === 'silver') {
            setSelectedLounge('platinum');
        } else if (selectedLounge === 'platinum') {
            setSelectedLounge('gold');
        }
        // Make the "Previous" button visible after clicking "Next"
        setIsPreviousVisible(true);
    };

    // Function to handle previous button click
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
        <div>
            <p className='admin-edit-screen-head'>Edit Screen</p>

            <div className="row">
                <div className="col-sm-6">
                    <input type='text' placeholder='64ft &times; 101.6ft ' className='admin-edit-screen-fieldone'></input>
                </div>
                <div className="col-sm-6">
                    <input type='text' placeholder='Screen Name' className='admin-edit-screen-fieldtwo'></input>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-6">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle admin-edit-screen-dropdown" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
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
                <div className="col-sm-6">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle admin-edit-screen-dropdowntwo" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            Show Time
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="#">time</a></li>
                            <li><a className="dropdown-item" href="#">time</a></li>
                            <li><a className="dropdown-item" href="#">time</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <button className='btn btn-danger admin-edit-screen-top-next-button '>
                        Next
                    </button>
                </div>
            </div>
            <div className='admin-edit-screen-sectiontwo'>
                <p className='admin-edit-screen-haedtwo'>Set Lounge</p>
                <div className="btn-group">
                    <button
                        type="button"
                        className={`btn admin-edit-screen-sectiontwo-buttonone ${selectedLounge === 'gold' ? 'bg-red' : ''}`}
                        onClick={() => handleLoungeClick('gold')}
                    >
                        GOLD
                    </button>
                    <button
                        type="button"
                        className={`btn admin-edit-screen-sectiontwo-buttontwo ${selectedLounge === 'silver' ? 'bg-red' : ''}`}
                        onClick={() => handleLoungeClick('silver')}
                    >
                        SILVER
                    </button>
                    <button
                        type="button"
                        className={`btn admin-edit-screen-sectiontwo-buttonthree ${selectedLounge === 'platinum' ? 'bg-red' : ''}`}
                        onClick={() => handleLoungeClick('platinum')}
                    >
                        PLATINUM
                    </button>
                </div>
                <br />
                <div className='d-flex'>
                    <input type='text' placeholder='Number Of Seat' className='admin-edit-screen-sectiontwo-numberofseat' />
                    <input type='text' placeholder='Amount' className='admin-edit-screen-sectiontwo-amount' />
                </div>
                <input type='text' placeholder='Seat Number' className='admin-edit-screen-sectiontwo-seatnumber' />

                {/* Render Next button */}
                <button
                    type="button"
                    className="btn btn-danger admin-edit-screen-sectiontwo-buttonfour"
                    onClick={handleNextClick}
                >
                    Next
                </button>

                {/* Render Previous button conditionally */}
                {isPreviousVisible && (
                    <button
                        type="button"
                        className="btn btn-danger admin-edit-screen-sectiontwo-buttonprev"
                        onClick={handlePreviousClick}
                    >
                        Previous
                    </button>
                )}
            </div>
        </div>
    )
}

export default AdminEditScreen
