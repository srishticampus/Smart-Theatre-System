import "../../Assets/Styles/AdminViewFood.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { viewCount, approveById } from '../../Services/AdminService';
import { IMG_BASE_URL } from '../../Services/BaseURL';
import { ViewById } from "../../Services/CommonServices";

function AdminViewFood() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [filteredData, setFilteredData] = useState([]); // State for filtered food data

    const fetchData = async () => {
        try {
            const result = await viewCount('viewAllFood');
            if (result.success) {
                console.log(result);
                if (result.user.length > 0) {
                    setData(result.user);
                    setFilteredData(result.user); // Initially display all food items
                } else {
                    setData([]);
                    setFilteredData([]);
                }
            } else {
                console.error('Data error:', result);
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred during Data View');
        }
    };

    useEffect(() => {
        fetchData(); // Call the async function
    }, []);

    // Function to handle search
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query) {
            // Filter the data based on the search query
            const filteredItems = data.filter(item =>
                item.foodItem.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query)
            );
            setFilteredData(filteredItems);
        } else {
            // If the search is empty, show all items
            setFilteredData(data);
        }
    };

    const navigate = useNavigate();

    const editFood = (id) => {
        navigate(`/admin-edit-food/${id}`);
    };
    const delFood =async (id) => {
        try {
            const result = await ViewById('deleteFoodById',id);
            if (result.success) {
                console.log(result);
                if (result.user) {
                    fetchData()
                   toast.success('Removed Succesfully !')
                } else {
                   toast.warn('Removal Failed')
                }
            } else {
                console.error('Data error:', result);
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred during Data View');
        }
    };

    return (
        <div>
            <div className='d-flex justify-content-between mt-5'>
                <p className='admin-view-food-head'>Food List</p>
                <div className="search-container">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search by food name or category"
                        value={searchQuery}
                        onChange={handleSearch} // Call handleSearch when input changes
                    />
                    <i className="fas fa-search search-icon"></i>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className='admin-view-food-table'>
                        {filteredData.length > 0 ? (
                            <table className='table admin-view-food-table table-responsive admin-view-food-table table-bordered'>
                                <thead>
                                    <tr className='bg-danger text-white'>
                                        <th>Sl No:</th>
                                        <th>Image</th>
                                        <th>Food Name</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Edit & Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{index + 1}</td>
                                            <td><img src={`${IMG_BASE_URL}/${user.image.filename}`} className="admin-view-food-img" alt={user.foodItem} /></td>
                                            <td>{user.foodItem}</td>
                                            <td>{user.category}</td>
                                            <td>{user.amount}</td>
                                            <td>
                                                <span><i className="fa-regular fa-pen-to-square" style={{ color: '#e90c0c' }} onClick={() => editFood(user._id)}></i></span>
                                                <span><i className="fa-solid fa-trash" style={{ color: '#e70d0d' }} onClick={() => delFood(user._id)}></i></span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="no_data_found">
                                <p>No Food Items Found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminViewFood;
