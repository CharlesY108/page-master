<template>
  <div class="app-container">
    <!-- 单井基础数据模块 -->
    <el-card class="module-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>单井基础数据</span>
        </div>
      </template>
      <el-table :data="wellBaseData" border style="width: 100%">
        <el-table-column prop="序号" label="序号" width="80" />
        <el-table-column prop="建设性质" label="建设性质" />
        <el-table-column prop="井型" label="井型" />
        <el-table-column prop="白水井型" label="白水井型" />
        <el-table-column prop="领域分类" label="领域分类" />
        <el-table-column prop="施工队伍" label="施工队伍" />
        <el-table-column prop="区块" label="区块" />
        <el-table-column prop="队号" label="队号" />
        <el-table-column prop="总开钻井深" label="总开钻井深" />
        <el-table-column prop="设计井深" label="设计井深" />
        <el-table-column prop="当前施工月" label="当前施工月" />
        <el-table-column prop="入井液类型" label="入井液类型" />
        <el-table-column prop="完钻周期" label="完钻周期" />
        <el-table-column prop="最终得分" label="最终得分" />
        <el-table-column prop="操作" label="操作">
          <template #default>
            <el-button type="primary" size="small">查看</el-button>
            <el-button type="info" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 单井对比图表模块 -->
    <el-card class="module-card" shadow="hover" style="margin-top: 20px">
      <template #header>
        <div class="card-header">
          <span>单井对比查询</span>
        </div>
      </template>
      <div class="chart-group">
        <div class="chart-item">
          <h4>对比每个区块的单井平均得分率</h4>
          <div ref="scoreRateChart" class="chart-container"></div>
        </div>
        <div class="chart-item">
          <h4>对比每个区块不合格井个数</h4>
          <div ref="unqualifiedChart" class="chart-container"></div>
        </div>
        <div class="chart-item">
          <h4>对比每个区块的每个控制项的平均合格率</h4>
          <div ref="qualifiedRateChart" class="chart-container"></div>
        </div>
      </div>
    </el-card>

    <!-- 单井质量分析模块 -->
    <el-card class="module-card" shadow="hover" style="margin-top: 20px">
      <template #header>
        <div class="card-header">
          <span>单井质量分析</span>
        </div>
      </template>
      <el-table :data="wellQualityData" border style="width: 100%">
        <el-table-column prop="井号" label="井号" />
        <el-table-column prop="井名" label="井名" />
        <el-table-column prop="层位" label="层位" />
        <el-table-column prop="区块" label="区块" />
        <el-table-column prop="施工队伍" label="施工队伍" />
        <el-table-column prop="过程评分" label="过程评分" />
        <el-table-column prop="结果评分" label="结果评分" />
        <el-table-column prop="封固合格率" label="封固合格率" />
        <el-table-column prop="操作" label="操作" width="320px">
          <template #default>
            <el-button type="success" size="small"> 过程权重专家校核 </el-button>
            <el-button type="warning" size="small">模型分析</el-button>
            <el-button type="danger" size="small">专家分析</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

// ---------- 单井基础数据模拟 ----------
const wellBaseData = [
  {
    序号: '1',
    建设性质: '新井-1',
    井型: '一类',
    白水井型: '常规',
    领域分类: '一类',
    施工队伍: '钻井作业1',
    区块: '新中',
    队号: 'JH001-070',
    总开钻井深: '设计6000',
    设计井深: '已完成',
    当前施工月: '3月',
    入井液类型: '79.3',
    完钻周期: '79.3',
    最终得分: '77.34',
  },
  {
    序号: '2',
    建设性质: '新井-2',
    井型: '一类',
    白水井型: '常规',
    领域分类: '一类',
    施工队伍: '钻井作业2',
    区块: '兴垦',
    队号: 'JH001-099',
    总开钻井深: '完钻7300',
    设计井深: '特殊井',
    当前施工月: '2月',
    入井液类型: '79.3',
    完钻周期: '79.3',
    最终得分: '79.34',
  },
  {
    序号: '3',
    建设性质: '新井-3',
    井型: '一类',
    白水井型: '防斜',
    领域分类: '一类',
    施工队伍: '钻井作业3',
    区块: '新中',
    队号: 'JH001-070',
    总开钻井深: '设计6000',
    设计井深: '已完成',
    当前施工月: '3月',
    入井液类型: '79.3',
    完钻周期: '79.3',
    最终得分: '79.34',
  },
  {
    序号: '4',
    建设性质: '新井-4',
    井型: '一类',
    白水井型: '防漏',
    领域分类: '一类',
    施工队伍: '钻井作业4',
    区块: '兴垦',
    队号: 'JH001-099',
    总开钻井深: '完钻7300',
    设计井深: '特殊井',
    当前施工月: '2月',
    入井液类型: '79.3',
    完钻周期: '79.3',
    最终得分: '66.34',
  },
];

