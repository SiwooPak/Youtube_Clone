const express = require('express');
const router = express.Router();

const { Subscriber } = require("../models/Subscriber");


router.post("/subscribeNum", (req, res) => {
    let userTo = req.body.userTo;
    console.log(userTo) 
    Subscriber.find({ 'userTo': userTo })
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err);
        console.log(subscribe);
        console.log(subscribe.length);
        return res.status(200).json({ success: true, subscribeNumber: subscribe.length});
    })
});

router.post("/subscribed", (req, res) => {
    
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err);

        let result = false;

        if(subscribe.length > 0) {
            result = true;
        }
        console.log(result);
        return res.status(200).json({ success: true, subscribed: result});
    })
});

router.post("/unSubscribe", (req, res) => {
    console.log('unsub');
    Subscriber.findOneAndDelete({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
    .exec((err, doc) => {
        if(err) return res.status(400).json({ success: false, err});
        return res.status(200).json({ success: true, doc });
    });
});

router.post("/subs", (req, res) => {
    console.log('sub');
    const subscribe = new Subscriber(req.body);

    subscribe.save((err, doc) => {
        if(err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true });
    })
});

module.exports = router;
