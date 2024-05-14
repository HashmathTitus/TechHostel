// models/usageModel.js

const mongoose = require('mongoose');

const schemaData = mongoose.Schema({
  personalUsage: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  usage: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Usage = mongoose.model("Usage", schemaData);

module.exports = Usage;
