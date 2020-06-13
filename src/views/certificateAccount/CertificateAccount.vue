<template>
  <div id="certificate-account" v-show="completeCertificate">
    <h1>登録が完了しました</h1>
    <p>
      メールアドレスを認証しました。
      <router-link to="/login">ログイン</router-link>を行ってください。
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { DefaultApi as AuthApi } from "@/client/authentication"
import fqdn from "@/constant/fqdn.ts"

@Component({})
export default class Signup extends Vue {
  /** 認証が完了したか */
  completeCertificate = false

  beforeCreate() {
    const token: string | null = this.$route.query.token as string

    if (!token) {
      this.$router.push("/404")
      return
    }

    new AuthApi()
      .certificateAccount(token, { baseUrl: fqdn.apiAuthentication })
      .then(() => {
        this.completeCertificate = true
      })
      .catch(() => {
        this.$router.push("/404")
      })
  }
}
</script>

<style lang="scss" scoped>
#certificate-account {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
}
</style>
