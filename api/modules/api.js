var express = require('express');
var Scoreboard = require('../model/scoreboard');
var Q = require('q');
var _ = require('lodash');
var app = express();
var Match = require('../model/match');


app.get('/api/scoreboard', (req, res) => {
  Match.all().then((matches) => {
    var scoreboard = new Scoreboard(matches);
    res.json(scoreboard)
  }, (err) => { res.json(err) })
  .catch((err) =>
  res.json(err  ))
});

app.get('/api/player/:name', (req, res) => {
  var lowercase = (str) => str.toLowerCase()

  var isPlayer = (player) => (match) => {
    return _(match.teams).flatten()
      .map(lowercase)
      .contains(player.toLowerCase());
   }

  var won = (match, player) => {
    var playerTeam = _(match.teams)
      .flatten()
      .map(lowercase)
      .indexOf(player.toLowerCase())

    var otherTeam = playerTeam == 0 ? 1 : 0;
    return match.score[playerTeam] > match.score[otherTeam]
  }

  var player = req.param('name');

  Match.all().then((matches) => {
    return matches.filter(isPlayer(player))
  }, (err) => res.json(err))
  .then((matches) => {
    var wins = _(matches).map((match) => won(match, player))
      .filter((isTrue) => isTrue)
      .value()
      .length;
    return {
      matches: matches,
      wins: wins,
      loss: matches.length - wins
    }
  }).then((data) => {
    return res.json(data)
  })
  .catch((err) => { throw new Error(err) });

})

module.exports = app
