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

var match = function() {
  return {
    all: all,
    create: create
  }
}
module.exports = match();
