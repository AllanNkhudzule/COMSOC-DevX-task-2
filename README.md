# Implementation Explanation

To implement the GUI version of the index.js program, I used only vanilla HTML and JavaScript without any frameworks. The goal was to replicate all functionalities from the original command-line version, including creating, viewing, editing, deleting, and searching for users.

The interface was built using simple HTML buttons to represent each menu option that existed in the CLI. Each button triggers a corresponding JavaScript function such as showUsers(), createUser(), or deleteUser(). Instead of using readline for user input, I used dynamic HTML forms that appear when a user clicks a button. The data entered is handled directly in JavaScript using the DOM.

For demonstration, I implemented a simple array called users to store data temporarily, acting as a mock database. Each CRUD operation modifies this array and updates the display in real time using innerHTML. This structure ensures the GUI behaves similarly to the console version but in a visual, interactive way.

The entire project is built without any libraries or frameworks and runs directly in any web browser. If connected to a real database, the same interface could easily communicate with a backend server using JavaScript’s fetch() API.
