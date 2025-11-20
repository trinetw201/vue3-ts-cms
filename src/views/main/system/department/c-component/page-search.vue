<template>
  <div class="page-search">
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部門名稱" prop="name">
            <el-input placeholder="請輸入查詢部門名稱" v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部門主管" prop="leader">
            <el-input placeholder="請輸入查詢部門主管" v-model="searchForm.leader"></el-input>
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

const searchForm = reactive({
  name: "",
  leader: "",
  createAt: undefined,
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
.page-search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 10px 10px;
    margin-bottom: 0px;
  }
}
</style>
