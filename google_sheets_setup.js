/**
 * UDBHAV 2026 - Google Sheets Database Endpoint (Google Apps Script)
 * 
 * INSTRUCTIONS TO SET UP:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Click "Extensions" -> "Apps Script" in the top menu bar.
 * 3. Delete any code in the editor and paste THIS ENTIRE FILE.
 * 4. Click "Deploy" (top right blue button) -> "New deployment".
 * 5. Click the gear icon next to "Select type" and choose "Web app".
 * 6. Set Description: "UDBHAV Registration Webhook"
 * 7. Set Execute as: "Me"
 * 8. Set Who has access: "Anyone" (CRITICAL step!)
 * 9. Click "Deploy", authorize permissions, and copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * 10. Open app.js in your project and paste your Web App URL into window.GOOGLE_SHEETS_WEBHOOK_URL:
 *     window.GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/.../exec';
 */

function doGet(e) {
  return ContentService.createTextOutput("UDBHAV 2026 Master Database API is Active & Online!")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Set Master Database as the single destination sheet
    var sheetName = "Master Database";

    // Ensure Master Database sheet tab exists
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      // Append Header Row
      sheet.appendRow([
        "Timestamp", "Pass ID", "Full Name", "Reg No", "Email",
        "Phone", "Class / Section", "Team Affiliation", "Participating Event"
      ]);
      sheet.getRange("1:1").setFontWeight("bold").setBackground("#0f172a").setFontColor("#ffb703");
    }

    // Automatically remove legacy Day 1 / Day 2 sheet tabs if they exist
    var legacySheetNames = ["Day 1 Registrations", "Day 2 Registrations", "Both Days Registrations", "Registered Students Database"];
    legacySheetNames.forEach(function(legacyName) {
      var legacySheet = ss.getSheetByName(legacyName);
      if (legacySheet && ss.getSheets().length > 1) {
        try {
          ss.deleteSheet(legacySheet);
        } catch (err) {
          // Ignore if sheet cannot be removed
        }
      }
    });

    // Append student submission data row
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.passId || "",
      data.name || "",
      data.regNo || "",
      data.email || "",
      data.phone || "",
      data.classSec || "",
      data.team || "",
      data.eventName || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
