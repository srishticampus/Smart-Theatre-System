import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../Assets/Styles/UserRegistration.css";
import logo from "../../Assets/Images/Vector.png";
import { toast } from "react-toastify";
import { registerWithFile } from "../../Services/CommonServices";

function UserRegistration() {
  const [data, setData] = useState('');

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();



  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
      const { name, value } = e.target;
    
      setData({
          ...data,
          [name]: value,
      });
  
    
  };
  const handleImageChange = (e) => {
      console.log("in file", e.target.files[0]);
      
      const file = e.target.files[0];
      setData({
        ...data,
        profilePic: file,
      });
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
      if (!data.name) {
        newErrors.name = 'Name is required';
    } 
      if (!data.contact) {
          newErrors.contact = 'Phone Number is required';
      } 
      else if (!phoneRegex.test(data.contact)) {
          newErrors.contact = 'Phone Number Must Contain 10 digits ';
      }
     
      if (!data.cpassword) {
          newErrors.cpassword = 'Confirm Password is required';
      }
      if (!data.profilePic) {
          newErrors.profilePic = 'Profile Picture is required';
      }
      if (!data.password) {
          newErrors.password = 'Password is required';
      } else if (!passwordRegex.test(data.password)) {
          newErrors.password = 'Password Must Contain 1 Uppercase,1 Symbol and 1 Number with minimum 6 characters';
      }
      else if (data.password != data.cpassword) {
          newErrors.password = 'Password and Confirm Password must be the same !';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(errors);

      console.log("api called", validate());

      if (!validate()) {
          toast.error('Please fix the errors in the form.');
          return;
      }

      try {
          console.log(data);
          
          const result = await registerWithFile(data, 'registerUser');

          if (result.success) {
              console.log(result);

              toast.success('Registration successful!');
              navigate('/akshaya-login');


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
    <div className="landing_banner">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_left_box">
            <img src={logo} alt="logo" />
            <p>
              <span className="logo_red">Cine</span>Stream
            </p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_right_box">
            <div className="user_reg_container">
              <p>Sign Up</p>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="row mt-5">
                  <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp">
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                      value={data.name}
                      onChange={handleChange}
                     
                    />
                    {errors.name && (
                      <span className="text-danger">{errors.name}</span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      value={data.email}
                      onChange={handleChange}
                    
                    />
                    { errors.email && (
                      <span className="text-danger">{errors.email}</span>
                    )}
                  </div>
             
              
                  <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
                    <input
                      type="number"
                      name="contact"
                      placeholder="Enter Your Phone Number"
                      value={data.contact}
                      onChange={handleChange}
                      
                      className="no-arrows"
                    />
                    {errors.contact && (
                      <span className="text-danger">{errors.contact}</span>
                    )}
                  </div>
               
              
                 
                  <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp mt-1">
                    <label>Upload Image</label>
                    <input
                      type="file"
                      name="profilePic"
                      onChange={handleImageChange}
                    />
                    {errors.profilePic && (
                      <span className="text-danger">{errors.profilePic}</span>
                    )}
                  </div>
                  {/* <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter Your Password"
                      value={data.password}
                      onChange={handleChange}
                     
                    />
                    <i
                      className={`ri-eye${
                        showPassword ? "-off" : ""
                      }-line password-toggle-icon`}
                      onClick={togglePasswordVisibility}
                    ></i>
                    { errors.password && (
                      <span className="text-danger">{errors.password}</span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="cpassword"
                      placeholder="Confirm Password"
                      value={data.cpassword}
                      onChange={handleChange}
                     
                    />
                    <i
                      className={`ri-eye${
                        showPassword ? "-off" : ""
                      }-line password-toggle-icon`}
                      onClick={togglePasswordVisibility}
                    ></i>
                    { errors.cpassword && (
                      <span className="text-danger">
                        {errors.cpassword}
                      </span>
                    )}
                  </div> */}

<div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
  <div className="password-container">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Enter Your Password"
      value={data.password}
      onChange={handleChange}
    />
    <i
      className={`ri-eye${showPassword ? "-off" : ""}-line password-toggle-icon`}
      onClick={togglePasswordVisibility}
    ></i>
  </div>
  {errors.password && (
    <span className="text-danger">{errors.password}</span>
  )}
</div>

<div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
  <div className="password-container">
    <input
      type={showPassword ? "text" : "password"}
      name="cpassword"
      placeholder="Confirm Password"
      value={data.cpassword}
      onChange={handleChange}
    />
    <i
      className={`ri-eye${showPassword ? "-off" : ""}-line password-toggle-icon`}
      onClick={togglePasswordVisibility}
    ></i>
  </div>
  {errors.cpassword && (
    <span className="text-danger">{errors.cpassword}</span>
  )}
</div>

                  
                  <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp_btn mt-3">
                    <button type="submit">Sign Up</button>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 mt-2">
                    <h6>
                      Already have an Account?{" "}
                      <Link to="/user_login">Sign In</Link>
                    </h6>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegistration;
