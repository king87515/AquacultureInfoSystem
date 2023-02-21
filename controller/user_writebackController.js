const express = require('express');
const router = express.Router();
const user_writeback = require('../models/user_writeback');

//ROUTES
router.get('/', async (req, res) => {
    try {
        const posts = await user_writeback.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const post = new user_writeback({
        /*
        time	        datetime	    投餌編號
        amount  	    double(20,10)	池號
        weight  	    double(20,10)	投餌日期
        length	        double(20,10)	魚隻數量
        width	        double(20,10)	
        predict_feed	double(20,10)	
        real_feed	    double(20,10)	
        intensity	    int(11)	
        */
        time: req.body.time,
        amount: req.body.amount,
        weight: req.body.weight,
        length: req.body.length,
        width: req.body.width,
        predict_feed: req.body.predict_feed,
        real_feed: req.body.real_feed,
        intensity: req.body.intensity,
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
        const post = await user_writeback.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        //console.log("delete: " + req.params.postId);
        const removePost = await user_writeback.find({ _id: req.params.postId }).deleteOne();
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        //console.log("update: " + req.params.postId);
        const updatePost = await user_writeback.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    time: req.body.time,
                    amount: req.body.amount,
                    weight: req.body.weight,
                    length: req.body.length,
                    width: req.body.width,
                    predict_feed: req.body.predict_feed,
                    real_feed: req.body.real_feed,
                    intensity: req.body.intensity,
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
        const new_user_writeback = new user_writeback({
            time: data[i]['time'],
            amount: data[i]['amount'],
            weight: data[i]['weight'],
            length: data[i]['length'],
            width: data[i]['width'],
            predict_feed: data[i]['predict_feed'],
            real_feed: data[i]['real_feed'],
            intensity: data[i]['intensity'],
        });
        const newPost = await new_user_writeback.save();
    }
}