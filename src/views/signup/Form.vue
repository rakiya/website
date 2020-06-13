<template>
  <div id="signup">
    <h1>Signup</h1>
    <form @submit.prevent="signup()">
      <!-- メールアドレス -->
      <InputWithErrorMessage
        class="input-window"
        icon="/icons/mail-outline.svg"
        label="メールアドレス"
        type="email"
        :validationResult="$v.syncedEmail"
        :clientSideErrorMessage="{
          required: '必須です',
          email: '形式が間違っています'
        }"
        :serverSideErrorMessage="serverSideErrors.email"
        v-model="syncedEmail"
        @input="$delete(serverSideErrors, 'email')"
        @blur="$v.syncedEmail.$touch"
      ></InputWithErrorMessage>
      <!-- 表示名 -->
      <InputWithErrorMessage
        class="input-window"
        icon="/icons/person-outline.svg"
        label="名前"
        type="text"
        :validationResult="$v.syncedScreenName"
        :clientSideErrorMessage="{
          required: '必須です',
          minLength: '1文字以上入力してください',
          maxLength: '32文字以下で入力してください'
        }"
        :serverSideErrorMessage="serverSideErrors.screenName"
        v-model="syncedScreenName"
        @blur="$v.syncedScreenName.$touch"
      ></InputWithErrorMessage>
      <!-- パスワード -->
      <InputWithErrorMessage
        class="input-window"
        icon="/icons/key-outline.svg"
        label="パスワード"
        type="password"
        style="{float: left;}"
        :validationResult="$v.syncedPassword"
        :clientSideErrorMessage="{
          required: '必須です',
          minLength: '6文字以上で入力してください',
          maxLength: '1024文字以下で入力してください',
          pattern: '大文字と記号をそれぞれ1回以上使ってください',
          isSame: 'パスワード(確認)と一致しません'
        }"
        :serverSideErrorMessage="serverSideErrors.password"
        v-model="syncedPassword"
        @blur="$v.syncedPassword.$touch"
      ></InputWithErrorMessage>
      <!-- パスワード(確認) -->
      <InputWithErrorMessage
        class="input-window"
        icon="/icons/key-outline.svg"
        label="パスワード(確認)"
        type="password"
        :validationResult="$v.passwordConfirm"
        :clientSideErrorMessage="{ required: '必須です' }"
        v-model="passwordConfirm"
        @blur="$v.passwordConfirm.$touch"
      ></InputWithErrorMessage>
      <!-- 次へ -->
      <ButtonBase class="button" :color="this.BACKGROUND_COLOR" text="登録"> </ButtonBase>
    </form>
    <hr width="70%" size="1px" color="black" noshade />
    <router-link to="/login">ログイン</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, PropSync } from "vue-property-decorator"
import DefaultColors from "@/mixins/DefaultColors"
import InputWithErrorMessage from "@/components/input/InputWithErrorMessage.vue"
import ButtonBase from "@/components/button/ButtonBase.vue"
import { required, sameAs, email, maxLength, minLength } from "vuelidate/lib/validators"
import { Validate } from "vuelidate-property-decorators"
import { DefaultApi, SignUpRequest, ErrorMessage } from "@/client/authentication"
import ServerSideErrors from "@/utils/ServerSideErrors.ts"

/** パスワードの正規表現 */
function pattern(value: string) {
  const alphabets = /^[\x20-\x7e]*$/
  const includeUpperCase = /^.*[A-Z].*$/
  const includeSymbol = /^.*[\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e].*$/

  return alphabets.test(value) && includeUpperCase.test(value) && includeSymbol.test(value)
}

@Component({ components: { InputWithErrorMessage, ButtonBase } })
export default class Form extends Mixins(DefaultColors) {
  /** アカウントID */
  @PropSync("accountId", { required: true })
  syncedAccountId!: string

  /** メールアドレス */
  @PropSync("email", { required: true, default: "" })
  @Validate({ required, email })
  syncedEmail!: string

  /** 表示名 */
  @PropSync("screenName", { required: true, default: "" })
  @Validate({ required, minLength: minLength(1), maxLength: maxLength(32) })
  syncedScreenName!: string

  /** パスワード */
  @PropSync("password", { required: true, default: "" })
  @Validate({
    required,
    minLength: minLength(6),
    maxLength: maxLength(1024),
    pattern,
    isSame: sameAs("passwordConfirm")
  })
  syncedPassword!: string

  /** パスワード(確認) */
  @Validate({ required })
  passwordConfirm = ""

  private serverSideErrors: ServerSideErrors = {}

  signup() {
    this.$v.$touch()

    if (this.formIsInvalid()) return

    const request: SignUpRequest = {
      email: this.syncedEmail,
      screenName: this.syncedScreenName,
      password: this.syncedPassword
    }
    new DefaultApi()
      .signup(request)
      .then((response) => {
        this.syncedAccountId = response.data.id
        this.$emit("next")
      })
      .catch((error) => {
        this.serverSideErrors = {}
        error.response.data.errors.forEach((e: ErrorMessage) => {
          this.serverSideErrors[e.field] = e.descriptions
        })
      })
  }

  private formIsInvalid(): boolean {
    return Object.keys(this.$v)
      .filter((key) => !key.startsWith("$"))
      .some((item) => this.$v[item].$invalid)
  }
}
</script>

<style lang="scss" scoped>
#signup {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.button {
  margin: 20px 0 0 0;
}

form > .input-window:nth-child(n + 2) {
  margin: 20px 0 0 0;
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
  margin: 40px;
}

form {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>
