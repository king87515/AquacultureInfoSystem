$(function () {
    // // ---------------------------------------------------------------------------------------
    // // SEARCH FUNCTION
    // // ---------------------------------------------------------------------------------------
    // $("#search_text_feed").daterangepicker({
    //     showDropdowns: true,
    //     locale: {
    //         format: 'YYYY/MM/DD'
    //     }
    // });

    // // SEARCH
    // $('#search_execute_feed')
    //     .button()
    //     .on("click", function () {
    //         if ($('#search_text_feed').val() == '') {
    //             draw_chart(false);
    //             $("#statistics_feed_jsGrid").jsGrid("loadData", { Searching: true });
    //         } else {
    //             draw_chart(true);
    //             var start = $('#search_text_feed').val().slice(0, 10);
    //             var end = $('#search_text_feed').val().slice(13, 23);
    //             $("#statistics_feed_jsGrid").jsGrid("loadData", { Searching: false, Start: start, End: end });
    //         }
    //     });

    // // CLEAN
    // $('#search_clean_feed')
    //     .button()
    //     .on("click", function () {
    //         $('#search_text_feed').val('');
    //     });

    // // ---------------------------------------------------------------------------------------
    // // DRAW CHART
    // // ---------------------------------------------------------------------------------------
    // function draw_chart(searching) {
    //     // ----------------------------------------------------------------------------------- 
    //     // CHART
    //     // ----------------------------------------------------------------------------------- 
    //     var ctx_LNGfishchart = document.getElementById('LNGfishchart').getContext('2d');
    //     var LNGfishchart = new Chart(ctx_LNGfishchart, {
    //         type: 'bar'
    //     });

    //     var ctx_LNGprovenderchart = document.getElementById('LNGprovenderchart').getContext('2d');
    //     var LNGprovenderchart = new Chart(ctx_LNGprovenderchart, {
    //         type: 'line'
    //     });

    //     var FeedJsonData = [];
    //     $.ajax({
    //         type: "get",
    //         async: false,
    //         url: "sql_connect/feed.php",
    //         dataType: "json",
    //         success: function (statistics_feed) {
    //             FeedJsonData = JSON.parse(statistics_feed);
    //         },
    //         error: function (XMLHttpRequest, textStatus, errorThrown) {
    //             alert(XMLHttpRequest.status);
    //             alert(XMLHttpRequest.readyState);
    //             alert(textStatus);
    //         }
    //     });
    //     var FeedJsonDataNo = [];
    //     var FeedJsonDataCage = [];
    //     var FeedJsonDataFeedDate = [];
    //     var FeedJsonDataNum = [];
    //     var FeedJsonDataFeedNum = [];
    //     var FeedJsonDataFeedNum_predict = [];
    //     var FeedJsonDataFeedNo = [];
    //     var FeedJsonDataDeath = [];
    //     var data_year = [];

    //     if (searching == false) {
    //         var data_count = 15;
    //         for (var i = 0; i < data_count; i++) {
    //             if (FeedJsonData.length > i) {
    //                 FeedJsonDataNo[i] = FeedJsonData[FeedJsonData.length - data_count + i][0];
    //                 FeedJsonDataCage[i] = FeedJsonData[FeedJsonData.length - data_count + i][1];
    //                 if (!data_year.includes(FeedJsonData[FeedJsonData.length - data_count - 1 + i][2].substring(0, 4))) {
    //                     data_year.push(FeedJsonData[FeedJsonData.length - data_count - 1 + i][2].substring(0, 4));
    //                 }
    //                 FeedJsonDataFeedDate[i] = FeedJsonData[FeedJsonData.length - data_count + i][2].substring(5, 10).replace('-', '/');
    //                 FeedJsonDataNum[i] = FeedJsonData[FeedJsonData.length - data_count + i][3];
    //                 FeedJsonDataFeedNum[i] = FeedJsonData[FeedJsonData.length - data_count + i][4];
    //                 FeedJsonDataFeedNum_predict[i] = null;
    //                 FeedJsonDataFeedNo[i] = FeedJsonData[FeedJsonData.length - data_count + i][5];
    //                 FeedJsonDataDeath[i] = FeedJsonData[FeedJsonData.length - data_count + i][6];
    //                 // FeedJsonDataDeath[i] = "200";
    //             } else {
    //                 break;
    //             }
    //         }

    //         // CHART PREDICT START
    //         FeedJsonDataFeedNum_predict[FeedJsonDataFeedNum_predict.length - 1] = FeedJsonDataFeedNum[FeedJsonDataFeedNum.length - 1];
    //         FeedJsonDataFeedDate[FeedJsonDataFeedDate.length] = "09/06";
    //         FeedJsonDataFeedDate[FeedJsonDataFeedDate.length] = "09/07";
    //         FeedJsonDataFeedDate[FeedJsonDataFeedDate.length] = "09/08";
    //         FeedJsonDataFeedNum_predict[FeedJsonDataFeedNum_predict.length] = 0;
    //         FeedJsonDataFeedNum_predict[FeedJsonDataFeedNum_predict.length] = 2500;
    //         FeedJsonDataFeedNum_predict[FeedJsonDataFeedNum_predict.length] = 3000;
    //         // CHART PREDICT END

    //     } else {
    //         var searching_area_start = $('#search_text_feed').val().slice(0, 10);
    //         var searching_area_end = $('#search_text_feed').val().slice(13, 23);
    //         for (var i = 0; i < FeedJsonData.length; i++) {
    //             var current_date = FeedJsonData[i][2].slice(0, 10).replace('-', '/');
    //             if ((Date.parse(searching_area_start) <= Date.parse(current_date)) &&
    //                 (Date.parse(searching_area_end) >= Date.parse(current_date))) {
    //                 //console.log(current_date);
    //                 FeedJsonDataNo.push(FeedJsonData[i][0]);
    //                 FeedJsonDataCage.push(FeedJsonData[i][1]);
    //                 if (!data_year.includes(FeedJsonData[i][2].substring(0, 4))) {
    //                     data_year.push(FeedJsonData[i][2].substring(0, 4));
    //                 }
    //                 FeedJsonDataFeedDate.push(FeedJsonData[i][2].substring(5, 10).replace('-', '/'));
    //                 FeedJsonDataNum.push(FeedJsonData[i][3]);
    //                 FeedJsonDataFeedNum.push(FeedJsonData[i][4]);
    //                 //FeedJsonDataFeedNum_predict.push(null);
    //                 FeedJsonDataFeedNo.push(FeedJsonData[i][5]);
    //                 FeedJsonDataDeath.push(FeedJsonData[i][6]);
    //             }
    //         }
    //     }

    //     // console.log(FeedJsonDataNum);
    //     var data_year_string = "";
    //     if (data_year.length == 1) data_year_string = (data_year[0].toString() + " 年");
    //     else if (data_year.length > 1) {
    //         data_year_string = (data_year[0].toString() + " ~ ");
    //         data_year_string += (data_year[data_year.length - 1].toString() + " 年");
    //     }

    //     LNGfishchart.destroy();
    //     LNGfishchart = new Chart(ctx_LNGfishchart, {
    //         type: 'bar',
    //         data: {
    //             labels: (searching == false) ? FeedJsonDataFeedDate.slice().splice(0, FeedJsonDataFeedDate.length - 3) : FeedJsonDataFeedDate.slice(), // slice複製 splice移除
    //             datasets: [
    //                 {
    //                     label: '魚隻數量(隻)',
    //                     data: FeedJsonDataNum,
    //                     backgroundColor: '#f4c63d',
    //                     borderColor: '#f4c63d',
    //                     borderWidth: 1
    //                 },
    //                 {
    //                     label: '死亡數量(隻)',
    //                     data: FeedJsonDataDeath,
    //                     backgroundColor: '#eb8383',
    //                     borderColor: '#eb8383',
    //                     borderWidth: 1
    //                 }
    //             ]
    //         },
    //         options: {
    //             responsive: true,
    //             legend: {
    //                 position: 'top'
    //             },
    //             scales: {
    //                 xAxes: [{
    //                     scaleLabel: {
    //                         display: true,
    //                         labelString: data_year_string
    //                     },
    //                     ticks: {
    //                         major: {
    //                             fontStyle: 'bold',
    //                             fontColor: '#FF0000'
    //                         }
    //                     }
    //                 }],
    //                 yAxes: [{
    //                     type: 'linear',
    //                     position: 'left',
    //                     display: true,
    //                     scaleLabel: {
    //                         display: true,
    //                         labelString: '數量(隻)'
    //                     },
    //                     ticks: {
    //                         beginAtZero: true
    //                     }
    //                 }]
    //             }
    //         }
    //     });

    //     LNGprovenderchart.destroy();
    //     LNGprovenderchart = new Chart(ctx_LNGprovenderchart, {
    //         type: 'line',
    //         data: {
    //             labels: FeedJsonDataFeedDate,
    //             tips: FeedJsonDataFeedNo,
    //             datasets: [{
    //                 label: '投餌量(克)',
    //                 steppedLine: 'middle',
    //                 data: FeedJsonDataFeedNum,
    //                 backgroundColor: '#36a2eb',
    //                 borderColor: '#36a2eb',
    //                 fill: false,
    //             },
    //             {
    //                 label: '預測投餌量(克)',
    //                 steppedLine: 'middle',
    //                 borderDash: [10, 5],
    //                 data: FeedJsonDataFeedNum_predict,
    //                 backgroundColor: '#8da8ba',
    //                 borderColor: '#8da8ba',
    //                 fill: false,
    //                 pointBackgroundColor: "transparent"
    //             }],
    //         },
    //         options: {
    //             responsive: true,
    //             legend: {
    //                 position: 'top'
    //             },
    //             scales: {
    //                 xAxes: [{
    //                     scaleLabel: {
    //                         display: true,
    //                         labelString: data_year_string
    //                     },
    //                     ticks: {
    //                         major: {
    //                             fontStyle: 'bold',
    //                             fontColor: '#FF0000'
    //                         }
    //                     }
    //                 }],
    //                 yAxes: [{
    //                     type: 'linear',
    //                     position: 'left',
    //                     display: true,
    //                     scaleLabel: {
    //                         display: true,
    //                         labelString: '投餌量(克)'
    //                     },
    //                     ticks: {
    //                         beginAtZero: true
    //                     }
    //                 }]
    //             },
    //             tooltips: {
    //                 callbacks: {
    //                     label: function (tooltipItem, data) {
    //                         // console.log(tooltipItem);
    //                         // console.log(data);
    //                         var label = '投餌量:';
    //                         label += tooltipItem.yLabel;
    //                         label += ', ';
    //                         label += '投餌料號:';
    //                         label += data.tips[tooltipItem.index];
    //                         return label;
    //                     }
    //                 }
    //             }
    //         }
    //     });
    // }

    // ---------------------------------------------------------------------------------------
    // STATISTICS_FEED TABLE
    // ---------------------------------------------------------------------------------------
    $("#JsGrid").jsGrid({
        height: "auto",
        width: "100%",
        autoload: true,
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
                    url: "/db/analysis_record",
                    dataType: "json",
                    data: filter
                }).done(function (response) {
                    console.log(response);
                    var FeedJsonData = [];
                    var FeedJsonDataJson = response; //var FeedJsonDataJson = JSON.parse(response);
                    // console.log("response:",response);
                    for (var i = FeedJsonDataJson.length - 1; i >= 0; i--) {
                        var element = {
                            "no": FeedJsonDataJson[i][0],
                            "type": FeedJsonDataJson[i][1],
                            "len": FeedJsonDataJson[i][2],
                            "weight": FeedJsonDataJson[i][3],
                            "num": FeedJsonDataJson[i][4],
                            "energy": FeedJsonDataJson[i][5]
                        }
                        FeedJsonData.push(element);
                    }

                    data.resolve(FeedJsonData);
                });
                return data.promise();
            }
        },

        fields: [
            { name: "no", title: "數據編號", type: "text", width: 150, align: "center" },
            { name: "type", title: "sonar or camera", type: "number", width: 150, align: "center" },
            { name: "len", title: "體長", type: "text", width: 150, align: "center" },
            { name: "weight", title: "體重", type: "text", width: 150, align: "center" },
            { name: "num", title: "數量", type: "text", width: 150, align: "center" },
            { name: "energy", title: "活力", type: "text", width: 150, align: "center" }
        ]
    });

    // ---------------------------------------------------------------------------------------
    // SET
    // ---------------------------------------------------------------------------------------
    // $('#search_text_feed').val('');
    // $('#search_execute_feed').trigger('click');
    // ---------------------------------------------------------------------------------------
    // SET
    // ---------------------------------------------------------------------------------------
});