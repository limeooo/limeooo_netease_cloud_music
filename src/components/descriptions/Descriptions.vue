<template>
  <div class="description">
    <el-descriptions :title="title" :column="column" border>
      <template v-for="(item, index) in tableData" :key="index">
        <el-descriptions-item>
          <template #label> {{ item.name }} </template>
          <span class="content">{{ item.value }}</span>
          <!-- <el-tag size="small">{{ item.value }}</el-tag> -->
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import { IDescription } from '@/global/types'

withDefaults(
  defineProps<{
    title?: string
    column?: number
    tableData: IDescription[]
  }>(),
  {
    title: '',
    column: 1
  }
)
</script>

<style lang="less" scoped>
.description {
  margin-bottom: 20px;
  :deep(.el-descriptions__title) {
    font-size: @font-size;
  }
  :deep(.el-descriptions__label) {
    font-size: @font-size-sm-medium;
  }
  // :deep(.el-tag__content) {
  //   font-size: @font-size-sm;
  // }
  .content {
    color: var(--font-color);
    font-size: @font-size-sm-medium;
  }
}
</style>
