const request = require("request");

const sub_status = require("../models/sub_status");

// https://ithelp.ithome.com.tw/articles/10196486
module.exports = {
  sendMsgToOne: async function (token, body, title) {
    var headers = {
      Authorization:
        "key=AAAA9EHpLoY:APA91bHkD5UExA5u7Ek6u2QGQUA0sysCUHv5Qzooh1CX0jr-ydF8l-eLoRn9mYu-U-nCbkbOBfW7hx-wRhi_EIRdlIApMtVQW4u0b3O-6_qESNzLaQrQTx471q7H88yHS4GknWtb5ILs",
      "Content-Type": "application/json",
    };

    var dataString = {
      notification: {
        title: title,
        body: body,
        icon: "",
        click_action: "https://xxx.xxx.ntou.edu.tw",
      },
      to: token,
    };

    var options = {
      url: "https://fcm.googleapis.com/fcm/send",
      method: "POST",
      headers: headers,
      body: JSON.stringify(dataString),
    };

    async function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        //if {"multicast_id":9064310976052627803,"success":0,"failure":1,"canonical_ids":0,"results":[{"error":"NotRegistered"}]}
        // clear this token
        if (JSON.parse(body).results[0].error == "NotRegistered") {
          await sub_status.updateOne(
            { Token: token },
            {
              $pull: {
                Token: token,
              },
            }
          );
        }
        console.log(body);
      }
    }

    request(options, callback);
    return true;
  },
  // sendMsgToAll: async function (registrationTokens, title, body) {
  //     var headers = {
  //         'Authorization': 'key=AAAA9EHpLoY:APA91bHkD5UExA5u7Ek6u2QGQUA0sysCUHv5Qzooh1CX0jr-ydF8l-eLoRn9mYu-U-nCbkbOBfW7hx-wRhi_EIRdlIApMtVQW4u0b3O-6_qESNzLaQrQTx471q7H88yHS4GknWtb5ILs',
  //         'Content-Type': 'application/json'
  //     };

  //     var dataString = {
  //         "notification": {
  //             "title": title,
  //             "body": body,
  //             "icon": "",
  //             "click_action": "https://xxx.xxx.ntou.edu.tw"
  //         },
  //         "to": registrationTokens,
  //     };

  //     var options = {
  //         url: 'https://fcm.googleapis.com/fcm/send',
  //         method: 'POST',
  //         headers: headers,
  //         body: JSON.stringify(dataString)
  //     };

  //     function callback(error, response, body) {
  //         if (!error && response.statusCode == 200) {
  //             console.log(body);
  //         }
  //     }

  //     request(options, callback);
  //     return true;
  // }
};
