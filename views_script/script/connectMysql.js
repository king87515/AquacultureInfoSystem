const mysql = require("mysql");
const fs = require("fs");
const { stringify } = require("querystring");
const record_json = require("../record_json_data/record_json");
const connectMysql = require("./connectMysql");

const a13 = require("../../models/a13");
const analysis_record = require("../../models/analysis_record");
const cage_wash = require("../../models/cage_wash");
const feed = require("../../models/feed");
const feed_esma = require("../../models/feed_esma");
const fish_part = require("../../models/fish_part");
const fish_record = require("../../models/fish_record");
const lng_water = require("../../models/lng_water");
const un_pw = require("../../models/un_pw"); // no use
const user = require("../../models/user");
const user_writeback = require("../../models/user_writeback");
const water = require("../../models/water");
const water_predict = require("../../models/water_predict");

const a13Controller = require("../../controller/a13Controller");
const analysis_recordController = require("../../controller/analysis_recordController");
const cage_washController = require("../../controller/cage_washController");
const feedController = require("../../controller/feedController");
const feed_esmaController = require("../../controller/feed_esmaController");
const fish_partController = require("../../controller/fish_partController");
const fish_recordController = require("../../controller/fish_recordController");
const lng_waterController = require("../../controller/lng_waterController");
const un_pwController = require("../../controller/un_pwController"); //no use
const userController = require("../../controller/userController");
const user_writebackController = require("../../controller/user_writebackController");
const waterController = require("../../controller/waterController");
const water_predictController = require("../../controller/water_predictController");

const Notify = require("../../routes/Notify");
const sub_status = require("../../models/sub_status");

//json data name
const jsonAry = [
  ["a13", a13Controller, a13],
  ["analysis_record", analysis_recordController, analysis_record],
  ["cage_wash", cage_washController, cage_wash],
  ["feed", feedController, feed],
  ["feed_esma", feed_esmaController, feed_esma],
  ["fish_part", fish_partController, fish_part],
  ["fish_record", fish_recordController, fish_record],
  ["lng_water", lng_waterController, lng_water],
  ["user", userController, user],
  ["user_writeback", user_writebackController, user_writeback],
  ["water", waterController, water],
  ["water_predict", water_predictController, water_predict],
];

const database = {
  table: "NONE",
  set tableResults(value) {
    this.table = value;
  },
  get tableResults() {
    return this.table;
  },
};

var pool = mysql.createPool({
  host: "xxx",
  port: "xxx",
  user: "ai_account",
  database: "ai_fish",
  password: "xxx",
  connectionLimit: 10, // 可以自己設定
});

