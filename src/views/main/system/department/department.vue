<template>
  <div class="department">
    <page-search
      :page-search-config="pageSearchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      ref="contentRef"
      :page-content-config="pageContentConfig"
      @insert-click="handleInsertClick"
      @edit-click="handleEditClick"
    >
      <template #createAt="scope">
        {{ new Date(scope.row.createAt).toLocaleString("zh-TW") }}
      </template>
      <template #updateAt="scope">
        {{ new Date(scope.row.updateAt).toLocaleString("zh-TW") }}
      </template>
    </page-content>
    <page-modal ref="modalRef" :page-modal-config="pageModalConfig"></page-modal>
    <!-- <page-content
      ref="contentRef"
      @insert-click="handleInsertClick"
      @edit-click="handleEditClick"
    /> -->
    <!-- <page-modal ref="modalRef" /> -->
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from "@/components/page-search/page-search.vue"
import PageContent from "@/components/page-content/page-content.vue"
import PageModal from "@/components/page-modal/page-modal.vue"
import { pageSearchConfig } from "@/views/main/system/department/config/pageSearchConfig"
import { pageContentConfig } from "@/views/main/system/department/config/pageContentConfig"
import { pageModalConfig } from "@/views/main/system/department/config/pageModalConfig"
import { ref } from "vue"

const contentRef = ref<InstanceType<typeof PageContent>>()
const modalRef = ref<InstanceType<typeof PageModal>>()

function handleQueryClick(pageName: string, queryInfo: any) {
  contentRef.value?.fecthPageList(pageName, queryInfo)
}

function handleResetClick(pageName: string) {
  contentRef.value?.fecthPageList(pageName)
}

function handleInsertClick(pageName: string) {
  modalRef.value?.handleInsert(pageName)
}

function handleEditClick(pageName: string, itemData: any) {
  modalRef.value?.handleEdit(pageName, itemData)
}
</script>

<style scoped>
.department {
}
</style>
