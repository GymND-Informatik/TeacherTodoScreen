<div align="center">
<h1 align="center">
<img src="logo.png" width="100" />
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

#### Installation

1. Clone the TeacherTodoScreen repository into the `/var/www/html/` directory (make sure it is empty):
```sh
sudo git clone https://github.com/GymND-Informatik/TeacherTodoScreen /var/www/html
```

2. Change to the project directory:
```sh
cd /var/www/html/
```

3. Ensure you have the right permissions (just run them all):
```
sudo chmod 777 . -R
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

4. if you haven't already, start apache:
```
sudo systemctl start apache2
```

---

#### Contributing


Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/GymND-Informatik/TeacherTodoScreen/blob/main/.github/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/GymND-Informatik/TeacherTodoScreen/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/GymND-Informatik/TeacherTodoScreen/issues)**: Submit bugs found or log feature requests for GYMND-INFORMATIK.

##### *Contributing Guidelines*

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

#### Acknowledgments

- Distribution of work:
  - 35% Filip
  - 35% Kubo
  - 4% Elias
  - 1% Rest
  - 25% ChatGPT

---

[**Return**](#Top)
