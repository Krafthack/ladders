var register = {};

register.model = {
    teamOne: {
      player: [m.prop(''), m.prop('')]
    },
    teamTwo: {
      player: [m.prop(''), m.prop('')]
    },
    teamOneScore: m.prop(''),
    teamTwoScore: m.prop('')
}

register.controller = () => {
  var mapper = (team) => {
    return team.player.map((player) => {
        return player();
      })
  }
  var update = (e) => {
    e.preventDefault();
    var data = {
      teams: [mapper(register.model.teamOne), mapper(register.model.teamTwo)],
      score: [register.model.teamOneScore(), register.model.teamTwoScore()]
    }
    console.log(data)
    m.request({ method: 'POST', url: '/api/register', data: data})
      .then(() =>{
        console.log('got a response')
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
        value: register.model.teamOne.player[0](),
        onchange: m.withAttr('value', register.model.teamOne.player[0]),
        class: 'inputPlayer',
        placeholder: 'Player 1'
      }),
      m('span', { class: 'playerSeperator' }, ' and '),
      m('input', {
        value: register.model.teamOne.player[1](),
        onchange: m.withAttr('value', register.model.teamOne.player[1]),
        class: 'inputPlayer',
        placeholder: 'Player 2'
      }),
      m('h2', { class: ['heading2__lessVSpace'] }, 'vs.'),
      m('input', {
        value: register.model.teamTwo.player[0](),
        onchange: m.withAttr('value', register.model.teamTwo.player[0]),
        class: 'inputPlayer',
        placeholder: 'Player 3'
      }),
      m('span', { class: 'playerSeperator' }, ' and '),
      m('input', {
        value: register.model.teamTwo.player[1](),
        onchange: m.withAttr('value', register.model.teamTwo.player[1]),
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

m.module(document.getElementById('app'), register);
