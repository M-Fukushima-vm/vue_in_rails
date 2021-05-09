<template>
  <!-- ユーザー登録ページ -->
  <div>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <!-- lazy-validation ... バリデーションエラーが無い限り、常に true  -->
                <v-text-field
                  v-model="name"
                  :counter="10"
                  :rules="nameRules"
                  label="Name"
                  required
                  prepend-icon="mdi-account"
                ></v-text-field>

                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                  prepend-icon="mdi-email"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :rules="passwordConfirmationRules"
                  label="Password"
                  required
                  prepend-icon="mdi-lock"
                  type="password"
                ></v-text-field>

                <v-text-field
                  v-model="passwordConfirmation"
                  label="PasswordConfirmation"
                  required
                  prepend-icon="mdi-lock"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" @click="signup">新規登録</v-btn>
              <v-spacer></v-spacer>
              <router-link to="/login" class="text-decoration-none"
                >ログインページへ</router-link
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  }),
  computed: {
    // 触ったら発火する処理群(=>関数) ＊フォームバリデーション含む
    // フォームバリデーションを紐付ける :rules属性 は配列を受け付ける為
    // 配列で返す
    nameRules() {
      return [
        // 必須(value要)のバリデーション ＊エラーメッセージは右辺
        (v) => !!v || "Name is required",
        // 文字数バリデーション
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
        // 今何文字入力してるかを一時記憶する :counter属性 を付与すると親切
        // (設定文字数を超えた段階で、エラーメッセージが変化する為)
      ];
    },
    emailRules() {
      return [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ];
    },
    passwordConfirmationRules() {
      return [
        this.password === this.passwordConfirmation || "Password must match",
      ];
    },
  },
  methods: {
    async signup() {
      // this.$refs.form.validate()
      // => ref="form" とした v-formに対してvalidate()関数を呼ぶ時
      // => v-form内全てのバリデーションを通過したら
      if (this.$refs.form.validate()) {
        try {
          // api/usersへpostリクエスト
          await axios.post(`/api/users`, {
            // リクエストに付ける(ユーザー登録)データ
            user: {
              name: this.name,
              email: this.email,
              password: this.password,
              password_confirmation: this.passwordConfirmation,
            },
          });
          this.$router.push(`login`); //遷移
        } catch (err) {
          // 帰ってきたデータのエラーメッセージをalaertで表示
          alert(err.response.data.error.messages);
        }
      }
    },
  },
};
</script>
