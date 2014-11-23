var Match = require('../build/model/match');
var _ = require('lodash');
var players = {};

var currentElo = function(player) {
  var current = players[player];
  if (current == null) {
    return 800;
  }
  else {
    return current;
  }
}

var updateElo = function(player, elo) {
  players[player] = currentElo(player) + elo;
}

var collectiveElo = function(team) {
  var sum = team.
    map(function(player) {
      return currentElo(player)
    }).
    reduce(function(mem, current) { return mem + current }, 0);

  return sum / team.length;
}

// did steal this from player. Should be moved somewhere it can be reused
var lowercase = function(str) { return str.toLowerCase() };
var won = function(match, player) {
  var teamsIndex = _(match.teams)
    .flatten()
    .map(lowercase)
    .indexOf(player.toLowerCase())

  var playerTeam = teamsIndex <= 1 ? 0 : 1;

  var otherTeam = playerTeam == 0? 1 : 0 ;
  return match.score[playerTeam] > match.score[otherTeam]
}


Match.all().then(function(matches) {
  matches.map(function(match) {

    // This is not the classical ELO rating system.
    // But simply inspired by it. This system probably
    // has some weaknesses.
    //
    // team elo = avg (player elo)
    //
    //          loser team elo
    // elo_r = ---------------
    //          winner team elo
    //
    // elo_diff = min(elo_r * k, i)
    //
    // In this example I use k = 100, i=200



    var team1Elo = collectiveElo(match.teams.slice(0,2));
    var team2Elo = collectiveElo(match.teams.slice(2,4));
    // should be refactored into match-model
    var winner = match.score[0] > match.score[1] ? 0 : 1;

    var score;
    if (winner == 0) {
      score = team2Elo/team1Elo;
    } else {
      score = team1Elo/team2Elo;
    }

    score = Math.min(
      Math.max(
        parseInt(score * 100),
        10),
      200);

    match.teams.map(function(player) {
      var didWin = won(match, player);
      if (didWin) {
        updateElo(player, score);
      } else {
        updateElo(player, -1 * score);
      }
    })
    console.log(players);
  }).catch(function(err) {
    console.log(err)
  })


})
