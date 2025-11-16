export const colorByNumber = (value, min, max) => {
  const clampedValue = Math.max(min, Math.min(max, value))
  const ratio = (clampedValue - min) / (max - min)
  const red = Math.round(ratio * 255)
  const blue = Math.round((1 - ratio) * 255)
  const green = 0 // 绿色分量设置为0，保证为红蓝渐变
  return '#' +
    red.toString(16).padStart(2, '0') +
    green.toString(16).padStart(2, '0') +
    blue.toString(16).padStart(2, '0')
}
