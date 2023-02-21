$(function () {

    // -----------------------------------------------
    // JSGRID SETTING
    // -----------------------------------------------
    var feed_fields = [
        { name: "Feed_date", title: "投餌日期", type: "date", width: 150, align: "center" },
        { name: "No", title: "投餌編號", type: "text", width: 150, align: "center", validate: "required" },
        { name: "Cage", title: "池號", type: "text", width: 150, align: "center", validate: "required" },
        { name: "Num", title: "魚隻數量(隻)", type: "text", width: 150, align: "center", validate: "required" },
        { name: "Feed_num", title: "投餌量(克)", type: "text", width: 150, align: "center", validate: "required" },
        { name: "Feed_no", title: "投餌料號", type: "text", width: 150, align: "center", validate: "required" },
        { name: "Death", title: "死亡數量(隻)", type: "text", width: 150, align: "center", validate: "required" },
        { type: "control", width: 80, headerTemplate: function () { return; } }
    ]

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

        inserting: true,
        editing: true,
        deleteConfirm: "確定刪除?",
        noDataContent: "<span class='unselectable' unselectable='on' style='white-space:nowrap; width:100%; text-align:center;'>　</span>"
            + "<span style='position: fixed;'><span class='unselectable' unselectable='on' style='white-space:nowrap; width:100%; text-align:center;'> </span></span>"
            + "<div style='width:3205px; height:0.1px;'></div>",

        invalidNotify: function (args) {
            // $('#alert-error-not-submit').removeClass('hidden');
            window.alert("欄位不得為空白!");
        },

        rowClick: function (args) { },
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
            updateData("feed"
                , args.item._id
                , args.item.No
                , args.item.Cage
                , args.item.Feed_date
                , args.item.Num
                , args.item.Feed_num
                , args.item.Feed_no
                , args.item.Death
            );

            getData("feed");
        },
        onItemInserted: function (args) {
            console.log("onItemInserted args:", args);
            postData("feed"
                , args.item.No
                , args.item.Cage
                , new Date(new Date().toISOString()).toISOString()
                , args.item.Num
                , args.item.Feed_num
                , args.item.Feed_no
                , args.item.Death);

            getData("feed");
        },
        onItemDeleted: function (args) {
            console.log("onItemDeleted args:", args);
            deleteData("feed", args.item._id);
            getData("feed");
        },

        controller: {
            loadData: function (filter) {
                console.log(filter);
                return filter;

                // var data = $.Deferred();
                // $.ajax({
                //     type: "GET",
                //     async: true,
                //     url: "/db/feed",
                //     dataType: "json",
                //     data: filter
                // }).done(function (response) {
                //     var FeedJsonData = [];
                //     // var FeedJsonDataJson = JSON.parse(response);
                //     var FeedJsonDataJson = response;
                //     if (filter["Searching"] == true) {
                //         for (var i = FeedJsonDataJson.length - 1; i >= 0; i--) {
                //             var element = {
                //                 "No": FeedJsonDataJson[i].No,
                //                 "Cage": FeedJsonDataJson[i].Cage,
                //                 "Feed_date": FeedJsonDataJson[i].Feed_date,
                //                 "Num": FeedJsonDataJson[i].Num,
                //                 "Feed_num": FeedJsonDataJson[i].Feed_num,
                //                 "Feed_no": FeedJsonDataJson[i].Feed_no,
                //                 "Death": FeedJsonDataJson[i].Death,
                //             }
                //             FeedJsonData.push(element);
                //         }
                //     } else {
                //         var searching_area_start = filter["Start"];
                //         var searching_area_end = filter["End"];

                //         for (var i = FeedJsonDataJson.length - 1; i >= 0; i--) {
                //             var current_date = FeedJsonDataJson[i].Feed_date.slice(0, 10).replace('-', '/');
                //             if ((Date.parse(searching_area_start) <= Date.parse(current_date)) &&
                //                 (Date.parse(searching_area_end) >= Date.parse(current_date))) {
                //                 var element = {
                //                     "No": FeedJsonDataJson[i].No,
                //                     "Cage": FeedJsonDataJson[i].Cage,
                //                     "Feed_date": FeedJsonDataJson[i].Feed_date,
                //                     "Num": FeedJsonDataJson[i].Num,
                //                     "Feed_num": FeedJsonDataJson[i].Feed_num,
                //                     "Feed_no": FeedJsonDataJson[i].Feed_no,
                //                     "Death": FeedJsonDataJson[i].Death,
                //                 }
                //                 FeedJsonData.push(element);
                //             }
                //         }
                //     }
                //     data.resolve(FeedJsonData);
                //     $("#statistics_fish_record").jsGrid("sort", "Feed_date");
                // });
                // return data.promise();
            }
        },

        fields: feed_fields
    });

    // ---------------------------------------------------------------------------------------
    // SET
    // ---------------------------------------------------------------------------------------
    $('#search_text_feed').val('');
    $('#search_execute_feed').trigger('click');
    // ---------------------------------------------------------------------------------------
    // SET
    // ---------------------------------------------------------------------------------------

     // -----------------------------------------------
    // PAGE SETUP
    // -----------------------------------------------
    $("#statistics_feed_jsGrid").jsGrid("option", "fields", feed_fields);
    $("#statistics_feed_jsGrid").jsGrid("option", "inserting", true);
    getData('feed');

    // -----------------------------------------------
    // REQUEST
    // -----------------------------------------------
    function getData(routes) {
        console.log("getData routes:", routes);
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: "/db/" + routes,
            async: false,
            success: function (data) {
                console.log("getData url:", this.url);
                // var feedWaterData = [];
                //     // var feedWaterJsonData = JSON.parse(response);
                //     var feedWaterJsonData = response;
                //     // console.log("feedWaterJsonData:",feedWaterJsonData);
                //     if (filter["Searching"] == true) {
                //         for (var i = feedWaterJsonData.length - 1; i >= 0; i--) {
                //             var element = {
                //                 "Time": feedWaterJsonData[i].Time,
                //                 "Temperature_DO": feedWaterJsonData[i].Temperature_DO,
                //                 "dissolveOxygen": feedWaterJsonData[i].dissolveOxygen,
                //                 "Temperature_EC": feedWaterJsonData[i].Temperature_EC,
                //                 "conductivity": feedWaterJsonData[i].conductivity,
                //                 "Temperature_PH": feedWaterJsonData[i].Temperature_PH,
                //                 "PH": feedWaterJsonData[i].PH,
                //             }
                //             feedWaterData.push(element);
                //         }
                //     } else {
                //         var searching_area_start = filter["Start"];
                //         var searching_area_end = filter["End"];
                //         for (var i = feedWaterJsonData.length - 1; i >= 0; i--) {
                //             var current_date = feedWaterJsonData[i].Time.slice(0, 10).replace('-', '/');
                //             if ((Date.parse(searching_area_start) <= Date.parse(current_date)) &&
                //                 (Date.parse(searching_area_end) >= Date.parse(current_date))) {
                //                 var element = {
                //                     "Time": feedWaterJsonData[i].Time,
                //                     "Temperature_DO": feedWaterJsonData[i].Temperature_DO,
                //                     "dissolveOxygen": feedWaterJsonData[i].dissolveOxygen,
                //                     "Temperature_EC": feedWaterJsonData[i].Temperature_EC,
                //                     "conductivity": feedWaterJsonData[i].conductivity,
                //                     "Temperature_PH": feedWaterJsonData[i].Temperature_PH,
                //                     "PH": feedWaterJsonData[i].PH,
                //                 }
                //                 feedWaterData.push(element);
                //             }
                //         }
                //     }
                //     data.resolve(feedWaterData);
                $("#statistics_feed_jsGrid").jsGrid("loadData", data);
                $("#statistics_feed_jsGrid").jsGrid("refresh");
                $("#statistics_feed_jsGrid").jsGrid("sort", feed_fields[0].name, "desc");
            }
        });
    }

    function postData(routes, No, Cage
        , Feed_date, Num, Feed_num, Feed_no, Death) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: "/db/" + routes,
            async: false,
            data: {
                No: No,
                Cage: Cage,
                Feed_date: Feed_date,
                Num: Num,
                Feed_num: Feed_num,
                Feed_no: Feed_no,
                Death: Death,
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    function updateData(routes, vid, No, Cage
        , Feed_date, Num, Feed_num, Feed_no, Death) {
        console.log("updateData vid:", vid);
        $.ajax({
            type: 'PATCH',
            dataType: 'json',
            url: "/db/" + routes + '/' + vid,
            async: false,
            data: {
                No: No,
                Cage: Cage,
                Feed_date: Feed_date,
                Num: Num,
                Feed_num: Feed_num,
                Feed_no: Feed_no,
                Death: Death,
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    function deleteData(routes, vid) {
        $.ajax({
            type: 'DELETE',
            dataType: 'json',
            url: "/db/" + routes + '/' + vid,
            async: false,
            success: function (data) {
                console.log(data);
            }
        });
    }

    Date.prototype.toISOString = function () {
        let pad = (n) => (n < 10) ? '0' + n : n;
        let hours_offset = this.getTimezoneOffset() / 60;
        let offset_date = this.setHours(this.getHours() - hours_offset);
        let symbol = (hours_offset >= 0) ? "-" : "+";
        let time_zone = symbol + pad(Math.abs(hours_offset)) + ":00";

        return this.getUTCFullYear() +
            '-' + pad(this.getUTCMonth() + 1) +
            '-' + pad(this.getUTCDate()) +
            'T' + pad(this.getUTCHours()) +
            ':' + pad(this.getUTCMinutes()) +
            ':' + pad(this.getUTCSeconds()) +
            '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
            time_zone;
    };
});