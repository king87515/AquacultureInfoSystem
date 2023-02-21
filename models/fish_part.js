const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    /*
    time	    datetime
    fish_index	double(20,10)
    length	    double(20,10)
    height	    double(20,10)
    weight	    double(20,10)
    amount  	double(20,10)
    */
    time: {
        type: Date
    },
    fish_index: {
        type: Number
    },
    length: {
        type: Number
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    amount: {
        type: Number
    },
});

module.exports = mongoose.model('fish_part', PostSchema);