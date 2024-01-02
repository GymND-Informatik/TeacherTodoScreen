// Define constants and variables
const events = document.getElementById("events");
const page_element = document.getElementById("page");
let all_elements = [];
let page = 0;
const ELEMENTSPERPAGE = 4;
let page_turn_interval = undefined;
var counter = 0;
var refresh_interval = 0;
var pinned_elements = [];
var first_fetch = false;
var mode = "dark";
var fetching = false;

// set theme right in the begging otherwise everything is white
document.documentElement.setAttribute("data-theme", mode);

// Function to pad a number with leading zeros
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

// Function to check if a date is between two other dates
function is_date_between(checkDate, startDate, endDate) {
  // Convert the string dates to Date objects
  var check = new Date(checkDate);
  var start = new Date(startDate);
  var end = new Date(endDate);

  // Check if the checkDate is between startDate and endDate
  return check > start && check < end;
}

// Write it into a simple JSON file server-side called output.json
function write_into_json(data) {
  const temp = data;
  fetch("saveFile.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

// Function to fetch data and process events
function fetch_data() {
  fetch("output.json")
    .then((response) => response.text())
    .then((_data) => {
      fetching = true;
      all_elements = [];
      pinned_elements = [];
      const data = JSON.parse(_data);
      const _events = data.slice(1);
      const _interval = data[0].page_turn;
      const _mode = data[0].mode;
      var i = 1;
      _events.forEach((event) => {
        if (is_date_between(new Date(), event.von, event.bis)) {
          var text = event.text.replace(/\n/g, "<br>");
          const heading = `<h2>${event.event}</h2>`;
          text = `<p>${text}</p>`;
          const element = document.createElement("div");
          element.innerHTML = `${heading}${text}`;
          element.classList.add("event");

          events.append(element);
          if (element.scrollHeight > element.clientHeight) {
            data[i].large = "large";
          } else {
            data[i].large = "fine";
          }
          events.removeChild(element);
          if (event.pinned) {
            element.classList.add("pinned");
            pinned_elements.push(element);
          } else all_elements.push(element);
        }
        i += 1;
      });
      if (
        page_turn_interval === undefined ||
        page_turn_interval !== _interval * 1000
      ) {
        page_turn_interval = _interval * 1000;
        clearInterval(refresh_interval); // Clear the previous interval
        run_refresh(); // Run immediately with the new interval
        refresh_interval = setInterval(run_refresh, page_turn_interval); // Set the new interval
      }
      mode = _mode;
      document.documentElement.setAttribute("data-theme", mode);
      write_into_json(data);

      var n = all_elements.length;
      if (n === 0) {
        for (var i = 0; i < pinned_elements.length; i++) {
          all_elements.push(pinned_elements[i]);
        }
      }
      for (var i = 0; i < all_elements.length; i++) {
        if (i % ELEMENTSPERPAGE === 0) {
          for (var j = 0; j < pinned_elements.length; j++) {
            all_elements.splice(i, 0, pinned_elements[j]);
          }
        }
      }
      first_fetch = true;
      fetching = false;
    }) // <- Missing closing parenthesis here
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Initial fetch of data
// fetchData();
// Set intervals for refreshing data and fetching new data
fetch_data();
setInterval(fetch_data, 5000);

// Function to append elements to the events container
function append_elements(lst) {
  lst.forEach((el) => {
    if (el !== undefined) events.append(el);
  });
}

// Function to refresh the displayed events
function run_refresh() {
  //  console.log(allElements);
  if (!first_fetch) return;
  if (fetching) {
    return;

  }

  if (page * ELEMENTSPERPAGE >= all_elements.length) {
    page = 0;
    return;
  }
  events.innerHTML = "";
  if (all_elements.length === 0) return;

  let lst = [];
  for (let i = page * ELEMENTSPERPAGE; i < (page + 1) * ELEMENTSPERPAGE; i++) {
    lst.push(all_elements[i]);
  }

  append_elements(lst);

  page_element.innerHTML = page + 1;

  page++;
  if (lst.pop() === undefined) page = 0;
}