//Start
module.exports = {
  DatabaseConnected: async function () {
    // con = mysql.createConnection(db_config);
    // con.connect(function (err) {
    //   if (err) {
    //     console.log("error when connecting to db:", err);
    //     setTimeout(module.exports.DatabaseConnected, 2000);
    //   }
    //   con.on("error", function (err) {
    //     console.log("db error", err);
    //     if (err.code === "PROTOCOL_CONNECTION_LOST") {
    //       // Connection to the MySQL server is usually
    //       module.exports.DatabaseConnected(); // lost due to either server restart, or a
    //     } else {
    //       // connnection idle timeout (the wait_timeout
    //       throw err; // server variable configures this)
    //     }
    //   });
    //   console.log("Database connected!");
    //   /*Create a database named "mydb":*/
    //   con.query("SHOW TABLES", function (err, result) {
    //     if (err) throw err;
    //     database.tableResults = result;
    //     /**/
    //     console.log("SHOW TABLES:", database.tableResults);
    //     // console.log("database.tableResults length:", database.tableResults.length);
    //     // console.log("database.tableResults[0].Tables_in_ai_fish:", con.escape(database.tableResults[0].Tables_in_ai_fish));
    //     // console.log("getTable:", getTable(0));

    //     // return database.tableResults;
    //     return module.exports.getAllTable(con, database.tableResults);
    //   });
    // });

    pool.getConnection(function (err, conn) {
      if (err) {
        console.log("error when connecting to db:", err);
      }
      console.log("Database connected!");
      /*Create a database named "mydb":*/
      conn.query("SHOW TABLES", function (err, result) {
        if (err) throw err;
        database.tableResults = result;
        /**/
        console.log("SHOW TABLES:", database.tableResults);
        // console.log("database.tableResults length:", database.tableResults.length);
        // console.log("database.tableResults[0].Tables_in_ai_fish:", con.escape(database.tableResults[0].Tables_in_ai_fish));
        // console.log("getTable:", getTable(0));

        // return database.tableResults;
        module.exports.getAllTable(conn, database.tableResults);

        // release connection。
        // 要注意的是，connection 的釋放需要在此 release，而不能在 callback 中 release
        conn.release();
      });
    });
  },

  getAllTable: async function (connect, tableResults) {
    var currentTime = new Date();
    currentTime =
      currentTime.getFullYear() +
      "/" +
      ("0" + (currentTime.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + currentTime.getDate()).slice(-2) +
      " " +
      ("0" + currentTime.getHours()).slice(-2) +
      ":" +
      ("0" + currentTime.getMinutes()).slice(-2) +
      ":" +
      ("0" + currentTime.getSeconds()).slice(-2);
    // console.log("[connectMysql] tableResults:", tableResults);

    // jsonAry 0:stringName 1:Controller 2:Model
    for (let i = 0; i < jsonAry.length; i++) {
      connect.query(
        "SELECT * FROM `" + jsonAry[i][0] + "`",
        async function (err, result) {
          if (err) throw err;

          // Mysql輸出json與當前mongo比對數量
          await jsonAry[i][2].countDocuments({}, async function (err, count) {
            console.log("\x1b[34mMongoDB length", jsonAry[i][0], ":", count); //MongoDB length
            console.log(
              "\x1b[32mMysql length ",
              jsonAry[i][0],
              ":",
              result.length
            ); //Mysql length
            if (count != result.length) {
              await jsonAry[i][2]
                .deleteMany({})
                .then(function () {
                  console.log(
                    "\x1b[31m",
                    jsonAry[i][0],
                    count,
                    "!=",
                    result.length,
                    "Data deleted!"
                  ); // Success
                })
                .catch(function (error) {
                  console.log(error); // Failure
                });

              await jsonAry[i][1].postData(result);
              console.log("\x1b[31mData update at", currentTime, ".");

              var registrationTokens = [];
              const sub_status_data = await sub_status.find();
              for (let ssd = 0; ssd < sub_status_data.length; ssd++) {
                if (sub_status_data[ssd].isSub) {
                  for (
                    let ssdt = 0;
                    ssdt < sub_status_data[ssd].Token.length;
                    ssdt++
                  ) {
                    if (
                      !registrationTokens.includes(
                        sub_status_data[ssd].Token[ssdt]
                      )
                    ) {
                      registrationTokens.push(sub_status_data[ssd].Token[ssdt]);
                    }
                  }
                }
              }
              console.log("registrationTokens:", registrationTokens);
              for (let tokens in registrationTokens)
                await Notify.sendMsgToOne(
                  registrationTokens[tokens],
                  jsonAry[i][0],
                  "資料更新"
                );
            } else {
              console.log("No data need to update at", currentTime, ".");
            }
          });
        }
      );
    }
  },
};

//Connect database
// function DatabaseConnected() {
//   con.connect(function (err) {
//     if (err) throw err;
//     console.log("Database connected!");
//     /*Create a database named "mydb":*/
//     con.query("SHOW TABLES", function (err, result) {
//       if (err) throw err;
//       database.tableResults = result;
//       /**/
//       console.log("SHOW TABLES:", database.tableResults);
//       // console.log("database.tableResults length:", database.tableResults.length);
//       // console.log("database.tableResults[0].Tables_in_ai_fish:", con.escape(database.tableResults[0].Tables_in_ai_fish));
//       // console.log("getTable:", getTable(0));
//       getAllTable();
//     });
//   });
// }

function getTable(tableIndex) {
  if (tableIndex < database.tableResults.length) {
    con.query(
      "SELECT * FROM `" +
        database.tableResults[tableIndex].Tables_in_ai_fish +
        "`",
      function (err, result) {
        if (err) throw err;
        console.log(
          "SELECT * FROM " +
            database.tableResults[tableIndex].Tables_in_ai_fish,
          result[0]
        );
        // let resultObj = Object.assign({}, result);
        //console.log("-------------",resultObj);
        outputFile(
          database.tableResults[tableIndex].Tables_in_ai_fish,
          JSON.stringify(result)
        );
      }
    );
  }
}

function getAllTable(tableResults) {
  let tablesArr = [];
  for (let i = 0; i < tableResults.length; i++) {
    con.query(
      "SELECT * FROM `" + tableResults[i].Tables_in_ai_fish + "`",
      function (err, result) {
        if (err) throw err;

        // // 重新存取指令
        // node connectMysql.js
        // outputFile(database.tableResults[i].Tables_in_ai_fish, JSON.stringify(result));

        tablesArr.push([
          tableResults[i].Tables_in_ai_fish,
          JSON.stringify(result),
        ]);
      }
    );
  }
  console.log("[connectMysql] tablesArr[0]:", tablesArr);
  return tablesArr;
}

function outputFile(tableName, data) {
  fs.writeFile(
    "./views_script/record_json_data/" + tableName + ".json",
    data,
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  );
}
