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
    "水溫流(°C)",
    "羅盤A",
    "羅盤B",
    "x軸速度",
    "y軸速度",
    "總流速",
    "儀器目前的方向",
    "水流方向",
    "南北向流速",
    "東西向流速",
    "儀器目前的電壓",
  ];
  let csv_data = [];

  // ---------------------------------------------------------------------------------------
  // SEARCH FUNCTION
  // ---------------------------------------------------------------------------------------
  $("#search_text_lng_water").daterangepicker({
    showDropdowns: true,
    locale: {
      format: "YYYY/MM/DD",
    },
  });

  // SEARCH
  $("#search_lng_water").button().on("click", SearchInit);
  $("#set_text_Temperature_DO").button().on("click", SearchInit);
  $("#set_text_dissolveOxygen").button().on("click", SearchInit);
  $("#set_text_totalVelocity").button().on("click", SearchInit);

  // CLEAN
  $("#search_clean_lng_water")
    .button()
    .on("click", function () {
      $("#search_text_lng_water").val("");
      $("#text_Temperature_DO").val("");
      $("#text_dissolveOxygen").val("");
      $("#text_totalVelocity").val("");
    });

  // // set text threshold to db
  // $("#set_text_Temperature_DO")
  //   .button()
  //   .on("click", function () {
  //     // Step 1 - AJAX: record into database with user-info
  //     if ($("#check_Temperature_DO").is(":checked")) {
  //       console.log("checked");
  //       // AJAX: POST setting or UPDATE/PATCH setting
  //       // $.ajax({
  //       //     type: 'POST',
  //       //     dataType: 'json',
  //       //     url: "/db/" + "xxxx",
  //       //     async: false,
  //       //     data: {
  //       //         record_date: record_date,
  //       //         temp: temp,
  //       //         temp_cooling: temp_cooling,
  //       //         salinity: salinity,
  //       //     },
  //       //     success: function (data) {
  //       //         console.log(data);
  //       //     }
  //       // });
  //     } else {
  //       console.log("non-checked");
  //       // AJAX: UPDATE/PATCH setting
  //     }
  //   });

  function SearchInit() {
    if ($("#search_text_lng_water").val() == "") {
      draw_chart(false);
      $("#statistics_lng_water").jsGrid("loadData", {
        Searching: true,
        Temperature_DO: $("#text_Temperature_DO").val(),
        dissolveOxygen: $("#text_dissolveOxygen").val(),
        totalVelocity: $("#text_totalVelocity").val(),
      });
    } else {
      draw_chart(true);
      var start = $("#search_text_lng_water").val().slice(0, 10);
      var end = $("#search_text_lng_water").val().slice(13, 23);
      $("#statistics_lng_water").jsGrid("loadData", {
        Searching: false,
        Start: start,
        End: end,
        Temperature_DO: $("#text_Temperature_DO").val(),
        dissolveOxygen: $("#text_dissolveOxygen").val(),
        totalVelocity: $("#text_totalVelocity").val(),
      });
    }
  }

  // ---------------------------------------------------------------------------------------
  // DRAW CHART
  // ---------------------------------------------------------------------------------------
  var ctx_LNGtempchart = document
    .getElementById("LNGtempchart")
    .getContext("2d");
  var LNGtempchart = new Chart(ctx_LNGtempchart, {
    type: "line",
  });

  var ctx_LNGoxychart = document.getElementById("LNGoxychart").getContext("2d");
  var LNGoxychart = new Chart(ctx_LNGoxychart, {
    type: "bubble",
  });

  function draw_chart(searching) {
    // -----------------------------------------------------------------------------------
    // CHART
    // -----------------------------------------------------------------------------------

    var LngWaterJsonData = [];
    $.ajax({
      type: "get",
      async: false,
      url: "/db/water",
      dataType: "json",
      success: function (statistics_lng_water) {
        // LngWaterJsonData = JSON.parse(statistics_lng_water);
        LngWaterJsonData = statistics_lng_water;
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest.status);
        alert(XMLHttpRequest.readyState);
        alert(textStatus);
      },
    });
    var LngWaterJsonDataDate = [];
    var LngWaterJsonDataTemp = [];
    var LngWaterJsonDataOxy = [];
    var LngWaterJsonDataBubble = [];
    var LngWaterJsonDataTemp_predict = [];
    var LngWaterJsonDataCooling_predict = [];
    var LngWaterJsonDataSalinity_predict = [];
    var data_year = [];

    if (searching == false) {
      data_year.push(
        LngWaterJsonData[LngWaterJsonData.length - 1].Time.substring(0, 10)
      );
      for (var i = LngWaterJsonData.length - 1; i >= 0; i--) {
        if (data_year.includes(LngWaterJsonData[i].Time.substring(0, 10))) {
          LngWaterJsonDataDate.push(LngWaterJsonData[i].Time.substring(11, 16));
          LngWaterJsonDataTemp.push(LngWaterJsonData[i].Temperature_DO);
          LngWaterJsonDataOxy.push(LngWaterJsonData[i].dissolveOxygen);
          LngWaterJsonDataBubble.push({
            x: LngWaterJsonData[i].xAxisVelocity,
            y: LngWaterJsonData[i].yAxisVelocity,
            r: LngWaterJsonData[i].totalVelocity,
            z: LngWaterJsonData[i].Time,
          });
        } else {
          LngWaterJsonDataDate = LngWaterJsonDataDate.reverse();
          LngWaterJsonDataTemp = LngWaterJsonDataTemp.reverse();
          LngWaterJsonDataOxy = LngWaterJsonDataOxy.reverse();
          LngWaterJsonDataBubble = LngWaterJsonDataBubble.reverse();
          break;
        }
      }

      // CHART PREDICT START
      // LngWaterJsonDataTemp_predict[LngWaterJsonDataTemp_predict.length - 1] = LngWaterJsonDataTemp[LngWaterJsonDataTemp.length - 1];
      // LngWaterJsonDataCooling_predict[LngWaterJsonDataCooling_predict.length - 1] = LngWaterJsonDataCooling[LngWaterJsonDataCooling.length - 1];
      // LngWaterJsonDataSalinity_predict[LngWaterJsonDataSalinity_predict.length - 1] = LngWaterJsonDataSalinity[LngWaterJsonDataSalinity.length - 1];
      // LngWaterJsonDataDate[LngWaterJsonDataDate.length] = "09/06";
      // LngWaterJsonDataDate[LngWaterJsonDataDate.length] = "09/07";
      // LngWaterJsonDataDate[LngWaterJsonDataDate.length] = "09/08";
      // for (var i = 0; i < 3; i++) {
      //     LngWaterJsonDataTemp_predict[LngWaterJsonDataTemp_predict.length] = 24 + i;
      //     LngWaterJsonDataCooling_predict[LngWaterJsonDataCooling_predict.length] = 23 + (i * 0.2);
      //     LngWaterJsonDataSalinity_predict[LngWaterJsonDataSalinity_predict.length] = 33.2 - (i * 0.2);
      // }
      // CHART PREDICT END
    } else {
      var searching_area_start = $("#search_text_lng_water").val().slice(0, 10);
      var searching_area_end = $("#search_text_lng_water").val().slice(13, 23);
      for (var i = 0; i < LngWaterJsonData.length; i++) {
        var current_date = LngWaterJsonData[i].Time.slice(0, 10).replace(
          "-",
          "/"
        );
        if (
          Date.parse(searching_area_start) <= Date.parse(current_date) &&
          Date.parse(searching_area_end) >= Date.parse(current_date)
        ) {
          if (!data_year.includes(LngWaterJsonData[i].Time.substring(0, 10))) {
            data_year.push(LngWaterJsonData[i].Time.substring(0, 10));
          }
          LngWaterJsonDataDate.push(LngWaterJsonData[i].Time.substring(11, 16));
          LngWaterJsonDataTemp.push(LngWaterJsonData[i].Temperature_DO);
          LngWaterJsonDataOxy.push(LngWaterJsonData[i].dissolveOxygen);
          LngWaterJsonDataBubble.push({
            x: LngWaterJsonData[i].xAxisVelocity,
            y: LngWaterJsonData[i].yAxisVelocity,
            r: LngWaterJsonData[i].totalVelocity,
            z: LngWaterJsonData[i].Time,
          });
        }
      }
      LngWaterJsonDataDate = LngWaterJsonDataDate.reverse();
      LngWaterJsonDataTemp = LngWaterJsonDataTemp.reverse();
      LngWaterJsonDataOxy = LngWaterJsonDataOxy.reverse();
      LngWaterJsonDataBubble = LngWaterJsonDataBubble.reverse();
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

    LNGtempchart.destroy();
    LNGtempchart = new Chart(ctx_LNGtempchart, {
      type: "line",
      data: {
        labels: LngWaterJsonDataDate,
        datasets: [
          {
            label: "水溫(°C)",
            data: LngWaterJsonDataTemp,
            fill: false,
            borderColor: "#eb8383",
            backgroundColor: "#eb8383",
            yAxisID: "left-y-axis",
          },
          {
            label: "溶氧(mg/L)",
            data: LngWaterJsonDataOxy,
            fill: false,
            backgroundColor: "#83c6ea",
            borderColor: "#83c6ea",
            yAxisID: "right-y-axis",
          },
          // {
          //     label: '預測進水水溫(°C)',
          //     data: LngWaterJsonDataTemp_predict,
          //     fill: false,
          //     backgroundColor: '#daabab',
          //     borderDash: [10, 5],
          //     borderColor: '#daabab',
          //     pointBackgroundColor: "transparent",
          //     hoverBackgroundColor: "#000000"
          // },

          // {
          //     label: '預測冷卻水溫(°C)',
          //     data: LngWaterJsonDataCooling_predict,
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

    var LngWaterJsonDataBubble_color = [];
    function selectcolor(length, maxLength) {
      // var color = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"
      //     , "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];

      var i = length.toFixed(2) / maxLength.toFixed(2);
      var r = Math.round(125 - i * 75);
      var g = Math.round(250 - i * 110);
      var b = Math.round(10 + i * 80);
      var a = i * 0.7 + 0.3;
      return "rgba(" + r + "," + g + "," + b + "," + a + ")";
      // return color[length % 10];
    }
    for (var k = 0; k < LngWaterJsonDataBubble.length; k++) {
      // LngWaterJsonDataBubble_color.push('rgba(' + selectcolor(k) + (k.toFixed(2) / LngWaterJsonDataBubble.length.toFixed(2)) + ')');
      LngWaterJsonDataBubble_color.push(
        selectcolor(k, LngWaterJsonDataBubble.length)
      );
    }
    // console.log(LngWaterJsonDataBubble[0]);

    LNGoxychart.destroy();
    LNGoxychart = new Chart(ctx_LNGoxychart, {
      type: "bubble",
      data: {
        datasets: [
          {
            label: "總流速",
            data: LngWaterJsonDataBubble,
            borderWidth: 3,
            borderColor: LngWaterJsonDataBubble_color,
            backgroundColor: "transparent",
          },
        ],
        // datasets: [{
        // labels: LngWaterJsonDataDate,
        // datasets: [
        //     {
        //         label: '溶氧(mg/L))',
        //         data: LngWaterJsonDataOxy,
        //         fill: false,
        //         backgroundColor: '#83c6ea',
        //         borderColor: '#83c6ea'
        //     },
        // ]
      },
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "x軸速度",
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
              type: "linear",
              position: "left",
              scaleLabel: {
                display: true,
                labelString: "y軸速度",
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              // console.log(tooltipItem);
              // console.log(data);
              var label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label +=
                  ": " +
                  (data.datasets[tooltipItem.datasetIndex].data[
                    tooltipItem.index
                  ].r || "");
              }

              return label;
            },
            afterBody: function (tooltipItem, data) {
              // console.log(tooltipItem[0]);
              // console.log(data.datasets[0].data[tooltipItem[0].datasetIndex].z);
              var multistringText = [];

              multistringText.push(
                "x軸速度: " +
                  (data.datasets[0].data[tooltipItem[0].index].x || "")
              );
              multistringText.push(
                "y軸速度: " +
                  (data.datasets[0].data[tooltipItem[0].index].y || "")
              );
              multistringText.push("");
              multistringText.push(
                "時間: " + (data.datasets[0].data[tooltipItem[0].index].z || "")
              );
              return multistringText;
            },
          },
        },
      },
    });
  }
  // ---------------------------------------------------------------------------------------
  // STATISTICS_LNG_WATER TABLE
  // ---------------------------------------------------------------------------------------
  $("#statistics_lng_water").jsGrid({
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
          async: false,
          url: "/db/water",
          dataType: "json",
          data: filter,
        }).done(function (response) {
          var LngWaterData = [];
          // var LngWaterJsonData = JSON.parse(response);
          // console.log("response:", response);
          var LngWaterJsonData = response;
          if (filter["Searching"] == true) {
            if (
              filter["Temperature_DO"] !== "" ||
              filter["dissolveOxygen"] !== "" ||
              filter["totalVelocity"] !== ""
            ) {
              console.log("1");
              for (var i = LngWaterJsonData.length - 1; i >= 0; i--) {
                if (
                  filter["Temperature_DO"] ===
                    LngWaterJsonData[i].Temperature_DO.toString() ||
                  filter["dissolveOxygen"] ===
                    LngWaterJsonData[i].dissolveOxygen.toString() ||
                  filter["totalVelocity"] ===
                    LngWaterJsonData[i].totalVelocity.toString()
                ) {
                  var element = {
                    Time: LngWaterJsonData[i].Time,
                    Temperature_DO: LngWaterJsonData[i].Temperature_DO,
                    dissolveOxygen: LngWaterJsonData[i].dissolveOxygen,
                    Temperature_ec: LngWaterJsonData[i].Temperature_ec,
                    conductivity: LngWaterJsonData[i].conductivity,
                    Temperature_flow: LngWaterJsonData[i].Temperature_flow,
                    compA: LngWaterJsonData[i].compA,
                    compB: LngWaterJsonData[i].compB,
                    xAxisVelocity: LngWaterJsonData[i].xAxisVelocity,
                    yAxisVelocity: LngWaterJsonData[i].yAxisVelocity,
                    totalVelocity: LngWaterJsonData[i].totalVelocity,
                    direction: LngWaterJsonData[i].direction,
                    currentdirection: LngWaterJsonData[i].currentdirection,
                    northSouthCurrent: LngWaterJsonData[i].northSouthCurrent,
                    eastWestCurrent: LngWaterJsonData[i].eastWestCurrent,
                    powerVoltage: LngWaterJsonData[i].powerVoltage,
                  };
                  LngWaterData.push(element);
                }
              }
            } else {
              console.log("2");
              for (var i = LngWaterJsonData.length - 1; i >= 0; i--) {
                var element = {
                  Time: LngWaterJsonData[i].Time,
                  Temperature_DO: LngWaterJsonData[i].Temperature_DO,
                  dissolveOxygen: LngWaterJsonData[i].dissolveOxygen,
                  Temperature_ec: LngWaterJsonData[i].Temperature_ec,
                  conductivity: LngWaterJsonData[i].conductivity,
                  Temperature_flow: LngWaterJsonData[i].Temperature_flow,
                  compA: LngWaterJsonData[i].compA,
                  compB: LngWaterJsonData[i].compB,
                  xAxisVelocity: LngWaterJsonData[i].xAxisVelocity,
                  yAxisVelocity: LngWaterJsonData[i].yAxisVelocity,
                  totalVelocity: LngWaterJsonData[i].totalVelocity,
                  direction: LngWaterJsonData[i].direction,
                  currentdirection: LngWaterJsonData[i].currentdirection,
                  northSouthCurrent: LngWaterJsonData[i].northSouthCurrent,
                  eastWestCurrent: LngWaterJsonData[i].eastWestCurrent,
                  powerVoltage: LngWaterJsonData[i].powerVoltage,
                };
                LngWaterData.push(element);
              }
            }
          } else {
            var searching_area_start = filter["Start"];
            var searching_area_end = filter["End"];
            if (
              filter["Temperature_DO"] !== "" ||
              filter["dissolveOxygen"] !== "" ||
              filter["totalVelocity"] !== ""
            ) {
              console.log("3");
              for (var i = LngWaterJsonData.length - 1; i >= 0; i--) {
                if (
                  filter["Temperature_DO"] ===
                    LngWaterJsonData[i].Temperature_DO.toString() ||
                  filter["dissolveOxygen"] ===
                    LngWaterJsonData[i].dissolveOxygen.toString() ||
                  filter["totalVelocity"] ===
                    LngWaterJsonData[i].totalVelocity.toString()
                ) {
                  var current_date = LngWaterJsonData[i].Time.slice(
                    0,
                    10
                  ).replace("-", "/");
                  if (
                    Date.parse(searching_area_start) <=
                      Date.parse(current_date) &&
                    Date.parse(searching_area_end) >= Date.parse(current_date)
                  ) {
                    var element = {
                      Time: LngWaterJsonData[i].Time,
                      Temperature_DO: LngWaterJsonData[i].Temperature_DO,
                      dissolveOxygen: LngWaterJsonData[i].dissolveOxygen,
                      Temperature_ec: LngWaterJsonData[i].Temperature_ec,
                      conductivity: LngWaterJsonData[i].conductivity,
                      Temperature_flow: LngWaterJsonData[i].Temperature_flow,
                      compA: LngWaterJsonData[i].compA,
                      compB: LngWaterJsonData[i].compB,
                      xAxisVelocity: LngWaterJsonData[i].xAxisVelocity,
                      yAxisVelocity: LngWaterJsonData[i].yAxisVelocity,
                      totalVelocity: LngWaterJsonData[i].totalVelocity,
                      direction: LngWaterJsonData[i].direction,
                      currentdirection: LngWaterJsonData[i].currentdirection,
                      northSouthCurrent: LngWaterJsonData[i].northSouthCurrent,
                      eastWestCurrent: LngWaterJsonData[i].eastWestCurrent,
                      powerVoltage: LngWaterJsonData[i].powerVoltage,
                    };
                    LngWaterData.push(element);
                  }
                }
              }
            } else {
              console.log("4");
              for (var i = LngWaterJsonData.length - 1; i >= 0; i--) {
                var current_date = LngWaterJsonData[i].Time.slice(
                  0,
                  10
                ).replace("-", "/");
                if (
                  Date.parse(searching_area_start) <=
                    Date.parse(current_date) &&
                  Date.parse(searching_area_end) >= Date.parse(current_date)
                ) {
                  var element = {
                    Time: LngWaterJsonData[i].Time,
                    Temperature_DO: LngWaterJsonData[i].Temperature_DO,
                    dissolveOxygen: LngWaterJsonData[i].dissolveOxygen,
                    Temperature_ec: LngWaterJsonData[i].Temperature_ec,
                    conductivity: LngWaterJsonData[i].conductivity,
                    Temperature_flow: LngWaterJsonData[i].Temperature_flow,
                    compA: LngWaterJsonData[i].compA,
                    compB: LngWaterJsonData[i].compB,
                    xAxisVelocity: LngWaterJsonData[i].xAxisVelocity,
                    yAxisVelocity: LngWaterJsonData[i].yAxisVelocity,
                    totalVelocity: LngWaterJsonData[i].totalVelocity,
                    direction: LngWaterJsonData[i].direction,
                    currentdirection: LngWaterJsonData[i].currentdirection,
                    northSouthCurrent: LngWaterJsonData[i].northSouthCurrent,
                    eastWestCurrent: LngWaterJsonData[i].eastWestCurrent,
                    powerVoltage: LngWaterJsonData[i].powerVoltage,
                  };
                  LngWaterData.push(element);
                }
              }
            }
          }
          data.resolve(LngWaterData);
          $("#statistics_lng_water").jsGrid("sort", "Time", "desc");
          csv_data = LngWaterData;
          // $("#statistics_lng_water > div.jsgrid-grid-body > table > tbody > tr:nth-child(1) > td:nth-child(2)").css({color:'red'});
        });
        return data.promise();
      },
    },

    fields: [
      {
        name: "Time",
        title: Labels[0],
        type: "date",
        width: 175,
        align: "center",
      },
      {
        name: "Temperature_DO",
        title: Labels[1],
        type: "text",
        width: 175,
        align: "center",
        cellRenderer: function (item, value) {
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
        title: Labels[2],
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
        name: "Temperature_ec",
        title: Labels[3],
        type: "text",
        width: 175,
        align: "center",
      },
      {
        name: "conductivity",
        title: Labels[4],
        type: "text",
        width: 175,
        align: "center",
      },
      {
        name: "Temperature_flow",
        title: Labels[5],
        type: "text",
        width: 175,
        align: "center",
      },
      {
        name: "compA",
        title: Labels[6],
        type: "text",
        width: 175,
        align: "center",
      },
      {
        name: "compB",
        title: Labels[7],
        type: "text",
        width: 175,
        align: "center",
      },
      {
        name: "xAxisVelocity",
        title: Labels[8],
        type: "text",
        width: 175,
        align: "center",
      },
      {
        name: "yAxisVelocity",
        title: Labels[9],
        type: "text",
        width: 175,
        align: "center",
      },
      {
        name: "totalVelocity",
        title: Labels[10],
        type: "text",
        width: 175,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_totalVelocity").val();
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
        name: "direction",
        title: Labels[11],
        type: "text",
        width: 175,
        align: "center",
      },
      {
        name: "currentdirection",
        title: Labels[12],
        type: "text",
        width: 175,
        align: "center",
      },
      {
        name: "northSouthCurrent",
        title: Labels[13],
        type: "text",
        width: 175,
        align: "center",
      },
      {
        name: "eastWestCurrent",
        title: Labels[14],
        type: "text",
        width: 175,
        align: "center",
      },
      {
        name: "powerVoltage",
        title: Labels[15],
        type: "text",
        width: 175,
        align: "center",
      },
    ],
  });

  // ---------------------------------------------------------------------------------------
  // SET
  // ---------------------------------------------------------------------------------------
  $("#search_text_lng_water").val("");
  $("#search_lng_water").trigger("click");
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
      divToCanvas("panel2");
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
    var fileName = "恆春箱網水質資訊";

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
              fileName: "恆春箱網水質資訊",
            },
            success: function (data) {
              // console.log(data);
              if (divId == "panel2") {
                //download file
                var link = document.createElement("a");
                link.href =
                  "js/script/file/" + data.FileConverterName + ".xlsx";
                // console.log("link.href:", link.href);
                //set the visibility hidden so it will not effect on your web-layout
                link.style = "visibility:hidden";
                link.download = "恆春箱網水質資訊.xlsx";
                //this part will append the anchor tag and remove it after automatic click
                document.body.appendChild(link);
                link.click();
              }
            },
          });
        };
        i.src = a.href;
      },
    });
  }
});
