var _ = require('lodash');
var Match = require('../model/match');
var express = require('express');
var app = express();

app.get('/:name', (req, res) => {
  var lowercase = (str) => str.toLowerCase()

  var isPlayer = (player) => (match) => {
    return _(match.teams).flatten()
      .map(lowercase)
      .contains(player.toLowerCase());
   }

  var won = (match, player) => {
    var teamsIndex = _(match.teams)
      .flatten()
      .map(lowercase)
      .indexOf(player.toLowerCase())

    var playerTeam = teamsIndex <= 1 ? 0 : 1;

    var otherTeam = playerTeam == 0? 1 : 0 ;
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

module.exports = app;
