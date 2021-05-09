// store(vuex)の単独ファイル

// 使うプラグインは頭で読み込む
import axios from "axios";

// state ... 状態(データの一時保管領域)
const state = {
  currentUser: null,
};

// vuex版のcomputed ... 内容調整して返す類のもの
const getters = {
  currentUser: (state) => state.currentUser,
};

// vuex版のmethods ... 詳細内容をまとめて置くだけにし、
//                    実行(commit)はactionsに譲るが無難
//                    (同期処理しか受付けない為)
const mutations = {
  SET_CURRENT_USER: (state, user) => {
    state.currentUser = user;
    // https://developer.mozilla.org/ja/docs/Web/API/Storage/setItem
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    localStorage.setItem("currentUser", JSON.stringify(user));
    // https://qiita.com/masatakaaaa/items/7bc7cfb2c561c54e424a
    // https://qiita.com/uasi/items/cfb60588daa18c2ec6f5#:~:text=Authorization%20%E3%83%98%E3%83%83%E3%83%80%E3%81%AE%20Bearer%20%E3%82%B9%E3%82%AD%E3%83%BC%E3%83%A0%E3%81%A8%E3%81%AF%E4%BD%95%E3%81%8B&text=HTTP%20headers%20but%20does%20not%20preclude%20its%20use%20for%20proxy%20authentication.
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  },
  CLEAR_CURRENT_USER: () => {
    state.currentUser = null;
    // https://developer.mozilla.org/ja/docs/Web/API/Storage/removeItem
    localStorage.removeItem("currentUser");
    // https://developer.mozilla.org/ja/docs/Web/API/Location/reload
    location.reload();
  },
};

// vuex版のmethods ... 実行(commit)担当。
//                    こっちからは非同期処理可能。
//                    主にmutationsから選択して実行
const actions = {
  async login({ commit }, sessionParams) {
    const res = await axios.post(`/api/session`, sessionParams);
    commit("SET_CURRENT_USER", res.data.user);
  },

  logout({ commit }) {
    commit("CLEAR_CURRENT_USER");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
