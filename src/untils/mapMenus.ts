import type { UserMenus, Children } from "@/types/login"
import type { RouteRecordRaw } from "vue-router"

interface ComponentModule {
  default: RouteRecordRaw
}

function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, ComponentModule> = import.meta.glob<ComponentModule>(
    "../router/main/**/*.ts",
    {
      eager: true,
    },
  )

  for (const key in files) {
    const file = files[key]
    localRoutes.push(file.default)
  }

  return localRoutes
}

export let firstMenu: Children | null = null
export function mapMenusToRoutes(userMenus: UserMenus[]) {
  const localRoutes = loadLocalRoutes()
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => {
        return item.path === submenu.url
      })
      if (route) {
        //假如沒有一級菜單，添加一級菜單
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        //添加二級菜單
        routes.push(route)
      }
      if (firstMenu === null && route) firstMenu = submenu
    }
  }
  return routes
}

export function mapMenuByRoutePath(routePath: string, userMenus: UserMenus[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url == routePath) return { menu, subMenu }
    }
  }
  return undefined
}

interface IBreadCrumb {
  name: string
  url: string
}

export function mapBreadCrumbByRoutePath(routePath: string, userMenus: UserMenus[]) {
  const currentMenu = mapMenuByRoutePath(routePath, userMenus)
  if (currentMenu?.menu && currentMenu?.subMenu) {
    const breadCrumb: IBreadCrumb[] = []
    breadCrumb.push({ name: currentMenu.menu.name, url: currentMenu.menu.url })
    breadCrumb.push({ name: currentMenu.subMenu.name, url: currentMenu.subMenu.url })
    return breadCrumb
  }
  return undefined
}
