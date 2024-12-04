import React from 'react';
import "../../Assets/Styles/AdminViewMovie.css";
import film2 from "../../Assets/Images/film2.png";
import film3 from "../../Assets/Images/film3.png";
import film4 from "../../Assets/Images/film4.png";
import film5 from "../../Assets/Images/film5.png";
import film6 from "../../Assets/Images/film6.png";
import film7 from "../../Assets/Images/film7.png";
import film8 from "../../Assets/Images/film8.png";
import film9 from "../../Assets/Images/film9.png";
import film10 from "../../Assets/Images/film10.png";

function AdminViewMovie() {
    return (
        <div>
            <div className='d-flex justify-content-between mt-3'>
                <p className='admin-view-movie-head'>Movie List</p>
                <div className="search-container">
                    <input type="text" className="form-control search-input" placeholder="Search here" />
                    <i className="fas fa-search search-icon"></i>
                </div>
            </div>
            <div className='movie-cards-container'>
                <div className="row justify-content-center view-details-rows">
                    <div className="card col-sm-2 admin-view-card">
                        <img src={film2} alt='film2' />
                        <div className="admin-view-card-footer">
                            <p className='admin-view-card-footer-head'>Demonte Colony 2</p>
                            <p className='admin-view-card-footer-description'>Horror, Comedy</p>
                            <p className='admin-view-card-footer-duration'>2hr 26min</p>
                        </div>
                    </div>
                    <div className="card col-sm-2 admin-view-card">
                        <img src={film7} alt='film7' />
                        <div className="admin-view-card-footer">
                            <p className='admin-view-card-footer-head'>Kishkindha Kaandam</p>
                            <p className='admin-view-card-footer-description'>Drama</p>
                            <p className='admin-view-card-footer-duration'>2hr 16min</p>
                        </div>
                    </div>
                    <div className="card col-sm-2 admin-view-card">
                        <img src={film6} alt='film6' />
                        <div className="admin-view-card-footer">
                            <p className='admin-view-card-footer-head'>Poovan</p>
                            <p className='admin-view-card-footer-description'>Comedy, Drama</p>
                            <p className='admin-view-card-footer-duration'>2hr 18min</p>
                        </div>
                    </div>
                    <div className="card col-sm-2 admin-view-card">
                        <img src={film4} alt='film4' />
                        <div className="admin-view-card-footer">
                            <p className='admin-view-card-footer-head'>Pranaya Vilasam</p>
                            <p className='admin-view-card-footer-description'>Comedy, Romance</p>
                            <p className='admin-view-card-footer-duration'>2hr 3min</p>
                        </div>
                    </div>
                    <div className="card col-sm-2 admin-view-card">
                        <img src={film3} alt='film3' />
                        <div className="admin-view-card-footer">
                            <p className='admin-view-card-footer-head'>Ini Utharam</p>
                            <p className='admin-view-card-footer-description'>Thriller</p>
                            <p className='admin-view-card-footer-duration'>2hr 6min</p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center view-details-rows">
                    <div className="card col-sm-2 admin-view-card">
                        <img src={film9} alt='film9' />
                        <div className="admin-view-card-footer">
                            <p className='admin-view-card-footer-head'>Vashangalku Shesham</p>
                            <p className='admin-view-card-footer-description'>Comedy, Romance</p>
                            <p className='admin-view-card-footer-duration'>2hr 3min</p>
                        </div>
                    </div>
                    <div className="card col-sm-2 admin-view-card">
                        <img src={film4} alt='film4' />
                        <div className="admin-view-card-footer">
                            <p className='admin-view-card-footer-head'>Pranaya Vilasam</p>
                            <p className='admin-view-card-footer-description'>Drama</p>
                            <p className='admin-view-card-footer-duration'>2hr 47min</p>
                        </div>
                    </div>
                    <div className="card col-sm-2 admin-view-card">
                        <img src={film8} alt='film8' />
                        <div className="admin-view-card-footer">
                            <p className='admin-view-card-footer-head'>A.R.M</p>
                            <p className='admin-view-card-footer-description'>Comedy, Romance</p>
                            <p className='admin-view-card-footer-duration'>2hr 30min</p>
                        </div>
                    </div>
                    <div className="card col-sm-2 admin-view-card">
                        <img src={film7} alt='film7' />
                        <div className="admin-view-card-footer">
                            <p className='admin-view-card-footer-head'>Kishkindha Kaandam</p>
                            <p className='admin-view-card-footer-description'>Drama</p>
                            <p className='admin-view-card-footer-duration'>2hr 16min</p>
                        </div>
                    </div>
                    <div className="card col-sm-2 admin-view-card">
                        <img src={film10} alt='film10' />
                        <div className="admin-view-card-footer">
                            <p className='admin-view-card-footer-head'>Bougainvillea</p>
                            <p className='admin-view-card-footer-description'>Adventure</p>
                            <p className='admin-view-card-footer-duration'>2hr 16min</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminViewMovie;
