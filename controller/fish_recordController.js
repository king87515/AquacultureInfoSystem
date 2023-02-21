const express = require('express');
const router = express.Router();
const fish_record = require('../models/fish_record');

//ROUTES
router.get('/', async (req, res) => {
    try {
        const posts = await fish_record.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const post = new fish_record({
        /*
        Sample_date	date 	
        Cage_no	    char(10)	
        Sample_no	char(12)	
        Specie  	varchar(10)	
        Body_height	double(5,3)	體高
        Body_width	double(5,3)	體寬
        Body_len	double(5,3)	尾叉長
        Tail_height	double(5,3)	尾柄高
        Eye_radius	double(5,3)	眼徑
        Weight  	int(5)	
        */
        Sample_date: req.body.Sample_date,
        Cage_no: req.body.Cage_no,
        Sample_no: req.body.Sample_no,
        Specie: req.body.Specie,
        Body_height: req.body.Body_height,
        Body_width: req.body.Body_width,
        Body_len: req.body.Body_len,
        Tail_height: req.body.Tail_height,
        Eye_radius: req.body.Eye_radius,
        Weight: req.body.Weight,
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
        console.log("get: " + req.params.postId);
        const post = await fish_record.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        //console.log("delete: " + req.params.postId);
        const removePost = await fish_record.find({ _id: req.params.postId }).deleteOne();
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        //console.log("update: " + req.params.postId);
        const updatePost = await fish_record.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    Sample_date: req.body.Sample_date,
                    Cage_no: req.body.Cage_no,
                    Sample_no: req.body.Sample_no,
                    Specie: req.body.Specie,
                    Body_height: req.body.Body_height,
                    Body_width: req.body.Body_width,
                    Body_len: req.body.Body_len,
                    Tail_height: req.body.Tail_height,
                    Eye_radius: req.body.Eye_radius,
                    Weight: req.body.Weight,
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
        const new_fish_record = new fish_record({
            Sample_date: data[i]['Sample_date'],
            Cage_no: data[i]['Cage_no'],
            Sample_no: data[i]['Sample_no'],
            Specie: data[i]['Specie'],
            Body_height: data[i]['Body_height'],
            Body_width: data[i]['Body_width'],
            Body_len: data[i]['Body_len'],
            Tail_height: data[i]['Tail_height'],
            Eye_radius: data[i]['Eye_radius'],
            Weight: data[i]['Weight'],

        });
        const newPost = await new_fish_record.save();
    }
}