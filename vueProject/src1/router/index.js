import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import a from '@/components/a'
import b from '@/components/b'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/a',
      name: 'a',
      component: a
    },
    {
      path: '/b',
      name: 'b',
      component: b
    }
  ]
})
