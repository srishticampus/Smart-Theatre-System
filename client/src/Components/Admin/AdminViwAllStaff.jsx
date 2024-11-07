import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { viewCount ,approveById} from '../../Services/AdminService';
import {IMG_BASE_URL} from '../../Services/BaseURL' 
import { MdEditSquare } from "react-icons/md";

function AdminViwAllStaff() {
 
    
      const [data, setData] = useState([]);
      
      const fetchData = async () => {
        try {
          const result = await viewCount('viewAllStaff');
    
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
      const activateUserById=async(id)=>{
        
        
        try {
            const result = await approveById('activateStaffById',id);
    
            if (result.success) {
                console.log(result);
               
                toast.success('Staff Activated Succesfully')
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
    
    const deactivateUser=async(id)=>{
        
        
        try {
            const result = await approveById('deActivateStaffById',id);
    
            if (result.success) {
                console.log(result);
                
                  toast.success('Staff Deactivated Succesfully')
              fetchData()
    
            } else {
                console.error('Data error:', result);
                toast.error(result.message);
            }
    
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred during Data View');
        }
    }
    const navigate=useNavigate()
    const editUser=(id)=>{
        navigate(`/admin-edit-staff/${id}`)
    }
    
      return (
        <div>
          {data.length > 0 ? (
            <table className="table table-dark table-striped mt-5">
              <thead>
                <tr>
                <th scope="col">Profile</th>
                  <th scope="col">Name</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Contact</th>
                  
                  <th scope="col">Role</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => {
                  return (
                    <tr key={user._id}>
                       <td>
                        {user.profilePic
                          ? 
                          <img src={`${IMG_BASE_URL}/${user.profilePic.filename}`} className="img-fluid image-rounded " alt="User" />
    
                          :''} 
                      </td>
                      <th>{user.fname}&nbsp;&nbsp;
                         {user.lname}
                      </th>
                      <td>{user.email}</td>
                      <td>{user.contact}</td>
                     
                      <td>{user.role}</td>
                      <td className="d-flex" >
                      <MdEditSquare className="admin-edit-icon" onClick={() => {
                            editUser(user._id);
                          }}/>
                      {user.isActive? ( <button
                          type="button"
                          className="btn btn-outline-danger activate-btn"
                          onClick={() => {
                            deactivateUser(user._id);
                          }}
                        >
                         <p>Deactivate</p>
                        </button>
                      ):(
                        <button type="button" className="btn btn-outline-success activate-btn"
                         onClick={()=>{activateUserById(user._id)}}>
                       <p>Activate</p>
                        </button>)
                        
                }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="no_data_found">
              <p>No Users Found</p>
            </div>
          )}
        </div>
      );
    }
    
    export default AdminViwAllStaff