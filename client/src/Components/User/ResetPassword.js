import React, { useState } from "react";
import logo from "../../Assets/Images/Vector.png";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from '../../Services/BaseURL';

function ResetPassword({ activeUser }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!password) {
      toast.error("Password is required.");
      return false;
    } 
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters, include 1 uppercase letter, and 1 number.");
      return false;
    } 
    if (!confirmPassword) {
      toast.error("Confirm Password is required.");
      return false;
    } 
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePassword()) return;

    axios.post(`${API_BASE_URL}/resetPswdaftermail/${id}`, { password })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Password Updated Successfully");
          navigate("/user-login");
        } else if (res.data.status === 500) {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again.");
        console.error(err);
      });
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
                <form onSubmit={handleSubmit}>
                  <div className="row mt-5">
                    <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                      />
                      <i
                        className={`ri-eye${showPassword ? "-off" : ""}-line password-toggle-icon`}
                        onClick={togglePasswordVisibility}
                      ></i>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-control"
                      />
                      <i
                        className={`ri-eye${showPassword ? "-off" : ""}-line password-toggle-icon`}
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

export default ResetPassword;
