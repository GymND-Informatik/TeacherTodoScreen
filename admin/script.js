// Initiate all variables
var arrallevents = [];
var aae_index = 0;

var _event = document.getElementById("event");
var von_time = document.getElementById("von_time");
var bis_time = document.getElementById("bis_time");
var jsonBtn = document.getElementById("jsonbtn");
var all_events = document.getElementById("displayallevents");
var show_archive = document.getElementById("archiv_anzeigen");
var sofort = document.getElementById("sofort");

const ZEICHEN_LIMIT = 1000;
const ZEILEN_LIMIT = 10;

// ----------------------------------------------------

// Quill configuration
var toolbarOptions = [
  ['bold', 'italic', 'underline'],
  [{ 'color': [] }],
  [{ 'size': ['small', false, 'large'] }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  ['clean']
];

// Quill initialization
var quill = new Quill('#editor', {
  theme: 'snow',
  placeholder: 'Beschreiben Sie das Event...',
  modules: {
    toolbar: toolbarOptions
  }
});

// ------------------------------------------------------

// Load all the events from the JSON file into the array  (hard coded to know if php failed)
var loaded_events = '[{"event":"PHP Loading Failed Mad ","text":"","von":"2023-11-08T00:00","bis":"2023-11-08T23:59"}]';
arrallevents = JSON.parse(loaded_events);
aae_index = arrallevents.length;
update();

// Read the JSON, hope it works
read_json();

// -------------------------------------------------------

// Funtion to read the json file and update the arrallevents array 
function read_json() {
  fetch('readFile.php')
    .then(response => response.text())
    .then(data => {
      // console.log(data); // Log the content of the file
      loaded_events = data;
      arrallevents = JSON.parse(loaded_events);
      aae_index = arrallevents.length;
      update();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Still TODO 
function upload_change_interval() {
  // TODO this wont work might have to go for another php nightmare trip
  localStorage.setItem('change_interval', change_interval);
}

// Pad a number with zeroes in front (used for dates)
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

// Write it into a simple JSON file server-side called output.json
function write_into_json() {
//  console.log(JSON.stringify(arrallevents));
  fetch("saveFile.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arrallevents)
  })
    .then(response => response.text())
    .then(data => {
      // console.log(data); // Log the server's response
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Delete an event (will be activated on_click)
function button_delete(button) {
  // Loop through all the elements in arrallevents and see if they match with the button
  for (var i = 0; i < arrallevents.length; i++) {
    if (arrallevents[i].event == button.name) {
      // If they match, delete the element and rerender
      arrallevents.splice(i, 1);
      update();
      aae_index--;
      // Break the loop
      break;
    }
  }
  write_into_json();
}

// Sanitize HTML (good practice)
function sanitizeHTML(html) {
 const parser = new DOMParser();
 const doc = parser.parseFromString(html, 'text/html');

 // Convert sanitized content back to HTML string
 return doc.body.innerHTML;
}

// Clean up some details from the raw HTML for it to fit into quill
function cleanQuillHTML(html) {
  var ret;
  ret = html.replace('<p><br></p>', '');
  return ret;
}

// Edit an event (will be activated on_click)
// Will delete the old event and put the current data into the input fields
function button_edit(button) {
  // Loop through all the elements in arrallevents and see if they match with the button
  for (var i = 0; i < arrallevents.length; i++) {
    if (arrallevents[i].event == button.name) {
      // If they match, delete the element and rerender
      _event.value = arrallevents[i].event;

      // Read the text from the events array
      var text = arrallevents[i].text;

      // Adjust it so that quill can work with it
      var new_text = text.replace(/large-text/g, 'ql-size-large');
      text = new_text.replace(/small-text/g, 'ql-size-small');

      // Sanitize it with DOMParser
      var html_string = text;

      // Paste it in, but do some modifications after that
      quill.clipboard.dangerouslyPasteHTML(html_string);
      quill.root.innerHTML = cleanQuillHTML(quill.root.innerHTML);

      // Enter the time
      von_time.value = arrallevents[i].von;
      bis_time.value = arrallevents[i].bis;

			// Delete it from the arrallevents
      arrallevents.splice(i, 1);
      update();
      aae_index--;
      // Break the loop
      break;
    }
  }
  write_into_json();
}

// Update the HTML doc to display all the existing events
function update() {
  // Display all the existent events in a buffer
  var event_string = '';
  arrallevents.forEach(function(arrayItem) { 
    var x = arrayItem;
    
   if ((x.archived && show_archive.checked) || !x.archived) {
    var von_ = new Date(x.von);
    var bis_ = new Date(x.bis);

    // Convert date to a readable string
    var date_von = von_.getDate() + "." + (von_.getMonth() + 1) + "." + von_.getFullYear() + " " + pad(von_.getHours(), 2) + ":" + pad(von_.getMinutes(), 2);
    var date_bis = bis_.getDate() + "." + (bis_.getMonth() + 1) + "." + bis_.getFullYear() + " " + pad(bis_.getHours(), 2) + ":" + pad(bis_.getMinutes(), 2);

    // Add a new HTML element 
    printText = x.text.replace(/\n/g, '<br>');
    // console.log('printText', printText);

    event_string +=
      "<div class='event_div'>" +
      "<p class='event'><b><font size=5>" +
      x.event;

    if (x.archived === true) {
        event_string += " [ARCHIVIERT]";
    }

    event_string += "</font></b>";

    event_string +=
      "<div><b>" +
      date_von +
      " - " +
      date_bis +
      "</b></div></p>";

    if (x.text !== '') {
      event_string +=
        "<div id='text_container'>" +
        printText +
        "</div>";
    }

    event_string +=
      "<button onclick='button_delete(this)' class='delete' name='" +
      x.event +
      "'>Löschen</button>" +
      "<button onclick='button_edit(this)' class='edit' name='" +
      x.event +
      "'>Bearbeiten</button><label for='pin_checkbox'>Anheften:</label><input type='checkbox' id='pin_checkbox' onclick='pin(this)' name='" +
      x.event +
      "'";

    if (x.pinned) {
      event_string += "checked";
    }

    event_string +=
       ">" +
       "</div>\n";
    }
  });

//  console.log('events_string', event_string);
  all_events.innerHTML = event_string;
}

// Retrieve HTML content from Quill editor
function getContentAsHTML() {
  var delta = quill.getContents();

  var tempCont = document.createElement('div');
  new Quill(tempCont).setContents(delta);

  var htmlContent = tempCont.querySelector('.ql-editor').innerHTML;
  return htmlContent;
}

// Modify the HTML from quill to be compatible with the backend display AND the frontend
function modifyQuillHTML(htmlContent) {
  var modifiedHTML = htmlContent;
  modifiedHTML = modifiedHTML.replace(/ql-size-large/g, 'large-text');
  modifiedHTML = modifiedHTML.replace(/ql-size-small/g, 'small-text');

  return modifiedHTML;
}

// The "hochladen" button, used to add new events
jsonBtn.addEventListener("click", function() {
  var text = getContentAsHTML();
  text = modifyQuillHTML(text);

  // console.log('quill output', text);
  var data =
  {
    "event": _event.value,
    "text": text,
    "von": von_time.value,
    "bis": bis_time.value,
    "archived": false,
    "pinned": false
  }

	// SAFEGUARDS
  if (_event.value.includes("'")) {
    alert("Das Zeichen ' darf nicht im Eventnamen sein!");
    return;
  }
  if (_event.value == "") {
    alert("Kein Event angegeben!");
    return;
  }
  if (!(isNaN(von_time.value) && isNaN(bis_time.value))) {
    alert("Datum muss angegeben sein!");
    return;
  }
  // Check for time travelling
  var von_ = new Date(von_time.value);
  var bis_ = new Date(bis_time.value);
  if (bis_ <= von_) {
    alert("Das Enddatum muss später als das Startdatum sein!");
    return;
  }
  var current_date = new Date();
  if (bis_ <= current_date - 5 * 60 * 1000 || von_ <= current_date + 5 * 60 * 1000) {
    alert("Das Enddatum und das Begindatum muss in der Zukunft sein!");
    return;
  }
  for (var i = 0; i < arrallevents.length; i++) {
    if (arrallevents[i].event == data.event) {
      alert("Nicht dasselbe Event zweimal eintragen!");
      return;
    }
  }
  // Character limit 
  if (quill.getText().length > ZEICHEN_LIMIT) {
    alert("Der Text darf nicht länger als 1000 Zeichen sein!");
    return;
  }
  if ((quill.getText().match(/\n/g) || '').length + 1 > ZEILEN_LIMIT) {
    alert("Der Text darf nicht mehr als 7 Zeilen haben!");
    return;
  }
  
  // Write it in
  arrallevents[aae_index++] = data;

	// Update the display and update the output file
  update();
  write_into_json();

	// Clear the inputs
  _event.value = '';
  quill.clipboard.dangerouslyPasteHTML('');
  von_time.value = '';
  bis_time.value = '';
});

// Update the display when archived events are supposed to appear/disappear
show_archive.addEventListener("change", function() {
  update();
});

// Check if a date is between two other dates, needed to find out if an event is supposed to be archived
function isDateBetween(checkDate, startDate, endDate) {
 // Convert the string dates to Date objects
 var check = new Date(checkDate);
 var start = new Date(startDate);
 var end = new Date(endDate);

 // Check if the checkDate is between startDate and endDate
 return check > start && check < end;
}

// Check the dates to see if they belong in the archive
function check_dates() {
  var change = false;
  arrallevents.forEach(function(event) {
     var current = new Date();
     if (isDateBetween(current, event.von, event.bis)) {
       event.archived = false;
     }
     else {
       event.archived = true;
       change = true;
     }
//     console.log(event, current, event.von, event.bis, isDateBetween(current, event.von, event.bis));
  });
  if (change) {
     update();
  }
}

// Check every ten seconds, can be expanded, TODO might change the entire system
// setInterval(check_dates, 10000);

// Pin an event (mark it as pinned, will take effect only on the frontend)
function pin(checkbox) {
  // Loop through all the elements in arrallevents and see if they match with the button
  for (var i = 0; i < arrallevents.length; i++) {
    if (arrallevents[i].event == checkbox.name) {
      arrallevents[i].pinned = checkbox.checked;
      break;
    }
  }
  write_into_json();
}

sofort.addEventListener("click", function() {
  const currentDateUTC = new Date();

  // Convert UTC time to local time
  const localTime = currentDateUTC.getTime() - (currentDateUTC.getTimezoneOffset() * 60000);
  const currentDateLocal = new Date(localTime);

  // Format the date as required by datetime-local input (YYYY-MM-DDTHH:MM)
  const dateString = currentDateLocal.toISOString().substring(0, 16);

  // Set the value of the datetime input
  von_time.value = dateString;
});
