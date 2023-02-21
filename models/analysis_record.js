const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
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
    video_no: {
        type: String
    },
    video_date: {
        type: Date
    },
    data_no: {
        type: String
    },
    type: {
        type: String
    },
    len: {
        type: Number
    },
    weight: {
        type: Number
    },
    num: {
        type: Number
    },
    energy: {
        type: Number
    },
    field: {
        type: String
    },
});

module.exports = mongoose.model('analysis_record', PostSchema);