export default {
  items: [
    {
      name: 'Home',
      url: '/',
      icon: 'fa fa-home',
    },
    {
      name: 'Marinas',
      url: '/marines',
      icon: 'fa fa-anchor',
      children: [
        {
          name: 'Nova marina',
          url: '/marines/new',
          icon: 'fa fa-plus',
        },
        {
          name: 'Listar Marinas',
          url: '/marines/list',
          icon: 'fa fa-list',
        },
      ]

    },
    {
      name: 'Marinheiros',
      icon: 'fa fa-male',
      url: '/sailors',
    },
    {
      name: 'Embarcações',
      url: '/boats',
      icon: 'fa fa-ship',
    },
    {
      name: 'Agenda',
      url: '/schedules',
      icon: 'fa fa-calendar',
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'fa fa-users',
    },
  ]
}