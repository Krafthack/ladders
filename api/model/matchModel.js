var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Player = new Schema({
  name: {type: String, lowercase: true, trim: true, required: true}
}, {
  _id: false
});

var Team = {
  players: [Player],
  for: Number,
  against: Number,
  isWinner: Boolean
};

var Model = mongoose.model('Match', new Schema({
  winner: Team,
  loser: Team,
  date: { type: Date, default: Date.now },
  invalid: Boolean
}, {
  collection: 'matches'
}));

module.exports = Model;
