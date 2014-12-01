var _ = require('lodash');
var Match = require('../model/match-model');
var express = require('express');
var app = express();

app.get('/:name', (req, res) => {
  var player = req.param('name');

  Match
  .where({$or: [{'winner.players': { $in: [{name: player}]}}, {'loser.players': { $in: [{name: player}]}}], invalid: {$ne: true}})
  .exec((err, result) => {
    if (err) throw new Error(err);

    var obj = _.reduce(result, (p, match) => {
      if (_.some(match.winner.players, {name: player})) p.wins += 1;
      else p.loss += 1;
      p.matches.push(match);
      return p;
    }, {wins: 0, loss: 0, matches: []});
    res.send(obj);
  });
})

module.exports = app;
