var mongoose = require('../api/mongoose-wrapper');
var Q = require('q');
var _ = require('lodash');
var Schema = mongoose.Schema;

var OldModel = mongoose.model('OldMatch', new Schema({
  teams: Array,
  score: [Number],
  invalid: Boolean,
  date: { type: Date, default: Date.now }
}, {collection: 'matches'}));

var Player = new Schema({
  name: {type: String, lowercase: true, trim: true}
}, {
  _id: false
});

var Team = {
  players: [Player],
  for: Number,
  against: Number,
  isWinner: Boolean
};

var NewModel = mongoose.model('NewModel', new Schema({
  winner: Team,
  loser: Team,
  date: { type: Date, default: Date.now },
  invalid: Boolean
}, {collection: "matches"}));


var all = function () {
  var deferred = Q.defer();
  OldModel.find({})
    .exec(function (err, results) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(results);
      }
    });
  return deferred.promise;
};

all().then(function (matches) {
  _.filter(matches, function (m) { return m.__v < 2;}).map(function (old) {
    if (old.score[0] === old.score[1]) console.error("same score");
    var one = _.first(old.teams, 2).map(function (person) { return {name: person }});
    var two = _.last(old.teams, 2).map(function (person) { return {name: person }});
    var oneIsWinner = old.score[0] > old.score[1];
    var m = {
      winner: {
        players: oneIsWinner ? one : two,
        for: oneIsWinner ? old.score[0] : old.score[1],
        against: oneIsWinner ? old.score[1] : old.score[0]
      },
      loser: {
        players: oneIsWinner ? two : one,
        for: oneIsWinner ? old.score[1] : old.score[0],
        against: oneIsWinner ? old.score[0] : old.score[1]
      },
      date: old.date
    }
    var nm = new NewModel(m);
    if (old.invalid) {
      old.remove(function (err) {
        if (err) console.error(err);
      });
    } else {
      nm.save(function (err) {
        if (err) {
          console.error(err);
          return;
        }
        old.remove(function (err) {
          if (err) console.log(err);
        });
      });
    }
  });
});
