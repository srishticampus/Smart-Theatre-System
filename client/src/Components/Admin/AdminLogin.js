import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../../Assets/Styles/AdminLogin.css'
import logo from "../../Assets/Images/Vector.png";
import { login } from "../../Services/CommonServices";

function AdminLogin() {

  const navigate = useNavigate();
  const [data, setData] = useState({
    role:'admin'
  });

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({});

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
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email) {
      console.log("here");

      newErrors.email = 'Email is required';
    }
    else   if (!emailRegex.test(data.email)) {


      newErrors.email = 'Enter a Valid E-Mail Id';
    }
    if (!data.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(errors);


    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }
    console.log(data);
    if(data.role=='admin'){
    const hardCodedUsername = 'admin';
    const hardCodedPassword = 'admin@123';
    if (data.email === hardCodedUsername && data.password === hardCodedPassword) {
      localStorage.setItem("admin", 1);
      toast.success('Login successful!');
      navigate('/admin-dashboard');
    } else {
      toast.error('Incorrect Username or Password');
    }
   
  }
  else{
    try {
      console.log(data);
      
      const result = await login(data, 'loginStaff');

      if (result.success) {
          console.log(result);
          localStorage.setItem("staff",result.user._id);

          toast.success('Login successful!');
          navigate('/staff-home');


      } else {
          console.error('Registration error:', result);
          toast.error(result.message);
      }
  } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred during Registration');
  }
  }
  };


  return (
    <div className="landing_banner pt-5">
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
              <p className="mt-5">Sign In</p>
             
              <div className="row mt-5">
                <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp">
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}

                  >
                  <div className="user_registration_input mt-4">
  <div className="btn-group" role="group" aria-label="User Role">
    <input
      type="radio"
      className="btn-check p-5"
      name="role"
      id="admin"
      autoComplete="off"
      value="admin"
      onChange={handleChange}
      checked
    />
    
    <label className="btn btn-outline-dark admin-radios" htmlFor="admin">
      Admin
    </label>

    <input
      type="radio"
      className="btn-check admin-radios"
      name="role"
      id="staff"
      autoComplete="off"
      value="staff"
      onChange={handleChange}
    />
    <label className="btn btn-outline-dark admin-radios" htmlFor="staff">
      Staff
    </label>
  </div>
</div>

                    <div className="user_registration_input mt-4">
                      <input
                        type="text"
                        className="form-control border border-dark "
                        placeholder="Enter Username"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        defaultChecked
                      />
                      {errors.email && (
                        <span className="text-danger">{errors.email}</span>
                      )}
                    </div>
                    <div className="user_registration_input mt-4">
                      <input
                        type="password"
                        className="form-control border border-dark"
                        placeholder="Password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}

                      />
                      {errors.password && (
                        <span className="text-danger">{errors.password}</span>
                      )}
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 user_reg_input_grp_btn mt-4">
                      <button>Sign In</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
