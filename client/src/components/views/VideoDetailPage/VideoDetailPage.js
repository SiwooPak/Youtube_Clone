import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import Axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";

function VideoDetailPage(props) {
  
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };
  const [VideoDetail, setVideoDetail] = useState([]);
  const [Comments, setComments] = useState([]);
  
  useEffect(() => {
    Axios.post(`/api/video/getVideoDetail`, variable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("비디오 정보를 가져오길 실패했습니다.");
      }
    })
  },[])

  
    return (
      
      <div>
        {VideoDetail.writer ? (
         
          <Row gutter={[16, 16]}>
          <Col lg={18} xs={24}>
            <div style={{ width: '100%', padding: '3rem, 4rem' }}>
              {/* main screen */}
              {/* <span>videoDetail: {VideoDetail.writer._id}</span> */}
              <video
                style = {{ width: "100%" }}
                src = {`http://localhost:5000/${VideoDetail.filePath}`}
                controls
              />
              {/* title, like, subscribe */}
              <List.Item 
                actions={[<Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>]}
              >
                <List.Item.Meta
                  avatar = {<Avatar src={VideoDetail.writer && VideoDetail.writer.image} />}
                  title = {VideoDetail.writer.name}
                  description = {VideoDetail.description}
                />
              </List.Item>
              {/* reply */}
              <Comment />
            </div>
          </Col>
          <Col lg={6} xs={24}>
            <SideVideo />
          </Col>
        </Row>
        ) : (
          <span>...loading</span>
        )}
      </div>
    ); 
}

export default VideoDetailPage;
