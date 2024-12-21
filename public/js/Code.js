function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Get the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Get current date and time
    var currentDateTime = new Date();

    // Determine the next serial number (SI)
    var lastRow = sheet.getLastRow();
    var nextSerialNumber = lastRow > 1 && !isNaN(sheet.getRange(lastRow, 1).getValue()) ? sheet.getRange(lastRow, 1).getValue() + 1 : 1;

    // Append the data to the sheet
    sheet.appendRow([nextSerialNumber, data.fullName, data.mobile, data.email, data.course, currentDateTime]);

    // Create the JSON response with success status
    var response = {
      status: "success",
      message: "Data saved successfully!"
    };

    // Create the output
    var output = ContentService.createTextOutput(JSON.stringify(response));
    output.setMimeType(ContentService.MimeType.JSON);

    return output;
  } catch (error) {
    var responseError = {
      status: "error",
      message: "An error occurred: " + error.message
    };

    var outputError = ContentService.createTextOutput(JSON.stringify(responseError));
    outputError.setMimeType(ContentService.MimeType.JSON);

    return outputError;
  }
}

function doGet(e) {
  return handleOptions(); // Handle GET request and call OPTIONS handler
}

function doOptions(e) {
  return handleOptions(); // Handle OPTIONS preflight request
}

function handleOptions() {
  var output = ContentService.createTextOutput("");
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent("");

  // CORS headers (handle them in this function instead of `setHeaders`)
  return output;
}

// Test function to simulate POST request for testing purposes
function testDoPost() {
  var e = {
    postData: {
      contents: JSON.stringify({
        fullName: "John Doe",
        mobile: "1234567890",
        email: "johndoe@example.com",
        course: "Java Full Stack"
      })
    }
  };
  doPost(e);  // Run the doPost function with simulated data
}
