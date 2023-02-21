const express = require('express');
const router = express.Router();
const a13 = require('../models/a13');

//ROUTES
router.get('/', async (req, res) => {
    try {
        const posts = await a13.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const post = new a13({
        /*
        Time	        datetime
        Temperature_DO	double(20,10)
        dissolveOxygen	double(20,10)
        Temperature_EC	double(20,10)
        conductivity	double(20,10)
        Temperature_PH	double(20,10)
        PH	            double(20,10)
        */
        Time: req.body.Time,
        Temperature_DO: req.body.Temperature_DO,
        dissolveOxygen: req.body.dissolveOxygen,
        Temperature_EC: req.body.Temperature_EC,
        conductivity: req.body.conductivity,
        Temperature_PH: req.body.Temperature_PH,
        PH: req.body.PH,
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
        const post = await a13.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        //console.log("delete: " + req.params.postId);
        const removePost = await a13.find({ _id: req.params.postId }).deleteOne();
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        //console.log("update: " + req.params.postId);
        const updatePost = await a13.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    Time: req.body.Time,
                    Temperature_DO: req.body.Temperature_DO,
                    dissolveOxygen: req.body.dissolveOxygen,
                    Temperature_EC: req.body.Temperature_EC,
                    conductivity: req.body.conductivity,
                    Temperature_PH: req.body.Temperature_PH,
                    PH: req.body.PH,
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
        const new_a13 = new a13({
            Time: data[i]['Time'],
            Temperature_DO: data[i]['Temperature_DO'],
            dissolveOxygen: data[i]['dissolveOxygen'],
            Temperature_EC: data[i]['Temperature_EC'],
            conductivity: data[i]['conductivity'],
            Temperature_PH: data[i]['Temperature_PH'],
            PH: data[i]['PH'],
        });
        const newPost = await new_a13.save();
    }
}

    