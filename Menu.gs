function createMenu() {
   var menu = SpreadsheetApp.getUi().createMenu("⚙️ Admin Settings");
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
  if (data.productRadios.toString().trim() === "Nori") {
    inventoryUpdate();
    ws.insertRowAfter(productRowNumber - 1);
    ws.getRange(productRowNumber, 25).setValue(data.code)
    ws.getRange(productRowNumber, 26).setValue(data.type);
    inventoryUpdate();
  }
}