var mongoose = require('../api/mongoose-wrapper');
var Q = require('q');
var _ = require('lodash');

var Model = mongoose.model('Match', {
  teams: Array,
  score: [Number],
  invalid: Boolean,
  date: { type: Date, default: Date.now }
});

var all = function() {
  var deferred = Q.defer();
  Model.find({})
    .sort({date: 'desc'})
    .exec(function(err, results) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(results);
      }
    });
  return deferred.promise;
}

all().then(function(matches) {
  console.log(matches.length)
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
