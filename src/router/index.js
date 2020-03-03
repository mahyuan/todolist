import Vue from 'vue'
import Router from 'vue-router'
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
  // mode: 'history',
  routes,
  base: '/todolist/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
