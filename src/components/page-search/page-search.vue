<template>
  <div class="page-search">
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <template v-for="formItem in pageSearchConfig.searchFormItem" :key="formItem.prop">
          <template v-if="formItem.type === 'input'">
            <el-col :span="8">
              <el-form-item :label="formItem.label" :prop="formItem.prop">
                <el-input
                  :placeholder="formItem.placeholder"
                  v-model="searchForm[formItem.prop]"
                ></el-input>
              </el-form-item>
            </el-col>
          </template>
          <template v-if="formItem.type === 'datePicker'">
            <el-col :span="10">
              <el-form-item :label="formItem.label" :prop="formItem.prop">
                <el-config-provider :locale="zhTw">
                  <el-date-picker
                    v-model="searchForm[formItem.prop]"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="開始時間"
                    end-placeholder="結束時間"
                    size="large"
                  />
                </el-config-provider>
              </el-form-item>
            </el-col>
          </template>
        </template>
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
import type { PageSearchConfig, SearchForm } from "./page-search"

const props = defineProps<{
  pageSearchConfig: PageSearchConfig
}>()

const initialForm: SearchForm = {}
for (const value of props.pageSearchConfig.searchFormItem) {
  initialForm[value.prop] = value.initialValue ?? undefined
}
const searchForm = reactive<SearchForm>(initialForm)

const formRef = ref<InstanceType<typeof ElForm>>()

const emit = defineEmits(["queryClick", "resetClick"])

function handleQueryForm() {
  emit("queryClick", props.pageSearchConfig.pageName, searchForm)
}

function handleResetForm() {
  formRef.value?.resetFields()
  emit("resetClick", props.pageSearchConfig.pageName)
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
