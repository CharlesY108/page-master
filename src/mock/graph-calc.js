export const graphCalc = {
  categories: [
    {
      name: '顶点',
      itemStyle: {
        color: '#FF38ff'
      }
    },
    {
      name: '主类别',
      itemStyle: {
        color: '#FF3333'
      }
    },
    {
      name: '子项',
      itemStyle: {
        color: '#B3E0FF'
      }
    }
  ],
  nodes: [
    {
      id: '权重指标',
      type: '顶点',
      value: '权重指标图谱',
      symbolSize: 20,
      label: {
        show: true
      },
      itemStyle: {
        color: '#FF38ff'
      },
      category: 0,
      name: '权重指标 (权重指标图谱)'
    },
    {
      id: '入井流体实验',
      type: '主类别',
      value: 0.183,
      symbolSize: 18.3,
      label: {
        show: true
      },
      itemStyle: {
        color: '#FF3333'
      },
      category: 1,
      name: '入井流体实验 (0.183)'
    },
    {
      id: '井眼条件',
      type: '主类别',
      value: 0.189,
      symbolSize: 18.9,
      label: {
        show: true
      },
      itemStyle: {
        color: '#FF3333'
      },
      category: 1,
      name: '井眼条件 (0.189)'
    },
    {
      id: '下套管作业',
      type: '主类别',
      value: 0.084,
      symbolSize: 8.4,
      label: {
        show: true
      },
      itemStyle: {
        color: '#FF3333'
      },
      category: 1,
      name: '下套管作业 (0.084)'
    },
    {
      id: '固井施工',
      type: '主类别',
      value: 0.341,
      symbolSize: 34.1,
      label: {
        show: true
      },
      itemStyle: {
        color: '#FF3333'
      },
      category: 1,
      name: '固井施工 (0.341)'
    },
    {
      id: '水泥浆返高',
      type: '主类别',
      value: 0.203,
      symbolSize: 20.3,
      label: {
        show: true
      },
      itemStyle: {
        color: '#FF3333'
      },
      category: 1,
      name: '水泥浆返高 (0.203)'
    },
    {
      id: '水泥浆稠化时间',
      type: '子项',
      value: 0.411,
      symbolSize: 4.11,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '水泥浆稠化时间 (0.411)'
    },
    {
      id: '初始稠度',
      type: '子项',
      value: 0.136,
      symbolSize: 1.36,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '初始稠度 (0.136)'
    },
    {
      id: '水泥石抗压强度(24h)',
      type: '子项',
      value: 0.349,
      symbolSize: 3.49,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '水泥石抗压强度(24h) (0.349)'
    },
    {
      id: '水泥浆静置后上下密度差',
      type: '子项',
      value: 0.104,
      symbolSize: 1.04,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '水泥浆静置后上下密度差 (0.104)'
    },
    {
      id: '环空上返速度',
      type: '子项',
      value: 0.121,
      symbolSize: 1.21,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '环空上返速度 (0.121)'
    },
    {
      id: '钻井液循环周次',
      type: '子项',
      value: 0.084,
      symbolSize: 0.84,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '钻井液循环周次 (0.084)'
    },
    {
      id: '进出口密度差',
      type: '子项',
      value: 0.093,
      symbolSize: 0.93,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '进出口密度差 (0.093)'
    },
    {
      id: '上窜速度',
      type: '子项',
      value: 0.041,
      symbolSize: 0.41,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '上窜速度 (0.041)'
    },
    {
      id: '固井前钻井液塑性粘度',
      type: '子项',
      value: 0.148,
      symbolSize: 1.48,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '固井前钻井液塑性粘度 (0.148)'
    },
    {
      id: '钻头-套管尺寸（环空间隙）',
      type: '子项',
      value: 0.135,
      symbolSize: 1.35,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '钻头-套管尺寸（环空间隙） (0.135)'
    },
    {
      id: '井径扩大率',
      type: '子项',
      value: 0.378,
      symbolSize: 3.78,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '井径扩大率 (0.378)'
    },
    {
      id: '套管居中度',
      type: '子项',
      value: 0.541,
      symbolSize: 5.41,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '套管居中度 (0.541)'
    },
    {
      id: '人工井底距油层底界',
      type: '子项',
      value: 0.264,
      symbolSize: 2.64,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '人工井底距油层底界 (0.264)'
    },
    {
      id: '油井阻流环与浮鞋间距',
      type: '子项',
      value: 0.195,
      symbolSize: 1.95,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '油井阻流环与浮鞋间距 (0.195)'
    },
    {
      id: '前置液体积量占裸眼环空高度',
      type: '子项',
      value: 0.0581,
      symbolSize: 0.581,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '前置液体积量占裸眼环空高度 (0.0581)'
    },
    {
      id: '前置液紊流接触时间',
      type: '子项',
      value: 0.0745,
      symbolSize: 0.745,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '前置液紊流接触时间 (0.0745)'
    },
    {
      id: '浆柱密度差',
      type: '子项',
      value: 0.0431,
      symbolSize: 0.431,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '浆柱密度差 (0.0431)'
    },
    {
      id: '隔离液在循环温度下，动塑比',
      type: '子项',
      value: 0.0325,
      symbolSize: 0.325,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '隔离液在循环温度下，动塑比 (0.0325)'
    },
    {
      id: '隔离液滤失量',
      type: '子项',
      value: 0.024,
      symbolSize: 0.24,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '隔离液滤失量 (0.024)'
    },
    {
      id: '水泥浆密度记录偏差',
      type: '子项',
      value: 0.0479,
      symbolSize: 0.479,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '水泥浆密度记录偏差 (0.0479)'
    },
    {
      id: '测量记录间隔',
      type: '子项',
      value: 0.0311,
      symbolSize: 0.311,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '测量记录间隔 (0.0311)'
    },
    {
      id: '中停时间',
      type: '子项',
      value: 0.0795,
      symbolSize: 0.795,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '中停时间 (0.0795)'
    },
    {
      id: '施工参数（排量、压力、水泥浆密度、注入量等）记录',
      type: '子项',
      value: 0.0341,
      symbolSize: 0.341,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '施工参数（排量、压力、水泥浆密度、注入量等）记录 (0.0341)'
    },
    {
      id: '注水泥浆量、泵注排量符合设计要求',
      type: '子项',
      value: 0.0756,
      symbolSize: 0.756,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '注水泥浆量、泵注排量符合设计要求 (0.0756)'
    },
    {
      id: '胶塞入井',
      type: '子项',
      value: 0.0727,
      symbolSize: 0.727,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '胶塞入井 (0.0727)'
    },
    {
      id: '替量符合固井施工设计要求',
      type: '子项',
      value: 0.103,
      symbolSize: 1.03,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '替量符合固井施工设计要求 (0.103)'
    },
    {
      id: '顶替过程连续',
      type: '子项',
      value: 0.0705,
      symbolSize: 0.705,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '顶替过程连续 (0.0705)'
    },
    {
      id: '压力有监控记录',
      type: '子项',
      value: 0.0205,
      symbolSize: 0.205,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '压力有监控记录 (0.0205)'
    },
    {
      id: '排量有监控记录',
      type: '子项',
      value: 0.0235,
      symbolSize: 0.235,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '排量有监控记录 (0.0235)'
    },
    {
      id: '井口返出情况有监控记录',
      type: '子项',
      value: 0.0282,
      symbolSize: 0.282,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '井口返出情况有监控记录 (0.0282)'
    },
    {
      id: '碰压',
      type: '子项',
      value: 0.063,
      symbolSize: 0.63,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '碰压 (0.063)'
    },
    {
      id: '无碰压现象，顶替量－设计顶替量',
      type: '子项',
      value: 0.0691,
      symbolSize: 0.691,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '无碰压现象，顶替量－设计顶替量 (0.0691)'
    },
    {
      id: '小排量碰压，碰压附加值',
      type: '子项',
      value: 0.033,
      symbolSize: 0.33,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '小排量碰压，碰压附加值 (0.033)'
    },
    {
      id: '下胶塞清水静压穿透压力',
      type: '子项',
      value: 0.0161,
      symbolSize: 0.161,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '下胶塞清水静压穿透压力 (0.0161)'
    },
    {
      id: '表层套管',
      type: '子项',
      value: 0.144,
      symbolSize: 1.44,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '表层套管 (0.144)'
    },
    {
      id: '技术套管',
      type: '子项',
      value: 0.281,
      symbolSize: 2.81,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '技术套管 (0.281)'
    },
    {
      id: '生产套管',
      type: '子项',
      value: 0.575,
      symbolSize: 5.75,
      label: {
        show: true
      },
      itemStyle: {
        color: '#B3E0FF'
      },
      category: 2,
      name: '生产套管 (0.575)'
    }
  ],
  links: [
    {
      source: '权重指标',
      target: '入井流体实验',
      relationship: '包含'
    },
    {
      source: '权重指标',
      target: '井眼条件',
      relationship: '包含'
    },
    {
      source: '权重指标',
      target: '下套管作业',
      relationship: '包含'
    },
    {
      source: '权重指标',
      target: '固井施工',
      relationship: '包含'
    },
    {
      source: '权重指标',
      target: '水泥浆返高',
      relationship: '包含'
    },
    {
      source: '入井流体实验',
      target: '水泥浆稠化时间',
      relationship: '包含'
    },
    {
      source: '入井流体实验',
      target: '初始稠度',
      relationship: '包含'
    },
    {
      source: '入井流体实验',
      target: '水泥石抗压强度(24h)',
      relationship: '包含'
    },
    {
      source: '入井流体实验',
      target: '水泥浆静置后上下密度差',
      relationship: '包含'
    },
    {
      source: '井眼条件',
      target: '环空上返速度',
      relationship: '包含'
    },
    {
      source: '井眼条件',
      target: '钻井液循环周次',
      relationship: '包含'
    },
    {
      source: '井眼条件',
      target: '进出口密度差',
      relationship: '包含'
    },
    {
      source: '井眼条件',
      target: '上窜速度',
      relationship: '包含'
    },
    {
      source: '井眼条件',
      target: '固井前钻井液塑性粘度',
      relationship: '包含'
    },
    {
      source: '井眼条件',
      target: '钻头-套管尺寸（环空间隙）',
      relationship: '包含'
    },
    {
      source: '井眼条件',
      target: '井径扩大率',
      relationship: '包含'
    },
    {
      source: '下套管作业',
      target: '套管居中度',
      relationship: '包含'
    },
    {
      source: '下套管作业',
      target: '人工井底距油层底界',
      relationship: '包含'
    },
    {
      source: '下套管作业',
      target: '油井阻流环与浮鞋间距',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '前置液体积量占裸眼环空高度',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '前置液紊流接触时间',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '浆柱密度差',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '隔离液在循环温度下，动塑比',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '隔离液滤失量',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '水泥浆密度记录偏差',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '测量记录间隔',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '中停时间',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '施工参数（排量、压力、水泥浆密度、注入量等）记录',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '注水泥浆量、泵注排量符合设计要求',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '胶塞入井',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '替量符合固井施工设计要求',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '顶替过程连续',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '压力有监控记录',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '排量有监控记录',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '井口返出情况有监控记录',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '碰压',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '无碰压现象，顶替量－设计顶替量',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '小排量碰压，碰压附加值',
      relationship: '包含'
    },
    {
      source: '固井施工',
      target: '下胶塞清水静压穿透压力',
      relationship: '包含'
    },
    {
      source: '水泥浆返高',
      target: '表层套管',
      relationship: '包含'
    },
    {
      source: '水泥浆返高',
      target: '技术套管',
      relationship: '包含'
    },
    {
      source: '水泥浆返高',
      target: '生产套管',
      relationship: '包含'
    }
  ]
}
