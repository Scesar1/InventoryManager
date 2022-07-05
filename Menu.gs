function createMenu() {
   var menu = SpreadsheetApp.getUi().createMenu("Sheet Menu");
   menu.addItem("Add new product", "showSidebar");
   menu.addToUi();
}

function showSidebar() {
   var html = HtmlService.createTemplateFromFile('Page')
      .evaluate()
      .setTitle('User Form');
  SpreadsheetApp.getUi()
      .showSidebar(html);
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

    ws.getRange(productRowNumber + 1, 31).setFormula(
      "=SUM(AE3:AE" + productRowNumber + ")"
    );
    

    ws.getRange(productRowNumber, 28, 1, 3).setBorder(false, null, null, null, null, null);
    ws.getRange(productRowNumber, 27).setBorder(false, null, null, null, null, null);
    
    inventoryUpdate();
  } else if (data.productRadios.toString().trim() === "Snack") {

    ws.insertRowAfter(snackRowNumber - 1);
    ws.getRange(snackRowNumber, 25).setValue(data.code);
    ws.getRange(snackRowNumber, 25, 1, 2).mergeAcross();
    ws.getRange(snackRowNumber, 27).setValue(data.amount);
    ws.getRange(snackRowNumber, 28, 1, 2).setValue(0);

    ws.getRange(snackRowNumber + 1, 27).setFormula(
      "=SUM(AA25:AA" + snackRowNumber + ")"
    );
    ws.getRange(snackRowNumber + 1, 28).setFormula(
      "=SUM(AB25:AB" + snackRowNumber + ")"
    );

     ws.getRange(snackRowNumber + 1, 29).setFormula(
      "=SUM(AC25:AC" + snackRowNumber + ")"
    );

    ws.getRange(snackRowNumber, 30).setFormula(
      "=AB" + snackRowNumber + " + AC" + snackRowNumber 
    );

    ws.getRange(snackRowNumber, 31).setFormula(
      "=AA" + snackRowNumber + " + AD" + snackRowNumber 
    );

    ws.getRange(snackRowNumber + 1, 31).setFormula(
      "=SUM(AE25:AE" + snackRowNumber + ")"
    );
    
    ws.getRange(snackRowNumber - 1, 25, 1, 7).setBorder(null, null, false, null, null, null);
    ws.getRange(snackRowNumber, 25, 1, 7).setBorder(null, true, null, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    ws.getRange(snackRowNumber, 25).setBorder(null, true, null, null, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    ws.getRange(snackRowNumber, 27).setBorder(null, null, null, true, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    ws.getRange(snackRowNumber, 31).setBorder(null, true, null, true, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  } else if (data.productRadios.toString().trim() === "Other") {
    ws.insertRowAfter(otherRowNumber - 1);
    ws.getRange(otherRowNumber, 25).setValue(data.code);
    ws.getRange(otherRowNumber, 25, 1, 2).mergeAcross();
    ws.getRange(otherRowNumber, 27).setValue(data.amount);
    ws.getRange(otherRowNumber, 28, 1, 2).setValue(0);

    ws.getRange(otherRowNumber + 1, 27).setFormula(
      "=SUM(AA23:AA" + otherRowNumber + ")"
    );
    ws.getRange(otherRowNumber + 1, 28).setFormula(
      "=SUM(AB23:AB" + otherRowNumber + ")"
    );

     ws.getRange(otherRowNumber + 1, 29).setFormula(
      "=SUM(AC23:AC" + otherRowNumber + ")"
    );

    ws.getRange(otherRowNumber, 30).setFormula(
      "=AB" + otherRowNumber + " + AC" + otherRowNumber 
    );

    ws.getRange(otherRowNumber, 31).setFormula(
      "=AA" + otherRowNumber + " + AD" + otherRowNumber 
    );

    ws.getRange(otherRowNumber + 1, 31).setFormula(
      "=SUM(AE23:AE" + otherRowNumber + ")"
    );
    
    ws.getRange(otherRowNumber - 1, 25, 1, 7).setBorder(null, null, false, null, null, null);
    ws.getRange(otherRowNumber, 25, 1, 7).setBorder(null, true, null, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    ws.getRange(otherRowNumber, 25).setBorder(null, true, null, null, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    ws.getRange(otherRowNumber, 27).setBorder(null, null, null, true, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    ws.getRange(otherRowNumber, 31).setBorder(null, true, null, true, null, null, '#666666', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    
  }
}