const express = require('express');
const router = express.Router();
const analysis_record = require('../models/analysis_record');

//ROUTES
router.get('/', async (req, res) => {
    try {
        const posts = await analysis_record.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const post = new analysis_record({
        /*
        video_no	varchar(4)	    影片編號
        video_date	date	        影片日期
        data_no	    varchar(10)	    資料編號
        type	    varchar(10)	    分析系統
        len	        double(10,2)	體長
        weight	    double(10,2)	體重
        num	        double(10,2)	數量
        energy	    double(10,2)	活力
        field	    varchar(10)	    場域
        */
        video_no: req.body.video_no,
        video_date: req.body.video_date,
        data_no: req.body.data_no,
        type: req.body.type,
        len: req.body.len,
        weight: req.body.weight,
        num: req.body.num,
        energy: req.body.energy,
        field: req.body.field,
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
        const post = await analysis_record.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        //console.log("delete: " + req.params.postId);
        const removePost = await analysis_record.find({ _id: req.params.postId }).deleteOne();
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        //console.log("update: " + req.params.postId);
        const updatePost = await analysis_record.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    video_no: req.body.video_no,
                    video_date: req.body.video_date,
                    data_no: req.body.data_no,
                    type: req.body.type,
                    len: req.body.len,
                    weight: req.body.weight,
                    num: req.body.num,
                    energy: req.body.energy,
                    field: req.body.field,
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
        const new_analysis_record = new analysis_record({
            video_no: data[i]['video_no'],
            video_date: data[i]['video_date'],
            data_no: data[i]['data_no'],
            type: data[i]['type'],
            len: data[i]['len'],
            weight: data[i]['weight'],
            num: data[i]['num'],
            energy: data[i]['energy'],
            field: data[i]['field'],
        });
        const newPost = await new_analysis_record.save();
    }
}