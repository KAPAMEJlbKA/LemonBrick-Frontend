
const routes = [
  {
    path: '/',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/main.vue') }
    ]
  },
  {
    path: '/cabinet',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Cabinet.vue') }
    ]
  },
  {
    path: '/users',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Users.vue') }
    ]
  },
  {
    path: '/user/name/:username',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/UserByUsername.vue') }
    ],
    props: true
  },
  {
    path: '/user/uuid/:uuid',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/UserByUUID.vue') }
    ],
    props: true
  },
  {
    path: '/register',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Register.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Auth.vue') }
    ]
  },
  {
    path: '/shop/items',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Shop.vue') }
    ]
  },
  {
    path: '/shop/groups',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ShopGroup.vue') }
    ]
  },
  {
    path: '/banlist',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Banlist.vue') }
    ]
  },
  {
    path: '/news',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/News.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
