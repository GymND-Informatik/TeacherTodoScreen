const events = document.getElementById("events");
const pageElement = document.getElementById("page");
let allElements = [];
let page = 0;
const ELEMENTSPERPAGE = 6;
let change_interval = 10000;

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function isDateBetween(checkDate, startDate, endDate) {
 // Convert the string dates to Date objects
 var check = new Date(checkDate);
 var start = new Date(startDate);
 var end = new Date(endDate);

 // Check if the checkDate is between startDate and endDate
 return check > start && check < end;
}

function fetchData() {
        allElements = []
	  fetch('readFile.php')
            .then(response => response.text())
            .then(data => {
		    var _events = JSON.parse(data);
		    _events.forEach((event) => {
            		if (isDateBetween(new Date(), event.von, event.bis)) {
	         		var text = event.text.replace(/\n/g, '<br>');
	        		const heading = `<h2>${event.event}</h2>`;
		        	text = `<p>${text}</p>`;
			        const element = document.createElement("div");
        			element.innerHTML = `${heading}${text}`;
			        element.classList.add("event");
			        
			        if (event.pinned) { element.classList.add("pinned"); allElements.unshift(element); }
			        else { allElements.push(element); }
			}
		});
            })
            .catch(error => {
              console.error('Error:', error);
            });

  runRefresh();
}

fetchData();

setInterval(runRefresh, 5000);
setInterval(fetchData, 2000);

function appendElements(lst) {
  lst.forEach((el) => {
    if (el !== undefined) events.append(el);
  });
}

function runRefresh() {
  if (page * ELEMENTSPERPAGE + 1 > allElements.length) {
    page = 0;
    return;
  }
  events.innerHTML = "";
  if (allElements == []) return;

  const lst = [];
  for (let i = page * ELEMENTSPERPAGE; i < (page + 1) * ELEMENTSPERPAGE; i++)
    lst.push(allElements[i]);

  appendElements(lst);

  pageElement.innerHTML = page + 1;

  page++;
  if (lst.pop() === undefined) page = 0;
}
