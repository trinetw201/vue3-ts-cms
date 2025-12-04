<template>
  <div class="page-content">
    <div class="top">
      <h2 class="title">{{ props.pageContentConfig.header?.title ?? "列表" }}</h2>
      <el-button type="primary" @click="handleInsertClick">{{
        props.pageContentConfig.header?.btnTitle ?? "新增"
      }}</el-button>
    </div>
    <div class="table">
      <el-table v-loading="loading" :data="pageList" border style="width: 100%">
        <template v-for="item in props.pageContentConfig.tableColumn" :key="item.prop">
          <el-table-column align="center" v-bind="item" />
        </template>

        <!-- <el-table-column align="center" label="創建時間">
          <template #default="scope">
            {{ new Date(scope.row.createAt).toLocaleString("zh-TW") }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新時間">
          <template #default="scope">
            {{ new Date(scope.row.updateAt).toLocaleString("zh-TW") }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              icon="Edit"
              text
              @click="handleEditUser(scope.row)"
              >編輯</el-button
            >
            <el-button
              size="small"
              type="danger"
              icon="Delete"
              text
              @click="handleDelete(scope.row.id)"
              >刪除</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="pagination">
      <el-config-provider :locale="zhTw">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30]"
          size="large"
          layout="sizes,prev, pager, next, jumper,total"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-config-provider>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from "@/store/main/system/system"
import zhTw from "element-plus/es/locale/lang/zh-tw"
import { ElMessage, ElMessageBox } from "element-plus"
import { storeToRefs } from "pinia"
import { ref } from "vue"
import type { UserItem } from "@/types/main/system/system"
import type { PageContentConfig } from "./page-content"

const props = defineProps<{
  pageContentConfig: PageContentConfig
}>()

const useSystem = useSystemStore()
const emit = defineEmits(["insertClick", "editClick"])
const loading = ref(true)
//分頁
const currentPage = ref(1)
const pageSize = ref(10)
fecthPageList()

const { pageList, totalCount } = storeToRefs(useSystem)

function handleSizeChange() {
  fecthPageList()
}
function handleCurrentChange() {
  fecthPageList()
}

function fecthPageList(queryInfo: any = []) {
  loading.value = true
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const query = { ...pageInfo, ...queryInfo }
  useSystem.postPageListAction("department", query).finally(() => {
    loading.value = false
  })
}

//點擊事件
function handleInsertClick() {
  emit("insertClick")
}

//刪除事件
function handleDelete(id: number) {
  ElMessageBox.confirm("請確認是否要刪除", "刪除", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  }).then(() => {
    useSystem.deletePageAction("department", id).then((res) => {
      if (res) {
        ElMessage({
          message: "刪除成功",
          type: "success",
        })
      } else {
        ElMessage.error("刪除失敗")
      }
    })
  })
}

//編輯事件
function handleEditUser(userItem: UserItem) {
  emit("editClick", userItem)
}

defineExpose({ fecthPageList })
</script>

<style lang="less" scoped>
.page-content {
  background-color: #fff;
  margin-top: 15px;
  padding: 20px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
  }
  .table {
    .el-button {
      margin-left: 0px;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
  }
}
</style>
