<template>
  <div class="department">
    <page-search
      :search-form-item="searchFormItem"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :page-content-config="pageContentConfig"
      @insert-click="handleInsertClick"
      @edit-click="handleEditClick"
    />
    <!-- <page-content
      ref="contentRef"
      @insert-click="handleInsertClick"
      @edit-click="handleEditClick"
    /> -->
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from "@/components/page-search/page-search.vue"
import PageContent from "@/components/page-content/page-content.vue"
import PageModal from "@/views/main/system/department/c-component/page-modal.vue"
import { searchFormItem } from "@/views/main/system/department/config/pageSearchConfig"
import { pageContentConfig } from "@/views/main/system/department/config/pageContentConfig"
import { ref } from "vue"

const contentRef = ref<InstanceType<typeof PageContent>>()
const modalRef = ref<InstanceType<typeof PageModal>>()

function handleQueryClick(queryInfo: any) {
  contentRef.value?.fecthPageList(queryInfo)
}

function handleResetClick() {
  contentRef.value?.fecthPageList()
}

function handleInsertClick() {
  modalRef.value?.handleInsert()
}

function handleEditClick(itemData: any) {
  modalRef.value?.handleEdit(itemData)
}
</script>

<style scoped>
.department {
}
</style>
