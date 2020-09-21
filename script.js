// Query Selectors
var $currentDayElement = $('#currentDay');
var $theContainer = $('.container');

// Variables
var times = [["9", "AM"], ["10", "AM"], ["11", "AM"], ["12", "PM"], ["1", "PM"], ["2", "PM"], ["3", "PM"], ["4", "PM"], ["5", "PM"]];




// Set the current date and time
function displayCurrentDateTime() {
    var $currentDate = moment().format('Do MMMM YYYY, h:mm:ss a');
    $currentDayElement.text($currentDate);
}

// Interval to call the displayCurrentDateTime function every second
var $currentTimeInterval = setInterval(displayCurrentDateTime, 1000);
displayCurrentDateTime();

// Function check moment
function checkMoment(theTime, ampm) {

    // Get the current moment
    var $getCurrentTime = moment().format('LT');
    // Convert the moment into the correct format
    var $currentTime = moment($getCurrentTime, "HH:mm:ss a");
    // Create the time range moments
    var $startTime = moment(theTime + ':00 ' + ampm, "HH:mm:ss a");
    var $endTime = moment(theTime + ':59 ' + ampm, "HH:mm:ss a");

    // Check if the current moment falls within this range of before, within, after
    if (moment($currentTime).isBefore($startTime)) {
        return "future";
    }
    else if ((moment($currentTime).isBetween($startTime, $endTime)) || (moment($currentTime).isSame($startTime, $endTime))) {
        return "present";
    }
    else if (moment($currentTime).isAfter($startTime)) {
        return "past";
    }

}

function setupCalendar() {

    // Reset the container
    $theContainer.empty();

    // Add the number of rows based off times array
    for (var i = 0; i < times.length; i++) {

        // Create the time-block row
        var $newRow = $("<div>");
        $newRow.attr("class", "row time-block")

        // Create the time display div
        var $newTime = $("<div>");
        $newTime.attr("class", "col-1 hour");
        $newTime.attr("style", "width: 100%; height: 100%; display: table")

        // Add the time display as a span to the div
        $newTimeElement = $("<span>");
        $newTimeElement.attr("style", "display: table-cell; vertical-align: middle;")
        $newTimeElement.text(times[i][0] + times[i][1]);

        // Create tbe text entry area div
        var $newDescription = $("<div>");
        $newDescription.attr("class", "col-10 p-0");
        $newDescription.addClass(checkMoment(times[i][0], times[i][1]))

        // Create the text input area
        var $newTextArea = $("<input>");
        $newTextArea.attr("type", "text");
        $newTextArea.attr("style", "width: 100%; height: 100%; border: none; background: transparent; padding: 20px;")
        $newTextArea.attr("class", "textarea");
        $newTextArea.attr("id", "input" + (i + 1));

        // Create the save button div
        var $newSave = $("<div>");
        $newSave.attr("class", "col-1 saveBtn");
        $newSave.attr("style", "width: 100%; height: 100%; display: table")

        // Craete the save icon
        var $newSaveIcon = $("<i>");
        $newSaveIcon.attr("class", "fas fa-save");
        $newSaveIcon.attr("style", "display: table-cell; vertical-align: middle;")
        $newSaveIcon.attr("data-id", (i + 1));
        $newSaveIcon.css("cursor", "pointer");

        // Append everything to the container
        $newTime.append($newTimeElement);
        $newRow.append($newTime);
        $newDescription.append($newTextArea);
        $newRow.append($newDescription);
        $newSave.append($newSaveIcon);
        $newRow.append($newSave);
        $theContainer.append($newRow);

    }
}

// Let's get it started in here
setupCalendar();

// Add event listeners
$(".fa-save").bind("click", function () {

    // Check which save button was pressed
    var $id = $(this).data("id");

    // Get the text area based off the id
    var $textInput = $('#input' + $id);

    // Check if any data was entered, and if so save the data
    if ($textInput.val().trim() != "") {
        console.log("Data to save");
    }
})