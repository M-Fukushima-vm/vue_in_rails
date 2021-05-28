import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import PageUserRegister from "@/pages/PageUserRegister";
import PageUserLogin from "@/pages/PageUserLogin";
import PageTimeline from "@/pages/PageTimeline";
import PageMicropostDetail from "@/pages/PageMicropostDetail";
import PageProfile from "@/pages/PageProfile";
const router = new VueRouter({
  // 名前付きルートの割り当て
  //  https://router.vuejs.org/ja/guide/essentials/named-routes.html
  routes: [
    { path: "/signup", component: PageUserRegister, name: "user-register" },
    { path: "/login", component: PageUserLogin, name: "user-login" },
    { path: "/", component: PageTimeline, name: "timeline" },
    { path: "/microposts", component: PageTimeline },
    {
      path: "/microposts/:id",
      component: PageMicropostDetail,
      name: "micropost-detail",
    },
    { path: "/profile", component: PageProfile, name: "user-profile" },
    { path: "/users/:id", component: PageProfile, name: "user-profile" },
  ],
});

export default router;
