import React, { useEffect, useState } from 'react';
import { ViewById, resetPassword } from '../../Services/CommonServices';
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import "../../Assets/Styles/AdminEditScreen.css";

const AdminEditScreen = () => {
    // State to track the selected lounge
    const [selectedLounge, setSelectedLounge] = useState('gold');
    // State to track whether the "Previous" button should be visible
    const [isPreviousVisible, setIsPreviousVisible] = useState(false);
    // State to hold data from the API
    const [data, setData] = useState({
      screenSize: '',
      screenName: '',
      screenFormat: '',
      gold: { seatCount: '', seatLabel: '', amount: '' },
      silver: { seatCount: '', seatLabel: '', amount: '' },
      platinum: { seatCount: '', seatLabel: '', amount: '' },
  });
    
    // State to hold the form data for editing
    const [editData, setEditData] = useState({
        seatCount: '',
        amount: '',
        seatLabel: '',
        screenFormat: '2D' // default value
    });
    const { id } = useParams();

    // Fetch the data from the API
    const fetchData = async () => {
        try {
            const result = await ViewById('viewScreenById', id);

            if (result.success) {
                if (result.user) {
                    setData(result.user);
                    setEditData({
                        seatCount: result.user[selectedLounge]?.seatCount || '',
                        amount: result.user[selectedLounge]?.amount || '',
                        seatLabel: result.user[selectedLounge]?.seatLabel || ''
                    });
                } else {
                    setData(null);
                }
            } else {
                console.error('Data error:', result);
                toast.error(result.message);
            }

        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred during Data View');
        }
    };

    // Call the fetchData function when the component is mounted
    useEffect(() => {
        fetchData();
    }, [id]); 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };
  


    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Check if we're updating lounge-specific fields
        // if (['seatCount', 'seatLabel', 'amount'].includes(name)) {
        //     setEditData(prevData => ({
        //         ...prevData,
        //         [name]: value
        //     }));
        // } else {
            // Handle other global fields (screen format, etc.)
            setData((prevData) => ({
              ...prevData,
              [selectedLounge]: {
                  ...prevData[selectedLounge],
                  [name]: value
              },
              [name]: value
              
          }));
        // }
    };
    
    // Function to handle lounge button click
    const handleLoungeClick = (lounge) => {
        setSelectedLounge(lounge); // Set the selected lounge to the clicked lounge
        setEditData({
            seatCount: data[lounge]?.seatCount || '',
            amount: data[lounge]?.amount || '',
            seatLabel: data[lounge]?.seatLabel || ''
           
        });
    };

    // Function to handle next button click
    const handleNextClick = (e) => {
        if (selectedLounge === 'gold') {
            setSelectedLounge('silver');
        } else if (selectedLounge === 'silver') {
            setSelectedLounge('platinum');
        } else if (selectedLounge === 'platinum') {
            handleSubmit(e);
        }
        setIsPreviousVisible(true); // Show the "Previous" button after clicking "Next"
    };

    // Function to handle previous button click
    const handlePreviousClick = () => {
        if (selectedLounge === 'gold') {
            setSelectedLounge('platinum');
        } else if (selectedLounge === 'silver') {
            setSelectedLounge('gold');
        } else if (selectedLounge === 'platinum') {
            setSelectedLounge('silver');
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("datassss",data);
        
        try {
            const updatedData = {
                ...editData,
                lounge: selectedLounge
            };

            const result = await resetPassword( data,'editScreenById',id); // API call to update the data
            if (result.success) {
                toast.success('Lounge updated successfully');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error updating lounge:', error);
            toast.error('An error occurred while updating the lounge');
        }
    };

    return (
        <>
        <div className='admin-add-screen-sectionone'>
          <p className='admin-add-screen-haedone'>Edit Screen</p>
          <input type='text' placeholder='64ft*101.6ft'
          value={data.screenSize} className='admin-add-screen-sectionone-field-screensize' name="screenSize" onChange={handleChange} />
          <input type='text' 
          value={data.screenName} placeholder='Screen Name' className='admin-add-screen-sectionone-field-screenname'  name="screenName" onChange={handleChange}  />
          <div className="form-group">
    <select 
      className="form-select admin-add-screen-dropdown-button" 
      id="screenFormat" 
      name="screenFormat"
      onChange={handleChange}
      value={data.screenFormat}
    > <option value="">Choose One</option>
      <option value="2D">2D</option>
      <option value="3D">3D</option>
      <option value="IMAX">IMAX</option>
    </select>
  </div>
   
        </div>
        <div className='admin-add-screen-sectiontwo'>
          <p className='admin-add-screen-haedtwo'>Set Lounge</p>
         
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
    value={data[selectedLounge]?.seatCount || ''} // Fallback to empty string
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

export default AdminEditScreen;
