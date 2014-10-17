var Q = require('q');
var mongoose = require('../mongoose-wrapper');

var Result = mongoose.model('Result', { teams: [String], score: [Number], invalid: Boolean });

var Match = function() {}

Match.prototype.model = Result;
Match.prototype.all = () => {
  var deferred = Q.defer();
  Result.find((err, results) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(results);
    }
  });
  return deferred.promise;
}


module.exports = new Match();
