import Axios from 'axios';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';


function Comment({ videoId, comments, refreshFunc }) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("");

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const

    const onSubmit = (e) => {
        e.preventDefault();
        const vars = {
            content: CommentValue,
            writer: user.userData._id,
            postId: videoId
        }
        //console.log(vars)
        Axios.post('/api/comment/saveComment', vars)
            .then(response => {
                if(response.data.success) {
                    // console.log(response.data.result);
                    refreshFunc(response.data.result);
                    setCommentValue("");
                } else {
                    alert('cannot save reply!')
                }
            })
    }    

    return (
        <div style={{ marginLeft: '1rem'}}>
            <br />
            <p>Replies</p>
            <hr />
            {/* root comment form */}
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleChange}
                    placeholder="Enter your comment"
                />

                <br />
                <button style={{width:'20%', height: '52px', marginLeft: '1rem'}} onClick={onSubmit}>
                    Submit
                </button>
            </form>
            <br />
            {/* Comments Lists */}
            {comments && comments.map((comment, index) => {
                (!comment.responseTo &&
                    <SingleComment 
                        key={index} 
                        user={user} 
                        videoId={videoId} 
                        comment={comment}
                        refreshFunc={refreshFunc}    
                    />
                )
            })

            }
        </div>
    )
}

export default Comment
