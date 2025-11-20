<template>
  <div class="main-header">
    <div class="menu-icon">
      <el-icon size="30px" @click="handleIconClick">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadCrumb">
        <HeaderBreadCrumb />
      </div>
      <div class="info">
        <HeaderInfo />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderInfo from "@/components/main-header/c-component/header-info.vue"
import HeaderBreadCrumb from "@/components/main-header/c-component/header-bread-crumb.vue"
import { ref } from "vue"
const isFold = ref(false)
const emit = defineEmits(["foldChange"])
function handleIconClick() {
  isFold.value = !isFold.value
  emit("foldChange", isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 0 auto;

  .menu-icon {
    display: flex;
    align-items: center;
    margin-right: 5px;
    cursor: pointer;
  }

  .content {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    .breadCrumb {
      flex-grow: 1;
    }
  }
}
</style>
