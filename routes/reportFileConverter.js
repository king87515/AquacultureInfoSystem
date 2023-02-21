const e = require("connect-flash");
const Excel = require("exceljs");
const fish_record = require("../models/fish_record");
const lng_water = require("../models/lng_water");
const feed = require("../models/feed");
const a13 = require("../models/a13");
const water = require("../models/water");

module.exports = {
  fileGenerator: async function (Label, imageData, fileName) {
    /*
     * JSONData   : database model find
     * Label      : Excel worksheet columns headers
     * imageData  : [[
                      0:base64data
                      1:width
                      2:height
                    ],...]
     * fileName   : File name
     */
    // console.log(Label, fileName);
    // console.log(fileName == "魚隻測量資料");
    if (fileName == "魚隻測量資料") {
      let jsonData = [];
      await fish_record.find().then((data) => {
        jsonData = JSON.stringify(data);
        jsonData = JSON.parse(jsonData);
        for (let i = 0; i < jsonData.length; i++) {
          delete jsonData[i]["_id"];
          delete jsonData[i]["__v"];
        }
      });
      // console.log(jsonData);

      // need to create a workbook object. Almost everything in ExcelJS is based off of the workbook object.
      let workbook = new Excel.Workbook();
      let worksheet = workbook.addWorksheet(fileName);
      console.log("Stage 1");
      // add bgImage to workbook by filename
      const bgImage = workbook.addImage({
        filename: "assets/img/NTOU2.png", //watermark
        extension: "png",
      });
      // set background
      worksheet.addBackgroundImage(bgImage);
      console.log("Stage 2");
      // add images to workbook by base64 data
      let imageId = [];
      for (let i = 0; i < imageData.length; i++) {
        imageId[i] = workbook.addImage({
          // filename: "NTOU2.png",
          base64: imageData[i][0],
          extension: "png",
        });

        /*
          undefined: It specifies the image will be moved and sized with cells
          oneCell	 : This is the default. Image will be moved with cells but not sized
          absolute : Image will not be moved or sized with cells
          */
        let rowH;
        if (i != 0) {
          rowH = 1 + i * (imageData[i - 1][2] / 20);
        } else rowH = 1 + i * (imageData[i][2] / 20);
        worksheet.addImage(imageId[i], {
          tl: { col: 11, row: rowH },
          ext: { width: imageData[i][1], height: imageData[i][2] },
          editAs: "absolute",
        });
      }
      console.log("Stage 3");

      worksheet.columns = [
        { header: Label[0], key: "Sample_date" },
        { header: Label[1], key: "Cage_no" },
        { header: Label[2], key: "Sample_no" },
        { header: Label[3], key: "Specie" },
        { header: Label[4], key: "Body_height" },
        { header: Label[5], key: "Body_width" },
        { header: Label[6], key: "Body_len" },
        { header: Label[7], key: "Tail_height" },
        { header: Label[8], key: "Eye_radius" },
        { header: Label[9], key: "Weight" },
      ];

      // force the columns to be at least as long as their header row.
      // Have to take this approach because ExcelJS doesn't have an autofit property.
      worksheet.columns.forEach((column) => {
        column.width = column.header.length < 12 ? 12 : column.header.length;
      });
      console.log("Stage 4");

      // Make the header bold.
      // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
      worksheet.getRow(1).font = { bold: true };

      // Dump all the data into Excel
      jsonData.forEach((e, index) => {
        // row 1 is the header.
        const rowIndex = index + 2;

        // By using destructuring we can easily dump all of the data into the row without doing much
        // We can add formulas pretty easily by providing the formula property.
        worksheet.addRow({
          ...e,
          // amountRemaining: {
          //   formula: `=C${rowIndex}-D${rowIndex}`,
          // },
          // percentRemaining: {
          //   formula: `=E${rowIndex}/C${rowIndex}`,
          // },
        });
      });
      console.log("Stage 5");
      // Set the way columns A - J are formatted
      const figureColumns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      figureColumns.forEach((i) => {
        worksheet.getColumn(i).alignment = { horizontal: "center" };
        worksheet.protect("dcc");
        worksheet.getColumn(i).protection = {
          locked: true,
        };
      });

      // loop through all of the rows and set the outline style.
      worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
        worksheet.getCell(`A${rowNumber}`).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "none" },
        };

        const insideColumns = ["B", "C", "D", "E", "F", "G", "H", "I"];

        insideColumns.forEach((v) => {
          worksheet.getCell(`${v}${rowNumber}`).border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "none" },
            right: { style: "none" },
          };
        });

        worksheet.getCell(`J${rowNumber}`).border = {
          top: { style: "thin" },
          left: { style: "none" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      console.log("Stage 6 - end");
      // Create a freeze pane, which means we'll always see the header as we scroll around.
      // activeCell: 當前選中的單元格
      worksheet.views = [
        { state: "frozen", xSplit: 0, ySplit: 1, activeCell: "A2" },
      ];

      // Keep in mind that reading and writing is promise based.
      // console.log("workbook:", workbook);
      // console.log("__dirname:", __dirname);
      await workbook.xlsx.writeFile(
        "./views_script/script/file/" + fileName + ".xlsx"
      );
    } else if (fileName == "LNG廠水質資料") {
      let jsonData = [];
      await lng_water.find().then((data) => {
        jsonData = JSON.stringify(data);
        jsonData = JSON.parse(jsonData);
        for (let i = 0; i < jsonData.length; i++) {
          delete jsonData[i]["_id"];
          delete jsonData[i]["__v"];
        }
      });
      // console.log(jsonData);

      // need to create a workbook object. Almost everything in ExcelJS is based off of the workbook object.
      let workbook = new Excel.Workbook();
      let worksheet = workbook.addWorksheet(fileName);
      console.log("Stage 1");
      // add bgImage to workbook by filename
      const bgImage = workbook.addImage({
        filename: "assets/img/NTOU2.png", //watermark
        extension: "png",
      });
      // set background
      worksheet.addBackgroundImage(bgImage);
      console.log("Stage 2");
      // add images to workbook by base64 data
      let imageId = [];
      for (let i = 0; i < imageData.length; i++) {
        imageId[i] = workbook.addImage({
          // filename: "NTOU2.png",
          base64: imageData[i][0],
          extension: "png",
        });

        /*
            undefined: It specifies the image will be moved and sized with cells
            oneCell	 : This is the default. Image will be moved with cells but not sized
            absolute : Image will not be moved or sized with cells
            */
        let rowH;
        if (i != 0) {
          rowH = 1 + i * (imageData[i - 1][2] / 20);
        } else rowH = 1 + i * (imageData[i][2] / 20);
        worksheet.addImage(imageId[i], {
          tl: { col: 5, row: rowH },
          ext: { width: imageData[i][1], height: imageData[i][2] },
          editAs: "absolute",
        });
      }
      console.log("Stage 3");

      worksheet.columns = [
        { header: Label[0], key: "record_date" },
        { header: Label[1], key: "temp" },
        { header: Label[2], key: "temp_cooling" },
        { header: Label[3], key: "salinity" },
      ];

      // force the columns to be at least as long as their header row.
      // Have to take this approach because ExcelJS doesn't have an autofit property.
      worksheet.columns.forEach((column) => {
        column.width = column.header.length < 12 ? 12 : column.header.length;
      });
      console.log("Stage 4");

      // Make the header bold.
      // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
      worksheet.getRow(1).font = { bold: true };

      // Dump all the data into Excel
      jsonData.forEach((e, index) => {
        // row 1 is the header.
        const rowIndex = index + 2;

        // By using destructuring we can easily dump all of the data into the row without doing much
        // We can add formulas pretty easily by providing the formula property.
        worksheet.addRow({
          ...e,
          // amountRemaining: {
          //   formula: `=C${rowIndex}-D${rowIndex}`,
          // },
          // percentRemaining: {
          //   formula: `=E${rowIndex}/C${rowIndex}`,
          // },
        });
      });
      console.log("Stage 5");
      // Set the way columns A - D are formatted
      const figureColumns = [1, 2, 3, 4];
      figureColumns.forEach((i) => {
        worksheet.getColumn(i).alignment = { horizontal: "center" };
        worksheet.protect("dcc");
        worksheet.getColumn(i).protection = {
          locked: true,
        };
      });

      // loop through all of the rows and set the outline style.
      worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
        worksheet.getCell(`A${rowNumber}`).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "none" },
        };

        const insideColumns = ["B", "C"];

        insideColumns.forEach((v) => {
          worksheet.getCell(`${v}${rowNumber}`).border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "none" },
            right: { style: "none" },
          };
        });

        worksheet.getCell(`D${rowNumber}`).border = {
          top: { style: "thin" },
          left: { style: "none" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      console.log("Stage 6 - end");
      // Create a freeze pane, which means we'll always see the header as we scroll around.
      // activeCell: 當前選中的單元格
      worksheet.views = [
        { state: "frozen", xSplit: 0, ySplit: 1, activeCell: "A2" },
      ];

      // Keep in mind that reading and writing is promise based.
      // console.log("workbook:", workbook);
      await workbook.xlsx.writeFile(
        "./views_script/script/file/" + fileName + ".xlsx"
      );
    } else if (fileName == "LNG廠投餌資料") {
      let jsonData = [];
      await feed.find().then((data) => {
        jsonData = JSON.stringify(data);
        jsonData = JSON.parse(jsonData);
        for (let i = 0; i < jsonData.length; i++) {
          delete jsonData[i]["_id"];
          delete jsonData[i]["__v"];
        }
      });
      // console.log(jsonData);

      // need to create a workbook object. Almost everything in ExcelJS is based off of the workbook object.
      let workbook = new Excel.Workbook();
      let worksheet = workbook.addWorksheet(fileName);
      console.log("Stage 1");
      // add bgImage to workbook by filename
      const bgImage = workbook.addImage({
        filename: "assets/img/NTOU2.png", //watermark
        extension: "png",
      });
      // set background
      worksheet.addBackgroundImage(bgImage);
      console.log("Stage 2");
      // add images to workbook by base64 data
      let imageId = [];
      for (let i = 0; i < imageData.length; i++) {
        imageId[i] = workbook.addImage({
          // filename: "NTOU2.png",
          base64: imageData[i][0],
          extension: "png",
        });

        /*
            undefined: It specifies the image will be moved and sized with cells
            oneCell	 : This is the default. Image will be moved with cells but not sized
            absolute : Image will not be moved or sized with cells
            */
        let rowH;
        if (i != 0) {
          rowH = 1 + i * (imageData[i - 1][2] / 20);
        } else rowH = 1 + i * (imageData[i][2] / 20);
        worksheet.addImage(imageId[i], {
          tl: { col: 8, row: rowH },
          ext: { width: imageData[i][1], height: imageData[i][2] },
          editAs: "absolute",
        });
      }
      console.log("Stage 3");

      worksheet.columns = [
        { header: Label[0], key: "No" },
        { header: Label[1], key: "Cage" },
        { header: Label[2], key: "Feed_date" },
        { header: Label[3], key: "Num" },
        { header: Label[4], key: "Feed_num" },
        { header: Label[5], key: "Feed_no" },
        { header: Label[6], key: "Death" },
      ];

      // force the columns to be at least as long as their header row.
      // Have to take this approach because ExcelJS doesn't have an autofit property.
      worksheet.columns.forEach((column) => {
        column.width = column.header.length < 12 ? 12 : column.header.length;
      });
      console.log("Stage 4");

      // Make the header bold.
      // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
      worksheet.getRow(1).font = { bold: true };

      // Dump all the data into Excel
      jsonData.forEach((e, index) => {
        // row 1 is the header.
        const rowIndex = index + 2;

        // By using destructuring we can easily dump all of the data into the row without doing much
        // We can add formulas pretty easily by providing the formula property.
        worksheet.addRow({
          ...e,
          // amountRemaining: {
          //   formula: `=C${rowIndex}-D${rowIndex}`,
          // },
          // percentRemaining: {
          //   formula: `=E${rowIndex}/C${rowIndex}`,
          // },
        });
      });
      console.log("Stage 5");
      // Set the way columns A - G are formatted
      const figureColumns = [1, 2, 3, 4, 5, 6, 7];
      figureColumns.forEach((i) => {
        worksheet.getColumn(i).alignment = { horizontal: "center" };
        worksheet.protect("dcc");
        worksheet.getColumn(i).protection = {
          locked: true,
        };
      });

      // loop through all of the rows and set the outline style.
      worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
        worksheet.getCell(`A${rowNumber}`).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "none" },
        };

        const insideColumns = ["B", "C", "D", "E", "F"];

        insideColumns.forEach((v) => {
          worksheet.getCell(`${v}${rowNumber}`).border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "none" },
            right: { style: "none" },
          };
        });

        worksheet.getCell(`G${rowNumber}`).border = {
          top: { style: "thin" },
          left: { style: "none" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      console.log("Stage 6 - end");
      // Create a freeze pane, which means we'll always see the header as we scroll around.
      // activeCell: 當前選中的單元格
      worksheet.views = [
        { state: "frozen", xSplit: 0, ySplit: 1, activeCell: "A2" },
      ];

      // Keep in mind that reading and writing is promise based.
      // console.log("workbook:", workbook);
      await workbook.xlsx.writeFile(
        "./views_script/script/file/" + fileName + ".xlsx"
      );
    } else if (fileName == "a13水質資訊") {
      let jsonData = [];
      await a13.find().then((data) => {
        jsonData = JSON.stringify(data);
        jsonData = JSON.parse(jsonData);
        for (let i = 0; i < jsonData.length; i++) {
          delete jsonData[i]["_id"];
          delete jsonData[i]["__v"];
        }
      });
      // console.log(jsonData);

      // need to create a workbook object. Almost everything in ExcelJS is based off of the workbook object.
      let workbook = new Excel.Workbook();
      let worksheet = workbook.addWorksheet(fileName);
      console.log("Stage 1");
      // add bgImage to workbook by filename
      const bgImage = workbook.addImage({
        filename: "assets/img/NTOU2.png", //watermark
        extension: "png",
      });
      // set background
      worksheet.addBackgroundImage(bgImage);
      console.log("Stage 2");
      // add images to workbook by base64 data
      let imageId = [];
      for (let i = 0; i < imageData.length; i++) {
        imageId[i] = workbook.addImage({
          // filename: "NTOU2.png",
          base64: imageData[i][0],
          extension: "png",
        });

        /*
            undefined: It specifies the image will be moved and sized with cells
            oneCell	 : This is the default. Image will be moved with cells but not sized
            absolute : Image will not be moved or sized with cells
            */
        let rowH;
        if (i != 0) {
          rowH = 1 + i * (imageData[i - 1][2] / 20);
        } else rowH = 1 + i * (imageData[i][2] / 20);
        worksheet.addImage(imageId[i], {
          tl: { col: 8, row: rowH },
          ext: { width: imageData[i][1], height: imageData[i][2] },
          editAs: "absolute",
        });
      }
      console.log("Stage 3");

      worksheet.columns = [
        { header: Label[0], key: "Time" },
        { header: Label[1], key: "Temperature_DO" },
        { header: Label[2], key: "dissolveOxygen" },
        { header: Label[3], key: "Temperature_EC" },
        { header: Label[4], key: "conductivity" },
        { header: Label[5], key: "Temperature_PH" },
        { header: Label[6], key: "PH" },
      ];

      // force the columns to be at least as long as their header row.
      // Have to take this approach because ExcelJS doesn't have an autofit property.
      worksheet.columns.forEach((column) => {
        column.width = column.header.length < 12 ? 12 : column.header.length;
      });
      console.log("Stage 4");

      // Make the header bold.
      // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
      worksheet.getRow(1).font = { bold: true };

      // Dump all the data into Excel
      jsonData.forEach((e, index) => {
        // row 1 is the header.
        const rowIndex = index + 2;

        // By using destructuring we can easily dump all of the data into the row without doing much
        // We can add formulas pretty easily by providing the formula property.
        worksheet.addRow({
          ...e,
          // amountRemaining: {
          //   formula: `=C${rowIndex}-D${rowIndex}`,
          // },
          // percentRemaining: {
          //   formula: `=E${rowIndex}/C${rowIndex}`,
          // },
        });
      });
      console.log("Stage 5");
      // Set the way columns A - G are formatted
      const figureColumns = [1, 2, 3, 4, 5, 6];
      figureColumns.forEach((i) => {
        worksheet.getColumn(i).alignment = { horizontal: "center" };
        worksheet.protect("dcc");
        worksheet.getColumn(i).protection = {
          locked: true,
        };
      });

      // loop through all of the rows and set the outline style.
      worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
        worksheet.getCell(`A${rowNumber}`).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "none" },
        };

        const insideColumns = ["B", "C", "D", "E", "F"];

        insideColumns.forEach((v) => {
          worksheet.getCell(`${v}${rowNumber}`).border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "none" },
            right: { style: "none" },
          };
        });

        worksheet.getCell(`G${rowNumber}`).border = {
          top: { style: "thin" },
          left: { style: "none" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      console.log("Stage 6 - end");
      // Create a freeze pane, which means we'll always see the header as we scroll around.
      // activeCell: 當前選中的單元格
      worksheet.views = [
        { state: "frozen", xSplit: 0, ySplit: 1, activeCell: "A2" },
      ];

      // Keep in mind that reading and writing is promise based.
      // console.log("workbook:", workbook);
      await workbook.xlsx.writeFile(
        "./views_script/script/file/" + fileName + ".xlsx"
      );
    } else if (fileName == "恆春箱網水質資訊") {
      let jsonData = [];
      await water.find().then((data) => {
        jsonData = JSON.stringify(data);
        jsonData = JSON.parse(jsonData);
        for (let i = 0; i < jsonData.length; i++) {
          delete jsonData[i]["_id"];
          delete jsonData[i]["__v"];
        }
      });
      // console.log(jsonData);

      // need to create a workbook object. Almost everything in ExcelJS is based off of the workbook object.
      let workbook = new Excel.Workbook();
      let worksheet = workbook.addWorksheet(fileName);
      console.log("Stage 1");
      // add bgImage to workbook by filename
      const bgImage = workbook.addImage({
        filename: "assets/img/NTOU2.png", //watermark
        extension: "png",
      });
      // set background
      worksheet.addBackgroundImage(bgImage);
      console.log("Stage 2");
      // add images to workbook by base64 data
      let imageId = [];
      for (let i = 0; i < imageData.length; i++) {
        imageId[i] = workbook.addImage({
          // filename: "NTOU2.png",
          base64: imageData[i][0],
          extension: "png",
        });

        /*
            undefined: It specifies the image will be moved and sized with cells
            oneCell	 : This is the default. Image will be moved with cells but not sized
            absolute : Image will not be moved or sized with cells
            */
        let rowH;
        if (i != 0) {
          rowH = 1 + i * (imageData[i - 1][2] / 20);
        } else rowH = 1 + i * (imageData[i][2] / 20);
        worksheet.addImage(imageId[i], {
          tl: { col: 17, row: rowH },
          ext: { width: imageData[i][1], height: imageData[i][2] },
          editAs: "absolute",
        });
      }
      console.log("Stage 3");

      worksheet.columns = [
        { header: Label[0], key: "Time" },
        { header: Label[1], key: "Temperature_DO" },
        { header: Label[2], key: "dissolveOxygen" },
        { header: Label[3], key: "Temperature_ec" },
        { header: Label[4], key: "conductivity" },
        { header: Label[5], key: "Temperature_flow" },
        { header: Label[6], key: "compA" },
        { header: Label[7], key: "compB" },
        { header: Label[8], key: "xAxisVelocity" },
        { header: Label[9], key: "yAxisVelocity" },
        { header: Label[10], key: "totalVelocity" },
        { header: Label[11], key: "direction" },
        { header: Label[12], key: "currentdirection" },
        { header: Label[13], key: "northSouthCurrent" },
        { header: Label[14], key: "eastWestCurrent" },
        { header: Label[15], key: "powerVoltage" },
      ];

      // force the columns to be at least as long as their header row.
      // Have to take this approach because ExcelJS doesn't have an autofit property.
      worksheet.columns.forEach((column) => {
        column.width = column.header.length < 12 ? 12 : column.header.length;
      });
      console.log("Stage 4");

      // Make the header bold.
      // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
      worksheet.getRow(1).font = { bold: true };

      // Dump all the data into Excel
      jsonData.forEach((e, index) => {
        // row 1 is the header.
        const rowIndex = index + 2;

        // By using destructuring we can easily dump all of the data into the row without doing much
        // We can add formulas pretty easily by providing the formula property.
        worksheet.addRow({
          ...e,
          // amountRemaining: {
          //   formula: `=C${rowIndex}-D${rowIndex}`,
          // },
          // percentRemaining: {
          //   formula: `=E${rowIndex}/C${rowIndex}`,
          // },
        });
      });
      console.log("Stage 5");
      // Set the way columns A - P are formatted
      const figureColumns = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
      ];
      figureColumns.forEach((i) => {
        worksheet.getColumn(i).alignment = { horizontal: "center" };
        worksheet.protect("dcc");
        worksheet.getColumn(i).protection = {
          locked: true,
        };
      });

      // loop through all of the rows and set the outline style.
      worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
        worksheet.getCell(`A${rowNumber}`).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "none" },
        };

        const insideColumns = [
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
        ];

        insideColumns.forEach((v) => {
          worksheet.getCell(`${v}${rowNumber}`).border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "none" },
            right: { style: "none" },
          };
        });

        worksheet.getCell(`P${rowNumber}`).border = {
          top: { style: "thin" },
          left: { style: "none" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      console.log("Stage 6 - end");
      // Create a freeze pane, which means we'll always see the header as we scroll around.
      // activeCell: 當前選中的單元格
      worksheet.views = [
        { state: "frozen", xSplit: 0, ySplit: 1, activeCell: "A2" },
      ];

      // Keep in mind that reading and writing is promise based.
      // console.log("workbook:", workbook);
      await workbook.xlsx.writeFile(
        "./views_script/script/file/" + fileName + ".xlsx"
      );
    } else {
      console.log("沒有搜尋到" + fileName + "檔案!");
    }
  },
};
