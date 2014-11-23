var mongoose = require('mongoose');
var Model = mongoose.model('Match', {
  teams: [String],
  score: [Number],
  invalid: Boolean,
  date: { type: Date, default: Date.now }
});

module.exports = Model;
