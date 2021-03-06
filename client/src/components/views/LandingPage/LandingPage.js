import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row } from "antd";
import Axios from "axios";
import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [Video, setVideo] = useState([]);

  //dom이 업뎃 될때 1번
  useEffect(() => {
    Axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        //console.log(response.data);
        setVideo(response.data.videos);
      } else {
        alert("video null.");
      }
    });
  }, []);

  const renderCards = Video.map((video, index) => {
    let min = Math.floor(video.duration / 60);
    let sec = Math.floor(video.duration - min * 60);

    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
            ></img>
            <div className="duration">
              <span>
                {min}:{sec}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          description=""
        />
        <span>{video.writer.name}</span>
        <span style={{ marginLeft: "3rem" }}>{video.views} views</span> -{" "}
        <span>{moment(video.createdAt).format("MMM Do YY")}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Recommended</Title>
      <br />
      <Row gutter={[32, 16]}>
        {renderCards}
      </Row>
    </div>
  );
}

export default LandingPage;
