const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const InsuranceModel = require('../../models/insuranceModel');

// @description  GET all users
// @route        GET /admin/allUsers
// @access       Private
exports.allUsers = asyncHandler(async (req, res) => {
  console.log('here')
  const userId = req.headers['user-id'];
  User.find({ userRole: { $ne: 'ADMIN' } }).exec((err, data) => {
    if (err) {
      
      res.status(400);
      throw new Error('Database Error');  
    } else {
      console.log(data)
      res.status(201).json(data.reverse());
    }
  });
});

// @description  GET all insurance
// @route        GET /admin/getInsurances
// @access       Private
exports.getAllInsurance = (req, res) => {
  InsuranceModel.find({}, (err, data) => {
    if (err) {
      res.status(500).json({ 'msg': 'Database Error Occured!' });
    } else {
      res.status(200).json({ 'status': true, 'data': data });
    }
  });
}


// @description  PUT update insurance
// @route        GET /admin/approveInsurance 
// @access       Private
exports.approveInsurance = (req, res) => {
  InsuranceModel.updateOne({ _id: req.body.insuranceId }, { $set: { approvedStatus: true, approvedOn: new Date() } }, (err, data) => {
    if (err) {
      res.status(500).json({ 'msg': 'Database Error Occured!' });
    } else {
      res.status(200).json({ 'status': true, 'msg': "Insurance Approved!" });
    }
  });
}