var mongoose = require('mongoose');
var Q = require('q');

var Match = require('../build/model/match').model;

var all = function () {
  var deferred = Q.defer();
  Match.find(function(err, res) {
    if (err) { return deferred.reject(err) }
    else { return deferred.resolve(res) }
  })
  return deferred.promise;
}

all().then(function(results) {
  var all = results.map(function(match) {
    var deferred = Q.defer();
    match.date = Date.now();
    match.save(function(err) {
      if (err) { return deferred.reject(false) }
      return deferred.resolve(true)
    })
    return deferred.promise;
  })
  console.log('hmm')
  Q.allSettled(all).then(function() {
    mongoose.disconnect()
  })
}).catch(function(err) {
  console.log(err)
  mongoose.disconnect();
})
