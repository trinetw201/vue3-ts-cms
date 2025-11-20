import { LOGIN_TOKEN } from "@/global/constants"
import { localCache } from "@/untils/cache"
import { firstMenu } from "@/untils/mapMenus"
import { createRouter, createWebHashHistory } from "vue-router"
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      component: () => import("@/views/login/login.vue"),
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/main/main.vue"),
    },
    {
      path: "/:pahtMatch(.*)",
      component: () => import("@/views/main/main.vue"),
    },
  ],
})

router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (!token && !to.path.startsWith("/login")) {
    return "/login"
  }

  if ((to.path == "/main" || to.path == "/main/") && firstMenu) {
    return firstMenu.url
  }
})

export default router
