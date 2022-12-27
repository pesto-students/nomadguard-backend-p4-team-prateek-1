const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');

const express = require('express');
const app = express();
const path = require('path');

let ejs = require('ejs');
app.set('emails', path.join(__dirname, './../../emails'));
app.set('view engine', 'ejs');
require('dotenv').config();
const mail = require('../../helpers/mail');

// @description  Register User
// @route        POST /user/register
// @access       Private
exports.registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  // if (!name || !email || !password) {
  if (!req.body.email) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  req.body.password = hashedPassword;
  req.body.userRole = 'USER'
  console.log(req.body)
  // Create user
  const newUser = new User(req.body)
  newUser.save((err, data) => {
    if (err) {
      res.status(400);
      throw new Error('Database error!');
    } else {
      res.status(201).json(data);
    }
  });
});


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, '12312312312', {
    expiresIn: '30d',
  });
};


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;
  // Check for user email
  const user = await User.findOne({ email });
  console.log(user)

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({ ...user, token: generateToken(user._id) });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});


exports.generateOTP = asyncHandler(async (req, res) => {

  var digits = '0123456789';
  var OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  req.body.otp = OTP

  User.findOneAndUpdate({ email: req.body.email }, { $set: { otp: OTP } }, async (err, data) => {
    if (err) {
    } else {
      ejs.renderFile(path.join(__dirname, './../../emails/', "otp.ejs"), { email_data: req.body }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          email_params = {
            to: req.body.email,
            subject: 'Here is your OTP to reset your password',
            html: data
          }
          mail.send(email_params);
        }
      });
      return res.status(200).json(data);
    }
  });

});