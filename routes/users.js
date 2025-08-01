const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// GET Register
router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register' });
});

// POST Register
router.post('/register', async (req, res) => {
  const { username, password, password2 } = req.body;
  let errors = [];

  if (!username || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.render('auth/register', { errors, username, password, password2 });
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      errors.push({ msg: 'Username already exists' });
      return res.render('auth/register', { errors, username, password, password2 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    req.flash('success_msg', 'You are registered and can now log in');
    res.redirect('/users/login');
  } catch (err) {
    console.error(err);
    res.render('auth/register', { errors: [{ msg: 'Server error' }] });
  }
});

// GET Login
router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

// POST Login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/login',
  failureFlash: true
}));

// GET Logout
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
});

module.exports = router;
