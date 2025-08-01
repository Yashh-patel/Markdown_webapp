require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const hbs = require('hbs');

const app = express();

// Load DB and Passport config
require('./config/db')();
require('./config/passport')(passport);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register partials directory for handlebars
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());

// Global variables for flash and user
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error'); // for Passport
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/notes', require('./routes/notes'));

// Export app for bin/www
module.exports = app;
