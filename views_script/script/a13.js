// 報表匯出的圖片參數
let imageData = []; //base64Data, width, height;
$(function () {
  // Global variable
  let Labels = [
    "輸入時間",
    "水溫(°C)",
    "溶氧(mg/L)",
    "電導率感測器的水溫",
    "電導率",
    "PH水溫(°C)",
    "PH",
  ];
  let csv_data = [];
  // ---------------------------------------------------------------------------------------
  // SEARCH FUNCTION
  // ---------------------------------------------------------------------------------------
  $("#search_text_a13_water").daterangepicker({
    showDropdowns: true,
    locale: {
      format: "YYYY/MM/DD",
    },
  });

  // SEARCH
  $("#search_a13_water")
    .button()
    .on("click", function () {
      if ($("#search_text_a13_water").val() == "") {
        draw_chart(false);
        $("#statistics_a13_water").jsGrid("loadData", {
          Searching: true,
          Temperature_DO: $("#text_Temperature_DO").val(),
          dissolveOxygen: $("#text_dissolveOxygen").val(),
          Temperature_EC: $("#text_Temperature_EC").val(),
          conductivity: $("#text_conductivity").val(),
          Temperature_PH: $("#text_Temperature_PH").val(),
          PH: $("#text_PH").val(),
        });
      } else {
        draw_chart(true);
        var start = $("#search_text_a13_water").val().slice(0, 10);
        var end = $("#search_text_a13_water").val().slice(13, 23);
        $("#statistics_a13_water").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Temperature_DO: $("#text_Temperature_DO").val(),
          dissolveOxygen: $("#text_dissolveOxygen").val(),
          Temperature_EC: $("#text_Temperature_EC").val(),
          conductivity: $("#text_conductivity").val(),
          Temperature_PH: $("#text_Temperature_PH").val(),
          PH: $("#text_PH").val(),
        });
      }
    });

  // 水溫(Temperature_DO) search
  $("#set_text_Temperature_DO")
    .button()
    .on("click", function () {
      if ($("#search_text_a13_water").val() == "") {
        draw_chart(false);
        $("#statistics_a13_water").jsGrid("loadData", {
          Searching: true,
          Temperature_DO: $("#text_Temperature_DO").val(),
          dissolveOxygen: $("#text_dissolveOxygen").val(),
          Temperature_EC: $("#text_Temperature_EC").val(),
          conductivity: $("#text_conductivity").val(),
          Temperature_PH: $("#text_Temperature_PH").val(),
          PH: $("#text_PH").val(),
        });
      } else {
        draw_chart(true);
        var start = $("#search_text_a13_water").val().slice(0, 10);
        var end = $("#search_text_a13_water").val().slice(13, 23);
        $("#statistics_a13_water").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Temperature_DO: $("#text_Temperature_DO").val(),
          dissolveOxygen: $("#text_dissolveOxygen").val(),
          Temperature_EC: $("#text_Temperature_EC").val(),
          conductivity: $("#text_conductivity").val(),
          Temperature_PH: $("#text_Temperature_PH").val(),
          PH: $("#text_PH").val(),
        });
      }
    });

  // 溶氧(mg/L)(dissolveOxygen) search
  $("#set_text_dissolveOxygen")
    .button()
    .on("click", function () {
      if ($("#search_text_a13_water").val() == "") {
        draw_chart(false);
        $("#statistics_a13_water").jsGrid("loadData", {
          Searching: true,
          Temperature_DO: $("#text_Temperature_DO").val(),
          dissolveOxygen: $("#text_dissolveOxygen").val(),
          Temperature_EC: $("#text_Temperature_EC").val(),
          conductivity: $("#text_conductivity").val(),
          Temperature_PH: $("#text_Temperature_PH").val(),
          PH: $("#text_PH").val(),
        });
      } else {
        draw_chart(true);
        var start = $("#search_text_a13_water").val().slice(0, 10);
        var end = $("#search_text_a13_water").val().slice(13, 23);
        $("#statistics_a13_water").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Temperature_DO: $("#text_Temperature_DO").val(),
          dissolveOxygen: $("#text_dissolveOxygen").val(),
          Temperature_EC: $("#text_Temperature_EC").val(),
          conductivity: $("#text_conductivity").val(),
          Temperature_PH: $("#text_Temperature_PH").val(),
          PH: $("#text_PH").val(),
        });
      }
    });

  // 電導率感測器的水溫(Temperature_EC) search
  $("#set_text_Temperature_EC")
    .button()
    .on("click", function () {
      if ($("#search_text_a13_water").val() == "") {
        draw_chart(false);
        $("#statistics_a13_water").jsGrid("loadData", {
          Searching: true,
          Temperature_DO: $("#text_Temperature_DO").val(),
          dissolveOxygen: $("#text_dissolveOxygen").val(),
          Temperature_EC: $("#text_Temperature_EC").val(),
          conductivity: $("#text_conductivity").val(),
          Temperature_PH: $("#text_Temperature_PH").val(),
          PH: $("#text_PH").val(),
        });
      } else {
        draw_chart(true);
        var start = $("#search_text_a13_water").val().slice(0, 10);
        var end = $("#search_text_a13_water").val().slice(13, 23);
        $("#statistics_a13_water").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Temperature_DO: $("#text_Temperature_DO").val(),
          dissolveOxygen: $("#text_dissolveOxygen").val(),
          Temperature_EC: $("#text_Temperature_EC").val(),
          conductivity: $("#text_conductivity").val(),
          Temperature_PH: $("#text_Temperature_PH").val(),
          PH: $("#text_PH").val(),
        });
      }
    });

  // 電導率(conductivity) search
  $("#set_text_conductivity")
    .button()
    .on("click", function () {
      if ($("#search_text_a13_water").val() == "") {
        draw_chart(false);
        $("#statistics_a13_water").jsGrid("loadData", {
          Searching: true,
          Temperature_DO: $("#text_Temperature_DO").val(),
          dissolveOxygen: $("#text_dissolveOxygen").val(),
          Temperature_EC: $("#text_Temperature_EC").val(),
          conductivity: $("#text_conductivity").val(),
          Temperature_PH: $("#text_Temperature_PH").val(),
          PH: $("#text_PH").val(),
        });
      } else {
        draw_chart(true);
        var start = $("#search_text_a13_water").val().slice(0, 10);
        var end = $("#search_text_a13_water").val().slice(13, 23);
        $("#statistics_a13_water").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Temperature_DO: $("#text_Temperature_DO").val(),
          dissolveOxygen: $("#text_dissolveOxygen").val(),
          Temperature_EC: $("#text_Temperature_EC").val(),
          conductivity: $("#text_conductivity").val(),
          Temperature_PH: $("#text_Temperature_PH").val(),
          PH: $("#text_PH").val(),
        });
      }
    });

  // PH水溫(°C)(Temperature_PH) search
  $("#set_text_Temperature_PH")
    .button()
    .on("click", function () {
      if ($("#search_text_a13_water").val() == "") {
        draw_chart(false);
        $("#statistics_a13_water").jsGrid("loadData", {
          Searching: true,
          Temperature_DO: $("#text_Temperature_DO").val(),
          dissolveOxygen: $("#text_dissolveOxygen").val(),
          Temperature_EC: $("#text_Temperature_EC").val(),
          conductivity: $("#text_conductivity").val(),
          Temperature_PH: $("#text_Temperature_PH").val(),
          PH: $("#text_PH").val(),
        });
      } else {
        draw_chart(true);
        var start = $("#search_text_a13_water").val().slice(0, 10);
        var end = $("#search_text_a13_water").val().slice(13, 23);
        $("#statistics_a13_water").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Temperature_DO: $("#text_Temperature_DO").val(),
          dissolveOxygen: $("#text_dissolveOxygen").val(),
          Temperature_EC: $("#text_Temperature_EC").val(),
          conductivity: $("#text_conductivity").val(),
          Temperature_PH: $("#text_Temperature_PH").val(),
          PH: $("#text_PH").val(),
        });
      }
    });

  // PH(PH) search
  $("#set_text_PH")
    .button()
    .on("click", function () {
      if ($("#search_text_a13_water").val() == "") {
        draw_chart(false);
        $("#statistics_a13_water").jsGrid("loadData", {
          Searching: true,
          Temperature_DO: $("#text_Temperature_DO").val(),
          dissolveOxygen: $("#text_dissolveOxygen").val(),
          Temperature_EC: $("#text_Temperature_EC").val(),
          conductivity: $("#text_conductivity").val(),
          Temperature_PH: $("#text_Temperature_PH").val(),
          PH: $("#text_PH").val(),
        });
      } else {
        draw_chart(true);
        var start = $("#search_text_a13_water").val().slice(0, 10);
        var end = $("#search_text_a13_water").val().slice(13, 23);
        $("#statistics_a13_water").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Temperature_DO: $("#text_Temperature_DO").val(),
          dissolveOxygen: $("#text_dissolveOxygen").val(),
          Temperature_EC: $("#text_Temperature_EC").val(),
          conductivity: $("#text_conductivity").val(),
          Temperature_PH: $("#text_Temperature_PH").val(),
          PH: $("#text_PH").val(),
        });
      }
    });

  // CLEAN
  $("#search_clean_a13_water")
    .button()
    .on("click", function () {
      $("#search_text_a13_water").val("");
      $("#text_Temperature_DO").val("");
      $("#text_dissolveOxygen").val("");
      $("#text_Temperature_EC").val("");
      $("#text_conductivity").val("");
      $("#text_Temperature_PH").val("");
      $("#text_PH").val("");
    });

  // ---------------------------------------------------------------------------------------
  // DRAW CHART
  // ---------------------------------------------------------------------------------------
  var ctx_a13tempchart = document
    .getElementById("a13tempchart")
    .getContext("2d");
  var a13tempchart = new Chart(ctx_a13tempchart, {
    type: "line",
  });

  function draw_chart(searching) {
    // -----------------------------------------------------------------------------------
    // CHART
    // -----------------------------------------------------------------------------------

    var a13WaterJsonData = [];
    $.ajax({
      type: "get",
      async: false,
      url: "/db/a13",
      dataType: "json",
      success: function (statistics_a13_water) {
        // a13WaterJsonData = JSON.parse(statistics_a13_water);
        a13WaterJsonData = statistics_a13_water;
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest.status);
        alert(XMLHttpRequest.readyState);
        alert(textStatus);
      },
    });
    var a13WaterJsonDataDate = [];
    var a13WaterJsonDataTemp = [];
    var a13WaterJsonDataOxy = [];
    var a13WaterJsonDataTemp_predict = [];
    var a13WaterJsonDataCooling_predict = [];
    var a13WaterJsonDataSalinity_predict = [];
    var data_year = [];

    if (searching == false) {
      data_year.push(
        a13WaterJsonData[a13WaterJsonData.length - 1].Time.substring(0, 10)
      );
      for (var i = a13WaterJsonData.length - 1; i >= 0; i--) {
        if (data_year.includes(a13WaterJsonData[i].Time.substring(0, 10))) {
          a13WaterJsonDataDate.push(a13WaterJsonData[i].Time.substring(11, 16));
          a13WaterJsonDataTemp.push(a13WaterJsonData[i].Temperature_DO);
          a13WaterJsonDataOxy.push(a13WaterJsonData[i].dissolveOxygen);
        } else {
          a13WaterJsonDataDate = a13WaterJsonDataDate.reverse();
          a13WaterJsonDataTemp = a13WaterJsonDataTemp.reverse();
          a13WaterJsonDataOxy = a13WaterJsonDataOxy.reverse();

          break;
        }
      }
    } else {
      var searching_area_start = $("#search_text_a13_water").val().slice(0, 10);
      var searching_area_end = $("#search_text_a13_water").val().slice(13, 23);
      for (var i = 0; i < a13WaterJsonData.length; i++) {
        var current_date = a13WaterJsonData[i].Time.slice(0, 10).replace(
          "-",
          "/"
        );
        if (
          Date.parse(searching_area_start) <= Date.parse(current_date) &&
          Date.parse(searching_area_end) >= Date.parse(current_date)
        ) {
          if (!data_year.includes(a13WaterJsonData[i].Time.substring(0, 10))) {
            data_year.push(a13WaterJsonData[i].Time.substring(0, 10));
          }
          a13WaterJsonDataDate.push(a13WaterJsonData[i].Time.substring(11, 16));
          a13WaterJsonDataTemp.push(a13WaterJsonData[i].Temperature_DO);
          a13WaterJsonDataOxy.push(a13WaterJsonData[i].dissolveOxygen);
        }
      }
      a13WaterJsonDataDate = a13WaterJsonDataDate.reverse();
      a13WaterJsonDataTemp = a13WaterJsonDataTemp.reverse();
      a13WaterJsonDataOxy = a13WaterJsonDataOxy.reverse();
    }

    var data_year_string = "";
    if (data_year.length == 1) {
      var date_string = data_year[0].substring(0, 4) + " 年 ";
      date_string += data_year[0].substring(5, 7) + " 月 ";
      date_string += data_year[0].substring(8, 10) + " 日 ";
      data_year_string = date_string;
    } else if (data_year.length > 1) {
      var date_string_from = data_year[0].substring(0, 4) + " 年 ";
      date_string_from += data_year[0].substring(5, 7) + " 月 ";
      date_string_from += data_year[0].substring(8, 10) + " 日 ";

      var date_string_to =
        data_year[data_year.length - 1].substring(0, 4) + " 年 ";
      date_string_to +=
        data_year[data_year.length - 1].substring(5, 7) + " 月 ";
      date_string_to +=
        data_year[data_year.length - 1].substring(8, 10) + " 日 ";

      data_year_string += date_string_from + " ~ " + date_string_to;
    }

    a13tempchart.destroy();
    a13tempchart = new Chart(ctx_a13tempchart, {
      type: "line",
      data: {
        labels: a13WaterJsonDataDate,
        datasets: [
          {
            label: "水溫(°C)",
            data: a13WaterJsonDataTemp,
            fill: false,
            borderColor: "#eb8383",
            backgroundColor: "#eb8383",
            yAxisID: "left-y-axis",
          },
          {
            label: "溶氧(mg/L)",
            data: a13WaterJsonDataOxy,
            fill: false,
            backgroundColor: "#83c6ea",
            borderColor: "#83c6ea",
            yAxisID: "right-y-axis",
          },
          // {
          //     label: '預測進水水溫(°C)',
          //     data: a13WaterJsonDataTemp_predict,
          //     fill: false,
          //     backgroundColor: '#daabab',
          //     borderDash: [10, 5],
          //     borderColor: '#daabab',
          //     pointBackgroundColor: "transparent",
          //     hoverBackgroundColor: "#000000"
          // },

          // {
          //     label: '預測冷卻水溫(°C)',
          //     data: a13WaterJsonDataCooling_predict,
          //     fill: false,
          //     backgroundColor: '#a8c9db',
          //     borderDash: [10, 5],
          //     borderColor: '#a8c9db',
          //     pointBackgroundColor: "transparent"
          // }
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: data_year_string,
              },
              ticks: {
                major: {
                  fontStyle: "bold",
                  fontColor: "#FF0000",
                },
              },
            },
          ],
          yAxes: [
            {
              id: "left-y-axis",
              type: "linear",
              position: "left",
              display: true,
              scaleLabel: {
                display: true,
                labelString: "溫度(°C)",
              },
            },
            {
              id: "right-y-axis",
              type: "linear",
              position: "right",
              display: true,
              scaleLabel: {
                display: true,
                labelString: "溶氧(mg/L)",
              },
            },
          ],
        },
      },
    });
  }
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

    controller: {
      loadData: function (filter) {
        var data = $.Deferred();
        $.ajax({
          type: "GET",
          async: true,
          url: "/db/a13",
          dataType: "json",
          data: filter,
        }).done(function (response) {
          var a13WaterData = [];
          // var a13WaterJsonData = JSON.parse(response);
          var a13WaterJsonData = response;
          // console.log("a13WaterJsonData:",a13WaterJsonData);
          // console.log("filter:", filter);
          // console.log("filter['Searching']:", filter["Searching"]);
          if (filter["Searching"] == true) {
            if (
              filter["Temperature_DO"] !== "" ||
              filter["dissolveOxygen"] !== "" ||
              filter["Temperature_EC"] !== "" ||
              filter["conductivity"] !== "" ||
              filter["Temperature_PH"] !== "" ||
              filter["PH"] !== ""
            ) {
              console.log("1");
              // console.log(filter["Temperature_DO"] !== "");
              // console.log(filter["dissolveOxygen"] !== "");
              // console.log(filter["Temperature_EC"] !== "");
              // console.log(filter["conductivity"] !== "");
              // console.log(filter["Temperature_PH"] !== "");
              // console.log(filter["PH"] !== "");
              // console.log(
              //   typeof a13WaterJsonData[0].Temperature_DO === "number"
              // );

              for (var i = a13WaterJsonData.length - 1; i >= 0; i--) {
                if (
                  filter["Temperature_DO"] ===
                    a13WaterJsonData[i].Temperature_DO.toString() ||
                  filter["dissolveOxygen"] ===
                    a13WaterJsonData[i].dissolveOxygen.toString() ||
                  filter["Temperature_EC"] ===
                    a13WaterJsonData[i].Temperature_EC.toString() ||
                  filter["conductivity"] ===
                    a13WaterJsonData[i].conductivity.toString() ||
                  filter["Temperature_PH"] ===
                    a13WaterJsonData[i].Temperature_PH.toString() ||
                  filter["PH"] === a13WaterJsonData[i].PH.toString()
                ) {
                  var element = {
                    Time: a13WaterJsonData[i].Time,
                    Temperature_DO: a13WaterJsonData[i].Temperature_DO,
                    dissolveOxygen: a13WaterJsonData[i].dissolveOxygen,
                    Temperature_EC: a13WaterJsonData[i].Temperature_EC,
                    conductivity: a13WaterJsonData[i].conductivity,
                    Temperature_PH: a13WaterJsonData[i].Temperature_PH,
                    PH: a13WaterJsonData[i].PH,
                  };
                  a13WaterData.push(element);
                }
              }
            } else {
              console.log("2");
              for (var i = a13WaterJsonData.length - 1; i >= 0; i--) {
                var element = {
                  Time: a13WaterJsonData[i].Time,
                  Temperature_DO: a13WaterJsonData[i].Temperature_DO,
                  dissolveOxygen: a13WaterJsonData[i].dissolveOxygen,
                  Temperature_EC: a13WaterJsonData[i].Temperature_EC,
                  conductivity: a13WaterJsonData[i].conductivity,
                  Temperature_PH: a13WaterJsonData[i].Temperature_PH,
                  PH: a13WaterJsonData[i].PH,
                };
                a13WaterData.push(element);
              }
            }
          } else {
            var searching_area_start = filter["Start"];
            var searching_area_end = filter["End"];

            if (
              filter["Temperature_DO"] !== "" ||
              filter["dissolveOxygen"] !== "" ||
              filter["Temperature_EC"] !== "" ||
              filter["conductivity"] !== "" ||
              filter["Temperature_PH"] !== "" ||
              filter["PH"] !== ""
            ) {
              console.log("3");
              for (var i = a13WaterJsonData.length - 1; i >= 0; i--) {
                if (
                  filter["Temperature_DO"] ===
                    a13WaterJsonData[i].Temperature_DO.toString() ||
                  filter["dissolveOxygen"] ===
                    a13WaterJsonData[i].dissolveOxygen.toString() ||
                  filter["Temperature_EC"] ===
                    a13WaterJsonData[i].Temperature_EC.toString() ||
                  filter["conductivity"] ===
                    a13WaterJsonData[i].conductivity.toString() ||
                  filter["Temperature_PH"] ===
                    a13WaterJsonData[i].Temperature_PH.toString() ||
                  filter["PH"] === a13WaterJsonData[i].PH.toString()
                ) {
                  var current_date = a13WaterJsonData[i].Time.slice(
                    0,
                    10
                  ).replace("-", "/");
                  if (
                    Date.parse(searching_area_start) <=
                      Date.parse(current_date) &&
                    Date.parse(searching_area_end) >= Date.parse(current_date)
                  ) {
                    var element = {
                      Time: a13WaterJsonData[i].Time,
                      Temperature_DO: a13WaterJsonData[i].Temperature_DO,
                      dissolveOxygen: a13WaterJsonData[i].dissolveOxygen,
                      Temperature_EC: a13WaterJsonData[i].Temperature_EC,
                      conductivity: a13WaterJsonData[i].conductivity,
                      Temperature_PH: a13WaterJsonData[i].Temperature_PH,
                      PH: a13WaterJsonData[i].PH,
                    };
                    a13WaterData.push(element);
                  }
                }
              }
            } else {
              console.log("4");
              for (var i = a13WaterJsonData.length - 1; i >= 0; i--) {
                var current_date = a13WaterJsonData[i].Time.slice(
                  0,
                  10
                ).replace("-", "/");
                if (
                  Date.parse(searching_area_start) <=
                    Date.parse(current_date) &&
                  Date.parse(searching_area_end) >= Date.parse(current_date)
                ) {
                  var element = {
                    Time: a13WaterJsonData[i].Time,
                    Temperature_DO: a13WaterJsonData[i].Temperature_DO,
                    dissolveOxygen: a13WaterJsonData[i].dissolveOxygen,
                    Temperature_EC: a13WaterJsonData[i].Temperature_EC,
                    conductivity: a13WaterJsonData[i].conductivity,
                    Temperature_PH: a13WaterJsonData[i].Temperature_PH,
                    PH: a13WaterJsonData[i].PH,
                  };
                  a13WaterData.push(element);
                }
              }
            }
          }
          data.resolve(a13WaterData);
          $("#statistics_a13_water").jsGrid("sort", "Time", "desc");
          csv_data = a13WaterData;
        });
        return data.promise();
      },
    },

    fields: [
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
        cellRenderer: function (item, value) {
          // console.log("item:",item);
          // console.log("value:",value);
          //<td class="jsgrid-cell jsgrid-align-center">5.9143500328</td>
          let threshold = $("#text_Temperature_DO").val();
          if (item == threshold && threshold != "")
            return $("<td>")
              .addClass("jsgrid-cell jsgrid-align-center")
              .css("color", "red")
              .append(item);
          return $("<td>")
            .addClass("jsgrid-cell jsgrid-align-center")
            .append(item);
        },
      },
      {
        name: "dissolveOxygen",
        title: "溶氧(mg/L)",
        type: "text",
        width: 175,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_dissolveOxygen").val();
          if (item == threshold && threshold != "")
            return $("<td>")
              .addClass("jsgrid-cell jsgrid-align-center")
              .css("color", "red")
              .append(item);
          return $("<td>")
            .addClass("jsgrid-cell jsgrid-align-center")
            .append(item);
        },
      },
      {
        name: "Temperature_EC",
        title: "電導率感測器的水溫",
        type: "text",
        width: 175,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Temperature_EC").val();
          if (item == threshold && threshold != "")
            return $("<td>")
              .addClass("jsgrid-cell jsgrid-align-center")
              .css("color", "red")
              .append(item);
          return $("<td>")
            .addClass("jsgrid-cell jsgrid-align-center")
            .append(item);
        },
      },
      {
        name: "conductivity",
        title: "電導率",
        type: "text",
        width: 175,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_conductivity").val();
          if (item == threshold && threshold != "")
            return $("<td>")
              .addClass("jsgrid-cell jsgrid-align-center")
              .css("color", "red")
              .append(item);
          return $("<td>")
            .addClass("jsgrid-cell jsgrid-align-center")
            .append(item);
        },
      },
      {
        name: "Temperature_PH",
        title: "PH水溫(°C)",
        type: "text",
        width: 175,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Temperature_PH").val();
          if (item == threshold && threshold != "")
            return $("<td>")
              .addClass("jsgrid-cell jsgrid-align-center")
              .css("color", "red")
              .append(item);
          return $("<td>")
            .addClass("jsgrid-cell jsgrid-align-center")
            .append(item);
        },
      },
      {
        name: "PH",
        title: "PH",
        type: "text",
        width: 175,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_PH").val();
          if (item == threshold && threshold != "")
            return $("<td>")
              .addClass("jsgrid-cell jsgrid-align-center")
              .css("color", "red")
              .append(item);
          return $("<td>")
            .addClass("jsgrid-cell jsgrid-align-center")
            .append(item);
        },
      },
    ],
  });

  // ---------------------------------------------------------------------------------------
  // SET
  // ---------------------------------------------------------------------------------------
  $("#search_text_a13_water").val("");
  $("#search_a13_water").trigger("click");
  // ---------------------------------------------------------------------------------------
  // SET
  // ---------------------------------------------------------------------------------------

  //Export
  $("#export_csv")
    .button()
    .on("click", function () {
      // JSONToCSVConvertor(csv_data, Labels, true);

      imageData = [];

      divToCanvas("panel1");
    });

  function JSONToCSVConvertor(JSONData, Label, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
    var CSV = "";
    //Set Report title in first row or line
    CSV += Label + "\r\n";
    //This condition will generate the Label/Header
    if (ShowLabel) {
      var row = "";
      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ",";
      }
      row = row.slice(0, -1);
      //append Label row with line break
      CSV += row + "\r\n";
    }
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = "";
      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }
      row.slice(0, row.length - 1);
      //add a line break after each row
      CSV += row + "\r\n";
    }
    if (CSV == "") {
      alert("Invalid data");
      return;
    }
    //Generate a file name
    var fileName = "a13水質資訊";

    //Initialize file format you want csv or xls
    var uri = "data:text/csv;charset=utf-8," + escape(CSV);
    //alert(uri);
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob(["\uFEFF" + CSV], { type: "application/octet-stream" })
    ); //added to fix network error problem in chrome
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    // document.body.removeChild(link);
  }

  //divToCanvas function
  function divToCanvas(divId) {
    console.log("Do divToCanvas function");
    let a = document.createElement("a");
    html2canvas($("#" + divId), {
      onrendered: function (canvas) {
        a.href = canvas.toDataURL("image/png");
        // console.log("a.href.toString():", a.href.toString());

        // // preview
        // $("#canvasImg").html('<img src="' + a.href + '" alt="">');

        // get image width height
        let i = new Image();
        i.onload = function () {
          // console.log("image:", i.width, ",", i.height);

          // imageData : base64Data, width, height 會是陣列存放各種images from divs
          // console.log(a.href.toString(), i.width, i.height);
          imageData.push([a.href.toString(), i.width, i.height]);

          // then ajax post (csv_data, Label, imageData, fileName)
          // console.log(imageData);
          $.ajax({
            type: "POST",
            dataType: "json",
            url: "/fileExport",
            async: false,
            data: {
              Label: Labels,
              imageData: imageData,
              fileName: "a13水質資訊",
            },
            success: function (data) {
              // console.log(data);
              //download file
              var link = document.createElement("a");
              link.href = "js/script/file/" + data.FileConverterName + ".xlsx";
              // console.log("link.href:", link.href);
              //set the visibility hidden so it will not effect on your web-layout
              link.style = "visibility:hidden";
              link.download = "a13水質資訊.xlsx";
              //this part will append the anchor tag and remove it after automatic click
              document.body.appendChild(link);
              link.click();
            },
          });
        };
        i.src = a.href;
      },
    });
  }
});
