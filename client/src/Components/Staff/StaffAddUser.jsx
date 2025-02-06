import React, { useState } from "react";
import "../../Assets/Styles/StaffAddUser.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerWithFile } from "../../Services/CommonServices";

function StaffAddUser() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    contact: "",
    email: "",
    profilePic: null,
    password: "Radhul123*", // Hardcoded password
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({
      ...data,
      profilePic: file,
    });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!data.name) {
      newErrors.name = "Name is required";
    }
    if (!data.contact) {
      newErrors.contact = "Phone Number is required";
    } else if (!phoneRegex.test(data.contact)) {
      newErrors.contact = "Phone Number must contain 10 digits";
    }
    if (!data.profilePic) {
      newErrors.profilePic = "Profile Picture is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      const result = await registerWithFile(data, "registerUser");

      if (result.success) {
        // toast.success("Registration successful!");
        navigate(`/staff-view-movies-offline/${result.user._id}`)
        
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred during registration.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="staff_add_user_head">
              <p>Add User</p>
            </div>
          </div>
          <div className="col-6">
            <div className="staff_add_user_inp">
              <input
                type="text"
                name="name"
                placeholder="User Name"
                value={data.name}
                onChange={handleChange}
              />
              {errors.name && <span className="text-danger">{errors.name}</span>}
            </div>
          </div>
          <div className="col-6">
            <div className="staff_add_user_inp">
              <input
                type="text"
                name="contact"
                placeholder="User Contact"
                value={data.contact}
                onChange={handleChange}
              />
              {errors.contact && <span className="text-danger">{errors.contact}</span>}
            </div>
          </div>
          <div className="col-6">
            <div className="staff_add_user_inp mt-3">
              <input
                type="text"
                name="email"
                placeholder="User Email"
                value={data.email}
                onChange={handleChange}
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>
          </div>
          <div className="col-6">
            <div className="staff_add_user_inp mt-3">
              <input
                type="file"
                name="profilePic"
                onChange={handleImageChange}
              />
              {errors.profilePic && <span className="text-danger">{errors.profilePic}</span>}
            </div>
          </div>
          <div className="col-6">
            <div className="staff_add_user_inp mt-3">
              <input
                type="password"
                name="password"
                value={data.password}
                readOnly // Prevents editing
              />
            </div>
          </div>
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-danger">
              Add User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StaffAddUser;
