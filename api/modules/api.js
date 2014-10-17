var express = require('express');
var Q = require('q');
var app = express();
var Match = require('../model/match');
var Result = Match.model;

var addMatch2Scoreboard = (board, match) => {
  var scoreA = parseInt(match.score[0] || 0);
  var scoreB = parseInt(match.score[1] || 0);
  if (scoreA == scoreB) {
    addMatchForTeam(board, match.teams[0], false);
    addMatchForTeam(board, match.teams[1], false);
  } else {
    var winner = scoreA > scoreB ? 0 : 1;
    addMatchForTeam(board, match.teams[0], winner == 0);
    addMatchForTeam(board, match.teams[1], winner == 1);
  }

  return board;
}

var addMatchForTeam = (board, team, winner) => {
  var isWinner = winner;
  var points = isWinner ? 3 : 0;
  if (board[team] == null) {
    var entry = { teamName: team, games: 0, wins: 0, loss: 0, points: 0 }
    board[team] = entry;
  }
  var entry = board[team];
  entry.games = entry.games + 1;
  board[team] = entry;
  if (isWinner) entry.wins = entry.wins + 1;
  else entry.loss = entry.loss + 1;
}

app.get('/api/scoreboard', (req, res) => {
  var scoreboard = {};
  Match.all().then((matches) => {
    matches
    .filter((match) => {
      return !match.invalid;
    })
    .forEach((match) => {
      addMatch2Scoreboard(scoreboard, match);
    })
    var asArray = Object.keys(scoreboard).map((t) => {
      return scoreboard[t]
    })
    res.json(asArray);
  }, (err) => { res.json(err) })
  .catch((err) =>
  res.json(err  ))
});

module.exports = app
