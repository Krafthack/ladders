var Q = require('q');
var mongoose = require('../mongoose-wrapper');
var Match = require('../model/match-model');

var all = () => {
  var deferred = Q.defer();
  Match.find({})
  .sort({date: 'desc'})
  .exec((err, results) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(results);
    }
  });
  return deferred.promise;
};

var create = (match) => {
  var deferred = Q.defer();
  var result = new Match(match);
  result.save((err) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve();
    }
  });
  return deferred.promise;
};

var player = (player) => {
  var deferred = Q.defer();
  Match
  .find(
  // regexp case insenstive query is probably inefficient
  // should rather save the names as lowercase (also)
  { 'teams': { $regex : new RegExp(player, "i") } })
  .sort({date: 'desc'})
  .exec((err, results) => {

    if (err) {
      return deferred.reject(err);
    }
    else {
      return deferred.resolve(results);
    }
  });
  return deferred.promise;
}

var match = function() {
  return {
    all: all,
    create: create,
    player: player
  }
}
module.exports = match();
