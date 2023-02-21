const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    /*
    record_date	    date	        紀錄日期
    temp	        double(10,5)	進水水溫
    temp_cooling	double(10,5)	冷卻水溫
    salinity	    double(10,5)	鹽度
    */
    record_date: {
        type: Date
    },
    temp: {
        type: Number
    },
    temp_cooling: {
        type: Number
    },
    salinity: {
        type: Number
    },
});

module.exports = mongoose.model('lng_water', PostSchema);