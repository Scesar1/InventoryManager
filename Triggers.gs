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

function onOpen() {
  createMenu();
}


