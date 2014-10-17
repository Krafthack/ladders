var express = require('express');
var Scoreboard = require('../model/scoreboard');
var Q = require('q');
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
  Match.all().then((matches) => {
    return res.json(matches);
  }, (err) => res.json(err));

})

module.exports = app
