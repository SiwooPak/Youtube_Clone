const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");
const multer = require("multer");
const { auth } = require("../middleware/auth");


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


    // user.save((err, doc) => {
    //     if (err) return res.json({ success: false, err });
    //     return res.status(200).json({
    //         success: true
    //     });
    // });
});



module.exports = router;
