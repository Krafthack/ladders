var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var api = require('./modules/api');
var Q = require('q');
var app = express();
var mongoose = require('./mongoose-wrapper');
app.use(api);

var Result = require('./model/match.js').model;

var allMatches = () => {
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

app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/../public'));

app.post('/api/register', (req, res) => {
  var result = new Result({ teams: req.body.teams, score: req.body.score })
  result.save((err) => {
      if (err) {
        res.status(500).send( {
          success: false,
          msg: 'Could register result',
          err: err,
          data: req.body
        });
      } else {
        res.send({ success: true, data: req.body });
      }
  })
})

app.get('/api/matches', (req, res) => {
  allMatches().then(
    (matches) => { res.json(matches) },
    (err) => { res.status(500).json(err) });
});

app.post('/api/matches/invalidate', (req, res) => {
  var id = url.parse(req.url, true).query.id;
  Result.find({ _id: id}, (err, results) => {
    if (results.length > 0) {
      var result = results[0];
      result.invalid = true;
      result.save((err) => {
        if (err) {
          res.status(500).send( {
            success: false,
            msg: 'Could not invalidate match. Something to do with the db',
            err: err,
            match_id: id
          })
        }
        else {
          res.send( {success: true } )
        }
      })
    } else {
      res.status(500).send( {
        success: false,
        msg: 'The Match you are looking for cannot be found',
        err: err,
        match_id: id
      })
    }
  });

})
var server = app.listen(process.env.PORT, () => {
  console.log('listening on port %d', server.address().port);
})
