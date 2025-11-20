<template>
  <div class="user-content">
    <div class="top">
      <h2 class="title">用戶列表</h2>
      <el-button type="primary" @click="handleInsertUserClick">新增用戶</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="index" label="序號" width="55" />
        <el-table-column align="center" prop="name" label="用戶名" width="100" />
        <el-table-column align="center" prop="realname" label="真實性名" width="100" />
        <el-table-column align="center" prop="cellphone" label="手機號碼" width="125" />
        <el-table-column align="center" label="狀態" width="70">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-tag size="small" v-if="scope.row.enable" type="success">啟用</el-tag>
              <el-tag size="small" v-else type="danger">禁用</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="創建時間">
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
              @click="handleDeleteUser(scope.row.id)"
              >刪除</el-button
            >
          </template>
        </el-table-column>
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
          :total="usersTotalCount"
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

const useSystem = useSystemStore()
const emit = defineEmits(["insertClick", "editClick"])
//分頁
const currentPage = ref(1)
const pageSize = ref(10)
fecthUsersList()

const { usersList, usersTotalCount } = storeToRefs(useSystem)

function handleSizeChange() {
  fecthUsersList()
}
function handleCurrentChange() {
  fecthUsersList()
}

function fecthUsersList(formData: any = []) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  useSystem.postUsersListAction(queryInfo)
}

//點擊事件
function handleInsertUserClick() {
  emit("insertClick")
}

//刪除事件
function handleDeleteUser(id: number) {
  ElMessageBox.confirm("請確認是否要刪除用戶", "刪除用戶", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  }).then(() => {
    useSystem.deleteUserAction(id).then((res) => {
      if (res) {
        ElMessage({
          message: "刪除用戶成功",
          type: "success",
        })
      } else {
        ElMessage.error("刪除用戶失敗")
      }
    })
  })
}

//編輯事件
function handleEditUser(userItem: UserItem) {
  emit("editClick", userItem)
}

defineExpose({ fecthUsersList })
</script>

<style lang="less" scoped>
.user-content {
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
