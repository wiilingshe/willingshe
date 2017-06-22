// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import a from '@/components/a'
// import b from '@/components/b'

Vue.config.productionTip = false

// Vue.use(Router)
// var router = new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Hello',
//       component: Hello
//     },
//     {
//       path: '/a',
//       name: 'a',
//       component: a
//     },
//     {
//       path: '/b',
//       name: 'b',
//       component: b
//     }
//   ]
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  // <App />他就是App.vue，template就是选择vue实例要加载哪个模板。最新的vue-cli脚手架模板现在是这个形式。App.vue是主程序，其他所有的.vue都是放在App.vue中，所以只需要加载App.vue就完全可以把其他的东西加载出来。
  components: { App }
})
