const express = require('express');
const router = express.Router();

// Import Routes
const a13Route = require('../controller/a13Controller');
const analysis_recordRoute = require('../controller/analysis_recordController');
const cage_washRoute = require('../controller/cage_washController');
const feedRoute = require('../controller/feedController');

const feed_esmaRoute = require('../controller/feed_esmaController');
const fish_partRoute = require('../controller/fish_partController');
const fish_recordRoute = require('../controller/fish_recordController');
const lng_waterRoute = require('../controller/lng_waterController');

const userRoute = require('../controller/userController');
const user_writebackRoute = require('../controller/user_writebackController');
const waterRoute = require('../controller/waterController');
const water_predictRoute = require('../controller/water_predictController');

const vrUserRoute = require('../controller/vrUserController');

const userRegRoute = require('../controller/userRegController');

const subStatusRoute = require('../controller/subStatusController');

// Middle Ware
router.use('/a13', a13Route);
router.use('/analysis_record', analysis_recordRoute);
router.use('/cage_wash', cage_washRoute);
router.use('/feed', feedRoute);

router.use('/feed_esma', feed_esmaRoute);
router.use('/fish_part', fish_partRoute);
router.use('/fish_record', fish_recordRoute);
router.use('/lng_water', lng_waterRoute);

router.use('/user', userRoute);
router.use('/user_writeback', user_writebackRoute);
router.use('/water', waterRoute);
router.use('/water_predict', water_predictRoute);

//vrUserRoute
router.use('/vrUser', vrUserRoute);

//userReg 登入
router.use('/userReg', userRegRoute);

//subStatus
router.use('/subStatus', subStatusRoute);

// 確認登入使用者
function ensureAuthenticated(req, res, next) {
    // console.log("res:",res);
    // console.log(req.user);
    // console.log("req.isAuthenticated():", req.isAuthenticated());
    if (req.isAuthenticated()) {
        if (req.user != undefined) {
            // console.log("ensureAuthenticated next");
            return next();

        }
    }
    //req.flash('error_msg', 'Please log in to view that resource');
    res.redirect("/");
}

module.exports = router;

