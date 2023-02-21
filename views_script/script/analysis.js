// 報表匯出的圖片參數
let imageData = []; //base64Data, width, height;
$(function () {
  // Global variable
  let Labels = ["紀錄日期", "進水水溫(°C)", "冷卻水溫(°C)", "鹽度(‰ )"];
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
  $("#search_lng_water")
    .button()
    .on("click", function () {
      if ($("#search_text_lng_water").val() == "") {
        draw_chart(false);
        $("#statistics_lng_water").jsGrid("loadData", {
          Searching: true,
          temp: $("#text_temp").val(),
          temp_cooling: $("#text_temp_cooling").val(),
          salinity: $("#text_salinity").val(),
        });
      } else {
        draw_chart(true);
        var start = $("#search_text_lng_water").val().slice(0, 10);
        var end = $("#search_text_lng_water").val().slice(13, 23);
        $("#statistics_lng_water").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          temp: $("#text_temp").val(),
          temp_cooling: $("#text_temp_cooling").val(),
          salinity: $("#text_salinity").val(),
        });
      }
    });

  //
  $("#set_text_temp")
    .button()
    .on("click", function () {
      if ($("#search_text_lng_water").val() == "") {
        draw_chart(false);
        $("#statistics_lng_water").jsGrid("loadData", {
          Searching: true,
          temp: $("#text_temp").val(),
          temp_cooling: $("#text_temp_cooling").val(),
          salinity: $("#text_salinity").val(),
        });
      } else {
        draw_chart(true);
        var start = $("#search_text_lng_water").val().slice(0, 10);
        var end = $("#search_text_lng_water").val().slice(13, 23);
        $("#statistics_lng_water").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          temp: $("#text_temp").val(),
          temp_cooling: $("#text_temp_cooling").val(),
          salinity: $("#text_salinity").val(),
        });
      }
    });

  //
  $("#set_text_temp_cooling")
    .button()
    .on("click", function () {
      if ($("#search_text_lng_water").val() == "") {
        draw_chart(false);
        $("#statistics_lng_water").jsGrid("loadData", {
          Searching: true,
          temp: $("#text_temp").val(),
          temp_cooling: $("#text_temp_cooling").val(),
          salinity: $("#text_salinity").val(),
        });
      } else {
        draw_chart(true);
        var start = $("#search_text_lng_water").val().slice(0, 10);
        var end = $("#search_text_lng_water").val().slice(13, 23);
        $("#statistics_lng_water").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          temp: $("#text_temp").val(),
          temp_cooling: $("#text_temp_cooling").val(),
          salinity: $("#text_salinity").val(),
        });
      }
    });

  //
  $("#set_text_salinity")
    .button()
    .on("click", function () {
      if ($("#search_text_lng_water").val() == "") {
        draw_chart(false);
        $("#statistics_lng_water").jsGrid("loadData", {
          Searching: true,
          temp: $("#text_temp").val(),
          temp_cooling: $("#text_temp_cooling").val(),
          salinity: $("#text_salinity").val(),
        });
      } else {
        draw_chart(true);
        var start = $("#search_text_lng_water").val().slice(0, 10);
        var end = $("#search_text_lng_water").val().slice(13, 23);
        $("#statistics_lng_water").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          temp: $("#text_temp").val(),
          temp_cooling: $("#text_temp_cooling").val(),
          salinity: $("#text_salinity").val(),
        });
      }
    });

  // CLEAN
  $("#search_clean_lng_water")
    .button()
    .on("click", function () {
      $("#search_text_lng_water").val("");
      $("#text_temp").val("");
      $("#text_temp_cooling").val("");
      $("#text_salinity").val("");
    });

  // ---------------------------------------------------------------------------------------
  // DRAW CHART
  // ---------------------------------------------------------------------------------------
  var ctx_LNGtempchart = document
    .getElementById("LNGtempchart")
    .getContext("2d");
  var LNGtempchart = new Chart(ctx_LNGtempchart, {
    type: "line",
  });

  var ctx_LNGsalinitychart = document
    .getElementById("LNGsalinitychart")
    .getContext("2d");
  var LNGsalinitychart = new Chart(ctx_LNGsalinitychart, {
    type: "line",
  });
  function draw_chart(searching) {
    // -----------------------------------------------------------------------------------
    // CHART
    // -----------------------------------------------------------------------------------

    var LngWaterJsonData = [];
    $.ajax({
      type: "get",
      async: false,
      url: "/db/lng_water",
      dataType: "json",
      success: function (statistics_lng_water) {
        // LngWaterJsonData = JSON.parse(statistics_lng_water);
        LngWaterJsonData = statistics_lng_water;
        //console.log("LngWaterJsonData:",LngWaterJsonData);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest.status);
        alert(XMLHttpRequest.readyState);
        alert(textStatus);
      },
    });
    var LngWaterJsonDataDate = [];
    var LngWaterJsonDataTemp = [];
    var LngWaterJsonDataCooling = [];
    var LngWaterJsonDataSalinity = [];
    var LngWaterJsonDataTemp_predict = [];
    var LngWaterJsonDataCooling_predict = [];
    var LngWaterJsonDataSalinity_predict = [];
    var data_year = [];

    if (searching == false) {
      var data_count = 15;
      for (var i = 0; i < data_count; i++) {
        if (LngWaterJsonData.length > i) {
          if (
            !data_year.includes(
              LngWaterJsonData[
                LngWaterJsonData.length - data_count - 1 + i
              ].record_date.substring(0, 4)
            )
          ) {
            data_year.push(
              LngWaterJsonData[
                LngWaterJsonData.length - data_count - 1 + i
              ].record_date.substring(0, 4)
            );
          }
          LngWaterJsonDataDate[i] = LngWaterJsonData[
            LngWaterJsonData.length - data_count - 1 + i
          ].record_date
            .substring(5, 10)
            .replace("-", "/");
          LngWaterJsonDataTemp[i] =
            LngWaterJsonData[LngWaterJsonData.length - data_count - 1 + i].temp;
          LngWaterJsonDataTemp_predict[i] = null;
          LngWaterJsonDataCooling[i] =
            LngWaterJsonData[
              LngWaterJsonData.length - data_count - 1 + i
            ].temp_cooling;
          LngWaterJsonDataCooling_predict[i] = null;
          LngWaterJsonDataSalinity[i] =
            LngWaterJsonData[
              LngWaterJsonData.length - data_count - 1 + i
            ].salinity;
          LngWaterJsonDataSalinity_predict[i] = null;
        } else {
          break;
        }
      }

      // CHART PREDICT START
      LngWaterJsonDataTemp_predict[LngWaterJsonDataTemp_predict.length - 1] =
        LngWaterJsonDataTemp[LngWaterJsonDataTemp.length - 1];
      LngWaterJsonDataCooling_predict[
        LngWaterJsonDataCooling_predict.length - 1
      ] = LngWaterJsonDataCooling[LngWaterJsonDataCooling.length - 1];
      LngWaterJsonDataSalinity_predict[
        LngWaterJsonDataSalinity_predict.length - 1
      ] = LngWaterJsonDataSalinity[LngWaterJsonDataSalinity.length - 1];
      LngWaterJsonDataDate[LngWaterJsonDataDate.length] = "09/06";
      LngWaterJsonDataDate[LngWaterJsonDataDate.length] = "09/07";
      LngWaterJsonDataDate[LngWaterJsonDataDate.length] = "09/08";
      for (var i = 0; i < 3; i++) {
        LngWaterJsonDataTemp_predict[LngWaterJsonDataTemp_predict.length] =
          24 + i;
        LngWaterJsonDataCooling_predict[
          LngWaterJsonDataCooling_predict.length
        ] = 23 + i * 0.2;
        LngWaterJsonDataSalinity_predict[
          LngWaterJsonDataSalinity_predict.length
        ] = 33.2 - i * 0.2;
      }
      // CHART PREDICT END
    } else {
      var searching_area_start = $("#search_text_lng_water").val().slice(0, 10);
      var searching_area_end = $("#search_text_lng_water").val().slice(13, 23);
      for (var i = 0; i < LngWaterJsonData.length; i++) {
        var current_date = LngWaterJsonData[i].record_date
          .slice(0, 10)
          .replace("-", "/");
        if (
          Date.parse(searching_area_start) <= Date.parse(current_date) &&
          Date.parse(searching_area_end) >= Date.parse(current_date)
        ) {
          if (
            !data_year.includes(LngWaterJsonData[i].record_date.substring(0, 4))
          ) {
            data_year.push(LngWaterJsonData[i].record_date.substring(0, 4));
          }
          LngWaterJsonDataDate.push(
            LngWaterJsonData[i].record_date.substring(5, 10).replace("-", "/")
          );
          LngWaterJsonDataTemp.push(LngWaterJsonData[i].temp);
          // LngWaterJsonDataTemp_predict.push(null) ;
          LngWaterJsonDataCooling.push(LngWaterJsonData[i].temp_cooling);
          // LngWaterJsonDataCooling_predict.push(null) ;
          LngWaterJsonDataSalinity.push(LngWaterJsonData[i].salinity);
          // LngWaterJsonDataSalinity_predict.push(null) ;
        }
      }
    }

    var data_year_string = "";
    if (data_year.length == 1)
      data_year_string = data_year[0].toString() + " 年";
    else if (data_year.length > 1) {
      data_year_string = data_year[0].toString() + " ~ ";
      data_year_string += data_year[data_year.length - 1].toString() + " 年";
    }

    LNGtempchart.destroy();
    LNGtempchart = new Chart(ctx_LNGtempchart, {
      type: "line",
      data: {
        labels: LngWaterJsonDataDate,
        datasets: [
          {
            label: "進水水溫(°C)",
            data: LngWaterJsonDataTemp,
            fill: false,
            borderColor: "#eb8383",
            backgroundColor: "#eb8383",
          },
          {
            label: "預測進水水溫(°C)",
            data: LngWaterJsonDataTemp_predict,
            fill: false,
            backgroundColor: "#daabab",
            borderDash: [10, 5],
            borderColor: "#daabab",
            pointBackgroundColor: "transparent",
            hoverBackgroundColor: "#000000",
          },
          {
            label: "冷卻水溫(°C)",
            data: LngWaterJsonDataCooling,
            fill: false,
            backgroundColor: "#83c6ea",
            borderColor: "#83c6ea",
          },
          {
            label: "預測冷卻水溫(°C)",
            data: LngWaterJsonDataCooling_predict,
            fill: false,
            backgroundColor: "#a8c9db",
            borderDash: [10, 5],
            borderColor: "#a8c9db",
            pointBackgroundColor: "transparent",
          },
        ],
      },
      options: {
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
              type: "linear",
              position: "left",
              display: true,
              scaleLabel: {
                display: true,
                labelString: "溫度(°C)",
              },
              ticks: {
                beginAtZero: false,
              },
            },
          ],
        },
      },
    });

    LNGsalinitychart.destroy();
    LNGsalinitychart = new Chart(ctx_LNGsalinitychart, {
      type: "line",
      data: {
        labels: LngWaterJsonDataDate,
        datasets: [
          {
            label: "鹽度(‰ )",
            data: LngWaterJsonDataSalinity,
            fill: false,
            backgroundColor: "#f4c63d",
            borderColor: "#f4c63d",
          },
          {
            label: "預測鹽度(‰ )",
            data: LngWaterJsonDataSalinity_predict,
            fill: false,
            backgroundColor: "#e0c984",
            borderDash: [10, 5],
            borderColor: "#e0c984",
            pointBackgroundColor: "transparent",
          },
        ],
      },
      options: {
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
              type: "linear",
              position: "left",
              display: true,
              scaleLabel: {
                display: true,
                labelString: "鹽度(‰ )",
              },
              ticks: {
                beginAtZero: false,
              },
            },
          ],
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
          async: true,
          url: "/db/lng_water",
          dataType: "json",
          data: filter,
        }).done(function (response) {
          var LngWaterData = [];
          // var LngWaterJsonData = JSON.parse(response);
          var LngWaterJsonData = response;
          // console.log("filter:", filter);
          if (filter["Searching"] == true) {
            if (
              filter["temp"] !== "" ||
              filter["temp_cooling"] !== "" ||
              filter["salinity"] !== ""
            ) {
              console.log("1");
              for (var i = LngWaterJsonData.length - 1; i >= 0; i--) {
                if (
                  filter["temp"] === LngWaterJsonData[i].temp.toString() ||
                  filter["temp_cooling"] ===
                    LngWaterJsonData[i].temp_cooling.toString() ||
                  filter["salinity"] === LngWaterJsonData[i].salinity.toString()
                ) {
                  var element = {
                    record_date: LngWaterJsonData[i].record_date,
                    temp: LngWaterJsonData[i].temp,
                    temp_cooling: LngWaterJsonData[i].temp_cooling,
                    salinity: LngWaterJsonData[i].salinity,
                  };
                  LngWaterData.push(element);
                }
              }
            } else {
              console.log("2");
              for (var i = LngWaterJsonData.length - 1; i >= 0; i--) {
                var element = {
                  record_date: LngWaterJsonData[i].record_date,
                  temp: LngWaterJsonData[i].temp,
                  temp_cooling: LngWaterJsonData[i].temp_cooling,
                  salinity: LngWaterJsonData[i].salinity,
                };
                LngWaterData.push(element);
              }
            }
          } else {
            var searching_area_start = filter["Start"];
            var searching_area_end = filter["End"];
            if (
              filter["temp"] !== "" ||
              filter["temp_cooling"] !== "" ||
              filter["salinity"] !== ""
            ) {
              console.log("3");
              for (var i = LngWaterJsonData.length - 1; i >= 0; i--) {
                if (
                  filter["temp"] === LngWaterJsonData[i].temp.toString() ||
                  filter["temp_cooling"] ===
                    LngWaterJsonData[i].temp_cooling.toString() ||
                  filter["salinity"] === LngWaterJsonData[i].salinity.toString()
                ) {
                  var current_date = LngWaterJsonData[i].record_date
                    .slice(0, 10)
                    .replace("-", "/");
                  if (
                    Date.parse(searching_area_start) <=
                      Date.parse(current_date) &&
                    Date.parse(searching_area_end) >= Date.parse(current_date)
                  ) {
                    var element = {
                      record_date: LngWaterJsonData[i].record_date,
                      temp: LngWaterJsonData[i].temp,
                      temp_cooling: LngWaterJsonData[i].temp_cooling,
                      salinity: LngWaterJsonData[i].salinity,
                    };
                    LngWaterData.push(element);
                  }
                }
              }
            } else {
              console.log("4");
              for (var i = LngWaterJsonData.length - 1; i >= 0; i--) {
                var current_date = LngWaterJsonData[i].record_date
                  .slice(0, 10)
                  .replace("-", "/");
                if (
                  Date.parse(searching_area_start) <=
                    Date.parse(current_date) &&
                  Date.parse(searching_area_end) >= Date.parse(current_date)
                ) {
                  var element = {
                    record_date: LngWaterJsonData[i].record_date,
                    temp: LngWaterJsonData[i].temp,
                    temp_cooling: LngWaterJsonData[i].temp_cooling,
                    salinity: LngWaterJsonData[i].salinity,
                  };
                  LngWaterData.push(element);
                }
              }
            }
          }
          data.resolve(LngWaterData);
          $("#statistics_lng_water").jsGrid("sort", "record_date", "desc");
          csv_data = LngWaterData;
        });
        return data.promise();
      },
    },

    fields: [
      {
        name: "record_date",
        title: "紀錄日期",
        type: "date",
        width: 150,
        align: "center",
      },
      {
        name: "temp",
        title: "進水水溫(°C)",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_temp").val();
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
        name: "temp_cooling",
        title: "冷卻水溫(°C)",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_temp_cooling").val();
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
        name: "salinity",
        title: "鹽度(‰ )",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_salinity").val();
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
    var fileName = "LNG廠水質資料";

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
              fileName: "LNG廠水質資料",
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
                link.download = "LNG廠水質資料.xlsx";
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
