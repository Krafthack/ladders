var _ = require('lodash');
var matchService = require('../../services/match');
var express = require('express');
var app = express();

app.post('/register', (req, res) => {
  var winner = req.body.winner;
  var loser = req.body.loser;

  matchService
  .create({winner: winner, loser: loser})
  .then(() => res.status(201).send({ success: true }))
  .catch((err) => {
    res.status(500).send( {
      success: false,
      msg: 'Could register result',
      err: err,
      data: req.body
    });
  });
});

module.exports = app;
