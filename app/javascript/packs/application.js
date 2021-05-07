// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// VueCLIでいう main.js

require("@rails/ujs").start()
require("@rails/activestorage").start()
require("channels")

import Vue from 'vue'
import App from '../app.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
const vuetify = new Vuetify();
// import router from '@/router'
// import store from '@/store'
document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    vuetify,
    // router,
    // store,
    // created() {
    //   const userString = localStorage.getItem('currentUser')
    //   if (userString) {
    //     const userData = JSON.parse(userString)
    //     this.$store.commit('auth/SET_CURRENT_USER', userData)
    //   }
    // },
    render: h => h(App)
  }).$mount()
  document.body.appendChild(app.$el)

  console.log(app)
})