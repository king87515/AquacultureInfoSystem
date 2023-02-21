const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E9%80%8F%E9%81%8E-passport-js-%E5%AF%A6%E4%BD%9C%E9%A9%97%E8%AD%89%E6%A9%9F%E5%88%B6-11cf478f421e

// const CompanyUser = require('../models/CompanyUser');
// require('../models/Company');
// const Company = require('mongoose').model('companies');
//
const user_login = require('../models/user_login.js'); //目前沒使用
const user_reg = require('../models/user_reg.js');

module.exports = function (passport) {

  const connectDB = process.env.DN_CONNECTION;

  mongoose.connect(connectDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    //console.log('MongoDB Connected: ' + connectDB);
  }).catch(err => console.log(err));

  passport.use('login',
    new LocalStrategy(
      (username, password, done) => {
        // Match user
        mongoose.connect(connectDB, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }).then(function () {
          user_reg.findOne({ userName: username }).then(user => {
            // Match password
            // console.log("username:",username);
            // console.log("user:",user.userName);
            // console.log("password:",password);
            // console.log("user.userPwd:",user.userPwd);
            if (user) {
              // console.log("passport user:",user);
              bcrypt.compare(password, user.userPwd, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  if (JSON.stringify(user) != undefined) {
                    var date_ob = new Date;

                    console.log('\x1b[36m', '['
                      + date_ob.getFullYear() + '-' + ('0' + (date_ob.getMonth() + 1)).slice(-2) + '-' + ('0' + date_ob.getDate()).slice(-2) + ' '
                      + ('0' + date_ob.getHours()).slice(-2) + ':' + ('0' + date_ob.getMinutes()).slice(-2) + ':' + ('0' + date_ob.getSeconds()).slice(-2)
                      + '] '
                      + user.userName + ' log in to the system.');
                    return done(null, user);
                  }
                  return done(null, false, { message: 'Password incorrect' });
                } else {
                  return done(null, false, { message: 'Password incorrect' });
                }
              });
            } else {
              return done(null, false, { message: 'That username is not registered' });
            }


          });
        }).catch(err => console.log(err));
      }
    )
  );


  // 從user資料中撈ID
  passport.serializeUser(function (user, done) {
    // console.log("serializeUser user:", user);
    // console.log("serializeUser user._id:", user._id);
    done(null, user._id);
  })
  // 以ID去撈user資料
  passport.deserializeUser(function (userID, done) {
    mongoose.connect(connectDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(function () {
      user_reg.findById(userID, function (err, user) {
        // console.log("deserializeUser user:", user);
        done(err, user);
      });
    }).catch(err => { console.log(err); done(null, false); });
  })

};
