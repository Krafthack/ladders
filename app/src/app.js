m.route(document.getElementById('app'), '/', {
  '/': register,
  '/matches': matches,
  '/scoreboard': board
})
