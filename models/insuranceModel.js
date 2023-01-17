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

    cardMonth: {
      type: Number,
    },

    cardCvv: {
      type: Number,
    },
    cardYear: {
      type: Number,
    },
    cardNumber: {
      type: Number,
    },
    cardHolderName: {
      type: String,
    },
    beneficiary: { type: String },
    countries: [{ type: String }],
    approvedStatus: { type: Boolean, default: false },
    claimStatus: { type: Boolean, default: false },
    purchasedOn: { type: Date },
    approvedOn: { type: Date }


  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Insurance', insuranceSchema);
