# RTHG Todo App

A basic todo application showcasing full CRUD functionality. Features a REST API built with Laravel and a frontend web app built with React and Tailwind.

---

## Getting started

Instructions are for setup for local development. I will eventually add docker and make the app ready for deployment.

### Backend

Built using Laravel 10, you need to have the following to launch the backend server.

Requirements:

1. [PHP ^7.1 || ^8.0](https://www.php.net/)
2. [Composer 2.5.5](https://getcomposer.org/)
3. [Mariadb](https://mariadb.org/download/?t=mariadb&p=mariadb&r=11.1.0)
4. [Apache](https://httpd.apache.org/download.cgi)

alternatively instead of downloading PHP, Mariadb and Apache independently you can use [XAMPP](https://www.apachefriends.org/).

Once your system meets the requirements using the example.env create a .env file and input your database name, user and password. Ensure your Apache and database is running, create the database and optionally a user and password.

Navigate to rthg-todo-backend and run

```
composer install
```

followed by

```
php artisan migrate
```

and finally

```
php artisan serve
```

The server will start typically run on localhost:8000

---

### Frontend

Built using React 18, you need to have the following to launch the frontend.

Requires:

1. [Node.js 18 LTS](https://nodejs.org/en)

Once you have Node installed, navigate to the rthg-todo-frontend folder and create a .env file using the format in the example.env Replace the url with the url where the backend is running.

Run:

```
npm install
```

Followed by:

```
npm run dev
```

Your frontend will start, typically on localhost:5173.

---

## The Application

Instructions:
The app is made up of a simple input field and an add button. Type in a task in the input field and press the + button to add a task. Once a task is added it will appear above the task input. To change a title, click on the description and type the new title and click away. To set a task to complete click the checkbox. To delete a task click the dustbin button.

## Future TODO (in no particular order)

1. Add registration and login or social login.
2. Dockerize the project.
3. Make the project deployment ready.
4. Add some tests to the frontend.
5. Add multiple task lists.
6. Add task rearrangement (drag and drop).
7. Secure API (JWT || Oauth2).
8. Add search and filter.
