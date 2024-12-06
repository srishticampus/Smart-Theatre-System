import React from 'react';
import "../../Assets/Styles/AdminViewDetails.css";
import frame from "../../Assets/Images/MovieDetailsFrame.png";
import demonte from "../../Assets/Images/demonte.png";
import priya from "../../Assets/Images/priya.png";
import arulnithi from "../../Assets/Images/arulnithi.png";
import meenu from "../../Assets/Images/meenu.png";
import kanguva from "../../Assets/Images/kanguva 2.avif";

function AdminViewDetailsMovie() {
    return (
        <div>
            <p className='admin-view-details-head'>Movie Details</p>
            <div className='admin-view-details-background'>
                {/* Add img tag for background */}
                <img src={kanguva} alt='kanguva-background' className="background-img"/>
                <div className="row">
                    <div className="card col-sm-2 admin-details-card">
                        <img src={demonte} alt='demonte' />
                    </div>
                </div>
                <div className=' admin-details-movie-data'>
                    <p className='movie-head'>Demonte Colony 2</p>
                    <div className='d-flex'>
                        <p className='movie-details-2d-3d'>2D&nbsp;&nbsp;,&nbsp;3D</p>
                        <p className='movie-details-tamil'>Tamil&nbsp;&nbsp;,&nbsp;Telugu</p>
                    </div>
                    <p className='movie-details-genre'>Horror,Comedy</p>
                    <p className='movie-details-time'>2hr 26min</p>
                </div>
                <div className='ms-auto'>
                    <button className='btn btn-outline-light '>Cancel</button>
                    <button className='btn btn-danger ms-3'>Edit Movie</button>
                </div>
            </div>
            <div className='mt-5'>
                <p className='movie-details-description'>Movie Description</p>
                <p className='movie-details-para'> A horror-thriller film about a group of friends who return to a cursed location to uncover the truth behind the malevolent spirits that reside there.</p>
            </div>

            <div className="row">
                <p className='movie-details-cast'>Cast</p>
                <div className="col-sm-2 d-flex flex-column align-items-center">
                    <img src={priya} alt="priya" style={{ maxWidth: '100%', height: 'auto' }} />
                    <p className='cast-name'>Priya Bhavani</p>
                    <p className='cast-designation'>Actress</p>
                </div>
                <div className="col-sm-2 d-flex flex-column align-items-center">
                    <img src={arulnithi} alt="arulnithi" style={{ maxWidth: '100%', height: 'auto' }} />
                    <p className='cast-name'>Arulnithi</p>
                    <p className='cast-designation'>Actor</p>
                </div>
                <div className="col-sm-2 d-flex flex-column align-items-center">
                    <img src={meenu} alt="meenu" style={{ maxWidth: '100%', height: 'auto' }} />
                    <p className='cast-name'>Meenakshi Govindarajan</p>
                    <p className='cast-designation'>Actress</p>
                </div>
            </div>
        </div>
    );
}

export default AdminViewDetailsMovie;
