const express = require('express');
const router = express.Router();
const user = require('../models/vrUser');

//ROUTES
router.get('/', async (req, res) => {
    try {
        const posts = await user.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const post = new user({
        id: req.body.id,
        user: req.body.user,
        password: req.body.password,
        time: req.body.time,
        objDataList: req.body.objDataList,
        camDataList: req.body.camDataList,
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
        const post = await user.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        //console.log("delete: " + req.params.postId);
        const removePost = await user.find({ _id: req.params.postId }).deleteOne();
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        //console.log("update: " + req.params.postId);
        const updatePost = await user.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    id: req.body.id,
                    user: req.body.user,
                    password: req.body.password,
                    time: req.body.time,
                    objDataList: req.body.objDataList,
                    camDataList: req.body.camDataList,
                }
            }
        );
        req.json(updatePost);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;