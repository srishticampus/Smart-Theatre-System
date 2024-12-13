import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../Assets/Styles/AdminAddShow.css";
import { useNavigate, useParams } from 'react-router-dom';
import { register } from '../../Services/CommonServices';
import { toast } from "react-toastify";

function AdminAddShowtime() {
    const navigate=useNavigate()
    const {id}=useParams()
    const [openDay, setOpenDay] = useState(null); 
    const [showtimes, setShowtimes] = useState({
        Sunday: [{ start: "", end: "" }, { start: "", end: "" }, { start: "", end: "" }, { start: "", end: "" }],
        Monday: [{ start: "", end: "" }, { start: "", end: "" }, { start: "", end: "" }, { start: "", end: "" }],
        Tuesday: [{ start: "", end: "" }, { start: "", end: "" }, { start: "", end: "" }, { start: "", end: "" }],
        Wednesday: [{ start: "", end: "" }, { start: "", end: "" }, { start: "", end: "" }, { start: "", end: "" }],
        Thursday: [{ start: "", end: "" }, { start: "", end: "" }, { start: "", end: "" }, { start: "", end: "" }],
        Friday: [{ start: "", end: "" }, { start: "", end: "" }, { start: "", end: "" }, { start: "", end: "" }],
        Saturday: [{ start: "", end: "" }, { start: "", end: "" }, { start: "", end: "" }, { start: "", end: "" }],
    });
    
    const toggleAccordion = (day) => {
        setOpenDay(openDay === day ? null : day);
    };

    const handleTimeChange = (day, index, type, value) => {
        const newShowtimes = { ...showtimes };
        newShowtimes[day][index][type] = value;
        setShowtimes(newShowtimes);
    };

    const handleSave = async () => {
        try {
            const showtimesData = [];
            Object.keys(showtimes).forEach((day) => {
                showtimes[day].forEach((time, index) => {
                    if (time.start && time.end) {  
                        showtimesData.push({
                            day,
                            screenId: id,  
                            startTime: time.start,
                            endTime: time.end
                        });
                    }
                });
            });

            // Send the new showtimes data to the backend


              try {
                    console.log(showtimesData);
                    
                    const result = await register(showtimesData, 'addShowtime');
            
                    if (result.success) {
                        console.log(result);
            toast.success('Show Times Added for '+showtimes.day)
                       
            navigate(`/admin-view-screen`);
            
            
                    } else {
                        console.error('Registration error:', result);
                        toast.error(result.message);
                    }
                } catch (error) {
                    console.error('Unexpected error:', error);
                    toast.error('An unexpected error occurred during Registration');
                }
           
        } catch (error) {
            console.error("Error saving showtimes:", error);
            alert('Error saving showtimes.');
        }
    };

    const renderTimeInputs = (day) => {
        return showtimes[day]?.map((time, index) => (
            <div className="row d-flex align-items-center" key={index}>
                <div className="col-sm-5">
                    <input 
                        type="time" 
                        value={time.start} 
                        className='admin-showtime-space'
                        onChange={(e) => handleTimeChange(day, index, 'start', e.target.value)} 
                    />
                </div>
                <div className="col-sm-2 text-center">
                    <span className='mt-3'>to</span>
                </div>
                <div className="col-sm-5 text-end">
                    <input 
                        type="time" 
                        value={time.end} 
                        className='admin-showtime-space'
                        onChange={(e) => handleTimeChange(day, index, 'end', e.target.value)} 
                    />
                </div>
            </div>
        ));
    };

    return (
        <div>
            <div className='new'>
                <p className='add-show-time-head'>Add Show Time</p>
            </div>

            <div className='add-show-time-container'>
                {/* Loop through days */}
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <div className='admin-add-showtime' key={day}>
                        {openDay !== day && (
                            <button className='btn btn-secondary w-100 mb-4 d-flex justify-content-between' onClick={() => toggleAccordion(day)}>
                                {day} <span>&darr;</span>
                            </button>
                        )}

                        {openDay === day && (
                            <div className='card admin-add-showcard p-3 mb-3'>
                                <div>
                                    <p>{day}</p>
                                </div>
                                {renderTimeInputs(day)}
                                
                            </div>
                        )}
                    </div>
                ))}
                <div className="d-flex justify-content-end gap-3 mt-2">
                                    <button className="btn btn-outline-danger" onClick={handleSave}>Save</button>
                                </div>
            </div>
        </div>
    );
}

export default AdminAddShowtime;
