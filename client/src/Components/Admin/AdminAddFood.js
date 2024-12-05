
import "../../Assets/Styles/AdminAddFood.css"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

function AdminAddFood() {

    return (
        <div className="container mt-5">
            <p className='admin-add-food-head'>Add Food</p>
            <div className="center-card d-flex justify-content-center">
            <div className="card  admin-add-food-card">
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center">

                        <div className="dropdown">
                            <button className="btn  dropdown-toggle admin-add-food-category" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                Choose Category
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else</a></li>
                            </ul>
                        </div>

                        <div>
                            <button className="btn admin-add-food-veg">
                            <label htmlFor="checkbox" className="ms-2 me-3">Veg</label>
                                <input type="checkbox" className="form-check-input" id="checkbox"  />
                               
                            </button>
                            <button className="btn admin-add-food-nonveg">
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
                                className="form-control admin-add-food-amount"
                                placeholder="Enter Amount"
                                id="amount"
                                min="0"
                               
                               
                            />
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className='d-flex justify-content-center'>
                <input type='text' placeholder='Enter Food Items' className='admin-add-food-field'></input>
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <button className='btn btn-danger'>Add</button>
            </div>
        </div>
    );
}

export default AdminAddFood;
