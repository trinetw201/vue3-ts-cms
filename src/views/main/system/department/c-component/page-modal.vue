<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" :title="isEdit ? '編輯部門' : '新增部門'" width="40%" center>
      <div class="form">
        <el-form ref="formRef" :model="formData" size="large">
          <el-form-item label="部門名稱" prop="name" label-width="100px">
            <el-input v-model="formData.name" placeholder="請輸入部門名稱"></el-input>
          </el-form-item>
          <el-form-item label="部門主管" prop="leader" label-width="100px">
            <el-input v-model="formData.leader" placeholder="請輸入部門主管"></el-input>
          </el-form-item>
          <el-form-item label="上級部門" prop="parentId" label-width="100px">
            <el-select
              v-model="formData.parentId"
              clearable
              placeholder="請選擇上級部門"
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
import type { Department } from "@/types/login"
import { reactive, ref } from "vue"

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const formData = reactive({
  name: "",
  leader: "",
  parentId: undefined as undefined | number,
})
const departmentList = ref<Department[] | null>()
const useSystem = useSystemStore()
const isEdit = ref(false)
const editId = ref<number | undefined>(undefined)

useSystem.getDepartmentListAction().then((res) => (departmentList.value = res))

//新增用戶
function handleInsert() {
  isEdit.value = false
  dialogVisible.value = true
}

function handleConfirmClick(formRef: FormInstance | undefined) {
  if (isEdit.value) {
    useSystem.editPageAction("department", editId.value, formData).then((res) => {
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
    useSystem.insertPageAction("department", formData).then((res) => {
      if (res) {
        dialogVisible.value = false
        if (formRef) formRef.resetFields()
        ElMessage({
          message: "新增成功",
          type: "success",
        })
      } else {
        ElMessage.error("新增失敗")
      }
    })
  }
}

function handleCancelClick(formRef: FormInstance | undefined) {
  if (!formRef) return
  formRef.resetFields()
  dialogVisible.value = false
}

function handleEdit(itemData: any) {
  isEdit.value = true
  dialogVisible.value = true
  editId.value = itemData.id
  // 遍歷 ob2 的屬性
  for (const key in formData) {
    // 檢查 userItem是否也包含這個 key
    if (Object.prototype.hasOwnProperty.call(itemData, key)) {
      ;(formData as any)[key] = (itemData as any)[key]
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

defineExpose({ handleInsert, handleEdit })
</script>

<style lang="less" scoped>
.user-modal {
  .form {
    padding: 0px 20px;
  }
}
</style>
