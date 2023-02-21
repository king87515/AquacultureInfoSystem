const express = require('express');
const router = express.Router();
const water = require('../models/water');
//ROUTES
router.get('/', async (req, res) => {
    try {
        const posts = await water.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }

});

router.post('/', async (req, res) => {
    const post = new water({
        /*
        Time	            datetime
        Temperature_DO	    double(20,10)
        dissolveOxygen	    double(20,10)
        Temperature_ec	    double(20,10)
        conductivity	    double(20,10)
        Temperature_flow	double(20,10)
        compA	            double(20,10)
        compB	            double(20,10)
        xAxisVelocity	    double(20,10)
        yAxisVelocity	    double(20,10)
        totalVelocity	    double(20,10)
        direction	        double(20,10)
        currentdirection	double(20,10)
        northSouthCurrent	double(20,10)
        eastWestCurrent	    double(20,10)
        powerVoltage	    double(20,10) 
        */
        Time: req.body.Time,
        Temperature_DO: req.body.Temperature_DO,
        dissolveOxygen: req.body.dissolveOxygen,
        Temperature_ec: req.body.Temperature_ec,
        conductivity: req.body.conductivity,
        Temperature_flow: req.body.Temperature_flow,
        compA: req.body.compA,
        compB: req.body.compB,
        xAxisVelocity: req.body.xAxisVelocity,
        yAxisVelocity: req.body.yAxisVelocity,
        totalVelocity: req.body.totalVelocity,
        direction: req.body.direction,
        currentdirection: req.body.currentdirection,
        northSouthCurrent: req.body.northSouthCurrent,
        eastWestCurrent: req.body.eastWestCurrent,
        powerVoltage: req.body.powerVoltage,
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
        const post = await water.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        //console.log("delete: " + req.params.postId);
        const removePost = await water.find({ _id: req.params.postId }).deleteOne();
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        //console.log("update: " + req.params.postId);
        const updatePost = await water.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    Time: req.body.Time,
                    Temperature_DO: req.body.Temperature_DO,
                    dissolveOxygen: req.body.dissolveOxygen,
                    Temperature_ec: req.body.Temperature_ec,
                    conductivity: req.body.conductivity,
                    Temperature_flow: req.body.Temperature_flow,
                    compA: req.body.compA,
                    compB: req.body.compB,
                    xAxisVelocity: req.body.xAxisVelocity,
                    yAxisVelocity: req.body.yAxisVelocity,
                    totalVelocity: req.body.totalVelocity,
                    direction: req.body.direction,
                    currentdirection: req.body.currentdirection,
                    northSouthCurrent: req.body.northSouthCurrent,
                    eastWestCurrent: req.body.eastWestCurrent,
                    powerVoltage: req.body.powerVoltage,
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
        const new_water = new water({
            Time: data[i]['Time'],
            Temperature_DO: data[i]['Temperature_DO'],
            dissolveOxygen: data[i]['dissolveOxygen'],
            Temperature_ec: data[i]['Temperature_ec'],
            conductivity: data[i]['conductivity'],
            Temperature_flow: data[i]['Temperature_flow'],
            compA: data[i]['compA'],
            compB: data[i]['compB'],
            xAxisVelocity: data[i]['xAxisVelocity'],
            yAxisVelocity: data[i]['yAxisVelocity'],
            totalVelocity: data[i]['totalVelocity'],
            direction: data[i]['direction'],
            currentdirection: data[i]['currentdirection'],
            northSouthCurrent: data[i]['northSouthCurrent'],
            eastWestCurrent: data[i]['eastWestCurrent'],
            powerVoltage: data[i]['powerVoltage'],
        });
        const newPost = await new_water.save();
    }
}