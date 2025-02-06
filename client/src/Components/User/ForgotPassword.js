import React, { useState } from "react";
import logo from "../../Assets/Images/Vector.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgotPassword({ activeUser }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  

  

  return (
    <div>
      <div className="landing_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_left_box">
              <img src={logo} alt="logo" />
              <p>
                <span className="logo_red">Maxus</span>Cinemas
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_right_box">
              <div className="user_reg_container">
                <p className="mt-5">Reset Password</p>
                <p className="text-center fs-6 text-uppercase">{activeUser}</p>
                <form >
                  <div className="row mt-5">
                    <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp">
                      <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="form-control user_inp"
                        id="email"
                        name="email"
                        
                      />
                     
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter Your Password"
                     
                    />
                    <i
                      className={`ri-eye${
                        showPassword ? "-off" : ""
                      }-line password-toggle-icon`}
                      onClick={togglePasswordVisibility}
                    ></i>
                   
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      
                    />
                    <i
                      className={`ri-eye${
                        showPassword ? "-off" : ""
                      }-line password-toggle-icon`}
                      onClick={togglePasswordVisibility}
                    ></i>
                    
                  </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp_btn mt-4">
                      <button type="submit" className="button_bg w-100 mt-3">
                        Reset Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
