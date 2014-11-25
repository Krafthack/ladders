var _ = require('lodash');
var Match = require('../../model/matchModel');
var express = require('express');
var app = express();

app.post('/register', (req, res) => {
  var score = req.body.score;
  var result = new Match({score: score});
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
