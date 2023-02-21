const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    /*
    userName	    String	帳號
    userPwd	        String	密碼
    Create_time	    Date	創建日期
    */
    userName: {
        type: String
    },
    userPwd: {
        type: String
    },
    createTime: {
        type: Date
    },
});

module.exports = mongoose.model('user_login', PostSchema);