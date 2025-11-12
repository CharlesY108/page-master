<script setup lang="ts">
import type { Node } from '@antv/x6'
import { findNode, stepNameById } from '../treeData.ts'
import { getScaleVal } from '../../utils/baseUtils.ts'
import mitt from '../../utils/eventBus.ts'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { inject } from 'vue'

defineOptions({
  name: 'BaseResult',
})
const title = ref('密度与配方设计是否一致')
const dataValue = ref('是')
// 0 达标 1 未达标
const status = ref(0)
const valueRange = ref('是（1）或否（0）')
const id = ref('')
const stepName = ref('')
const titleList = {
  four: {
    title: '4.固井水泥返高未达到设计值，且低于设计段长大于50米',
    detail: [
      '(1)二开井生产套管固井水泥设计返高和实际返高应至地面或表层套管内',
      '(2)设计返高至地面的，按照水泥返高低于设计值长度不超过 50 米进行判定',
      '(3)设计返高至表层套管内的(至少返至表层套管鞋200米以上)，应提供表层套管固井质量评价声幅图，按照水泥返高不低于设计返高进行判定',
      '(4)受地质条件限制，设计返高无法返至表层套管内的，应提供地质、设计、施工等相关资料和表层套管固井质量评价声幅图,并确保返至第一个油气水层顶界 200 米以上按照水泥返高不低于设计返高进行判定',
      '(5)二开井侧钻采用尾管悬挂固井的，水泥返高不低于悬挂器顶部进行判定',
    ],
  },
  five: {
    title: '5.生产套管固井质量在油气水层段、尾管重合段、上层套管鞋处、上层套管分级箍处及其以上25m环空范围内，固井水泥一、二界面胶结质量未达到连续胶结中等及以上',
    detail: [
      '(1)油气层及其以上25m,厚度小于1米的胶结差井段不进行判定',
      '(2)在油气层内胶结质量差累计段长小于油气层本身厚度的 30%，且胶结质量差井段(尖峰)以上和以下25m内不存在水层、水淹层、含油水层、含气水层，可判定为合格',
      '(3)在油气层以上25m 范围内累计胶结质量差井段小于 3m，且胶结质量差井段(尖峰)以上或者以下25m内不存在水层、水淹层、含油水层、含气水层，可判定为合格',
      '(4)在水层内胶结质量差累计段长小于水层本身厚度的30%,在水层以上25m范围内累计胶结质量差井段小于3m，可判定为合格',
      '(5)水平井的水平段不按该条红线判定',
    ],
  },
  six: {
    title: '6.全井固井水泥环一、二界面胶结质量中等以上井段长度低于封固井段长度 70%的',
    detail: [
      '(1)水平井:水平段的固井水泥环一、二界面胶结质量中等以上长度也应大于水平段长度的 70%',
    ],
  },
  seven: {
    title: '7.入井套管质量或固井用水泥及外加剂质量不合格的:或固井后套管柱试压不合格的',
    detail: [
      '以上四项有任一项不满足要求则判定为固井质量不合格',
    ],
  },
}
onMounted(() => {
  const getNode = inject('getNode') as () => Node
  if (getNode) {
    const node = getNode() as any
    id.value = node.id
    stepName.value = stepNameById[node.id.split('-')[0]]
    const data = node.store.data.viewData
    title.value = data.title
    dataValue.value = data.dataValue
    status.value = data.status
    valueRange.value = data.valueRange
  }
})

function showRedLine() {
  if (status.value === 0) {
    return
  }
  const node = findNode(id.value, stepName.value)
  if (node?.children && node.children.length > 0) {
    node!.children = []
  }
  else {
    node!.children = Object.keys(titleList).map((item, index) => {
      const parentId = `${id.value}-${index + 1}`
      return {
        id: parentId,
        type: 'BaseRedLine',
        width: getScaleVal(368),
        height: getScaleVal(100),
        show: true,
        viewData: {
          title: titleList[item as (keyof typeof titleList)].title,
        },
        children: titleList[item as (keyof typeof titleList)].detail.map((msg, msgId) => {
          return {
            id: `${parentId}-${msgId}`,
            type: 'BaseText',
            width: getScaleVal(460),
            height: getScaleVal(30),
            show: true,
            viewData: {
              title: msg,
            },
          }
        }),
      }
    })
  }
  mitt.emit('baseResultClick', { id: id.value })
}
</script>

<template>
  <div class="base-result" @click="showRedLine">
    <div class="left-wrapper">
      <p class="message">
        <span class="message-title">{{ title }}: </span>
        <span class="message-value">{{ dataValue }}</span>
      </p>
      <div class="bottom">
        <span>取值范围：{{ valueRange }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-result {
  cursor: pointer !important;
  display: inline-flex;
  align-items: center;
  padding: 10px;
  font-size: 30px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px #8989f8;

  .left-wrapper {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 300px;

    .message {
      width: 100%;
      margin: 0 0 0 20px;
      font-size: 20px;
      font-weight: 900;
      color: #736477;
      border-bottom: 1px dotted #736477;
      text-align: center;
      padding: 10px 0;
      display: inline-flex;
      justify-content: center;

      .message-title {
        color: #736477;
        max-width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
      }

      .message-value {
        font-size: 20px;
        margin-left: 2px;
        font-weight: 900;
        color: #3385ff;
      }
    }

    .bottom {
      padding-top: 4px;
      width: 100%;
      text-align: center;
      font-size: 14px;
      font-weight: 900;
      color: #f6350c;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 100%;
    }
  }

  .right-wrapper {
    .icon-type {
      font-size: 30px;
      margin-left: 20px;
    }
  }
}
</style>
