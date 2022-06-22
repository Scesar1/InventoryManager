/**
 * Updates the values of the inventory to reflect current orders
 * 
 */

var noriMap = new Map([["700H", 0], ["700F", 0], ["601H", 0], ["601F", 0], ["602F", 0], ["603H", 0], ["RW", 0], ["301F", 0], ["302H", 0],
  ["302F", 0], ["201F", 0], ["201H", 0], ["300U", 0]]);
var soyMap = new Map([["PK", 0], ["GN", 0], ["YW", 0], ["SM", 0]]);
var snackMap = new Map([["SN15OR", 0], ["SN15SW", 0]]);
var sheetMap = new Map([["307", 0]]);
const spreadsheetId = '1L4qt-WmvpcLkNo6h-M30S8BjRrXndGjAxGL4rX3HAG8';


function createOnEditTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  var shouldCreateTrigger = true;
  triggers.forEach(function (trigger) {
    if(trigger.getEventType() === ScriptApp.EventType.ON_EDIT && trigger.getHandlerFunction() === "inventoryUpdate") {
      shouldCreateTrigger = false; 
    }
  });
  
  if(shouldCreateTrigger) {
    ScriptApp.newTrigger("inventoryUpdate")
      .forSpreadsheet(SpreadsheetApp.openById(spreadsheetId))
      .onEdit()
      .create()
  }

}

function inventoryUpdate() {
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheets()[1];
  const rangeData = 'E2:H';
  try {
    // Get the values from the spreadsheet using spreadsheetId and range.
    const values = sheet.getRange(rangeData).getValues();
    
    //  Print the values from spreadsheet if values are available.
    if (!values) {
      Logger.log('No designator data found.');
      return;
    }
    Logger.log('Value:');
    for (const row in values) {
      if (values[row][1] == "") {
        break;
      }
      if (values[row][0] != "") {
        inventoryLogic(values[row][0], values[row][1], values[row][2], values[row][3]);
      }
    }
    var i = 1;
    while (sheet.getRange("AG" + i).getValues()[0] != 'OFFICE') {
      i++
    }
    i += 2;
    for (const [key, value] of noriMap.entries()) {
      sheet.getRange("AG" + i).setValue(value);
      i++;
    }
    var j = 19;
    while (sheet.getRange("AB" + j).getValues()[0] != 'Changes') {
      j++;
    }
    j++;
    for (const [key, value] of soyMap.entries()) {
      sheet.getRange("AB" + j).setValue(value);
      j++
    }
    sheet.getRange("AG19").setValue(snackMap.get('SN15OR'));
    sheet.getRange("AG18").setValue(sheetMap.get('307'));
    
  } catch (err) {
    // TODO (developer) - Handle Values.get() exception from Sheet API
    Logger.log(err.message);
  }

}

function inventoryLogic(designator, size, quality, quantity) {
  switch (size){
    case 'H':
      if (designator === '700') {
        noriMap.set('700H', noriMap.get('700H') - quantity || 0);
        return;
      }
      if (designator === '601') {
        noriMap.set('601H', noriMap.get('601H') - quantity || 0);
        return;
      }
      if (designator === '603') {
        noriMap.set('603H', noriMap.get('603H') - quantity || 0);
        return;
      }
      if (designator === 'RW') {
        noriMap.set('RW', noriMap.get('RW') - quantity || 0);
        return;
      }
      if (designator === '302') {
        noriMap.set('302H', noriMap.get('302H') - quantity || 0);
        return;
      }
      if (designator === '201') {
        noriMap.set('201H', noriMap.get('201H') - quantity || 0);
        return;
      }
      if (designator === '300U') {
        noriMap.set('300U', noriMap.get('300U') - quantity || 0);
        return;
      }
      break;
    case 'F':
      if (designator === '201') {
        noriMap.set('201F', noriMap.get('201F') - quantity || 0);
        return;    
      }
      if (designator === '700') {
        noriMap.set('700F', noriMap.get('700F') - quantity || 0); 
        return;
      }
      if (designator === '601') {
        noriMap.set('601F', noriMap.get('601F') - quantity || 0); 
        return;
      }
      if (designator === '602') {
        noriMap.set('602F', noriMap.get('602F') - quantity || 0);  
        return;
      }
      if (designator === '302') {
        noriMap.set('302F', noriMap.get('302F') - quantity || 0); 
        return; 
      }
      if (designator === '301') {
        noriMap.set('301F', noriMap.get('301F') - quantity || 0); 
        return; 
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
  if (designator === 'SN15OR') {
    var str = size.replace(/[^\d.]/g, "");
    var actual_size = parseInt(str);
    snackMap.set('SN15OR', snackMap.get('SN15OR') - actual_size || 0);
    return;
  } else if (designator === 'SN15SW') {
    snackMap.set('SN15SW', snackMap.get('SN15SW') - parseInt(size) || 0);
    //sheet.getRange("AG19").setValue(soyMap.get('SN15SW'));
    return;
  }
  if (designator === '307') {
    sheetMap.set('307', sheetMap.get('307') - quantity || 0);
    return;
  }

  
}