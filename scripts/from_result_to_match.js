var mongoose = require('mongoose');
var Q = require('q');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/test');

var Result = mongoose.model('Result', { teams: [String], score: [Number], invalid: Boolean });
var Match = mongoose.model('Match', { teams: Array, score: [Number], invalid: Boolean });

var allResults = function () {
  var deferred = Q.defer();
  Result.find(function(err, res) {
    if (err) { return deferred.reject(err) }
    else { return deferred.resolve(res) }
  })
  return deferred.promise;
}

allResults().then(function(results) {
  var all = results.map(function(result) {
    var deferred = Q.defer();
    var teams = result.teams.map(function(team) {
      return team.split(',');
    })
    var match = new Match({teams: teams, score: result.score, invalid: result.invalid })
    match.save(function(err) {
      if (err) { return deferred.reject(false) }
      return deferred.resolve(true)
    })
    return deferred.promise;
  })

  Q.allSettled(all).then(function() {
    mongoose.disconnect()
  })
})
