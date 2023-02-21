$(function () {

    // -----------------------------------------------
    // JSGRID SETTING
    // -----------------------------------------------
    var lng_fields = [
        { name: "record_date", title: "紀錄日期", type: "date", width: 150, align: "center" },
        { name: "temp", title: "進水水溫(°C)", type: "text", width: 150, align: "center", validate: "required" },
        { name: "temp_cooling", title: "冷卻水溫(°C)", type: "text", width: 150, align: "center", validate: "required" },
        { name: "salinity", title: "鹽度(‰ )", type: "text", width: 150, align: "center", validate: "required" },
        { type: "control", width: 80, headerTemplate: function () { return; } }
    ];
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
        onItemUpdated: function (args) {
            console.log("onItemUpdated args:", args);
            updateData("lng_water"
                , args.item._id
                , args.item.record_date
                , args.item.temp
                , args.item.temp_cooling
                , args.item.salinity
            );

            getData("lng_water");
        },
        onItemInserted: function (args) {
            console.log("onItemInserted args:", args);
            postData("lng_water"
                , new Date(new Date().toISOString()).toISOString()
                , args.item.temp
                , args.item.temp_cooling
                , args.item.salinity);

            getData("lng_water");
        },
        onItemDeleted: function (args) {
            console.log("onItemDeleted args:", args);
            deleteData("lng_water", args.item._id);
            getData("lng_water");
        },

        controller: {
            loadData: function (filter) {
                console.log(filter);
                return filter;

                // var data = $.Deferred();
                // $.ajax({
                //     type: "GET",
                //     async: true,
                //     url: "/db/lng_water",
                //     dataType: "json",
                //     data: filter
                // }).done(function (response) {
                //     var LngWaterData = [];
                //     // var LngWaterJsonData = JSON.parse(response);
                //     var LngWaterJsonData = response;
                //     if (filter["Searching"] == true) {
                //         for (var i = LngWaterJsonData.length - 1; i >= 0; i--) {
                //             var element = {
                //                 "record_date": LngWaterJsonData[i].record_date,
                //                 "temp": LngWaterJsonData[i].temp,
                //                 "temp_cooling": LngWaterJsonData[i].temp_cooling,
                //                 "salinity": LngWaterJsonData[i].salinity
                //             }
                //             LngWaterData.push(element);
                //         }
                //     } else {
                //         var searching_area_start = filter["Start"];
                //         var searching_area_end = filter["End"];
                //         for (var i = LngWaterJsonData.length - 1; i >= 0; i--) {
                //             var current_date = LngWaterJsonData[i].record_date.slice(0, 10).replace('-', '/');
                //             if ((Date.parse(searching_area_start) <= Date.parse(current_date)) &&
                //                 (Date.parse(searching_area_end) >= Date.parse(current_date))) {
                //                 var element = {
                //                     "record_date": LngWaterJsonData[i].record_date,
                //                     "temp": LngWaterJsonData[i].temp,
                //                     "temp_cooling": LngWaterJsonData[i].temp_cooling,
                //                     "salinity": LngWaterJsonData[i].salinity
                //                 }
                //                 LngWaterData.push(element);
                //             }
                //         }
                //     }
                //     data.resolve(LngWaterData);
                //     $("#statistics_fish_record").jsGrid("sort", "record_date");
                // });
                // return data.promise();
            }
        },

        fields: lng_fields
    });

    // ---------------------------------------------------------------------------------------
    // SET
    // ---------------------------------------------------------------------------------------
    $('#search_text_lng_water').val('');
    $('#search_lng_water').trigger('click');
    // ---------------------------------------------------------------------------------------
    // SET
    // ---------------------------------------------------------------------------------------

    // -----------------------------------------------
    // PAGE SETUP
    // -----------------------------------------------
    $("#statistics_lng_water").jsGrid("option", "fields", lng_fields);
    $("#statistics_lng_water").jsGrid("option", "inserting", true);
    getData('lng_water');

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
                $("#statistics_lng_water").jsGrid("loadData", data);
                $("#statistics_lng_water").jsGrid("refresh");
                $("#statistics_lng_water").jsGrid("sort", lng_fields[0].name, "desc");
            }
        });
    }

    function postData(routes, record_date, temp
        , temp_cooling, salinity) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: "/db/" + routes,
            async: false,
            data: {
                record_date: record_date,
                temp: temp,
                temp_cooling: temp_cooling,
                salinity: salinity,
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    function updateData(routes, vid, record_date, temp
        , temp_cooling, salinity) {
        console.log("updateData vid:", vid);
        $.ajax({
            type: 'PATCH',
            dataType: 'json',
            url: "/db/" + routes + '/' + vid,
            async: false,
            data: {
                record_date: record_date,
                temp: temp,
                temp_cooling: temp_cooling,
                salinity: salinity,
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

