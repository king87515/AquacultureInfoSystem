const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    /*   
    Time	        datetime
    Temperature_DO	double(20,10)
    dissolveOxygen	double(20,10)
    Temperature_EC	double(20,10)
    conductivity	double(20,10)
    Temperature_PH	double(20,10)
    PH	            double(20,10)
    */
    Time: {
        type: Date
    },
    Temperature_DO:{
        type: Number
    },
    dissolveOxygen:{
        type: Number
    },
    Temperature_EC:{
        type: Number
    },
    conductivity:{
        type: Number
    },
    Temperature_PH:{
        type: Number
    },
    PH:{
        type: Number
    },
});

module.exports = mongoose.model('a13', PostSchema);