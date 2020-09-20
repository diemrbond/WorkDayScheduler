// Query Selectors
var $currentDayElement = $('#currentDay');
var $theContainer = $('.container');

// Variables
var times = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];



// Set the current date and time
function displayCurrentDateTime() {
    var $currentDate = moment().format('Do MMMM YYYY, h:mm:ss a');
    $currentDayElement.text($currentDate);
}

// Interval to call the displayCurrentDateTime function every second
var $currentTimeInterval = setInterval(displayCurrentDateTime, 1000);
displayCurrentDateTime();

// Function check moment
function checkMoment(theTime){

    console.log("checking "+theTime);

    if (moment().isBefore(moment({ hour:theTime, minute:0 }))) {
        // do something
        return "past";
    }
}


// Add the number of rows based off times array
for (var i = 0; i < times.length; i++) {

    var $newRow = $("<div>");
    $newRow.attr("class", "row time-block")

    var $newTime = $("<div>");
    $newTime.attr("class", "col-1 hour");
    $newTime.attr("style", "width: 100%; height: 100%; display: table")
    
    $newTimeElement = $("<span>");
    $newTimeElement.attr("style", "display: table-cell; vertical-align: middle;")
    $newTimeElement.text(times[i]);

    console.log(parseFloat(times[i]));
    
    $newTime.append($newTimeElement);
    
    var $newDescription = $("<div>");
    $newDescription.attr("class", "col-10 p-0");
    $newDescription.addClass(checkMoment(parseFloat(times[i])))
    
    var $newTextArea = $("<input>");
    $newTextArea.attr("type", "text");
    $newTextArea.attr("style", "width: 100%; height: 100%; border: none; background: transparent; padding: 20px;")
    $newTextArea.attr("class", "textarea");
    
    $newDescription.append($newTextArea);
    
    var $newSave = $("<div>");
    $newSave.attr("class", "col-1 saveBtn");
    $newSave.attr("style", "width: 100%; height: 100%; display: table")
    
    var $newSaveIcon = $("<i>");
    $newSaveIcon.attr("class", "fas fa-save");
    $newSaveIcon.attr("style", "display: table-cell; vertical-align: middle;") 
    $newSave.append($newSaveIcon);

    $newRow.append($newTime);
    $newRow.append($newDescription);
    $newRow.append($newSave);
    $theContainer.append($newRow);

}

