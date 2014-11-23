var _ = require('lodash');
var Match = require('../model/match');
var Scoreboard = require('../model/scoreboard');
var express = require('express');
var app = express();

app.get('/api/scoreboard', (req, res) => {
  Match.all().then((matches) => {
    var scoreboard = new Scoreboard(matches);
    var sorted = _(scoreboard).sortBy('points', 'wins').value().reverse();
    res.json(sorted)
  }, (err) => { res.json(err) })
  .catch((err) =>
  res.json(err  ))
});

module.exports = app;
