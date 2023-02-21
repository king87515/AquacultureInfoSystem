const express = require('express');
const router = express.Router();
const feed = require('../models/feed');

//ROUTES
router.get('/', async (req, res) => {
    try {
        const posts = await feed.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const post = new feed({
        /*
        No	        varchar(10)	投餌編號
        Cage	    varchar(10)	池號
        Feed_date	date	    投餌日期
        Num	        int(10)	    魚隻數量
        Feed_num	int(10)	    投餌量
        Feed_no	    varchar(5)	投餌料號
        Death	    int(5)	    死亡數量
        */
        No: req.body.No,
        Cage: req.body.Cage,
        Feed_date: req.body.Feed_date,
        Num: req.body.Num,
        Feed_num: req.body.Feed_num,
        Feed_no: req.body.Feed_no,
        Death: req.body.Death,
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
        const post = await feed.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        //console.log("delete: " + req.params.postId);
        const removePost = await feed.find({ _id: req.params.postId }).deleteOne();
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        //console.log("update: " + req.params.postId);
        const updatePost = await feed.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    No: req.body.No,
                    Cage: req.body.Cage,
                    Feed_date: req.body.Feed_date,
                    Num: req.body.Num,
                    Feed_num: req.body.Feed_num,
                    Feed_no: req.body.Feed_no,
                    Death: req.body.Death,
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
        const new_feed = new feed({
            No: data[i]['No'],
            Cage: data[i]['Cage'],
            Feed_date: data[i]['Feed_date'],
            Num: data[i]['Num'],
            Feed_num: data[i]['Feed_num'],
            Feed_no: data[i]['Feed_no'],
            Death: data[i]['Death'],
        });
        const newPost = await new_feed.save();
    }
}