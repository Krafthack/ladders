var mongoose = require('mongoose');
var Q = require('q');
var _ = require('lodash');
var Match = require('../build/model/match');

Match.all().then(function(matches) {
  matches.map(function(match) {
      var teams = _.flatten(match.teams);
      match.teams = teams;
      match.save(function(err) {
        if (err) {
          console.log('Something went wrong with the migration of ' + match)
        }
      })
  })
});
