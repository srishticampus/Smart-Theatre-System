import React, { useEffect, useState } from "react";
import { viewCount, approveById } from '../../Services/AdminService';
import { IMG_BASE_URL } from '../../Services/BaseURL'
import { toast } from "react-toastify";
import { ViewById } from "../../Services/CommonServices";
import FooterLandingPage from "../Footers/FooterLandingPage";
import { Link, useNavigate, useParams } from "react-router-dom";


function StaffViewMovieDetailsOffline() {

    const {uId,mId}=useParams()
      const [movieId, setMovieId] = useState(mId);
      
      const [data, setData2] = useState({
        movieImage:{filename:''},
        coverImage:{filename:''},
        screenId:{sreenName:''}
      });
      const [genre, setGenre] = useState([]);
      const [castdata,setCastData]=useState([])
    
    const [data2, setData] = useState([]);
     const navigate=useNavigate()
    
      const fetchData2 = async () => {
        try {
          const result = await viewCount('nowShowingMovies');
    
          if (result.success) {
            console.log(result);
            if (result.user.length > 0) {
              setData(result.user);
            } else {
              setData([]);
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
      useEffect(() => {
    
    
        fetchData2(); // Call the async function
      }, [movieId]);
    
      const fetchData3 = async () => {
        try {
          const result = await ViewById('viewMovieById', movieId);
          if (result.success) {
            console.log("mov",result.user);
            
            setData2(result.user || null);
    
          } else {
            toast.error(result.message);
          }
        } catch (error) {
          toast.error('An unexpected error occurred during Data View');
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [movieId]);
          const fetchData = async () => {
            try {
              const result = await ViewById('viewMovieById', movieId);
              if (result.success) {
                console.log("mov",result.user);
                
                setData2(result.user || null);
        
              } else {
                toast.error(result.message);
              }
            } catch (error) {
              toast.error('An unexpected error occurred during Data View');
            }
          };
        
          useEffect(() => {
            fetchData();
          }, [movieId]);
          
        const book=(id)=>{
     
        
            navigate(`/staff-book-ticket-offline/${uId}/${movieId}`)
        }
                    const fetchCastData = async () => {
                        try {
                            const result = await ViewById('viewCastByMovieId',mId);
                
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
                        }, [movieId]);

  return (
   <div className="mt-10">
                    {console.log(`${IMG_BASE_URL}${data.coverImage.filename}`)
                    }
                       <div className="imageContainer2 mt-5" 
                        style={{
                        
                           backgroundImage: `url(${data.coverImage?.filename ? `${IMG_BASE_URL}/${encodeURIComponent(data.coverImage.filename)}` : "https://via.placeholder.com/400"})`,
                       
                                            
                        
                       }}>
                           <img src={`${IMG_BASE_URL}/${data.movieImage.filename}`} alt="Screen 2 Left" style={{width:'50%'}} />
                           <div className="screen2-text">
                               <h4>{data.movieName}</h4>
                               <h5>{data.movieType}</h5>
                               <h5>{data.duration}</h5>
                               <div className="screen2-lang">{data.screenId.screenName}</div> <div className="screen2-lang">{data.language}</div>
                               <br />
                               <div className="screen2-btn" onClick={book}>Book Now</div>
                           </div>
                       </div>
                       <div className="container mt-5">
                       <h1 className="user-movie-head1">Movie Description</h1>
                       <p className="user-movie-head2">{data.description}</p>
   
                       {castdata.length>0?
                       
                                    <div className="row">
                                       <p className='className="user-movie-head1 '>Cast</p>
                       
                                       {castdata.map(item=>{
                                           return(
                                               <div className="col-sm-2 d-flex flex-column align-items-center">
                                               <img src={`${IMG_BASE_URL}/${item.castImage[0].filename}`} alt="priya"  className="cast-img" />
                                               <p className='cast-name'>{item.castName}</p>
                                               <p className='cast-designation'>{item.role}</p>
                                           </div>
                                           )
                                       })}
                                      
                                    
                                   </div> 
                       
                                   
                       :<h2>Cast Not available</h2>}
                       </div>
                   
                   </div>
  )
}

export default StaffViewMovieDetailsOffline
