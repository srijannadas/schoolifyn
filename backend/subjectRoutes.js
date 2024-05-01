const express = require('express');
const router = express.Router();
const Subject = require('./models/Subjects');

router.post('/', async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
    try {
      const subjects = await Subject.find();
      res.json(subjects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;
