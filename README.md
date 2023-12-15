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
    - [🤖 Running TeacherTodoScreen](#-running-TeacherTodoScreen)
    - [🧪 Tests](#-tests)
- [🛣 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---


## 📍 Overview

The TeacherTodoScreen is a web-based application designed for educators to manage and display tasks, events, and announcements. It features an admin panel for content creation and customization, supporting rich text editing, sorting, and styling options. The main screen dynamically presents events, allows pinning of important items, and auto-updates using data stored in a JSON file. The efficient, user-friendly interface provides both light and dark modes and offers automatic pagination to maintain viewer engagement with up-to-date information.

---

## 📦 Features

Exception: 

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
| [index.html](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/index.html)     | The `index.html` file is a markup document for a "Gymnasium Neusiedl News" webpage that presents events and to-do items. It references a CSS stylesheet (`style.css`) for styling and a JavaScript file (`script.js`) that likely manipulates page content and handles functionality. A commented-out image element suggests that there might have originally been an intention to display a school logo or similar image. The `.container` holds a header with the page's purpose, and the `.wrapper` houses an empty `events` div and a page number indicator which might be dynamically updated.                                                  |
| [output.json](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/output.json)   | The `output.json` file contains a list of objects representing tasks or events, including preferences such as "page turn" speed and "mode" settings, and individual event details with HTML-formatted text, timestamps for start ("von") and end ("bis") dates, "pinned" status indicators, and text size attributes ("large"). This data is likely used by the TeacherTodoScreen web application for managing and displaying tasks or announcements.                                                                                                                                                                                                |
| [saveFile.php](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/saveFile.php) | The `saveFile.php` script processes POST requests by storing received content into `output.json`. It validates non-empty requests and reports success or error messages based on the outcome of saving the text. Non-POST requests are rejected with an error.                                                                                                                                                                                                                                                                                                                                                                                       |
| [script.js](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/script.js)       | The `script.js` is part of a web-based to-do platform for teachers, where it handles the dynamic display and storage of event items. It fetches events from a JSON file, then filters, paginates, and presents these events on the UI, with options to pin important ones. The script supports dark mode and handles automatic page turning based on a retrieved interval. Events that fall within the current date range are considered, and the event view is refreshed at a regular interval, ensuring recent data is always shown. Additionally, the script includes functions to write changes back into the JSON file and perform date checks. |
| [style.css](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/style.css)       | The `style.css` file contains CSS rules for a web application with a teacher's todo screen. It defines light and dark color themes using CSS custom properties, font faces for typographic styles with specific `woff` files, layout styles for elements like headings, body, wrapper, and container. It includes styling and layout for page elements such as events, pages, images, and text with varying sizes. It also has media support for color schemes and a special class'pinned' that highlights elements with a red border.                                                                                                               |

</details>

<details closed><summary>Admin</summary>

| File                                                                                               | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---                                                                                                | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [index.html](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/admin/index.html)     | The admin page of a TeacherTodoScreen web application allows administrators to create events with a rich text editor (Quill), set event timing, and choose display settings. It offers style customization (dark/light mode) and event sorting options (by addition time or end time). The interface includes a logo, time selector, display order selector, mode selector, event name input, date/time pickers for event duration, and an upload button. The `.htaccess` file likely controls server access to the directory. |
| [saveFile.php](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/admin/saveFile.php) | The `admin/saveFile.php` script processes POST requests by saving incoming text content to `../output.json`. It verifies that the request is a POST with non-empty content, writes to the specified file, and communicates the outcome: success, a write error, or empty content received. Non-POST requests receive an error message for request method validity.                                                                                                                                                             |
| [script.js](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/admin/script.js)       | The script initiates a Quill text editor with custom toolbar options for a todo application within the `TeacherTodoScreen/admin` directory. It maintains an event list that it tries to populate from a preloaded JSON string (as a fallback) and then fetches actual event data from `output.json`. Post-fetch, the script updates the event display and configures settings such as mode and page-turn interval. It also manages user interactions with the page-turn selector, invoking JSON updates upon changes.          |
| [style.css](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/admin/style.css)       | The provided `style.css` within the `TeacherTodoScreen/admin/` directory defines a series of CSS custom properties (variables) for consistent styling across the admin panel of a web application, such as main background, accent colors, fonts, shadows, and more. It also includes the declarations of two custom web fonts using the `@font-face` rule to include "badSchoolFontDIN1451W02Engschrift" and "DIN W02 Light" fonts internally sourced from `.woff` files.                                                     |
| [.htaccess](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/admin/.htaccess)       | The `.htaccess` file in the `TeacherTodoScreen/admin/` directory configures basic HTTP authentication for the admin subdirectory, requiring valid users to enter credentials stored in `/var/www/.htpasswd` before accessing the area.                                                                                                                                                                                                                                                                                         |

</details>

---

## 🚀 Getting Started

***Dependencies***

Please ensure you have the following dependencies installed on your system:

`- ℹ️ Dependency 1`

`- ℹ️ Dependency 2`

`- ℹ️ ...`

### 🔧 Installation

1. Clone the TeacherTodoScreen repository:
```sh
git clone https://github.com/GymND-Informatik/TeacherTodoScreen
```

2. Change to the project directory:
```sh
cd TeacherTodoScreen
```

3. Install the dependencies:
```sh
► INSERT-TEXT
```

### 🤖 Running TeacherTodoScreen

```sh
► INSERT-TEXT
```

### 🧪 Tests
```sh
► INSERT-TEXT
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
> - [ ] frontend text is too big imo there's not enough room
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


This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## 👏 Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#Top)

---


