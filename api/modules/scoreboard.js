var _ = require('lodash');
var Match = require('../model/match');
var Scoreboard = require('../model/scoreboard');
var express = require('express');
var app = express();

app.get('/api/scoreboard', (req, res) => {
  Match.all().then((matches) => {
    var scoreboard = new Scoreboard(matches);
    res.json(scoreboard)
  }, (err) => { res.json(err) })
  .catch((err) =>
  res.json(err  ))
});

module.exports = app;
