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
      m('div.entryCol.entryHeader', { class: 'teamName_entry'}, 'Team'),
      m('div.entryCol.entryHeader.games', ''),
      m('div.entryCol.entryHeader.wins', ''),
      m('div.entryCol.entryHeader.losses', ''),
      m('div.entryCol.entryHeader.draws', ''),
      m('div.entryCol.entryHeader.points', '')
    ]),
    ctrl.scoreboard().map((entry) => {
      return m('div', { class: 'scoreboardEntry' }, [
        m('div.entryCol', { class: 'teamName_entry'}, entry.teamName),
        m('div.entryCol', { class: 'games'}, entry.games),
        m('div.entryCol', { class: 'wins'}, entry.wins),
        m('div.entryCol', { class: 'losses'}, entry.loss),
        m('div.entryCol', { class: 'draws'}, entry.draws),
        m('div.entryCol', { class: 'points'}, entry.points)
      ])
    })
  ]
};
