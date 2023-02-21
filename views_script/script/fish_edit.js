$(function () {

    // -----------------------------------------------
    // JSGRID SETTING
    // -----------------------------------------------
    var fish_fields = [
        { name: "Sample_date", title: "紀錄日期", type: "date", width: 150, align: "center" },
        { name: "Cage_no", title: "池號", type: "text", width: 150, align: "center", validate: "required" },
        { name: "Sample_no", title: "樣本編號", type: "text", width: 150, align: "center", validate: "required" },
        { name: "Specie", title: "物種", type: "text", width: 150, align: "center", validate: "required" },
        { name: "Body_height", title: "體高(公分)", type: "text", width: 150, align: "center", validate: "required" },
        { name: "Body_width", title: "體寬(公分)", type: "text", width: 150, align: "center", validate: "required" },
        { name: "Body_len", title: "尾叉長(公分)", type: "text", width: 150, align: "center", validate: "required" },
        { name: "Tail_height", title: "尾柄高(公分)", type: "text", width: 150, align: "center", validate: "required" },
        { name: "Eye_radius", title: "眼徑(公分)", type: "text", width: 150, align: "center", validate: "required" },
        { name: "Weight", title: "重量(克)", type: "text", width: 150, align: "center", validate: "required" },
        { type: "control", width: 80, headerTemplate: function () { return; } }
    ];

    // ---------------------------------------------------------------------------------------
    // STATISTICS_FISH_RECORD TABLE
    // ---------------------------------------------------------------------------------------
    $("#statistics_fish_record").jsGrid({
        height: "auto",
        width: "100%",
        autoload: true,
        sorting: true,
        paging: true,
        pageSize: 11,
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
            updateData("fish_record"
                , args.item._id
                , args.item.Sample_date
                , args.item.Cage_no
                , args.item.Sample_no
                , args.item.Specie
                , args.item.Body_height
                , args.item.Body_width
                , args.item.Body_len
                , args.item.Tail_height
                , args.item.Eye_radius
                , args.item.Weight);

            getData("fish_record");
        },
        onItemInserted: function (args) {
            console.log("onItemInserted args:", args);
            postData("fish_record"
                , new Date(new Date().toISOString()).toISOString()
                , args.item.Cage_no
                , args.item.Sample_no
                , args.item.Specie
                , args.item.Body_height
                , args.item.Body_width
                , args.item.Body_len
                , args.item.Tail_height
                , args.item.Eye_radius
                , args.item.Weight);

            getData("fish_record");
        },
        onItemDeleted: function (args) {
            console.log("onItemDeleted args:", args);
            deleteData("fish_record", args.item._id);
            getData("fish_record");
        },

        controller: {
            loadData: function (filter) {
                console.log(filter);
                return filter;

                // var data = $.Deferred();
                // $.ajax({
                //     type: "GET",
                //     async: false,
                //     url: "/db/fish_record",
                //     dataType: "json",
                //     data: filter
                // }).done(function (response) {
                //     var FishRecordData = [];
                //     var FishRecordJsonData = response; //JSON.parse(response)->response
                //     for (var i = FishRecordJsonData.length - 1; i >= 0; i--) {
                //         if ((FishRecordJsonData[i].Specie != 'Specie') && (FishRecordJsonData[i].Sample_date != "0000-00-00")) {
                //             var element = {
                //                 "Sample_date": FishRecordJsonData[i].Sample_date,
                //                 "Cage_no": FishRecordJsonData[i].Cage_no,
                //                 "Sample_no": FishRecordJsonData[i].Sample_no,
                //                 "Specie": FishRecordJsonData[i].Specie,
                //                 "Body_height": FishRecordJsonData[i].Body_height,
                //                 "Body_width": FishRecordJsonData[i].Body_width,
                //                 "Body_len": FishRecordJsonData[i].Body_len,
                //                 "Tail_height": FishRecordJsonData[i].Tail_height,
                //                 "Eye_radius": FishRecordJsonData[i].Eye_radius,
                //                 "Weight": FishRecordJsonData[i].Weight
                //             }
                //             FishRecordData.push(element);
                //         }
                //     }
                //     // FishRecordData
                //     console.log("FishRecordData:", FishRecordData);
                //     data.resolve(FishRecordData);
                // });
                // return data.promise();
            }
        },

        fields: fish_fields
    });

    // ---------------------------------------------------------------------------------------
    // SET
    // ---------------------------------------------------------------------------------------
    $('#LNGfishbodychartbutton').trigger('click');
    // ---------------------------------------------------------------------------------------
    // SET
    // ---------------------------------------------------------------------------------------

    // -----------------------------------------------
    // PAGE SETUP
    // -----------------------------------------------
    $("#statistics_fish_record").jsGrid("option", "fields", fish_fields);
    $("#statistics_fish_record").jsGrid("option", "inserting", true);
    getData('fish_record');

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
                $("#statistics_fish_record").jsGrid("loadData", data);
                $("#statistics_fish_record").jsGrid("refresh");
                $("#statistics_fish_record").jsGrid("sort", fish_fields[0].name, "desc");
            }
        });
    }

    function postData(routes, Sample_date, Cage_no
        , Sample_no, Specie, Body_height, Body_width
        , Body_len, Tail_height, Eye_radius, Weight) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: "/db/" + routes,
            async: false,
            data: {
                Sample_date: Sample_date,
                Cage_no: Cage_no,
                Sample_no: Sample_no,
                Specie: Specie,
                Body_height: Body_height,
                Body_width: Body_width,
                Body_len: Body_len,
                Tail_height: Tail_height,
                Eye_radius: Eye_radius,
                Weight: Weight,
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    function updateData(routes, vid, Sample_date, Cage_no
        , Sample_no, Specie, Body_height, Body_width
        , Body_len, Tail_height, Eye_radius, Weight) {
        console.log("updateData vid:", vid);
        $.ajax({
            type: 'PATCH',
            dataType: 'json',
            url: "/db/" + routes + '/' + vid,
            async: false,
            data: {
                Sample_date: Sample_date,
                Cage_no: Cage_no,
                Sample_no: Sample_no,
                Specie: Specie,
                Body_height: Body_height,
                Body_width: Body_width,
                Body_len: Body_len,
                Tail_height: Tail_height,
                Eye_radius: Eye_radius,
                Weight: Weight,
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

/*
$.ajax()的async引數總是設定成true，這標誌著在請求開始後，其他程式碼依然能夠執行。

如果把這個選項設定成false，這意味著所有的請求都不再是非同步的了，這也會導致瀏覽器被鎖死。

雖然官方不建議這麼做，只是不能用太多，否則會造成使用者體驗不佳

===============

$("#jsGrid").jsGrid({
    height: "70%",
    width: "100%",
    filtering: true,
    editing: true,
    inserting: true,
    sorting: true,
    paging: true,
    autoload: true,
    pageSize: 15,
    pageButtonCount: 5,
    deleteConfirm: "Do you really want to delete the client?",
    controller: db,
    fields: [
        { name: "Name", type: "text", width: 150, validate: "required" },
        { name: "Age", type: "number", width: 50, validate: { validator: "range", param: [18,80] } },
        { name: "Address", type: "text", width: 200, validate: { validator: "rangeLength", param: [10, 250] } },
        { name: "Country", type: "select", items: db.countries, valueField: "Id", textField: "Name",
            validate: { message: "Country should be specified", validator: function(value) { return value > 0; } } },
        { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
        { type: "control" }
    ]
});
*/