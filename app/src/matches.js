var matches = {};

matches.model = m.request({ method: 'GET', url: '/api/matches'});

matches.controller = () => {
  return {
    matches: () => matches.model(),
    fade: () => false
  }
};

matches.view = (ctrl) => {
  console.log(ctrl.matches()[0])
  return [
    m('h1', {class: 'heading1'} ,'Matches'),
    ctrl.matches().map((match) =>
      m('div.match', [
        m('div', { class: 'teamName' }, match.teams[0]),
        m('div', { class: 'scoreWrapper'}, [
          m('div', { class: 'score' }, match.score[0]),
          m('div', { class: 'vs' } ,' vs '),
          m('div', { class: 'score' }, match.score[1])
        ]),
        m('div', { class: 'teamName' }, match.teams[1]),
        m('a.delete', {

          href: '/api/matches/invalidate?id=' + match._id,
          onclick: function(e) {
            e.preventDefault();
            m.request({
              method: 'POST',
              url: this.href
            }).then((data) => {
              match.invalid = true;
            })()
          },
        }, match.invalid ? 'Revalidate' : 'Invalidate')
      ]))
  ]
};
