function listCalendars() {
  var calendars = CalendarApp.getAllCalendars();
  for (var i = 0; i < calendars.length; i++) {
    Logger.log('Calendar Name: ' + calendars[i].getName() + ', ID: ' + calendars[i].getId());
  }
}

function createCSVsFromCalendar() {
  // Set the date range
  var startDate = new Date('2024-09-15');
  var endDate = new Date('2024-09-22');

  // Specify the calendars you want to include (use IDs from listCalendars function)
  var calendarIds = [
    'primary', // Your primary calendar
    'nitesh@strobe.org'
    // Add more calendar IDs here, e.g., 'abcdefg123456@group.calendar.google.com'
  ];

  // Create a folder in Google Drive to store all CSV files
  var folder = DriveApp.createFolder('Calendar Events ' + startDate.toISOString().split('T')[0] + ' to ' + endDate.toISOString().split('T')[0]);

  // Loop through each day in the date range
  for (var d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    var currentDate = new Date(d);
    var dateString = currentDate.toISOString().split('T')[0];  // Format: YYYY-MM-DD

    // Create CSV content
    var csvContent = "Name,Description,Latitude,Longitude,Calendar\n";

    // Loop through each specified calendar
    for (var c = 0; c < calendarIds.length; c++) {
      var calendar = CalendarApp.getCalendarById(calendarIds[c]);
      if (!calendar) {
        Logger.log('Could not find calendar with ID: ' + calendarIds[c]);
        continue;
      }

      var events = calendar.getEventsForDay(currentDate);

      // Process each event
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var location = event.getLocation();

        if (location) {
          try {
            // Geocode the location
            var geocodeResults = Maps.newGeocoder().geocode(location);
            
            if (geocodeResults.status === 'OK' && geocodeResults.results.length > 0) {
              var result = geocodeResults.results[0];
              var lat = result.geometry.location.lat;
              var lng = result.geometry.location.lng;

              // Escape commas and quotes in the title and description
              var title = event.getTitle().replace(/"/g, '""');
              var description = (event.getDescription() + "\n" + location).replace(/"/g, '""');
              var calendarName = calendar.getName().replace(/"/g, '""');

              // Add to CSV content
              csvContent += `"${title}","${description}",${lat},${lng},"${calendarName}"\n`;
            } else {
              Logger.log('Could not geocode location: ' + location);
            }
          } catch (e) {
            Logger.log('Error processing event: ' + e);
          }
        }
      }
    }

    // Create a blob with the CSV content
    var blob = Utilities.newBlob(csvContent, 'text/csv', 'Calendar_Events_' + dateString + '.csv');

    // Create a file in the Google Drive folder
    var file = folder.createFile(blob);

    Logger.log('CSV file created for ' + dateString + '. File ID: ' + file.getId());
  }

  Logger.log('All CSV files have been created in Google Drive folder: ' + folder.getName());
  Logger.log('Folder URL: ' + folder.getUrl());
}
