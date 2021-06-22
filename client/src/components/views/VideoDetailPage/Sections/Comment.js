import React from 'react'

function Comment() {
    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />
            {/* Comments Lists */}

            {/* root comment form */}
            <form style={{display: 'flex'}} onSubmit>
                <textarea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange
                    value
                    placeholder="Enter your comment"
                />

                <br />
                <button style={{width:'20%', height: '52px', marginLeft: '1rem'}}>Submit</button>
            </form>

        </div>
    )
}

export default Comment
