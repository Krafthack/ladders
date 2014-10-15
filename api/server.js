var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var app = express();

var Q = require('q');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/test');

var Result = mongoose.model('Result', { teams: [String], score: [Number], invalid: Boolean });

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

var addMatch2Scoreboard = (board, match) => {
  var scoreA = parseInt(match.score[0] || 0);
  var scoreB = parseInt(match.score[1] || 0);
  if (scoreA == scoreB) {
    addMatchForTeam(board, match.teams[0], false);
    addMatchForTeam(board, match.teams[1], false);
  } else {
    var winner = scoreA > scoreB ? 0 : 1;
    addMatchForTeam(board, match.teams[0], winner == 0);
    addMatchForTeam(board, match.teams[1], winner == 1);
  }

  return board;
}

var addMatchForTeam = (board, team, winner) => {
  var isWinner = winner;
  var points = isWinner ? 3 : 0;
  if (board[team] == null) {
    var entry = { teamName: team, games: 0, wins: 0, loss: 0, points: 0 }
    board[team] = entry;
  }
  var entry = board[team];
  entry.games = entry.games + 1;
  board[team] = entry;
  if (isWinner) entry.wins = entry.wins + 1;
  else entry.loss = entry.loss + 1;
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

app.get('/api/scoreboard', (req, res) => {
  var scoreboard = {};
  allMatches().then((matches) => {
    matches
    .filter((match) => {
      return !match.invalid;
    })
    .forEach((match) => {
      addMatch2Scoreboard(scoreboard, match);
    })
    var asArray = Object.keys(scoreboard).map((t) => {
      return scoreboard[t]
    })
    res.json(asArray);
  }, (err) => { res.json(err) })
  .catch((err) =>
  res.json(err  ))
});

var server = app.listen(process.env.PORT, () => {
  console.log('listening on port %d', server.address().port);
})
