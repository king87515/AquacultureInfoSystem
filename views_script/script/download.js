$(function () {
  // -----------------------------------------------------------------------------------
  // DOWNLOAD
  // -----------------------------------------------------------------------------------

  // DOWNLOAD_LNG_FEED
  $("#download_Lng_feed")
    .button()
    .on("click", function () {
      var FeedJsonData = [];
      $.ajax({
        type: "get",
        async: false,
        url: "/db/feed",
        dataType: "json",
        success: function (statistics_feed) {
          // FeedJsonData = JSON.parse(statistics_feed);
          FeedJsonData = statistics_feed;
          // console.log("FeedJsonData:",FeedJsonData);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert(XMLHttpRequest.status);
          alert(XMLHttpRequest.readyState);
          alert(textStatus);
        },
      });

      var csv_filename = "LNG 廠投餌量.csv";
      var csv_data =
        "\t投餌編號, \t池號, \t投餌日期, \t魚隻數量, \t投餌量, \t投餌料號, \t死亡數量\n";
      for (var i = 0; i < FeedJsonData.length; i++) {
        csv_data += "\t" + FeedJsonData[i].No + ",";
        csv_data += "\t" + FeedJsonData[i].Cage + ",";
        csv_data += "\t" + FeedJsonData[i].Feed_date + ",";
        csv_data += "\t" + FeedJsonData[i].Num + ",";
        csv_data += "\t" + FeedJsonData[i].Feed_num + ",";
        csv_data += "\t" + FeedJsonData[i].Feed_no + ",";
        csv_data += "\t" + FeedJsonData[i].Death + ",";

        csv_data += "\n";
      }
      ExportBtn(csv_filename, csv_data);
    });

  // DOWNLOAD_LNG_FISH_RECORD
  $("#download_Lng_fish_record")
    .button()
    .on("click", function () {
      var FishRecordJsonData = [];
      $.ajax({
        type: "get",
        async: false,
        url: "/db/fish_record",
        dataType: "json",
        success: function (statistics_fish_record) {
          // FishRecordJsonData = JSON.parse(statistics_fish_record);
          FishRecordJsonData = statistics_fish_record;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert(XMLHttpRequest.status);
          alert(XMLHttpRequest.readyState);
          alert(textStatus);
        },
      });

      var csv_filename = "所有魚隻測量參數(包含海外箱網及LNG 廠).csv";
      var csv_data =
        "\t紀錄日期, \t池號, \t樣本編號, \t物種, \t體高, \t體寬, \t尾叉長, \t尾柄高, \t眼徑, \t重量\n";
      for (var i = 0; i < FishRecordJsonData.length; i++) {
        if (
          FishRecordJsonData[i].Specie != "Specie" &&
          FishRecordJsonData[i].Sample_date != "0000-00-00"
        ) {
          csv_data += "\t" + FishRecordJsonData[i].Sample_date + ",";
          csv_data += "\t" + FishRecordJsonData[i].Cage_no + ",";
          csv_data += "\t" + FishRecordJsonData[i].Sample_no + ",";
          csv_data += "\t" + FishRecordJsonData[i].Specie + ",";
          csv_data += "\t" + FishRecordJsonData[i].Body_height + ",";
          csv_data += "\t" + FishRecordJsonData[i].Body_width + ",";
          csv_data += "\t" + FishRecordJsonData[i].Body_len + ",";
          csv_data += "\t" + FishRecordJsonData[i].Tail_height + ",";
          csv_data += "\t" + FishRecordJsonData[i].Eye_radius + ",";
          csv_data += "\t" + FishRecordJsonData[i].Weight + ",";
          csv_data += "\n";
        }
      }
      ExportBtn(csv_filename, csv_data);
    });

  // DOWNLOAD_LNG_WATER
  $("#download_Lng_water")
    .button()
    .on("click", function () {
      var LngWaterJsonData = [];
      $.ajax({
        type: "get",
        async: false,
        url: "/db/lng_water",
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

      var csv_filename = "LNG 廠水質資料.csv";
      var csv_data = "\t紀錄日期, \t進水水溫, \t冷卻水溫, \t鹽度,\n";
      for (var i = 0; i < LngWaterJsonData.length; i++) {
        csv_data += "\t" + LngWaterJsonData[i].record_date + ",";
        csv_data += "\t" + LngWaterJsonData[i].temp + ",";
        csv_data += "\t" + LngWaterJsonData[i].temp_cooling + ",";
        csv_data += "\t" + LngWaterJsonData[i].salinity + ",";
        csv_data += "\n";
      }
      ExportBtn(csv_filename, csv_data);
    });

  // EXPORT BUTTON
  function ExportBtn(csv_filename, csv_data) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob(["\uFEFF" + csv_data], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = csv_filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
  }
});
