const express = require('express');
const router = express.Router();
const fish_part = require('../models/fish_part');

//ROUTES
router.get('/', async (req, res) => {
    try {
        const posts = await fish_part.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const post = new fish_part({
        /*
        time	    datetime
        fish_index	double(20,10)
        length	    double(20,10)
        height	    double(20,10)
        weight	    double(20,10)
        amount  	double(20,10)
        */
        time: req.body.time,
        fish_index: req.body.fish_index,
        length: req.body.length,
        height: req.body.height,
        weight: req.body.weight,
        amount: req.body.amount,
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
        const post = await fish_part.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        //console.log("delete: " + req.params.postId);
        const removePost = await fish_part.find({ _id: req.params.postId }).deleteOne();
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        //console.log("update: " + req.params.postId);
        const updatePost = await fish_part.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    time: req.body.time,
                    fish_index: req.body.fish_index,
                    length: req.body.length,
                    height: req.body.height,
                    weight: req.body.weight,
                    amount: req.body.amount,
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
        const new_fish_part = new fish_part({
            time: data[i]['time'],
            fish_index: data[i]['fish_index'],
            length: data[i]['length'],
            height: data[i]['height'],
            weight: data[i]['weight'],
            amount: data[i]['amount'],
        });
        const newPost = await new_fish_part.save();
    }
}