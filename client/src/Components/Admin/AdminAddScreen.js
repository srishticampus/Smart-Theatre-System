import React, { useState } from 'react';
import "../../Assets/Styles/AdminAddScreen.css";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { registerWithFile } from '../../Services/CommonServices';
const AdminAddScreen = () => {
  const [data, setData] = useState({
    screenSize: '',
    screenName: '',
    screenFormat: '',
    gold: { seatCount: '', seatLabel: '', amount: '' },
    silver: { seatCount: '', seatLabel: '', amount: '' },
    platinum: { seatCount: '', seatLabel: '', amount: '' },});

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // const handleChange = (e) => {
  //   const { name, value,dataset } = e.target;
  //   if (dataset.lounge) {
  //     // Update nested lounge data (gold, silver, platinum)
  //     setData({
  //       ...data,
  //       [dataset.lounge]: {
  //         ...data[dataset.lounge],
  //         [name]: value,
  //       },
  //     });
  //   } else {
  //   setData({
  //       ...data,
  //       [name]: value,
  //   });
  // }
  // }
  const [selectedLounge, setSelectedLounge] = useState('gold');
  const [isPreviousVisible, setIsPreviousVisible] = useState(false);

  const handleLoungeClick = (lounge) => {
    setSelectedLounge(lounge);
  };


  const handleNextClick = (e) => {
    if (selectedLounge === 'gold') {
      setSelectedLounge('silver');
    } else if (selectedLounge === 'silver') {
      setSelectedLounge('platinum');
    } else if (selectedLounge === 'platinum') {
       handleLogin(e)
    }

    setIsPreviousVisible(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field belongs to a lounge or is a top-level field
    if (selectedLounge && ['seatCount', 'seatLabel', 'amount'].includes(name)) {
      setData((prevData) => ({
        ...prevData,
        [selectedLounge]: {
          ...prevData[selectedLounge],
          [name]: value,
        },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handlePreviousClick = () => {
    if (selectedLounge === 'gold') {
      setSelectedLounge('platinum');
    } else if (selectedLounge === 'silver') {
      setSelectedLounge('gold');
    } else if (selectedLounge === 'platinum') {
      setSelectedLounge('silver');
    }
  };
  const validate = () => {
    const newErrors = {};
   
  
    if (!data.screenSize) {
      newErrors.screenSize = 'Screen size is required';
    }
  
    if (!data.screenName) {
      newErrors.screenName = 'Screen name is required';
    }
  
    if (!data.screenFormat) {
      newErrors.screenFormat = 'Screen format is required';
    }
  
    
  
  
    
  
   
  
    
  
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Validation passes if there are no errors
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
    <>
      <div className='admin-add-screen-sectionone'>
        <p className='admin-add-screen-haedone'>Add Screen</p>
        <input type='text' placeholder='64ft*101.6ft' className='admin-add-screen-sectionone-field-screensize' name="screenSize" onChange={handleChange} />
        <input type='text' placeholder='Screen Name' className='admin-add-screen-sectionone-field-screenname'  name="screenName" onChange={handleChange}  />
        <div className="form-group">
  <select 
    className="form-select admin-add-screen-dropdown-button" 
    id="screenFormat" 
    name="screenFormat"
    onChange={handleChange}
    value={data.screenFormat}
  >
    <option value="2D">2D</option>
    <option value="3D">3D</option>
    <option value="IMAX">IMAX</option>
  </select>
</div>
 
      </div>
      <div className='admin-add-screen-sectiontwo'>
        <p className='admin-add-screen-haedtwo'>Set Lounge</p>
        {/* <div className="btn-group">
          <button
            type="button"
            className={`btn admin-add-screen-sectiontwo-buttonone ${selectedLounge === 'gold' ? 'bg-red' : ''}`}
            onClick={() => handleLoungeClick('gold')}
          >
            GOLD
          </button>
          <button
            type="button"
            className={`btn admin-add-screen-sectiontwo-buttontwo ${selectedLounge === 'silver' ? 'bg-red' : ''}`}
            onClick={() => handleLoungeClick('silver')}
          >
            SILVER
          </button>
          <button
            type="button"
            className={`btn admin-add-screen-sectiontwo-buttonthree ${selectedLounge === 'platinum' ? 'bg-red' : ''}`}
            onClick={() => handleLoungeClick('platinum')}
          >
            PLATINUM
          </button>
        </div>
        <br />
        <div className='d-flex'>
          <input type='text' placeholder='Number Of Seat' className='admin-add-screen-sectiontwo-numberofseat'  name="seatCount" onChange={handleChange} />
          <input type='text' placeholder='Amount' className='admin-add-screen-sectiontwo-amount'  name="amount" onChange={handleChange}  />
        </div>
        <input type='text' placeholder='Seat Label' className='admin-add-screen-sectiontwo-seatnumber'  name="screenLabel" onChange={handleChange}  />
         */}

<div className="btn-group">
        <button
          type="button"
          className={`btn admin-add-screen-sectiontwo-buttonone ${
            selectedLounge === "gold" ? "bg-red" : ""
          }`}
          onClick={() => handleLoungeClick("gold")}
        >
          GOLD
        </button>
        <button
          type="button"
          className={`btn admin-add-screen-sectiontwo-buttontwo ${
            selectedLounge === "silver" ? "bg-red" : ""
          }`}
          onClick={() => handleLoungeClick("silver")}
        >
          SILVER
        </button>
        <button
          type="button"
          className={`btn admin-add-screen-sectiontwo-buttonthree ${
            selectedLounge === "platinum" ? "bg-red" : ""
          }`}
          onClick={() => handleLoungeClick("platinum")}
        >
          PLATINUM
        </button>
      </div>

      {/* Input Fields */}
      {selectedLounge && (
        <div>
          <div className="d-flex">
            <input
              type="text"
              placeholder="Number Of Seat"
              className="admin-add-screen-sectiontwo-numberofseat"
              name="seatCount"
              value={data[selectedLounge].seatCount}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Amount"
              className="admin-add-screen-sectiontwo-amount"
              name="amount"
              value={data[selectedLounge].amount}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            placeholder="Seat Label"
            className="admin-add-screen-sectiontwo-seatnumber"
            name="seatLabel"
            value={data[selectedLounge].seatLabel}
            onChange={handleChange}
          />
        </div>
      )}
   


        {/* Render Next button */}
        <button
          type="button"
          className="btn btn-danger admin-add-screen-sectiontwo-buttonfour"
          onClick={handleNextClick}
        >
          Next
        </button>

        {/* Render Previous button conditionally */}
        {isPreviousVisible && (
          <button
            type="button"
            className="btn btn-danger admin-add-screen-sectiontwo-buttonprev"
            onClick={handlePreviousClick}
          >
            Previous
          </button>
        )}
      </div>
    </>
  );
};

export default AdminAddScreen;
