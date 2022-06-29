
const ssId_shipping = '1L4qt-WmvpcLkNo6h-M30S8BjRrXndGjAxGL4rX3HAG8';
const ssId_tracking = '1niYGbwTw64C6j8jTASQpHuWSp5VmtxA_X4RDjfhsZX4';
/**
 * 
 * Automatically tracks the inventory based on the inputted shipment data. Data collection is based on the ranges 
 * AE3:AL19 and AB21:AC24 in the Ship&Inventory Spreadsheet. 
 * 
 * Ship&Inventory Spreadsheet: https://docs.google.com/spreadsheets/d/1L4qt-WmvpcLkNo6h-M30S8BjRrXndGjAxGL4rX3HAG8/edit?usp=sharing
 * Inventory Tracking Spreadsheet: https://docs.google.com/spreadsheets/d/1niYGbwTw64C6j8jTASQpHuWSp5VmtxA_X4RDjfhsZX4/edit?usp=sharing
 */


function trackingSheet() {
  //spreadsheet declarations
  const trackingSheet = SpreadsheetApp.openById(ssId_tracking).getSheets()[0];
  if (SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getSheetName() == "FORM") {
    Logger.log("FORM sheet");
    return;
  }
  const shippingSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const productRow = 23;

  try {
    Logger.log("Recording current inventory state...");
    //Obtaining the value for the date from Ship&Inventory Spreadsheet
    const date = shippingSheet.getRange("A1").getValues()[0];
    Logger.log(shippingSheet.getName());
    //Calculating the first open row in the date column
    var count = 1
    var dateExists = false;
    const dateVals = trackingSheet.getRange("A4:A").getValues();
    for (row in dateVals) {
      var str = dateVals[row][0].toString();
      var format_str = str.replace(/[^\d.]/g, "");
      var format_date = date.toString().replace(/[^\d.]/g, "");
      if (format_str === format_date) {
        count = parseInt(row) + 1;
        dateExists = true;
        break;
      }
    }

    //Setting the date and formatting the cell
    if (!dateExists) {
      trackingSheet.insertRowAfter(3);
      trackingSheet.getRange(4, 2).setValue("Change")
      trackingSheet.insertRowAfter(4);
      trackingSheet.getRange(5, 2).setValue("Daily Total")

      //Change row color
      trackingSheet.getRange(4, 3, 1, 78).setBackground("#b6d7a8");
      trackingSheet.getRange(4, 3, 1, 78).setFontSize(12);
      trackingSheet.getRange(4, 3, 1, 78).setFontColor("#e06666");
      //Date Cell Color
      trackingSheet.getRange(4, 1).setBackground("white");
      //Change and Daily Total Cell Color
      trackingSheet.getRange(4, 2, 2, 1).setBackground("white");
      //Daily Total row color
      trackingSheet.getRange(5, 3, 1, 78).setBackground("#ffe599");
      trackingSheet.getRange(5, 3, 1, 78).setFontSize(12);
      trackingSheet.getRange(5, 3, 1, 78).setFontColor("black");

      trackingSheet.getRange(4, 1).setValue(date);
      trackingSheet.getRange(4, 1, 2, 1).mergeVertically();
      trackingSheet.getRange(4, 1).setBorder(true, null, null, null, null, null);
      trackingSheet.getRange(4, 1).setVerticalAlignment("middle");
    }



    //Data transfer between the spreadsheets for Dried Seaweed, Nori, 7Sheet, and Snack
    for (var row = 0; row < productRow; row++) {

      if (row == 20) { //Skipping row 14 because in the shipping spreadsheet it is just the totals
        continue;
      }
      for (var col = 0; col < 4; col++) {

        const changeVal = shippingSheet.getRange(3 + row, 31 + col).getValue();
        const totalVal = shippingSheet.getRange(3 + row, 36 + col).getValue();
        if (col === 3) {
          if (row < 20) {
            var parseVal = parseFloat(shippingSheet.getRange(3 + row, 31 + col - 1).getValue(), 10) || 0;
            var newVal = changeVal + parseVal;
            trackingSheet.getRange(3 + count, 3 * row + col + 2).setValue(newVal);
            continue;
          } else if (row > 20) {
            var newVal = changeVal + (parseFloat(shippingSheet.getRange(3 + row, 31 + col - 1).getValue(), 10) || 0);
            trackingSheet.getRange(3 + count, 3 * row + col - 1).setValue(newVal);
            continue;
          }
        }
        if (row < 20) {
          trackingSheet.getRange(3 + count, 3 * row + col + 3).setValue(changeVal);
          trackingSheet.getRange(count + 4, 3 * row + col + 3).setValue(totalVal);
          //Adding to tracking spreadsheet
        } else if (row > 20) {
          trackingSheet.getRange(3 + count, 3 * row + col).setValue(changeVal);
          trackingSheet.getRange(count + 4, 3 * row + col).setValue(totalVal);
        }
      }
    }

    //Adding in data for the soy sheet
    for (var row = 0; row < 4; row++) {
      const changeVal = shippingSheet.getRange(row + 27, 28).getValue();
      const totalVal = shippingSheet.getRange(row + 27, 29).getValue();
      trackingSheet.getRange(count + 3, 71 + row * 3).setValue(changeVal);
      trackingSheet.getRange(count + 4, 71 + row * 3).setValue(totalVal);
    }

    Logger.log("Current inventory state successfully recorded")


  } catch (err) {
    Logger.log("Inventory Tracking failed!")
    Logger.log(err.message);
  }

}

