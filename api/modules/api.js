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
  var isPlayer = (player) => (match) =>
     _(match.teams).flatten().contains(player);
  var player = req.param('name');

  Match.all().then((matches) => {
    var data = matches.filter(isPlayer(player))
    return res.json(data);
  }, (err) => res.json(err))
  .catch((err) => { throw new Error(err) });

})

module.exports = app
