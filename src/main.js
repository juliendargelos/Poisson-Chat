// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import SmoothscrollPolyfill from 'smoothscroll-polyfill'
import Bourgeon from 'bourgeon'
import App from './App'
import dataManager from './dataManager'

SmoothscrollPolyfill.polyfill()

Vue.use(Bourgeon)
Vue.use(dataManager, {
  api: 'http://bddi-chat2017.herokuapp.com'
})

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
