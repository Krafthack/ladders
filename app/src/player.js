var player = {
  model: (player) => m.request({ method: 'GET', url: '/api/player/' + player }),
  controller: () => {
    var model;
    return {
      model: () => {
        if (model != null) return model;
        var current = m.route.param('player');
        player.model(current).then((p) => model = p);
        return false;
      },
      player: () => {
        return m.route.param('player')
      }
    }
  },
  view: (ctrl) => {
    var model = ctrl.model()
    var matches = () => ctrl.model().matches == null ?
      [] : ctrl.model().matches.map(MatchView)



    return [
      m('h1.heading1', 'Player statistics'),
      m('h2.heading2', 'Summary'),
      m('div', 'Player: ' + ctrl.player()),
      m('div', 'Wins: ' + (model ? model.wins : null)),
      m('div', 'Loss: ' + (model ? model.loss : null)),
      m('h2.heading2', 'Matches'),
      matches()
    ]
  }
}
