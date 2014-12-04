var express = require('express');
var register = require('./matches/register');
var all = require('./matches/all');
var invalidate = require('./matches/invalidate');

var app = express();

app.use(register);
app.use(all);
app.use(invalidate);

module.exports = app;
