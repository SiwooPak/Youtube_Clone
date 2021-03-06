import React, { useEffect, useState } from "react";
import { Tooltip, Icon } from "antd";
import Axios from "axios";

function LikeDisLike(props) {
  const [LikesNumber, setLikesNumber] = useState(0);
  const [DisLikesNumber, setDisLikesNumber] = useState(0);
  const [IsLike, setIsLike] = useState(false);
  const [IsDisLike, setIsDisLike] = useState(false);

  let variable = {};

  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    Axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
          // 좋아요 누른 수
        setLikesNumber(response.data.likes.length);
        // 내가 좋아요를 눌렀는지 확인
        response.data.likes.map(like => {
            if(like.userId === props.userId) setIsLike(true);
        })
      } else {
        alert("Failed to get Likes'info");
      }
    });

    Axios.post("/api/like/getDisLikes", variable).then((response) => {
      if (response.data.success) {
          // 싫어요 누른 수
        setDisLikesNumber(response.data.dislikes.length);
        // 내가 싫어요를 눌렀는지 확인.
        response.data.dislikes.map(dislike => {
            if(dislike.userId === props.userId) setIsDisLike(true);
        })
      } else {
        alert("Failed to get DisLikes'info");
      }
    });
  });

  const onLike = () => {
      if(!IsLike) {
        Axios.post('/api/like/likeUp', variable)
            .then(response => {
                if(response.data.success) {
                    setLikesNumber(LikesNumber+1);
                    setIsLike(true);
                    if(IsDisLike) {
                        setIsDisLike(false);
                        setDisLikesNumber(DisLikesNumber-1);
                    }
                } else {
                    alert("좋아요 up이벤트 처리 실패")
                }
            })
      } else {
        Axios.post('/api/like/likeDown', variable)
        .then(response => {
            if(response.data.success) {
                setLikesNumber(LikesNumber-1);
                setIsLike(false);
            } else {
                alert("좋아요 down이벤트 처리 실패")
            }
        }) 
      }
  }

  const onDisLike = () => {
    if(!IsDisLike) { 
      Axios.post('/api/like/dislikeUp', variable)
          .then(response => {
              if(response.data.success) {
                  setDisLikesNumber(DisLikesNumber+1);
                  setIsDisLike(true);
                  if(IsLike) {
                      setIsLike(false);
                      setLikesNumber(LikesNumber-1);
                  }
              } else {
                  alert("싫어요 up이벤트 처리 실패")
              }
          })
    } else {
      Axios.post('/api/like/dislikeDown', variable)
      .then(response => {
          if(response.data.success) {
              setDisLikesNumber(DisLikesNumber-1);
              setIsDisLike(false);
          } else {
              alert("좋아요 down이벤트 처리 실패")
          }
      }) 
    }
}

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon type="like" theme={IsLike ? "filled":"outlined"} onClick={onLike} />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>
          {LikesNumber}
        </span>
      </span>
      &nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="DisLike">
          <Icon type="dislike" theme={IsDisLike ? "filled":"outlined"} onClick={onDisLike} />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>
          {DisLikesNumber}
        </span>
      </span>
    </div>
  );
}

export default LikeDisLike;
