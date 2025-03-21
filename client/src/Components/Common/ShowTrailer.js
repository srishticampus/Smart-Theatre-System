import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ViewById } from '../../Services/CommonServices';
import { IMG_BASE_URL } from '../../Services/BaseURL';
import { toast } from 'react-toastify';

function ShowTrailer() {

     const { id } = useParams();
      const [data, setData] = useState({
        movieName: "",
        movieImage: { filename: "" },
        coverImage: { filename: "" },
        movieType: "",
        duration: "",
        description: "",
        screenType: "",
        language: "",
        trailer:{filename:''}
      });

      const fetchData = async () => {
          try {
            const result = await ViewById("viewMovieById", id);
      
            if (result.success) {
              console.log(result);
              if (result.user) {
                setData(result.user);
              } else {
                setData(null);
              }
            } else {
              console.error("Data error:", result);
              toast.error(result.message);
            }
          } catch (error) {
            console.error("Unexpected error:", error);
          }
        };
        useEffect(() => {
          fetchData(); // Call the async function
        }, [id]);

  return (
    <div>
        {
            console.log(`${IMG_BASE_URL}/${data.trailer.filename}`)
            
        }
      <div className="video-player mt-3"> 
        <video
          width="100%"
          controls
          autoPlay
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
        >
          <source
  src={`${IMG_BASE_URL}/${encodeURIComponent(data.trailer.filename)}`}
  type="video/mp4"
/>

          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default ShowTrailer
