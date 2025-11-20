import { defineStore } from "pinia"
import { localCache } from "@/untils/cache"
import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from "@/global/constants"
import type { UserInfo, UserMenus } from "@/types/login"
import { mapMenusToRoutes } from "@/untils/mapMenus"
import router from "@/router"

interface ILogin {
  token: string
  userInfo: UserInfo
  userMenus: UserMenus[]
}

const useLoginStore = defineStore("login", {
  state: (): ILogin => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? undefined,
    userInfo: localCache.getCache(USER_INFO) ?? undefined,
    userMenus: localCache.getCache(USER_MENUS) ?? undefined,
  }),
  actions: {
    saveLoginInfo(id: string, token: string, userInfo: UserInfo, userMenus: UserMenus[]) {
      this.token = token
      this.userInfo = userInfo
      this.userMenus = userMenus
      localCache.setCache(LOGIN_TOKEN, token)
      localCache.setCache(USER_INFO, userInfo)
      localCache.setCache(USER_MENUS, userMenus)
    },
    cleanLoginInfo() {
      localCache.removeCache(LOGIN_TOKEN)
      localCache.removeCache(USER_INFO)
      localCache.removeCache(USER_MENUS)
    },
    saveLoginToken(token: string) {
      this.token = token
    },
    mapMenus() {
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute("main", route))
    },
  },
})

export default useLoginStore
