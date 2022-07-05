
/**
 * 
 * Reads in shipping data
 * Ship&Inventory Spreadsheet: https://docs.google.com/spreadsheets/d/1L4qt-WmvpcLkNo6h-M30S8BjRrXndGjAxGL4rX3HAG8/edit?usp=sharing
 */

//--------------------------------- Global Variables ------------------------------------------------------------------------------
var productRowNumber = 3;
var snackRowNumber = 24; 
var noriMap = new Map();
const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
const date = new Date(sheet.getName().toString());
var soyMap = new Map([["PK", 0], ["GN", 0], ["YW", 0], ["SM", 0]]);
var snackMap = new Map();
var sheetMap = new Map([["307", 0]]);
//Ship&Inventory Spreadsheet
const spreadsheetId = '1L4qt-WmvpcLkNo6h-M30S8BjRrXndGjAxGL4rX3HAG8';


//---------------------------------------Main--------------------------------------------------------------------------------------
function inventoryUpdate() {
  Logger.log(sheet.getName());
  if (!date) {
    Logger.log("Not a date");
    return;
  }
  const rangeData = 'E2:H';
  Logger.log("Updating inventory...")
  try {
    // Get the values from the spreadsheet using spreadsheetId and range.
    const values = sheet.getRange(rangeData).getValues();
    //Checks if the values exist
    if (!values) {
      Logger.log('No designator data found.');
      return;
    }
    
    //Constructs the nori and snack map based on the spreadsheet table
    mapBuilder(3, "nori", noriMap);
    mapBuilder(24, "snack", snackMap);

    productRowNumber += noriMap.size;
    snackRowNumber = productRowNumber + 3 + (snackMap.size - 1);


    //Reads in the values from the range E2:H
    for (const row in values) {
      if (values[row][1] == "") {
        break;
      }
      if (values[row][0] != "") {
        //Runs inventoryLogic method to determine which product quantity gets updated
        inventoryLogic(values[row][0], values[row][1], values[row][2], values[row][3]);
      }
    }

    changeUpdate(3, noriMap);
    changeUpdate(23, sheetMap);
    changeUpdate(24, snackMap);
    changeUpdate(27, soyMap);

    Logger.log("Inventory updated successfully.")
    //trackingSheet();

  } catch (err) {
    Logger.log("Inventory update failed!")
    Logger.log(err.message);
  }

}


//--------------------------------------------------Helper Methods-----------------------------------------------------------------
/**
 * This method determines which product map value gets updated depending on the four main characteristics of each product 
 * in the spreadsheet. 
 * 
 * @param designator  The product designator, found in column E
 * @param size  The size of the product; typically half or full for nori. Found in column F
 * @param quality   the grade of the nori, but used in this function to represent the quantity of the soy paper. Found in column G
 * @param quantity  the amount of product, found in column H
 */

function inventoryLogic(designator, size, quality, quantity) {
  designator = designator.toString().trim();
  switch (size) {
    case 'H':
      for (const [key, value] of noriMap.entries()) {
        if ((designator + 'H') === key) {
          noriMap.set(key, noriMap.get(key) - quantity || 0);
          return;
        }
      }
      break;

    case 'F':
      for (const [key, value] of noriMap.entries()) {
        if ((designator + 'F') === key) {
          noriMap.set(key, noriMap.get(key) - quantity || 0);
          return;
        }
      }
      break;

    default:
      break;
  }
  if (designator === 'SOY') {
    switch (size) {
      case 'YW':
        soyMap.set('YW', soyMap.get('YW') - quality || 0);
        return;
      case 'PK':
        soyMap.set('PK', soyMap.get('PK') - quality || 0);
        return;
      case 'GN':
        soyMap.set('GN', soyMap.get('GN') - quality || 0);
        return;
      case 'SM':
        soyMap.set('SM', soyMap.get('SM') - quality || 0);
        return;
      default:
        break;
    }
  }
  for (const [key, value] of snackMap.entries()) {
    if (designator === key) {
      var str = size.toString().replace(/[^\d.]/g, "");
      var actual_size = parseInt(str);
      snackMap.set(key, snackMap.get(key) - actual_size || 0);
      return;
    }
  }
  if (designator === '307') {
    sheetMap.set('307', sheetMap.get('307') - quantity || 0);
    return;
  }
}

function mapBuilder(row, type, productMap) {
    rowCount = row;
    while (sheet.getRange(rowCount, 25).getValue().toString().trim() != "TOTAL") {
      if (type === "nori") {
        var keyBuilder = sheet.getRange(rowCount, 25).getValue().toString().split(" ")[0] + 
          sheet.getRange(rowCount, 26).getValue().toString();
      } else if (type == "snack") {
        var keyBuilder = sheet.getRange(rowCount, 25).getValue().toString().split(" ")[0];
      } else {
        return TypeError;
      }
      
      productMap.set(keyBuilder, 0);
      rowCount++;
    }
  }

  function changeUpdate(row , productMap) {
    try {
      var i = 0;
      //Inputs the data from the map into the 'changes' column
      for (const [key, value] of productMap.entries()) {
        sheet.getRange(row + i, 28).setValue(value);
        i++;
      }
    } catch (err) {
      Logger.log("Invalid data");
    } 
  }