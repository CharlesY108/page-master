export function statistics(data: any[], keyWord: string, content: any) {
  const keys = Object.keys(content)
  const list = []
  const res = data.reduce((previousValue, currentValue) => {
    for (const key of keys) {
      if (currentValue[keyWord] === key) {
        previousValue[key] += 1
      }
    }
    return previousValue
  }, content)
  for (const key of keys) {
    list.push(res[key])
  }
  return list
}

export function getMergeValueList(data: any[]) {
  const merge: { row: number, col: number, rowspan: number, colspan: number }[] = []
  function addMerge(row: number, col: number, rowspan: number, colspan: number) {
    merge.push({ row, col, rowspan, colspan })
  }
  // 合并标准来源
  let lastValue = data[0].actualValue
  let startRow = 0
  for (let i = 1; i < data.length; i++) {
    if (data[i].actualValue !== lastValue) {
      const rowspan = i - startRow
      if (rowspan > 1) {
        addMerge(startRow, 4, rowspan, 1)
      }
      lastValue = data[i].actualValue
      startRow = i
    }
  }
  // 添加最后一个合并单元格
  const lastRowspan = data.length - startRow
  if (lastRowspan > 1) {
    addMerge(startRow, 5, lastRowspan, 1)
  }

  // Vertical merge logic for 'indicatorName'
  let lastIndicator = data[0].indicatorName
  let indicatorStart = 0
  for (let i = 1; i <= data.length; i++) {
    if (i === data.length || data[i].indicatorName !== lastIndicator) {
      if (i - indicatorStart > 1) {
        let lastSpecificName = data[indicatorStart].specificName
        let specificNameStart = indicatorStart
        for (let j = indicatorStart + 1; j < i; j++) {
          if (j === i - 1 || data[j].specificName !== lastSpecificName) {
            if (j - specificNameStart > 1) {
              addMerge(specificNameStart, 2, j - specificNameStart, 1)
              lastSpecificName = data[j].specificName
              specificNameStart = j
            }
            else {
              lastSpecificName = data[j].specificName
              specificNameStart = j
            }
          }
        }
        addMerge(indicatorStart, 1, i - indicatorStart, 1)
      }
      if (i < data.length) {
        lastIndicator = data[i].indicatorName
        indicatorStart = i
      }
    }
  }

  // Horizontal merge logic for 'valueRange_1' and 'valueRange_2'
  for (let i = 0; i < data.length; i++) {
    const { valueRange_1, valueRange_2 } = data[i]
    if (valueRange_1 === '/' && valueRange_2 === '/') {
      addMerge(i, 2, 1, 3)
    }
    else if (valueRange_1 === '/') {
      addMerge(i, 2, 1, 2)
    }
    else if (valueRange_2 === '/') {
      addMerge(i, 3, 1, 2)
    }
  }

  return merge
}

export function fullScreen(docElm: HTMLElement) {
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen()
  }
}
export function getScaleVal(size: number, defaultWidth = 1920) {
  const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (!clientWidth) {
    return size
  }
  const scale = (clientWidth / defaultWidth)
  return Number((size * scale).toFixed(3))
}
