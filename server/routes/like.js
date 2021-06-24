const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");


router.post("/getLikes", (req, res) => {
    let variable = {}

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId}
    } else {
        variable = {commentId: req.body.commentId}
    }

    Like.find(variable)
        .exec((err, likes) => {
            if(err) return res.send(err);
            return res.status(200).json({success: true, likes})
        })
});

router.post("/getDisLikes", (req, res) => {
    let variable = {}

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId}
    } else {
        variable = {commentId: req.body.commentId}
    }

    DisLike.find(variable)
        .exec((err, dislikes) => {
            if(err) return res.send(err);
            return res.status(200).json({success: true, dislikes})
        })
});

router.post("/likeUp", (req, res) => {
    let variable = {}

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId:req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId:req.body.userId}
    }

    // like 정보에 클릭 정보를 넣어줌
    const like = new Like(variable);

    like.save((err, likeResult) => {
        if(err) return res.send(err);

        // 만약에 dislike에 클릭되어 있다면.
        DisLike.findOneAndDelete(variable)
            .exec((err, dislikeResult) => {
                if(err) return res.status(400).json({success: false, err});
                res.status(200).json({success: true})
            })
    })
    
});

router.post("/likeDown", (req, res) => {
    let variable = {}

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId:req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId:req.body.userId}
    }

    Like.findOneAndDelete(variable)
        .exec((err, reuslt) => {
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({success: true});
        })
    
});



router.post("/dislikeUp", (req, res) => {
    let variable = {}

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId:req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId:req.body.userId}
    }

    // dislike 정보에 클릭 정보를 넣어줌
    const dislike = new DisLike(variable);

    dislike.save((err, dislikeResult) => {
        if(err) return res.send(err);

        // 만약에 like에 클릭되어 있다면.
        Like.findOneAndDelete(variable)
            .exec((err, dislikeResult) => {
                if(err) return res.status(400).json({success: false, err});
                return res.status(200).json({success: true})
            })
    })
    
});

router.post("/dislikeDown", (req, res) => {
    let variable = {}

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId:req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId:req.body.userId}
    }
    //dislike 도큐먼트에서 해당 아이딘 값을 찾아서 삭제
    DisLike.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({success: true});
        })
    
});

module.exports = router;
