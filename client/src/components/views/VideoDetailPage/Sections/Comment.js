import Axios from 'axios';
import React, { useState } from 'react'
import {useSelector} from 'react-redux'


function Comment({ videoId }) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("");

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const vars = {
            content: CommentValue,
            writer: user.userData._id,
            postId: videoId
        }
        console.log(vars)
        Axios.post('/api/comment/saveComment', vars)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result);
                } else {
                    alert('cannot save reply!')
                }
            })
    }    

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />
            {/* Comments Lists */}

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

        </div>
    )
}

export default Comment
