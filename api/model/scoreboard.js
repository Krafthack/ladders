var _ = require('lodash');

var addMatch2Scoreboard = (board, match) => {
  _.each(match.winner.players, (player) => {
    var score = board[player.name] = board[player.name] || playerModel(player.name);
    score.points += 3;
    score.games += 1;
    score.wins += 1;
  });

  _.each(match.loser.players, (player) => {
    var score = board[player.name] = board[player.name] || playerModel(player.name);
    score.games += 1;
    score.loss += 1;
  });
}

function playerModel(name) {
  return {playername: name, games: 0, wins: 0, loss: 0, points: 0};
}

function Scoreboard(matches) {
  var scoreboard = {};

  matches
  .filter((match) => {
    return !match.invalid;
  })
  .forEach((match) => {
    addMatch2Scoreboard(scoreboard, match);
  })

  return Object.keys(scoreboard).map((t) => {
    return scoreboard[t]
  })

}

module.exports = Scoreboard;
