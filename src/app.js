var app = {};

app.controller = () => {
  this.update = () => {
    console.log('clicked')
  }
};

app.view = (ctrl) => {
  return [
    m('h1', { class: 'heading1' }, 'Register result'),
    m('form', [
      m('input', { class: 'inputTeamName', placeholder: 'Team One' }),
      m('h2', { class: ['heading2__lessVSpace'] }, 'vs.'),
      m('input', { class: 'inputTeamName', placeholder: 'Team Two' }),
      m('div', { class: 'teamScore-container' }, [
        m('h2', { class: 'heading2__lessVSpace' },  'Result'),
        m('input', { class: 'teamScore', placeholder: 'Team One' }),
        m('div', { class: 'teamScore-divider' }),
        m('input', { class: 'teamScore', placeholder: 'Team Two' }),
        m('button', {
          class: 'submitButton-register22',
          onclick: ctrl.update
        } ,'Register')])])
  ]
};

m.module(document.getElementById('app'), app);
