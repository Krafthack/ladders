var menu = {
  model: {
    isOpen: false
  },
  controller: () => {
    return {
      open: (e) => {
        e.preventDefault();
        e.stopPropagation();
        menu.model.isOpen = !menu.model.isOpen;
      }
    };
  },
  view: (ctrl) => {
    return [m('div.u-clearfix', [
      m('a.menuToggle', {
        href: '#',
        class: menu.model.isOpen ? 'menuToggle-open' : 'menuToggle-closed',
        onclick: ctrl.open
      } ,[m('i.fa.fa-bars')]),
      m('div.menu', { class: menu.model.isOpen ? 'menu-open' : 'menu-closed '}, [
        m('a.menuItem[href=/register]', { config: m.route, onclick: ctrl.open }, 'Register'),
        m('a.menuItem[href=/scoreboard]', { config: m.route, onclick: ctrl.open }, 'Scoreboard'),
        m('a.menuItem[href=/matches]', { config: m.route, onclick: ctrl.open }, 'Matches')
      ])
    ])];
  }
}
