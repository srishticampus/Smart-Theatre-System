import React, { useState,useEffect } from 'react'
import img from "../../Assets/Images/admin.jpg";
import { toast } from "react-toastify";
import '../../Assets/Styles/AdminAddStaff.css'



import { useNavigate, useParams } from 'react-router-dom';
import { registerWithFile, updateWithFile, ViewById } from '../../Services/CommonServices';
import { IMG_BASE_URL } from '../../Services/BaseURL';


function StaffEditProfile() {

 
  const [data, setData] = useState({
    profilePic: { filename: '' },
    doj: '',
    profilePicPreview: ''
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

    const id = localStorage.getItem('staff')

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
  
        if (!data.email) {
            console.log("here");
  
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(data.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!data.fname) {
          newErrors.fname = 'First Name is required';
      } 
        
        if (!data.contact) {
            newErrors.contact = 'Phone Number is required';
        } 
        else if (!phoneRegex.test(data.contact)) {
            newErrors.contact = 'Phone Number Must Contain 10 digits ';
        }
        if (!data.role) {
            newErrors.role = 'Staff Role is required';
        }
        if (!data.doj) {
          newErrors.doj = 'Joining Date is required';
      }
       
        if (!data.profilePic) {
            newErrors.profilePic = 'Profile Picture is required';
        }
        if (!data.address) {
          newErrors.address = 'Address is required';
      }
        if (!data.password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(data.password)) {
            newErrors.password = 'Password Must Contain 1 Uppercase,1 Symbol and 1 Number with minimum 6 characters';
        }
       
  
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
  
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(errors);
  
        console.log("api called", validate());
  
        if (!validate()) {
            toast.error('Please fix the errors in the form.');
            return;
        }
  
        try {
            console.log(data);
            
            const result = await registerWithFile(data, 'registerStaff');
  
            if (result.success) {
                console.log(result);
  
                toast.success('Registration successful!');
                navigate('/admin-view-staff');
  
  
            } else {
                console.error('Registration error:', result);
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred during Registration');
        }
    
    
  };
    return (
      <div className="user_add_complaint">
          <div className="container">
            <div className="row ms-5">
              <div className="col-5 mt-5">
           
                <div>
                <img
                src={data.profilePicPreview|| ''}
                className="staff-profile-img"
                alt="Staff Profile"
              />                </div>
              </div>
              </div>
              <div className="col-10 mt-5">
                <div className="user_add_complaint_form">
               
                    <form 
                    onSubmit={handleLogin} 
                    >
                      <div className="row">
                        <div className="col-6 user_reg_input_grp mt-3">
                          <label>First Name</label>
                          <input
                            type="text"
                            placeholder="Enter First Name"
                          name='fname'
                          value={data.fname}
                          onChange={handleChange}
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
                            value={data.lname}
                            onChange={handleChange}
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
                            value={data.email}
                            onChange={handleChange}
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
                            value={data.contact}
                            onChange={handleChange}
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
                          {errors.doj &&  (
                          <span className="text-danger">{errors.doj}</span>
                        )}
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-12 user_reg_input_grp mt-3">
                          <label>Role</label>
                          <select  className='form-control p-2' name='role' onChange={handleChange} value={data.role}>
                                 
  
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
                        </div>
                        <div className="row">
                        <div className="col-12 user_reg_input_grp mt-3">
                          <label>Address</label>
                          <textarea  placeholder="Enter Address"
                            name='address'
                            rows="2"
                            value={data.address}
                            onChange={handleChange}> </textarea>
                              {errors.address &&  (
                          <span className="text-danger">{errors.address}</span>
                        )}
                        </div>
                        </div>
                        <div className="row">
                       
                        
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
                     
                       <div className="col-6 user_reg_input_grp mt-3">
                         <label>Password</label>
                         <input
                           type="password"
                           placeholder="Enter Password"
                           name='password'
                           onChange={handleChange}
                           value={data.password}
                         />  {errors.password &&  (
                          <span className="text-danger">{errors.password}</span>
                        )}
                       
                       </div>
                       </div>
                       <center><div className="col-lg-4 col-md-12 col-sm-12 user_reg_input_grp_btn mt-4">
                            <button>Add</button>
                          </div>
                          </center> 
                     
                    
                  
                    </form>
                  </div>
                </div>
              
          
          </div>
        </div>
    )
  }


export default StaffEditProfile