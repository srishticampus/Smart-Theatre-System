import React, { useEffect, useState } from "react";
import logo from "../../Assets/Images/Vector.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../Services/CommonServices";
// import "remixicon/fonts/remixicon.css"; // Import RemixIcon CSS

function UserLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState('');
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email) {
      console.log("here");

      newErrors.email = 'Email is required';
    }
    else if (!emailRegex.test(data.email)) {


      newErrors.email = 'Enter a Valid E-Mail Id';
    }
    if (!data.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (values) => {
    values.preventDefault()
    console.log(values);

    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }
    try {
      console.log(data);

      const result = await login(data, 'loginUser');

      if (result.success) {
        console.log(result);
        localStorage.setItem("user", result.user._id);

        toast.success('Login successful!');
        navigate('/user-home');


      } else {
        console.error('Registration error:', result);
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred during Login');
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };



  return (
    <div>
      <div className="landing_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_left_box">
              <img src={logo} alt="logo" />
              <p><span className='logo_red'>Maxus</span>Cinemas</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_right_box">
              <div className="user_reg_container">
                <p className="mt-5">Sign In</p>
                <form onSubmit={(e) => { onSubmit(e) }}>
                  <div className="row mt-5">
                    <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp">
                      <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="form-control user_inp"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}

                      />
                      {errors.email && (
                        <span className="text-danger">{errors.email}</span>
                      )}
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp mt-3 position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        className="form-control user_inp"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}

                      />
                      {errors.password && (
                        <span className="text-danger">{errors.password}</span>
                      )}
                      <i
                        className={`ri-eye${showPassword ? "-off" : ""}-line password-toggle-icon`}
                        onClick={togglePasswordVisibility}
                      ></i>
                      {/* {errors.password && touched.password && (
                        <span className="text-danger">{errors.password}</span>
                      )} */}
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                      <h6>
                        <Link to="/user_forgot_password">Forgot Password</Link>
                      </h6>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp_btn ">
                      <button type="submit" className="button_bg w-100 mt-2">Sign In</button>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
                      <h6>
                        New to Cinestream?{" "}
                        <Link to="/user-registration">Sign Up Now</Link>
                      </h6>
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

export default UserLogin;
