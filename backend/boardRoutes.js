const express = require('express');
const router = express.Router();
const Board = require('./models/Boards');

router.post('/', async (req, res) => {
  try {
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
    try {
      const boards = await Board.find();
      res.json(boards);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
