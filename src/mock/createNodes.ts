import type { Cell } from '@antv/x6'
import { Graph, Path } from '@antv/x6'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Selection } from '@antv/x6-plugin-selection'
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import Hierarchy from '@antv/hierarchy'
import { register } from '@antv/x6-vue-shape'
import { cloneDeep } from 'lodash'
import { getScaleVal } from '../utils/baseUtils.ts'
import BaseParentNode from './components/baseParentNode.vue'
import BaseIndicator from './components/baseIndicator.vue'
import BaseResult from './components/baseResult.vue'
import type { StepName, TreeData } from './treeData.ts'
import { allStepTreeData } from './treeData.ts'
import BaseRedLine from './components/baseRedLine.vue'
import BaseText from './components/baseText.vue'
import mitt from '../utils/eventBus.ts'

let graph: Graph
const offset = {
  x: 0,
  y: 0,
}
interface MindMapData {
  id: string
  type: string
  width: number
  height: number
  label?: string
  viewData?: any
  children?: MindMapData[]
}

interface HierarchyResult {
  width: number
  height: number
  id: string
  x: number
  y: number
  data: MindMapData
  children?: HierarchyResult[]
}
export function createNodes(container: HTMLElement, showType: number, stepName: StepName) {
  if (graph) {
    graph.dispose()
    if (allStepTreeData[stepName]) {
      allStepTreeData[stepName].children?.forEach((item) => {
        if (item.children) {
          item.children.forEach((child) => {
            child.children = []
          })
        }
      })
    }
  }
  // BaseParentNode
  register({
    shape: 'BaseParentNode',
    width: getScaleVal(440.16),
    height: getScaleVal(160.11),
    component: BaseParentNode,
  })

  // BaseIndicator
  register({
    shape: 'BaseIndicator',
    width: getScaleVal(180),
    height: getScaleVal(68),
    component: BaseIndicator,
  })
  register({
    shape: 'BaseResult',
    width: getScaleVal(368),
    height: getScaleVal(84),
    component: BaseResult,
  })
  register({
    shape: 'BaseRedLine',
    width: getScaleVal(368),
    height: getScaleVal(100),
    component: BaseRedLine,
  })
  register({
    shape: 'BaseText',
    width: getScaleVal(460),
    height: getScaleVal(30),
    component: BaseText,
  })
  // 连接器
  Graph.registerConnector('mindmap', (sourcePoint, targetPoint, routerPoints, options) => {
    const midX = sourcePoint.x + 10
    const midY = sourcePoint.y
    const ctrX = (targetPoint.x - midX) / 5 + midX
    const ctrY = targetPoint.y
    const pathData = `
     M ${sourcePoint.x} ${sourcePoint.y}
     L ${midX} ${midY}
     Q ${ctrX} ${ctrY} ${targetPoint.x} ${targetPoint.y}
    `
    return options.raw ? Path.parse(pathData) : pathData
  },
    true,
  )

  // 边
  Graph.registerEdge('mindmap-edge', {
    inherit: 'edge',
    connector: {
      name: 'mindmap',
    },
    attrs: {
      line: {
        targetMarker: '',
        stroke: '#A2B1C3',
        strokeWidth: 2,
      },
    },
    zIndex: 0,
  },
    true,
  )
  graph = new Graph({
    container: container!,
    scaling: {
      min: 0.5,
      max: 2,
    },
    panning: {
      enabled: true,
      eventTypes: ['leftMouseDown', 'mouseWheel'],
    },
    mousewheel: {
      enabled: true,
      modifiers: 'ctrl',
      factor: 0.8,
      maxScale: 1.5,
      minScale: 0.1,
    },
    connecting: {
      connectionPoint: 'anchor',
    },
  })
  graph.zoom(-0.28)
  graph.use(new Selection())
  graph.use(new Keyboard())

  function render(id: string | undefined, showType: number) {
    const showData = getShowData(allStepTreeData[stepName], showType)
    const result: HierarchyResult = Hierarchy.compactBox(showData, {
      direction: 'H',
      getHeight(d: MindMapData) {
        return d.height
      },
      getWidth(d: MindMapData) {
        return d.width
      },
      getHGap() {
        return 80
      },
      getVGap() {
        return 20
      },
      getSide: () => {
        return 'right'
      },
    })
    const cells: Cell[] = []
    const traverse = (hierarchyItem: HierarchyResult) => {
      if (hierarchyItem) {
        const { data, children } = hierarchyItem
        cells.push(
          graph.createNode({
            id: data.id,
            shape: data.type,
            x: hierarchyItem.x,
            y: hierarchyItem.y,
            width: data.width,
            height: data.height,
            type: data.type,
            label: data.label,
            viewData: data.viewData,
          }),
        )
        if (children) {
          children.forEach((item: HierarchyResult) => {
            const { id } = item
            cells.push(
              graph.createEdge({
                shape: 'mindmap-edge',
                source: {
                  cell: hierarchyItem.id,
                  anchor: {
                    name: 'right',
                    args: {
                      dx: 2,
                    },
                  },
                },
                target: {
                  cell: id,
                  anchor: {
                    name: 'left',
                  },
                },
              }),
            )
            traverse(item)
          })
        }
      }
    }
    traverse(result)
    graph.resetCells(cells)
    graph.centerContent()
    if (id) {
      const ids = id.split('-')
      const parentId = `${ids[0]}-${ids[1]}`
      const parentNode = result.children?.find(item => item.id === parentId)
      if (!parentNode || !parentNode.children) {
        return
      }
      const index = parentNode.children.findIndex(item => item.id === id)

      const currentNode = parentNode.children[index]
      if (index === -1) {
        return
      }
      let offsetNodeY = 0
      if (index > 0) {
        const preNode = parentNode.children[index - 1]
        offsetNodeY = currentNode.y - preNode.y
      }
      const nodeCenterX = currentNode.x + currentNode.width / 2
      const nodeCenterY = currentNode.y + currentNode.height / 2

      // 获取画布当前的平移量和缩放比例
      // const { tx, ty } = graph.transform.getTranslation()
      const { sx, sy } = graph.transform.getScale()
      // 获取画布视图的中心坐标
      const container = graph.container
      const viewCenterX = container.clientWidth / 2
      const viewCenterY = container.clientHeight / 2

      // 考虑当前画布的偏移和缩放，计算平移量
      const dx = viewCenterX - nodeCenterX
      const dy = viewCenterY - nodeCenterY + offsetNodeY
      // 平移画布并重置偏移量
      setTimeout(() => {
        graph.translate(dx * sx, dy * sy)
      })
    }
  }
  render(undefined, showType)
  mitt.on('baseResultClick', (data: { id: string }) => {
    render(data.id, 1)
  })
  // 监听画布平移（滚动）事件
  graph.on('translate', ({ tx, ty }) => {
    console.log(`画布已缩放，当前缩放比例: x = ${tx}, y = ${ty}`)
    offset.x = tx
    offset.y = ty
  })

  // 缩放待定
  graph.on('scale', ({ sx, sy }) => {
    console.log(`画布已缩放，当前缩放比例: x = ${sx}, y = ${sy}`)
  })

  return {
    render,
  }
}

function getShowData(treeData: TreeData, showType: number) {
  const showTreeData = cloneDeep(treeData)
  if (showTreeData.children) {
    showTreeData.children.forEach((item) => {
      if (item.children) {
        item.children = item.children.filter((item) => {
          if (showType === 2) {
            return true
          }
          return item.viewData.status === showType
        })
      }
    })
    showTreeData.children = showTreeData.children.filter((item) => {
      return item.children && item.children.length > 0
    })
  }
  return showTreeData
}
