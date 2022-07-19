function AutoShip() {
  const master = SpreadsheetApp.openById("1QQlUBR5_GelX0zPeUy5ywifD1xbERqSt-JFJITCpxJQ").getSheetByName("2022MASTER");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();


  const shipDate = new Date(sheet.getRange("A1").getValue()).getTime();
  /* const masterDate = new Date(master.getRange("D26").getValue());
  Logger.log("Ship: " + shipDate);
  Logger.log("Master: " + masterDate);
  if (shipDate.getTime() === masterDate.getTime()) {
    Logger.log("Same date");
  } else {
    Logger.log("Different date");
  } */

  //Calculate the start for the current day in the mastersheet
  let start = 0;
  let end = 0;
  const dateCheckVal = master.getRange("D23:D").getValues();
  for (let row in dateCheckVal) {
    const cellDate = new Date(dateCheckVal[row][0]).getTime(0);
    if (cellDate === 0 || cellDate < 0 || !cellDate) {
      continue;
    }
    if (cellDate === shipDate) {
      start = parseInt(row) + 24;
      break;
    } else if (cellDate < shipDate) {
      Logger.log("This date doesn't exist in the master file.");
      ss.toast("This date doesn't exist in the master file.");
      return;
    }
  }
  
  //Calculating the range for the shipping entries
  let customerEntries = master.getRange("D"+start + ":D").getValues();
  let backgrounds = master.getRange("A" + start + ":A").getBackgrounds();
  for (let row in customerEntries) {
    let rowColor = backgrounds[row][0];
    if (customerEntries[row][0] === "" || rowColor ==="#d9ead3") {
      end = start + parseInt(row);
      break;
    }
  }

  const diffRow = end - start;

  const shippingRange = sheet.getRange(2, 1, diffRow, 20);

  let copiedsheet = master.copyTo(ss);
  copiedsheet.getRange(start, 4, diffRow, 20).copyTo(shippingRange);
  ss.deleteSheet(copiedsheet);
  inventoryUpdate();
}
