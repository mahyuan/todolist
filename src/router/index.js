import Vue from 'vue'
import Router from 'vue-router'
import list from '@/views/list'
// import insert from '@/views/insert'
import layout from '@/layout/index'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/list')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  }
]

export default new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
