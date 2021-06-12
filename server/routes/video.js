const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");
const multer = require("multer");
const { auth } = require("../middleware/auth");
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
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post("/thumbnail", (req, res) => {
    let filePath = "";
    let fileDuration = "";

    //get video running time
    ffmpeg.ffprobe(req.body.url, (err, metadata) => {
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    })

    // thumbnail save
    ffmpeg(req.body.url)
    .on('filenames', (filenames) => {
        console.log(`Will generate ${filenames.join(', ')}`);
        console.log(filenames);

        filePath = `uploads/thumbnails/${filenames[0]}`
    })
    .on('end', () => {
        console.log('Screenshots taken');
        return res.json({ success: true, url: filePath, fileDuration: fileDuration})
    })
    .on('error', (err) => {
        console.log(err);
        return res.json({success: false, err});
    })
    .screenshots({
        // 스크린샷 갯수와 경로, 썸네일 사이즈
        count: 3,
        folder: 'uploads/thumbnails',
        size: '320x240',

        filename: 'thumbnail-%b.png'
    })

});

module.exports = router;
