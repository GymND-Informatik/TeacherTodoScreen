# Documentation

### Backend (admin)
#### Inputs
The Backend has 4 input fields: Eventname, Text, From and To.

It has a dropdown menu for the speed at which pages change on the frontend, that can be uploaded by the press of the button next to it.

It has an option for the events as to whether they should be pinned.

#### Funtionality
When the "Hochladen" button is pressed, the data from the input fields are written into the JSON array `arrallevents`. Each JSON object has 6 attributes:

```
{
  event: title for the event
  text: extra information regarding the event (uses quill.js for formatting)
  von: the time from which the event will be displayed
  bis: the time at which the event will get deleted
  pinned: if the event is supposed to be pinned on the frontend
  page_turn: the speed at which pages change on the frontend (same for all events)
 }
```

Before getting written, the data gets checked for all kinds of safeguards.

This JSON object is then written into output.json by `write_into_json()` using [admin/saveFile.php](admin/saveFile.php).

The file [output.json](output.json) contains all of the data and is always loaded on the beginning of admin startup by `read_json()`.

Every 5 seconds, all of the events are checked if they should be deleted by `check_dates()`.

The events can be deleted by the "Löschen" button that calls the `button_delete()` function that loops through all events and compares their title to the name of the button that has been configured to be equal to the title of the event it is connencted to (can be found in `update()`).

The events can be edited by the "Bearbeiten" button that calls the `button_edit()` function that does the same as the delete funtion but before it deletes the data it gets inserted into the input fields. There are also a few edits that are made on the text to make it work with quill.js.

The update function gets called from all throughout the [admin/script.js](admin/script.js). All it does is update the HTML to display the correct events. It sets the innerHTML of the `displayallevents` div element. It adds a div (`class="event_div"`) filled with the title, text, dates, delete/edit buttons and a pinned checkbox to that div and adds it to the parent div `displayallevents`.

When the "Anheften" checkbox is checked, `pin()` gets called and that marks the event whose name aligns with the name of the checkbox (also configured in `update()`) as pinned and writes into [output.json](output.json).

### Frontend

#### Display

The frontend page simply displays all events that are in the [output.json](output.json) file, always by four, and turning pages.

#### Funtionality

Every 5 seconds, data is fetched by `fetchData()`. This funtion fetches the [output.json](output.json) file, parses it, loops through all the events, checks if it is supposed to be displayed based on the time and adds data into the `allElements` array that have the HTML element with the title and text inside of them. 
If the event is supposed to be pinned, it gets put at the front of the array and marked as "pinned" with an HTML class.
Lastly, the page_turn_interval is set.

Every second `check_refresh()` is called. The script keeps a counter variable that increases by 1000 every second. If this value exceeds the `page_turn_interval`, it is reset and `runRefresh()` is called, creating a simple clock system. 

`runRefresh()` displays the events by editing the HTML, and switches the page if necessary.

