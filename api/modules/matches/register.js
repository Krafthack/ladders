var _ = require('lodash');
var Match = require('../../model/matchModel');
var express = require('express');
var app = express();

app.post('/register', (req, res) => {
  var teams = req.body.teams;
  if (typeof req.body.teams[0] == 'object') {
    teams = _.flatten(req.body.teams);
  }
  var result = new Match({ teams: teams, score: req.body.score })
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
