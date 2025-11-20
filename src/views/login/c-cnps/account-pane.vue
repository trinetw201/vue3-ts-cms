<template>
  <div class="account-pane">
    <el-form :model="formData" size="large" :rules="rules" status-icon ref="formRef">
      <el-form-item label="帳號" label-width="60 px" prop="account">
        <el-input v-model="formData.account" clearable />
      </el-form-item>
      <el-form-item label="密碼" label-width="60 px" prop="password">
        <el-input v-model="formData.password" type="password" clearable show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from "vue"
import { ElMessage } from "element-plus"
import type { FormRules, ElForm } from "element-plus"
import type { IAccount, UserInfo, UserMenus } from "@/types/login"
import { accountLoginRequest, getUserInfoByID, getUserMenusByRoleId } from "@/service/login/login"
import useLoginStore from "@/store/login"
import { localCache } from "@/untils/cache"
import router from "@/router"

const CACHE_ACCOUNT = "ACCOUNT"
const CACHE_PASSWORD = "password"

const formData = reactive<IAccount>({
  account: localCache.getCache(CACHE_ACCOUNT) ?? "",
  password: localCache.getCache(CACHE_PASSWORD) ?? "",
})

const checkAccount = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("帳號不可為空"))
  } else if (!/^[A-Za-z0-9]{6,20}$/.test(value)) {
    callback(new Error("必須為6~20個數字或英文組成"))
  }
  callback()
}

const checkPassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("密碼不可為空"))
  } else if (!/^[A-Za-z0-9]{6,20}$/.test(value)) {
    callback(new Error("必須為6~20個數字或英文組成"))
  }
  callback()
}

const rules = reactive<FormRules<typeof formData>>({
  account: [
    {
      validator: checkAccount,
      trigger: "blur",
    },
  ],
  password: [{ validator: checkPassword, trigger: "blur" }],
})

const formRef = ref<InstanceType<typeof ElForm>>()
function accountFormSend(isKeepPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      accountLoginRequest(toRaw(formData)).then(async (res) => {
        if (isKeepPwd) {
          localCache.setCache(CACHE_ACCOUNT, formData.account)
          localCache.setCache(CACHE_PASSWORD, formData.password)
        } else {
          localCache.removeCache(CACHE_ACCOUNT)
          localCache.removeCache(CACHE_PASSWORD)
        }
        console.log(JSON.stringify(res))
        if (res.code == 0) {
          const useLogin = useLoginStore()
          useLogin.saveLoginToken(res.data.token)
          const getUserInfo = await getUserInfoByID(res.data.id)
          console.log(JSON.stringify(getUserInfo))
          if (getUserInfo.code == 0) {
            const getUserMenus = await getUserMenusByRoleId(getUserInfo.data.id)
            console.log(JSON.stringify(getUserMenus))
            if (getUserMenus.code == 0) {
              useLogin.saveLoginInfo(
                res.data.id,
                res.data.token,
                getUserInfo.data as UserInfo,
                getUserMenus.data as UserMenus[],
              )
              router.push("/main")
            }
          }
        } else {
          ElMessage.error(res.message)
        }
      })
    } else {
      ElMessage.error("帳號密碼格式有誤")
    }
  })
}

defineExpose({ accountFormSend })
</script>

<style lang="less" scoped></style>
