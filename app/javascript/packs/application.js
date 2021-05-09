// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// VueCLIでいう main.js

require("@rails/ujs").start();
require("@rails/activestorage").start();
require("channels");

import Vue from "vue";
import App from "../app.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);
const vuetify = new Vuetify();
import router from "@/router";
import store from "@/store";

// https://developer.mozilla.org/ja/docs/Web/API/Document
// https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener
// https://developer.mozilla.org/ja/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  const app = new Vue({
    // オプションオブジェクトとして(uetify,router,store)を追加
    //　https://jp.vuejs.org/v2/guide/instance.html
    vuetify,
    router,
    store,
    // https://jp.vuejs.org/v2/api/index.html?#created
    created() {
      // https://developer.mozilla.org/ja/docs/Web/API/Storage/getItem
      const userString = localStorage.getItem("currentUser");
      if (userString) {
        // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
        const userData = JSON.parse(userString);
        this.$store.commit("auth/SET_CURRENT_USER", userData);
      }
    },
    render: (h) => h(App),
  }).$mount();
  // https://developer.mozilla.org/ja/docs/Web/API/Node/appendChild
  // https://jp.vuejs.org/v2/api/index.html?#el
  document.body.appendChild(app.$el);
  // Vueインスタンス(app)を出力
  console.log(app);
});
