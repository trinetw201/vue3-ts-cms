<template>
  <div class="user">
    <UserSearch @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <UserContent ref="contentRef" @insert-click="handleInsertClick" @edit-click="handleEditClick" />
    <UserModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import UserSearch from "@/views/main/system/user/c-component/user-search.vue"
import UserModal from "@/views/main/system/user/c-component/user-modal.vue"
import UserContent from "@/views/main/system/user/c-component/user-content.vue"
import { ref } from "vue"
import type { UserItem } from "@/types/main/system/system"

const contentRef = ref<InstanceType<typeof UserContent>>()
const modalRef = ref<InstanceType<typeof UserModal>>()

function handleQueryClick(formData: any) {
  contentRef.value?.fecthUsersList(formData)
}

function handleResetClick() {
  contentRef.value?.fecthUsersList()
}

function handleInsertClick() {
  modalRef.value?.handleInsertUser()
}

function handleEditClick(userItem: UserItem) {
  modalRef.value?.handleEditUser(userItem)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
