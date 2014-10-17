var mongoose = require('mongoose');
var seedrandom = require('seedrandom');
var rnd = seedrandom('notrandom');

var Result = require('../build/model/match').model;

var tastes = ['Brownie', 'Strawberry', 'Banana', 'Vanilla', 'Tomato', 'Apple'];
var postfixes = ['Milkshake', 'Cake', 'Picture', 'Cookie', 'Project'];
var maxFlavors = 3;
var numTeams = 15;
var numMatches = 100;

var selectRandom = function(arr) {
  return arr[Math.floor(rnd() * arr.length)];
}

var generateTaste = function(len) {
  var taste = selectRandom(tastes);
  if (len == 0) return taste;
  else return taste + ' ' + generateTaste(len - 1)

}

var players = [];
(function() {
  var hash = {};
  var addPlayerIfUnique = function(name) {
    if (hash[name] != null) return false;
    players.push(name)
    hash[name] = true
    return true
  };

  for (var i = 0; i < numTeams; i++) {
      var taste = generateTaste(Math.floor(rnd() * maxFlavors))
      var postfix = selectRandom(postfixes);
      var name = taste + ' ' + postfix;
      addPlayerIfUnique(name)
  }
})()

var matches = [];
(function() {
  var generateScore = function(winner) {
    var otherScore = Math.floor(rnd()*10);
    if (winner == 0) return [10, otherScore];
    else return [otherScore, 10];
  }

  for (var i = 0; i < numMatches; i++) {
      var winner = Math.floor(rnd() * 2);
      var score = generateScore(winner);
      var teamA = [
        selectRandom(players),
        selectRandom(players)
      ]

      var teamB = [
        selectRandom(players),
        selectRandom(players)
      ]

      var vs = [teamA, teamB];
      matches.push(new Result({ teams: vs, score: score }));
  }
})()

var tick = 0;

matches.forEach(function(match) {
  match.save(function(err) {
    if (err) console.log(err);
    tick = tick + 1;
    if (tick == matches.length) mongoose.disconnect();
  })
})


console.log(JSON.stringify({ players: players, matches: matches }, null,4))
