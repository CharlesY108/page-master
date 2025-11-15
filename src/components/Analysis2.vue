<template>
  <div class="app-container">
    <!-- 单井基础数据模块 -->
    <el-card class="module-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>单井基础数据</span>
        </div>
      </template>
      <!-- 根据 wellBaseData 数据，生成一个查询表单    -->
      <el-form :inline="true" class="filter-form">
        <el-form-item label="井号">
          <el-input v-model="wellNumber" placeholder="请输入井号" />
        </el-form-item>
        <el-form-item label="项目部">
          <el-input v-model="projectDept" placeholder="请输入项目部" />
        </el-form-item>
        <el-form-item label="项目组">
          <el-input v-model="projectGroup" placeholder="请输入项目组" />
        </el-form-item>
        <el-form-item label="区块">
          <el-input v-model="block" placeholder="请输入区块" />
        </el-form-item>
        <el-form-item label="任务类型">
          <el-input v-model="taskType" placeholder="请输入任务类型" />
        </el-form-item>
        <el-form-item label="井别">
          <el-input v-model="wellCategory" placeholder="请输入井别" />
        </el-form-item>
        <el-form-item label="井型">
          <el-input v-model="wellType" placeholder="请输入井型" />
        </el-form-item>
        <el-form-item label="时间段">
          <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="wellBaseData" border style="width: 100%">
        <el-table-column prop="序号" label="序号" />
        <el-table-column prop="井号" label="井号" />
        <el-table-column prop="项目部" label="项目部" />
        <el-table-column prop="项目组" label="项目组" />
        <el-table-column prop="区块" label="区块" />
        <el-table-column prop="队号" label="队号" />
        <el-table-column prop="任务类型" label="任务类型" />
        <el-table-column prop="井别" label="井别" />
        <el-table-column prop="井型" label="井型" />
        <el-table-column prop="完钻日期" label="完钻日期" />
        <el-table-column prop="完钻周期" label="完钻周期" />
        <el-table-column prop="过程评分" label="过程评分" />
        <el-table-column prop="结果评分" label="结果评分" />
        <el-table-column prop="封固合格率" label="封固合格率" />
        <el-table-column prop="不合格红线（总条数）" label="不合格红线（总条数）" />
        <el-table-column prop="操作" label="操作" width="180px" align="center">
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

// 筛选条件
const dateRange = ref([]);
const wellNumber = ref('');
const projectDept = ref('');
const projectGroup = ref('');
const block = ref('');
const teamNumber = ref('');
const taskType = ref('');
const wellCategory = ref('');
const wellType = ref('');

// ---------- 单井基础数据模拟 ----------
const wellBaseData = [
  {
    序号: '1',
    井号: 'S001-1',
    项目部: '项目部1',
    项目组: '项目组1',
    区块: '区块1',
    队号: '队号1',
    任务类型: '任务类型1',
    井别: '井别1',
    井型: '井型1',
    完钻日期: '2021-01-01',
    完钻周期: '100',
    过程评分: '85',
    结果评分: '88',
    封固合格率: '90',
    '不合格红线（总条数）': '10',
  },
  {
    序号: '2',
    井号: 'S001-2',
    项目部: '项目部2',
    项目组: '项目组2',
    区块: '区块2',
    队号: '队号2',
    任务类型: '任务类型2',
    井别: '井别2',
    井型: '井型2',
    完钻日期: '2021-01-02',
    完钻周期: '101',
    过程评分: '86',
    结果评分: '89',
    封固合格率: '91',
    '不合格红线（总条数）': '11',
  },
  {
    序号: '3',
    井号: 'S001-3',
    项目部: '项目部3',
    项目组: '项目组3',
    区块: '区块3',
    队号: '队号3',
    任务类型: '任务类型3',
    井别: '井别3',
    井型: '井型3',
    完钻日期: '2021-01-03',
    完钻周期: '102',
    过程评分: '87',
    结果评分: '90',
    封固合格率: '92',
    '不合格红线（总条数）': '12',
  },
  {
    序号: '4',
    井号: 'S001-4',
    项目部: '项目部4',
    项目组: '项目组4',
    区块: '区块4',
    队号: '队号4',
    任务类型: '任务类型4',
    井别: '井别4',
    井型: '井型4',
    完钻日期: '2021-01-04',
    完钻周期: '103',
    过程评分: '88',
    结果评分: '91',
    封固合格率: '93',
    '不合格红线（总条数）': '13',
  },
  {
    序号: '5',
    井号: 'S001-5',
    项目部: '项目部5',
    项目组: '项目组5',
    区块: '区块5',
    队号: '队号5',
    任务类型: '任务类型5',
    井别: '井别5',
    井型: '井型5',
    完钻日期: '2021-01-05',
    完钻周期: '104',
    过程评分: '89',
    结果评分: '92',
    封固合格率: '94',
    '不合格红线（总条数）': '14',
  },
  {
    序号: '6',
    井号: 'S001-6',
    项目部: '项目部6',
    项目组: '项目组6',
    区块: '区块6',
    队号: '队号6',
    任务类型: '任务类型6',
    井别: '井别6',
    井型: '井型6',
    完钻日期: '2021-01-06',
    完钻周期: '105',
    过程评分: '90',
    结果评分: '93',
    封固合格率: '95',
    '不合格红线（总条数）': '15',
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