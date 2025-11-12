<script setup lang="ts">
import type { Node } from '@antv/x6'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { inject } from 'vue'

defineOptions({
  name: 'BaseRedLine',
})
const title = ref('')
onMounted(() => {
  const getNode = inject('getNode') as () => Node
  if (getNode) {
    const node = getNode() as any
    const data = node.store.data.viewData
    title.value = data.title
  }
})
</script>

<template>
  <div class="base-red-line">
    <div class="message">
      {{ title }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-red-line {
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 1px 1px 10px #8989f8;
  font-size: 20px;
  padding: 10px;
  font-weight: 900;
  align-items: center;

  .message {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
  }
}
</style>
