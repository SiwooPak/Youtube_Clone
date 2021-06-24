import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment({
  CommentList,
  user,
  videoId,
  refresh,
  parentCommentId,
}) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComment, setOpenReplyComment] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    CommentList.map((comment) => {
      if (comment.responseTo === parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [CommentList, parentCommentId]);

  let renderReplyComment = (parentCommentId) => 
    CommentList.map((comment, index) => (
      <React.Fragment>
         {/* reply:{parentCommentId}
         responseTo:{comment.responseTo} */}
        {comment.responseTo === parentCommentId && (
          <div style={{width: "80%", marginLeft: "5rem"}}>
            <SingleComment
              user={user}
              videoId={videoId}
              comment={comment}
              refresh={refresh}
            />
            <ReplyComment
              CommentList={CommentList}
              user={user}
              videoId={videoId}
              refresh={refresh}
              parentCommentId={comment._id}
            />
          </div>
        )}
      </React.Fragment>
    ));

  const handleChange = (e) => {
    setOpenReplyComment(!OpenReplyComment);
    // e.target.style.visibility = 'hidden';
  }

  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p id='reply'
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={handleChange}
        >
          답글보기({ChildCommentNumber}) 
        </p>
      )}
      {OpenReplyComment && renderReplyComment(parentCommentId)}
    </div>
  );
}

export default ReplyComment;
