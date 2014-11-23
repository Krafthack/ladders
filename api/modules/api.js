var express = require('express');
var app = express();
var matches = require('./matches');
var scoreboard = require('./scoreboard');
var player = require('./player');

app.use('/api/matches', matches);
app.use('/api/player', player);
app.use(scoreboard);

module.exports = app
