import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { register, registerWithFile } from '../../Services/CommonServices';
import "../../Assets/Styles/AdminAddMovie.css"

function AdminAddMovie() {
    const [casts, setCasts] = useState([{ castName: "", role: "", castImage: null }]);

    // Function to add a new cast row
    const handleAddCast = () => {
        console.log("here");
        
        setCasts([...casts, { castName: "", role: "", castImage: null }]);
    };

    // Function to handle changes in cast fields
    const handleCastChange = (index, field, value) => {
        const updatedCasts = [...casts];
        updatedCasts[index][field] = value;
        setCasts(updatedCasts);
    };

    const [movieDetails, setMovieDetails] = useState({
        movieName: "",
        movieImage: null,
        coverImage: null,
        language: "",
        screenType: "",
        startDate: "",
        endDate: "",
        movieType: "",
        duration: "",
        trailer: null,
        description: "",
        cast: [] // Array of cast objects {name, role, image}
    });

    // Function to handle general form changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setMovieDetails((prev) => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setMovieDetails((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Function to handle the submission of the form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create formData to handle file uploads
        const formData = new FormData();
        for (const key in movieDetails) {
            if (key === "cast") {
                movieDetails.cast.forEach((castMember, index) => {
                    formData.append(`cast[${index}][name]`, castMember.castName);
                    formData.append(`cast[${index}][role]`, castMember.role);
                    formData.append(`cast[${index}][image]`, castMember.castImage);
                });
            } else {
                formData.append(key, movieDetails[key]);
            }
        }

        // Make API call to submit the form (example)
        // axios.post('/api/movies', formData)
        //     .then(response => console.log(response.data))
        //     .catch(error => console.error(error));

        alert("Movie details submitted successfully!");
    };

    return (
        <div>
            <p className='admin-add-movie-head'>Add Movie</p>
            <div className='cneter-add-movie-card'>
             
                    <div className="card admin-add-movie-card">
                        {/* Movie Form Inputs */}
                    </div>

                    <div className="card admin-add-movie-card-two">
                        <p className='admin-add-movie-card-two'>Cast</p>
                        {casts.map((cast, index) => (
                        <div className='d-flex justify-content-evenly' key={index}>
                            <input
                                type='text'
                                placeholder='Cast Name'
                                className='admin-add-movie-duration'
                                value={cast.castName}
                                name="castName"
                                onChange={(e) => handleCastChange(index, "castName", e.target.value)}
                            />
                            <input
                                type='text'
                                placeholder='Cast Role'
                                className='admin-add-movie-duration'
                                value={cast.role}
                                onChange={(e) => handleCastChange(index, "role", e.target.value)}
                            />
                            <label htmlFor={`castImage${index}`} style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#BDBDBD', color: 'black', borderRadius: '5px', margin: '10px', fontWeight: 'normal' }}>
                                Image
                            </label>
                            <input
                                type="file"
                                id={`castImage${index}`}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => handleCastChange(index, "castImage", e.target.files[0])}
                            />
                        </div>
                    ))}
                    <div className='d-flex justify-content-center'>
                        <button className='' type="button" onClick={handleAddCast}>ADD More</button>
                    </div>
                </div>

                <div>
                    <button className='btn btn-danger admin-add-movie-addbutton' onClick={handleSubmit}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default AdminAddMovie;