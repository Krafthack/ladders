var matches = {};

matches.model = m.request({ method: 'GET', url: '/api/matches'});

matches.controller = () => {
  return {
    matches: () => matches.model(),
    fade: () => false
  }
};

var MatchPlayerView = (player, i) =>
  m('a.matches-playerName', { config: m.route, href: '/player/' + player } ,(i > 0 ? ',' : '') + player)

var MatchView = (match) =>
  m('div.match', [
    m('div', { class: 'teamName' }, match.teams.slice(0,2).map(MatchPlayerView)),
    m('div', { class: 'scoreWrapper'}, [
      m('div', { class: 'score' }, match.score[0]),
      m('div', { class: 'vs' } ,' vs '),
      m('div', { class: 'score' }, match.score[1])
    ]),
    m('div', { class: 'teamName' }, match.teams.slice(2,4).map(MatchPlayerView)),
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
  ])

matches.view = (ctrl) => {
  return [
    m('h1', {class: 'heading1'} ,'Matches'),
    ctrl.matches().map(MatchView)
  ]
};
