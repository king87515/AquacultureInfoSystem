const fs = require('fs');

// const a13 = require('../../models/a13');
// const analysis_record = require('../../models/analysis_record');
// const cage_wash = require('../../models/cage_wash');
// const feed = require('../../models/feed');
// const feed_esma = require('../../models/feed_esma');
// const fish_part = require('../../models/fish_part');
// const fish_record = require('../../models/fish_record');
// const lng_water = require('../../models/lng_water');
// const un_pw = require('../../models/un_pw'); // no use
// const user = require('../../models/user');
// const user_writeback = require('../../models/user_writeback');
// const water = require('../../models/water');
// const water_predict = require('../../models/water_predict');

const a13Controller = require('../../controller/a13Controller');
const analysis_recordController = require('../../controller/analysis_recordController');
const cage_washController = require('../../controller/cage_washController');
const feedController = require('../../controller/feedController');
const feed_esmaController = require('../../controller/feed_esmaController');
const fish_partController = require('../../controller/fish_partController');
const fish_recordController = require('../../controller/fish_recordController');
const lng_waterController = require('../../controller/lng_waterController');
const un_pwController = require('../../controller/un_pwController'); //no use
const userController = require('../../controller/userController');
const user_writebackController = require('../../controller/user_writebackController');
const waterController = require('../../controller/waterController');
const water_predictController = require('../../controller/water_predictController');

//json data file name
const fileAry = [
    ["a13", a13Controller], ["analysis_record", analysis_recordController], ["cage_wash", cage_washController],
    ["feed", feedController], ["feed_esma", feed_esmaController], ["fish_part", fish_partController],
    ["fish_record", fish_recordController], ["lng_water", lng_waterController], ["user", userController],
    ["user_writeback", user_writebackController], ["water", waterController], ["water_predict", water_predictController],
];

module.exports = {
    // post json file to database
    json_data_setup: async function () {
        try {
            for (let fileIndex in fileAry) {
                fs.readFile(__dirname + '\\' + fileAry[fileIndex][0] + '.json', async (err, data) => {
                    if (err) throw err;
                    let jsonData = await JSON.parse(data);
                    console.log(fileAry[fileIndex][0] + ":" + jsonData.length);

                    // await fileAry[fileIndex][1].postData(jsonData);
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            console.log("db imported.");
        }


        // fs.readFile(__dirname + '\\' + fileAry[0] + '.json', async (err, data) => {
        //     if (err) throw err;
        //     let jsonData = JSON.parse(data);
        //     a13Controller.postData(jsonData);
        // });
        // fs.readFile(__dirname + '\\' + fileAry[1] + '.json', async (err, data) => {
        //     if (err) throw err;
        //     let jsonData = JSON.parse(data);
        //     analysis_recordController.postData(jsonData);
        // });
        // fs.readFile(__dirname + '\\' + fileAry[2] + '.json', async (err, data) => {
        //     if (err) throw err;
        //     let jsonData = JSON.parse(data);
        //     cage_washController.postData(jsonData);
        // });
        // fs.readFile(__dirname + '\\' + fileAry[3] + '.json', async (err, data) => {
        //     if (err) throw err;
        //     let jsonData = JSON.parse(data);
        //     feedController.postData(jsonData);
        // });
        // fs.readFile(__dirname + '\\' + fileAry[4] + '.json', async (err, data) => {
        //     if (err) throw err;
        //     let jsonData = JSON.parse(data);
        //     feed_esmaController.postData(jsonData);
        // });
        // fs.readFile(__dirname + '\\' + fileAry[5] + '.json', async (err, data) => {
        //     if (err) throw err;
        //     let jsonData = JSON.parse(data);
        //     fish_partController.postData(jsonData);
        // });
        // fs.readFile(__dirname + '\\' + fileAry[6] + '.json', async (err, data) => {
        //     if (err) throw err;
        //     let jsonData = JSON.parse(data);
        //     fish_recordController.postData(jsonData);
        // });
        // fs.readFile(__dirname + '\\' + fileAry[7] + '.json', async (err, data) => {
        //     if (err) throw err;
        //     let jsonData = JSON.parse(data);
        //     lng_waterController.postData(jsonData);
        // });
        // fs.readFile(__dirname + '\\' + fileAry[8] + '.json', async (err, data) => {
        //     if (err) throw err;
        //     let jsonData = JSON.parse(data);
        //     userController.postData(jsonData);
        // });
        // fs.readFile(__dirname + '\\' + fileAry[9] + '.json', async (err, data) => {
        //     if (err) throw err;
        //     let jsonData = JSON.parse(data);
        //     user_writebackController.postData(jsonData);
        // });
        // fs.readFile(__dirname + '\\' + fileAry[10] + '.json', async (err, data) => {
        //     if (err) throw err;
        //     let jsonData = JSON.parse(data);
        //     waterController.postData(jsonData);
        // });
        // fs.readFile(__dirname + '\\' + fileAry[11] + '.json', async (err, data) => {
        //     if (err) throw err;
        //     let jsonData = JSON.parse(data);
        //     water_predictController.postData(jsonData);
        // });

    },

}
