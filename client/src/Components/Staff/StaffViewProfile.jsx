import React, { useState, useEffect } from 'react';
import img from "../../Assets/Images/admin.jpg";
import { toast } from "react-toastify";
import '../../Assets/Styles/AdminAddStaff.css';
import { useNavigate, useParams } from 'react-router-dom';
import { registerWithFile, updateWithFile, ViewById } from '../../Services/CommonServices';
import { IMG_BASE_URL } from '../../Services/BaseURL';
function StaffViewProfile() {

    const [data, setData] = useState({
        profilePic: { filename: '' },
        profilePicPreview: '' // New field to store preview URL
      });
      
      const id=localStorage.getItem('staff')
      const [errors, setErrors] = useState({});
      const navigate = useNavigate();
    
      const fetchData = async () => {
        try {
          const result = await ViewById('viewStaffById', id);
          if (result.success) {
            setData({
              ...result.user,
              profilePicPreview: result.user.profilePic ? `${IMG_BASE_URL}/${result.user.profilePic.filename}` : '' // Set initial preview
            });
          } else {
            toast.error(result.message);
          }
        } catch (error) {
          toast.error('An unexpected error occurred during Data View');
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setData((prevData) => ({
            ...prevData,
            profilePic: file,
            profilePicPreview: URL.createObjectURL(file) // Set preview URL
          }));
        }
      };
    
      const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        const phoneRegex = /^\d{10}$/;
    
        // Validation logic...
        // Set errors based on validation...
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) {
          toast.error('Please fix the errors in the form.');
          return;
        }
        try {
          const result = await updateWithFile(data, 'editStaffById', id);
          if (result.success) {
            toast.success('Registration successful!');
            navigate('/admin-view-staff');
          } else {
            toast.error(result.message);
          }
        } catch (error) {
          toast.error('An unexpected error occurred during Registration');
        }
      };
    
  return (
    <div>
        <div className='staff-profile-container'>

        <form 
                      onSubmit={handleLogin} 
                      >
                        <div className="row">
                          <div className="col-6  mt-3">
                            <label>First Name</label>
                            <input
                              type="text"
                              className='staff-view-profile-text'
                            name='fname'
                            onChange={handleChange}
                            value={data.fname}
                            />
                             {errors.fname &&  (
                            <span className="text-danger">{errors.fname}</span>
                          )}
                          </div>
                          <div className="col-6 user_reg_input_grp mt-3">
                            <label>Last Name</label>
                            <input
                              type="text"
                              placeholder="Enter Last Name"
                              name='lname'
                              onChange={handleChange}
                              value={data.lname}
                            />
                              {errors.lname &&  (
                            <span className="text-danger">{errors.lname}</span>
                          )}
                            </div>
                            </div>
                        <div className="row">
                          <div className="col-12 user_reg_input_grp mt-3">
                            <label>E-mail</label>
                            <input
                              type="email"
                              placeholder="Enter  E-mail"
                              name='email'
                              onChange={handleChange}
                              value={data.email}
                            />
                              {errors.email &&  (
                            <span className="text-danger">{errors.email}</span>
                          )}
                          </div>
                          </div>
                          <div className="row">
                         
                          
                          <div className="col-6 user_reg_input_grp mt-3">
                            <label>Contact</label>
                            <input
                              type="number"
                              placeholder="Enter Your Contact"
                              name='contact'
                              onChange={handleChange}
                              value={data.contact}
                            />
                              {errors.contact &&  (
                            <span className="text-danger">{errors.contact}</span>
                          )}
                          </div>
                        
                          <div className="col-6 user_reg_input_grp mt-3">
                            <label>Date of Join</label>
                            <input
                              type="date"
                              placeholder="Enter Your Contact"
                              name='doj'
                              value={data.doj}
                              max={new Date().toISOString().split("T")[0]}
    
    
    
                              onChange={handleChange}
                            />
                           
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-6 user_reg_input_grp mt-3">
                            <label>Role</label>
                            <select  className='form-control p-2' name='role' value={data.role} onChange={handleChange} >
                                   
    
                                    <option value="">Select Service Type</option>
        <option value="Cleaning Staff">Cleaning Staff</option>
        <option value="Food Delivery Staff">Food Delivery Staff</option>
        <option value="Ticket Booking STaff"> Ticket Booking STaff</option>
        <option value="Parking Booking STaff">Parking Booking STaff</option>
                                </select>
                                {errors.role &&  (
                            <span className="text-danger">{errors.role}</span>
                          )}
                          </div>
                         
                         
                          
                         <div className="col-6 user_reg_input_grp mt-3">
                           <label>Picture</label>
                           <input
                             type="file"
                             name='profilePic'
                             onChange={handleImageChange}
                            
                           />
                             {errors.profilePic &&  (
                            <span className="text-danger">{errors.profilePic}</span>
                          )}
                         </div>
                       
                       
                         </div>
                        <center><div className="col-lg-4 col-md-12 col-sm-12 user_reg_input_grp_btn mt-4">
                          <button>Update</button>
                        </div>
                        </center> 
                      
                    
                      </form>
        </div>
    </div>
  )
}

export default StaffViewProfile