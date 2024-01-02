<img src="logo_readme.png" width="100" alt="logo"/>
    
## TeacherTodoScreen

#### Overview

TeacherTodoScreen is a web-based application crafted for educators (and basically anyone who can make use of this), enabling efficient task, event, and announcement management. It features an intuitive admin panel for content customization, supporting rich text editing, sorting, and styling options. The user-friendly interface offers both light and dark modes, ensuring seamless engagement with auto-updated information via a JSON file.

---

#### Features

1. **Task, Event, and Announcement Management:**
   - Organize and display tasks, events, and announcements for educators.

2. **Admin Panel with Content Customization:**
   - Facilitates content creation and customization.
   - Supports rich text editing, display sorting, and styling options.

3. **Dynamic Main Screen:**
   - Presents events dynamically and allows pinning important items.

4. **Data Management with JSON File Integration:**
   - Auto-updates using data stored in a JSON file for efficient content delivery.

5. **User-Friendly Interface:**
   - Provides light and dark mode options for personalized viewing.
   - Implements automatic pagination for managing large volumes of information.

---

#### Repository Structure

The repository structure includes two main sections: **Root** and **Admin** (also refered to as **Frontend** and **Backend**), each containing specific files related to the application functionalities.

##### Root

- **HTML & JavaScript Files:**
  - Responsible for displaying events.
- **JSON File:**
  - Contains event details given by the backend.
- **CSS File:**
  - Contains styling rules for the frontend.

##### Admin

- **HTML & JavaScript Files for Admin Panel:**
  - Handles backend functionalities for content management.
- **CSS File:**
  - Contains styling rules for the admin panel/ backend.
- **.htacces File:**
  - Makes it so that you have to enter a password and username before you can use the backend.
    
---

#### Modules

##### Root

| File                                             | Description                                                                                                                                                                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [index.html](index.html)                       | HTML file responsible for displaying the Gymnasium Neusiedl News website. It dynamically adds data fetched from [output.json](output.json) to the designated container.                                          |
| [output.json](output.json)                      | Contains a list of objects representing tasks or events, preferences, timestamps, and individual event details used by the frontend for display.                                                              |
| [saveFile.php](saveFile.php)                       | Processes POST requests by storing received content into [output.json](output.json). Validates requests and reports success/error messages based on saving the text.                                                 |
| [script.js](script.js)                            | Fetches the [output.json](output.json) file, updates HTML code to display events, manages event display, and configures settings such as mode and page-turn interval. For further information read [DOCUMENTATION.md](DOCUMENTATION.md).                                                        |
| [style.css](style.css)                                | Contains CSS rules for [index.html](index.html) with preprogrammed colors for light and dark mode.                                                                                                                                                                             |

##### Admin

| File                                             | Description                                                                                                                                                                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [index.html](admin/index.html)                     | HTML code for the backend, includes the quill.js library. Contains input fields for event details and a display area updated by JavaScript to show the events with an option to remove the event or edit it.                           |
| [saveFile.php](admin/saveFile.php)                   | Processes POST requests by saving incoming content to [../output.json](output.json). Verifies requests, writes to the specified file, and communicates the outcome.                           |
| [script.js](admin/script.js)                        | Initiates a Quill text editor, populates an event list, fetches actual event data, updates event display, and manages user interactions and settings. This one's much more complicated actually, go read the file comments and [DOCUMENTATION.md](DOCUMENTATION.md) for detailed information.                                                        |
| [style.css](admin/style.css)                  | Contains CSS rules for [index.html](admin/index.html). Includes declarations of custom web fonts and styling for the admin panel. This one indeed does not include a dark and light mode setting, but the colors are rather neutral so it should be usable by night as well as by day.                 |
| [.htaccess](admin/.htaccess)        | Configures basic HTTP authentication for the admin subdirectory, requiring valid credentials before access.        |

---

#### Acknowledgments

- Distribution of work:
  - 5% Kubo
  - 5% Filip
  - 3% Elias
  - 1% Rest
  - 86% ChatGPT
