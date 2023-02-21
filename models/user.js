const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    /*
    id	        varchar(10)	投餌編號
    pw	        varchar(10)	池號
    Create_time	datetime	投餌日期
    authorize	int(2)	    魚隻數量
    */
    id: {
        type: String
    },
    pw: {
        type: String
    },
    Create_time: {
        type: Date
    },
    authorize: {
        type: Number
    },
});

module.exports = mongoose.model('user', PostSchema);