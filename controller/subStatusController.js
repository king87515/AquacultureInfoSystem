const express = require('express');
const router = express.Router();
const sub_status = require('../models/sub_status');

//ROUTES
router.get('/', async (req, res) => {
    try {
        const posts = await sub_status.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const post = new sub_status({
        userName: req.body.userName,
        userId: req.body.userId,
        isSub: req.body.isSub,
        Token: req.body.Token,
    });

    try {
        //console.log("save: " + post);
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

// //SPRCIFIC POST
// router.get('/:postId', async (req, res) => {
//     try {
//         //console.log("get: " + req.params.postId);
//         const post = await sub_status.findById(req.params.postId);
//         res.json(post);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

//get by userID
router.get('/:userId', async (req, res) => {
    try {
        // console.log("get: " + req.params.userId);
        const post = await sub_status.findOne({ userId: req.params.userId });
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        //console.log("delete: " + req.params.postId);
        const removePost = await sub_status.find({ _id: req.params.postId }).deleteOne();
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
});

// //Update a post
// router.patch('/:postId', async (req, res) => {
//     try {
//         //console.log("update: " + req.params.postId);
//         const updatePost = await sub_status.updateOne(
//             { _id: req.params.postId },
//             {
//                 $set: {
//                     userName: req.body.userName,
//                     userId: req.body.userId,
//                     isSub: req.body.isSub,
//                     Token: req.body.Token,
//                 }
//             }
//         );
//         req.json(updatePost);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

//Update a post by userID
router.patch('/:userId', async (req, res) => {
    try {
        // console.log("update: " + req.params.userId);
        const updatePost = await sub_status.updateOne(
            { userId: req.params.userId },
            {
                $set: {
                    isSub: req.body.isSub,
                },
                $addToSet: {

                    Token: req.body.Token,
                }
            }
        );
        req.json(updatePost);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;
