function createMenu() {
   var menu = SpreadsheetApp.getUi().createMenu("Sheet Menu");
   menu.addItem("Add new product", "showSidebar");
   menu.addItem("Table", "openUrl");
   menu.addToUi();
}

function openUrl( url='https://script.google.com/macros/s/AKfycbzY6seF2SR_Wpz0XG-qndKR56aKvkYJK7liunORhNjQ/dev' ){
  var html = HtmlService.createHtmlOutput('<html><script>'
  +'window.close = function(){window.setTimeout(function(){google.script.host.close()},9)};'
  +'var a = document.createElement("a"); a.href="'+url+'"; a.target="_blank";'
  +'if(document.createEvent){'
  +'  var event=document.createEvent("MouseEvents");'
  +'  if(navigator.userAgent.toLowerCase().indexOf("firefox")>-1){window.document.body.append(a)}'                          
  +'  event.initEvent("click",true,true); a.dispatchEvent(event);'
  +'}else{ a.click() }'
  +'close();'
  +'</script>'
  // Offer URL as clickable link in case above code fails.
  +'<body style="word-break:break-word;font-family:sans-serif;">Failed to open automatically. <a href="'+url+'" target="_blank" onclick="window.close()">Click here to proceed</a>.</body>'
  +'<script>google.script.host.setHeight(40);google.script.host.setWidth(410)</script>'
  +'</html>')
  .setWidth( 90 ).setHeight( 1 );
  SpreadsheetApp.getUi().showModalDialog( html, "Opening ..." );
}

function showSidebar() {
   var html = HtmlService.createTemplateFromFile('Page')
      .evaluate()
      .setTitle('User Form');
  SpreadsheetApp.getUi()
      .showSidebar(html);
}

function doGet() {
  return HtmlService
      .createTemplateFromFile('Index')
      .evaluate();
}

function getData() {
  return SpreadsheetApp
      .getActiveSpreadsheet()
      .getActiveSheet()
      .getRange(1, 25, 28, 7)
      .getValues();
}

function getDate() {
  var date = new Date(SpreadsheetApp
    .getActiveSpreadsheet()
    .getActiveSheet()
    .getRange(1, 1)
    .getValue());
  return date.toDateString();
}

