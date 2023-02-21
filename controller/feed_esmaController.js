const express = require('express');
const router = express.Router();
const feed_esma = require('../models/feed_esma');

//ROUTES
router.get('/', async (req, res) => {
    try {
        const posts = await feed_esma.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const post = new feed_esma({
        /*
        Time	        datetime
        flow_rate       double(20,10)
        temp	        double(20,10)
        avg_weight	    double(20,10)
        count	        int(11)
        predict_feed    int(11)
        real_feed	    int(11)
        */
        Time: req.body.Time,
        flow_rate: req.body.flow_rate,
        temp: req.body.temp,
        avg_weight: req.body.avg_weight,
        count: req.body.count,
        predict_feed: req.body.predict_feed,
        real_feed: req.body.real_feed,
    });

    try {
        //console.log("save: " + post);
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

//SPRCIFIC POST
router.get('/:postId', async (req, res) => {
    try {
        //console.log("get: " + req.params.postId);
        const post = await feed_esma.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        //console.log("delete: " + req.params.postId);
        const removePost = await feed_esma.find({ _id: req.params.postId }).deleteOne();
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        //console.log("update: " + req.params.postId);
        const updatePost = await feed_esma.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    Time: req.body.Time,
                    flow_rate: req.body.flow_rate,
                    temp: req.body.temp,
                    avg_weight: req.body.avg_weight,
                    count: req.body.count,
                    predict_feed: req.body.predict_feed,
                    real_feed: req.body.real_feed,
                }
            }
        );
        req.json(updatePost);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;

module.exports.postData = async function (data) {
    for (let i in data) {
        const new_feed_esma = new feed_esma({
            Time: data[i]['Time'],
            flow_rate: data[i]['flow_rate'],
            temp: data[i]['temp'],
            avg_weight: data[i]['avg_weight'],
            count: data[i]['count'],
            predict_feed: data[i]['predict_feed'],
            real_feed: data[i]['real_feed'],
        });
        const newPost = await new_feed_esma.save();
    }
}