<script setup lang="ts">
import type { StepName } from './treeData.ts'
import { createNodes } from './createNodes.ts'
import { ref, onMounted, nextTick, watch } from 'vue'

const iconList = [
  {
    id: 1,
    icon: 'formulation',
    title: '配方体系',
    activeName: 'first',
    stepName: 'stepDataOne',
  },
  {
    id: 2,
    icon: 'material',
    title: '材料准备',
    activeName: 'second',
    stepName: 'stepDataTwo',
  },
  {
    id: 3,
    icon: 'experiment',
    title: '入井流体实验',
    activeName: 'third',
    stepName: 'stepDataThree',
  },
  {
    id: 4,
    icon: 'construction',
    title: '固井施工设计',
    activeName: 'fourth',
    stepName: 'stepDataFour',
  },
  {
    id: 5,
    icon: 'condition',
    title: '井眼条件',
    activeName: 'fifth',
    stepName: 'stepDataFive',
  },
  {
    id: 6,
    icon: 'workrecord',
    title: '下套管作业',
    activeName: 'sixth',
    stepName: 'stepDataSix',
  },
  {
    id: 7,
    icon: 'prepare',
    title: '固井施工准备',
    activeName: 'seventh',
    stepName: 'stepDataSeven',
  },
  {
    id: 8,
    icon: 'gujing',
    title: '固井施工',
    activeName: 'eighth',
    stepName: 'stepDataEight',
  },
  {
    id: 9,
    icon: 'geology',
    title: '复杂地质条件',
    activeName: 'ninth',
    stepName: 'stepDataNine',
  },
]

defineOptions({
  name: 'NewQueryResult',
})
const props = defineProps({
  showType: {
    type: Number,
    default: 0,
  },
})
let renderNode: any
const activeValue = ref<StepName>('stepDataTwo')
const container = ref<HTMLElement>()

onMounted(() => {
  nextTick(() => {
    renderNode = createNodes(container.value!, props.showType, activeValue.value).render
  })
})
watch(() => props.showType, () => {
  renderNode(undefined, props.showType)
})
watch(activeValue, () => {
  renderNode = createNodes(container.value!, props.showType, activeValue.value).render
})
</script>

<template>
  <div class="wrapper">
    <el-radio-group v-model="activeValue" size="large">
      <el-radio-button v-for="(item, index) in iconList" :key="index" :value="item.stepName" border>
        <template #default>
          <div class="radio-button">
            <div class="right">
              <span :style="{ color: activeValue === item.stepName ? '#fff' : '#000' }">{{ item.title }}</span>
              <span>不合格数量：5</span>
            </div>
          </div>
        </template>
      </el-radio-button>
    </el-radio-group>
    <el-divider />
    <div id="container" ref="container" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;

  .radio-button {
    display: flex;
    align-items: center;

    .left {
      font-size: 60px;
    }

    .right {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      span {
        &:nth-child(1) {
          font-size: 18px;
          font-weight: 900;
          color: #9d9c9c;
          margin-bottom: 10px;
        }

        &:nth-child(2) {
          font-size: 16px;
          font-weight: 900;
          color: #fc2a2a;
        }
      }
    }
  }

  .el-radio-group {
    width: 100%;
    flex-wrap: nowrap;

    .el-radio-button {
      flex: 1;

      ::v-deep(.el-radio-button__inner) {
        width: 100%;
      }

      &:nth-child(1) {
        ::v-deep(.el-radio-button__inner) {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
      }

      &:last-child {
        ::v-deep(.el-radio-button__inner) {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }
  }
}

#container {
  width: 100%;
  height: 900px;
}
</style>
