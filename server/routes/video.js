const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const multer = require("multer");
const { auth } = require("../middleware/auth");
const { Subscriber } = require("../models/Subscriber");

let ffmpeg = require("fluent-ffmpeg");
const { compareSync } = require('bcrypt');

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(ext !== '.mp4') {
            return cb(res.stauts(400).end('only mp4 is allowed'), false);
        }
        cv(null, true);
    }
});

const upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {

    // video save server
    upload(req, res, err => {
        if(err) return res.json({ success: false, err})
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post("/thumbnail", (req, res) => {
    let thumbsFilePath = "";
    let fileDuration = "";
    //console.log(`req.body.filePath: ${req.body.filePath}`)
    //get video running time
    ffmpeg.ffprobe(req.body.filePath, (err, metadata) => {
        //console.dir(metadata);
        //console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    })

    // thumbnail save
    ffmpeg(req.body.filePath)
    .on('filenames', (filenames) => {
        //onsole.log(`Will generate ${filenames.join(', ')}`);
        //console.log(filenames);

        thumbsFilePath = `uploads/thumbnails/${filenames[0]}`;
        console.log(`file path: ${thumbsFilePath}`);
    })
    .on('end', () => {
        //console.log('Screenshots taken');
        return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
    })
    .on('error', (err) => {
        console.log(err);
        return res.json({success: false, err});
    })
    .screenshots({
        // 스크린샷 갯수와 경로, 썸네일 사이즈
        count: 1,
        folder: 'uploads/thumbnails',
        size: '320x240',

        filename: 'thumbnail-%b.png'
    })

});

router.post("/uploadVideo", (req, res) => {
    // mongodb save
    const video = new Video(req.body);

    video.save((err,doc) => {
        if(err) return res.json({success: false, err});
        res.status(200).json({success: true});
    })
});

router.get("/getVideos", (req, res) => {
    // 비디오 정보를 가져온다. 
    Video.find()
        .populate('writer')
        .exec((err,videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({success: true, videos})
        })
    
});

router.post("/getVideoDetail", (req, res) => {
    // 비디오 정보를 가져온다. 
    let videoId = req.body.videoId;
    //console.log(req.body.videoId);
    Video.findOne({"_id": videoId})
        .populate("writer")
        .exec((err, videoDetail) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, videoDetail})
        })
    
});

router.post("/getSubVideos", (req, res) => {
    // 자신의 아이디를 가지고 구독하는 사람들을 찾는다.
    let userFrom = req.body.userFrom;
    //console.log(`getSubVideos's userFrom : ${userFrom}`)
    Subscriber.find({ 'userFrom': userFrom})
    .exec((err,subInfo) => {
        if(err) return res.status(400).send(err);
        
        let subscribedList = [];
        subInfo.map((subscriber,i) => {
            subscribedList.push(subscriber.userTo);
        })

        // 구독하는 유저의 비디오를 가져온다.
        Video.find({ 'writer' : { $in: subscribedList}})
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, videos})
        })
    })
    
    
});


module.exports = router;
