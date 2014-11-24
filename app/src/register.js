var register = {};

register.model = {
    players: [m.prop(''), m.prop(''), m.prop(''), m.prop('')],
    teamOneScore: m.prop(''),
    teamTwoScore: m.prop('')
}

register.controller = () => {
  var mapper = (team) => {
    return team.map((player) => {
        return player();
      })
  }
  var update = (e) => {
    e.preventDefault();
    var data = {
      teams: mapper(register.model.players),
      score: [parseInt(register.model.teamOneScore()), parseInt(register.model.teamTwoScore())]
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
      m('input', {
        value: register.model.players[0](),
        onchange: m.withAttr('value', register.model.players[0]),
        class: 'inputPlayer',
        placeholder: 'Player 1'
      }),
      m('span', { class: 'playerSeperator' }, ' and '),
      m('input', {
        value: register.model.players[1](),
        onchange: m.withAttr('value', register.model.players[1]),
        class: 'inputPlayer',
        placeholder: 'Player 2'
      }),
      m('h2', { class: ['heading2__lessVSpace'] }, 'vs.'),
      m('input', {
        value: register.model.players[2](),
        onchange: m.withAttr('value', register.model.players[2]),
        class: 'inputPlayer',
        placeholder: 'Player 3'
      }),
      m('span', { class: 'playerSeperator' }, ' and '),
      m('input', {
        value: register.model.players[3](),
        onchange: m.withAttr('value', register.model.players[3]),
        class: 'inputPlayer',
        placeholder: 'Player 4'
      }),
      m('div', { class: 'teamScore-container' }, [
        m('h2', { class: 'heading2__lessVSpace' },  'Result'),
        m('input', {
          value: register.model.teamOneScore(),
          onchange: m.withAttr('value', register.model.teamOneScore),
          class: 'teamScore',
          placeholder: 'Team One'
        }),
        m('div', { class: 'teamScore-divider' }),
        m('input', {
          value: register.model.teamTwoScore(),
          onchange: m.withAttr('value', register.model.teamTwoScore),
          class: 'teamScore',
          placeholder: 'Team Two'
        }),
        m('button', { class: 'submitButton-register', onclick: ctrl.update} ,'Register')])])
  ]
};
