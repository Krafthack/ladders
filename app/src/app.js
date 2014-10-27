m.route(document.getElementById('app'), '/', {
  '/': register,
  '/matches': matches,
  '/scoreboard': board,
  '/player/:player': player
});

m.module(document.getElementById('menu'), menu);
