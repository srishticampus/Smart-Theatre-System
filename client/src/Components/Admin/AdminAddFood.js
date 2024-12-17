import "../../Assets/Styles/AdminAddFood.css"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { registerWithFile } from '../../Services/CommonServices';

function AdminAddFood() {
    const [data, setData] = useState({
        category: '',
        foodItem: '',
        type: '',
        amount: '',
        image: null, // Store image as null initially
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value,
        });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData({
            ...data,
            image: file, // Update the image state with the selected file
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!data.amount) {
            newErrors.amount = 'Amount is required';
        }
        if (!data.category) {
            newErrors.category = 'Category is required';
        }
        if (!data.foodItem) {
            newErrors.foodItem = 'Food item is required';
        }
        if (!data.type) {
            newErrors.type = 'Food type (Veg/Non-Veg) is required';
        }
        if (!data.image) {
            newErrors.image = 'Image is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error('Please fix the errors in the form.');
            return;
        }
console.log("data",data);

        try {
            const result = await registerWithFile(data, 'addFood');
            if (result.success) {
                toast.success('Food Added successfully!');
                navigate('/admin-view-food');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('An unexpected error occurred during registration');
        }
    };

    return (
        <div className="container mt-5">
            <p className='admin-add-food-head'>Add Food</p>
            <div className="center-card d-flex justify-content-center">
                <div className="card admin-add-food-card">
                    <div className="card-body">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-6">
                                <select className='form-control p-2 admin-add-food-category' name='category' onChange={handleChange} value={data.category}>
                                    <option value="">Select Food Type</option>
                                    <option value="Snacks">Snacks</option>
                                    <option value="Puffs">Puffs</option> 
                                    <option value="Deserts">Deserts</option>
                                    <option value="Beverages">Beverages</option>
                                </select>
                                {errors.category && <span className="text-danger">{errors.category}</span>}
                            </div>

                            <div className="col-6">
                                <button className="btn admin-add-food-veg">
                                    <label htmlFor="vegCheckbox" className="ms-2 me-3" name="type">Veg</label>
                                    <input type="checkbox" className="form-check-input" name="type" id="vegCheckbox" checked={data.type === 'Veg'} onChange={() => setData({...data, type: 'Veg'})} />
                                
                                </button>
                                <button className="btn admin-add-food-nonveg">
                                    <label htmlFor="nonVegCheckbox" className="ms-2 me-3" name="type">Non-Veg</label>
                                    <input type="checkbox" className="form-check-input" id="nonVegCheckbox" checked={data.type === 'Non-Veg'} onChange={() => setData({...data, type: 'Non-Veg'})} />
                                </button>
                            </div>
                        </div>

                        <div className="row justify-content-between mt-3">
                            <div className="col-6">
                                <button className="btn admin-food-uploadimg" onClick={() => document.getElementById('fileUpload').click()}>
                                    Upload Image
                                </button>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    style={{ display: 'none' }}
                                    name="image"
                                    onChange={handleImageChange}
                                />
                                {errors.image && <span className="text-danger">{errors.image}</span>}
                            </div>

                            <div className="col-6">
                                <input
                                    type="number"
                                    className="form-control admin-add-food-amount"
                                    placeholder="Enter Amount"
                                    id="amount"
                                    name="amount"
                                    value={data.amount}
                                    onChange={handleChange}
                                />
                                {errors.amount && <span className="text-danger">{errors.amount}</span>}
                            </div>
                        </div>

                        <div className='row justify-content-between'>
                        <div className="col-3"></div>
                            <div className="col-9">
                <input
                    type='text'
                    name='foodItem'
                    placeholder='Enter Food Item'
                    className='admin-add-food-field'
                    value={data.foodItem}
                    onChange={handleChange}
                />
                {errors.foodItem && <span className="text-danger">{errors.foodItem}</span>}
            </div>
            </div>
                    </div>
                </div>
            </div>

           

            <div className='d-flex justify-content-center mt-5'>
                <button className='btn btn-danger' onClick={handleSubmit}>Add</button>
            </div>
        </div>
    );
}

export default AdminAddFood;
