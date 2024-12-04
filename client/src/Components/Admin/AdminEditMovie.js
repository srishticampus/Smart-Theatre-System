import React from 'react'
import "../../Assets/Styles/AdminEditMovie.css"
function AdminEditMovie() {
  return (
    <div>
      <p className='admin-edit-movie-head'>Edit Movie</p>
      <div className='cneter-edit-movie-card'>
        <div className="card admin-edit-movie-card">
          <div className='d-flex justify-content-evenly '>
            <input type='text' placeholder='Movie Name' style={{ height: '40px' }} className='admin-edit-movie-moviename' ></input>
            <div>
              <label htmlFor="movieImage" style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#BDBDBD', color: 'black', borderRadius: '5px', margin: '10px' }}>
                Movie Image
              </label>
              <input
                type="file"
                id="movieImage"
                name="movieImage"
                accept="image/*"
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

              ></input>

            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-evenly mt-3">
            <div class="dropdown">
              <button type="button" class="btn dropdown-toggle admin-edit-movie-dropdown" data-bs-toggle="dropdown">
                Language
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Malayalam</a></li>
                <li><a class="dropdown-item" href="#">Tamil</a></li>
                <li><a class="dropdown-item" href="#">Telugu</a></li>
              </ul>
            </div>
            <div class="dropdown">
              <button type="button" class="btn dropdown-toggle admin-edit-movie-dropdown-screen" data-bs-toggle="dropdown">
                Screen Type
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">null</a></li>
                <li><a class="dropdown-item" href="#">null</a></li>
                <li><a class="dropdown-item" href="#">null</a></li>
              </ul>
            </div>
          </div>
          <div className='d-flex justify-content-evenly mt-3'>
            <div className='d-flex'>
              <input
                type="date"

                className='admin-edit-movie-enddate'
                placeholder="Start Date"
                style={{
                  backgroundColor: '#ADADAD',
                }}
              ></input>
              <input
                type="date"


                placeholder="End Date"
                className='admin-edit-movie-startdate'
                style={{

                  backgroundColor: '#ADADAD',

                }}></input>
            </div>
            <div class="dropdown">
              <button type="button" class="btn dropdown-toggle admin-edit-movie-dropdown-movie" data-bs-toggle="dropdown">
                Movie Type
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">null</a></li>
                <li><a class="dropdown-item" href="#">null</a></li>
                <li><a class="dropdown-item" href="#">null</a></li>
              </ul>
            </div>
          </div>

          <div className='d-flex justify-content-evenly mt-3'>
            <input type='text' placeholder='Duration' className='admin-edit-movie-duration'></input>
            <label htmlFor="video" style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#BDBDBD', color: 'black', borderRadius: '5px', margin: '10px', width: '250px' }}>
              Upload Trailer
            </label>
            <input
              type="file"
              className='admin-edit-movie-trailer'
              id="video"
              name="movieImage"
              accept="video/*"
              style={{ display: 'none' }}
            ></input>
          </div>
          <div className='test' >
            <textarea className='form-control admin-edit-show-textarea' placeholder='Description'></textarea>
          </div>

        </div>
        <div className="card admin-edit-movie-card-two">
          <p className='admin-edit-movie-card-two'>Cast</p>
          <div className='d-flex justify-content-evenly'>
            <div class="dropdown">
              <button type="button" class="btn  dropdown-toggle admin-edit-movie-dropdown-cast" data-bs-toggle="dropdown">
                Cast Name
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">name 1</a></li>
                <li><a class="dropdown-item" href="#">name 2</a></li>
                <li><a class="dropdown-item" href="#">name 3</a></li>
              </ul>
            </div>
            <div class="dropdown">
              <button type="button" class="btn  dropdown-toggle admin-edit-movie-dropdown-role" data-bs-toggle="dropdown">
                Role
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Role 1</a></li>
                <li><a class="dropdown-item" href="#">Role 2</a></li>
                <li><a class="dropdown-item" href="#">Role 3</a></li>
              </ul>
            </div>
            <label htmlFor="movieImage" style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#BDBDBD', color: 'black', borderRadius: '5px', margin: '10px', fontWeight: 'normal' }}>
              Upload Cast Image
            </label>
            <input
              type="file"
              id="movieImage"
              name="movieImage"
              accept="image/*"
              style={{
                display: 'none'

              }}

            ></input>

          </div>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-outline-danger admin-edit-movie-editmorebutton'>Add More</button>
          </div>

        </div>
        <div>
          <button className='btn btn-outline-danger admin-edit-movie-editbutton me-3'>Cancel</button>
          <button className='btn btn-danger admin-edit-movie-editbutton'>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default AdminEditMovie
