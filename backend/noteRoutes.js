const express = require('express');
const router = express.Router();
const Note = require('./models/Notes');

router.post('/', async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
