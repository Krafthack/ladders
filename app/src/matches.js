var matches = {};

matches.model = m.request({ method: 'GET', url: '/api/matches'});

matches.controller = () => {
  return {
    matches: () => matches.model(),
    fade: () => false
  }
};

var MatchPlayerView = (player, i) => {
  return m('a.matches-playerName', {
      config: m.route,
      href: '/player/' + player.name
    }, (i > 0 ? ',' : '') + player.name)
}


var MatchView = (match) =>
  m('div.match', [
    m('div', { class: 'teamName' }, match.winner.players.map(MatchPlayerView)),
    m('div', { class: 'scoreWrapper'}, [
      m('div', { class: 'score' }, match.winner.for),
      m('div', { class: 'vs' } ,' vs '),
      m('div', { class: 'score' }, match.loser.for)
    ]),
    m('div', { class: 'teamName' }, match.loser.players.map(MatchPlayerView)),
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
