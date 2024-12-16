import "../../Assets/Styles/AdminViewDetails.css";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { viewCount, approveById } from '../../Services/AdminService';
import { IMG_BASE_URL } from '../../Services/BaseURL'
import { ViewById } from "../../Services/CommonServices";

import { useParams } from 'react-router-dom';
import { MdSignalCellularNull } from "react-icons/md";

function AdminViewDetailsMovie() {
    const {id}=useParams()
    const navigate=useNavigate()
    const [castdata,setCastData]=useState([])
        const [data, setData] = useState({
           
            movieName:'',
            movieImage:{filename:''},
            coverImage:{filename:''},
            movieType:'',
            duration:'',
            description:'',
            screenType:'',
            language:''
        });
       
        const fetchData = async () => {
            try {
                const result = await ViewById('viewMovieById',id);
    
                if (result.success) {
                    console.log(result);
                    if (result.user) {
                        setData(result.user);
                      
                    } else {
                        setData(null);
                       
                    } 
                }else {
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
            }, [id]);
    
            const fetchCastData = async () => {
                try {
                    const result = await ViewById('viewCastByMovieId',id);
        
                    if (result.success) {
                        console.log("cast",result);
                        if (result.user.length>0) 
                            setCastData(result.user||[]);
                          
                      
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
        
        
                    fetchCastData(); // Call the async function
                }, [id]);
            const redirect = async () => {
               navigate('/admin-view-movie/')
            }
            const edit = async () => {
                navigate('/admin-edit-movie/'+id)
             }
    return (
        <div>
            <p className='admin-view-details-head'>Movie Details</p>
            <div className='admin-view-details-background'>
                {/* Add img tag for background */}
                  <img src={`${IMG_BASE_URL}/${data.coverImage.filename}`} alt='kanguva-background' className="background-img"/>
                <div className="row">
                    <div className="card col-sm-2 admin-details-card">
                         {/* <img src={`${IMG_BASE_URL}/${data.movieImage.filename}`} alt='demonte' /> */}
                    </div>
                </div>
                <div className=' admin-details-movie-data'>
                    <p className='movie-head'>{data.movieName}</p>
                    <div className='d-flex'>
                        <p className='movie-details-2d-3d'>{data.screenType}</p>
                        <p className='movie-details-tamil'>{data.language}</p>
                    </div>
                    <p className='movie-details-genre'>{data.movieType}</p>
                    <p className='movie-details-time'>{data.duration}</p>
                </div>
                <div className='ms-auto'>
                    <button className='btn btn-outline-light ' onClick={redirect}>Cancel</button>
                    <button className='btn btn-danger ms-3'  onClick={edit}>Edit Movie</button>
                </div>
            </div>
            <div className='mt-5'>
                <p className='movie-details-description'>Movie Description</p>
                <p className='movie-details-para'> {data.description}</p>
            </div>
{castdata.length>0?

             <div className="row">
                <p className='movie-details-cast'>Cast</p>

                {castdata.map(item=>{
                    return(
                        <div className="col-sm-2 d-flex flex-column align-items-center">
                        <img src={`${IMG_BASE_URL}/${item.castImage[0].filename}`} alt="priya" style={{ maxWidth: '100%', height: 'auto' }} />
                        <p className='cast-name'>{item.castName}</p>
                        <p className='cast-designation'>{item.role}</p>
                    </div>
                    )
                })}
               
             
            </div> 

            
:<h2>Cast Not available</h2>}
        </div>
    );
}

export default AdminViewDetailsMovie;
