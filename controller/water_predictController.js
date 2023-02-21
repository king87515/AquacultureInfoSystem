const express = require('express');
const router = express.Router();
const water_predict = require('../models/water_predict');

//ROUTES
router.get('/', async (req, res) => {
    try {
        const posts = await water_predict.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const post = new water_predict({
        /*
        predict_time	datetime	    預測時間
        start_time	    datetime	    第一筆預測時間
        data_type	    varchar(10)	    資料種類
        value	        double(10,4)	預測數值
        duration	    varchar(3)	    預測間隔
        create_time	    datetime	    創建時間
        */
        predict_time: req.body.predict_time,
        start_time: req.body.start_time,
        data_type: req.body.data_type,
        value: req.body.value,
        duration: req.body.duration,
        create_time: req.body.create_time,
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
        const post = await water_predict.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        //console.log("delete: " + req.params.postId);
        const removePost = await water_predict.find({ _id: req.params.postId }).deleteOne();
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        //console.log("update: " + req.params.postId);
        const updatePost = await water_predict.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    predict_time: req.body.predict_time,
                    start_time: req.body.start_time,
                    data_type: req.body.data_type,
                    value: req.body.value,
                    duration: req.body.duration,
                    create_time: req.body.create_time,
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
        const new_water_predict = new water_predict({
            predict_time: data[i]['predict_time'],
            start_time: data[i]['start_time'],
            data_type: data[i]['data_type'],
            value: data[i]['value'],
            duration: data[i]['duration'],
            create_time: data[i]['create_time'],
        });
        const newPost = await new_water_predict.save();
    }
}