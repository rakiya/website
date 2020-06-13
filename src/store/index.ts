import Vue from "vue"
import Vuex from "vuex"
import AccountModule from "./AccountModule"

Vue.use(Vuex)

interface RootModule {
  AccountModule: AccountModule
}

export default new Vuex.Store<RootModule>({
  modules: {
    account: AccountModule
  }
})
