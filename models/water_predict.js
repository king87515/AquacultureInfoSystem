const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    /*
    predict_time	datetime	    預測時間
    start_time	    datetime	    第一筆預測時間
    data_type	    varchar(10)	    資料種類
    value	        double(10,4)	預測數值
    duration	    varchar(3)	    預測間隔
    create_time	    datetime	    創建時間
    */
    predict_time: {
        type: Date
    },
    start_time: {
        type: Date
    },
    data_type: {
        type: String
    },
    value: {
        type: Number
    },
    duration: {
        type: String
    },
    create_time: {
        type: Date
    },
});

module.exports = mongoose.model('water_predict', PostSchema);