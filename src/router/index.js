import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Main from '../components/Main.vue'

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../components/Home.vue'),
        meta: { title: '首页' }
      },
      {
        path: '/quality',
        name: 'Quality',
        component: () => import('../components/Quality.vue'),
        meta: { title: '质量结果' }
      },
      {
        path: '/process',
        name: 'Process',
        component: () => import('../components/Process.vue'),
        meta: { title: '流程控制' }
      },
      {
        path: '/analysis',
        name: 'Analysis',
        component: () => import('../components/Analysis.vue'),
        meta: { title: '智能分析' }
      },
      {
        path: '/standard',
        name: 'Standard',
        component: () => import('../components/Standard.vue'),
        meta: { title: '标准规范' }
      },
      {
        path: '/metrics',
        name: 'Metrics',
        component: () => import('../components/Metrics.vue'),
        meta: { title: '要素指标' }
      }
    ]
  }
]

const router = createRouter({
  // 用 createWebHistory，会导致 GitHub Pages 空白
  history: createWebHashHistory(import.meta.env.BASE_URL), // 改为 hash 模式（关键）
  routes
})

// 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - 固井全流程管控平台'
  }
  next()
})

export default router