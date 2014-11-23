var Q = require('q');
var mongoose = require('../mongoose-wrapper');
var Model = require('./matchModel');

var all = () => {
  var deferred = Q.defer();
  Model.find({})
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

var player = (player) => {
  var deferred = Q.defer();
  Model.find(
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

var Match = function() {
  return {
    all: all,
    player: player
  }
}

Match.prototype.model = Model;

module.exports = new Match();
