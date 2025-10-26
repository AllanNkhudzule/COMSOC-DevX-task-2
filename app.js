import { sql } from "./constants/db.js";

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all button elements
    const showUsersBtn = document.getElementById("showUsers");
    const addUsersBtn = document.getElementById("addUsers");
    const deleteUserBtn = document.getElementById("deleteUser");
    const editUsersBtn = document.getElementById("editUsers");
    const searchUsersBtn = document.getElementById("searchUsers");

    // Add event listeners
    showUsersBtn.addEventListener("click", showUsers);
    addUsersBtn.addEventListener("click", addUser);
    deleteUserBtn.addEventListener("click", deleteUser);
    editUsersBtn.addEventListener("click", editUsers);
    searchUsersBtn.addEventListener("click", searchUser);
});

// Search User Function
async function searchUser() {
    const username = prompt("Enter username to search:", '');
    
    // Check if user canceled the prompt
    if (username === null) {
        return;
    }
    
    // Validate input
    if (!username.trim()) {
        alert("Please enter a username");
        return;
    }

    try {
        const users = await sql`SELECT * FROM users WHERE username = ${username}`;
        
        if (users.length === 0) {
            alert("No user found");
        } else {
            let message = "User(s) found:\n\n";
            users.forEach((user, index) => {
                message += `User ${index + 1}:\n`;
                Object.keys(user).forEach(key => {
                    message += `${key}: ${user[key]}\n`;
                });
                message += "\n";
            });
            alert(message);
        }
    } catch (error) {
        console.error("Error searching user:", error);
        alert("Error searching for user. Please try again.");
    }
}

// Show All Users Function
async function showUsers() {
    try {
        const users = await sql`SELECT * FROM users`;
        
        if (users.length === 0) {
            alert("No users found in database");
        } else {
            let message = "All Users:\n\n";
            users.forEach((user, index) => {
                message += `User ${index + 1}:\n`;
                Object.keys(user).forEach(key => {
                    message += `${key}: ${user[key]}\n`;
                });
                message += "\n";
            });
            alert(message);
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        alert("Error fetching users. Please try again.");
    }
}

// Add User Function
async function addUser() {
    const username = prompt("Enter new username:");
    if (!username || !username.trim()) {
        alert("Username is required");
        return;
    }

    const email = prompt("Enter email:");
    if (!email || !email.trim()) {
        alert("Email is required");
        return;
    }

    try {
        await sql`INSERT INTO users (username, email) VALUES (${username}, ${email})`;
        alert("User added successfully!");
    } catch (error) {
        console.error("Error adding user:", error);
        alert("Error adding user. Please try again.");
    }
}

// Delete User Function
async function deleteUser() {
    const username = prompt("Enter username to delete:");
    if (!username || !username.trim()) {
        alert("Username is required");
        return;
    }

    try {
        const result = await sql`DELETE FROM users WHERE username = ${username}`;
        
        if (result.count === 0) {
            alert("No user found with that username");
        } else {
            alert("User deleted successfully!");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user. Please try again.");
    }
}

// Edit User Function
async function editUsers() {
    const username = prompt("Enter username to edit:");
    if (!username || !username.trim()) {
        alert("Username is required");
        return;
    }

    try {
        const users = await sql`SELECT * FROM users WHERE username = ${username}`;
        
        if (users.length === 0) {
            alert("No user found with that username");
            return;
        }

        const user = users[0];
        const newUsername = prompt("Enter new username:", user.username);
        const newEmail = prompt("Enter new email:", user.email);

        if (!newUsername || !newEmail) {
            alert("Both username and email are required");
            return;
        }

        await sql`UPDATE users SET username = ${newUsername}, email = ${newEmail} WHERE username = ${username}`;
        alert("User updated successfully!");
        
    } catch (error) {
        console.error("Error updating user:", error);
        alert("Error updating user. Please try again.");
    }
}