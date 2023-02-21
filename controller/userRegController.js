const express = require('express');
const router = express.Router();
const user_reg = require('../models/user_reg');
const bcrypt = require('bcryptjs'); //加密
//ROUTES
router.get('/', async (req, res) => {
    try {
        const posts = await user_reg.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    var hashPwd = await bcrypt.hash(req.body.userPwd, 10);
    const post = new user_reg({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone,
        userPwd: hashPwd,
        createTime: Date.now(),
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
        const post = await user_reg.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        //console.log("delete: " + req.params.postId);
        const removePost = await user_reg.find({ _id: req.params.postId }).deleteOne();
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    var hashPwd = await bcrypt.hash(req.body.userPwd, 10);
    try {
        //console.log("update: " + req.params.postId);
        const updatePost = await user_reg.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    fullName: req.body.fullName,
                    userName: req.body.userName,
                    email: req.body.email,
                    phone: req.body.phone,
                    userPwd: hashPwd,
                    createTime: Date.now(),
                }
            }
        );
        req.json(updatePost);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;