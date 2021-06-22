import React from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";

const TextArea = Input;

function SingleComment({videoId, comment, user}) {
  const [OpenReply, setOpenReply] = useState(false);
  const [ReplyContent, setReplyContent] = useState("");

  const action = [
    <span onClick={()=> setOpenReply(!OpenReply)} key="comment-basic-reply-to">
      ReplyTo
    </span>
  ];

  const onHandleChange = e => {
    setReplyContent(e.currentTarget.value);
  }

  const onReplySubmit  = e => {
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
                refreshFunc(response.data.result);
                setReplyContent("");
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
        avatar={<Avatar src alt />} 
        content 
        />
      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onReplySubmit}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
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
