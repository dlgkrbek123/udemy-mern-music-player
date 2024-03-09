const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    const existingUser = await User.findOne({ email: req.body.email });

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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).send({
        message: 'User does not exist',
        success: false,
      });
    }

    const isPasswordMatched = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
      return res.status(200).send({
        message: 'Password is incorrect',
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).send({
      message: 'User logged successfully',
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
});

module.exports = router;
