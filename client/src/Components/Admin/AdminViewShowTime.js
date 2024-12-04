import React, { useState } from 'react'
import "../../Assets/Styles/AdminViewShowTime.css"


function AdminViewShowTime() {
    const [openDay, setOpenDay] = useState(null); // null means no day is open

    // Toggle function to handle each day
    const toggleAccordion = (day) => {
        setOpenDay(openDay === day ? null : day); // If the same day is clicked, it closes, else it opens
    };

    return (
        <div>
            <p className='admin-view-show-head'>View Show Time</p>
            <div className='view-show-time-container'>
                {/* Sunday Accordion */}
                <div className='admin-view-showtime'>
                    {openDay !== 'Sunday' && (
                        <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion('Sunday')}>
                            Sunday <span>&darr;</span>
                        </button>

                    )}

                    {openDay === 'Sunday' && (
                        <div className='card admin-viewshowcard p-3'>
                            <div>
                                <p>Sunday</p>
                            </div>
                            {/* Time input fields for Sunday */}
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="09:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="12:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="01:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="04:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="06:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="09:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="10:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="01:30" className='admin-view-showtime-space' />
                                </div>
                                <div className='d-flex justify-content-end mt-3'>
                                    <button className='btn btn-danger'>Edit</button>
                                </div>
                            </div>

                        </div>


                    )}


                </div>

                {/* Monday Accordion */}
                <div className='admin-view-showtime'>
                    {openDay !== 'Monday' && (
                        <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion('Monday')}>
                            Monday <span>&darr;</span>
                        </button>

                    )}

                    {openDay === 'Monday' && (
                        <div className='card admin-view-showcard p-3'>
                            <div>
                                <p>Monday</p>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="09:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="12:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="01:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="04:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="06:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="09:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="10:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="01:30" className='admin-view-showtime-space' />
                                </div>
                                <div className='d-flex justify-content-end mt-3'>
                                    <button className='btn btn-danger'>Edit</button>
                                </div>
                            </div>

                        </div>
                    )}

                </div>

                {/* Tuesday Accordion */}
                <div className='admin-view-showtime'>
                    {openDay !== 'Tuesday' && (
                        <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion('Tuesday')}>
                            Tuesday <span>&darr;</span>
                        </button>

                    )}

                    {openDay === 'Tuesday' && (
                        <div className='card admin-view-showcard p-3'>
                            <div>
                                <p>Tuesday</p>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="09:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="12:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="01:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="04:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="06:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="09:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="10:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="01:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className='d-flex justify-content-end mt-3'>
                                    <button className='btn btn-danger'>Edit</button>
                                </div>
                        </div>
                    )}
                </div>

                {/* Wednesday Accordion */}
                <div className='admin-view-showtime'>
                    {openDay !== 'Wednesday' && (
                        <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion('Wednesday')}>
                            Wednesday <span>&darr;</span>
                        </button>

                    )}

                    {openDay === 'Wednesday' && (
                        <div className='card admin-view-showcard p-3'>
                            <div>
                                <p>Wednesday</p>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="09:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="12:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="01:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="04:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="06:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="09:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="10:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="01:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className='d-flex justify-content-end mt-3'>
                                    <button className='btn btn-danger'>Edit</button>
                                </div>
                        </div>
                    )}
                </div>

                {/* Thursday Accordion */}
                <div className='admin-view-showtime'>
                    {openDay !== 'Thursday' && (
                        <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion('Thursday')}>
                            Thursday <span>&darr;</span>
                        </button>

                    )}

                    {openDay === 'Thursday' && (
                        <div className='card admin-view-showcard p-3'>
                            <div>
                                <p>Thursday</p>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="09:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="12:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="01:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="04:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="06:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="09:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="10:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="01:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className='d-flex justify-content-end mt-3'>
                                    <button className='btn btn-danger'>Edit</button>
                                </div>
                        </div>
                    )}
                </div>

                {/* Friday Accordion */}
                <div className='admin-view-showtime'>
                    {openDay !== 'Friday' && (
                        <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion('Friday')}>
                            Friday <span>&darr;</span>
                        </button>

                    )}

                    {openDay === 'Friday' && (
                        <div className='card admin-view-showcard p-3'>
                            <div>
                                <p>Friday</p>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="09:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="12:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="01:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="04:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="06:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="09:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="10:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="01:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className='d-flex justify-content-end mt-3'>
                                    <button className='btn btn-danger'>Edit</button>
                                </div>
                        </div>
                    )}
                </div>

                {/* Saturday Accordion */}
                <div className='admin-view-showtime'>
                    {openDay !== 'Saturday' && (
                        <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion('Saturday')}>
                            Saturday <span>&darr;</span>
                        </button>

                    )}

                    {openDay === 'Saturday' && (
                        <div className='card admin-view-showcard p-3'>
                            <div>
                                <p>Saturday</p>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="09:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="12:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="01:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="04:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="06:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="09:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="10:00" className='admin-view-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="01:30" className='admin-view-showtime-space' />
                                </div>
                            </div>
                            <div className='d-flex justify-content-end mt-3'>
                                    <button className='btn btn-danger'>Edit</button>
                                </div>
                        </div>

                    )}
                </div>
                <button className='btn btn-danger mt-4'>Next</button>
            </div>


        </div>
    )
}

export default AdminViewShowTime
