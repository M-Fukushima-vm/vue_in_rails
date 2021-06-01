<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="pb-10">
          <!-- vuex:authモジュールのgetters.currentUserで値が取得できたら -->
          <div class="mb-5" v-if="$store.getters['auth/currentUser']">
            <!-- MicropostForm.vue の createdイベントを受け取ったら
            createMicropostメソッド実行 -->
            <micropost-form @created="createMicropost"></micropost-form>
          </div>
          <!-- TimelineList.vueに -->
          <!-- "microposts"というモノを micropostsとして送る(:) -->
          <!-- "isExistMicroposts"の時、 -->
          <!-- TimelineList.vueの中身を表示 -->
          <timeline-list
            :microposts="microposts"
            v-if="isExistMicroposts"
            class="mb-5"
          ></timeline-list>
          <!-- "isExistMicroposts"じゃない時はこっちを表示(v-else) -->
          <div class="text-center" v-else>
            一件もありません
          </div>
          <template v-if="pagingMeta">
            <div class="text-center">
              <v-pagination
                v-model="pagingMeta.current_page"
                :length="pagingMeta.total_pages"
                @input="paging"
              ></v-pagination>
            </div>
          </template>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import MicropostForm from "@/components/MicropostForm";
import TimelineList from "@/components/TimelineList";
import axios from "axios";
export default {
  data() {
    return {
      microposts: [],
      currentPage: 1, // created()が走る前の、初期値として追加
      pagingMeta: null, // created()が走る前の、エラー回避用に追加
    };
  },
  components: {
    MicropostForm,
    TimelineList,
  },
  computed: {
    isExistMicroposts() {
      return this.microposts.length > 0;
    },
  },
  created() {
    // インスタンス生成時に fetchMicroposts() を実行
    this.fetchMicroposts();
  },
  methods: {
    // https://qiita.com/soarflat/items/1a9613e023200bbebcb3#await%E3%81%A8%E3%81%AF
    async fetchMicroposts() {
      const res = await axios.get(`/api/microposts`, {
        params: { page: this.currentPage },
      });
      // await の結果を待ってから
      this.microposts = res.data.microposts;
      this.pagingMeta = res.data.meta; // pagingMeta として取り出す
      // を実行する
    },
    async createMicropost(micropostContent) {
      // データ成形の定義
      const micropostParams = {
        micropost: {
          content: micropostContent,
        },
      };
      const res = await axios.post(`/api/microposts`, micropostParams);
      // await の結果を待ってから
      // 既に取ってきてあるデータ配列(...this.microposts)と
      // レスポンスデータで作る新配列([...[res.data.micropost]])
      // で置き換え代入
      this.microposts = [...[res.data.micropost], ...this.microposts];
      // スプレッド演算子による配列連結
      // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    },
    paging(pageNumber) {
      // pageNumber* クリックによって @input で帰ってくるナンバー
      this.currentPage = pageNumber;
      this.fetchMicroposts();
      this.$vuetify.goTo(0);
    },
  },
};
</script>
