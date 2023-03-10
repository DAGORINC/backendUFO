const mongoose = require('mongoose');

const ViewCounterSchema = new mongoose.Schema({
  countDate: { type: Date, default: Date.now },
});

const ViewCounter = mongoose.model('ViewCounter', ViewCounterSchema);

module.exports = ViewCounter;