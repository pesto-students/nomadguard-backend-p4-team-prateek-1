const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const insuranceSchema = mongoose.Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    hasEndDate: { type: Boolean },
    phoneNumber: {
      type: Number,
    },
    coverage: {
      type: Number,
    },
    coverageDays: {
      type: Number,
    },
    beneficiary: { type: String },
    countries: [{ type: String }],
    approvedStatus:  { type: Boolean, default: false },
    claimStatus:  { type: Boolean, default: false },
    purchasedOn: { type: Date }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Insurance', insuranceSchema);
