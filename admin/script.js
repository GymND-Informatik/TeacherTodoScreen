// Initiate all variables
var events = [];
var input_event = document.getElementById("event-input");
var input_from = document.getElementById("from-time");
var input_to = document.getElementById("to-time");
var upload_button = document.getElementById("upload-button");
var events_display = document.getElementById("events-display");
var instant_button = document.getElementById("instant-button");
var page_turn_select = document.getElementById("page-turn-select");
var page_turn_interval = 5;
var display_order_select = document.getElementById("display-order-select");
var mode_select = document.getElementById("mode-select");
var writing = false;
// ----------------------------------------------------

// Quill configuration
var toolbar_options = [
  ["bold", "italic", "underline"],
  [{ color: [] }],
  [{ size: ["small", false, "large"] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["clean"],
];

// Quill initialization
var quill = new Quill("#editor", {
  theme: "snow",
  placeholder: "Beschreiben Sie das Event...",
  modules: {
    toolbar: toolbar_options,
  },
});

// ------------------------------------------------------

// Load all the events from the JSON file into the array  (hard coded to know if php failed)
var loaded_events =
  '[{"event":"PHP Loading Failed Mad check your permissions lmao ot call me","text":"","von":"2023-11-08T00:00","bis":"2023-11-08T23:59"}]';
events = JSON.parse(loaded_events);
display();

// Fetch the json file for the first time, write it into the events array and match the settings (mode, page_turn)
fetch("../output.json")
  .then((response) => response.text())
  .then((data) => {
    loaded_events = data;
    var parsed = JSON.parse(loaded_events);
    events = parsed.slice(1);
    mode_select.value = parsed[0].mode;
    page_turn_select.value = parsed[0].page_turn.toString();
    display();
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// -------------------------------------------------------

page_turn_select.addEventListener("change", function () {
  console.log(page_turn_select.value);
  page_turn_interval = page_turn_select.value;
  write_into_json();
});

// Pad a number with zeroes in front (used for dates display)
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

// Write it into a simple JSON file server-side ../output.json
function write_into_json() {
  const temp = [
    { page_turn: page_turn_interval, mode: mode_select.value },
    ...events,
  ];
  console.log(temp, mode_select.value);
  fetch("saveFile.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(temp),
  })
    .then((response) => response.text())
    .then((data) => {
      // console.log(data); // Log the server's response
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Delete an event (will be activated on_click)
function button_delete(button) {
  writing = true;
  fetch("../output.json")
    .then((response) => response.text())
    .then((data) => {
      console.log("[delete] 1 begin fetch");
      console.log("[delete] 2 raw", data); // Log the content of the file
      loaded_events = data;
      events = JSON.parse(loaded_events).slice(1);
      console.log("[delete] 3 fetched into array", events);
      console.log("[delete] 4 end fetch");

      // Loop through all the elements in arrallevents and see if they match with the button
      for (var i = 0; i < events.length; i++) {
        if (events[i].event == button.name) {
          // If they match, delete the element and rerender
          events.splice(i, 1);
          display();
          // Break the loop
          break;
        }
      }
      write_into_json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  writing = false;
}

// Sanitize HTML (good practice)
function sanitize_html(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Convert sanitized content back to HTML string
  return doc.body.innerHTML;
}

// Clean up some details from the raw HTML for it to fit into quill
function clean_quill_html(html) {
  var ret;
  ret = html.replace("<p><br></p>", "");
  return ret;
}

// Edit an event (will be activated on_click)
// Will delete the old event and put the current data into the input fields
function button_edit(button) {
  writing = true;
  // Loop through all the elements in arrallevents and see if they match with the button
  fetch("../output.json")
    .then((response) => response.text())
    .then((data) => {
      console.log("[edit] 1 begin fetch");
      console.log("[edit] 2 raw", data); // Log the content of the file
      loaded_events = data;
      events = JSON.parse(loaded_events).slice(1);
      console.log("[edit] 3 fetched into array", events);
      console.log("[edit] 4 end fetch");

      for (var i = 0; i < events.length; i++) {
        if (events[i].event == button.name) {
          // If they match, delete the element and rerender
          input_event.value = events[i].event;

          // Read the text from the events array
          var text = events[i].text;

          // Adjust it so that quill can work with it
          var new_text = text.replace(/large-text/g, "ql-size-large");
          text = new_text.replace(/small-text/g, "ql-size-small");

          // Sanitize it with DOMParser
          var html_string = text;

          // Paste it in, but do some modifications after that
          quill.clipboard.dangerouslyPasteHTML(html_string);
          quill.root.innerHTML = clean_quill_html(quill.root.innerHTML);

          // Enter the time
          input_from.value = events[i].von;
          input_to.value = events[i].bis;

          // Delete it from the arrallevents
          events.splice(i, 1);
          // Break the loop
          break;
        }
      }
      // Update the json since now the event doesn't exist anymore adn rerender
      write_into_json();
      display();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  writing = false;
}

// Add event listener to change of display_order to instantly rerender with the new order
display_order_select.addEventListener("change", display);
// Add event listener to change of mode and instantly write it into json
mode_select.addEventListener("change", write_into_json);

// Update the HTML doc to display all the existing events
function display() {
  // display order
  // option 1: earliest added
  // option 2: last added / reverse of option 1
  // option 3: lastest date last, earliest date first (e.g.  run out in 10 secs from now first, run out in 2 days from now last)
  // option 4: reverse of option 3
  var events_html = "";

  var option = display_order_select.value;
  var ordered_events = [];

  if (option === "1") {
    // simplest case: just in the order they were added, newest on top, this is the way it is always in the arrallevents array
    for (var i = 0; i < events.length; i++) {
      ordered_events.push(events[i]);
    }
  } else if (option === "2") {
    // reverse the order of arrallevents
    for (var i = 0; i < events.length; i++) {
      ordered_events.push(events[events.length - i - 1]);
    }
  } else if (option === "3") {
    // sort by bis_date, earliest to lastest
    ordered_events = [...events].sort((a, b) => a.bis - b.bis);
    ordered_events.sort((a, b) => {
      return new Date(a.bis).getTime() - new Date(b.bis).getTime();
    });
  } else if (option === "4") {
    // sort in opposite order as option 3
    ordered_events = events;
    ordered_events.sort((a, b) => {
      return new Date(b.bis).getTime() - new Date(a.bis).getTime();
    });
  }

  ordered_events.forEach(function (x) {
    var von_date = new Date(x.von);
    var bis_date = new Date(x.bis);

    // Convert date to a readable string
    var date_von =
      von_date.getDate() +
      "." +
      (von_date.getMonth() + 1) +
      "." +
      von_date.getFullYear() +
      " " +
      pad(von_date.getHours(), 2) +
      ":" +
      pad(von_date.getMinutes(), 2);
    var date_bis =
      bis_date.getDate() +
      "." +
      (bis_date.getMonth() + 1) +
      "." +
      bis_date.getFullYear() +
      " " +
      pad(bis_date.getHours(), 2) +
      ":" +
      pad(bis_date.getMinutes(), 2);

    // Add a new HTML element
    var print_text = x.text.replace(/\n/g, "<br>");

    events_html += "<div class='event-div' ";
    if (x.large === "large") {
      events_html += "id='large-event'";
    } else if (x.large === "pending") {
      events_html += "id='unconfirmed-event'";
    }

    events_html += ">" + "<p class='event'><b><font size=5>" + x.event;

    events_html += "</font></b>";

    events_html += "<div><b>" + date_von + " - " + date_bis + "</b></div></p>";

    if (x.text.replace(/<p><br><\/p>/g, "") !== "") {
      events_html += "<div id='text-container'>" + print_text + "</div>";
    }

    events_html +=
      "<button onclick='button_delete(this)' class='delete' name='" +
      x.event +
      "'>Löschen</button>" +
      "<button onclick='button_edit(this)' class='edit' name='" +
      x.event +
      "'>Bearbeiten</button><label>Anheften:</label>" +
      "<div class='body-checkbox'> <input id='checkbox-" +
      x.event +
      "' type='checkbox' onclick='pin(this)' class='glass-checkbox' name='" +
      x.event +
      "'";

    if (x.pinned) {
      events_html += " checked";
    }

    events_html +=
      "><label for='checkbox-" +
      x.event +
      "' class='label-glass-checkbox'></label></div>" +
      "</div>\n";
  });

  console.log("[rendered]", events);
  //  console.log('events_string', event_string);
  events_display.innerHTML = events_html;
}

// Retrieve HTML content from Quill editor
function get_content_as_html() {
  var delta = quill.getContents();

  var temp_cont = document.createElement("div");
  new Quill(temp_cont).setContents(delta);

  var html_content = temp_cont.querySelector(".ql-editor").innerHTML;
  return html_content;
}

// Modify the HTML from quill to be compatible with the backend display AND the frontend
function modify_quill_html(htmlContent) {
  var modified_html = htmlContent;
  modified_html = modified_html.replace(/ql-size-large/g, "large-text");
  modified_html = modified_html.replace(/ql-size-small/g, "small-text");

  return modified_html;
}

// The "hochladen" button, used to add new events
upload_button.addEventListener("click", function () {
  writing = true;
  fetch("../output.json")
    .then((response) => response.text())
    .then((data) => {
      console.log("[upload] 1 begin fetch");
      console.log("[upload] 2 raw", data); // Log the content of the file
      loaded_events = data;
      events = JSON.parse(loaded_events).slice(1);
      console.log("[upload] 3 fetched into array", events);
      console.log("[upload] 4 end fetch");
      console.log("[upload] 5 read", events);
      var text = get_content_as_html();
      text = modify_quill_html(text);

      var data = {
        event: input_event.value,
        text: text,
        von: input_from.value,
        bis: input_to.value,
        pinned: false,
        large: "pending",
      };

      // SAFEGUARDS
      if (input_event.value.includes("'")) {
        alert("Das Zeichen ' darf nicht im Eventnamen sein!");
        return;
      }
      if (input_event.value == "") {
        alert("Kein Event angegeben!");
        return;
      }
      if (!(isNaN(input_from.value) && isNaN(input_to.value))) {
        alert("Datum muss angegeben sein!");
        return;
      }
      // Check for time travelling
      var von_ = new Date(input_from.value);
      var bis_ = new Date(input_to.value);
      if (bis_ <= von_) {
        alert("Das Enddatum muss später als das Startdatum sein!");
        return;
      }
      var current_date = new Date();

      // TODO check if this does ANYTHING anymore
      console.log(current_date.getTime() - 1 * 60 * 1000, bis_.getTime());
      if (
        von_.getTime() <= current_date - 1 * 60 * 1000
      ) {
        alert("Das Begindatum muss in der Zukunft sein!");
        return;
      }
      for (var i = 0; i < events.length; i++) {
        if (events[i].event == data.event) {
          alert("Nicht dasselbe Event zweimal eintragen!");
          return;
        }
      }

      // Write it in
      events.push(data);
      console.log("[upload] 6 Pushed data", events);
      // Update the display and update the output file
      display();
      write_into_json();
      console.log("[upload] 7 written into json", events);

      // Clear the inputs
      input_event.value = "";
      quill.clipboard.dangerouslyPasteHTML("");
      input_from.value = "";
      input_to.value = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  writing = false;
});

// Check the dates to see if they belong into oblivion
function check_events() {
  if (writing) {
    console.log("aborted check c something else is writing");
    return;
  }
  fetch("../output.json")
    .then((response) => response.text())
    .then((data) => {
      console.log("[check] 1 begin fetch");
      console.log("[check] 2 raw", data); // Log the content of the file
      loaded_events = JSON.parse(data);
      events = loaded_events.slice(1);
      mode_select.value = loaded_events[0].mode;
      page_turn_select.value = loaded_events[0].page_turn.toString();
      console.log("[check] 3 fetched into array", events);
      console.log("[check] 4 end fetch");

      // Remove events that do not belong there and then rewrite without the old events
      var change = false;
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var current_date_utc = new Date();
        var date = new Date(current_date_utc);
        var event_date = new Date(event.bis);
        if (date >= event_date) {
          events.splice(i, 1);
          change = true;
          // Break the loop
          break;
        }
      }
      if (change) {
        write_into_json();
      }
      display();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Check every five seconds, can be expanded
// TODO might do a thung where i mark a boolean as 'fetching' and do not perform writes or edits during the entirity of check_dates()
setInterval(check_events, 1000);

// Pin an event (mark it as pinned, will take effect only on the frontend)
function pin(checkbox) {
  writing = true;
  fetch("../output.json")
    .then((response) => response.text())
    .then((data) => {
      loaded_events = data;
      events = JSON.parse(loaded_events).slice(1);

      var num_pinned = 0;
      for (var i = 0; i < events.length; i++) {
        if (events[i].pinned) num_pinned++;
      }
      if (num_pinned >= 2 && checkbox.checked) {
        setTimeout(() => {
          checkbox.checked = false;
        }, 0);
        alert("Es können nicht mehr als 2 Events angeheftet sein!");
        return;
      }
      for (var i = 0; i < events.length; i++) {
        if (events[i].event == checkbox.name) {
          events[i].pinned = checkbox.checked;
          break;
        }
      }
      write_into_json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  writing = false;
}

// On button press just fill in the input_from with the current date in the correct format
instant_button.addEventListener("click", function () {
  const current_date_utc = new Date();

  // Convert UTC time to local time
  const local_time =
    current_date_utc.getTime() - current_date_utc.getTimezoneOffset() * 60000;
  const current_date_local = new Date(local_time);

  // Format the date as required by datetime-local input (YYYY-MM-DDTHH:MM)
  const date_string = current_date_local.toISOString().substring(0, 16);

  // Set the value of the datetime input
  input_from.value = date_string;
});
