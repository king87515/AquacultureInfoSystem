$(function () {

    // -----------------------------------------------
    // JSGRID SETTING
    // -----------------------------------------------
    var water_fields = [
        { name: "Time", title: "輸入時間", type: "date", width: 175, align: "center" },
        { name: "Temperature_DO", title: "水溫(°C)", type: "text", width: 175, align: "center", validate: "required" },
        { name: "dissolveOxygen", title: "溶氧(mg/L)", type: "text", width: 175, align: "center", validate: "required" },
        { name: "Temperature_ec", title: "電導率感測器的水溫", type: "text", width: 175, align: "center", validate: "required" },
        { name: "conductivity", title: "電導率", type: "text", width: 175, align: "center", validate: "required" },
        { name: "Temperature_flow", title: "水溫(°C)", type: "text", width: 175, align: "center", validate: "required" },
        { name: "compA", title: "羅盤A", type: "text", width: 175, align: "center", validate: "required" },
        { name: "compB", title: "羅盤B", type: "text", width: 175, align: "center", validate: "required" },
        { name: "xAxisVelocity", title: "x軸速度", type: "text", width: 175, align: "center", validate: "required" },
        { name: "yAxisVelocity", title: "y軸速度", type: "text", width: 175, align: "center", validate: "required" },
        { name: "totalVelocity", title: "總流速", type: "text", width: 175, align: "center", validate: "required" },
        { name: "direction", title: "儀器目前的方向", type: "text", width: 175, align: "center", validate: "required" },
        { name: "currentdirection", title: "水流方向", type: "text", width: 175, align: "center", validate: "required" },
        { name: "northSouthCurrent", title: "南北向流速", type: "text", width: 175, align: "center", validate: "required" },
        { name: "eastWestCurrent", title: "東西向流速", type: "text", width: 175, align: "center", validate: "required" },
        { name: "powerVoltage", title: "儀器目前的電壓", type: "text", width: 175, align: "center", validate: "required" },
        { type: "control", width: 80, headerTemplate: function () { return; } }
    ]
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
            updateData("water"
                , args.item._id
                , args.item.Time
                , args.item.Temperature_DO
                , args.item.dissolveOxygen
                , args.item.Temperature_ec
                , args.item.conductivity
                , args.item.Temperature_flow
                , args.item.compA
                , args.item.compB
                , args.item.xAxisVelocity
                , args.item.yAxisVelocity
                , args.item.totalVelocity
                , args.item.direction
                , args.item.currentdirection
                , args.item.northSouthCurrent
                , args.item.eastWestCurrent
                , args.item.powerVoltage
            );

            getData("water");
        },
        onItemInserted: function (args) {
            console.log("onItemInserted args:", args);
            postData("water"
                , new Date(new Date().toISOString()).toISOString()
                , args.item.Temperature_DO
                , args.item.dissolveOxygen
                , args.item.Temperature_ec
                , args.item.conductivity
                , args.item.Temperature_flow
                , args.item.compA
                , args.item.compB
                , args.item.xAxisVelocity
                , args.item.yAxisVelocity
                , args.item.totalVelocity
                , args.item.direction
                , args.item.currentdirection
                , args.item.northSouthCurrent
                , args.item.eastWestCurrent
                , args.item.powerVoltage);

            getData("water");
        },
        onItemDeleted: function (args) {
            console.log("onItemDeleted args:", args);
            deleteData("water", args.item._id);
            getData("water");
        },

        controller: {
            loadData: function (filter) {
                console.log(filter);
                return filter;

                // var data = $.Deferred();
                // $.ajax({
                //     type: "GET",
                //     async: true,
                //     url: "/db/water",
                //     dataType: "json",
                //     data: filter
                // }).done(function (response) {
                //     var LngWaterData = [];
                //     // var LngWaterJsonData = JSON.parse(response);
                //     var LngWaterJsonData = response;
                //     if (filter["Searching"] == true) {
                //         for (var i = LngWaterJsonData.length - 1; i >= 0; i--) {
                //             var element = {
                //                 "Time": LngWaterJsonData[i].Time,
                //                 "Temperature_DO": LngWaterJsonData[i].Temperature_DO,
                //                 "dissolveOxygen": LngWaterJsonData[i].dissolveOxygen,
                //                 "Temperature_ec": LngWaterJsonData[i].Temperature_ec,
                //                 "conductivity": LngWaterJsonData[i].conductivity,
                //                 "Temperature_flow": LngWaterJsonData[i].Temperature_flow,
                //                 "compA": LngWaterJsonData[i].compA,
                //                 "compB": LngWaterJsonData[i].compB,
                //                 "xAxisVelocity": LngWaterJsonData[i].xAxisVelocity,
                //                 "yAxisVelocity": LngWaterJsonData[i].yAxisVelocity,
                //                 "totalVelocity": LngWaterJsonData[i].totalVelocity,
                //                 "direction": LngWaterJsonData[i].direction,
                //                 "currentdirection": LngWaterJsonData[i].currentdirection,
                //                 "northSouthCurrent": LngWaterJsonData[i].northSouthCurrent,
                //                 "eastWestCurrent": LngWaterJsonData[i].eastWestCurrent,
                //                 "powerVoltage": LngWaterJsonData[i].powerVoltage,
                //             }
                //             LngWaterData.push(element);
                //         }
                //     } else {
                //         var searching_area_start = filter["Start"];
                //         var searching_area_end = filter["End"];
                //         for (var i = LngWaterJsonData.length - 1; i >= 0; i--) {
                //             var current_date = LngWaterJsonData[i].Time.slice(0, 10).replace('-', '/');
                //             if ((Date.parse(searching_area_start) <= Date.parse(current_date)) &&
                //                 (Date.parse(searching_area_end) >= Date.parse(current_date))) {
                //                 var element = {
                //                     "Time": LngWaterJsonData[i].Time,
                //                     "Temperature_DO": LngWaterJsonData[i].Temperature_DO,
                //                     "dissolveOxygen": LngWaterJsonData[i].dissolveOxygen,
                //                     "Temperature_ec": LngWaterJsonData[i].Temperature_ec,
                //                     "conductivity": LngWaterJsonData[i].conductivity,
                //                     "Temperature_flow": LngWaterJsonData[i].Temperature_flow,
                //                     "compA": LngWaterJsonData[i].compA,
                //                     "compB": LngWaterJsonData[i].compB,
                //                     "xAxisVelocity": LngWaterJsonData[i].xAxisVelocity,
                //                     "yAxisVelocity": LngWaterJsonData[i].yAxisVelocity,
                //                     "totalVelocity": LngWaterJsonData[i].totalVelocity,
                //                     "direction": LngWaterJsonData[i].direction,
                //                     "currentdirection": LngWaterJsonData[i].currentdirection,
                //                     "northSouthCurrent": LngWaterJsonData[i].northSouthCurrent,
                //                     "eastWestCurrent": LngWaterJsonData[i].eastWestCurrent,
                //                     "powerVoltage": LngWaterJsonData[i].powerVoltage,
                //                 }
                //                 LngWaterData.push(element);
                //             }
                //         }
                //     }
                //     data.resolve(LngWaterData);
                //     $("#statistics_fish_record").jsGrid("sort", "Time");

                // });
                // return data.promise();
            }
        },

        fields: water_fields
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
    $("#statistics_lng_water").jsGrid("option", "fields", water_fields);
    $("#statistics_lng_water").jsGrid("option", "inserting", true);
    getData('water');

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
                $("#statistics_lng_water").jsGrid("sort", water_fields[0].name, "desc");
            }
        });
    }

    function postData(routes, Time, Temperature_DO, dissolveOxygen, Temperature_ec
        , conductivity, Temperature_flow, compA, compB, xAxisVelocity, yAxisVelocity
        , totalVelocity, direction, currentdirection, northSouthCurrent, eastWestCurrent, powerVoltage) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: "/db/" + routes,
            async: false,
            data: {
                Time: Time,
                Temperature_DO: Temperature_DO,
                dissolveOxygen: dissolveOxygen,
                Temperature_ec: Temperature_ec,
                conductivity: conductivity,
                Temperature_flow: Temperature_flow,
                compA: compA,
                compB: compB,
                xAxisVelocity: xAxisVelocity,
                yAxisVelocity: yAxisVelocity,
                totalVelocity: totalVelocity,
                direction: direction,
                currentdirection: currentdirection,
                northSouthCurrent: northSouthCurrent,
                eastWestCurrent: eastWestCurrent,
                powerVoltage: powerVoltage,
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    function updateData(routes, vid, Time, Temperature_DO, dissolveOxygen, Temperature_ec
        , conductivity, Temperature_flow, compA, compB, xAxisVelocity, yAxisVelocity
        , totalVelocity, direction, currentdirection, northSouthCurrent, eastWestCurrent, powerVoltage) {
        console.log("updateData vid:", vid);
        $.ajax({
            type: 'PATCH',
            dataType: 'json',
            url: "/db/" + routes + '/' + vid,
            async: false,
            data: {
                Time: Time,
                Temperature_DO: Temperature_DO,
                dissolveOxygen: dissolveOxygen,
                Temperature_ec: Temperature_ec,
                conductivity: conductivity,
                Temperature_flow: Temperature_flow,
                compA: compA,
                compB: compB,
                xAxisVelocity: xAxisVelocity,
                yAxisVelocity: yAxisVelocity,
                totalVelocity: totalVelocity,
                direction: direction,
                currentdirection: currentdirection,
                northSouthCurrent: northSouthCurrent,
                eastWestCurrent: eastWestCurrent,
                powerVoltage: powerVoltage,
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

