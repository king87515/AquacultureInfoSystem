const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    /*
    Time	        datetime
    flow_rate       double(20,10)
    temp	        double(20,10)
    avg_weight	    double(20,10)
    count	        int(11)
    predict_feed    int(11)
    real_feed	    int(11)
    */
    Time: {
        type: Date
    },
    flow_rate: {
        type: Number
    },
    temp: {
        type: Number
    },
    avg_weight: {
        type: Number
    },
    count: {
        type: Number
    },
    predict_feed: {
        type: Number
    },
    real_feed: {
        type: Number
    },
});

module.exports = mongoose.model('feed_esma', PostSchema);