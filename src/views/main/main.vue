<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isFold ? '60px' : '210px'"><mainMenu :isFold="isFold" /></el-aside>
      <el-container>
        <el-header height="40px"><mainHeader @fold-change="handleFoldChange" /></el-header>
        <el-main><RouterView></RouterView></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainMenu from "@/components/main-menu/main-menu.vue"
import mainHeader from "@/components/main-header/main-header.vue"
import { ref, onBeforeMount } from "vue"
import userLoginStore from "@/store/login"
import router from "@/router"

const isFold = ref(false)

function handleFoldChange(isFoldFlag: boolean) {
  isFold.value = isFoldFlag
}
onBeforeMount(() => {
  const userLogin = userLoginStore()
  userLogin.mapMenus()
  router.replace(router.currentRoute.value.fullPath)
})
</script>

<style lang="less" scoped>
.main-container {
  height: 100vh;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    background-color: aqua;
    transition: width 0.3s ease;
  }

  // .el-header {
  //   background-color: rgb(228, 228, 228);
  // }

  .el-main {
    background-color: rgb(228, 228, 228);
  }
}
</style>
