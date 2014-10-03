var register = {};

register.model = {
    teamOne: m.prop(''),
    teamTwo: m.prop(''),
    teamOneScore: m.prop(''),
    teamTwoScore: m.prop('')
}

register.controller = () => {
  var update = (e) => {
    e.preventDefault();
    var data = {
      teams: [register.model.teamOne(), register.model.teamTwo()],
      score: [register.model.teamOneScore(), register.model.teamTwoScore()]
    }
    m.request({ method: 'POST', url: 'http://localhost:8001/api/register', data: data})
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
        value: register.model.teamOne(),
        onchange: m.withAttr('value', register.model.teamOne),
        class: 'inputTeamName',
        placeholder: 'Team One'
      }),
      m('h2', { class: ['heading2__lessVSpace'] }, 'vs.'),
      m('input', {
        value: register.model.teamTwo(),
        onchange: m.withAttr('value', register.model.teamTwo),
        class: 'inputTeamName',
        placeholder: 'Team Two'
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
