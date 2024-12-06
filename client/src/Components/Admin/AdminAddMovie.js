import React, { useState } from 'react';
import "../../Assets/Styles/AdminAddMovie.css";

function AdminAddMovie() {
    // State to manage multiple casts
    const [casts, setCasts] = useState([{ castName: "", role: "", castImage: null }]);

    // Function to handle the addition of a new cast
    const handleAddCast = () => {
        setCasts([...casts, { castName: "", role: "", castImage: null }]);
    };

    // Function to handle changes in cast fields
    const handleCastChange = (index, field, value) => {
        const updatedCasts = [...casts];
        updatedCasts[index][field] = value;
        setCasts(updatedCasts);
    };

    return (
        <div>
            <p className='admin-add-movie-head'>Add Movie</p>
            <div className='cneter-add-movie-card'>
                <div className="card admin-add-movie-card">
                    <div className='d-flex justify-content-evenly'>
                        <input type='text' placeholder='Movie Name' style={{ height: '40px' }} className='admin-add-movie-moviename' ></input>
                        <div>
                            <label htmlFor="movieImage" style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#BDBDBD', color: 'black', borderRadius: '5px', margin: '10px' }}>
                                Movie Image
                            </label>
                            <input type="file" id="movieImage" name="movieImage" accept="image/*" style={{ display: 'none' }}></input>
                            <label htmlFor="movieImage" style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#BDBDBD', color: 'black', borderRadius: '5px', margin: '10px' }}>
                                Cover Image
                            </label>
                            <input type="file" id="movieImage" name="movieImage" accept="image/*" style={{ display: 'none' }}></input>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-sm-row justify-content-evenly mt-2">
                        <div className="dropdown">
                            <button type="button" className="btn dropdown-toggle admin-add-movie-dropdown" data-bs-toggle="dropdown">
                                Language
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Malayalam</a></li>
                                <li><a className="dropdown-item" href="#">Tamil</a></li>
                                <li><a className="dropdown-item" href="#">Telugu</a></li>
                            </ul>
                        </div>
                        <div className="dropdown">
                            <button type="button" className="btn dropdown-toggle admin-add-movie-dropdown-screen" data-bs-toggle="dropdown">
                                Screen Type
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">null</a></li>
                                <li><a className="dropdown-item" href="#">null</a></li>
                                <li><a className="dropdown-item" href="#">null</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className='d-flex justify-content-evenly mt-3'>
                        <div className='d-flex'>
                            <input type="text" className="admin-add-movie-startdate" placeholder="Start Date" style={{ backgroundColor: '#ADADAD', padding: '10px', border: 'none', borderRadius: '4px', color: '#666', width: '159px', cursor: 'pointer' }} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }} />
                            <input type="text" className="admin-add-movie-startdate" placeholder="End Date" style={{ backgroundColor: '#ADADAD', padding: '10px', border: 'none', borderRadius: '4px', color: '#666', width: '159px', cursor: 'pointer' }} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }} />
                        </div>
                        <div className="dropdown">
                            <button type="button" className="btn dropdown-toggle admin-add-movie-dropdown-movie" data-bs-toggle="dropdown">
                                Movie Type
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">null</a></li>
                                <li><a className="dropdown-item" href="#">null</a></li>
                                <li><a className="dropdown-item" href="#">null</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className='d-flex justify-content-evenly mt-2'>
                        <input type='text' placeholder='Duration' className='admin-add-movie-duration'></input>
                        <label htmlFor="video" style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#BDBDBD', color: 'black', borderRadius: '5px', margin: '10px', width: '250px' }}>
                            Upload Trailer
                        </label>
                        <input type="file" className='admin-add-movie-trailer' id="video" name="movieImage" accept="video/*" style={{ display: 'none' }}></input>
                    </div>
                    <div className='test'>
                        <textarea className='form-control admin-add-show-textarea' placeholder='Description'></textarea>
                    </div>

                </div>

                <div className="card admin-add-movie-card-two">
                    <p className='admin-add-movie-card-two'>Cast</p>

                    {/* Loop through the casts array to dynamically render cast fields */}
                    {casts.map((cast, index) => (
                        <div key={index} className='d-flex justify-content-evenly'>
                            <div className="dropdown">
                                <button type="button" className="btn dropdown-toggle admin-add-movie-dropdown-cast" data-bs-toggle="dropdown">
                                    {cast.castName || "Cast Name"}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={() => handleCastChange(index, 'castName', 'name 1')}>name 1</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleCastChange(index, 'castName', 'name 2')}>name 2</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleCastChange(index, 'castName', 'name 3')}>name 3</a></li>
                                </ul>
                            </div>

                            <div className="dropdown">
                                <button type="button" className="btn dropdown-toggle admin-add-movie-dropdown-role" data-bs-toggle="dropdown">
                                    {cast.role || "Role"}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={() => handleCastChange(index, 'role', 'Role 1')}>Role 1</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleCastChange(index, 'role', 'Role 2')}>Role 2</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleCastChange(index, 'role', 'Role 3')}>Role 3</a></li>
                                </ul>
                            </div>

                            <label htmlFor={`castImage-${index}`} style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#BDBDBD', color: 'black', borderRadius: '5px', margin: '10px', fontWeight: 'normal' }}>
                                Upload Cast Image
                            </label>
                            <input type="file" id={`castImage-${index}`} name={`castImage-${index}`} accept="image/*" style={{ display: 'none' }} onChange={(e) => handleCastChange(index, 'castImage', e.target.files[0])} />
                        </div>
                    ))}

                    
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-outline-danger admin-add-movie-addmorebutton' onClick={handleAddCast}>ADD More</button>
                    </div>
                </div>

                <div>
                    <button className='btn btn-danger admin-add-movie-addbutton'>Add</button>
                </div>
            </div>
        </div>
    );
}

export default AdminAddMovie;
