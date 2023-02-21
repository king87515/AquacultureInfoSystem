const express = require("express");
const router = express.Router();
const lng_water = require("../models/lng_water");

//ROUTES
router.get("/", async (req, res) => {
  try {
    const posts = await lng_water.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const post = new lng_water({
    /*
        record_date	    date	        紀錄日期
        temp	        double(10,5)	進水水溫
        temp_cooling	double(10,5)	冷卻水溫
        salinity	    double(10,5)	鹽度
        */
    record_date: req.body.record_date,
    temp: req.body.temp,
    temp_cooling: req.body.temp_cooling,
    salinity: req.body.salinity,
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
router.get("/:postId", async (req, res) => {
  try {
    //console.log("get: " + req.params.postId);
    const post = await lng_water.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE POST
router.delete("/:postId", async (req, res) => {
  try {
    //console.log("delete: " + req.params.postId);
    const removePost = await lng_water
      .find({ _id: req.params.postId })
      .deleteOne();
    res.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a post
router.patch("/:postId", async (req, res) => {
  try {
    //console.log("update: " + req.params.postId);
    const updatePost = await lng_water.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          record_date: req.body.record_date,
          temp: req.body.temp,
          temp_cooling: req.body.temp_cooling,
          salinity: req.body.salinity,
        },
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
    const new_lng_water = new lng_water({
      record_date: data[i]["record_date"],
      temp: data[i]["temp"],
      temp_cooling: data[i]["temp_cooling"],
      salinity: data[i]["salinity"],
    });
    const newPost = await new_lng_water.save();
  }
};
