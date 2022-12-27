const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');


exports.allUsers = asyncHandler(async (req, res) => {
  console.log('here')
  const userId = req.headers['user-id'];
  User.find({ userRole: { $ne: 'ADMIN' } }).exec((err, data) => {
    if (err) {
      res.status(400);
      throw new Error('Database Error');
    } else {
      res.status(201).json(data.reverse());
    }
  });
});