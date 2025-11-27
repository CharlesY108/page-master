<template>
  <div class="dashboard-container">
    <!-- 顶部栏 -->
    <header class="top-bar">
      <div class="logo-area">
        <img src="../assets/indexlogo.png" alt="logo" class="logo" />
        <span class="company-name">XX公司钻探XX地区固井公司</span>
        <span class="system-name">固井全流程管控平台</span>
        <span class="notice-badge">20</span>
      </div>
      <div class="top-menu">
        <img src="../assets/index1.png" alt="" class="menu-img" />
        <a href="#" class="menu-item">数字XX地区固井</a>
        <img src="../assets/index2.png" alt="" class="menu-img" />
        <a href="#" class="menu-item">XX公司EISC</a>
        <img src="../assets/index3.png" alt="" class="menu-img" />
        <a href="#" class="menu-item">创新论坛</a>
        <img src="../assets/index4.png" alt="" class="menu-img" />
        <img src="../assets/index5.png" alt="" class="menu-img" />
        <div class="user-area">
          <img src="../assets/index6.png" alt="user" class="user-avatar" />
          <span class="user-name">管理员</span>
        </div>
      </div>
    </header>

    <!-- 主体：侧边栏 + 内容区 -->
    <div class="main-content">
      <!-- 侧边导航 -->
      <aside class="sidebar">
        <router-link v-for="item in menuItems" :key="item.name" :to="item.path" class="menu-item1"
          :class="{ active: $route.name === item.name }">
          <div>
            <img :src="$route.name === item.name ? item.activeIcon : item.icon" alt="" class="menu-img" />
          </div>
          <div>{{ item.label }}</div>
        </router-link>
      </aside>

      <!-- 动态内容区 -->
      <main class="content-area">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const getImageUrl = (name) => {
  return new URL(`../assets/${name}`, import.meta.url).href
}

const menuItems = ref([
  {
    name: 'Home',
    path: '/',
    label: '首页',
    icon: getImageUrl('index7.png'),
    activeIcon: getImageUrl('index7-active.png')
  },
  {
    name: 'Quality',
    path: '/quality',
    label: '质量结果',
    icon: getImageUrl('index8.png'),
    activeIcon: getImageUrl('index8-active.png')
  },
  {
    name: 'Process',
    path: '/process',
    label: '流程控制',
    icon: getImageUrl('index9.png'),
    activeIcon: getImageUrl('index9-active.png')
  },
  {
    name: 'Analysis',
    path: '/analysis',
    label: '智能分析',
    icon: getImageUrl('index10.png'),
    activeIcon: getImageUrl('index10-active.png')
  },
  {
    name: 'Standard',
    path: '/standard',
    label: '标准规范',
    icon: getImageUrl('index11.png'),
    activeIcon: getImageUrl('index11-active.png')
  },
  {
    name: 'Metrics',
    path: '/metrics',
    label: '要素指标',
    icon: getImageUrl('index12.png'),
    activeIcon: getImageUrl('index12-active.png')
  }
])
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Microsoft Yahei', sans-serif;
  background-color: #f5f7fa;
}

/* 顶部栏样式 */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0c4ca2;
  color: #fff;
  padding: 0 20px;
  height: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-area {
  display: flex;
  align-items: center;
}

.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.company-name {
  font-size: 24px;
  font-weight: bold;
  margin-right: 30px;
}

.system-name {
  font-size: 24px;
  font-weight: bold;
}

.notice-badge {
  background-color: #ff0000;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-left: 10px;
}

.top-menu {
  display: flex;
  align-items: center;
}

.menu-img {
  height: 35px;
  margin: 0 10px;
}

.menu-item {
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  margin: 0 15px;
}

.user-area {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.user-avatar {
  height: 45px;
  margin-right: 10px;
}

.user-name {
  font-size: 14px;
}

/* 主体布局 */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 侧边栏 */
.sidebar {
  width: 110px;
  padding: 20px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
}

.menu-item1 {
  width: 90px;
  height: 80px;
  background-color: white;
  margin: 8px 0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  color: #0c4ca2;
  user-select: none;
  text-decoration: none;
}

.menu-item1:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.menu-item1.active {
  background-color: #0c4ca2;
  color: white;
  box-shadow: 0 4px 12px rgba(74, 110, 224, 0.4);
}

.menu-item1:active {
  transform: translateY(1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 内容区域 */
.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f7fa;
}
</style>