function appendData(data){
  var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  inventoryUpdate();
  if (data.productRadios.toString().trim() === "Nori") {
    ws.insertRowAfter(productRowNumber - 1);
    ws.getRange(productRowNumber, 25).setValue(data.code);
    ws.getRange(productRowNumber, 26).setValue(data.type);
    ws.getRange(productRowNumber, 27).setValue(data.amount);
    ws.getRange(productRowNumber, 28, 1, 2).setValue(0);

    ws.getRange(productRowNumber + 1, 27).setFormula(
      "=SUM(AA3:AA" + productRowNumber + ")"
    );
    ws.getRange(productRowNumber + 1, 28).setFormula(
      "=SUM(AB3:AB" + productRowNumber + ")"
    );

     ws.getRange(productRowNumber + 1, 29).setFormula(
      "=SUM(AC3:AC" + productRowNumber + ")"
    );

    ws.getRange(productRowNumber, 30).setFormula(
      "=AB" + productRowNumber + " + AC" + productRowNumber 
    )

    ws.getRange(productRowNumber, 31).setFormula(
      "=AA" + productRowNumber + " + AD" + productRowNumber 
    )

    ws.getRange(productRowNumber + 1, 30).setFormula(
      "=SUM(AD3:AD" + productRowNumber + ")"
    );

    ws.getRange(productRowNumber + 1, 31).setFormula(
      "=SUM(AE3:AE" + productRowNumber + ")"
    );
    

    ws.getRange(productRowNumber, 28, 1, 3).setBorder(false, null, null, null, null, null);
    ws.getRange(productRowNumber, 27).setBorder(false, null, null, null, null, null);
    
  } else if (data.productRadios.toString().trim() === "Snack") {
    var snackStart = otherRowNumber + 1;

    ws.insertRowAfter(snackRowNumber - 1);
    ws.getRange(snackRowNumber, 25).setValue(data.code);
    ws.getRange(snackRowNumber, 25, 1, 2).mergeAcross();
    ws.getRange(snackRowNumber, 27).setValue(data.amount);
    ws.getRange(snackRowNumber, 28, 1, 2).setValue(0);

    ws.getRange(snackRowNumber + 1, 27).setFormula(
      "=SUM(AA" + snackStart + ":AA" + snackRowNumber + ")"
    );
    ws.getRange(snackRowNumber + 1, 28).setFormula(
      "=SUM(AB" + snackStart + ":AB" + snackRowNumber + ")"
    );

     ws.getRange(snackRowNumber + 1, 29).setFormula(
      "=SUM(AC" + snackStart + ":AC" + snackRowNumber + ")"
    );

    ws.getRange(snackRowNumber, 30).setFormula(
      "=AB" + snackRowNumber + " + AC" + snackRowNumber 
    );

    ws.getRange(snackRowNumber, 31).setFormula(
      "=AA" + snackRowNumber + " + AD" + snackRowNumber 
    );

    ws.getRange(snackRowNumber + 1, 30).setFormula(
      "=SUM(AD" + snackStart + ":AD" + snackRowNumber + ")"
    );

    ws.getRange(snackRowNumber + 1, 31).setFormula(
      "=SUM(AE" + snackStart + ":AE" + snackRowNumber + ")"
    );
    
    ws.getRange(snackRowNumber - 1, 25, 1, 7).setBorder(null, null, false, null, null, null);
    ws.getRange(snackRowNumber, 25, 1, 7).setBorder(false, true, null, null, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    ws.getRange(snackRowNumber, 25).setBorder(false, true, null, null, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    ws.getRange(snackRowNumber, 27).setBorder(false, null, null, true, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    ws.getRange(snackRowNumber, 31).setBorder(false, true, null, true, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  } else if (data.productRadios.toString().trim() === "Other") {
    var otherStart = productRowNumber + 1;
    ws.insertRowAfter(otherRowNumber - 1);
    ws.getRange(otherRowNumber, 25).setValue(data.code);
    ws.getRange(otherRowNumber, 25, 1, 2).mergeAcross();
    ws.getRange(otherRowNumber, 27).setValue(data.amount);
    ws.getRange(otherRowNumber, 28, 1, 2).setValue(0);

    ws.getRange(otherRowNumber + 1, 27).setFormula(
      "=SUM(AA" + otherStart + ":AA" + otherRowNumber + ")"
    );
    ws.getRange(otherRowNumber + 1, 28).setFormula(
      "=SUM(AB" + otherStart + ":AB" + otherRowNumber + ")"
    );

     ws.getRange(otherRowNumber + 1, 29).setFormula(
      "=SUM(AC" + otherStart + ":AC" + otherRowNumber + ")"
    );

    ws.getRange(otherRowNumber, 30).setFormula(
      "=AB" + otherRowNumber + " + AC" + otherRowNumber 
    );

    ws.getRange(otherRowNumber, 31).setFormula(
      "=AA" + otherRowNumber + " + AD" + otherRowNumber 
    );
    
    ws.getRange(otherRowNumber + 1, 30).setFormula(
      "=SUM(AD" + otherStart + ":AD" + otherRowNumber + ")"
    );

    ws.getRange(otherRowNumber + 1, 31).setFormula(
      "=SUM(AE" + otherStart + ":AE" + otherRowNumber + ")"
    );
    
    ws.getRange(otherRowNumber - 1, 25, 1, 7).setBorder(null, null, false, null, null, null);
    ws.getRange(otherRowNumber, 25, 1, 7).setBorder(false, true, null, null, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    ws.getRange(otherRowNumber, 25).setBorder(false, true, null, null, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    ws.getRange(otherRowNumber, 27).setBorder(false, null, null, true, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    ws.getRange(otherRowNumber, 31).setBorder(false, true, null, true, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    
  }
}


function showFeedbackDialog() {
  var widget = HtmlService.createHtmlOutputFromFile("Dialogue.html");
  widget.setHeight(150);
  widget.setWidth(200);
  SpreadsheetApp.getUi().showModalDialog(widget, "Create Sheet");
}

function createSheet(data) {
  var name = data.new_date;
  var prev_date = data.past_date;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet().copyTo(ss);

  sheet.setName(name);
  ss.setActiveSheet(sheet);
  ss.moveActiveSheet(1);
  sheet.getRange("A1").setValue(name);

  inventoryUpdate();

  const prevSheet = ss.getSheetByName(prev_date);
  const vals = prevSheet.getRange(3, 31, snackRowNumber - 3, 1).getValues();

  const soyVals = prevSheet.getRange(snackRowNumber + 2, 29, 4, 1).getValues();


  sheet.getRange(3, 28, productRowNumber - 3, 2).setValue(0);
  sheet.getRange(productRowNumber + 1, 28, otherRowNumber - productRowNumber - 1, 2).setValue(0);
  sheet.getRange(otherRowNumber + 1, 28, snackMap.size, 2).setValue(0);
  sheet.getRange("A2:T47").clearContent().clearFormat().clearDataValidations();
  sheet.getRange(3, 27, snackRowNumber - 3, 1).setValues(vals);
  sheet.getRange(snackRowNumber + 2, 27, 4, 1).setValues(soyVals);
  sheet.getRange("U2:X47").clearContent();
  sheet.getRange(snackRowNumber + 2, 28, 4, 1).setValue(0);



}

