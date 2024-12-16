import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { viewCount ,approveById} from '../../Services/AdminService';
import {IMG_BASE_URL} from '../../Services/BaseURL' 
import "../../Assets/Styles/AdminViewScreen.css";
import { ViewById } from "../../Services/CommonServices";

function AdminViewScreen() {

      const [data, setData] = useState([]);
      
      const fetchData = async () => {
        try {
          const result = await viewCount('viewAllScreens');
    
          if (result.success) {
            console.log(result);
            if (result.user.length > 0)
              setData(result.user);
            else
              setData([])
          } else {
            console.error('Data error:', result);
            toast.error(result.message);
          }
    
        } catch (error) {
          console.error('Unexpected error:', error);
          toast.error('An unexpected error occurred during Data View');
        }
      };
      useEffect(() => {
    
    
        fetchData(); // Call the async function
      }, []);
      const deleteScreenById=async(id)=>{
        try {
          const result = await ViewById('deleteScreenById',id);
    
          if (result.success) {
            console.log(result);
           toast.success("Screen Removed Succesfully")
           await fetchData()
         
          

           
          } else {
            console.error('Data error:', result);
            toast.error(result.message);
          }
    
        } catch (error) {
          console.error('Unexpected error:', error);
          toast.error('An unexpected error occurred during Data View');
        }
      }
  return (
    <div>
      <p className='admin-view-screen-head'>View Screen</p>

      <div className="row">
        <div className="col-sm-12">
          <div className='admin-view-screen-table'>
          
          {data.length>0?(
              <table className='table admin-view-table table-responsive admin-view-screen-table table-bordered'>
              <thead>
                <tr className='bg-danger text-white'>
                  <th>Sl No</th>
                  <th>Screen Name</th>
                  <th>Format</th>
                  <th>Screen Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {data.map((user,index) => {
               return(

                  <tr>
                
                  <td>{index+1}</td>
                  <td>{user.screenName}</td>
                  <td>{user.screenFormat}</td>
                  <td>{user.screenSize}</td>
                  <td>
                    <span><Link to={`/admin-view-lounge/${user._id}`}><i className="fa-solid fa-eye" style={{ color: '#f10404' }}></i></Link></span>
                    <span><Link to={`/admin-edit-screen/${user._id}`}><i className="fa-regular fa-pen-to-square" style={{ color: '#e90c0c' }}></i></Link></span>
                    <span onClick={()=>{deleteScreenById(user._id)}}><i className="fa-solid fa-trash" style={{ color: '#e70d0d' }}></i></span>
                  </td>
                </tr>
               )
              }
              )
            }
              </tbody>
            </table>
           ) : (
                <div className="no_data_found">
                  <p>No Users Found</p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewScreen;
