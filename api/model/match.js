var Q = require('q');
var mongoose = require('../mongoose-wrapper');

var Model = mongoose.model('Match', {
  teams: [String],
  score: [Number],
  invalid: Boolean,
  date: { type: Date, default: Date.now }
});

var Match = function() {}

Match.prototype.model = Model;
Match.prototype.all = () => {
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
}


module.exports = new Match();
