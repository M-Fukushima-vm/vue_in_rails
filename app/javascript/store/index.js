// store(vuex) の大元になるファイル
//    export default(出力) しておいた配下のjsファイルを
//    import で読み込み
//    modules として追加する事で統合する

import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
  },
});

export default store;
