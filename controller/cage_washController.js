const express = require('express');
const router = express.Router();
const cage_wash = require('../models/cage_wash');

//ROUTES
router.get('/', async (req, res) => {
    try {
        const posts = await cage_wash.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const post = new cage_wash({
        /*
        time	    datetime	
        seaweed	    double(20,10)	海草占比率(%)
        requirement	double(20,10)	洗網需求(1 or 0)
        f	        double(20,10)	受力(N)
        hole    	double(20,10)	破網(個)
        */
        time: req.body.time,
        seaweed: req.body.seaweed,
        requirement: req.body.requirement,
        f: req.body.f,
        hole: req.body.hole,
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
        const post = await cage_wash.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        //console.log("delete: " + req.params.postId);
        const removePost = await cage_wash.find({ _id: req.params.postId }).deleteOne();
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        //console.log("update: " + req.params.postId);
        const updatePost = await cage_wash.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    time: req.body.time,
                    seaweed: req.body.seaweed,
                    requirement: req.body.requirement,
                    f: req.body.f,
                    hole: req.body.hole,
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
        const new_cage_wash = new cage_wash({
            time: data[i]['time'],
            seaweed: data[i]['seaweed'],
            requirement: data[i]['requirement'],
            f: data[i]['f'],
            hole: data[i]['hole'],
        });
        const newPost = await new_cage_wash.save();
    }
}