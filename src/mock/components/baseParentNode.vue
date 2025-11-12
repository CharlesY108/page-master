<script setup lang="ts">
import type { Node } from '@antv/x6'
import { ElTooltip } from 'element-plus'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { inject } from 'vue'
import { nextTick } from 'vue'

defineOptions({
  name: 'BaseParentNode',
})

const title = ref('密度与配方设计是否一致')
const evaluationContent = ref('')
const iconStr = ref('')
const messageRef = ref<HTMLElement>()
const showTip = ref(false)

onMounted(() => {
  const getNode = inject('getNode') as () => Node
  if (getNode) {
    const node = getNode() as any
    const data = node.store.data.viewData
    title.value = data.title
    evaluationContent.value = data.evaluationContent
    iconStr.value = data.iconStr
  }
  nextTick(() => {
    showToolTip()
  })
})

function showToolTip() {
  if (!messageRef.value) {
    return
  }
  const el = messageRef.value
  const range = document.createRange()
  range.setStart(el, 0)
  range.setEnd(el, el.childNodes.length)
  let rangeWidth = range.getBoundingClientRect().width
  let rangeHeight = range.getBoundingClientRect().height
  const offsetWidth = rangeWidth - Math.floor(rangeWidth)
  const offsetHeight = rangeHeight - Math.floor(rangeHeight)
  if (offsetWidth < 0.001) {
    rangeWidth = Math.floor(rangeWidth)
  }
  if (offsetHeight < 0.001) {
    rangeHeight = Math.floor(rangeHeight)
  }
  // 计算元素在页面中的宽度、高度
  const style: CSSStyleDeclaration = window.getComputedStyle(el, null)
  const maxWidth = Number.parseInt(style.width) || 0
  const maxHeight = Number.parseInt(style.height)
  // 获取元素的padding
  const pLeft = style.paddingLeft
  const pRight = style.paddingRight
  const pTop = style.paddingTop
  const pBottom = style.paddingBottom
  // 计算最终宽度、高度
  const finalWidth = rangeWidth + Number.parseInt(pLeft) + Number.parseInt(pRight)
  const finalHeight = rangeHeight + Number.parseInt(pTop) + Number.parseInt(pBottom)
  // 溢出需要展示
  if (finalWidth > maxWidth || finalHeight > maxHeight) {
    showTip.value = true
  }
  else {
    showTip.value = false
  }
}
</script>

<template>
  <div class="base-wrapper">
    <div class="wrapper-left">
      <div class="bottom">
        {{ title }}
      </div>
    </div>
    <div>
      <div class="wrapper-right">
        <p>评价内容</p>
        <ElTooltip v-if="showTip" class="message" effect="dark" :content="evaluationContent" placement="top"
          append-to="body">
          <p class="message-info">
            {{ evaluationContent }}
          </p>
        </ElTooltip>
        <p v-else ref="messageRef" class="message-info">
          {{ evaluationContent }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-wrapper {
  display: flex;
  box-shadow: 1px 1px 10px #8989f8;
  padding: 10px;
  border-radius: 10px;
  width: 440px;
  height: 160px;
  justify-content: space-between;
  align-items: center;
}

.wrapper-left {
  width: 140px;
  font-size: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 2px solid #736477;
  padding: 0 10px;

  .top {}

  .bottom {
    font-weight: 900;
    font-size: 20px;
    color: #736477;
  }
}

.wrapper-right {
  width: 280px;
  display: flex;
  flex-direction: column;
  padding: 4px 10px;

  p {
    margin: 2px;
    font-weight: 900;
    font-size: 20px;
    color: #736477;
  }

  .message-info {
    font-size: 14px;
    color: #736477;
    font-weight: 900;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
  }
}
</style>
