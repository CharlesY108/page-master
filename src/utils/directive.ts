import type { App } from 'vue'
import { ElTooltip } from 'element-plus'

export default function directive(app: App) {
  // 注册 v-auth 和 v-auth-all 指令
  app.directive('auth', {
    mounted: (el, binding) => {
      if (!useAuth().auth(binding.value)) {
        el.remove()
      }
    },
  })
  app.directive('auth-all', {
    mounted: (el, binding) => {
      if (!useAuth().authAll(binding.value)) {
        el.remove()
      }
    },
  })
  // v-show-tool-tip 文本溢出提示
  app.directive('show-tool-tip', {
    mounted(el) {
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
        const toolTipRootId = 'tool-tip-root-id'
        const toolTipRoot = document.querySelector(`#${toolTipRootId}`)
        if (toolTipRoot) {
          toolTipRoot.remove()
        }
        const toolTipDiv = document.createElement('div')
        toolTipDiv.id = toolTipRootId
        document.body.append(toolTipDiv)
        const toolTipHtml = `
        <div style="width: ${finalWidth}px;">
            <p>${el.innerHTML}</p>
        </div>
      `
        const elToolTip = createApp(ElTooltip, {
          'raw-content': true,
          'content': toolTipHtml,
          'trigger': 'hover',
          'virtual-ref': el,
          'virtual-triggering': true,
        })
        elToolTip.mount(toolTipDiv)
      }
    },
    beforeUnmount() {
      const toolTipRootId = 'tool-tip-root-id'
      const toolTipRoot = document.querySelector(`#${toolTipRootId}`)
      if (toolTipRoot) {
        toolTipRoot.remove()
      }
    },
  })
}
