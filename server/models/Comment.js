const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const saltRounds = 10;

const moment = require("moment");

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }
}, {timestamps: true})




const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }