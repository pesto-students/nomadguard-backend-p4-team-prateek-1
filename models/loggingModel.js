const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoggingSchema = mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    action: { type: String}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Logging', LoggingSchema);
