# createGoogleMapsViewFromCalendar
At conferences I often feel like a naive traveling salesman, hopping between the events on my calendar and maps to manually check what's nearest me. 
I use the method below to auto-populate a google maps view with pins of each event on my calendar. I separate each day of events into its own layer so that I can overlay different days. 
The result looks something like this on desktop:
<img width="1431" alt="Screenshot 2024-09-18 at 9 31 43 AM" src="https://github.com/user-attachments/assets/2e16b54d-cc68-4715-9604-fe58ffe95ff2">
and, on mobile: 
![IMG_0433](https://github.com/user-attachments/assets/e4a502fa-7d4d-429a-bbbb-5d7947a253e0)
![IMG_0434](https://github.com/user-attachments/assets/a572a3a8-c035-406d-bbf4-bd5ac3d61506)

## Steps
I recommend following these steps on desktop. The process could probably be automated a little more, but i'd give an ETA of 5-10 minutes to create views for a week of events. 

### Create Google Apps Script
Navigate to [script.google.com](script.google.com) and click the 'New Project' button. Copy the code in ./createMapsListFromCalendar.gs and paste it into the Apps Script editor. 

### Modify Script Params and Run
Update startDate and endDate to match the dates of calendar events you want to populate on Maps. Update the calendarIds to specify which calendars you want to pull events from. Save, then click the 'Run' button. You should see a log of the calendar names being used, along with the name of each file exported. 

### Find annd Download Exported Files
After running, you will have a new folder created in your Google Drive with CSV files for each date of events on your calendar. Download the files and unzip them. 

### Create Maps View(s)
Navigate to [Google Maps](maps.google.com) and make sure you're logged in with the same account that was used to export calendar files. Click 'Saved', then click the last tab titled 'Maps'. Clicking 'Create Map' will take you to a new page. Here, you can add layers for each date of events, and import the downloaded .csv file for each respective layer. You can use the share button to create a shareable link, and you should be good to go! The view can be accessed from this link, or from viewing your saved maps when signed into the same account on Google Maps. 
