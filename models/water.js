const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    /*
    Time	            datetime
    Temperature_DO	    double(20,10)
    dissolveOxygen	    double(20,10)
    Temperature_ec	    double(20,10)
    conductivity	    double(20,10)
    Temperature_flow	double(20,10)
    compA	            double(20,10)
    compB	            double(20,10)
    xAxisVelocity	    double(20,10)
    yAxisVelocity	    double(20,10)
    totalVelocity	    double(20,10)
    direction	        double(20,10)
    currentdirection	double(20,10)
    northSouthCurrent	double(20,10)
    eastWestCurrent	    double(20,10)
    powerVoltage	    double(20,10) 
    */
    Time: {
        type: Date
    },
    Temperature_DO: {
        type: Number
    },
    dissolveOxygen: {
        type: Number
    },
    Temperature_ec: {
        type: Number
    },
    conductivity: {
        type: Number
    },
    Temperature_flow: {
        type: Number
    },
    compA: {
        type: Number
    },
    compB: {
        type: Number
    },
    xAxisVelocity: {
        type: Number
    },
    yAxisVelocity: {
        type: Number
    },
    totalVelocity: {
        type: Number
    },
    direction: {
        type: Number
    },
    currentdirection: {
        type: Number
    },
    northSouthCurrent: {
        type: Number
    },
    eastWestCurrent: {
        type: Number
    },
    powerVoltage: {
        type: Number
    },
});

module.exports = mongoose.model('water', PostSchema);