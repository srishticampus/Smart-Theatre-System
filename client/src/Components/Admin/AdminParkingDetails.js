import React from 'react';
import "../../Assets/Styles/AdminParkingDetails.css"; // Custom CSS

function AdminParkingDetails() {
    return (
        <div>
            <div className='d-flex justify-content-between'>
                <p>Parking Details</p>
                <div className="row justify-content-center">
                    <div>
                        <div className="input-group  field-group">
                            <input type="text" className="form-control search-input search-field" placeholder="Search here" />
                            <i className="fas fa-search input-icon  search-icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminParkingDetails;
