// Define constants and variables
const events = document.getElementById("events");
const pageElement = document.getElementById("page");
let allElements = [];
let page = 0;
const ELEMENTSPERPAGE = 4;
let page_turn_interval = undefined;
var counter = 0;
var refreshInterval = 0;

// Function to pad a number with leading zeros
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

// Function to check if a date is between two other dates
function isDateBetween(checkDate, startDate, endDate) {
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
function fetchData() {
  fetch("output.json")
    .then((response) => response.text())
    .then((_data) => {
      allElements = [];
      const data = JSON.parse(_data);
      var _events = data.slice(1);

      var i = 1;
      _events.forEach((event) => {
        console.log(event);
        if (isDateBetween(new Date(), event.von, event.bis)) {
          var text = event.text.replace(/\n/g, "<br>");
          const heading = `<h2>${event.event}</h2>`;
          text = `<p>${text}</p>`;
          const element = document.createElement("div");
          element.innerHTML = `${heading}${text}`;
          element.classList.add("event");

          events.append(element);
          console.log(element.scrollHeight, element.clientHeight);
          if (element.scrollHeight > element.clientHeight) {
            data[i].large = "large";
            console.log("too large", data[i]);
          } else {
            data[i].large = "fine";
          }
          events.removeChild(element);
          if (event.pinned) {
            element.classList.add("pinned");
            allElements.unshift(element);
          } else allElements.push(element);
        }
        i += 1;
      });
      if (
        page_turn_interval === undefined ||
        page_turn_interval !== data[0] * 1000
      ) {
        page_turn_interval = data[0] * 1000;
        clearInterval(refreshInterval); // Clear the previous interval
        runRefresh(); // Run immediately with the new interval
        refreshInterval = setInterval(runRefresh, page_turn_interval); // Set the new interval
      }
      console.log("writing", data);
      write_into_json(data);
    }) // <- Missing closing parenthesis here
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Initial fetch of data
// fetchData();
// Set intervals for refreshing data and fetching new data

setInterval(fetchData, 5000);

// Function to append elements to the events container
function appendElements(lst) {
  lst.forEach((el) => {
    if (el !== undefined) events.append(el);
  });
}

// Function to refresh the displayed events
function runRefresh() {
  //  console.log(allElements);
  if (page * ELEMENTSPERPAGE >= allElements.length) {
    page = 0;
    return;
  }
  events.innerHTML = "";
  if (allElements.length === 0) return;

  const lst = [];
  for (let i = page * ELEMENTSPERPAGE; i < (page + 1) * ELEMENTSPERPAGE; i++)
    lst.push(allElements[i]);

  appendElements(lst);

  pageElement.innerHTML = page + 1;

  page++;
  if (lst.pop() === undefined) page = 0;
}
