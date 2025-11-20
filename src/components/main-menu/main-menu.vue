<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" />
      <h2 v-show="!isFold" class="title">後台管理系統</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="String(dafultActive)"
        class="el-menu"
        text-color="#b7bdc3"
        :collapse="isFold"
        active-text-color="#fff"
        background-color="#001529"
        unique-opened
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <el-icon><component :is="item.icon.split('-icon-')[1]" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-if="item.children">
              <template v-for="children in item.children" :key="children.id">
                <el-menu-item :index="String(children.id)" @click="handleSubmenuClick(children)">{{
                  children.name
                }}</el-menu-item>
              </template>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router"
import userLoginStore from "@/store/login"
import type { UserMenus, Children } from "@/types/login"
import { mapMenuByRoutePath } from "@/untils/mapMenus"
import { computed } from "vue"
import { useRoute } from "vue-router"

defineProps({
  isFold: {
    type: Boolean,
    default: false,
  },
})

const userLogin = userLoginStore()
const userMenus: UserMenus[] = userLogin.userMenus
function handleSubmenuClick(children: Children) {
  router.push(children.url)
}

const route = useRoute()
const dafultActive = computed(() => {
  return mapMenuByRoutePath(route.path, userMenus)?.subMenu.id
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 12px 10px 8px 10px;
  flex-direction: row;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
