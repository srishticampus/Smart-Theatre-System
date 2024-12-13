import React, { useState } from 'react';
import "../../Assets/Styles/AdminParkingDetails.css";

function AdminParkingDetails() {
  const [selectedOption, setSelectedOption] = useState('1');
  const handleSelect = (event) => {
    setSelectedOption(event.target.innerText);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;  // Assuming you have 5 pages, adjust this based on your data

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='container'>
      <div className='d-flex justify-content-between mt-5'>
        <p className='admin-parking-details-head'>Parking Details</p>
        <div className="row justify-content-center">
          <div>
            <div className="input-group field-group">
              <input
                type="text"
                className="form-control search-input search-field"
                placeholder="Search here"
              />
              <i className="fas fa-search input-icon search-icon"></i>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex mt-5'>
        <p>12/11/2024 - 12:00 PM</p>
        <div className="input-group justify-content-end">
          <button className="btn dropdown-toggle admin-parking-details-dropbutton" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            12:00 PM
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">1:00 PM</a></li>
            <li><a className="dropdown-item" href="#">2:00 PM</a></li>
            <li><a className="dropdown-item" href="#">3:00 PM</a></li>
            <li><a className="dropdown-item" href="#">4:00 PM</a></li>
            <li><a className="dropdown-item" href="#">5:00 PM</a></li>
            <li><a className="dropdown-item" href="#">6:00 PM</a></li>
          </ul>
        </div>
      </div>
      <div className='mt-5'>
        <table className='table table-bordered'>
          <thead>
            <tr className='bg-danger table-head-column-size'>
              <th className='admin-parking-details-table-head'>S No</th>
              <th className='admin-parking-details-table-head'>Name</th>
              <th className='admin-parking-details-table-head'>Movie Name</th>
              <th className='admin-parking-details-table-head'>Ticket ID</th>
              <th className='admin-parking-details-table-head'>Seats</th>
              <th className='admin-parking-details-table-head'>Slot Booked</th>
              <th className='admin-parking-details-table-head'>Transaction ID</th>
              <th className='admin-parking-details-table-head'>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.</td>
              <td className='admin-parking-details-td'>
                <p className='admin-parking-details-p'>Prabin</p>
                <p className='parking-details-transacction-id-sub'>123456</p>
              </td>
              <td><p>Amaran</p></td>
              <td><p>ARG1100</p></td>
              <td className='admin-parking-details-td'>
                <p className='admin-parking-details-p'>A 11,12</p>
                <p className='parking-details-transacction-id-sub'>2 - Ticket</p>
              </td>
              <td><p>Car -A 24</p></td>
              <td><p>123456</p></td>
              <td><p>&#8377;360/-</p></td>
            </tr>
            <tr>
              <td>2.</td>
              <td className='admin-parking-details-td'>
                <p className='admin-parking-details-p'>Prabin</p>
                <p className='parking-details-transacction-id-sub'>123456</p>
              </td>
              <td><p>Amaran</p></td>
              <td><p>ARG1100</p></td>
              <td className='admin-parking-details-td'>
                <p className='admin-parking-details-p'>A 11,12</p>
                <p className='parking-details-transacction-id-sub'>2 - Ticket</p>
              </td>
              <td><p>Car -A 24</p></td>
              <td><p>123456</p></td>
              <td><p>&#8377;360/-</p></td>
            </tr>
            <tr>
              <td>3.</td>
              <td className='admin-parking-details-td'>
                <p className='admin-parking-details-p'>Prabin</p>
                <p className='parking-details-transacction-id-sub'>123456</p>
              </td>
              <td><p>Amaran</p></td>
              <td><p>ARG1100</p></td>
              <td className='admin-parking-details-td'>
                <p className='admin-parking-details-p'>A 11,12</p>
                <p className='parking-details-transacction-id-sub'>2 - Ticket</p>
              </td>
              <td><p>Car -A 24</p></td>
              <td><p>123456</p></td>
              <td><p>&#8377;360/-</p></td>
            </tr>
            <tr>
              <td>4.</td>
              <td className='admin-parking-details-td'>
                <p className='admin-parking-details-p'>Prabin</p>
                <p className='parking-details-transacction-id-sub'>123456</p>
              </td>
              <td><p>Amaran</p></td>
              <td><p>ARG1100</p></td>
              <td className='admin-parking-details-td'>
                <p className='admin-parking-details-p'>A 11,12</p>
                <p className='parking-details-transacction-id-sub'>2 - Ticket</p>
              </td>
              <td><p>Car -A 24</p></td>
              <td><p>123456</p></td>
              <td><p>&#8377;360/-</p></td>
            </tr>
            {/* Add more rows as required */}
          </tbody>
        </table>
      </div>

      {/* Per page and Pagination Section */}
      <div className='d-flex mt-4 align-items-center'>
        <p>Show </p>
        <div className="dropdown ms-3">
          <button
            type="button"
            className="btn btn-danger dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            {selectedOption}
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#" onClick={handleSelect}>1</a></li>
            <li><a className="dropdown-item" href="#" onClick={handleSelect}>2</a></li>
            <li><a className="dropdown-item" href="#" onClick={handleSelect}>3</a></li>
          </ul>
        </div>
        <p className='ms-3'>Per Page</p>

        {/* Pagination with custom arrows */}
        <nav aria-label="Page navigation" className="ms-auto">
          <ul className="pagination">
            {/* Previous Arrow */}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link custom-pagination-btn" onClick={() => handlePageChange(currentPage - 1)}>
                <i className="fas fa-chevron-left"></i>
              </button>
            </li>

            {/* Page Numbers */}
            {[...Array(totalPages).keys()].map((page) => (
              <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                <button className="page-link custom-pagination-btn" onClick={() => handlePageChange(page + 1)}>
                  {page + 1}
                </button>
              </li>
            ))}

            {/* Next Arrow */}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link custom-pagination-btn" onClick={() => handlePageChange(currentPage + 1)}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AdminParkingDetails;
