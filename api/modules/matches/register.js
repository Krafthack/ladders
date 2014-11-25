var _ = require('lodash');
var Match = require('../../model/matchModel');
var express = require('express');
var app = express();

app.post('/register', (req, res) => {
  var winner = req.body.winner;
  var loser = req.body.loser;
  var result = new Match({winner: winner, loser: loser});
  result.save((err) => {
      if (err) {
        res.status(500).send( {
          success: false,
          msg: 'Could register result',
          err: err,
          data: req.body
        });
      } else {
        res.send({ success: true, data: req.body });
      }
  });
});

module.exports = app;
