<template>
  <!-- el-tabs 标签页 -->
  <el-tabs v-model="activeName" type="card" class="analysis-tabs">
    <el-tab-pane label="固井质量分析" name="first">
      <Analysis1 v-if="activeName === 'first'" />
    </el-tab-pane>
    <el-tab-pane label="单井质量与过程控制" name="second">
      <Analysis2 v-if="activeName === 'second'" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref } from 'vue';
const activeName = ref('first');
import Analysis1 from './Analysis1.vue';
import Analysis2 from './Analysis2.vue';

</script>

<style scoped lang="less">
.analysis-tabs {
  width: 100%;
  height: 100%;
  overflow: auto;

  :deep(.el-tabs__content) {
    overflow: overlay;
  }

  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }

  :deep(.el-tabs__item) {
    font-size: 16px;
    font-weight: 600;
  }

  :deep(.el-tabs__active-bar) {
    display: none;
  }

  :deep(.el-tabs__item.is-active) {
    color: #409EFF;
    background-color: #fff;
  }

  :deep(.el-tabs__item:hover) {
    color: #409EFF;
    background-color: #fff;
  }

  :deep(.el-tabs__item.is-active:hover) {
    color: #409EFF;
    background-color: #fff;
  }
}
</style>