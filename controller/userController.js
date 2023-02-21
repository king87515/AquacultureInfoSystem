const express = require('express');
const router = express.Router();
const user = require('../models/user');

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
        /*
        id	        varchar(10)	投餌編號
        pw	        varchar(10)	池號
        Create_time	datetime	投餌日期
        authorize	int(2)	    魚隻數量
        */
        id: req.body.id,
        pw: req.body.pw,
        Create_time: req.body.Create_time,
        authorize: req.body.authorize,
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
                    pw: req.body.pw,
                    Create_time: req.body.Create_time,
                    authorize: req.body.authorize,
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
        const new_user = new user({
            id: data[i]['id'],
            pw: data[i]['pw'],
            Create_time: data[i]['Create_time'],
            authorize: data[i]['authorize'],
        });
        const newPost = await new_user.save();
    }
}