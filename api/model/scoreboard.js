var _ = require('lodash');
var elo = require('elo-rank')(100);

var addMatch2Scoreboard = (board, match) => {

  var winners = match.winner.players;
  var losers = match.loser.players;
  var calcPreRating = (sum, ply) => {
    var player = board[ply.name] = board[ply.name] || playerModel(ply.name);
    return player.rating + sum;
  };
  var preRatingWinner = _.reduce(winners, calcPreRating, 0);
  var preRatingLoser = _.reduce(losers, calcPreRating, 0);
  var expectedWinner = elo.getExpected(preRatingWinner, preRatingLoser);
  var expectedLoser = elo.getExpected(preRatingLoser, preRatingWinner);

  _.each(match.winner.players, (player) => {
    var score = board[player.name];
    score.rating = elo.updateRating(expectedWinner, 1, score.rating);
    score.points += 3;
    score.games += 1;
    score.wins += 1;
  });

  _.each(match.loser.players, (player) => {
    var score = board[player.name];
    score.rating = elo.updateRating(expectedLoser, 0, score.rating);
    score.games += 1;
    score.loss += 1;
  });
}

function playerModel(name) {
  return {playername: name, games: 0, wins: 0, loss: 0, points: 0, rating: 800};
}

function Scoreboard(matches) {
  return _(matches).chain()
  .filter((match) => {
    return !match.invalid;
  })
  .reduce((scores, match) => {
    addMatch2Scoreboard(scores, match);
    return scores;
  }, {})
  .toArray()
  .sortBy('rating')
  .reverse()
  .value();
}

module.exports = Scoreboard;
