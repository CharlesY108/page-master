<template>
  <!-- 将原来的 content 区域内容复制到这里 -->
  <div class="content">
    <!-- 左列 - 宽度 1fr -->
    <div class="left-column">
      <!-- 固井流程节点管控预警 -->
      <section class="panel panel_1">
        <div class="panel-header">
          <img src="../assets/index13.png" alt="" class="panel-icon" />
          <h3 class="panel-title">固井流程节点管控预警</h3>
        </div>
        <div class="chart-container">
          <canvas id="processNodeChart"></canvas>
        </div>
      </section>

      <!-- 重点项目管控预警 -->
      <section class="panel panel_1">
        <div class="panel-header">
          <img src="../assets/index13.png" alt="" class="panel-icon" />
          <h3 class="panel-title">重点项目管控预警</h3>
        </div>
        <div class="tab-header">
          <button v-for="dept in departments" :key="dept" class="tab-btn" :class="{ active: activeDept === dept }"
            @click="switchDepartment(dept)">
            {{ dept }}</button>
        </div>
        <div class="table-container">
          <table class="data-table compact-table">
            <thead>
              <tr>
                <th>单位</th>
                <th>预警(项)</th>
                <th>处理合格(项)</th>
                <th>合格率(%)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in currentProjectData" :key="item.unit">
                <td>{{ item.unit }}</td>
                <td>{{ item.warning }}</td>
                <td>{{ item.handled }}</td>
                <td :class="{ 'highlight-red': item.rate < 100 }">{{ item.rate }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 一类井升级管控井预警 -->
      <section class="panel panel_1">
        <div class="panel-header">
          <img src="../assets/index13.png" alt="" class="panel-icon" />
          <h3 class="panel-title">一类井升级管控井预警</h3>
        </div>
        <div class="tab-header">
          <button v-for="dept in wellDepartments" :key="dept" class="tab-btn"
            :class="{ active: activeWellDept === dept }" @click="switchWellDepartment(dept)">
            {{ dept }}</button>
        </div>
        <div class="table-container">
          <table class="data-table compact-table">
            <thead>
              <tr>
                <th>单位</th>
                <th>井号</th>
                <th>预警(项)</th>
                <th>处理合格(项)</th>
                <th>合格率(%)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in currentWellData" :key="item.wellNo">
                <td>{{ item.unit }}</td>
                <td>{{ item.wellNo }}</td>
                <td>{{ item.warning }}</td>
                <td>{{ item.handled }}</td>
                <td :class="{ 'highlight-red': item.rate < 100 }">{{ item.rate }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <!-- 中列 - 宽度 2fr -->
    <div class="middle-column">
      <!-- 今日生产动态 -->
      <section class="panel panel_2">
        <div class="tab-header">
          <button class="tab-btn" :class="{ active: activeProductionTab === 'dynamic' }"
            @click="switchProductionTab('dynamic')">
            今日生产动态
          </button>
          <button class="tab-btn" :class="{ active: activeProductionTab === 'control' }"
            @click="switchProductionTab('control')">
            今日一类井升级管控井
          </button>
        </div>
        <div class="stat-cards">
          <div class="stat-card" v-for="item in currentStatCards" :key="item.label">
            <img :src="item.icon" height="30px" alt="" />
            <div class="stat-value">{{ item.value }}</div>
            <div class="stat-label">{{ item.label }}</div>
          </div>
        </div>
        <div class="tab-header">
          <button v-for="dept in productionDepartments" :key="dept" class="tab-btn"
            :class="{ active: activeProductionDept === dept }" @click="switchProductionDepartment(dept)">
            {{ dept }}
          </button>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>类别</th>
                <th>井号</th>
                <th>项目名称</th>
                <th>井别</th>
                <th>井型</th>
                <th>任务类型</th>
                <th>井深(m)</th>
                <th>水平段长(m)</th>
                <th>监理进度</th>
                <th>任务状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in currentWellList" :key="item.wellNo">
                <td class="item_fc1">{{ item.type }}</td>
                <td class="item_fc">{{ item.wellNo }}</td>
                <td>{{ item.projectName }}</td>
                <td>{{ item.wellType }}</td>
                <td>{{ item.wellModel }}</td>
                <td>{{ item.taskType }}</td>
                <td>{{ item.depth }}</td>
                <td>{{ item.horizontalLength || '/' }}</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress" :style="{ width: item.progress + '%' }"></div>
                  </div>
                </td>
                <td :class="getStatusClass(item.status)">{{ item.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 固井全流程要素考核 -->
      <section class="panel panel_1">
        <div class="panel-header">
          <img src="../assets/index13.png" alt="" class="panel-icon" />
          <h3 class="panel-title">固井全流程要素考核</h3>
          <div class="tab-header tab_right">
            <button v-for="dept in assessmentDepartments" :key="dept" class="tab-btn"
              :class="{ active: activeAssessmentDept === dept }" @click="switchAssessmentDepartment(dept)">
              {{ dept }}
            </button>
          </div>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>井号</th>
                <th>配方体系</th>
                <th>材料准备</th>
                <th>注水泥浆封</th>
                <th>固井施工设计</th>
                <th>井眼准备</th>
                <th>下套管作业</th>
                <th>固井施工前</th>
                <th>固井施工</th>
                <th>候凝站场条件</th>
                <th>合计(项)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in currentAssessmentData" :key="item.dept">
                <td>{{ item.dept }}</td>
                <td>{{ item.formula }}</td>
                <td>{{ item.material }}</td>
                <td>{{ item.cement }}</td>
                <td>{{ item.design }}</td>
                <td>{{ item.wellbore }}</td>
                <td>{{ item.casing }}</td>
                <td>{{ item.before }}</td>
                <td>{{ item.during }}</td>
                <td>{{ item.condition }}</td>
                <td>{{ item.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <!-- 右列 - 宽度 1fr -->
    <div class="right-column">
      <!-- 关键控制项不合格井分布 -->
      <section class="panel panel_1">
        <div class="panel-header">
          <img src="../assets/index13.png" alt="" class="panel-icon" />
          <h3 class="panel-title">关键控制项不合格井分布</h3>
        </div>
        <div class="chart-container-wrapper">
          <div class="chart-container">
            <canvas id="wellDistributionChart"></canvas>
          </div>
          <div class="chart-legend">
            <div class="legend-item" v-for="(item, index) in wellDistributionData" :key="index">
              <span class="legend-color" :style="{ backgroundColor: item.color }"></span>
              <span class="legend-label">{{ item.label }}</span>
              <span class="legend-value">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 关键控制项不合格要素分布 -->
      <section class="panel panel_1">
        <div class="panel-header">
          <img src="../assets/index13.png" alt="" class="panel-icon" />
          <h3 class="panel-title">关键控制项不合格要素分布</h3>
        </div>
        <div class="chart-container-wrapper">
          <div class="chart-container">
            <canvas id="factorDistributionChart"></canvas>
          </div>
          <div class="chart-legend">
            <div class="legend-item" v-for="(item, index) in factorDistributionData" :key="index">
              <span class="legend-color" :style="{ backgroundColor: item.color }"></span>
              <span class="legend-label">{{ item.label }}</span>
              <span class="legend-value">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 专家预案处理 -->
      <section class="panel panel_1">
        <div class="panel-header">
          <img src="../assets/index13.png" alt="" class="panel-icon" />
          <h3 class="panel-title">专家预案处理</h3>
        </div>
        <div class="plan-list">
          <div class="plan-item" v-for="item in planData" :key="item.id">
            <div class="plan-title">施工参数预警（井号：{{ item.wellNo }}）<span class="status-badge">{{ item.status }}</span>
            </div>
            <div class="plan-detail">
              <p>报警原因：{{ item.reason }}</p>
              <p>报警时间：{{ item.time }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// 部门列表
const departments = ref(['公司', '一部', '二部', '三部', '四部', '五部']);
const wellDepartments = ref(['公司', '一部', '二部', '三部', '四部', '五部']);
const productionDepartments = ref(['公司', '一部', '二部', '三部', '四部', '五部']);
const assessmentDepartments = ref(['公司', '一部', '二部', '三部', '四部', '五部']);
// 当前选中的部门
const activeDept = ref('公司');
const activeWellDept = ref('公司');
const activeProductionDept = ref('公司');
const activeAssessmentDept = ref('公司');
const activeProductionTab = ref('dynamic');
// 模拟数据：重点项目管控
const allProjectData = ref({
  '公司': [
    { unit: '取心井', warning: 2, handled: 0, rate: 0 },
    { unit: '超长一体化', warning: 1, handled: 1, rate: 100 },
    { unit: '五部气井', warning: 0, handled: 0, rate: 0 },
    { unit: '采油厂高气', warning: 2, handled: 1, rate: 50 },
  ],
  '一部': [
    { unit: '取心井', warning: 1, handled: 0, rate: 0 },
    { unit: '超长一体化', warning: 0, handled: 0, rate: 0 },
    { unit: '五部气井', warning: 1, handled: 1, rate: 100 },
    { unit: '采油厂高气', warning: 1, handled: 0, rate: 0 },
  ],
  '二部': [
    { unit: '取心井', warning: 0, handled: 0, rate: 0 },
    { unit: '超长一体化', warning: 1, handled: 1, rate: 100 },
    { unit: '五部气井', warning: 2, handled: 1, rate: 50 },
    { unit: '采油厂高气', warning: 0, handled: 0, rate: 0 },
  ],
  '三部': [
    { unit: '取心井', warning: 1, handled: 1, rate: 100 },
    { unit: '超长一体化', warning: 0, handled: 0, rate: 0 },
    { unit: '五部气井', warning: 1, handled: 0, rate: 0 },
    { unit: '采油厂高气', warning: 1, handled: 1, rate: 100 },
  ],
  '四部': [
    { unit: '取心井', warning: 0, handled: 0, rate: 0 },
    { unit: '超长一体化', warning: 0, handled: 0, rate: 0 },
    { unit: '五部气井', warning: 1, handled: 1, rate: 100 },
    { unit: '采油厂高气', warning: 1, handled: 0, rate: 0 },
  ],
  '五部': [
    { unit: '取心井', warning: 0, handled: 0, rate: 0 },
    { unit: '超长一体化', warning: 0, handled: 0, rate: 0 },
    { unit: '五部气井', warning: 3, handled: 2, rate: 67 },
    { unit: '采油厂高气', warning: 0, handled: 0, rate: 0 },
  ]
});

// 模拟数据：一类井升级井管控
const allWellData = ref({
  '公司': [
    { unit: '放顶页油', wellNo: 'XX52-19', warning: 2, handled: 1, rate: 50 },
    { unit: '放顶页油', wellNo: 'XX44-3', warning: 2, handled: 1, rate: 50 },
    { unit: '放顶页油', wellNo: 'XX44-1', warning: 2, handled: 1, rate: 50 },
    { unit: '放顶页油', wellNo: 'XX51-1', warning: 2, handled: 1, rate: 50 },
  ],
  '一部': [
    { unit: '一部', wellNo: 'XX52-19', warning: 1, handled: 1, rate: 100 },
    { unit: '一部', wellNo: 'XX44-3', warning: 2, handled: 1, rate: 50 },
    { unit: '一部', wellNo: 'XX44-1', warning: 1, handled: 0, rate: 0 },
  ],
  '二部': [
    { unit: '二部', wellNo: 'z221-205-2', warning: 3, handled: 2, rate: 67 },
    { unit: '二部', wellNo: 'XX64-3', warning: 1, handled: 1, rate: 100 },
    { unit: '二部', wellNo: 'XX42-13-101H', warning: 2, handled: 1, rate: 50 },
  ],
  '三部': [
    { unit: '三部', wellNo: 'XX54-101', warning: 2, handled: 2, rate: 100 },
    { unit: '三部', wellNo: 'XX25-41', warning: 1, handled: 0, rate: 0 },
    { unit: '三部', wellNo: 'XX51-16-2', warning: 2, handled: 1, rate: 50 },
  ],
  '四部': [
    { unit: '四部', wellNo: 'XX44-5', warning: 1, handled: 1, rate: 100 },
    { unit: '四部', wellNo: 'XX44-7', warning: 2, handled: 1, rate: 50 },
    { unit: '四部', wellNo: 'XX44-9', warning: 1, handled: 1, rate: 100 },
  ],
  '五部': [
    { unit: '五部', wellNo: 'XX42-13-101H', warning: 3, handled: 2, rate: 67 },
    { unit: '五部', wellNo: 'XX25-41', warning: 2, handled: 1, rate: 50 },
    { unit: '五部', wellNo: 'XX42-15-102H', warning: 1, handled: 1, rate: 100 },
  ]
});

const getImageUrl = (name) => {
  return new URL(`../assets/${name}`, import.meta.url).href
}

// 生产统计卡片数据
const allStatCards = ref({
  '公司': [
    { label: '待出车', value: 5, icon: getImageUrl('index14.png') },
    { label: '上升途中', value: 8, icon: getImageUrl('index15.png') },
    { label: '到井待施工', value: 12, icon: getImageUrl('index16.png') },
    { label: '正在施工', value: 15, icon: getImageUrl('index17.png') },
    { label: '工序结束', value: 6, icon: getImageUrl('index18.png') },
    { label: '施工结束', value: 10, icon: getImageUrl('index19.png') },
  ],
  '一部': [
    { label: '待出车', value: 2, icon: getImageUrl('index14.png') },
    { label: '上升途中', value: 3, icon: getImageUrl('index15.png') },
    { label: '到井待施工', value: 5, icon: getImageUrl('index16.png') },
    { label: '正在施工', value: 7, icon: getImageUrl('index17.png') },
    { label: '工序结束', value: 2, icon: getImageUrl('index18.png') },
    { label: '施工结束', value: 4, icon: getImageUrl('index19.png') },
  ],
  '二部': [
    { label: '待出车', value: 5, icon: getImageUrl('index14.png') },
    { label: '上升途中', value: 8, icon: getImageUrl('index15.png') },
    { label: '到井待施工', value: 12, icon: getImageUrl('index16.png') },
    { label: '正在施工', value: 15, icon: getImageUrl('index17.png') },
    { label: '工序结束', value: 6, icon: getImageUrl('index18.png') },
    { label: '施工结束', value: 10, icon: getImageUrl('index19.png') },
  ],
  '三部': [
    { label: '待出车', value: 2, icon: getImageUrl('index14.png') },
    { label: '上升途中', value: 3, icon: getImageUrl('index15.png') },
    { label: '到井待施工', value: 5, icon: getImageUrl('index16.png') },
    { label: '正在施工', value: 7, icon: getImageUrl('index17.png') },
    { label: '工序结束', value: 2, icon: getImageUrl('index18.png') },
    { label: '施工结束', value: 4, icon: getImageUrl('index19.png') },
  ],
  '四部': [
    { label: '待出车', value: 5, icon: getImageUrl('index14.png') },
    { label: '上升途中', value: 8, icon: getImageUrl('index15.png') },
    { label: '到井待施工', value: 12, icon: getImageUrl('index16.png') },
    { label: '正在施工', value: 15, icon: getImageUrl('index17.png') },
    { label: '工序结束', value: 6, icon: getImageUrl('index18.png') },
    { label: '施工结束', value: 10, icon: getImageUrl('index19.png') },
  ],
  '五部': [
    { label: '待出车', value: 2, icon: getImageUrl('index14.png') },
    { label: '上升途中', value: 3, icon: getImageUrl('index15.png') },
    { label: '到井待施工', value: 5, icon: getImageUrl('index16.png') },
    { label: '正在施工', value: 7, icon: getImageUrl('index17.png') },
    { label: '工序结束', value: 2, icon: getImageUrl('index18.png') },
    { label: '施工结束', value: 4, icon: getImageUrl('index19.png') },
  ],
});

// 模拟数据：井列表
const allWellList = ref({
  '公司': [
    {
      type: '直', wellNo: 'XX54-101', projectName: '采油十二厂', wellType: '忽斜井', wellModel: '注水井',
      taskType: '造斜井', depth: '1198.1', horizontalLength: '', progress: 60, status: '正在施工',
    },
    {
      type: '直', wellNo: 'z221-205-2', projectName: '采油十厂', wellType: '大斜度井', wellModel: '油井',
      taskType: '造斜井', depth: '4218.1', horizontalLength: '', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 80, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX42-13-101H', projectName: '五部天然气', wellType: '水平井', wellModel: '气井',
      taskType: '气井压裂', depth: '3370', horizontalLength: '', progress: 60, status: '到井待施工',
    },
    {
      type: '压', wellNo: 'XX42-13-101H', projectName: '五部天然气', wellType: '水平井', wellModel: '气井',
      taskType: '气井压裂', depth: '3370', horizontalLength: '', progress: 60, status: '到井待施工',
    },
    {
      type: '压', wellNo: 'XX25-41', projectName: '采气二厂', wellType: '直井', wellModel: '气井',
      taskType: '气井', depth: '2810', horizontalLength: '', progress: 20, status: '上升途中',
    },
    {
      type: '压', wellNo: 'XX51-16-2', projectName: '采油十二厂', wellType: '注水井', wellModel: '',
      taskType: '', depth: '', horizontalLength: '', progress: 20, status: '上升途中',
    },
    {
      type: '压', wellNo: 'XX51-16-2', projectName: '采油十二厂', wellType: '注水井', wellModel: '',
      taskType: '', depth: '', horizontalLength: '', progress: 20, status: '上升途中',
    },
  ],
  '一部': [
    {
      type: '直', wellNo: 'z221-205-2', projectName: '采油十厂', wellType: '大斜度井', wellModel: '油井',
      taskType: '造斜井', depth: '4218.1', horizontalLength: '', progress: 60, status: '正在施工',
    },
    {
      type: '直', wellNo: 'XX54-101', projectName: '采油十二厂', wellType: '忽斜井', wellModel: '注水井',
      taskType: '造斜井', depth: '1198.1', horizontalLength: '', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 80, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX42-13-101H', projectName: '五部天然气', wellType: '水平井', wellModel: '气井',
      taskType: '气井压裂', depth: '3370', horizontalLength: '', progress: 60, status: '到井待施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX42-13-101H', projectName: '五部天然气', wellType: '水平井', wellModel: '气井',
      taskType: '气井压裂', depth: '3370', horizontalLength: '', progress: 60, status: '到井待施工',
    },
    {
      type: '压', wellNo: 'XX25-41', projectName: '采气二厂', wellType: '直井', wellModel: '气井',
      taskType: '气井', depth: '2810', horizontalLength: '', progress: 20, status: '上升途中',
    },
    {
      type: '压', wellNo: 'XX51-16-2', projectName: '采油十二厂', wellType: '注水井', wellModel: '',
      taskType: '', depth: '', horizontalLength: '', progress: 20, status: '上升途中',
    },
    {
      type: '压', wellNo: 'XX51-16-2', projectName: '采油十二厂', wellType: '注水井', wellModel: '',
      taskType: '', depth: '', horizontalLength: '', progress: 20, status: '上升途中',
    },
  ],
  '二部': [
    {
      type: '直', wellNo: 'XX54-101', projectName: '采油十二厂', wellType: '忽斜井', wellModel: '注水井',
      taskType: '造斜井', depth: '1198.1', horizontalLength: '', progress: 60, status: '正在施工',
    },
    {
      type: '直', wellNo: 'z221-205-2', projectName: '采油十厂', wellType: '大斜度井', wellModel: '油井',
      taskType: '造斜井', depth: '4218.1', horizontalLength: '', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 80, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX42-13-101H', projectName: '五部天然气', wellType: '水平井', wellModel: '气井',
      taskType: '气井压裂', depth: '3370', horizontalLength: '', progress: 60, status: '到井待施工',
    },
    {
      type: '压', wellNo: 'XX42-13-101H', projectName: '五部天然气', wellType: '水平井', wellModel: '气井',
      taskType: '气井压裂', depth: '3370', horizontalLength: '', progress: 60, status: '到井待施工',
    },
    {
      type: '压', wellNo: 'XX25-41', projectName: '采气二厂', wellType: '直井', wellModel: '气井',
      taskType: '气井', depth: '2810', horizontalLength: '', progress: 20, status: '上升途中',
    },
    {
      type: '压', wellNo: 'XX51-16-2', projectName: '采油十二厂', wellType: '注水井', wellModel: '',
      taskType: '', depth: '', horizontalLength: '', progress: 20, status: '上升途中',
    },
    {
      type: '压', wellNo: 'XX51-16-2', projectName: '采油十二厂', wellType: '注水井', wellModel: '',
      taskType: '', depth: '', horizontalLength: '', progress: 20, status: '上升途中',
    },
  ],
  '三部': [
    {
      type: '直', wellNo: 'XX54-101', projectName: '采油十二厂', wellType: '忽斜井', wellModel: '注水井',
      taskType: '造斜井', depth: '1198.1', horizontalLength: '', progress: 60, status: '正在施工',
    },
    {
      type: '直', wellNo: 'z221-205-2', projectName: '采油十厂', wellType: '大斜度井', wellModel: '油井',
      taskType: '造斜井', depth: '4218.1', horizontalLength: '', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 80, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX42-13-101H', projectName: '五部天然气', wellType: '水平井', wellModel: '气井',
      taskType: '气井压裂', depth: '3370', horizontalLength: '', progress: 60, status: '到井待施工',
    },
    {
      type: '压', wellNo: 'XX42-13-101H', projectName: '五部天然气', wellType: '水平井', wellModel: '气井',
      taskType: '气井压裂', depth: '3370', horizontalLength: '', progress: 60, status: '到井待施工',
    },
    {
      type: '压', wellNo: 'XX25-41', projectName: '采气二厂', wellType: '直井', wellModel: '气井',
      taskType: '气井', depth: '2810', horizontalLength: '', progress: 20, status: '上升途中',
    },
    {
      type: '压', wellNo: 'XX51-16-2', projectName: '采油十二厂', wellType: '注水井', wellModel: '',
      taskType: '', depth: '', horizontalLength: '', progress: 20, status: '上升途中',
    },
    {
      type: '压', wellNo: 'XX51-16-2', projectName: '采油十二厂', wellType: '注水井', wellModel: '',
      taskType: '', depth: '', horizontalLength: '', progress: 20, status: '上升途中',
    },
  ],
  '四部': [
    {
      type: '直', wellNo: 'XX54-101', projectName: '采油十二厂', wellType: '忽斜井', wellModel: '注水井',
      taskType: '造斜井', depth: '1198.1', horizontalLength: '', progress: 60, status: '正在施工',
    },
    {
      type: '直', wellNo: 'z221-205-2', projectName: '采油十厂', wellType: '大斜度井', wellModel: '油井',
      taskType: '造斜井', depth: '4218.1', horizontalLength: '', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 80, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX42-13-101H', projectName: '五部天然气', wellType: '水平井', wellModel: '气井',
      taskType: '气井压裂', depth: '3370', horizontalLength: '', progress: 60, status: '到井待施工',
    },
    {
      type: '压', wellNo: 'XX42-13-101H', projectName: '五部天然气', wellType: '水平井', wellModel: '气井',
      taskType: '气井压裂', depth: '3370', horizontalLength: '', progress: 60, status: '到井待施工',
    },
    {
      type: '压', wellNo: 'XX25-41', projectName: '采气二厂', wellType: '直井', wellModel: '气井',
      taskType: '气井', depth: '2810', horizontalLength: '', progress: 20, status: '上升途中',
    },
    {
      type: '压', wellNo: 'XX51-16-2', projectName: '采油十二厂', wellType: '注水井', wellModel: '',
      taskType: '', depth: '', horizontalLength: '', progress: 20, status: '上升途中',
    },
    {
      type: '压', wellNo: 'XX51-16-2', projectName: '采油十二厂', wellType: '注水井', wellModel: '',
      taskType: '', depth: '', horizontalLength: '', progress: 20, status: '上升途中',
    },
  ],
  '五部': [
    {
      type: '直', wellNo: 'XX54-101', projectName: '采油十二厂', wellType: '忽斜井', wellModel: '注水井',
      taskType: '造斜井', depth: '1198.1', horizontalLength: '', progress: 60, status: '正在施工',
    },
    {
      type: '直', wellNo: 'z221-205-2', projectName: '采油十厂', wellType: '大斜度井', wellModel: '油井',
      taskType: '造斜井', depth: '4218.1', horizontalLength: '', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 80, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX64-3', projectName: 'z', wellType: '空井筒', wellModel: '气井',
      taskType: '气井压裂', depth: '4414', horizontalLength: '1311', progress: 60, status: '正在施工',
    },
    {
      type: '压', wellNo: 'XX42-13-101H', projectName: '五部天然气', wellType: '水平井', wellModel: '气井',
      taskType: '气井压裂', depth: '3370', horizontalLength: '', progress: 60, status: '到井待施工',
    },
    {
      type: '压', wellNo: 'XX42-13-101H', projectName: '五部天然气', wellType: '水平井', wellModel: '气井',
      taskType: '气井压裂', depth: '3370', horizontalLength: '', progress: 60, status: '到井待施工',
    },
    {
      type: '压', wellNo: 'XX25-41', projectName: '采气二厂', wellType: '直井', wellModel: '气井',
      taskType: '气井', depth: '2810', horizontalLength: '', progress: 20, status: '上升途中',
    },
    {
      type: '压', wellNo: 'XX51-16-2', projectName: '采油十二厂', wellType: '注水井', wellModel: '',
      taskType: '', depth: '', horizontalLength: '', progress: 20, status: '上升途中',
    },
    {
      type: '压', wellNo: 'XX51-16-2', projectName: '采油十二厂', wellType: '注水井', wellModel: '',
      taskType: '', depth: '', horizontalLength: '', progress: 20, status: '上升途中',
    },
  ],
});

// 模拟数据：全流程要素考核
const allAssessmentData = ref({
  '公司': [
    {
      dept: 'XX51-16-2', formula: 1, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 1,
    },
    {
      dept: 'XX25-41', formula: 0, material: 0, cement: 1, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 1,
    },
    {
      dept: 'XX64-3', formula: 1, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 1,
    },
    {
      dept: 'z221-20', formula: 0, material: 0, cement: 1, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 1,
    },
    {
      dept: 'XX51-16-3', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 1, total: 1,
    },
  ],
  '一部': [
    {
      dept: 'XX51-16-2', formula: 1, material: 0, cement: 1, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 2,
    },
    {
      dept: 'XX25-41', formula: 0, material: 2, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 1, condition: 0, total: 3,
    },
    {
      dept: 'XX64-3', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
    {
      dept: 'z221-20', formula: 1, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 1,
    },
    {
      dept: 'XX51-16-3', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
  ],
  '二部': [
    {
      dept: 'XX51-16-2', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 1, total: 1,
    },
    {
      dept: 'XX25-41', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
    {
      dept: 'XX64-3', formula: 1, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 1,
    },
    {
      dept: 'z221-20', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
    {
      dept: 'XX51-16-3', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
  ],
  '三部': [
    {
      dept: 'XX51-16-2', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
    {
      dept: 'XX25-41', formula: 1, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 1,
    },
    {
      dept: 'XX64-3', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
    {
      dept: 'z221-20', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
    {
      dept: 'XX51-16-3', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
  ],
  '四部': [
    {
      dept: 'XX51-16-2', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 1, total: 1,
    },
    {
      dept: 'XX25-41', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
    {
      dept: 'XX64-3', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
    {
      dept: 'z221-20', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
    {
      dept: 'XX51-16-3', formula: 1, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 1,
    },
  ],
  '五部': [
    {
      dept: 'XX51-16-2', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 1, total: 1,
    },
    {
      dept: 'XX25-41', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
    {
      dept: 'XX64-3', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
    {
      dept: 'z221-20', formula: 2, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 2,
    },
    {
      dept: 'XX51-16-3', formula: 0, material: 0, cement: 0, design: 0, wellbore: 0, casing: 0,
      before: 0, during: 0, condition: 0, total: 0,
    },
  ]
});
// 计算属性
const currentProjectData = computed(() => allProjectData.value[activeDept.value] || []);
const currentWellData = computed(() => allWellData.value[activeWellDept.value] || []);
const currentStatCards = computed(() => allStatCards.value[activeProductionDept.value] || []);
const currentWellList = computed(() => allWellList.value[activeProductionDept.value] || []);
const currentAssessmentData = computed(() => allAssessmentData.value[activeAssessmentDept.value] || []);
// 切换方法
const switchDepartment = (dept) => { activeDept.value = dept; };
const switchWellDepartment = (dept) => { activeWellDept.value = dept; };
const switchProductionDepartment = (dept) => { activeProductionDept.value = dept; };
const switchAssessmentDepartment = (dept) => { activeAssessmentDept.value = dept; };
const switchProductionTab = (tab) => { activeProductionTab.value = tab; };
// 模拟数据：专家预案处理
const planData = ref([
  {
    id: 1,
    wellNo: 'XX54-101',
    status: '现场未确认',
    reason: '密度计测量偏差|设计1.8g/cm³|实际1.6g/cm³',
    time: '2025-11-03 08:44:43',
  },
  {
    id: 2,
    wellNo: 'XX54-101',
    status: '现场未确认',
    reason: '密度计测量偏差|设计1.8g/cm³|实际1.6g/cm³',
    time: '2025-11-03 08:44:43',
  },
  {
    id: 3,
    wellNo: 'XX54-101',
    status: '现场未确认',
    reason: '密度计测量偏差|设计1.8g/cm³|实际1.6g/cm³',
    time: '2025-11-03 08:44:43',
  },
]);

// 环形图数据
const wellDistributionData = ref([
  { label: '一部', value: 90, color: 'rgba(33, 150, 243, 0.7)' },
  { label: '二部', value: 140, color: 'rgba(76, 175, 80, 0.7)' },
  { label: '三部', value: 131, color: 'rgba(255, 193, 7, 0.7)' },
  { label: '四部', value: 130, color: 'rgba(255, 152, 0, 0.7)' },
  { label: '五部', value: 311, color: 'rgba(156, 39, 176, 0.7)' },
]);

const factorDistributionData = ref([
  { label: '施工方案', value: 299, color: 'rgba(33, 150, 243, 0.7)' },
  { label: '材料准备', value: 650, color: 'rgba(76, 175, 80, 0.7)' },
  { label: '入井流体实验', value: 684, color: 'rgba(255, 193, 7, 0.7)' },
  { label: '井筒工程设计', value: 146, color: 'rgba(255, 152, 0, 0.7)' },
  { label: '纤维操作', value: 82, color: 'rgba(156, 39, 176, 0.7)' },
  { label: '下套管作业', value: 176, color: 'rgba(233, 30, 99, 0.7)' },
  { label: '固井施工', value: 152, color: 'rgba(121, 85, 72, 0.7)' },
  { label: '候凝站场条件', value: 94, color: 'rgba(102, 187, 106, 0.7)' },
]);

// 获取状态类名
const getStatusClass = (status) => {
  switch (status) {
    case '正在施工':
      return 'status-processing';
    case '到井待施工':
      return 'status-waiting';
    case '上升途中':
      return 'status-rising';
    default:
      return '';
  }
};

// 初始化图表
onMounted(() => {
  // 固井流程节点管控预警 - 柱状图
  const processNodeCtx = document.getElementById('processNodeChart').getContext('2d');
  new Chart(processNodeCtx, {
    type: 'bar',
    data: {
      labels: ['公司', '一部', '二部', '三部', '四部', '五部'],
      datasets: [
        {
          label: '预警(项)',
          data: [1648, 250, 489, 833, 61, 342],
          backgroundColor: 'rgba(33, 150, 243, 0.7)',
          borderRadius: 8,
        },
        {
          label: '处理合格(项)',
          data: [245, 45, 100, 156, 15, 54],
          backgroundColor: 'rgba(76, 175, 80, 0.7)',
          borderRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          max: 2000,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
      },
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
        }
      }
    },
  });

  // 关键控制项不合格要素分布 - 环形图
  const factorDistributionCtx = document.getElementById('factorDistributionChart').getContext('2d');
  new Chart(factorDistributionCtx, {
    type: 'doughnut',
    data: {
      labels: factorDistributionData.value.map(item => item.label),
      datasets: [
        {
          data: factorDistributionData.value.map(item => item.value),
          backgroundColor: factorDistributionData.value.map(item => item.color),
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      },
    },
    plugins: [{
      id: 'centerText',
      afterDraw: (chart) => {
        const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart;
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;

        // 计算总数
        const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 绘制总数
        ctx.font = 'bold 24px Microsoft Yahei';
        ctx.fillStyle = '#2196f3';
        ctx.fillText(total.toString(), centerX, centerY - 15);

        // 绘制标题
        ctx.font = '14px Microsoft Yahei';
        ctx.fillStyle = '#666';
        ctx.fillText('不合格总数', centerX, centerY + 10);

        ctx.restore();
      }
    }]
  });

  // 关键控制项不合格井分布 - 环形图
  const wellDistributionCtx = document.getElementById('wellDistributionChart').getContext('2d');
  new Chart(wellDistributionCtx, {
    type: 'doughnut',
    data: {
      labels: wellDistributionData.value.map(item => item.label),
      datasets: [
        {
          data: wellDistributionData.value.map(item => item.value),
          backgroundColor: wellDistributionData.value.map(item => item.color),
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      },
    },
    plugins: [{
      id: 'centerText',
      afterDraw: (chart) => {
        const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart;
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;

        // 计算总数
        const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 绘制总数
        ctx.font = 'bold 24px Microsoft Yahei';
        ctx.fillStyle = '#2196f3';
        ctx.fillText(total.toString(), centerX, centerY - 15);

        // 绘制标题
        ctx.font = '14px Microsoft Yahei';
        ctx.fillStyle = '#666';
        ctx.fillText('不合格总数', centerX, centerY + 10);

        ctx.restore();
      }
    }]
  });
});
</script>

<style scoped>
.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  /* 1:2:1 比例 */
  grid-gap: 20px;
  background-color: #f5f7fa;
}

/* 列布局 */
.left-column,
.middle-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 面板通用样式 */
.panel {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.panel_1 {
  height: 330px;
}

.panel_2 {
  height: 680px;
}

.panel-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.panel-icon {
  height: 30px;
  margin-right: 10px;
}

.panel-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

/* 图表容器 */
.chart-container {
  flex: 1;
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 环形图容器包装器 */
.chart-container-wrapper {
  display: flex;
  flex: 1;
  gap: 15px;
  align-items: center;
}

/* 自定义图例样式 */
.chart-legend {
  flex: 1;
  max-width: 150px;
  overflow-y: auto;
  max-height: 230px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #eaecef;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 1.4;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  margin-right: 8px;
  flex-shrink: 0;
}

.legend-label {
  flex: 1;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.legend-value {
  color: #666;
  font-weight: bold;
  margin-left: 5px;
  flex-shrink: 0;
}

.chart-container canvas {
  max-width: 90% !important;
  max-height: 90% !important;
}

/* 表格容器 */
.table-container {
  flex: 1;
  overflow: auto;
}

/* 紧凑表格样式 */
.compact-table {
  font-size: 12px;
}

.compact-table th,
.compact-table td {
  padding: 6px 8px;
}

/* 标签页 */
.tab-header {
  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid #eaecef;
}

.tab_right {
  display: flex;
  margin-left: auto;
}

.tab-btn {
  padding: 8px 20px;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  font-size: 14px;
  color: #666;
}

.tab-btn.active {
  color: #0c4ca2;
  border-bottom-color: #0c4ca2;
  font-weight: bold;
}

.data-table th,
.data-table td {
  border: 1px solid #eaecef;
  padding: 8px 10px;
  /* 统一设置所有单元格的内边距 */
  text-align: center;
}

/* 统计卡片 */
.stat-cards {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.stat-card {
  text-align: center;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #0c4ca2;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 18px;
  color: #666;
}

/* 表格通用样式 */
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.data-table th,
.data-table td {
  border: 1px solid #eaecef;
  padding: 10px 10px;
  text-align: center;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #333;
}

/* 表头文字样式 */
.item_fc1 {
  color: #2196f3;
}

.item_fc {
  color: #2196f3;
}

/* 进度条 */
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #f5f7fa;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #2196f3;
  border-radius: 4px;
}

/* 专家预案项 */
.plan-list {
  flex: 1;
  overflow-y: auto;
}

.plan-item {
  margin-bottom: 5px;
  border-left: 3px solid #ff5722;
  padding-left: 10px;
  background-color: #f8f9fa;
  padding: 5px;
  border-radius: 4px;
}

.plan-title {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.plan-detail {
  font-size: 12px;
  color: #666;
  line-height: 1.5;
}

/* 状态样式 */
.status-badge {
  background-color: #ff5722;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  margin-left: 5px;
}

.status-processing {
  color: #2196f3;
  font-weight: bold;
}

.status-waiting {
  color: #ff9800;
  font-weight: bold;
}

.status-rising {
  color: #4caf50;
  font-weight: bold;
}

.highlight-red {
  color: #ff5722;
  font-weight: bold;
}

/* 响应式布局调整 */
@media (max-width: 1400px) {
  .content {
    grid-template-columns: 1fr;
  }

  .left-column,
  .middle-column,
  .right-column {
    gap: 15px;
  }

  .stat-cards {
    grid-template-columns: repeat(3, 1fr);
  }

  .chart-container-wrapper {
    flex-direction: column;
  }

  .chart-legend {
    max-width: 100%;
    max-height: 120px;
  }

  .legend-item {
    display: inline-flex;
    width: 48%;
    margin-right: 2%;
  }
}

@media (max-width: 768px) {
  .stat-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .legend-item {
    width: 100%;
    margin-right: 0;
  }
}
</style>