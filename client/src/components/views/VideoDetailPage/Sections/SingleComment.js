import React, {useState} from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";

const TextArea = Input;

function SingleComment({videoId, comment, user, refresh}) {
  const [OpenReply, setOpenReply] = useState(false);
  const [ReplyContent, setReplyContent] = useState("");
  // console.log(comment.comment) 
  
  const OpenHandle = () => {
    setOpenReply(!OpenReply);
    setReplyContent("");
  }

  const actions = [
    <span onClick={OpenHandle} key="comment-basic-reply-to">
      ReplyTo
    </span>
  ];

  const onHandleChange = e => {
    setReplyContent(e.currentTarget.value);
  }

  const onSubmit  = e => {
    e.preventDefault();
    const vars = {
        content: ReplyContent,
        writer: user.userData._id,
        postId: videoId,
        responseTo: comment._id
    }
    Axios.post('/api/comment/saveComment', vars) 
        .then( response => {
            if(response.data.success) {
                setOpenReply(!OpenReply);
                setReplyContent("");
                refresh(response.data.result);
            } else {
                alert("can't save reply!")
            }
        })
  }

  return (
    <div>
      <Comment 
        actions = {actions} 
        author = {comment.writer.name} 
        avatar={<Avatar src={comment.writer.image} alt="image" />} 
        content= {
            <p>
                {comment.content}
            </p>
        } 
        />
      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: "80%", marginLeft: "5rem", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={ReplyContent}
            placeholder="Enter your Reply"
          />

          <br />
          <Button style={{ marginLeft: "1rem" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
