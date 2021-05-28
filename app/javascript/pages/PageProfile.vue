<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card max-width="800" class="mx-auto" v-if="user">
          <v-card-title>
            <v-avatar size="120">
              <v-img
                :src="user.avatar_url"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-if="isMe">
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-btn
                      icon
                      @click="$refs.avatarUploadDialog.toggleShow()"
                      style="width: 100%; height: 100%;"
                    >
                      <v-icon color="secondary">mdi-camera</v-icon>
                    </v-btn>
                  </v-row>
                </template>
              </v-img>
            </v-avatar>
            <!-- child -->
            <avatar-upload ref="avatarUploadDialog"></avatar-upload>
            <!-- /child -->
            <v-spacer></v-spacer>
            <v-btn
              v-if="isMe"
              class="ma-2"
              tile
              outlined
              color="success"
              @click="$refs.dialog.open()"
            >
              <v-icon left>mdi-pencil</v-icon> プロフィール編集
            </v-btn>
          </v-card-title>

          <v-list>
            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon color="indigo">mdi-account</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon color="indigo">mdi-email</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ user.email }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon color="indigo">mdi-account-details</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  <span style="white-space: pre-line">
                    {{ user.introduction }}
                  </span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- child -->
          <profile-edit-modal ref="dialog"></profile-edit-modal>
          <!-- /child -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import ProfileEditModal from "../components/ProfileEditModal";
import AvatarUpload from "../components/AvatarUpload";
export default {
  data() {
    return {
      targetUser: null,
    };
  },
  components: {
    ProfileEditModal,
    AvatarUpload,
  },
  computed: {
    isMe() {
      return (
        // storeのauthモジュールから gettersのcurrentUser を返す かつ
        this.$store.getters["auth/currentUser"] &&
        // storeのauthモジュールから gettersのcurrentUser のid値を userIdと確認(異なる時は false)
        this.userId == this.$store.getters["auth/currentUser"].id
      );
    },
    userId() {
      return (
        // あればparams.id 無ければ storeのauthモジュールから gettersのcurrentUser のid値を返す
        this.$route.params.id || this.$store.getters["auth/currentUser"].id
      );
    },
    user() {
      // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
      return this.isMe // isMe の結果(条件)が
        ? // trueの時、storeのauthモジュールから gettersのcurrentUser を返す
          this.$store.getters["auth/currentUser"]
        : // falseの時、
          this.targetUser;
    },
  },
  async created() {
    // 描画前に
    // axios.get通信で 結果をresに取得しておき
    // isMe 実行時
    if (this.isMe) return;
    const res = await axios.get(`/api/users/${this.userId}`);
    // resデータのuserを targetUserに代入
    this.targetUser = res.data.user;
  },
};
</script>
