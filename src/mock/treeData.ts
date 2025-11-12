// 待定改为树形结构
import { getScaleVal } from '../utils/baseUtils.ts'

export interface TreeData {
  id: string
  type: string
  width: number
  height: number
  show: boolean
  viewData?: any
  children?: TreeData[]
}
export const newStepDataOne: TreeData = {
  id: '1',
  type: 'BaseParentNode',
  width: getScaleVal(440.16),
  height: getScaleVal(160.11),
  show: true,
  viewData: {
    title: '配方体系',
    evaluationContent: '包括密度、初始稠度、稠化时间、失水量、游离液、沉降稳定性和抗压强度、相容性实验',
    iconStr: 'formulation',
  },
  children: [
    {
      id: '1-1',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '密度',
      },
      children: [
        {
          id: '1-1-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '密度与配方设计是否一致',
            dataValue: '是',
            status: 0,
            valueRange: '是或否',
          },
        },
      ],
    },
    {
      id: '1-2',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '初始稠度',
      },
      children: [
        {
          id: '1-2-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '初始稠度',
            dataValue: '40Bc',
            status: 1,
            valueRange: '<30Bc',
          },
        },
      ],
    },
    {
      id: '1-3',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '稠化时间',
      },
      children: [
        {
          id: '1-3-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '稠化时间',
            dataValue: '50H',
            status: 0,
            valueRange: '＞注水泥施工时间+安全附加时间',
          },
        },
      ],
    },
    {
      id: '1-4',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '稠化时间',
      },
      children: [
        {
          id: '1-4-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '稠化时间',
            dataValue: '50H',
            status: 1,
            valueRange: '>水泥浆稠化时间',
          },
        },
      ],
    },
    {
      id: '1-5',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '失水量',
      },
      children: [
        {
          id: '1-5-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '表层套管固井',
            dataValue: '100ml',
            status: 1,
            valueRange: '常规密度高强水泥浆体系,≤100ml',
          },
        },
        {
          id: '1-5-2',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '表层套管固井',
            dataValue: '50ml',
            status: 0,
            valueRange: '低密度水泥浆体系,/',
          },
        },
        {
          id: '1-5-3',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '技术套管固井',
            dataValue: '123',
            status: 1,
            valueRange: '领浆<250mL,尾浆<150mL',
          },
        },
        {
          id: '1-5-4',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '技术尾管固井',
            dataValue: '123',
            status: 0,
            valueRange: '领浆<200mL,尾浆<100mL',
          },
        },
        {
          id: '1-5-5',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '油层生成套管、尾管及回接套管固井',
            dataValue: '123',
            status: 1,
            valueRange: '领浆<100mL,尾浆<50mL',
          },
        },
      ],
    },
    {
      id: '1-6',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '游离液',
      },
      children: [
        {
          id: '1-6-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '表层套管固井',
            dataValue: '100ml',
            status: 1,
            valueRange: '常规密度高强水泥浆体系,≤100ml',
          },
        },
        {
          id: '1-6-2',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '技术套管固井',
            dataValue: '123',
            status: 1,
            valueRange: '领浆<250mL,尾浆<150mL',
          },
        },
        {
          id: '1-6-3',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '技术尾管固井',
            dataValue: '123',
            status: 0,
            valueRange: '领浆<200mL,尾浆<100mL',
          },
        },
        {
          id: '1-6-4',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '生产套管、回接套管固井',
            dataValue: '123',
            status: 1,
            valueRange: '领浆=0%，尾浆=0',
          },
        },
        {
          id: '1-6-5',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '大斜度/水平井固井',
            dataValue: '123',
            status: 0,
            valueRange: '45°倾角，领浆=0%，45°倾角，尾浆=0',
          },
        },
      ],
    },
    {
      id: '1-7',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '沉降稳定性',
      },
      children: [
        {
          id: '1-7-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '技术套（尾）管固井',
            dataValue: '100ml',
            status: 1,
            valueRange: '领浆<0.03g/cm3尾浆<0.03g/cm3',
          },
        },
        {
          id: '1-7-2',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '生产套（尾）管、回接套管固井',
            dataValue: '50ml',
            status: 0,
            valueRange: '领浆<0.03g/cm3尾浆<0.02g/cm3',
          },
        },
        {
          id: '1-7-3',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '大斜度/水平井固井',
            dataValue: '123',
            status: 1,
            valueRange: '领浆<0.01g/cm3尾浆<0.01g/cm3',
          },
        },
      ],
    },
    {
      id: '1-8',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '沉降稳定性',
      },
      children: [
        {
          id: '1-8-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '表层套管固井',
            dataValue: '100ml',
            status: 1,
            valueRange: '24h底部水泥石抗压强度>3.5MPa',
          },
        },
        {
          id: '1-8-2',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '技术套管固井',
            dataValue: '50ml',
            status: 0,
            valueRange: '24h底部水泥石抗压强度>14.0MPa',
          },
        },
        {
          id: '1-8-3',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '生产套管固井',
            dataValue: '123',
            status: 1,
            valueRange: '48h顶部水泥石抗压强度>7.0MPa',
          },
        },
        {
          id: '1-8-4',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '大温差、长封固段固井',
            dataValue: '123',
            status: 0,
            valueRange: '24h井底至产层顶部以上200m水泥石抗压强度>14.0MPa',
          },
        },
        {
          id: '1-8-5',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '大温差、长封固段固井',
            dataValue: '123',
            status: 1,
            valueRange: '水泥石抗压强度是否达标',
          },
        },
      ],
    },
  ],
}
const newStepDataTwo: TreeData = {
  id: '2',
  type: 'BaseParentNode',
  width: getScaleVal(440.16),
  height: getScaleVal(160.11),
  show: true,
  viewData: {
    title: '材料准备',
    evaluationContent: `水泥浆材料三证（产品合格证、出厂检验报告、运单）齐全；水泥混拌单与配方的一致性；
          性能检验水泥干混设备具备计重（量）功能，混拌次数满足要求，对成品取样检验
          水泥浆大样的稠化时间，温度、密度敏感性，井下流体相容性等实验数据`,
    iconStr: 'material',
  },
  children: [
    {
      id: '2-1',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '沉降稳定性',
      },
      children: [
        {
          id: '2-1-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '三证（产品合格证、出厂检验报告、运单）是否齐全',
            dataValue: '是',
            status: 0,
            valueRange: '是或否',
          },
        },
      ],
    },
    {
      id: '2-2',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '水泥混拌单与配方的一致性',
      },
      children: [
        {
          id: '2-2-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '水泥混拌单是否与配方一致',
            dataValue: '是',
            status: 0,
            valueRange: '是或否',
          },
        },
      ],
    },
    {
      id: '2-3',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '性能检验',
      },
      children: [
        {
          id: '2-3-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '性能是否与水泥浆配方一致',
            dataValue: '是',
            status: 0,
            valueRange: '是或否',
          },
        },
      ],
    },
    {
      id: '2-4',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '水泥混干设备具备计重功能',
      },
      children: [
        {
          id: '2-4-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '水泥混干设备是否具备计重功能',
            dataValue: '是',
            status: 1,
            valueRange: '是或否',
          },
        },
      ],
    },
    {
      id: '2-5',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '混拌前对混拌缸清理余灰',
      },
      children: [
        {
          id: '2-5-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '混拌前是否对混拌缸清理余灰',
            dataValue: '是',
            status: 1,
            valueRange: '是或否',
          },
        },
      ],
    },
    {
      id: '2-6',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '混拌过程、混拌质量检验有专人负责并可追溯',
      },
      children: [
        {
          id: '2-6-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '是否有专人负责并可追溯',
            dataValue: '是',
            status: 0,
            valueRange: '是或否',
          },
        },
      ],
    },
    {
      id: '2-7',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '混拌次数',
      },
      children: [
        {
          id: '2-7-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '常规固井',
            dataValue: '>3级',
            status: 0,
            valueRange: '取值',
          },
        },
        {
          id: '2-7-2',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '特殊固井',
            dataValue: '>4级',
            status: 0,
            valueRange: '取值',
          },
        },
      ],
    },
    {
      id: '2-8',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '成品取样检验',
      },
      children: [
        {
          id: '2-8-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '性能是否达到水泥浆配方要求',
            dataValue: '否',
            status: 1,
            valueRange: '是或否',
          },
        },
      ],
    },
    {
      id: '2-9',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '井下流体相容性稠化时间（721、111以及73）',
      },
      children: [
        {
          id: '2-9-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '井下流体相容性稠化时间',
            dataValue: '10h',
            status: 1,
            valueRange: '>水泥浆稠化时间',
          },
        },
      ],
    },
    {
      id: '2-10',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '水泥浆大样稠化时间',
      },
      children: [
        {
          id: '2-10-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '领浆稠化时间',
            dataValue: '10h',
            status: 0,
            valueRange: '时间',
          },
        },
        {
          id: '2-10-2',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '尾浆稠化时间',
            dataValue: '10h',
            status: 0,
            valueRange: '取值',
          },
        },
      ],
    },
    {
      id: '2-11',
      type: 'BaseIndicator',
      width: getScaleVal(180),
      height: getScaleVal(68),
      show: true,
      viewData: {
        title: '水泥浆大样密度测试',
      },
      children: [
        {
          id: '2-11-1',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '领浆密度',
            dataValue: '10',
            status: 0,
            valueRange: '密度',
          },
        },
        {
          id: '2-11-2',
          type: 'BaseResult',
          width: getScaleVal(368),
          height: getScaleVal(84),
          show: true,
          viewData: {
            title: '尾浆密度',
            dataValue: '10h',
            status: 0,
            valueRange: '取值',
          },
        },
      ],
    },
  ],
}
const newStepDataThree: TreeData = {
  id: '2',
  type: 'BaseParentNode',
  width: getScaleVal(440.16),
  height: getScaleVal(160.11),
  show: true,
  viewData: {
    title: '材料准备',
    evaluationContent: `水泥浆材料三证（产品合格证、出厂检验报告、运单）齐全；水泥混拌单与配方的一致性；
          性能检验水泥干混设备具备计重（量）功能，混拌次数满足要求，对成品取样检验
          水泥浆大样的稠化时间，温度、密度敏感性，井下流体相容性等实验数据`,
    iconStr: 'material',
  },
  children: [],
}
const newStepDataFour: TreeData = {
  id: '2',
  type: 'BaseParentNode',
  width: getScaleVal(440.16),
  height: getScaleVal(160.11),
  show: true,
  viewData: {
    title: '材料准备',
    evaluationContent: `水泥浆材料三证（产品合格证、出厂检验报告、运单）齐全；水泥混拌单与配方的一致性；
          性能检验水泥干混设备具备计重（量）功能，混拌次数满足要求，对成品取样检验
          水泥浆大样的稠化时间，温度、密度敏感性，井下流体相容性等实验数据`,
    iconStr: 'material',
  },
  children: [],
}
const newStepDataFive: TreeData = {
  id: '2',
  type: 'BaseParentNode',
  width: getScaleVal(440.16),
  height: getScaleVal(160.11),
  show: true,
  viewData: {
    title: '材料准备',
    evaluationContent: `水泥浆材料三证（产品合格证、出厂检验报告、运单）齐全；水泥混拌单与配方的一致性；
          性能检验水泥干混设备具备计重（量）功能，混拌次数满足要求，对成品取样检验
          水泥浆大样的稠化时间，温度、密度敏感性，井下流体相容性等实验数据`,
    iconStr: 'material',
  },
  children: [],
}
const newStepDataSix: TreeData = {
  id: '2',
  type: 'BaseParentNode',
  width: getScaleVal(440.16),
  height: getScaleVal(160.11),
  show: true,
  viewData: {
    title: '材料准备',
    evaluationContent: `水泥浆材料三证（产品合格证、出厂检验报告、运单）齐全；水泥混拌单与配方的一致性；
          性能检验水泥干混设备具备计重（量）功能，混拌次数满足要求，对成品取样检验
          水泥浆大样的稠化时间，温度、密度敏感性，井下流体相容性等实验数据`,
    iconStr: 'material',
  },
  children: [],
}
const newStepDataSeven: TreeData = {
  id: '2',
  type: 'BaseParentNode',
  width: getScaleVal(440.16),
  height: getScaleVal(160.11),
  show: true,
  viewData: {
    title: '材料准备',
    evaluationContent: `水泥浆材料三证（产品合格证、出厂检验报告、运单）齐全；水泥混拌单与配方的一致性；
          性能检验水泥干混设备具备计重（量）功能，混拌次数满足要求，对成品取样检验
          水泥浆大样的稠化时间，温度、密度敏感性，井下流体相容性等实验数据`,
    iconStr: 'material',
  },
  children: [],
}
const newStepDataEight: TreeData = {
  id: '2',
  type: 'BaseParentNode',
  width: getScaleVal(440.16),
  height: getScaleVal(160.11),
  show: true,
  viewData: {
    title: '材料准备',
    evaluationContent: `水泥浆材料三证（产品合格证、出厂检验报告、运单）齐全；水泥混拌单与配方的一致性；
          性能检验水泥干混设备具备计重（量）功能，混拌次数满足要求，对成品取样检验
          水泥浆大样的稠化时间，温度、密度敏感性，井下流体相容性等实验数据`,
    iconStr: 'material',
  },
  children: [],
}
const newStepDataNine: TreeData = {
  id: '2',
  type: 'BaseParentNode',
  width: getScaleVal(440.16),
  height: getScaleVal(160.11),
  show: true,
  viewData: {
    title: '材料准备',
    evaluationContent: `水泥浆材料三证（产品合格证、出厂检验报告、运单）齐全；水泥混拌单与配方的一致性；
          性能检验水泥干混设备具备计重（量）功能，混拌次数满足要求，对成品取样检验
          水泥浆大样的稠化时间，温度、密度敏感性，井下流体相容性等实验数据`,
    iconStr: 'material',
  },
  children: [],
}

export const allStepTreeData = {
  stepDataOne: newStepDataOne,
  stepDataTwo: newStepDataTwo,
  stepDataThree: newStepDataThree,
  stepDataFour: newStepDataFour,
  stepDataFive: newStepDataFive,
  stepDataSix: newStepDataSix,
  stepDataSeven: newStepDataSeven,
  stepDataEight: newStepDataEight,
  stepDataNine: newStepDataNine,

}
export type StepName = keyof typeof allStepTreeData

export const stepNameById: { [key: string]: StepName } = {
  1: 'stepDataOne',
  2: 'stepDataTwo',
  3: 'stepDataThree',
  4: 'stepDataFour',
  5: 'stepDataFive',
  6: 'stepDataSix',
  7: 'stepDataSeven',
  8: 'stepDataEight',
  9: 'stepDataNine',
}
export function findNode(id: string, stepName: StepName) {
  const ids = id.split('-')
  const parentId = `${ids[0]}-${ids[1]}`
  const treeData = allStepTreeData[stepName]
  treeData.children?.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        child.children = []
      })
    }
  })
  const parentNode = treeData.children!.find((item) => {
    return item.id === parentId
  })
  const curNode = parentNode!.children?.find((item) => {
    return item.id === id
  })
  return curNode
}
