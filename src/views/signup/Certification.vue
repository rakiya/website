<template>
  <div id="certification">
    <h1>仮登録が完了しました</h1>
    <p>{{ screenName }}さんのメールアドレス{{ email }}にメールを送信しました。</p>
    <p>メールに記載されているURLをクリックして、本登録を完了させてください。</p>
    <br />
    <p>
      メールが届かない場合は<a href="" @click.prevent="resend()">こちら</a>をクリックしてください
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, PropSync } from "vue-property-decorator"
import { DefaultApi } from "../../client/authentication"

@Component({})
export default class Signup extends Vue {
  @PropSync("accountId", { required: true })
  syncedAccountId!: string

  @PropSync("screenName", { required: true })
  syncedScreenName!: string

  @PropSync("email", { required: true })
  syncedEmail!: string

  resend() {
    new DefaultApi().resendCertificationToken(this.syncedAccountId)
  }
}
</script>

<style lang="scss" scoped>
#certification {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>
