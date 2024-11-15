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
        doj: '',
        profilePicPreview: ''
    });

    const id = localStorage.getItem('staff')
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
 <img
                src={data.profilePicPreview|| ''}
                className="staff-profile-img"
                alt="Staff Profile"
              />                    <div className="row">
                        <div className="col-6 mt-3 col-space">
                            <label className='staff-profile-label'>First Name</label>
                            <div>
                            <span className='staff-profile-data'>{data.fname}</span>
                        </div></div>
                        <div className="col-6 mt-3 col-space">
                            <label className='staff-profile-label'>Last Name</label>
                            <div>
                            <span className='staff-profile-data'>{data.lname}</span>
                        </div></div>
                    </div>

                    <div className="row">
                        <div className="col-6 mt-3 col-space">
                            <label className='staff-profile-label'>Phone Number</label>
                            <div>
                            <span className='staff-profile-data'>{data.contact}</span>
                            </div>
                        </div>
                        <div className="col-6 mt-3 col-space">
                            <label className='staff-profile-label'>E-Mail</label>
                            <div>
                            <span className='staff-profile-data'>{data.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6 mt-3 col-space">
                            <label className='staff-profile-label'>Role</label>
                            <div>
                            <span className='staff-profile-data'>{data.role}</span>
                            </div>
                        </div>
                        <div className="col-6 mt-3 col-space">
                            <label className='staff-profile-label'>Joining Date</label>
                            <div>
                            <span className='staff-profile-data'>{data.doj.slice(0, 10)}</span>
                            </div>
                        </div>
                    </div>



                    <center><div className="col-lg-4 col-md-12 col-sm-12 user_reg_input_grp_btn mt-4">
                        <button onClick={()=>{
                           navigate(`/staff-edit-profile/${data._id}`)
                        }}>Edit</button>
                    </div>
                    </center>


                </form>
            </div>
        </div>
    )
}

export default StaffViewProfile