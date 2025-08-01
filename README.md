# Markdown Notes App

**Markdown Notes App** is a full-stack web application that allows users to write, manage, and organize notes in Markdown format. The app supports **authentication (local & GitHub)**, **CRUD operations** for notes, and a clean **Bootstrap-based UI** for a seamless writing experience.

---

## 🚀 Features

* **User Authentication**

  * Register/Login with username & password
  * GitHub OAuth login
  * Secure sessions with Passport.js

* **Markdown Notes**

  * Create, view, edit, and delete notes
  * Markdown formatting supported
  * Option to keep notes private or public

* **User-specific Access**

  * Each user sees only their notes
  * Public notes accessible to all

* **Responsive UI**

  * Built with Bootstrap & Handlebars (HBS)
  * Flash messages for actions (e.g., login errors, note saved)

* **Deployment**

  * Hosted on Render with MongoDB Atlas

---

## 🛠 Tech Stack

* **Frontend**: Handlebars (HBS), Bootstrap, Markdown rendering
* **Backend**: Express.js
* **Database**: MongoDB (Atlas)
* **Authentication**: Passport.js (`passport-local`, `passport-github2`)
* **Session Management**: express-session
* **Utilities**: bcrypt, dotenv, connect-flash, method-override

---

## 📂 Project Structure

```
markdown-notes-app/
├── app.js                  # Main app setup
├── bin/www                 # Starts the server
├── config/
│   ├── db.js               # MongoDB connection
│   └── passport.js         # Passport strategies
├── models/
│   ├── User.js             # User schema
│   └── Note.js             # Note schema
├── routes/
│   ├── index.js            # Home & public routes
│   ├── auth.js             # Authentication routes
│   └── notes.js            # CRUD routes for notes
├── views/
│   ├── layouts/layout.hbs  # Base layout
│   ├── partials/           # Header/footer partials
│   ├── home.hbs
│   ├── login.hbs
│   ├── register.hbs
│   └── notes/
│       ├── list.hbs
│       ├── create.hbs
│       └── edit.hbs
├── public/
│   ├── stylesheets/style.css
│   └── uploads/            # (If using file upload for images)
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_strong_session_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
```

---

## 🖥 Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Yashh-patel/Markdown_webapp.git
   cd Markdown_webapp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**

   * Add your `.env` file as shown above.

4. **Run the app**

   ```bash
   npm start
   ```

5. **Access the app**

   ```
   http://localhost:3000
   ```

---

## 📸 Screenshots

<img width="1917" height="782" alt="image" src="https://github.com/user-attachments/assets/754c8be8-b2b5-4347-8bd8-4d2acacc463c" />


---

## 🌐 Live Demo

https://markdown-webapp.onrender.com/

## 🔑 License

This project is licensed under the MIT License.
