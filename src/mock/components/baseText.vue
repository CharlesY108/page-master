<script setup lang="ts">
import type { Node } from '@antv/x6'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { inject } from 'vue'

defineOptions({
  name: 'BaseText',
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
  <div class="base-text">
    {{ title }}
  </div>
</template>

<style scoped lang="scss">
.base-text {
  font-size: 18px;
  font-weight: 900;
  color: #fc5858;
  border-bottom: 2px #365dfa dashed;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
}
</style>
