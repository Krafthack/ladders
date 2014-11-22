var _ = require('lodash');

var addMatch2Scoreboard = (board, match) => {
  var scoreA = parseInt(match.score[0] || 0);
  var scoreB = parseInt(match.score[1] || 0);
  if (scoreA == scoreB) {
    addMatchForTeamMembers(board, [match.teams[0], match.teams[1]], false);
    addMatchForTeamMembers(board, [match.teams[2], match.teams[3]], false);
  } else {
    var winner = scoreA > scoreB ? 0 : 1;
    addMatchForTeamMembers(board, [match.teams[0], match.teams[1]], winner == 0);
    addMatchForTeamMembers(board, [match.teams[2], match.teams[3]], winner == 1);
  }
  return board;
}

var addMatchForTeamMembers = (board, teamArray, winner) => {
  _(teamArray).each((playerCaseSens) => {
    var player = playerCaseSens.toLowerCase();
    var isWinner = winner;
    var points = isWinner ? 3 : 0;
    if (board[player] == null) {
      var entry = { playername: player, games: 0, wins: 0, loss: 0, points: 0 }
      board[player] = entry;
    }
    var entry = board[player];
    entry.points = entry.points + points;
    entry.games = entry.games + 1;
    if (isWinner) entry.wins = entry.wins + 1;
    else entry.loss = entry.loss + 1;
  })
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
