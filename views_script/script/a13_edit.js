$(function () {
  // -----------------------------------------------
  // JSGRID SETTING
  // -----------------------------------------------
  var a13_fields = [
    {
      name: "Time",
      title: "輸入時間",
      type: "date",
      width: 175,
      align: "center",
    },
    {
      name: "Temperature_DO",
      title: "水溫(°C)",
      type: "text",
      width: 175,
      align: "center",
      validate: "required",
    },
    {
      name: "dissolveOxygen",
      title: "溶氧(mg/L)",
      type: "text",
      width: 175,
      align: "center",
      validate: "required",
    },
    {
      name: "Temperature_EC",
      title: "電導率感測器的水溫",
      type: "text",
      width: 175,
      align: "center",
      validate: "required",
    },
    {
      name: "conductivity",
      title: "電導率",
      type: "text",
      width: 175,
      align: "center",
      validate: "required",
    },
    {
      name: "Temperature_PH",
      title: "PH水溫(°C)",
      type: "text",
      width: 175,
      align: "center",
      validate: "required",
    },
    {
      name: "PH",
      title: "PH",
      type: "text",
      width: 175,
      align: "center",
      validate: "required",
    },
    {
      type: "control",
      width: 80,
      headerTemplate: function () {
        return;
      },
    },
  ];
  // ---------------------------------------------------------------------------------------
  // STATISTICS_a13_WATER TABLE
  // ---------------------------------------------------------------------------------------
  $("#statistics_a13_water").jsGrid({
    height: "auto",
    width: "100%",
    sorting: true,
    paging: true,
    pageSize: 10,
    pageButtonCount: 5,

    inserting: true,
    editing: true,
    deleteConfirm: "確定刪除?",
    noDataContent:
      "<span class='unselectable' unselectable='on' style='white-space:nowrap; width:100%; text-align:center;'>　</span>" +
      "<span style='position: fixed;'><span class='unselectable' unselectable='on' style='white-space:nowrap; width:100%; text-align:center;'> </span></span>" +
      "<div style='width:3205px; height:0.1px;'></div>",

    invalidNotify: function (args) {
      // $('#alert-error-not-submit').removeClass('hidden');
      window.alert("欄位不得為空白!");
    },

    rowClick: function (args) {},
    // onItemUpdating: function (args) {

    //     if ((args.item.Sample_date === "") || (args.item.Cage_no === "")) {
    //         args.cancel = true;
    //         alert("欄位不得為空白!");
    //     }

    // },
    // onItemInserting: function (args) {
    //     console.log("onItemInserting args:", args);
    //     // if ((args.item.Sample_date === "") || (args.item.Cage_no === "")
    //     // ) {
    //     //     args.cancel = true;
    //     //     alert("欄位不得為空白!");
    //     // }

    // },
    onItemUpdated: function (args) {
      console.log("onItemUpdated args:", args);
      updateData(
        "a13",
        args.item._id,
        args.item.Time,
        args.item.Temperature_DO,
        args.item.dissolveOxygen,
        args.item.Temperature_EC,
        args.item.conductivity,
        args.item.Temperature_PH,
        args.item.PH
      );

      getData("a13");
    },
    onItemInserted: function (args) {
      console.log("onItemInserted args:", args);
      if (args.item.PH >= -1.0 && args.item.PH <= 17.5) {
        postData(
          "a13",
          new Date(new Date().toISOString()).toISOString(),
          args.item.Temperature_DO,
          args.item.dissolveOxygen,
          args.item.Temperature_EC,
          args.item.conductivity,
          args.item.Temperature_PH,
          args.item.PH
        );

        getData("a13");
      } else {
        window.alert("請確認輸入合理PH數值!");
      }
    },
    onItemDeleted: function (args) {
      console.log("onItemDeleted args:", args);
      deleteData("a13", args.item._id);
      getData("a13");
    },

    controller: {
      loadData: function (filter) {
        console.log(filter);
        return filter;

        // var data = $.Deferred();
        // $.ajax({
        //     type: "GET",
        //     async: false,
        //     url: "/db/a13",
        //     dataType: "json",
        //     data: filter
        // }).done(function (response) {
        //     var a13WaterData = [];
        //     // var a13WaterJsonData = JSON.parse(response);
        //     var a13WaterJsonData = response;
        //     // console.log("a13WaterJsonData:",a13WaterJsonData);
        //     if (filter["Searching"] == true) {
        //         for (var i = a13WaterJsonData.length - 1; i >= 0; i--) {
        //             var element = {
        //                 "Time": a13WaterJsonData[i].Time,
        //                 "Temperature_DO": a13WaterJsonData[i].Temperature_DO,
        //                 "dissolveOxygen": a13WaterJsonData[i].dissolveOxygen,
        //                 "Temperature_EC": a13WaterJsonData[i].Temperature_EC,
        //                 "conductivity": a13WaterJsonData[i].conductivity,
        //                 "Temperature_PH": a13WaterJsonData[i].Temperature_PH,
        //                 "PH": a13WaterJsonData[i].PH,
        //             }
        //             a13WaterData.push(element);
        //         }
        //     } else {
        //         var searching_area_start = filter["Start"];
        //         var searching_area_end = filter["End"];
        //         for (var i = a13WaterJsonData.length - 1; i >= 0; i--) {
        //             var current_date = a13WaterJsonData[i].Time.slice(0, 10).replace('-', '/');
        //             if ((Date.parse(searching_area_start) <= Date.parse(current_date)) &&
        //                 (Date.parse(searching_area_end) >= Date.parse(current_date))) {
        //                 var element = {
        //                     "Time": a13WaterJsonData[i].Time,
        //                     "Temperature_DO": a13WaterJsonData[i].Temperature_DO,
        //                     "dissolveOxygen": a13WaterJsonData[i].dissolveOxygen,
        //                     "Temperature_EC": a13WaterJsonData[i].Temperature_EC,
        //                     "conductivity": a13WaterJsonData[i].conductivity,
        //                     "Temperature_PH": a13WaterJsonData[i].Temperature_PH,
        //                     "PH": a13WaterJsonData[i].PH,
        //                 }
        //                 a13WaterData.push(element);
        //             }
        //         }
        //     }
        //     data.resolve(a13WaterData);
        // });
        // return data.promise();
      },
    },

    fields: a13_fields,
  });

  // ---------------------------------------------------------------------------------------
  // SET
  // ---------------------------------------------------------------------------------------
  $("#search_text_a13_water").val("");
  $("#search_a13_water").trigger("click");
  // ---------------------------------------------------------------------------------------
  // SET
  // ---------------------------------------------------------------------------------------

  // -----------------------------------------------
  // PAGE SETUP
  // -----------------------------------------------
  $("#statistics_a13_water").jsGrid("option", "fields", a13_fields);
  $("#statistics_a13_water").jsGrid("option", "inserting", true);
  getData("a13");

  // -----------------------------------------------
  // REQUEST
  // -----------------------------------------------
  function getData(routes) {
    console.log("getData routes:", routes);
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "/db/" + routes,
      async: false,
      success: function (data) {
        console.log("getData url:", this.url);
        // var a13WaterData = [];
        //     // var a13WaterJsonData = JSON.parse(response);
        //     var a13WaterJsonData = response;
        //     // console.log("a13WaterJsonData:",a13WaterJsonData);
        //     if (filter["Searching"] == true) {
        //         for (var i = a13WaterJsonData.length - 1; i >= 0; i--) {
        //             var element = {
        //                 "Time": a13WaterJsonData[i].Time,
        //                 "Temperature_DO": a13WaterJsonData[i].Temperature_DO,
        //                 "dissolveOxygen": a13WaterJsonData[i].dissolveOxygen,
        //                 "Temperature_EC": a13WaterJsonData[i].Temperature_EC,
        //                 "conductivity": a13WaterJsonData[i].conductivity,
        //                 "Temperature_PH": a13WaterJsonData[i].Temperature_PH,
        //                 "PH": a13WaterJsonData[i].PH,
        //             }
        //             a13WaterData.push(element);
        //         }
        //     } else {
        //         var searching_area_start = filter["Start"];
        //         var searching_area_end = filter["End"];
        //         for (var i = a13WaterJsonData.length - 1; i >= 0; i--) {
        //             var current_date = a13WaterJsonData[i].Time.slice(0, 10).replace('-', '/');
        //             if ((Date.parse(searching_area_start) <= Date.parse(current_date)) &&
        //                 (Date.parse(searching_area_end) >= Date.parse(current_date))) {
        //                 var element = {
        //                     "Time": a13WaterJsonData[i].Time,
        //                     "Temperature_DO": a13WaterJsonData[i].Temperature_DO,
        //                     "dissolveOxygen": a13WaterJsonData[i].dissolveOxygen,
        //                     "Temperature_EC": a13WaterJsonData[i].Temperature_EC,
        //                     "conductivity": a13WaterJsonData[i].conductivity,
        //                     "Temperature_PH": a13WaterJsonData[i].Temperature_PH,
        //                     "PH": a13WaterJsonData[i].PH,
        //                 }
        //                 a13WaterData.push(element);
        //             }
        //         }
        //     }
        //     data.resolve(a13WaterData);
        $("#statistics_a13_water").jsGrid("loadData", data);
        $("#statistics_a13_water").jsGrid("refresh");
        $("#statistics_a13_water").jsGrid("sort", a13_fields[0].name, "desc");
      },
    });
  }

  function postData(
    routes,
    Time,
    Temperature_DO,
    dissolveOxygen,
    Temperature_EC,
    conductivity,
    Temperature_PH,
    PH
  ) {
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/db/" + routes,
      async: false,
      data: {
        Time: Time,
        Temperature_DO: Temperature_DO,
        dissolveOxygen: dissolveOxygen,
        Temperature_EC: Temperature_EC,
        conductivity: conductivity,
        Temperature_PH: Temperature_PH,
        PH: PH,
      },
      success: function (data) {
        console.log(data);
      },
    });
  }

  function updateData(
    routes,
    vid,
    Time,
    Temperature_DO,
    dissolveOxygen,
    Temperature_EC,
    conductivity,
    Temperature_PH,
    PH
  ) {
    console.log("updateData vid:", vid);
    $.ajax({
      type: "PATCH",
      dataType: "json",
      url: "/db/" + routes + "/" + vid,
      async: false,
      data: {
        Time: Time,
        Temperature_DO: Temperature_DO,
        dissolveOxygen: dissolveOxygen,
        Temperature_EC: Temperature_EC,
        conductivity: conductivity,
        Temperature_PH: Temperature_PH,
        PH: PH,
      },
      success: function (data) {
        console.log(data);
      },
    });
  }

  function deleteData(routes, vid) {
    $.ajax({
      type: "DELETE",
      dataType: "json",
      url: "/db/" + routes + "/" + vid,
      async: false,
      success: function (data) {
        console.log(data);
      },
    });
  }

  Date.prototype.toISOString = function () {
    let pad = (n) => (n < 10 ? "0" + n : n);
    let hours_offset = this.getTimezoneOffset() / 60;
    let offset_date = this.setHours(this.getHours() - hours_offset);
    let symbol = hours_offset >= 0 ? "-" : "+";
    let time_zone = symbol + pad(Math.abs(hours_offset)) + ":00";

    return (
      this.getUTCFullYear() +
      "-" +
      pad(this.getUTCMonth() + 1) +
      "-" +
      pad(this.getUTCDate()) +
      "T" +
      pad(this.getUTCHours()) +
      ":" +
      pad(this.getUTCMinutes()) +
      ":" +
      pad(this.getUTCSeconds()) +
      "." +
      (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
      time_zone
    );
  };
});