// ---------- 单井质量分析模拟 ----------
const wellQualityData = [
  {
    井号: 'S001-1',
    井名: '红123',
    层位: '二类',
    区块: '兴垦1',
    施工队伍: '钻井一队',
    过程评分: '85',
    结果评分: '88',
    封固合格率: '90',
  },
  {
    井号: 'S001-2',
    井名: '红124',
    层位: '三类',
    区块: '兴垦2',
    施工队伍: '钻井二队',
    过程评分: '78',
    结果评分: '82',
    封固合格率: '85',
  },
  {
    井号: 'S001-3',
    井名: '红125',
    层位: '二类',
    区块: '兴垦1',
    施工队伍: '钻井一队',
    过程评分: '90',
    结果评分: '92',
    封固合格率: '95',
  },
];

// ---------- 图表初始化（echarts） ----------
const scoreRateChart = ref(null);   // 单井平均得分率图表
const unqualifiedChart = ref(null); // 不合格井个数图表
const qualifiedRateChart = ref(null); // 完井平均合格率图表

const initCharts = () => {
  // 1. 对比每个区块的单井平均得分率
  const scoreRateInstance = echarts.init(scoreRateChart.value);
  scoreRateInstance.setOption({
    // 柱子显示圆角，圆角大小为10
    barCategoryGap: '80%',
    barGap: '80%',
    barWidth: 25,
    itemStyle: {
      borderRadius: [15, 15, 0, 0],
    },
    xAxis: { type: 'category', data: ['区块A', '区块B', '区块C', '区块D', '区块E', '区块F', '区块G'] },
    yAxis: { type: 'value', name: '得分率(%)' },
    grid: { left: '3%', right: '3%', bottom: '3%', containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    series: [{
      data: [85, 78, 82, 87, 79, 94, 71],
      type: 'bar',
      color: ['#4895ef', '#f9c74f', '#4cc9f0', '#f94144', '#7209b7', '#f9844a', '#4cc9f0'],
    }],
  });

  // 2. 对比每个区块不合格井个数
  const unqualifiedInstance = echarts.init(unqualifiedChart.value);
  unqualifiedInstance.setOption({
    xAxis: { type: 'category', data: ['区块A', '区块B', '区块C', '区块D', '区块E', '区块F', '区块G'] },
    yAxis: { type: 'value', name: '不合格井数' },
    grid: { left: '3%', right: '3%', bottom: '3%', containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    itemStyle: {
      borderRadius: [15, 15, 0, 0],
    },
    series: [{
      data: [2, 3, 1, 5, 7, 2, 9],
      type: 'bar',
      color: ['#e63946', '#f9c74f', '#4cc9f0', '#f94144', '#7209b7', '#f9844a', '#4cc9f0'],
    }],
  });

  // 3. 对比每个区块的每个控制项的平均合格率、
  const block = ['区块A', '区块B', '区块C', '区块D', '区块E', '区块F', '区块G'];
  const controlItem = ['控制项1', '控制项2', '控制项3', '控制项4', '控制项5', '控制项6', '控制项7'];
  const qualifiedRateInstance = echarts.init(qualifiedRateChart.value);
  qualifiedRateInstance.setOption({
    xAxis: { type: 'category', data: block },
    yAxis: { type: 'value', name: '合格率(%)' },
    // 柱子之间的间隔大一点，不要重叠
    // 显示legend
    legend: {
      show: true,
      top: '0%',
      right: '3%',
      selected: {
        '控制项1': true,
        '控制项2': true,
        '控制项3': true,
        '控制项4': true,
        '控制项5': true,
        '控制项6': true,
        '控制项7': true,
      },
    },
    grid: { left: '3%', right: '3%', bottom: '3%', containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    // 取值范围为0-100
    barGap: '80%',
    itemStyle: {
      borderRadius: [15, 15, 0, 0],
    },
    series: controlItem.map(item => ({
      name: item,
      type: 'bar',
      data: block.map((_, index) => index === 0 ? 92 : index === 10 ? 88 : index === 20 ? 85 : index === 30 ? 80 : index === 40 ? 90 : index === 50 ? 86 : index === 60 ? 82 : index === 70 ? 82 : Math.floor(Math.random() * 100)),
      color: ['#4895ef', '#f9c74f', '#4cc9f0', '#f94144', '#7209b7', '#f9844a', '#4cc9f0'][controlItem.indexOf(item)],
    })),
  });
};

onMounted(() => {
  setTimeout(() => {
    initCharts();
  });
});
</script>

<style scoped>
.app-container {
  margin: 0 auto;
  padding: 20px;
}

.module-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.chart-group {
  display: flex;
  gap: 20px;
}

.chart-item {
  flex: 1;
}

.chart-container {
  width: 100%;
  height: 250px;
}
</style>