const express = require('express');
const User = require('../models/userModel');
const Song = require('../models/songModel');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/get-all-songs', authMiddleware, async (req, res) => {
  try {
    // const user = await User.findById(req.body.userId);
    const songs = await Song.find();

    return res.status(200).send({
      message: 'Songs fetched successfully',
      success: true,
      data: songs,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Error fetching songs',
      success: false,
    });
  }
});

module.exports = router;
