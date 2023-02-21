// 報表匯出的圖片參數
let imageData = []; //base64Data, width, height;
$(function () {
  // Global variable
  let Labels = [
    "紀錄日期",
    "池號",
    "樣本編號",
    "物種",
    "體高(公分)",
    "體寬(公分)",
    "尾叉長(公分)",
    "尾柄高(公分)",
    "眼徑(公分)",
    "重量(克)",
  ];
  let csv_data = [];
  // ---------------------------------------------------------------------------------------
  // SEARCH FUNCTION
  // ---------------------------------------------------------------------------------------
  $("#search_text_fish_record").daterangepicker({
    showDropdowns: true,
    locale: {
      format: "YYYY/MM/DD",
    },
  });

  // SEARCH
  $("#search_fish_record")
    .button()
    .on("click", function () {
      if ($("#search_text_fish_record").val() == "") {
        //draw_chart(false);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: true,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      } else {
        //draw_chart(true);
        var start = $("#search_text_fish_record").val().slice(0, 10);
        var end = $("#search_text_fish_record").val().slice(13, 23);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      }
    });

  //
  $("#set_text_Cage_no")
    .button()
    .on("click", function () {
      if ($("#search_text_fish_record").val() == "") {
        //draw_chart(false);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: true,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      } else {
        //draw_chart(true);
        var start = $("#search_text_fish_record").val().slice(0, 10);
        var end = $("#search_text_fish_record").val().slice(13, 23);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      }
    });

  //
  $("#set_text_Sample_no")
    .button()
    .on("click", function () {
      if ($("#search_text_fish_record").val() == "") {
        //draw_chart(false);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: true,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      } else {
        //draw_chart(true);
        var start = $("#search_text_fish_record").val().slice(0, 10);
        var end = $("#search_text_fish_record").val().slice(13, 23);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      }
    });

  //
  $("#set_text_Specie")
    .button()
    .on("click", function () {
      if ($("#search_text_fish_record").val() == "") {
        //draw_chart(false);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: true,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      } else {
        //draw_chart(true);
        var start = $("#search_text_fish_record").val().slice(0, 10);
        var end = $("#search_text_fish_record").val().slice(13, 23);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      }
    });

  //
  $("#set_text_Body_height")
    .button()
    .on("click", function () {
      if ($("#search_text_fish_record").val() == "") {
        //draw_chart(false);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: true,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      } else {
        //draw_chart(true);
        var start = $("#search_text_fish_record").val().slice(0, 10);
        var end = $("#search_text_fish_record").val().slice(13, 23);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      }
    });

  //
  $("#set_text_Body_width")
    .button()
    .on("click", function () {
      if ($("#search_text_fish_record").val() == "") {
        //draw_chart(false);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: true,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      } else {
        //draw_chart(true);
        var start = $("#search_text_fish_record").val().slice(0, 10);
        var end = $("#search_text_fish_record").val().slice(13, 23);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      }
    });

  //
  $("#set_text_Body_len")
    .button()
    .on("click", function () {
      if ($("#search_text_fish_record").val() == "") {
        //draw_chart(false);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: true,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      } else {
        //draw_chart(true);
        var start = $("#search_text_fish_record").val().slice(0, 10);
        var end = $("#search_text_fish_record").val().slice(13, 23);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      }
    });

  //=====
  $("#set_text_Tail_height")
    .button()
    .on("click", function () {
      if ($("#search_text_fish_record").val() == "") {
        //draw_chart(false);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: true,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      } else {
        //draw_chart(true);
        var start = $("#search_text_fish_record").val().slice(0, 10);
        var end = $("#search_text_fish_record").val().slice(13, 23);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      }
    });
  //
  $("#set_text_Eye_radius")
    .button()
    .on("click", function () {
      if ($("#search_text_fish_record").val() == "") {
        //draw_chart(false);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: true,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      } else {
        //draw_chart(true);
        var start = $("#search_text_fish_record").val().slice(0, 10);
        var end = $("#search_text_fish_record").val().slice(13, 23);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      }
    });
  //
  $("#set_text_Weight")
    .button()
    .on("click", function () {
      if ($("#search_text_fish_record").val() == "") {
        //draw_chart(false);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: true,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      } else {
        //draw_chart(true);
        var start = $("#search_text_fish_record").val().slice(0, 10);
        var end = $("#search_text_fish_record").val().slice(13, 23);
        $("#statistics_fish_record").jsGrid("loadData", {
          Searching: false,
          Start: start,
          End: end,
          Cage_no: $("#text_Cage_no").val(),
          Sample_no: $("#text_Sample_no").val(),
          Specie: $("#text_Specie").val(),
          Body_height: $("#text_Body_height").val(),
          Body_width: $("#text_Body_width").val(),
          Body_len: $("#text_Body_len").val(),
          Tail_height: $("#text_Tail_height").val(),
          Eye_radius: $("#text_Eye_radius").val(),
          Weight: $("#text_Weight").val(),
        });
      }
    });

  // CLEAN
  $("#search_clean_fish_record")
    .button()
    .on("click", function () {
      $("#search_text_fish_record").val("");
      $("#text_Cage_no").val("");
      $("#text_Sample_no").val("");
      $("#text_Specie").val("");
      $("#text_Body_height").val("");
      $("#text_Body_width").val("");
      $("#text_Body_len").val("");
      $("#text_Tail_height").val("");
      $("#text_Eye_radius").val("");
      $("#text_Weight").val("");
    });

  // -----------------------------------------------------------------------------------
  // CHART
  // -----------------------------------------------------------------------------------
  var ctx_LNGfishbodychart = document
    .getElementById("LNGfishbodychart")
    .getContext("2d");
  var LNGfishbodychart = new Chart(ctx_LNGfishbodychart, {
    type: "scatter",
  });

  $("#LNGfishbodychartbutton")
    .button()
    .on("click", function () {
      ctx_LNGfishbodychart = document
        .getElementById("LNGfishbodychart")
        .getContext("2d");

      var FishRecordJsonData = [];
      $.ajax({
        type: "get",
        async: false,
        url: "/db/fish_record",
        dataType: "json",
        success: function (statistics_fish_record) {
          FishRecordJsonData = statistics_fish_record; //JSON.parse(statistics_fish_record)->statistics_fish_record
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert(XMLHttpRequest.status);
          alert(XMLHttpRequest.readyState);
          alert(textStatus);
        },
      });
      // console.log(FishRecordJsonData);
      var x_axes = $("select[name=LNGfishbodychart_x]").val();
      var y_axes = $("select[name=LNGfishbodychart_y]").val();
      // console.log(x_axes);
      // console.log(y_axes);
      var x_axes_text = $("#LNGfishbodychart_x > option:selected").text();
      var y_axes_text = $("#LNGfishbodychart_y > option:selected").text();
      // console.log(x_axes_text);
      // console.log(y_axes);
      var totalFish = [];
      var FishRecordDate = [];
      var FishRecordCage = [];
      var FishRecordSample = [];
      var FishRecordSpecie = [];
      var FishRecordBodyHeight = [];
      var FishRecordBodyWidth = [];
      var FishRecordBody = [];
      var FishRecordBodyLen = [];
      var FishRecordBodyTailHeight = [];
      var FishRecordBodyEyeRadius = [];
      var FishRecordBodyWeight = [];
      // Record Species
      for (var i = 0; i < FishRecordJsonData.length; i++) {
        const species = (element) => element == FishRecordJsonData[i].Specie;
        if (
          totalFish.findIndex(species) == -1 &&
          FishRecordJsonData[i].Specie != "Specie"
        )
          totalFish.push(FishRecordJsonData[i].Specie);
      }

      for (var i = 0; i < totalFish.length; i++) {
        FishRecordDate[i] = new Array();
        FishRecordCage[i] = new Array();
        FishRecordSample[i] = new Array();
        FishRecordSpecie[i] = new Array();
        FishRecordBody[i] = new Array();
        FishRecordBodyHeight[i] = new Array();
        FishRecordBodyWidth[i] = new Array();
        FishRecordBodyLen[i] = new Array();
        FishRecordBodyTailHeight[i] = new Array();
        FishRecordBodyEyeRadius[i] = new Array();
        FishRecordBodyWeight[i] = new Array();
      }

      for (var i = 0; i < FishRecordJsonData.length; i++) {
        const species = (element) => element == FishRecordJsonData[i].Specie;
        var FS = totalFish.findIndex(species);
        if (FS != -1 && FishRecordJsonData[i].Sample_date != "0000-00-00") {
          FishRecordDate[FS].push(FishRecordJsonData[i].Sample_date); //.replaceAll('-', '/')
          FishRecordCage[FS].push(FishRecordJsonData[i].Cage_no);
          FishRecordSample[FS].push(FishRecordJsonData[i].Sample_no);
          FishRecordSpecie[FS].push(FishRecordJsonData[i].Specie);
          FishRecordBody[FS].push({
            x: FishRecordJsonData[i][x_axes],
            y: FishRecordJsonData[i][y_axes],
          });
          FishRecordBodyHeight[FS].push(FishRecordJsonData[i].Body_height);
          FishRecordBodyWidth[FS].push(FishRecordJsonData[i].Body_width);
          FishRecordBodyLen[FS].push(FishRecordJsonData[i].Body_len);
          FishRecordBodyTailHeight[FS].push(FishRecordJsonData[i].Tail_height);
          FishRecordBodyEyeRadius[FS].push(FishRecordJsonData[i].Eye_radius);
          FishRecordBodyWeight[FS].push(FishRecordJsonData[i].Weight);
        }
      }

      var dataset = { datasets: [] };
      for (var i = 0; i < totalFish.length; i++) {
        dataset.datasets.push({
          information: FishRecordSpecie[i],
          label: totalFish[i],
          data: FishRecordBody[i],
          backgroundColor: selectcolor(i),
          borderColor: selectcolor(i),
        });
      }

      LNGfishbodychart.destroy();
      LNGfishbodychart = new Chart(ctx_LNGfishbodychart, {
        type: "scatter",
        data: dataset,
        options: {
          scales: {
            xAxes: [
              {
                type: "linear",
                position: "bottom",
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: x_axes_text,
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
                  labelString: y_axes_text,
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                var label = " (" + x_axes_text + ", " + y_axes_text + ") = (";
                label += tooltipItem.xLabel;
                label += ", ";
                label += tooltipItem.yLabel;
                label += ")";
                return label;
              },
            },
          },
        },
      });

      function selectcolor(length) {
        var color = [
          "#1f77b4",
          "#ff7f0e",
          "#2ca02c",
          "#d62728",
          "#9467bd",
          "#8c564b",
          "#e377c2",
          "#7f7f7f",
          "#bcbd22",
          "#17becf",
        ];

        // var i = (length * 255 / maxLength);
        // var r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
        // var g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
        // var b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);

        // return 'rgb(' + r + ',' + g + ',' + b + ')';
        return color[length % 10];
      }
    });

  // ---------------------------------------------------------------------------------------
  // STATISTICS_FISH_RECORD TABLE
  // ---------------------------------------------------------------------------------------
  $("#statistics_fish_record").jsGrid({
    height: "auto",
    width: "100%",
    // autoload: true,
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
          url: "/db/fish_record",
          dataType: "json",
          data: filter,
        }).done(function (response) {
          var FishRecordData = [];
          var FishRecordJsonData = response; //JSON.parse(response)->response
          // console.log("filter:", filter);
          // console.log("filter['Searching']:", filter["Searching"]);
          if (filter["Searching"] == true) {
            if (
              filter["Cage_no"] !== "" ||
              filter["Sample_no"] !== "" ||
              filter["Specie"] !== "" ||
              filter["Body_height"] !== "" ||
              filter["Body_width"] !== "" ||
              filter["Body_len"] !== "" ||
              filter["Tail_height"] !== "" ||
              filter["Eye_radius"] !== "" ||
              filter["Weight"] !== ""
            ) {
              console.log("1");
              for (var i = FishRecordJsonData.length - 1; i >= 0; i--) {
                if (
                  filter["Cage_no"] ===
                    FishRecordJsonData[i].Cage_no.toString() ||
                  filter["Sample_no"] ===
                    FishRecordJsonData[i].Sample_no.toString() ||
                  filter["Specie"] ===
                    FishRecordJsonData[i].Specie.toString() ||
                  filter["Body_height"] ===
                    FishRecordJsonData[i].Body_height.toString() ||
                  filter["Body_width"] ===
                    FishRecordJsonData[i].Body_width.toString() ||
                  filter["Body_len"] ===
                    FishRecordJsonData[i].Body_len.toString() ||
                  filter["Tail_height"] ===
                    FishRecordJsonData[i].Tail_height.toString() ||
                  filter["Eye_radius"] ===
                    FishRecordJsonData[i].Eye_radius.toString() ||
                  filter["Weight"] === FishRecordJsonData[i].Weight.toString()
                ) {
                  var element = {
                    Sample_date: FishRecordJsonData[i].Sample_date,
                    Cage_no: FishRecordJsonData[i].Cage_no,
                    Sample_no: FishRecordJsonData[i].Sample_no,
                    Specie: FishRecordJsonData[i].Specie,
                    Body_height: FishRecordJsonData[i].Body_height,
                    Body_width: FishRecordJsonData[i].Body_width,
                    Body_len: FishRecordJsonData[i].Body_len,
                    Tail_height: FishRecordJsonData[i].Tail_height,
                    Eye_radius: FishRecordJsonData[i].Eye_radius,
                    Weight: FishRecordJsonData[i].Weight,
                  };
                  FishRecordData.push(element);
                }
              }
            } else {
              console.log("2");
              for (var i = FishRecordJsonData.length - 1; i >= 0; i--) {
                var element = {
                  Sample_date: FishRecordJsonData[i].Sample_date,
                  Cage_no: FishRecordJsonData[i].Cage_no,
                  Sample_no: FishRecordJsonData[i].Sample_no,
                  Specie: FishRecordJsonData[i].Specie,
                  Body_height: FishRecordJsonData[i].Body_height,
                  Body_width: FishRecordJsonData[i].Body_width,
                  Body_len: FishRecordJsonData[i].Body_len,
                  Tail_height: FishRecordJsonData[i].Tail_height,
                  Eye_radius: FishRecordJsonData[i].Eye_radius,
                  Weight: FishRecordJsonData[i].Weight,
                };
                FishRecordData.push(element);
              }
            }
          } else {
            var searching_area_start = filter["Start"];
            var searching_area_end = filter["End"];
            if (
              filter["Cage_no"] !== "" ||
              filter["Sample_no"] !== "" ||
              filter["Specie"] !== "" ||
              filter["Body_height"] !== "" ||
              filter["Body_width"] !== "" ||
              filter["Body_len"] !== "" ||
              filter["Tail_height"] !== "" ||
              filter["Eye_radius"] !== "" ||
              filter["Weight"] !== ""
            ) {
              console.log("3");
              for (var i = FishRecordJsonData.length - 1; i >= 0; i--) {
                if (
                  filter["Cage_no"] ===
                    FishRecordJsonData[i].Cage_no.toString() ||
                  filter["Sample_no"] ===
                    FishRecordJsonData[i].Sample_no.toString() ||
                  filter["Specie"] ===
                    FishRecordJsonData[i].Specie.toString() ||
                  filter["Body_height"] ===
                    FishRecordJsonData[i].Body_height.toString() ||
                  filter["Body_width"] ===
                    FishRecordJsonData[i].Body_width.toString() ||
                  filter["Body_len"] ===
                    FishRecordJsonData[i].Body_len.toString() ||
                  filter["Tail_height"] ===
                    FishRecordJsonData[i].Tail_height.toString() ||
                  filter["Eye_radius"] ===
                    FishRecordJsonData[i].Eye_radius.toString() ||
                  filter["Weight"] === FishRecordJsonData[i].Weight.toString()
                ) {
                  var current_date = FishRecordJsonData[i].Time.slice(
                    0,
                    10
                  ).replace("-", "/");
                  if (
                    Date.parse(searching_area_start) <=
                      Date.parse(current_date) &&
                    Date.parse(searching_area_end) >= Date.parse(current_date)
                  ) {
                    var element = {
                      Sample_date: FishRecordJsonData[i].Sample_date,
                      Cage_no: FishRecordJsonData[i].Cage_no,
                      Sample_no: FishRecordJsonData[i].Sample_no,
                      Specie: FishRecordJsonData[i].Specie,
                      Body_height: FishRecordJsonData[i].Body_height,
                      Body_width: FishRecordJsonData[i].Body_width,
                      Body_len: FishRecordJsonData[i].Body_len,
                      Tail_height: FishRecordJsonData[i].Tail_height,
                      Eye_radius: FishRecordJsonData[i].Eye_radius,
                      Weight: FishRecordJsonData[i].Weight,
                    };
                    FishRecordData.push(element);
                  }
                }
              }
            } else {
              console.log("4");
              for (var i = FishRecordJsonData.length - 1; i >= 0; i--) {
                var current_date = FishRecordJsonData[i].Time.slice(
                  0,
                  10
                ).replace("-", "/");
                if (
                  Date.parse(searching_area_start) <=
                    Date.parse(current_date) &&
                  Date.parse(searching_area_end) >= Date.parse(current_date)
                ) {
                  var element = {
                    Sample_date: FishRecordJsonData[i].Sample_date,
                    Cage_no: FishRecordJsonData[i].Cage_no,
                    Sample_no: FishRecordJsonData[i].Sample_no,
                    Specie: FishRecordJsonData[i].Specie,
                    Body_height: FishRecordJsonData[i].Body_height,
                    Body_width: FishRecordJsonData[i].Body_width,
                    Body_len: FishRecordJsonData[i].Body_len,
                    Tail_height: FishRecordJsonData[i].Tail_height,
                    Eye_radius: FishRecordJsonData[i].Eye_radius,
                    Weight: FishRecordJsonData[i].Weight,
                  };
                  FishRecordData.push(element);
                }
              }
            }
          }
          // FishRecordData
          // console.log("FishRecordData:", FishRecordData);
          data.resolve(FishRecordData);
          $("#statistics_fish_record").jsGrid("sort", "Sample_date", "desc");
          csv_data = FishRecordData;

          // divToCanvas("LNGfishbodychart");
          // divToCanvas("panel1");
        });
        return data.promise();
      },
    },

    fields: [
      {
        name: "Sample_date",
        title: "紀錄日期",
        type: "date",
        width: 150,
        align: "center",
      },
      {
        name: "Cage_no",
        title: "池號",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Cage_no").val();
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
        name: "Sample_no",
        title: "樣本編號",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Sample_no").val();
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
        name: "Specie",
        title: "物種",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Specie").val();
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
        name: "Body_height",
        title: "體高(公分)",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Body_height").val();
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
        name: "Body_width",
        title: "體寬(公分)",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Body_width").val();
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
        name: "Body_len",
        title: "尾叉長(公分)",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Body_len").val();
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
        name: "Tail_height",
        title: "尾柄高(公分)",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Tail_height").val();
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
        name: "Eye_radius",
        title: "眼徑(公分)",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Eye_radius").val();
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
        name: "Weight",
        title: "重量(克)",
        type: "text",
        width: 150,
        align: "center",
        cellRenderer: function (item, value) {
          let threshold = $("#text_Weight").val();
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
  $("#search_text_fish_record").val("");
  $("#search_fish_record").trigger("click");
  $("#LNGfishbodychartbutton").trigger("click");
  // ---------------------------------------------------------------------------------------
  // SET
  // ---------------------------------------------------------------------------------------//Export
  $("#export_csv")
    .button()
    .on("click", function () {
      // JSONToCSVConvertor(csv_data, Labels, true); //older version.

      imageData = [];

      divToCanvas("DivD3");
      divToCanvas("LNGfishbodychart");
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
    var fileName = "魚隻測量資料";

    //Initialize file format you want csv or xls
    var uri = "data:text/csv;charset=utf-8," + escape(CSV);
    //alert(uri);
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension
    //this trick will generate a temp <a /> tag
    // var link = document.createElement("a");
    // link.href = URL.createObjectURL(
    //   new Blob(["\uFEFF" + CSV], { type: "application/octet-stream" })
    // ); //added to fix network error problem in chrome
    var link = document.createElement("a");
    link.href = "js/script/Debtors.xlsx";
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".xlsx";
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    // document.body.removeChild(link);
  }

  //divToCanvas function
  function divToCanvas(divId) {
    console.log("Do divToCanvas function ", divId);
    let a = document.createElement("a");
    html2canvas($("#" + divId), {
      onrendered: function (canvas) {
        a.href = canvas.toDataURL("image/png");
        // console.log("a.href.toString():", a.href.toString());
        // console.log("a.href:", a.href);

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
              fileName: "魚隻測量資料",
            },
            success: function (data) {
              // console.log(data);

              if (divId == "LNGfishbodychart") {
                //download file
                var link = document.createElement("a");
                link.href =
                  "js/script/file/" + data.FileConverterName + ".xlsx";
                // console.log("link.href:", link.href);
                //set the visibility hidden so it will not effect on your web-layout
                link.style = "visibility:hidden";
                link.download = "魚隻測量資料.xlsx";
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
