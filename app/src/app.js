m.route(document.getElementById('app'), '/', {
  '/': register,
  '/matches': matches,
  '/scoreboard': board
});

m.module(document.getElementById('menu'), menu);
