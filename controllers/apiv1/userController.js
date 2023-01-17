const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');
const CountryModel = require('../../models/countryModel');
const StateModel = require('../../models/stateModel');
const CityModel = require('../../models/cityModel');


const InsuranceModel = require('../../models/insuranceModel');

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

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
    res.status(201).json({
      _id: user.id,
      name: user.firstName + ' ' + user.lastName,
      userRole: user.userRole,
      token: generateToken(user._id),
      password: user.password,
      email: user.email,
      citizenship: user.citizenship,
      address: user.address,
      homeCountry: user.homeCountry,
      city: user.city,
      state: user.state,
      createdAt: user.createdAt
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});


// @desc    Sendgrid send OTP
// @route   GET /api/users/generateOTP
// @access  Private
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


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  console.log(req.user)
  res.status(200).json(req.user);
});


// @desc    Get list of countries
// @route   GET /api/users/getCountries
// @access  Public
exports.getCountries = (req, res) => {
  console.log('con')
  CountryModel.find({}, (err, data) => {
    if (err) {
      res.status(500).json({ 'msg': 'Database Error Occured!' });
    } else {
      res.status(200).json({ 'status': true, 'data': data });
    }
  });
}

// @desc    Get states based on country
// @route   GET /api/users/getStates
// @access  Public
exports.getStates = (req, res) => {
  var country_id = req.query.id
  StateModel.find({ countryId: country_id }, (err, data) => {
    if (err) {
      res.status(500).json({ 'msg': 'Database Error Occured!' });
    } else {
      res.status(200).json({ 'status': true, 'data': data });
    }
  });
}

// @desc    Get cities based on state 
// @route   GET /api/users/getCities
// @access  Public
exports.getCities = (req, res) => {
  var state_id = req.query.id
  CityModel.find({ stateId: state_id }, (err, data) => {
    if (err) {
      res.status(500).json({ 'msg': 'Database Error Occured!' });
    } else {
      res.status(200).json({ 'status': true, 'data': data });
    }
  });
}


// @desc    Get user insurances
// @route   GET /api/users/getCities
// @access  Public
exports.getMyInsurance = (req, res) => {
  InsuranceModel.find({ createdBy: req.user._id }, (err, data) => {
    if (err) {
      res.status(500).json({ 'msg': 'Database Error Occured!' });
    } else {
      res.status(200).json({ 'status': true, 'data': data.reverse() });
    }
  });
}

// @description  POST purchase insurance
// @route        POST /user/updateInsurance
// @access       Private
exports.updateInsurance = (req, res) => {
  const user = req.user

  // Insurance.save((err, data) => {
  //   if (err) {
  //     res.status(500).json({ 'msg': 'Database Error Occured!' });
  //   } else {
  // this.paymentTandom(req.user)
  stripe.customers.create({
    email: user.email,
    // source: req.body.stripeToken,
    name: user.firstName + user.lastName,
    address: {
      line1: user.address,
      postal_code: user.zipCode,
      city: user.city,
      state: user.state,
      country: user.country,
    }
  })
    .then(async (customer) => {
      const card_token = await stripe.tokens.create({
        card: {
          name: user.firstName + user.lastName,
          number: req.body.cardNumber,
          exp_month: req.body.cardMonth,
          exp_year: req.body.cardYear,
          cvc: req.body.cardCvv
        }
      })
      await stripe.customers.createSource(customer.id, { source: `${card_token.id}` })
      return stripe.paymentIntents.create({
        amount: 2500,     // Charging Rs 25
        description: 'NomadGuard Insurance',
        currency: 'USD',
        customer: customer.id
      });
    })
    .then((charge) => {
      let Insurance = InsuranceModel(req.body)
      Insurance.save((err, data) => {
        if (err) {
          res.status(500).json({ 'msg': 'Database Error Occured!' });
        } else {
          res.status(200).json({ 'status': true, 'msg': 'Success' });
        }
      });
      // res.send("Success")  // If no error occurs
    })
    .catch(async (err) => {
      // delete insurance if payment unsuccessful
      // await InsuranceModel.deleteOne({ _id: data._id });
      console.log(err)
      // res.status(500).json({ 'msg': err }); // If some error occurs
      res.send(err)       // If some error occurs
    });
  // }
  // });
}


// @description  PUT update user data
// @route        POST /user/updateProfile
// @access       Private
exports.updateProfile = asyncHandler(async (req, res) => {
  const userId = req.headers['user-id'];
  console.log(userId)
  User.updateOne({ _id: userId }, { $set: { firstName: req.body.firstName, lastName: req.body.lastName, address: req.body.address, zipCode: req.body.zipCode } }, (errUpdate, resultUpdate) => {
    if (errUpdate) {
      return res.status(500);
    } else {
      return res.status(200);
    }
  });
});




