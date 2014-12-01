var _ = require('lodash');
var matchService = require('../services/match');
var Scoreboard = require('../model/scoreboard');
var express = require('express');
var app = express();

app.get('/api/scoreboard', (req, res) => {
  matchService.all().then((matches) => {
    var scoreboard = new Scoreboard(matches);
    res.json(scoreboard)
  }, (err) => { res.json(err) })
  .catch((err) =>
  res.json(err  ))
});

module.exports = app;
