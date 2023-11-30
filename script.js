// Define constants and variables
const events = document.getElementById("events");
const pageElement = document.getElementById("page");
let allElements = [];
let page = 0;
const ELEMENTSPERPAGE = 4;
let page_turn_interval = undefined;
var counter = 0;

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

// Function to fetch data and process events
function fetchData() {
  fetch('output.json')
    .then(response => response.text())
    .then(_data => {
      allElements = [];
	const data = JSON.parse(_data);
      var _events = data.slice(1);
	
      _events.forEach((event) => {
        if (isDateBetween(new Date(), event.von, event.bis)) {
          var text = event.text.replace(/\n/g, '<br>');
          const heading = `<h2>${event.event}</h2>`;
          text = `<p>${text}</p>`;
          const element = document.createElement("div");
          element.innerHTML = `${heading}${text}`;
          element.classList.add("event");

          if (event.pinned) {
            element.classList.add("pinned"); 
            allElements.unshift(element); 
          } else allElements.push(element); 
        }
      });
	if (page_turn_interval === undefined) {
	  page_turn_interval = data[0] * 1000;
		runRefresh();
		setInterval(runRefresh, page_turn_interval);
	}
    })
    .catch(error => {
      console.error('Error:', error);
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
    return runRefresh();
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
