const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    /*
    No	        varchar(10)	投餌編號
    Cage	    varchar(10)	池號
    Feed_date	date	    投餌日期
    Num	        int(10)	    魚隻數量
    Feed_num	int(10)	    投餌量
    Feed_no	    varchar(5)	投餌料號
    Death	    int(5)	    死亡數量
    */
    No: {
        type: String
    },
    Cage: {
        type: String
    },
    Feed_date: {
        type: Date
    },
    Num: {
        type: Number
    },
    Feed_num: {
        type: Number
    },
    Feed_no: {
        type: String
    },
    Death: {
        type: Number
    },
});

module.exports = mongoose.model('feed', PostSchema);