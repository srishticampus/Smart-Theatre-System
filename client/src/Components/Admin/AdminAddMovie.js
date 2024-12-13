import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { register, registerWithFile } from '../../Services/CommonServices';
import "../../Assets/Styles/AdminAddMovie.css"


function AdminAddMovie() {

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

    const [currentCast, setCurrentCast] = useState({
        name: "",
        role: "",
        image: null
    });

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

    const handleCastChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setCurrentCast((prev) => ({
                ...prev,
                image: files[0]
            }));
        } else {
            setCurrentCast((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const addCast = () => {
        if (currentCast.name && currentCast.role && currentCast.image) {
            setMovieDetails((prev) => ({
                ...prev,
                cast: [...prev.cast, currentCast]
            }));

            // Reset current cast state
            setCurrentCast({ name: "", role: "", image: null });
        } else {
            alert("Please fill all cast fields before adding.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Movie Details: ", movieDetails);

        // Here you would send the data to the backend or handle form submission
        // Example: Use FormData to handle file uploads
        const formData = new FormData();

        for (const key in movieDetails) {
            if (key === "cast") {
                movieDetails.cast.forEach((castMember, index) => {
                    formData.append(`cast[${index}][name]`, castMember.name);
                    formData.append(`cast[${index}][role]`, castMember.role);
                    formData.append(`cast[${index}][image]`, castMember.image);
                });
            } else {
                formData.append(key, movieDetails[key]);
            }
        }

        // Make API call (example)
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
                    <div className='d-flex justify-content-evenly '>
                        <input type='text' placeholder='Movie Name' style={{ height: '40px' }} 
                        className='admin-add-movie-moviename'
                        
                        onChange={handleChange}
></input>
                        <div>
                            <label htmlFor="movieImage" style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#BDBDBD', color: 'black', borderRadius: '5px', margin: '10px' }}>
                                Movie Image
                            </label>
                            <input
                                type="file"
                                id="movieImage"
                                name="movieImage"
                                accept="image/*"
                                onChange={handleChange}
                                style={{
                                    display: 'none',

                                }}
                              

                            ></input>
                            <label htmlFor="movieImage" style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#BDBDBD', color: 'black', borderRadius: '5px', margin: '10px' }}>
                                Cover Image
                            </label>
                            <input
                                type="file"
                                id="movieImage"
                                name="movieImage"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleChange}
                            ></input>

                        </div>



                    </div>
                    <div className="d-flex flex-column flex-sm-row justify-content-evenly mt-2">
                        <div class="dropdown">
                           
                            <select
                                name='language'
                                value={movieDetails.language}
                                onChange={handleChange}
                                className='admin-add-movie-dropdown'
                            >
                                <option value="">Select Language</option>
                                <option value="Malayalam">Malayalam</option>
                                <option value="Tamil">Tamil</option>
                                <option value="Telugu">Telugu</option>
                            </select>
                        </div>
                       
                        <select
                                name='screenType'
                                value={movieDetails.screenType}
                                onChange={handleChange}
                                className='admin-add-movie-dropdown'
                            >
                                <option value="">Select Screen Type</option>
                                <option value="2D">2D</option>
                                <option value="3D">3D</option>
                                <option value="IMAX">IMAX</option>
                            </select>
                      
                    </div>
                    <div className='d-flex justify-content-evenly mt-3'>
                        <div className='d-flex'>
                            <input
                                type="date"
                                onChange={handleChange}

                                className='admin-add-movie-enddate'
                                placeholder="Start Date"
                                style={{
                                    backgroundColor: '#ADADAD',
                                }}
                            ></input>
                            <input
                                type="date"
                                onChange={handleChange}


                                placeholder="End Date"
                                className='admin-add-movie-startdate'
                                style={{

                                    backgroundColor: '#ADADAD',

                                }}></input>
                        </div>
                        <select
                                name='language'
                                value={movieDetails.type}
                                onChange={handleChange}
                                className='admin-add-movie-dropdown'
                            >
                                <option value="">Select Type</option>
                                <option value="Action">Action</option>
                            <option value="Drama">Drama</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Horror">Horror</option>
                            <option value="Romantic">Romantic</option>
                            <option value="Documentary">Documentary</option>
                         
                            </select>
                    </div>

                    <div className='d-flex justify-content-evenly mt-2'>
                        <input type='text' placeholder='Duration' className='admin-add-movie-duration' name="duration" onChange={handleChange}></input>
                        <label htmlFor="video" style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#BDBDBD', color: 'black', borderRadius: '5px', margin: '10px', width: '250px' }}>
                            Upload Trailer
                        </label>
                        <input
                            type="file"
                            className='admin-add-movie-trailer'
                            id="video"
                            name="trailer"
                            onChange={handleChange}
                            accept="video/*"
                            style={{ display: 'none' }}
                        ></input>
                    </div>
                    <div className='test' >
                        <textarea className='form-control admin-add-show-textarea' placeholder='Description'
                        name='description' onChange={handleChange}></textarea>
                    </div>

                </div>
                <div className="card admin-add-movie-card-two">
                    <p className='admin-add-movie-card-two'>Cast</p>
                    <div className='d-flex justify-content-evenly'>
                    <input type='text' placeholder='Cast Name' className='admin-add-movie-duration' name="name" onChange={handleCastChange}></input>

                    <input type='text' placeholder='Cast Role' className='admin-add-movie-duration' name="role" onChange={handleCastChange}></input>

                        <label htmlFor="movieImage" style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#BDBDBD', color: 'black', borderRadius: '5px', margin: '10px', fontWeight: 'normal' }}>
                             Image
                        </label>
                        <input
                            type="file"
                            id="movieImage"
                            name="image"
                            accept="image/*"
                            style={{
                                display: 'none'

                            }}
                            onChange={handleCastChange}

                        ></input>

                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-outline-danger admin-add-movie-addmorebutton'>ADD More</button>
                    </div>

                </div>
                <div>
                    <button className='btn btn-danger admin-add-movie-addbutton'>Add</button>
                </div>
            </div>
        </div>
    )
}

export default AdminAddMovie
