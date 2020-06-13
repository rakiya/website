import Vue from "vue"
import VueRouter from "vue-router"
import Login from "@/views/login/Login.vue"
import Signup from "@/views/signup/Signup.vue"
import CertificateAccount from "@/views/certificateAccount/CertificateAccount.vue"
import NotFound from "@/views/errors/NotFound.vue"
import Store from "@/store"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/dashboard/Dashboard.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { isPublic: true }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { isPublic: true }
  },
  {
    path: "/account/certification",
    name: "CertificateAccount",
    component: CertificateAccount,
    meta: { isPublic: true }
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
    meta: { isPublic: true }
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((page) => page.meta.isPublic) || Store.getters["account/isLoggedIn"]) {
    next()
  } else {
    next("/login")
  }
})

export default router
