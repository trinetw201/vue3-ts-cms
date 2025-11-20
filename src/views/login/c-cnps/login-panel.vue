<template>
  <div class="longin-panel">
    <h1 class="title">後台管理系統</h1>

    <div class="tabs">
      <el-tabs v-model="activeName" type="border-card" stretch>
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帳號登入</span>
            </div>
          </template>
          <accountPane ref="accountFormSend" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手機登入</span>
            </div>
          </template>
          <phonePane />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isKeepPwd" label="記住密碼" size="large" />
      <el-link href="./" type="primary">忘記密碼</el-link>
    </div>
    <el-button class="login-btn" size="large" type="primary" @click="loginClick"
      >立即登入</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import accountPane from "./account-pane.vue"
import phonePane from "./phone-pane.vue"
import { localCache } from "@/untils/cache"

const activeName = ref<string>("account")
const isKeepPwd = ref<boolean>(localCache.getCache("isKeepPwd") ?? false)
watch(isKeepPwd, (newValue) => {
  localCache.setCache("isKeepPwd", newValue)
})
const accountFormSend = ref<InstanceType<typeof accountPane>>()

function loginClick() {
  accountFormSend.value?.accountFormSend(isKeepPwd.value)
}
</script>

<style lang="less" scoped>
.longin-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }

  .label {
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      margin-left: 5px;
    }
  }
}
</style>
