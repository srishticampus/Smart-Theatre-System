import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { IMG_BASE_URL } from '../../Services/BaseURL';
import "../../Assets/Styles/AdminEditFood.css";
import { resetPassword, updateWithFile, ViewById } from "../../Services/CommonServices";

function AdminEditFood() {
    const { id } = useParams(); // Get food item ID from URL
    const navigate = useNavigate();
    
    const [data, setData] = useState({
        amount: 0,
        foodItem: '',
        category: '',
        type: '',
        image: {
            filename: ''
        }
    });

    // Fetch food data by ID
    const fetchData = async () => {
        try {
            const result = await ViewById('viewFoodById', id);
            if (result.success) {
                
                setData(result.user); // Set the food data
            } else {
                toast.error(result.message);
                navigate('/admin-view-food'); // Redirect if food not found
            }
        } catch (error) {
            toast.error('Error fetching food data');
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data on component mount
    }, [id]);

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData({
            ...data,
            image: file, // Update the image state with the selected file
        });
    };

    // Handle food update
    const handleUpdate = async () => {
        try {
            const result = await updateWithFile( data,'editFoodById', id);
            if (result.success) {
                toast.success('Food updated successfully!');
                navigate('/admin-view-food'); // Redirect after successful update
            } else {
                toast.warn('Update failed');
            }
        } catch (error) {
            toast.error('An error occurred while updating food');
        }
    };

    return (
        <div className="container mt-5">
            <p className="admin-edit-food-head">Edit Food</p>
            <div className="d-flex justify-content-center">
                <div className="card admin-edit-food-card">
                    <div className="card-body">

                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <input
                                type="text"
                                name="foodItem"
                                value={data.foodItem}
                                onChange={handleChange}
                                className="admin-edit-food-amountone"
                                placeholder="Food Item"
                            />
                            <div className="d-flex justify-content-between align-items-center mt-3 mt-md-0">
                                <button className="btn admin-edit-food-veg">
                                    <label htmlFor="vegCheckbox" className="ms-2 me-3">Veg</label>
                                    <input
                                        type="checkbox"
                                        id="vegCheckbox"
                                        checked={data.type === 'Veg'}
                                        onChange={() => setData({ ...data, type: 'Veg' })}
                                        className="form-check-input"
                                    />
                                </button>
                                <button className="btn admin-edit-food-nonveg">
                                    <label htmlFor="nonVegCheckbox" className="ms-2 me-3">Non-Veg</label>
                                    <input
                                        type="checkbox"
                                        id="nonVegCheckbox"
                                        checked={data.type === 'Non-Veg'}
                                        onChange={() => setData({ ...data, type: 'Non-Veg' })}
                                        className="form-check-input"
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-md-row justify-content-between mt-3">
                            <div className="mb-3 mb-md-0">
                                <button className="btn admin-food-uploadimg" onClick={() => document.getElementById('fileUpload').click()}>
                                    Upload Image
                                </button>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                               
                            </div>

                            <div className="mb-3 mb-md-0">
                                <input
                                    type="number"
                                    name="amount"
                                    value={data.amount}
                                    onChange={handleChange}
                                    className="form-control admin-edit-food-amount"
                                    placeholder="₹100"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <input
                    type="text"
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="admin-edit-food-field"
                />
            </div>

            <div className="d-flex justify-content-center mt-5">
                <button className="btn btn-outline-danger me-2" onClick={() => navigate('/admin-view-food')}>
                    Cancel
                </button>
                <button className="btn btn-danger" onClick={handleUpdate}>
                    Update
                </button>
            </div>
        </div>
    );
}

export default AdminEditFood;
