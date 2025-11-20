<template>
  <div class="user-modal">
    <el-dialog v-model="dialogVisible" :title="isEdit ? '編輯用戶' : '新增用戶'" width="40%" center>
      <div class="form">
        <el-form ref="formRef" :model="formData" size="large">
          <el-form-item label="用戶名" prop="name" label-width="100px">
            <el-input v-model="formData.name" placeholder="請輸入用戶名"></el-input>
          </el-form-item>
          <el-form-item label="真實姓名" prop="realname" label-width="100px">
            <el-input v-model="formData.realname" placeholder="請輸入真實姓名"></el-input>
          </el-form-item>
          <el-form-item v-if="!isEdit" label="密碼" prop="password" label-width="100px">
            <el-input
              v-model="formData.password"
              type="password"
              placeholder="請輸入密碼"
            ></el-input>
          </el-form-item>
          <el-form-item label="手機號碼" prop="cellphone" label-width="100px">
            <el-input
              type="number"
              v-model.number="formData.cellphone"
              placeholder="請輸入手機號碼"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role" label-width="100px">
            <el-select v-model="formData.roleId" placeholder="請選擇角色" style="width: 240px">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="部門" prop="department" label-width="100px">
            <el-select
              v-model="formData.departmentId"
              placeholder="請選擇角色"
              style="width: 240px"
            >
              <el-option
                v-for="item in departmentList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCancelClick(formRef)">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick(formRef)">確定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from "@/store/main/system/system"
import { ElMessage, type FormInstance } from "element-plus"
import type { Department, Role } from "@/types/login"
import type { InsertUserData, UserItem } from "@/types/main/system/system"
import { reactive, ref } from "vue"

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const formData: InsertUserData = reactive<InsertUserData>({
  name: "",
  realname: "",
  password: "",
  cellphone: undefined,
  roleId: undefined,
  departmentId: undefined,
})
const roleList = ref<Role[] | undefined>()
const departmentList = ref<Department[] | undefined>()
const useSystem = useSystemStore()
const isEdit = ref(false)
const editId = ref<number | undefined>(undefined)

Promise.all([useSystem.getRoleListAction(), useSystem.getDepartmentListAction()]).then((res) => {
  roleList.value = res[0]
  departmentList.value = res[1]
})

//新增用戶
function handleInsertUser() {
  isEdit.value = false
  dialogVisible.value = true
}
function handleConfirmClick(formRef: FormInstance | undefined) {
  if (isEdit.value) {
    useSystem.editUserAction(editId.value, formData).then((res) => {
      if (res) {
        dialogVisible.value = false
        if (formRef) formRef.resetFields()
        ElMessage({
          message: "編輯用戶成功",
          type: "success",
        })
      } else {
        ElMessage.error("編輯用戶失敗")
      }
    })
  } else {
    useSystem.insertUserAction(formData).then((res) => {
      if (res) {
        dialogVisible.value = false
        if (formRef) formRef.resetFields()
        ElMessage({
          message: "新增用戶成功",
          type: "success",
        })
      } else {
        ElMessage.error("新增用戶失敗")
      }
    })
  }
}

function handleCancelClick(formRef: FormInstance | undefined) {
  if (!formRef) return
  formRef.resetFields()
  dialogVisible.value = false
}

function handleEditUser(userItem: UserItem) {
  isEdit.value = true
  dialogVisible.value = true
  editId.value = userItem.id
  // 遍歷 ob2 的屬性
  for (const key in formData) {
    // 檢查 userItem是否也包含這個 key
    if (Object.prototype.hasOwnProperty.call(userItem, key)) {
      // 如果有，使用 userItem 的值覆蓋
      ;(formData as any)[key] = (userItem as any)[key]
    }
  }
  console.log(formData)
  // formData.name = userItem.name
  // formData.realname = userItem.realname
  // formData.password = ""
  // formData.cellphone = userItem.cellphone
  // formData.roleId = userItem.roleId
  // formData.departmentId = userItem.departmentId
}

defineExpose({ handleInsertUser, handleEditUser })
</script>

<style lang="less" scoped>
.user-modal {
  .form {
    padding: 0px 20px;
  }
}
</style>
