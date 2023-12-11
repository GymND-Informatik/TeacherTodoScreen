# Documentation [OUTDATED]

## Backend Administration

### Input Fields

- **Event Name, Text, From, To**: These are the four primary input fields for event details.
- **Dropdown Menu**: This allows the selection of the page change speed on the frontend. Changes can be implemented by clicking the adjacent button.
- **Pinning Option**: Events can be set as 'pinned', meaning they remain prominently displayed on the frontend.

### Functionality

- **Data Upload**: Clicking the "Hochladen" button transfers data from the input fields to the `arrallevents` JSON array. Each event is represented as a JSON object with six attributes:
  - `event`: Title of the event.
  - `text`: Additional details about the event (formatted using quill.js).
  - `von`: Start time for the event display.
  - `bis`: End time, after which the event is deleted.
  - `pinned`: Boolean indicating if the event is pinned on the frontend.
  - `page_turn`: Page changing speed on the frontend (applies to all events).
- **Data Validation and Writing**: Before submission, data undergoes validation. Valid data is then written into `output.json` via `write_into_json()`, which accesses [admin/saveFile.php](admin/saveFile.php).
- **Data Loading and Monitoring**: [output.json](output.json) holds all event data, loaded at admin startup by `read_json()`. Every 5 seconds, `check_dates()` evaluates events for deletion based on their timing.
- **Event Management**: Events can be deleted ("Löschen" button) or edited ("Bearbeiten" button). The deletion uses `button_delete()` to compare event titles for removal. The editing function pre-fills input fields with existing data, making necessary adjustments for quill.js compatibility.
- **Display Update**: Admin actions trigger updates in [admin/script.js](admin/script.js), refreshing the HTML display of events. The `update()` function dynamically adjusts the innerHTML of `displayallevents`, incorporating elements like titles, text, dates, control buttons, and the pinning option.
- **Pinning Events**: Selecting the "Anheften" checkbox activates `pin()`, marking the event as pinned in [output.json](output.json).

## Frontend

### Display

- **Event Visualization**: The frontend showcases events from [output.json](output.json), displaying four at a time and allowing page navigation.

### Functionality

- **Data Fetching and Processing**: `fetchData()` runs every 5 seconds, retrieving and parsing [output.json](output.json). It organizes events for display, prioritizing pinned events and setting the `page_turn_interval`.
- **Automatic Refresh**: `check_refresh()` maintains a counter, triggering `runRefresh()` when the interval exceeds `page_turn_interval`. This mechanism ensures timely updates and page transitions.
- **Event Presentation**: `runRefresh()` manages the HTML content, displaying events and facilitating page changes as needed.
