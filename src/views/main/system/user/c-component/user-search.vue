<template>
  <div class="user-search">
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用戶名" prop="name">
            <el-input placeholder="請輸入查詢用戶名" v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真實姓名" prop="realname">
            <el-input placeholder="請輸入查詢真實姓名" v-model="searchForm.realname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手機號碼" prop="cellphone">
            <el-input placeholder="請輸入查詢手機號碼" v-model="searchForm.cellphone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="狀態" prop="enable">
            <el-select placeholder="請選擇查詢狀態" style="width: 100%" v-model="searchForm.enable">
              <el-option label="啟用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="創建時間" prop="createAt">
            <el-config-provider :locale="zhTw">
              <el-date-picker
                v-model="searchForm.createAt"
                type="daterange"
                range-separator="-"
                start-placeholder="開始時間"
                end-placeholder="結束時間"
                size="large"
              />
            </el-config-provider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="end">
        <el-form-item style="margin-bottom: 0px; padding: 0px 0px">
          <el-button :icon="RefreshRight" @click="handleResetForm">重置</el-button>
          <el-button type="primary" :icon="Search" @click="handleQueryForm">查詢</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElConfigProvider, ElForm } from "element-plus"
import zhTw from "element-plus/es/locale/lang/zh-tw"
import { Search, RefreshRight } from "@element-plus/icons-vue"
import { reactive, ref } from "vue"
import type { UserSearchForm } from "@/types/main/system/system"

const searchForm = reactive<UserSearchForm>({
  name: "",
  realname: "",
  cellphone: "",
  enable: 1,
  createAt: null,
})

const formRef = ref<InstanceType<typeof ElForm>>()

const emit = defineEmits(["queryClick", "resetClick"])

function handleQueryForm() {
  emit("queryClick", searchForm)
}

function handleResetForm() {
  formRef.value?.resetFields()
  emit("resetClick")
}
</script>

<style lang="less" scoped>
.user-search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 10px 10px;
    margin-bottom: 0px;
  }
}
</style>
