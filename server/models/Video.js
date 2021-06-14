const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const saltRounds = 10;

const moment = require("moment");

const videoSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type:String,
        trim:true,
        maxlength: 50
    },
    description: {
        type: String
    },
    privatcy: {
        type: Number
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    }, 
    thumbnail: {
        type: String
    }
}, {timestamps: true})




const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }