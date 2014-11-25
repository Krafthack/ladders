var register = {};

register.model = {
  teamA: [m.prop(''), m.prop('')],
  teamAScore: m.prop(''),
  teamB: [m.prop(''), m.prop('')],
  teamBScore: m.prop('')
}

register.controller = () => {
  var update = (e) => {
    e.preventDefault();
    var model = register.model;
    var scoreA = parseInt(model.teamAScore());
    var scoreB = parseInt(model.teamBScore());
    var data = {
      score: [{
        players: model.teamA.map(player => { return {name: player()}}),
        for: scoreA,
        against: scoreB,
        isWinner: scoreA > scoreB
      }, {
        players: model.teamB.map(player => {return {name: player()}}),
        for: scoreB,
        against: scoreA,
        isWinner: scoreB > scoreA
      }]
    }
    console.log(data)
    m.request({ method: 'POST', url: '/api/matches/register', data: data})
      .then(() =>{
        window.location.replace(window.location.origin + '/?/scoreboard')
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
      team(register.model.teamA),
      m('h2', { class: ['heading2__lessVSpace'] }, 'vs.'),
      team(register.model.teamB),
      setResult(),
      m('button', { class: 'submitButton-register', onclick: ctrl.update} ,'Register')
    ])
  ];
};

function setResult() {
  return m('div', { class: 'teamScore-container' }, [
    m('h2', { class: 'heading2__lessVSpace' },  'Result'),
    score(register.model.teamAScore, 'Team A'),
    m('div', { class: 'teamScore-divider' }),
    score(register.model.teamBScore, 'Team B')
  ]);
}

function score(team, placeholder) {
  return m('input', {
    value: team(),
    onchange: m.withAttr('value', team),
    class: 'teamScore',
    placeholder: placeholder
  })
}

function team(players) {
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
