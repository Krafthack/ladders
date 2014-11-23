var Match = require('../../model/match');
var express = require('express');
var app = express();

app.get('/', (req, res) => {
  Match.all().then(
    (matches) => res.json(matches),
    (err) => { res.status(500).json(err) });
});

module.exports = app;
