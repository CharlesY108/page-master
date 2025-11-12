import type { EChartsOption } from 'echarts/types/dist/echarts.d.ts'

const baseLineColor = 'rgba(255,255,255,0.2)'

export const baseXAxis: EChartsOption['xAxis'] = {
  nameTextStyle: {
    color: '#fff',
    fontSize: fitChartSize(12),
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    overflow: 'truncate',
  },
  axisTick: {
    alignWithLabel: true,
    lineStyle: {
      color: 'rgba(255,255,255,0.6)',
      width: fitChartSize(1),
      type: 'solid',
      cap: 'round',
    },
  },
  axisLine: {
    show: true,
    lineStyle: {
      color: baseLineColor,
      width: fitChartSize(1),
      type: 'solid',
      cap: 'round',
    },
  },
  axisLabel: {
    interval: 0,
    show: true,
    fontSize: fitChartSize(12),
    color: 'rgba(255,255,255,0.6)',
    align: 'center',
    overflow: 'truncate',
  },
  splitLine: {
    lineStyle: {
      color: baseLineColor,
      width: fitChartSize(1),
      type: 'solid',
    },
  },
  axisPointer: {
    show: true,
    lineStyle: {
      color: baseLineColor,
      width: fitChartSize(1),
      type: 'solid',
      cap: 'round',
    },
    label: {
      fontSize: fitChartSize(12),
      show: false,
    },
  },
}

export const baseYAxis: EChartsOption['yAxis'] = {
  nameTextStyle: {
    color: '#fff',
    fontSize: fitChartSize(12),
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    overflow: 'truncate',
  },
  axisTick: {
    alignWithLabel: true,
    lineStyle: {
      color: 'rgba(255,255,255,0.6)',
      width: fitChartSize(1),
      type: 'solid',
      cap: 'round',
    },
  },
  axisLine: {
    show: true,
    lineStyle: {
      color: baseLineColor,
      width: fitChartSize(1),
      type: 'solid',
      cap: 'round',
    },
  },
  axisLabel: {
    interval: 0,
    show: true,
    fontSize: fitChartSize(12),
    color: 'rgba(255,255,255,0.6)',
    overflow: 'truncate',
  },
  splitLine: {
    lineStyle: {
      color: baseLineColor,
      width: fitChartSize(1),
      type: 'solid',
    },
  },
  axisPointer: {
    show: true,
    lineStyle: {
      color: baseLineColor,
      width: fitChartSize(1),
      type: 'solid',
      cap: 'round',
    },
    label: {
      backgroundColor: 'transparent',
      fontSize: fitChartSize(12),
    },
  },
}
export const baseOptions: EChartsOption = {
  title: {
    textStyle: {
      color: 'rgba(14,14,14,0.5)',
      fontSize: fitChartSize(18),
      fontWeight: 900,
      overflow: 'truncate',
    },
  },
  legend: {
    show: true,
    top: fitChartSize(6),
    textStyle: {
      color: 'rgba(14,14,14,0.5)',
      fontSize: fitChartSize(12),
    },
    formatter: '{name}',
    padding: fitChartSize(5),
    itemWidth: fitChartSize(25),
    itemHeight: fitChartSize(14),
    itemGap: fitChartSize(10),
  },
  color: ['#3b7ed9', '#5dd5a5', '#5c6f8d', '#5adbf6', '#f1bc18', '#e66453', '#6cc7e6', '#9160b5', '#f79a43', '#9cf613'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        precision: 2,
      },
    },
    textStyle: {
      color: '#000000',
      fontSize: fitChartSize(12),
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      overflow: 'truncate',
    },
  },
  grid: {
    top: fitChartSize(60),
    show: false,
    bottom: fitChartSize(20),
  },
  toolbox: {
    top: fitChartSize(4),
    show: true,
    iconStyle: {
      borderColor: 'rgba(255,255,255,0.8)',
    },
    itemGap: fitChartSize(8),
    itemSize: fitChartSize(15),
    feature: {
      restore: {},
      saveAsImage: {},
    },
  },
}
export const radarOptions: EChartsOption = {
  ...baseOptions,
  radar: {
    axisName: {
      color: '#72ACD1',
      fontSize: fitChartSize(12),
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255,255,255,.0)',
        width: fitChartSize(2),
      },
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(255,255,255,0.2)',
        width: fitChartSize(1),
        type: 'dotted',
      },
    },
    splitArea: {
      areaStyle: {
        color: ['rgba(255,255,255,.1)', 'rgba(255,255,255,0)'],
      },
    },
  },
}
export function fitChartSize(size: number, defaultWidth = 1920) {
  const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (!clientWidth) {
    return size
  }
  const scale = (clientWidth / defaultWidth)
  return Number((size * scale).toFixed(3))
}
