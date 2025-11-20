<template>
  <div class="header-info">
    <!--icon-->
    <div class="operation">
      <div class="icon">
        <el-icon size="20px"><ChatDotRound /></el-icon>
      </div>
      <div class="icon">
        <el-icon size="20px"><ChatDotRound /></el-icon>
      </div>
      <div class="icon">
        <div class="dot"></div>
        <el-icon size="20px"><Message /></el-icon>
      </div>
    </div>
    <!--個人資訊-->
    <el-dropdown class="el-dropdown-info">
      <span class="el-dropdown-link">
        {{ userInfo.name }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExit">退出系統</el-dropdown-item>
          <el-dropdown-item divided>個人服務</el-dropdown-item>
          <el-dropdown-item>修改密碼</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import router from "@/router"
import useLoginStore from "@/store/login"
const useLogin = useLoginStore()
const userInfo = useLogin.userInfo

function handleExit() {
  useLogin.cleanLoginInfo()
  router.push("/login")
}
</script>

<style lang="less" scoped>
.header-info {
  display: inline-flex;
  align-items: center;
  height: 100%;
}

.operation {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .icon {
    position: relative;
    margin-right: 5px;
    :hover {
      cursor: pointer;
    }
    .dot {
      position: absolute;
      top: -3px;
      right: -3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }

  .el-dropdown-info {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-items: center;
  }

  // .el-dropdown-el-dropdown .el-dropdown-info {
  //   font-size: var(--el-font-size-large) !important;
  //   cursor: pointer;
  //   display: flex;
  //   align-items: center;
  //   justify-items: center;
  // }
}

.el-dropdown-link {
  height: 25px;
  font-size: var(--el-font-size-large);
  cursor: pointer;
  display: flex;
}
.el-dropdown-link:focus-visible {
  outline: unset;
}

:deep(.el-dropdown-menu__item) {
  line-height: 38px;
}
</style>
