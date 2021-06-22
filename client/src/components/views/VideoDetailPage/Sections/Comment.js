import Axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";

function Comment({ videoId, CommentList, refresh }) {
  const user = useSelector((state) => state.user);
  const [Comment, setComment] = useState("");

  const handleChange = (e) => setComment(e.currentTarget.value);
  

  const onSubmit = (e) => {
    e.preventDefault();
    const vars = {
      content: Comment,
      writer: user.userData._id,
      postId: videoId,
    };
    //console.log(vars)
    Axios.post("/api/comment/saveComment", vars).then((response) => {
      if (response.data.success) {
        // console.log(response.data.result);
        refresh(response.data.result);
        setComment("");
      } else {
        alert("cannot save reply!");
      }
    });
  };

  return (
    <div style={{ marginLeft: "1rem" }}>
      <br />
      <p>Replies</p>
      <hr />
      {/* root comment form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          placeholder="Enter your comment"
        />

        <br />
        <button
          style={{ width: "20%", height: "52px", marginLeft: "1rem" }}
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
      <br />
      {/* Comments Lists */}
      {CommentList &&
        CommentList.map(
          (comment, index) =>
            (!comment.responseTo && (
              <SingleComment
                key={index}
                user={user}
                videoId={videoId}
                comment={comment}
                refresh={refresh}
              />
            )
        ))}
    </div>
  );
}

export default Comment;
