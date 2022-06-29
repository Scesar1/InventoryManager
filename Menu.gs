function createMenu() {
   var menu = SpreadsheetApp.getUi().createMenu("⚙️ Admin Settings");
   menu.addItem("Add new product", "showSidebar");
   menu.addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Page')
      .setTitle('My custom sidebar');
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);
}