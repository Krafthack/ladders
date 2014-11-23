var express = require('express');
var app = express();
var register = require('./register');
var matches = require('./matches');
var scoreboard = require('./scoreboard');
var player = require('./player');

app.use(register);
app.use('/api/matches', matches);
app.use('/api/player', player);
app.use(scoreboard);

module.exports = app
