import React, { useState, useEffect } from 'react'
import '../../Assets/Styles/StaffViewFood.css'
import { useNavigate } from 'react-router-dom';
import { viewCount } from '../../Services/AdminService';
import { toast } from "react-toastify";
import { IMG_BASE_URL } from '../../Services/BaseURL';

function StaffViewFood() {
    const [allData, setAllData] = useState([]); // Store all items fetched from the API
    const [data, setData] = useState([]); // Store filtered items to display
    const [selectedOption, setSelectedOption] = useState("All"); // Track selected category
    
    // Fetch all data initially
    const fetchData = async () => {
        try {
            const result = await viewCount('viewAllFood'); // Fetch all food items
            if (result.success) {
                setAllData(result.user || []); // Store all items
                setData(result.user || []); // Initially display all items
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('An unexpected error occurred during Data View');
        }
    };
    
    const filterData = (category) => {
        if (category === "All") {
            setData(allData); // Show all items if "All" is selected
        } else {
            const filteredItems = allData.filter(item => item.category === category); // Filter by category
            setData(filteredItems);
        }
    };
    
    // Handle category selection
    const handleOptionClick = (category) => {
        setSelectedOption(category); // Update the selected category
        filterData(category); // Apply filter
    };

   

    const id = localStorage.getItem('staff')
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();



    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div >
                <h1 className='staff-view-food-head mb-3 mt-5'>View Food Items </h1>
                <p className='staff-view-food-subhead mt-5'>Snacks & Beverages</p>
            </div>
            <div>
                <div className="staff-view-food-options d-flex justify-content-start">
                    <div
                        className={`staff-food-option ${selectedOption === 'All' ? 'selected' : ''}`}
                        onClick={() => handleOptionClick('All')}
                    >
                        All
                    </div>
                    <div
                        className={`staff-food-option ${selectedOption === 'Snacks' ? 'selected' : ''}`}
                        onClick={() => handleOptionClick('Snacks')}
                    >
                        Snacks
                    </div>
                    <div
                        className={`staff-food-option ${selectedOption === 'Beverages' ? 'selected' : ''}`}
                        onClick={() => handleOptionClick('Beverages')}
                    >
                        Beverages
                    </div>
                    <div
                        className={`staff-food-option ${selectedOption === 'Deserts' ? 'selected' : ''}`}
                        onClick={() => handleOptionClick('Deserts')}
                    >
                        Deserts
                    </div>
                    <div
                        className={`staff-food-option ${selectedOption === 'Puffs' ? 'selected' : ''}`}
                        onClick={() => handleOptionClick('Puffs')}
                    >
                        Puffs
                    </div>
                </div>
                {data.length > 0 ?
                    (
                        <div className='row'>
                            {data.map(item => {
                                return (

                                    <div className='col-md-3'>
                                        <div className="staff-view-food-item mt-5">
                                            <img src=
                                                {`${IMG_BASE_URL}/${item.image.filename}`}
                                                className="food-img"
                                                alt="Staff Profile"
                                            />
                                            <p className='food_item-data'>{item.foodItem}  </p>
                                            <p className='food_item-data-price'>₹  {item.amount} </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <h5>No Food Items Found</h5>
                    )}
            </div>
        </div>
    )
}

export default StaffViewFood