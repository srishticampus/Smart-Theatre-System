import React from 'react'
import "../../Assets/Styles/AdminEditFood.css"

function AdminEditFood() {
    return (
        <div className="container mt-5">
            <p className='admin-edit-food-head'>Edit Food</p>
            <div className="center-card d-flex justify-content-center">
                <div className="card  admin-edit-food-card">
                    <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center">
                            {/* <input
                                type="text"
                                className="form-control admin-edit-food-amountone"
                                placeholder="Snacks"
                                id="amount"
                                min="0"
                            /> */}
                            <input type='text' placeholder='Snacks' className='admin-edit-food-amountone'></input>


                            <div>
                                <button className="btn admin-edit-food-veg">
                                    <label htmlFor="checkbox" className="ms-2 me-3">Veg</label>
                                    <input type="checkbox" className="form-check-input" id="checkbox" />

                                </button>
                                <button className="btn admin-edit-food-nonveg">
                                    <label htmlFor="checkbox" className="ms-2 me-3">Non-Veg</label>
                                    <input type="checkbox" className="form-check-input" id="checkbox" />
                                </button>
                            </div>

                        </div>

                        <div className="d-flex justify-content-between mt-3">

                            <div>
                                <button className="btn admin-food-uploadimg" onClick={() => document.getElementById('fileUpload').click()}>
                                    Upload Image
                                </button>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    style={{ display: 'none' }}
                                />

                            </div>

                            <div>
                                <input
                                    type="text"
                                    className="form-control admin-edit-food-amount"
                                    placeholder="&#8377;100/-"
                                    id="amount"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <input type='text' placeholder='popcorn' className='admin-edit-food-field'></input>
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <button className='btn btn-outline-danger me-2'>Cancel</button>
                <button className='btn btn-danger'>Update</button>
            </div>
        </div>
    )
}

export default AdminEditFood
