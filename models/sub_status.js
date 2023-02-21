const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userName: {
        type: String
    },
    userId:{
        type: String
    },
    isSub:{
        type: Boolean
    },
    Token:{
        type: Array
    }
});

module.exports = mongoose.model('sub_status', PostSchema);