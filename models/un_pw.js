const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    /*
    Name 
    */
    name: {
        type: String
    }
});

module.exports = mongoose.model('un_pw', PostSchema);