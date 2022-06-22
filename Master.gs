
const ssId_shipping = '1Csnk5pD14aUA3dbGFW4TWIiaBT2AP8KvpzzhjJXOAA0';
const ssId_master = '1niYGbwTw64C6j8jTASQpHuWSp5VmtxA_X4RDjfhsZX4';

function masterSheet() {
  var masterDateRange = 'A';
  const masterNoriRange = 'C:O'
  const masterSheetRange = 'P3:P'
  const masterSnackRange = 'Q3:Q'
  const masterSoyRange = 'R3:U'

  const noriBalanceRange = 'AE3:AH16'
  const soyBalanceRange = 'AB21:AB24'
  const snackBalanceRange = 'AE18:AH18'
  const sheetBalanceRange = 'AE19:AH19'

  const masterSheet = SpreadsheetApp.openById(ssId_master).getSheets()[0];
  const shippingSheet = SpreadsheetApp.openById(ssId_shipping).getSheets()[1];

  try {
    const noriBalance = shippingSheet.getRange(noriBalanceRange).getValues();
    const soyBalance = shippingSheet.getRange(soyBalanceRange).getValues();
    const snackBalance = shippingSheet.getRange(snackBalanceRange).getValues();
    const sheetBalance = shippingSheet.getRange(sheetBalanceRange).getValues();

    var masterNoriBalance = shippingSheet.getRange(masterNoriRange).getValues();
    const masterSoyBalance = shippingSheet.getRange(masterSoyRange).getValues();
    const masterSnackBalance = shippingSheet.getRange(masterSnackRange).getValues();
    const masterSheetBalance = shippingSheet.getRange(masterSheetRange).getValues();

    const date = shippingSheet.getRange("A1").getValues()[0];
  
    var count = 4;
    while (masterSheet.getRange(masterDateRange + count).getValues()[0] != "") {
      
      var str = masterSheet.getRange(masterDateRange + count).getValues()[0].toString();
      var format_str = str.replace(/[^\d.]/g, "");
      var format_date = date.toString().replace(/[^\d.]/g, "");
      if (format_str === format_date) {
        break;
      }
      count+= 2;
    }
    //Setting the date
    masterSheet.getRange(masterDateRange + count).setValue(date);
    masterSheet.getRange(count, 1, 2, 1).mergeVertically();
    masterSheet.getRange(count, 1).setBorder(true, null, null, null,null, null);
    masterSheet.getRange(count, 1).setVerticalAlignment("middle");
    /*
    //Adding in the data
    for (row in noriBalance) {
      for (var i = 0; i < 4; i )
    }
    */


  } catch (err) {
    Logger.log(err.message);
  }

}
