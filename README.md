# Inventory Manager

Inventory management and record storing for Umma USA and Route 66 International.
Consists of a back-end coded with JavaScript and Google Sheets API and a front-end in Google Sheets and HTML web-application.

---

### Current Version: 2.0.0 (7/6/2022)
Changelog: 
- Changed format of Ship&Inventory spreadsheet after separation of Umma USA and Route66 companies and inventories. 
  - Ship&Inventory sheet no longer has "Storage/Pumyang" and "Factory" columns
  - "Shipping" and "Office" columns changed to "Out-" and "In+" in "Changes"
  - Products in the main table split into 3 categories: Nori, Snack, and Other
 
- Back-end logic for product entries in the table is now entirely modular
  - No longer based on a fixed look-up table
    - Allows for more flexible implementation of inventory manager at the cost of a slightly slower runtime (However, still O(n) time-complexity).
    - Modularization provides more code-reusability, allowing for refactorization of main script into helper methods. 

- New module in front-end: "Add New Product" sidebar
  - Server-side implementation with HTML, Bootstrap CSS, and JavaScript. 
  - Connects to cilent-side using Google Script HTMLService and JavaScript
  - Filling out form in sidebar creates new entry in inventory table and updates values accordingly based on shipping quantities. 
  
 - Added error-handling for non-shipping sheets in the Ship&Inventory spreadsheet. 




