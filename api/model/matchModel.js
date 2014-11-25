var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Player = new Schema({
  name: {type: String, lowercase: true, trim: true}
}, {
  _id: false
});

var Team = new Schema({
  players: [Player],
  for: Number,
  against: Number,
  isWinner: Boolean
}, {
  _id: false
});

var Model = mongoose.model('Match', {
  score: [Team],
  date: { type: Date, default: Date.now },
  invalid: Boolean
});

module.exports = Model;
