var _ = require('lodash');
var Match = require('../../model/match');
var express = require('express');
var app = express();

app.post('/invalidate', (req, res) => {
  var id = url.parse(req.url, true).query.id;
  Match.model.find({ _id: id}, (err, results) => {
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
});

module.exports = app;
