<template>
  <div id="login">
    <h1>Login</h1>
    <form @submit.prevent="login()">
      <div id="error" v-if="errorMessage">{{ errorMessage }}</div>
      <InputBase
        class="input-window"
        icon="/icons/person-outline.svg"
        label="スクリーン名"
        type="text"
        v-model="email"
      ></InputBase>
      <InputBase
        class="input-window"
        icon="/icons/key-outline.svg"
        label="パスワード"
        type="password"
        v-model="password"
      ></InputBase>
      <ButtonBase class="button" :color="this.MAIN_COLOR" text="Go"></ButtonBase>
      <router-link to="/#" class="forget-pw">パスワードを忘れた?</router-link>
    </form>
    <hr width="70%" size="1px" color="black" noshade />
    <router-link to="/signup">新規登録</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator"
import ButtonBase from "@/components/button/ButtonBase.vue"
import InputBase from "@/components/input/InputBase.vue"
import DefaultColors from "@/mixins/DefaultColors"
import "@/client/authentication"

@Component({ components: { InputBase, ButtonBase } })
export default class Login extends Mixins(DefaultColors) {
  /** メールアドレス */
  email = ""

  /** パスワード */
  password = ""

  /** ログインに失敗したか */
  errorMessage = ""

  beforeCreate() {
    if (this.$store.getters["account/isLoggedIn"]) {
      this.$router.push("/")
    }
  }

  login() {
    this.$store
      .dispatch("account/login", { email: this.email, password: this.password })
      .then(() => {
        this.$router.push("/")
      })
      .catch((error) => {
        this.errorMessage = error.message
        this.password = ""
      })
  }
}
</script>

<style scoped lang="scss">
#login {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  margin: auto;
  width: 100vw;
  height: 100vh;
}

#error {
  color: red;
  font-size: 0.8em;
  margin: 0 0 15px 0;
}

.button {
  margin: 20px 0 0 0;
}

.input-window {
  margin: 10px 0 10px 0;
}

.forget-pw {
  margin: 25px 0 0 0;
  font-size: 0.7em;
}

h1 {
  margin: 50px 0 50px 0;
  font-size: 3em;
}

hr {
  margin: 20px;
}

form {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>
