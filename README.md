# Smart Methods - User Data Web App

This project is a simple web application that allows users to:
- Enter their name and age through a form.
- Store the data in a MySQL database.
- Display the data in a table without refreshing the page (using AJAX).
- Toggle the status (0/1) for each user.

## Features
- Frontend: HTML, CSS, JavaScript
- Backend: PHP, MySQL
- AJAX: Fetch API is used for sending and receiving data asynchronously.

## Database
- Database Name: info
- Table Name: userdata
- Columns:
  - ID (Primary Key, Auto Increment)
  - name (VARCHAR)
  - age (INT)
  - status (INT, default 0)

## How to Run
1. Install XAMPP and start Apache & MySQL.
2. Open your browser and navigate to:
   http://localhost/Task2/first.html
3. You can now:
 • Add new users using the form.
 • Toggle their status using the Toggle button.
 • Data is stored in the MySQL table userdata

## Requirements
 - XAMPP
 - Basic knowledge of HTML, CSS, JavaScript, PHP, MySQL.

## Author
- Razan Alharbi — Trainee @ Smart Methods
- Student of IT — Qassim University
