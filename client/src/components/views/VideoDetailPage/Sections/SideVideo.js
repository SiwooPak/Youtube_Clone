import React, { useEffect, useState } from 'react'
import Axios from 'axios';
function SideVideo() {

    const [SideVideos, setSideVideos] = useState([]);

    useEffect(() => {
        Axios.get("/api/video/getVideos").then((response) => {
          if (response.data.success) {
            //console.log(response.data);
            setSideVideos(response.data.videos);
          } else {
            alert("video null.");
          }
        });
      }, []);
    
    const renderSideVideo = SideVideos.map((video, index) => {
        let min = Math.floor(video.duration / 60);
        let sec = Math.floor(video.duration - min * 60);

        return <div key={index} style={{ display: 'flex', marginBottom: '1rem', padding: '0 2rem'}}>
        <div style={{ width: '70%', marginRight: '1rem'}}>
            <a href={`/video/${video._id}`}>
                <img style={{width: '100%', height: '100%'}} 
                    src={`http://localhost:5000/${video.thumbnail}`} alt={video.title} />
            </a>
        </div>

        <div style={{width: '50%'}}>
            <a href={`/video/${video._id}`} style={{ color: 'gray'}}>
                <span style={{ fontSize: '1rem', color: 'black'}}>{video.title}</span><br />
                <span>{video.writer.name}</span> <br />
                <span>{video.views}views</span> <br />
                <span>{min}:{sec}</span> <br />
            </a>
        </div>
        
    </div>
    }) 
        
  

    return (
        <>
            {renderSideVideo}
        </>
        
    )
}

export default SideVideo
