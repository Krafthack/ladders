var matches = {};

matches.model = m.request({ method: 'GET', url: '/api/matches'});

matches.controller = () => {
  return {
    matches: () => matches.model()
  }
};

matches.view = (ctrl) => {
  return [
    m('h1', {class: 'heading1'} ,'Matches'),
    ctrl.matches().map((match) =>
      m('div', { class: 'match' }, [
        m('div', { class: 'teamName' }, match.teams[0]),
        m('div', { class: 'scoreWrapper'}, [
          m('div', { class: 'score' }, match.score[0]),
          m('div', { class: 'vs' } ,' vs '),
          m('div', { class: 'score' }, match.score[1])
        ]),
        m('div', { class: 'teamName' }, match.teams[1])
      ]))
  ]
};

m.module(document.getElementById('matches'), matches);
