const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    id: {
        type: String
    },
    user: {
        type: String
    },
    password: {
        type: String
    },
    time: {
        type: Date
    },
    objDataList:{
        type: Array
    },
    camDataList:{
        type: Array
    }
});

module.exports = mongoose.model('vrUser', PostSchema);