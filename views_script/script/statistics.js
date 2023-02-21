// 報表匯出的圖片參數
let imageData = []; //base64Data, width, height;
$(function () {
  // Global variable
  let Labels = [
    "池號",
    "投餌編號",
    "投餌日期",
    "魚隻數量(隻)",
    "投餌量(克)",
    "投餌料號",
    "死亡數量(隻)",
  ];
  let csv_data = [];
  // ---------------------------------------------------------------------------------------
  // SEARCH FUNCTION
  // ---------------------------------------------------------------------------------------
  $("#search_text_feed").daterangepicker({
    showDropdowns: true,
    locale: {
      format: "YYYY/MM/DD",
    },
  });

  // SEARCH
  $("#search_execute_feed").button().on("click", SearchTInit);
  $("#set_text_No").button().on("click", SearchTInit);
  $("#set_text_Cage").button().on("click", SearchTInit);
  $("#set_text_Num").button().on("click", SearchTInit);
  $("#set_text_Feed_num").button().on("click", SearchTInit);
  $("#set_text_Feed_no").button().on("click", SearchTInit);
  $("#set_text_Death").button().on("click", SearchTInit);

  // CLEAN
  $("#search_clean_feed")
    .button()
    .on("click", function () {
      $("#search_text_feed").val("");
      $("#text_No").val("");
      $("#text_Cage").val("");
      $("#text_Num").val("");
      $("#text_Feed_num").val("");
      $("#text_Feed_no").val("");
      $("#text_Death").val("");
    });

  function SearchTInit() {
    if ($("#search_text_feed").val() == "") {
      draw_chart(false);
      $("#statistics_feed_jsGrid").jsGrid("loadData", {
        Searching: true,
        No: $("#text_No").val(),
        Cage: $("#text_Cage").val(),
        Num: $("#text_Num").val(),
        Feed_num: $("#text_Feed_num").val(),
        Feed_no: $("#text_Feed_no").val(),
        Death: $("#text_Death").val(),
      });
    } else {
      draw_chart(true);
      var start = $("#search_text_feed").val().slice(0, 10);
      var end = $("#search_text_feed").val().slice(13, 23);
      $("#statistics_feed_jsGrid").jsGrid("loadData", {
        Searching: false,
        Start: start,
        End: end,
        No: $("#text_No").val(),
        Cage: $("#text_Cage").val(),
        Num: $("#text_Num").val(),
        Feed_num: $("#text_Feed_num").val(),
        Feed_no: $("#text_Feed_no").val(),
        Death: $("#text_Death").val(),
      });
    }
  }
  // ---------------------------------------------------------------------------------------
  // DRAW CHART
  // ---------------------------------------------------------------------------------------
  var ctx_LNGfishchart = document
    .getElementById("LNGfishchart")
    .getContext("2d");
  var LNGfishchart = new Chart(ctx_LNGfishchart, {
    type: "bar",
  });

  var ctx_LNGprovenderchart = document
    .getElementById("LNGprovenderchart")
    .getContext("2d");
  var LNGprovenderchart = new Chart(ctx_LNGprovenderchart, {
    type: "line",
  });
  function draw_chart(searching) {
    // -----------------------------------------------------------------------------------
    // CHART
    // -----------------------------------------------------------------------------------

    var FeedJsonData = [];
    $.ajax({
      type: "get",
      async: false,
      url: "/db/feed",
      dataType: "json",
      success: function (statistics_feed) {
        //FeedJsonData = JSON.parse(statistics_feed);
        FeedJsonData = statistics_feed;
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest.status);
        alert(XMLHttpRequest.readyState);
        alert(textStatus);
      },
    });
    var FeedJsonDataNo = [];
    var FeedJsonDataCage = [];
    var FeedJsonDataFeedDate = [];
    var FeedJsonDataNum = [];
    var FeedJsonDataFeedNum = [];
    var FeedJsonDataFeedNum_predict = [];
    var FeedJsonDataFeedNo = [];
    var FeedJsonDataDeath = [];
    var data_year = [];

    if (searching == false) {
      var data_count = 15;
      for (var i = 0; i < data_count; i++) {
        if (FeedJsonData.length > i) {
          FeedJsonDataNo[i] =
            FeedJsonData[FeedJsonData.length - data_count + i].No;
          FeedJsonDataCage[i] =
            FeedJsonData[FeedJsonData.length - data_count + i].Cage;
          if (
            !data_year.includes(
              FeedJsonData[
                FeedJsonData.length - data_count - 1 + i
              ].Feed_date.substring(0, 4)
            )
          ) {
            data_year.push(
              FeedJsonData[
                FeedJsonData.length - data_count - 1 + i
              ].Feed_date.substring(0, 4)
            );
          }
          FeedJsonDataFeedDate[i] = FeedJsonData[
            FeedJsonData.length - data_count + i
          ].Feed_date.substring(5, 10).replace("-", "/");
          FeedJsonDataNum[i] =
            FeedJsonData[FeedJsonData.length - data_count + i].Num;
          FeedJsonDataFeedNum[i] =
            FeedJsonData[FeedJsonData.length - data_count + i].Feed_num;
          FeedJsonDataFeedNum_predict[i] = null;
          FeedJsonDataFeedNo[i] =
            FeedJsonData[FeedJsonData.length - data_count + i].Feed_no;
          FeedJsonDataDeath[i] =
            FeedJsonData[FeedJsonData.length - data_count + i].Death;
          // FeedJsonDataDeath[i] = "200";
        } else {
          break;
        }
      }

      // CHART PREDICT START
      FeedJsonDataFeedNum_predict[FeedJsonDataFeedNum_predict.length - 1] =
        FeedJsonDataFeedNum[FeedJsonDataFeedNum.length - 1];
      FeedJsonDataFeedDate[FeedJsonDataFeedDate.length] = "09/06";
      FeedJsonDataFeedDate[FeedJsonDataFeedDate.length] = "09/07";
      FeedJsonDataFeedDate[FeedJsonDataFeedDate.length] = "09/08";
      FeedJsonDataFeedNum_predict[FeedJsonDataFeedNum_predict.length] = 0;
      FeedJsonDataFeedNum_predict[FeedJsonDataFeedNum_predict.length] = 2500;
      FeedJsonDataFeedNum_predict[FeedJsonDataFeedNum_predict.length] = 3000;
      // CHART PREDICT END
    } else {
      var searching_area_start = $("#search_text_feed").val().slice(0, 10);
      var searching_area_end = $("#search_text_feed").val().slice(13, 23);
      for (var i = 0; i < FeedJsonData.length; i++) {
        var current_date = FeedJsonData[i].Feed_date.slice(0, 10).replace(
          "-",
          "/"
        );
        if (
          Date.parse(searching_area_start) <= Date.parse(current_date) &&
          Date.parse(searching_area_end) >= Date.parse(current_date)
        ) {
          //console.log(current_date);
          FeedJsonDataNo.push(FeedJsonData[i].No);
          FeedJsonDataCage.push(FeedJsonData[i].Cage);
          if (!data_year.includes(FeedJsonData[i].Feed_date.substring(0, 4))) {
            data_year.push(FeedJsonData[i].Feed_date.substring(0, 4));
          }
          FeedJsonDataFeedDate.push(
            FeedJsonData[i].Feed_date.substring(5, 10).replace("-", "/")
          );
          FeedJsonDataNum.push(FeedJsonData[i].Num);
          FeedJsonDataFeedNum.push(FeedJsonData[i].Feed_num);
          //FeedJsonDataFeedNum_predict.push(null);
          FeedJsonDataFeedNo.push(FeedJsonData[i].Feed_no);
          FeedJsonDataDeath.push(FeedJsonData[i].Death);
        }
      }
    }

    // console.log(FeedJsonDataNum);
    var data_year_string = "";
    if (data_year.length == 1)
      data_year_string = data_year[0].toString() + " 年";
    else if (data_year.length > 1) {
      data_year_string = data_year[0].toString() + " ~ ";
      data_year_string += data_year[data_year.length - 1].toString() + " 年";
    }

    LNGfishchart.destroy();
    LNGfishchart = new Chart(ctx_LNGfishchart, {
      type: "bar",
      data: {
        labels:
          searching == false
            ? FeedJsonDataFeedDate.slice().splice(
                0,
                FeedJsonDataFeedDate.length - 3
              )
            : FeedJsonDataFeedDate.slice(), // slice複製 splice移除
        datasets: [
          {
            label: "魚隻數量(隻)",
            data: FeedJsonDataNum,
            backgroundColor: "#f4c63d",
            borderColor: "#f4c63d",
            borderWidth: 1,
          },
          {
            label: "死亡數量(隻)",
            data: FeedJsonDataDeath,
            backgroundColor: "#eb8383",
            borderColor: "#eb8383",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        legend: {
          position: "top",
        },
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
                labelString: "數量(隻)",
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    LNGprovenderchart.destroy();
    LNGprovenderchart = new Chart(ctx_LNGprovenderchart, {
      type: "line",
      data: {
        labels: FeedJsonDataFeedDate,
        tips: FeedJsonDataFeedNo,
        datasets: [
          {
            label: "投餌量(克)",
            steppedLine: "middle",
            data: FeedJsonDataFeedNum,
            backgroundColor: "#36a2eb",
            borderColor: "#36a2eb",
            fill: false,
          },
          {
            label: "預測投餌量(克)",
            steppedLine: "middle",
            borderDash: [10, 5],
            data: FeedJsonDataFeedNum_predict,
            backgroundColor: "#8da8ba",
            borderColor: "#8da8ba",
            fill: false,
            pointBackgroundColor: "transparent",
          },
        ],
      },
      options: {
        responsive: true,
        legend: {
          position: "top",
        },
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
                labelString: "投餌量(克)",
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              // console.log(tooltipItem);
              // console.log(data);
              var label = "投餌量:";
              label += tooltipItem.yLabel;
              label += ", ";
              label += "投餌料號:";
              label += data.tips[tooltipItem.index];
              return label;
            },
          },
        },
      },
    });
  }

  // ---------------------------------------------------------------------------------------
  // STATISTICS_FEED TABLE
  // ---------------------------------------------------------------------------------------
  $("#statistics_feed_jsGrid").jsGrid({
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
          url: "/db/feed",
          dataType: "json",
          data: filter,
        }).done(function (response) {
          var FeedJsonData = [];
          // var FeedJsonDataJson = JSON.parse(response);
          var FeedJsonDataJson = response;
          if (filter["Searching"] == true) {
            if (
              filter["No"] !== "" ||
              filter["Cage"] !== "" ||
              filter["Num"] !== "" ||
              filter["Feed_num"] !== "" ||
              filter["Feed_no"] !== "" ||
              filter["Death"] !== ""
            ) {
              console.log("1");

              for (var i = FeedJsonDataJson.length - 1; i >= 0; i--) {
                if (
                  filter["No"] === FeedJsonDataJson[i].No.toString() ||
                  filter["Cage"] === FeedJsonDataJson[i].Cage.toString() ||
                  filter["Num"] === FeedJsonDataJson[i].Num.toString() ||
                  filter["Feed_num"] ===
                    FeedJsonDataJson[i].Feed_num.toString() ||
                  filter["Feed_no"] ===
                    FeedJsonDataJson[i].Feed_no.toString() ||
                  filter["Death"] === FeedJsonDataJson[i].Death.toString()
                ) {
                  var element = {
                    No: FeedJsonDataJson[i].No,
                    Cage: FeedJsonDataJson[i].Cage,
                    Feed_date: FeedJsonDataJson[i].Feed_date,
                    Num: FeedJsonDataJson[i].Num,
                    Feed_num: FeedJsonDataJson[i].Feed_num,
                    Feed_no: FeedJsonDataJson[i].Feed_no,
                    Death: FeedJsonDataJson[i].Death,
                  };
                  FeedJsonData.push(element);
                }
              }
            } else {
              console.log("2");
              for (var i = FeedJsonDataJson.length - 1; i >= 0; i--) {
                var element = {
                  No: FeedJsonDataJson[i].No,
                  Cage: FeedJsonDataJson[i].Cage,
                  Feed_date: FeedJsonDataJson[i].Feed_date,
                  Num: FeedJsonDataJson[i].Num,
                  Feed_num: FeedJsonDataJson[i].Feed_num,
                  Feed_no: FeedJsonDataJson[i].Feed_no,
                  Death: FeedJsonDataJson[i].Death,
                };
                FeedJsonData.push(element);
              }
            }
          } else {
            var searching_area_start = filter["Start"];
            var searching_area_end = filter["End"];
            if (
              filter["No"] !== "" ||
              filter["Cage"] !== "" ||
              filter["Num"] !== "" ||
              filter["Feed_num"] !== "" ||
              filter["Feed_no"] !== "" ||
              filter["Death"] !== ""
            ) {
              console.log("3");
              for (var i = FeedJsonDataJson.length - 1; i >= 0; i--) {
                if (
                  filter["No"] === FeedJsonDataJson[i].No.toString() ||
                  filter["Cage"] === FeedJsonDataJson[i].Cage.toString() ||
                  filter["Num"] === FeedJsonDataJson[i].Num.toString() ||
                  filter["Feed_num"] ===
                    FeedJsonDataJson[i].Feed_num.toString() ||
                  filter["Feed_no"] ===
                    FeedJsonDataJson[i].Feed_no.toString() ||
                  filter["Death"] === FeedJsonDataJson[i].Death.toString()
                ) {
                  var current_date = FeedJsonDataJson[i].Feed_date.slice(
                    0,
                    10
                  ).replace("-", "/");
                  if (
                    Date.parse(searching_area_start) <=
                      Date.parse(current_date) &&
                    Date.parse(searching_area_end) >= Date.parse(current_date)
                  ) {
                    var element = {
                      No: FeedJsonDataJson[i].No,
                      Cage: FeedJsonDataJson[i].Cage,
                      Feed_date: FeedJsonDataJson[i].Feed_date,
                      Num: FeedJsonDataJson[i].Num,
                      Feed_num: FeedJsonDataJson[i].Feed_num,
                      Feed_no: FeedJsonDataJson[i].Feed_no,
                      Death: FeedJsonDataJson[i].Death,
                    };
                    FeedJsonData.push(element);
                  }
                }
              }
            } else {
              console.log("4");
              for (var i = FeedJsonDataJson.length - 1; i >= 0; i--) {
                var current_date = FeedJsonDataJson[i].Feed_date.slice(
                  0,
                  10
                ).replace("-", "/");
                if (
                  Date.parse(searching_area_start) <=
                    Date.parse(current_date) &&
                  Date.parse(searching_area_end) >= Date.parse(current_date)
                ) {
                  var element = {
                    No: FeedJsonDataJson[i].No,
                    Cage: FeedJsonDataJson[i].Cage,
                    Feed_date: FeedJsonDataJson[i].Feed_date,
                    Num: FeedJsonDataJson[i].Num,
                    Feed_num: FeedJsonDataJson[i].Feed_num,
                    Feed_no: FeedJsonDataJson[i].Feed_no,
                    Death: FeedJsonDataJson[i].Death,
                  };
                  FeedJsonData.push(element);
                }
              }
            }
          }
          data.resolve(FeedJsonData);
          $("#statistics_feed_jsGrid").jsGrid("sort", "Feed_date", "desc");
          csv_data = FeedJsonData;
        });
        return data.promise();
      },
    },

    fields: [
      {
        name: "Feed_date",
        title: "投餌日期",
        type: "date",
        width: 150,
        align: "center",
      },
      {
        name: "No",
        title: "投餌編號",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_No").val();
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
        name: "Cage",
        title: "池號",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Cage").val();
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
        name: "Num",
        title: "魚隻數量(隻)",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Num").val();
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
        name: "Feed_num",
        title: "投餌量(克)",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Feed_num").val();
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
        name: "Feed_no",
        title: "投餌料號",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Feed_no").val();
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
        name: "Death",
        title: "死亡數量(隻)",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Death").val();
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
  $("#search_text_feed").val("");
  $("#search_execute_feed").trigger("click");
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
    var fileName = "LNG廠投餌資料";

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
              fileName: "LNG廠投餌資料",
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
                link.download = "LNG廠投餌資料.xlsx";
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
