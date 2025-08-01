const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { ensureAuthenticated } = require('../config/auth');

// Show logged-in user's notes
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).lean();
    res.render('notes', { notes, title: 'My Notes' });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// Show public notes (no auth required)
router.get('/public', async (req, res) => {
  try {
    const publicNotes = await Note.find({ public: true }).populate('user').lean();
    res.render('notes', { notes: publicNotes, title: 'Public Notes' });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// Show add note form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('add-note', { title: 'Add Note' });
});

// Add new note
router.post('/add', ensureAuthenticated, async (req, res) => {
  try {
    const { title, content, public } = req.body;
    const newNote = new Note({
      title,
      content,
      user: req.user.id,
      public: public === 'on' ? true : false
    });
    await newNote.save();
    req.flash('success_msg', 'Note added');
    res.redirect('/notes');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// Show edit form
router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).lean();
    if (!note) return res.render('error/404');

    if (note.user.toString() !== req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/notes');
    }
    res.render('edit-note', { note, title: 'Edit Note' });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// Update note
router.put('/edit/:id', ensureAuthenticated, async (req, res) => {
  try {
    const { title, content, public } = req.body;

    let note = await Note.findById(req.params.id);
    if (!note) return res.render('error/404');

    if (note.user.toString() !== req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/notes');
    }

    note.title = title;
    note.content = content;
    note.public = public === 'on' ? true : false;

    await note.save();

    req.flash('success_msg', 'Note updated');
    res.redirect('/notes');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// Delete note
router.delete('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.render('error/404');

    if (note.user.toString() !== req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/notes');
    }

    await Note.deleteOne({ _id: req.params.id });
    req.flash('success_msg', 'Note deleted');
    res.redirect('/notes');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;
