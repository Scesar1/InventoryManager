
/**
 * 
 * Reads in shipping data
 * Ship&Inventory Spreadsheet: https://docs.google.com/spreadsheets/d/1L4qt-WmvpcLkNo6h-M30S8BjRrXndGjAxGL4rX3HAG8/edit?usp=sharing
 */

//--------------------------------- Global Variables ------------------------------------------------------------------------------
const productRowNumber = 23;
var noriMap = new Map([["700H", 0], ["700F", 0], ["701H", 0], ["701F", 0],
["703H", 0], ["703F", 0], ["704H", 0], ["704F", 0], ["601H", 0], ["601F", 0],
["602F", 0], ["603H", 0], ["RW", 0], ["301F", 0], ["302H", 0],
["302F", 0], ["201F", 0], ["201H", 0], ["300U", 0]]);

var soyMap = new Map([["PK", 0], ["GN", 0], ["YW", 0], ["SM", 0]]);
var snackMap = new Map([["SN15OR", 0], ["SN15SW", 0]]);
var sheetMap = new Map([["307", 0]]);
//Ship&Inventory Spreadsheet
const spreadsheetId = '1L4qt-WmvpcLkNo6h-M30S8BjRrXndGjAxGL4rX3HAG8';


//---------------------------------------Main--------------------------------------------------------------------------------------
function inventoryUpdate() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getName() === "FORM") {
    Logger.log("FORM sheet");
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
    var i = 0;
    //Inputs the data from the noriMap into the 'changes' column
    for (const [key, value] of noriMap.entries()) {
      sheet.getRange(4 + i, 33).setValue(value);
      i++;
    }
    i = 0;
    //Inputs the data from the soyMap into the 'changes' column
    for (const [key, value] of soyMap.entries()) {
      sheet.getRange(27 + i, 28).setValue(value);
      i++;
    }
    sheet.getRange("AG24").setValue(sheetMap.get('307'));
    sheet.getRange("AG25").setValue(snackMap.get('SN15OR'));

    Logger.log("Inventory updated successfully.")
    trackingSheet();

  } catch (err) {
    Logger.log("Inventory update failed!")
    Logger.log(err.message);
  }

}

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
        if ((designator + 'H') === key || (designator === key) || (designator + 'U') === key) {
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