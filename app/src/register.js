var register = {};

register.model = [{
    players: [m.prop(''), m.prop('')],
    score: m.prop('')
  }, {
    players: [m.prop(''), m.prop('')],
    score: m.prop('')
}]

register.controller = () => {
  var update = (e) => {
    e.preventDefault();
    var model = register.model;
    var winner = parseInt(model[0].score()) > parseInt(model[1].score()) ? 0 : 1;
    var loser = winner === 0 ? 1 : 0;

    var setTeam = function (i) {
      var team = model[i];
      return {
        players: team.players.map(player => { return {name: player()}}),
        for: parseInt(team.score()),
        against: parseInt(model[i === 0 ? 1 : 0].score())
      }
    }
    var data = {
      winner: setTeam(winner),
      loser: setTeam(loser)
    }
    m.request({ method: 'POST', url: '/api/matches/register', data: data})
      .then(() =>{
        m.route('/scoreboard');
      });
  };

  return {
    update: update
  }
};

register.view = (ctrl) => {
  return [
    m('h1', { class: 'heading1' }, 'Register result'),
    m('form', [
      team(register.model[0].players),
      m('h2', { class: ['heading2__lessVSpace'] }, 'vs.'),
      team(register.model[1].players),
      setResult(register.model),
      m('button', { class: 'submitButton-register', onclick: ctrl.update} ,'Register')
    ])
  ];
};

function score(team, placeholder) {
  return m('input', {
    value: team(),
    onchange: m.withAttr('value', team),
    class: 'teamScore',
    placeholder: placeholder
  })
}

function setResult(teams) {
  return m('div', { class: 'teamScore-container' }, [
  m('h2', { class: 'heading2__lessVSpace' },  'Result'),
  score(teams[0].score, 'Team A'),
  m('div', { class: 'teamScore-divider' }),
  score(teams[1].score, 'Team B')
  ]);
}

function team(players) {
  console.log(players);
  return [
    addPlayer(players[0], 'Player 1'),
    m('span', { class: 'playerSeperator' }, ' and '),
    addPlayer(players[1], 'Player 2')
  ];
}

function addPlayer(prop, placeholder) {
  return m('input', {
    value: prop(),
    onchange: m.withAttr('value', prop),
    class: 'inputPlayer',
    placeholder: placeholder
  });
}
