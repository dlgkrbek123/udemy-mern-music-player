const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    console.log(req.body);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    const existingUser = await User.findOne({ email: req.body.email });

    console.log(existingUser);

    if (existingUser) {
      return res.status(200).send({
        message: 'User already exists',
        success: false,
      });
    }

    await user.save();

    return res
      .status(200)
      .send({ message: 'User registered successfully', success: true });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
