<template>
  <div id="signup">
    <component
      :is="page"
      :accountId.sync="accountId"
      :email.sync="email"
      :screenName.sync="screenName"
      :password.sync="password"
      @next="nextPage()"
    ></component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Form from "./Form.vue"
import Certification from "./Certification.vue"

@Component({})
export default class Signup extends Vue {
  /** アカウントID */
  accountId: string | null = null

  /** メールアドレス */
  email = ""

  /** 表示名 */
  screenName = ""

  /** パスワード */
  password = ""

  get page() {
    switch (this.$route.hash) {
      case "#certification":
        return Certification
      default:
        return Form
    }
  }

  nextPage() {
    switch (this.$route.hash) {
      case "#certification":
        break
      default:
        this.$router.push({ hash: "#certification" })
    }
  }
}
</script>

<style lang="scss" scoped>
#signup {
  display: flex;
  flex-flow: column nowrap;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  margin: auto;
  width: 100vw;
  height: 100vh;
}
</style>
