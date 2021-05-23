<template>
  <v-container>
    <v-row>
      <v-col>
        <div v-if="micropost">
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://picsum.photos/80/80/?random"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                v-html="micropost.user.name"
              ></v-list-item-title>
              <v-list-item-subtitle
                style="white-space: pre-line"
                v-html="micropost.content"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text
                v-text="
                  $dayjs(micropost.created_at).format('YYYY-MM-DD HH:mm:ss')
                "
              ></v-list-item-action-text>
              <div v-if="isMine" class="d-flex">
                <v-btn
                  fab
                  small
                  dark
                  color="teal"
                  @click="openEditMicropost"
                  class="mx-2"
                >
                  <v-icon>mdi-pen</v-icon>
                </v-btn>
                <v-btn
                  fab
                  small
                  dark
                  color="error"
                  @click="deleteMicropost"
                  class="mx-2"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-list-item-action>
          </v-list-item>
          <v-divider :inset="true"></v-divider>

          <!-- MicropostEditModal.vue に
          "micropost"というモノを micropostとして送る(:) -->
          <!-- MicropostEditModal.vue の updateイベントを受け取ったら
          updateMicropostメソッドを実行 -->
          <micropost-edit-modal
            v-if="isMine"
            ref="dialog"
            :micropost="micropost"
            @update="updateMicropost"
          ></micropost-edit-modal>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import MicropostEditModal from "@/components/MicropostEditModal";
export default {
  data() {
    return {
      micropost: null,
    };
  },
  components: {
    MicropostEditModal,
  },
  created() {
    this.fetchMicropost();
  },
  computed: {
    micropostId() {
      // 動的セグメント("/microposts/:id"の:id)の値を返す
      // ...https://router.vuejs.org/ja/guide/essentials/dynamic-matching.html#%E5%8B%95%E7%9A%84%E3%83%AB%E3%83%BC%E3%83%88%E3%83%9E%E3%83%83%E3%83%81%E3%83%B3%E3%82%AF%E3%82%99
      // :idに値が入ったタイミングで発火 => computed
      // => this.micropostId で :idの値を取り出せるようになる => methods:fetchMicropost
      return this.$route.params.id;
    },
    isMine() {
      // $store.getters["auth/currentUser"] で取得できなかった時 ※ログインされていない時
      // false を返す
      if (!this.$store.getters["auth/currentUser"]) return false;

      return (
        this.micropost.user.id == this.$store.getters["auth/currentUser"].id
      );
    },
  },
  methods: {
    async fetchMicropost() {
      const res = await axios.get(`/api/microposts/${this.micropostId}`);
      this.micropost = res.data.micropost;
    },
    openEditMicropost() {
      // "一時的"に(ref= 〜 というプロパティの付けられた template内タグを)参照
      // $refs.dialog => ref="dialog"
      this.$refs.dialog.open();
      // 今回は 子コンポーネントにアクセスし、
      // 子コンポーネント自身のopenメソッドを実行している
      // (※デフォ：falseをtrueに切り替える為、親から実行)
    },
    async updateMicropost(micropostContent) {
      await axios.patch(`/api/microposts/${this.micropostId}`, {
        micropost: { content: micropostContent },
      });
      this.$refs.dialog.close();
      this.micropost.content = micropostContent;
    },
    async deleteMicropost() {
      if (confirm("削除しますか？")) {
        await axios.delete(`/api/microposts/${this.micropostId}`);
        this.$router.push(`/microposts`);
      }
    },
  },
};
</script>
