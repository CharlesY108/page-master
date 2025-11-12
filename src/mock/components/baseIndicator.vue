<script setup lang="ts">
import type { Node } from '@antv/x6'
import { ElTooltip } from 'element-plus'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { inject } from 'vue'
import { nextTick } from 'vue'

defineOptions({
  name: 'BaseIndicator',
})

const title = ref('')
const messageInfo = ref<HTMLElement>()
const showTip = ref(false)
onMounted(() => {
  const getNode = inject('getNode') as () => Node
  if (getNode) {
    const node = getNode() as any
    const data = node.store.data.viewData
    title.value = data.title
  }
  nextTick(() => {
    showToolTip()
  })
})
// 优化显示，文本溢出才会有tooltip
function showToolTip() {
  if (!messageInfo.value) {
    return
  }
  const range = document.createRange()
  const offsetWidth = messageInfo.value?.offsetWidth
  range.selectNode(messageInfo.value)
  const width = range.getBoundingClientRect().width
  if (offsetWidth < width) {
    showTip.value = true
  }
  else {
    showTip.value = false
  }
}
</script>

<template>
  <div class="base-indicator">
    <ElTooltip v-if="showTip" class="message" effect="dark" :content="title" placement="top" append-to="body">
      <div class="message-info">
        <span>{{ title }}</span>
      </div>
    </ElTooltip>
    <div v-else ref="messageInfo" class="message-info">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-indicator {
  width: 200px;
  display: inline-flex;
  align-items: center;
  padding: 10px;
  font-size: 20px;
  color: #736477;
  height: 70px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px #8989f8;

  .message-info {
    flex: auto;
    padding-top: 4px;
    font-weight: 900;
    font-size: 20px;
    vertical-align: center;
    margin-left: 4px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
  }
}
</style>
