const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    /*
    time	        datetime	    投餌編號
    amount  	    double(20,10)	池號
    weight  	    double(20,10)	投餌日期
    length	        double(20,10)	魚隻數量
    width	        double(20,10)	
    predict_feed	double(20,10)	
    real_feed	    double(20,10)	
    intensity	    int(11)	
    */
    time: {
        type: Date
    },
    amount: {
        type: Number
    },
    weight: {
        type: Number
    },
    length: {
        type: Number
    },
    width: {
        type: Number
    },
    predict_feed: {
        type: Number
    },
    real_feed: {
        type: Number
    },
    intensity: {
        type: Number
    },
});

module.exports = mongoose.model('user_writeback', PostSchema);