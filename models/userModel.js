const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    name: {
      type: String,
    },
    avatarLocation: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    userRole: { type: String, enum: ['ADMIN', 'USER'] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    active: { type: Boolean, default: true },
    userConsent: { type: Boolean, default: false },
    joiningDate: {
      type: Date,
    },
    dateOfBirth: {
      type: Date,
    },
    passChanged: { type: Boolean, default: false },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    otp: {
      type: String,
    },
    pincode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
