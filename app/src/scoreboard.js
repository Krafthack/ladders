var board = {};

board.model = m.request({ method: 'GET', url: '/api/scoreboard'});

board.controller = () => {
  return {
    scoreboard: () => { return board.model()  }
  }
};

board.view = (ctrl) => {
  return [
    m('h1', { class: 'heading1' }, 'Scoreboard'),
    m('div', { class: 'scoreboardHeading'}, [
      m('div', { class: 'teamName_entry'}, 'Team'),
      m('div', { class: 'games'}, 'Games'),
      m('div', { class: 'wins'}, 'W'),
      m('div', { class: 'losses'}, 'L'),
      m('div', { class: 'draws'}, 'D'),
      m('div', { class: 'points'}, 'Points')
    ]),
    ctrl.scoreboard().map((entry) => {
      return m('div', { class: 'scoreboardEntry' }, [
        m('div', { class: 'teamName_entry'}, entry.teamName),
        m('div', { class: 'games'}, entry.games),
        m('div', { class: 'wins'}, entry.wins),
        m('div', { class: 'losses'}, entry.loss),
        m('div', { class: 'draws'}, entry.draws),
        m('div', { class: 'points'}, entry.points)
      ])
    })
  ]
};
