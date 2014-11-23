var Match = require('../model/match');
var url = require('url');
var express = require('express');
var app = express();
var register = require('./matches/register');
var all = require('./matches/all');
var invalidate = require('./matches/invalidate');

app.use(register);
app.use(all);
app.use(invalidate);

module.exports = app;
