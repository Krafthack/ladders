var Q = require('q');
var mongoose = require('../mongoose-wrapper');

var oldModel = mongoose.model('Result', { teams: [String], score: [Number], invalid: Boolean });
var Model = mongoose.model('Match', { teams: Array, score: [Number], invalid: Boolean });

var Match = function() {}

Match.prototype.model = Model;
Match.prototype.all = () => {
  var deferred = Q.defer();
  Model.find((err, results) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(results);
    }
  });
  return deferred.promise;
}


module.exports = new Match();
