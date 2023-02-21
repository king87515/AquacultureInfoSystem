const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    /*
    Sample_date	date 	
    Cage_no	    char(10)	
    Sample_no	char(12)	
    Specie  	varchar(10)	
    Body_height	double(5,3)	體高
    Body_width	double(5,3)	體寬
    Body_len	double(5,3)	尾叉長
    Tail_height	double(5,3)	尾柄高
    Eye_radius	double(5,3)	眼徑
    Weight  	int(5)	
    */
    Sample_date: {
        type: Date
    },
    Cage_no: {
        type: String
    },
    Sample_no: {
        type: String
    },
    Specie: {
        type: String
    },
    Body_height: {
        type: Number
    },
    Body_width: {
        type: Number
    },
    Body_len: {
        type: Number
    },
    Tail_height: {
        type: Number
    },
    Eye_radius: {
        type: Number
    },
    Weight: {
        type: Number
    },
});

module.exports = mongoose.model('fish_record', PostSchema);