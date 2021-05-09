<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                prepend-icon="mdi-email"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                required
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <router-link to="/signup" class="text-decoration-none caption"
              >ユーザー登録ページへ</router-link
            >
            <v-spacer></v-spacer>
            <v-btn dark color="indigo" @click="login">ログイン</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
  }),
  computed: {
    // 触ったら発火する処理群(=>関数) ＊フォームバリデーション含む
    // フォームバリデーションを紐付ける :rules属性 は配列を受け付ける為
    // 配列で返す
    emailRules() {
      return [
        // 必須(value要)のバリデーション ＊エラーメッセージは右辺
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ];
    },
    passwordRules() {
      return [(v) => !!v || "Password is required"];
    },
  },
  methods: {
    async login() {
      // this.$refs.form.validate()
      // => ref="form" とした v-formに対してvalidate()関数を呼ぶ時
      // => v-form内全てのバリデーションを通過したら
      if (this.$refs.form.validate()) {
        try {
          //データ生成
          const sessionParams = {
            session: {
              email: this.email,
              password: this.password,
            },
          };
          // 生成したsessionParamsデータを使って
          // vuex:authモジュール の loginアクションを実行
          await this.$store.dispatch("auth/login", sessionParams);
          this.$router.push(`/`); //遷移
        } catch (error) {
          // 帰ってきたデータのエラーメッセージをalaertで表示
          alert(error.response.data.error.messages);
        }
      }
    },
  },
};
</script>
Ï
