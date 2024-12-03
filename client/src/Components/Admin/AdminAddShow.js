import React, { useState } from 'react';
import "../../Assets/Styles/AdminAddShow.css";
import ion_switch_inside from "../../Assets/Images/ion_switch_inside.png";

function AdminAddShowtime() {

    const [openDay, setOpenDay] = useState(null); 

    const toggleAccordion = (day) => {
        setOpenDay(openDay === day ? null : day);
    };

    return (
        <div>
            <p className='add-show-time-head'>Add Show Time</p>
            <div className='add-show-time-container'>
                {/* Sunday Accordion */}
                <div className='admin-add-showtime'>
                    {openDay !== 'Sunday' && (
                        <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion('Sunday')}>
                            Sunday <span>&darr;</span>
                        </button>

                    )}

                    {openDay === 'Sunday' && (
                        <div className='card admin-add-showcard p-3'>
                            <div>
                                <p>Sunday</p>
                            </div>
                            {/* Time input fields for Sunday */}
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="09:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="12:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="01:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="04:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="06:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="09:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="10:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="01:30" className='admin-showtime-space' />
                                </div>

                            </div>
                            <div className="d-flex justify-content-end gap-3 mt-2">
                                <button className="btn btn-outline-danger">Save</button>
                                <button className="btn btn-danger">Update</button>
                            </div>
                        </div>

                    )}
                </div>

                {/* Monday Accordion */}
                <div className='admin-add-showtime'>
                    {openDay !== 'Monday' && (
                        <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion('Monday')}>
                            Monday <span>&darr;</span>
                        </button>

                    )}

                    {openDay === 'Monday' && (
                        <div className='card admin-add-showcard p-3'>
                            <div>
                                <p>Monday</p>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="09:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="12:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="01:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="04:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="06:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="09:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="10:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="01:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end gap-3 mt-2">
                                <button className="btn btn-outline-danger">Save</button>
                                <button className="btn btn-danger">Update</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tuesday Accordion */}
                <div className='admin-add-showtime'>
                    {openDay !== 'Tuesday' && (
                        <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion('Tuesday')}>
                            Tuesday <span>&darr;</span>
                        </button>

                    )}

                    {openDay === 'Tuesday' && (
                        <div className='card admin-add-showcard p-3'>
                            <div>
                                <p>Tuesday</p>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="09:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="12:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="01:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="04:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="06:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="09:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="10:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="01:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end gap-3 mt-2">
                                <button className="btn btn-outline-danger">Save</button>
                                <button className="btn btn-danger">Update</button>
                            </div>
                        </div>
                    )}
                </div>

                
                {/* Wednesday Accordion */}
                <div className='admin-add-showtime'>
                    {openDay !== 'Wednesday' && (
                        <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion('Wednesday')}>
                            Wednesday <span>&darr;</span>
                        </button>
                    )}

                    {openDay === 'Wednesday' && (
                        <div className='card admin-add-showcard p-3'>
                            <div>
                                <p>Wednesday</p>
                            </div>
                            {/* Time input fields for Wednesday */}
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="09:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="12:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="01:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="04:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="06:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="09:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="10:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="01:30" className='admin-showtime-space' />
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-3 mt-2">
                                <button className="btn btn-outline-danger">Save</button>
                                <button className="btn btn-danger">Update</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className='admin-add-showtime'>
                    {openDay !== 'Thursday' && (
                        <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion('Thursday')}>
                            Thursday <span>&darr;</span>
                        </button>

                    )}

                    {openDay === 'Thursday' && (
                        <div className='card admin-add-showcard p-3'>
                            <div>
                                <p>Thursday</p>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="09:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="12:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="01:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="04:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="06:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="09:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="10:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="01:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end gap-3 mt-2">
                                <button className="btn btn-outline-danger">Save</button>
                                <button className="btn btn-danger">Update</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Friday Accordion */}
                <div className='admin-add-showtime'>
                    {openDay !== 'Friday' && (
                        <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion('Friday')}>
                            Friday <span>&darr;</span>
                        </button>

                    )}

                    {openDay === 'Friday' && (
                        <div className='card admin-add-showcard p-3'>
                            <div>
                                <p>Friday</p>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="09:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="12:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="01:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="04:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="06:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="09:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="10:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="01:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end gap-3 mt-2">
                                <button className="btn btn-outline-danger">Save</button>
                                <button className="btn btn-danger">Update</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Saturday Accordion */}
                <div className='admin-add-showtime'>
                    {openDay !== 'Saturday' && (
                        <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion('Saturday')}>
                            Saturday <span>&darr;</span>
                        </button>

                    )}

                    {openDay === 'Saturday' && (
                        <div className='card admin-add-showcard p-3'>
                            <div>
                                <p>Saturday</p>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="09:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="12:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="01:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="04:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="06:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="09:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5">
                                    <input type="time" value="10:00" className='admin-showtime-space' />
                                </div>
                                <div className="col-sm-2 text-center">
                                    <span className='mt-3'>to</span>
                                </div>
                                <div className="col-sm-5 text-end">
                                    <input type="time" value="01:30" className='admin-showtime-space' />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end gap-3 mt-2">
                                <button className="btn btn-outline-danger">Save</button>
                                <button className="btn btn-danger">Update</button>
                            </div>
                        </div>

                    )}
                </div>

       
                <button className='btn btn-danger mt-4'>Next</button>
            </div>
        </div>
    );
}

export default AdminAddShowtime;
