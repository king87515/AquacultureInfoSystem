const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    /*
    time	    datetime	
    seaweed	    double(20,10)	海草占比率(%)
    requirement	double(20,10)	洗網需求(1 or 0)
    f	        double(20,10)	受力(N)
    hole    	double(20,10)	破網(個)
    */
    time: {
        type: Date
    },
    seaweed: {
        type: Number
    },
    requirement: {
        type: Number
    },
    f: {
        type: Number
    },
    hole: {
        type: Number
    },
});

module.exports = mongoose.model('cage_wash', PostSchema);