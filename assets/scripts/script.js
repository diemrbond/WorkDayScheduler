// Query Selectors
var $currentDayElement = $('#currentDay');
var $theContainer = $('.container');

// Variables
var $times = [["9", "AM"], ["10", "AM"], ["11", "AM"], ["12", "PM"], ["1", "PM"], ["2", "PM"], ["3", "PM"], ["4", "PM"], ["5", "PM"]];
var $recordedEntries = [];
var $currentHour;
var $previousHour;

// Function to update the calendar colours when the time changes
function updateCalendar() {

    // Update the colours when the time changes from the previous hour
    var $changeColours = $(".colours");

    // Loop through each colours class
    // Wont run on first run, as $changeColours is empty array
    $.each($changeColours, function () {
        // Retrieve the id
        var $adjustColor = $(this).attr("id");
        // Set the colorus back to the default
        $(this).attr("class", "col-10 p-0 colours");
        // Re-add the custom colour class of past, present, future
        $(this).addClass(checkMoment($times[$adjustColor - 1][0], $times[$adjustColor - 1][1]));
    })

    // Update the previousHour to the new currentHour
    $previousHour = $currentHour;
}

// Function to set the current date and time
function displayCurrentDateTime() {

    // Using moment, get the current date and set the time on the page
    var $currentDate = moment().format('Do MMMM YYYY, h:mm:ss a');
    $currentDayElement.text($currentDate);

    // Check if the hour has changed, and if so update the colour scheme
    $currentHour = moment().format("hh");
    if ($previousHour != $currentHour) {
        updateCalendar();
    }
}

// Function to check moment and return the correct class
function checkMoment(theTime, ampm) {

    // Get the current moment
    var $getCurrentTime = moment().format('LT');
    // Convert the moment into the correct format
    var $currentTime = moment($getCurrentTime, "HH:mm:ss a");
    // Create the time range moments to compare with
    var $startTime = moment(theTime + ':00 ' + ampm, "HH:mm:ss a");
    var $endTime = moment(theTime + ':59 ' + ampm, "HH:mm:ss a");

    // Check if the current moment falls within this range of before, within|same, after
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

// Function to retrieve the calendar data from local storage
function retrieveStoredCalendar() {

    // Check if the calendar has been stored to the localStorage and retrieve
    var checkExistingCalendar = localStorage.getItem("calendarEntries");
    if (checkExistingCalendar != null) {
        $recordedEntries = JSON.parse(checkExistingCalendar);
    }
    // Otherwise, set to the default empty array
    else {
        for (var i = 0; i < $times.length; i++) {
            $recordedEntries.push("");
        }
    }
    // Console log the existing entries
    console.log("[SYSTEM] Retrieving saved data: " + $recordedEntries);
}

// Function to return the current calendar entry
function getCalendarEvent($which) {

    // Check if the recordedEntries array is undefined
    if ($recordedEntries != undefined) {
        return $recordedEntries[$which];
    }
    // Otherwise return empty string
    return "";
}

// Function to add the current calendar data to local storage
function addCalendarToStorage() {

    var calendarEntries = JSON.stringify($recordedEntries);
    localStorage.setItem("calendarEntries", calendarEntries);
    console.log("[SYSTEM] Added calender to local storage: " + calendarEntries);
}

// Function to add the input calendar entry to the array
function addCalendarEvent($id, $which) {

    // Add this event to the array
    $recordedEntries[$id - 1] = $which;
    console.log("[SYSTEM] Added at id " + ($id - 1) + ":" + $which);
}

// Function to setup the calendar, create the rows, etc
// Should only be run once, but will reset container if run again
function setupCalendar() {

    console.log("[SYSTEM] Setting up the Calendar");

    // Retrieve the stored calendar
    retrieveStoredCalendar()

    // Reset the container
    $theContainer.empty();

    // Add the number of rows based off times array
    for (var i = 0; i < $times.length; i++) {

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
        $newTimeElement.text($times[i][0] + $times[i][1]);

        // Create the text entry area div
        var $newDescription = $("<div>");
        $newDescription.attr("class", "col-10 p-0 colours");
        $newDescription.addClass(checkMoment($times[i][0], $times[i][1]))
        $newDescription.attr("id", (i + 1));

        // Create the text input area
        var $newTextArea = $("<input>");
        $newTextArea.attr("type", "text");
        $newTextArea.attr("style", "width: 100%; height: 100%; border: none; background: transparent; padding: 20px;")
        $newTextArea.attr("class", "textarea");
        $newTextArea.attr("id", "input" + (i + 1));

        // Retrieve stored entries
        $newTextArea.val(getCalendarEvent(i));

        // Create the save button div
        var $newSave = $("<div>");
        $newSave.attr("class", "col-1 saveBtn");
        $newSave.attr("style", "width: 100%; height: 100%; display: table")

        // Craete the save icon
        var $newSaveIcon = $("<i>");
        $newSaveIcon.attr("class", "fas fa-save");
        $newSaveIcon.attr("style", "display: table-cell; vertical-align: middle;")
        $newSaveIcon.attr("id", (i + 1));
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

// Interval to call the displayCurrentDateTime function every second
var $currentTimeInterval = setInterval(displayCurrentDateTime, 1000);

// Check and display the current date time on page load
displayCurrentDateTime();

// Let's get it started in here
setupCalendar();

// Event listeners
$(".fa-save").bind("click", function () {

    // Check which save button was pressed
    var $id = $(this).attr("id");
    
    // Get the text area based off the id
    var $textInput = $('#input' + $id);

    // Get the text input
    var $trimmedText = $textInput.val().trim();

    // Check if any data was entered, and if so save the data
    if ($trimmedText != undefined && $id != undefined) {

        // Add this calender entry to array
        addCalendarEvent($id, $trimmedText);

        // Add all entries to storage
        addCalendarToStorage();
    }
})