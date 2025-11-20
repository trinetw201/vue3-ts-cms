<template>
  <div class="header-bread-crumb">
    <el-breadcrumb separator-icon="ArrowRightBold">
      <el-breadcrumb-item v-for="item in currentMenu" :key="item.name" :to="item.url">{{
        item.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { mapBreadCrumbByRoutePath } from "@/untils/mapMenus"
import { useRoute } from "vue-router"
import userLoginStore from "@/store/login"
import { computed } from "vue"

const route = useRoute()
const userMenus = userLoginStore().userMenus
const currentMenu = computed(() => {
  return mapBreadCrumbByRoutePath(route.path, userMenus)
})
</script>

<style lang="less" scoped>
.header-bread-crumb {
}
</style>
