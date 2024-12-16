import React from 'react'
import "../../Assets/Styles/AdminViewFood.css"
import popcorn from "../../Assets/Images/popcorn.png"
import pepsi from "../../Assets/Images/pepsi.png"
import Sandwich from "../../Assets/Images/sandwich.png"
import puffs from "../../Assets/Images/puffs.png"





function AdminViewFood() {
    return (
        <div>
            <div className='d-flex justify-content-between mt-5'>
                <p className='admin-view-food-head'>Food List</p>
                <div className="search-container">
                    <input type="text" className="form-control search-input" placeholder="Search here" />
                    <i className="fas fa-search search-icon"></i>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className='admin-view-food-table'>
                        <table className='table admin-view-food-table table-responsive admin-view-food-table table-bordered'>
                            <thead>
                                <tr className='bg-danger text-white'>
                                    <th>SI No:</th>
                                    <th>Image</th>
                                    <th>Food Name</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Edit & Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><img src={popcorn}/></td>
                                    <td>Popcorn</td>
                                    <td>Snacks</td>
                                    <td>100</td>
                                    <td>
                                       
                                        <span><i className="fa-regular fa-pen-to-square" style={{ color: '#e90c0c' }}></i></span>
                                        <span><i className="fa-solid fa-trash" style={{ color: '#e70d0d' }}></i></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td><img src={pepsi}/></td>
                                    <td>Pepsi</td>
                                    <td>beverages</td>
                                    <td>100</td>
                                    <td>
                                       
                                        <span><i className="fa-regular fa-pen-to-square" style={{ color: '#e90c0c' }}></i></span>
                                        <span><i className="fa-solid fa-trash" style={{ color: '#e70d0d' }}></i></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td><img src={Sandwich}/></td>
                                    <td>Sandwich</td>
                                    <td>Snacks</td>
                                    <td>100</td>
                                    <td>
                                        <span><i className="fa-regular fa-pen-to-square" style={{ color: '#e90c0c' }}></i></span>
                                        <span><i className="fa-solid fa-trash" style={{ color: '#e70d0d' }}></i></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td><img src={puffs}/></td>
                                    <td>Puffs</td>
                                    <td>Snacks</td>
                                    <td>100</td>
                                    <td>
                                        <span><i className="fa-regular fa-pen-to-square" style={{ color: '#e90c0c' }}></i></span>
                                        <span><i className="fa-solid fa-trash" style={{ color: '#e70d0d' }}></i></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminViewFood
