import React, { useState } from "react";
import logo from "../../Assets/Images/Vector.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from '../../Services/BaseURL';


function ForgotPassword({ activeUser }) {
  const navigate = useNavigate();

  const[email,setEmail]=useState('')
  
  // const changefn = ((e) => {
  //   setEmail({
  //     ...email, [e.target.name]: e.target.value
  //   });
  // });
  const changefn = (e) => {
    setEmail(e.target.value);
  };

  console.log(email);

  const submitfn=((a)=>{
    a.preventDefault()
    console.log(email);

    axios.post(`${API_BASE_URL}/forgotPWDsentMail`,{email:email})
    
    .then((res)=>{
      console.log(res);
      if(res.data.status==200){
        toast.success("Password reset email has been sent to your  email.")
        setEmail("")
      }
      if(res.data.status==500){
        alert(res.data.msg)
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  })

  

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
                <p className="mt-5">Forgot Password</p>
                <p className="text-center fs-6 text-uppercase">{activeUser}</p>
                <form onSubmit={submitfn}>
                  <div className="row mt-5">
                    <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp">
                      <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="form-control user_inp"
                        id="email"
                        name="email"
                        value={email}
                        onChange={changefn}
                        required
                      />
                     
                    </div>

                    {/* <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
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
                   
                  </div> */}
                  {/* <div className="col-lg-6 col-md-6 col-sm-12 user_reg_input_grp mt-1">
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
                    
                  </div> */}
                    <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp_btn mt-4">
                      <button type="submit" className="button_bg w-100 mt-3">
                        Submit
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
