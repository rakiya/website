import { Module, VuexModule, MutationAction } from "vuex-module-decorators"
import { DefaultApi as AuthApi } from "@/client/authentication"
import JwtDecode from "jwt-decode"
import fqdn from "@/constant/fqdn.ts"

interface JWT {
  iss: string
  sub: string
  aud: string
  exp: number
  nbf: number
  iat: number
  jti: string
  // カスタムフィールド
  rft: string
}

interface AuthInfo {
  email: string
  password: string
}

@Module({ name: "account", namespaced: true })
export default class AccountModule extends VuexModule {
  id: string | null = null

  accessToken: string | null = null

  refreshToken: string | null = null

  /**
   *  ログインを行う。
   */
  @MutationAction({ mutate: ["id", "accessToken", "refreshToken"], rawError: true })
  async login(authInfo: AuthInfo) {
    return new AuthApi({ basePath: fqdn.apiAuthentication })
      .login({ email: authInfo.email, password: authInfo.password })
      .then((response) => {
        const decodedAccessToken: JWT = JwtDecode(response.data.token)

        return {
          id: decodedAccessToken.sub,
          accessToken: response.data.token,
          refreshToken: decodedAccessToken.rft
        }
      })
      .catch((error) => {
        throw new Error(error.response.data.errors[0].descriptions[0])
      })
  }

  @MutationAction({ mutate: ["id", "accessToken", "refreshToken"] })
  async logout() {
    return { id: null, accessToken: null, refreshToken: null }
  }

  get isLoggedIn(): boolean {
    return this.accessToken !== null
  }
}
