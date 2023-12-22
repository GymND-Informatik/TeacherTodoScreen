<div align="center">
<h1 align="center">
<img src="V Str (1).png" width="100" />
<br>TeacherTodoScreen</h1>
<h3>◦ Empower Educators, Elevate Tasks – TeacherTodoScreen</h3>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5" />
<img src="https://img.shields.io/badge/PHP-777BB4.svg?style=flat&logo=PHP&logoColor=white" alt="PHP" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON" />
</p>
<img src="https://img.shields.io/github/license/GymND-Informatik/TeacherTodoScreen?style=flat&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/GymND-Informatik/TeacherTodoScreen?style=flat&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/GymND-Informatik/TeacherTodoScreen?style=flat&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/GymND-Informatik/TeacherTodoScreen?style=flat&color=5D6D7E" alt="GitHub top language" />
</div>

---

## 📖 Table of Contents
- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [📂 repository Structure](#-repository-structure)
- [⚙️ Modules](#modules)
- [🚀 Getting Started](#-getting-started)
    - [🔧 Installation](#-installation)
- [🛣 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---


## 📍 Overview

The TeacherTodoScreen is a web-based application designed for educators to manage and display tasks, events, and announcements. It features an admin panel for content creation and customization, supporting rich text editing, sorting, and styling options. The main screen dynamically presents events, allows pinning of important items, and auto-updates using data stored in a JSON file. The efficient, user-friendly interface provides both light and dark modes and offers automatic pagination to maintain viewer engagement with up-to-date information.

---

## 📦 Features

### Feature Overview

1. **Task, Event, and Announcement Management:**
   - Organize and display tasks, events, and announcements for educators.

2. **Admin Panel with Content Customization:**
   - Facilitates content creation and customization via a dedicated admin panel.
   - Supports rich text editing, sorting, and styling options for seamless customization.

3. **Dynamic Main Screen:**
   - Presents events dynamically for easy accessibility and updates.
   - Option to pin important items for quick reference.

4. **Data Management with JSON File Integration:**
   - Auto-updates using data stored in a JSON file for efficient content delivery.

5. **User-Friendly Interface:**
   - Provides an efficient and intuitive interface for ease of use.
   - Offers light and dark mode options for personalized viewing preferences.

6. **Automatic Pagination:**
   - Implements automatic pagination to handle large volumes of information while maintaining engagement.
---


## 📂 Repository Structure

```sh
└── TeacherTodoScreen/
    ├── admin/
    │   ├── .htaccess
    │   ├── index.html
    │   ├── saveFile.php
    │   ├── script.js
    │   └── style.css
    ├── index.html
    ├── output.json
    ├── saveFile.php
    ├── script.js
    └── style.css

```

---


## ⚙️ Modules

<details closed><summary>Root</summary>

| File                                                                                         | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---                                                                                          | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [index.html](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/index.html)     | HTML file for the Gymnasium Neusiedl News website includes an “Events & To-Dos” container and a JavaScript module that dynamically adds backend-fetched data to `<div id="events" class="events"></div>`. It also displays the current page using `<span id="page"></span>` at the bottom.                       |
| [output.json](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/output.json)   | The `output.json` file contains a list of objects representing tasks or events, including preferences such as "page turn" speed and "mode" settings, and individual event details with HTML-formatted text, timestamps for start ("von") and end ("bis") dates, "pinned" status indicators, and text size attributes ("large"). This data is  used by the frontend to know what to display.   |
| [saveFile.php](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/saveFile.php) | The `saveFile.php` script processes POST requests by storing received content into `output.json`. It validates non-empty requests and reports success or error messages based on the outcome of saving the text. Non-POST requests are rejected with an error.   |
| [script.js](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/script.js)       | In short, this script fetches the output.json file and displays its events by updating the HTML code and appending new events to the `<div id="events" class="events"></div>` div. For more information read the file's comments. |
| [style.css](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/style.css)       | The `style.css` file contains CSS rules for [index.html](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/index.html).                         |

</details>

<details closed><summary>Admin</summary>

| File                                                                                               | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---                                                                                                | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [index.html](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/admin/index.html)     | This file contains the HTML code for the backend. It includes the quill.js library. The body includes a logo, a dropdown to select the order in which the events should be displayed and another one to change how often pages should be turned on the frontend. It wraps the input fields in the `<div class="input-container">` container. The input fields are `<input id="event-input" type="text" placeholder="Geben Sie den Eventnamen ein...">`, for the event title, `   <div id="editor"></div>`, for additional information regarding the event, `<input type="datetime-local" id="from-time" placeholder="Startdatum und -Zeit">`, to select the time the event takes effect and should be displayed and finally `<input type="datetime-local" id="to-time" placeholder="Enddatum und -zeit">`, selecting the time the event should get deleted. These can be uploaded using the `<button id="upload-button">Hochladen</button>` button. The `<p id="events-display"></p>` element is then updated from the javascript to show all the events.
| [saveFile.php](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/admin/saveFile.php) | The `admin/saveFile.php` script processes POST requests by saving incoming text content to `../output.json`. It verifies that the request is a POST with non-empty content, writes to the specified file, and communicates the outcome: success, a write error, or empty content received. Non-POST requests receive an error message for request method validity.  |
| [script.js](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/admin/script.js)       | The script initiates a Quill text editor with custom toolbar options for a todo application within the `TeacherTodoScreen/admin` directory. It maintains an event list that it tries to populate from a preloaded JSON string (as a fallback) and then fetches actual event data from `output.json`. Post-fetch, the script updates the event display and configures settings such as mode and page-turn interval. It also manages user interactions with the page-turn selector, invoking JSON updates upon changes. For further information go read the file. |
| [style.css](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/admin/style.css)       | This file contains CSS rules for [index.html](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/admin/index.html).  It also includes the declarations of two custom web fonts using the `@font-face` rule to include "badSchoolFontDIN1451W02Engschrift" and "DIN W02 Light" fonts internally sourced from `.woff` files.                |
| [.htaccess](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/admin/.htaccess)       | The `.htaccess` file in the `TeacherTodoScreen/admin/` directory configures basic HTTP authentication for the admin subdirectory, requiring valid users to enter credentials stored in `/var/www/.htpasswd` before accessing the area.       |

</details>

---

## 🚀 Getting Started

***Dependencies***

All you need for the website to work is have apache running and installed. Then just clone the repo into `/var/www/html/` and hope it works. Also ensure the directory has the correct permissions and ownerships. One command you might have to always run is `sudo chmod 777 . -R` in the `/var/www/html/` directory.

### 🔧 Installation

1. Clone the TeacherTodoScreen repository into the `/var/www/html/` directory (make sure it is empty):
```sh
sudo git clone https://github.com/GymND-Informatik/TeacherTodoScreen /var/www/html
```

2. Change to the project directory:
```sh
cd /var/www/html/
```

3. Ensure you have the right permissions:
```
sudo chmod 777 . -R
```

4. if you haven't already, start apache:
```
sudo systemctl start apache2
```

---


## 🛣 Project Roadmap
> - [X] `ℹ️  Task 1: Implement X
> - [x] Die Einführung eines Sofortbuttons
> - [x] Archivierung weg
> - [x] nach ablauf delete
> - [x] Editor im Backend
> - [x] 4/6 Kästchen Layout
> - [x] Anheften - Wichtiges kann angeheftet werden
> - [x] Backend: Zeit zum Blättern einschalten BIG TODO
> - [x] Editieren Datum-Zeile soll entfernt werden
> - [x] CSS styling test
> - [x] Frontend soll 4 Kästchen haben
> - [x] Angehefte maximal 2 - mache popup in Admin
> - [x] Admin Sorting 
> - [x] Solve problem with simultaneous uploade of events
> - [x] Backend of Frontend should alert Admin if Text in Frontend overflows - Border of Event should be red
> - [x] When you upload Event in Admin it should have a yellow border and when it is uploaded and no text overflows then it is back to normal border color
> - [x] Backend CSS text is too small and li elements are bigger than normal text - general backend css checkup
> - [x] frontend text is too big imo there's not enough room
> - [x] make sure backend always knows whether an event fits
> - [ ] clean up console logs (kubo, no one else will do this i need them)
> - [x] format code
> - [ ] change default theme of frontend to light mode
> - [x] rename variables and functions everywhere
> - [x] fix small text not working on frontend

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/GymND-Informatik/TeacherTodoScreen/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/GymND-Informatik/TeacherTodoScreen/issues)**: Submit bugs found or log feature requests for GYMND-INFORMATIK.

#### *Contributing Guidelines*

<details closed>
<summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone <your-forked-repo-url>
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License


This project is protected under the [GNU LICENSE](LICENSE) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## 👏 Acknowledgments

- Yeah gotta give the credit to Kubo, Filip and Elias but the rest also contributed at least somewhat. 

[**Return**](#Top)

---


