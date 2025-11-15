<template>
  <div class="cementing-quality-dashboard">
    <!-- 顶部图表区域 -->
    <div class="top-charts">
      <!-- 固井合格率图表 -->
      <div class="chart-card">
        <div class="chart-title" style="display: flex; justify-content:space-between; align-items: center;">
          固井质量概况
          <div class="time-selector" style="margin-left: 10px;">
            <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" />
          </div>
        </div>
        <div ref="qualificationRateRef" class="chart-container"></div>
      </div>

      <!-- 不合格井与控制项关系图1 -->
      <div class="chart-card">
        <div class="chart-title" style="display: flex; justify-content: start; align-items: center;">
          质量不合格井与不合格控制项的对应关系
          <div class="time-selector" style="margin-left: 10px;"> <el-date-picker v-model="dateRange" type="daterange"
              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" /></div>
        </div>
        <!-- echarts 和 pie-table 联动 -->

        <div ref="unqualifiedRelationRef" class="chart-container" @click="handleUnqualifiedRelationClick"></div>
        <div class="pie-table" v-if="showPieTable" @click="handlePieTableClick">
          <div class="title">
            {{ secondPictureData.leftTableTitle }}
          </div>
          <div v-for="(item, index) in iconList" :key="item.id" class="table-item">
            <span class="circle" />
            <span class="title">{{ item.id }}.{{ item.title }}</span>
            <span class="value">{{
              secondPictureData.leftTableData[index]
            }}</span>
          </div>
        </div>
      </div>

      <!-- 合格井与控制项关系图2 -->
      <div class="chart-card">
        <div class="chart-title" style="display: flex; justify-content: start; align-items: center;">
          质量合格井与不合格控制项的对应关系
          <div class="time-selector" style="margin-left: 10px;"> <el-date-picker v-model="dateRange" type="daterange"
              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" /></div>
        </div>
        <div ref="qualifiedRelationRef" class="chart-container" @click="handleQualifiedRelationClick"></div>
        <div class="pie-table" v-if="showPieTable" @click="handlePieTableClick">
          <div class="title">
            {{ secondPictureData2.leftTableTitle }}
          </div>
          <div v-for="(item, index) in iconList" :key="item.id" class="table-item">
            <span class="circle" />
            <span class="title">{{ item.id }}.{{ item.title }}</span>
            <span class="value">{{
              secondPictureData2.leftTableData[index]
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="filter-form">
      <div class="chart-title">固井质量详情</div>

      <!-- 筛选区域 -->
      <el-form :inline="true">
        <el-form-item label="时间段">
          <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
      <el-table :data="tableData" border class="data-table">
        <el-table-column prop="serial" label="序号" width="80" align="center" />
        <el-table-column prop="projectDept" label="项目部" align="center" />
        <el-table-column prop="projectGroup" label="项目组" align="center">
          <template #default="{ row }">
            <!-- 下拉框：一组、二组、三组 -->
            <el-select v-model="row.projectGroup" placeholder="请选择项目组">
              <el-option label="全部" value="全部" />
              <el-option label="一组" value="一组" />
              <el-option label="二组" value="二组" />
              <el-option label="三组" value="三组" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="wellType" label="井型" align="center">
          <template #default="{ row }">
            <!-- 下拉框：定向井、直井、斜井 -->
            <el-select v-model="row.wellType" placeholder="请选择井型">
              <el-option label="全部" value="全部" />
              <el-option label="定向井" value="定向井" />
              <el-option label="直井" value="直井" />
              <el-option label="斜井" value="斜井" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="wellCategory" label="井别" align="center">
          <template #default="{ row }">
            <!-- 下拉框：油井、气井、ccus井 -->
            <el-select v-model="row.wellCategory" placeholder="请选择井别">
              <el-option label="全部" value="全部" />
              <el-option label="油井" value="油井" />
              <el-option label="气井" value="气井" />
              <el-option label="ccus井" value="ccus井" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="wellCount" label="井数(口)" align="center" />
        <el-table-column prop="processScore" label="过程综合评分（平均）" align="center" />
        <el-table-column prop="resultScore" label="结果综合评分（平均）" align="center" />
        <el-table-column prop="unqualifiedLines" label="不合格红线（总条数）" align="center" />
        <el-table-column label="操作" align="center" width="300px">
          <template #default>
            <!-- 过程评分校核 -->
            <el-button type="primary" size="small" @click="handleWeightDialog">过程评分校核</el-button>

            <!-- 结果评分详情 -->
            <el-button type="success" size="small" @click="handleResultAnalysisDialog">结果评分详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 过程评分校核弹窗 -->
      <el-dialog v-model="showWeightDialog" title="过程评分校核" width="90%">
        <div style="display: flex; gap: 20px; height: 60vh;">
          <div style="width: 50%; height: 100%; display: flex; align-items: center; justify-content: center;">
            <el-table :data="weightData" border>
              <el-table-column prop="controlItem" label="控制项" />
              <el-table-column prop="weight" label="权重" />
              <el-table-column prop="weight" label="权重" />
              <el-table-column prop="weight" label="权重" />
            </el-table>
          </div>
          <div ref="weightChartRef" class="chart-container" style="width: 50%; height: 100%;"></div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleCloseWeightDialog">取 消</el-button>
            <el-button type="primary" @click="handleCloseWeightDialog">确 定</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 结果评分详情弹窗 -->
      <el-dialog v-model="showResultAnalysisDialog" title="结果评分详情" width="90%">
        <div style="display: flex; gap: 20px; height: 700px;">
          <!-- 质量分析模型准确率柱状图 -->
          <div ref="accuracyChartRef" class="chart-container" style="width: 50%; height: 100%;"></div>
          <!-- 关键特征控制因素权重比饼图 -->
          <div ref="keyFeatureControlFactorWeightPieChartRef" class="chart-container" style="width: 50%; height: 100%;">
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleCloseResultAnalysisDialog">取 消</el-button>
            <el-button type="primary" @click="handleCloseResultAnalysisDialog">确 定</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 底部图表区域 -->
      <div class="bottom-charts">
        <!-- 区块平均合格率 -->
        <div class="chart-card">
          <div class="chart-title">过程综合评分（平均）统计图</div>
          <div ref="avgQualificationRef" class="chart-container"></div>
        </div>

        <!-- 区块不合格井个数 -->
        <div class="chart-card">
          <div class="chart-title">结果综合评分（平均）统计图</div>
          <div ref="unqualifiedCountRef" class="chart-container"></div>
        </div>

        <!-- 不合格红线（总条数）分布图 -->
        <div class="chart-card">
          <div class="chart-title">不合格红线（总条数）分布图</div>
          <div ref="controlItemQualificationRef" class="chart-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import * as echarts from "echarts";
import { ElMessage } from "element-plus";
import { graphCalc } from "../mock/graph-calc";
import { mockModelData } from "../mock/mock-model-data";
import { mockProcessData } from "../mock/mock-process-data";
import { fieldMapping } from "../mock/processFieldMap";

// 筛选条件
const dateRange = ref([]);
const wellType = ref("");
const wellCategory = ref("");

// 分页参数
const currentPage = ref(1);
const pageSize = ref(10);

// 表格数据
const tableData = ref([
  {
    serial: 1,
    projectDept: "第一项目部",
    wellType: "全部",
    wellCategory: "全部",
    projectGroup: "全部",
    wellCount: 1,
    processScore: 34,
    resultScore: 3,
    unqualifiedLines: 8,
  },
  {
    serial: 2,
    projectDept: "第二项目部",
    wellType: "全部",
    wellCategory: "全部",
    projectGroup: "全部",
    wellCount: 2,
    processScore: 17,
    resultScore: 62,
    unqualifiedLines: 90,
  },
  {
    serial: 3,
    projectDept: "第三项目部",
    wellType: "全部",
    wellCategory: "全部",
    projectGroup: "全部",
    wellCount: 3,
    processScore: 45,
    resultScore: 17,
    unqualifiedLines: 95,
  },
  {
    serial: 4,
    projectDept: "第四项目部",
    wellType: "全部",
    wellCategory: "全部",
    projectGroup: "全部",
    wellCount: 4,
    processScore: 66,
    resultScore: 56,
    unqualifiedLines: 57,
  },
  {
    serial: 5,
    projectDept: "苏里格项目部",
    wellType: "全部",
    wellCategory: "全部",
    projectGroup: "全部",
    wellCount: 5,
    processScore: 33,
    resultScore: 35,
    unqualifiedLines: 73,
  },

]);

// 图表容器引用
const qualificationRateRef = ref(null);
const unqualifiedRelationRef = ref(null);
const qualifiedRelationRef = ref(null);
const avgQualificationRef = ref(null);
const unqualifiedCountRef = ref(null);
const controlItemQualificationRef = ref(null);

// 是否显示 pie-table
const showPieTable = ref(true);

// 处理 pie-table 点击事件
const handlePieTableClick = () => {
  showPieTable.value = !showPieTable.value;
};

// 处理 unqualifiedRelation 点击事件
const handleUnqualifiedRelationClick = () => {
  nextTick(() => {
    iconList.value.forEach(item => {
      item.value = Math.ceil(Math.random() * 100);
    });
    secondPictureData.value.leftTableData = iconList.value.map(item => item.value);
    showPieTable.value = true;
  });
};

const handleQualifiedRelationClick = () => {
  showPieTable.value = true;
  nextTick(() => {
    iconList.value.forEach(item => {
      item.value = Math.ceil(Math.random() * 100);
    });
    secondPictureData2.value.leftTableData = iconList.value.map(item => item.value);
    showPieTable.value = true;
  });
};

// 初始化图表
const initCharts = () => {
  // 1. 固井合格率图表
  const qualificationRateChart = echarts.init(qualificationRateRef.value);
  qualificationRateChart.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    grid: { left: "3%", right: "10%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      data: ["一部", "二部", "三部", "四部", "苏里格", "整体"],
      name: "项目部",
    },
    yAxis: {
      type: "value",
      name: "固井合格率(%)",
      max: 100,
    },
    series: [
      {
        data: [60, 50, 60, 80, 40, 60],
        type: "bar",
        name: "合格率",
        itemStyle: { color: "#409eff" },
        markPoint: {
          data: [
            { type: "max", name: "最大值" },
            { type: "min", name: "最小值" },
          ],
        },
      },
    ],
  });

  // 2. 不合格井与控制项关系图
  const unqualifiedRelationChart = echarts.init(unqualifiedRelationRef.value);
  unqualifiedRelationChart.setOption({
    legend: {
      show: true,
      bottom: "0%",
      left: "0",
      right: "0",
      selected: {
        一部: true,
        二部: true,
        三部: true,
        四部: true,
        苏里格: true,
      },
    },
    series: [
      {
        type: "sunburst",
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        sort: null,
        nodeClick: false,
        emphasis: {
          disabled: true, // 禁用高亮状态
        },
        // 禁用交互
        silent: true,
        itemStyle: {
          color: "transparent", // 隐藏扇形区域的颜色
          borderColor: "transparent", // 隐藏边框颜色
          borderWidth: 0, // 隐藏边框宽度
        },
        label: {
          show: true,
          fontSize: 16,
          position: "outside",
          fontWeight: "bold",
          color: "inherit",
          rotate: "tangential",
          align: "center",
          formatter: "{c}",
          distance: 10,
          offset: [-20, 0],
        },
        radius: ["55%", "70%"],
        center: ["25%", "43%"],
        data: [
          { value: 6, name: "一部", label: { color: "#3b7ed9" } },
          { value: 5, name: "二部", label: { color: "#5dd5a5" } },
          { value: 8, name: "三部", label: { color: "#5c6f8d" } },
          { value: 7, name: "四部", label: { color: "#5adbf6" } },
          { value: 10, name: "苏里格", label: { color: "#f1bc18" } },
        ],
      },
      {
        name: "项目部",
        type: "pie",
        sort: null,
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        selectedMode: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: `{total|${36}}` + `\n\r` + `{active|不合格井（口）}`,
          rich: {
            total: {
              fontSize: 35,
              fontFamily: "微软雅黑",
              color: "#e56451",
              fontWeight: "bold",
            },
            active: {
              fontFamily: "微软雅黑",
              fontSize: 16,
              color: "#2c4b77",
              lineHeight: 30,
            },
          },
        },
        radius: ["55%", "70%"],
        center: ["25%", "43%"],
        emphasis: {
          scale: true,
          scaleSize: 8,
          itemStyle: {
            borderRadius: 10,
            borderColor: "rgba(159,159,159,0.4)",
            borderWidth: 2,
          },
        },
        data: [
          { value: 6, name: "一部", itemStyle: { color: "#3b7ed9" } },
          { value: 5, name: "二部", itemStyle: { color: "#5dd5a5" } },
          { value: 8, name: "三部", itemStyle: { color: "#5c6f8d" } },
          { value: 7, name: "四部", itemStyle: { color: "#5adbf6" } },
          { value: 10, name: "苏里格", itemStyle: { color: "#f1bc18" } },
        ],
      },
    ],
  });

  // 3. 合格井与控制项关系图
  const qualifiedRelationChart = echarts.init(qualifiedRelationRef.value);
  qualifiedRelationChart.setOption({
    legend: {
      show: true,
      bottom: "0%",
      left: "0",
      right: "0",
      selected: {
        一部: true,
        二部: true,
        三部: true,
        四部: true,
        苏里格: true,
      },
    },
    series: [
      {
        type: "sunburst",
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        sort: null,
        nodeClick: false,
        emphasis: {
          disabled: true, // 禁用高亮状态
        },
        // 禁用交互
        silent: true,
        itemStyle: {
          color: "transparent", // 隐藏扇形区域的颜色
          borderColor: "transparent", // 隐藏边框颜色
          borderWidth: 0, // 隐藏边框宽度
        },
        label: {
          show: true,
          fontSize: 16,
          position: "outside",
          fontWeight: "bold",
          color: "inherit",
          rotate: "tangential",
          align: "center",
          formatter: "{c}",
          distance: 10,
          offset: [-20, 0],
        },
        radius: ["55%", "70%"],
        center: ["25%", "43%"],
        data: [
          { value: 82, name: "一部", label: { color: "#3b7ed9" } },
          { value: 325, name: "二部", label: { color: "#5dd5a5" } },
          { value: 528, name: "三部", label: { color: "#5c6f8d" } },
          { value: 107, name: "四部", label: { color: "#5adbf6" } },
          { value: 210, name: "苏里格", label: { color: "#f1bc18" } },
        ],
      },
      {
        name: "项目部",
        type: "pie",
        sort: null,
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        selectedMode: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: `{total|${1268}}` + `\n\r` + `{active|合格井（口）}`,
          rich: {
            total: {
              fontSize: 35,
              fontFamily: "微软雅黑",
              color: "#e56451",
              fontWeight: "bold",
            },
            active: {
              fontFamily: "微软雅黑",
              fontSize: 16,
              color: "#2c4b77",
              lineHeight: 30,
            },
          },
        },
        radius: ["55%", "70%"],
        center: ["25%", "43%"],
        emphasis: {
          scale: true,
          scaleSize: 8,
          itemStyle: {
            borderRadius: 10,
            borderColor: "rgba(159,159,159,0.4)",
            borderWidth: 2,
          },
        },
        data: [
          { value: 82, name: "一部", itemStyle: { color: "#3b7ed9" } },
          { value: 325, name: "二部", itemStyle: { color: "#5dd5a5" } },
          { value: 528, name: "三部", itemStyle: { color: "#5c6f8d" } },
          { value: 107, name: "四部", itemStyle: { color: "#5adbf6" } },
          { value: 210, name: "苏里格", itemStyle: { color: "#f1bc18" } },
        ],
      },
    ],
  });

  // 4. 区块平均合格率
  const avgQualificationChart = echarts.init(avgQualificationRef.value);
  avgQualificationChart.setOption({
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      data: ["区块A", "区块B", "区块C", "区块D", "区块E", "区块F", "区块G"],
    },
    yAxis: { type: "value", name: "合格率(%)", max: 100 },
    series: [
      {
        name: "单井平均合格率",
        type: "bar",
        data: [82.5, 78.3, 91.2, 87.4, 79.2, 94.8, 71.1],
        itemStyle: {
          color: function (params) {
            const colorList = [
              "#409eff",
              "#faad14",
              "#52c41a",
              "#409eff",
              "#faad14",
              "#52c41a",
              "#faad14",
            ];
            return colorList[params.dataIndex];
          },
        },
      },
    ],
  });

  // 5. 区块不合格井个数
  const unqualifiedCountChart = echarts.init(unqualifiedCountRef.value);
  unqualifiedCountChart.setOption({
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      data: ["区块A", "区块B", "区块C", "区块D", "区块E", "区块F", "区块G"],
    },
    yAxis: { type: "value", name: "不合格井数" },
    series: [
      {
        name: "不合格井数",
        type: "bar",
        data: [8, 9, 12, 5, 7, 2, 9],
        itemStyle: { color: "#f5222d" },
      },
    ],
  });

  // 6. 不合格红线（总条数）分布图
  const controlItemQualificationChart = echarts.init(
    controlItemQualificationRef.value
  );
  controlItemQualificationChart.setOption({
    legend: {
      top: "5%",
      transform: "translateY(-50%)",
      show: true,
    },
    series: [
      {
        name: "不合格红线（总条数）",
        type: "pie",
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        selectedMode: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 0,
        },
        label: {
          show: true,
          position: "center",
          formatter: `{total|${100}}` + `\n\r` + `{active|不合格红线（总条数）}`,
          rich: {
            total: {
              fontSize: 35,
              fontFamily: "微软雅黑",
              color: "#2c4b77",
              fontWeight: "bold",
            },
            active: {
              fontFamily: "微软雅黑",
              fontSize: 16,
              color: "#2c4b77",
              fontWeight: "bold",
              lineHeight: 30,
            },
          },
        },
        radius: ["55%", "70%"],
        center: ["50%", "50%"],
        emphasis: {
          scale: true,
          scaleSize: 8,
          itemStyle: {
            borderRadius: 10,
            borderColor: "rgba(159,159,159,0.4)",
            borderWidth: 0,
          },
        },
        data: [
          { value: 82, name: "红线1", itemStyle: { color: "#409eff" } },
          { value: 325, name: "红线2", itemStyle: { color: "#5dd5a5" } },
          { value: 528, name: "红线3", itemStyle: { color: "#5c6f8d" } },
          { value: 107, name: "红线4", itemStyle: { color: "#5adbf6" } },
          { value: 210, name: "红线5", itemStyle: { color: "#faad14" } },
        ],
      },
    ],
  });

  // 响应窗口大小变化
  window.addEventListener("resize", () => {
    qualificationRateChart.resize();
    unqualifiedRelationChart.resize();
    qualifiedRelationChart.resize();
    avgQualificationChart.resize();
    unqualifiedCountChart.resize();
    controlItemQualificationChart.resize();
  });


};

// 过程评分校核弹窗相关
const showWeightDialog = ref(false);
const weightData = ref([
  { controlItem: "控制项1", weight: 0.1 },
  { controlItem: "控制项2", weight: 0.2 },
  { controlItem: "控制项3", weight: 0.3 },
  { controlItem: "控制项4", weight: 0.4 },
  { controlItem: "控制项5", weight: 0.5 },
]);
const weightChartRef = ref(null);
const handleWeightDialog = () => {
  showWeightDialog.value = true;
  nextTick(() => {
    initWeightChart();
  });
};
const initWeightChart = () => {
  const weightChart = echarts.init(weightChartRef.value);
  weightChart.setOption({
    title: {
      text: '过程评分权重图谱'
    },
    tooltip: {},
    legend: [
      {
        data: graphCalc.categories.filter(it => it.name)
      }
    ],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        legendHoverLink: true,
        layout: 'force',
        data: graphCalc.nodes,
        links: graphCalc.links,
        categories: graphCalc.categories,
        zoom: 3,
        draggable: true,
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.1
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 10
          }
        }
      }
    ]
  });
};
const handleCloseWeightDialog = () => {
  showWeightDialog.value = false;
};

// 结果评分详情弹窗相关
const showResultAnalysisDialog = ref(false);
const accuracyChartRef = ref(null);
const keyFeatureControlFactorWeightPieChartRef = ref(null);
const handleResultAnalysisDialog = () => {
  showResultAnalysisDialog.value = true;
  nextTick(() => {
    initAccuracyChart();
    initKeyFeatureControlFactorWeightPieChart();
  });
};
const initAccuracyChart = () => {
  const accuracyChart = echarts.init(accuracyChartRef.value);
  const chartOption = ref({
    title: {
      text: '质量分析模型准确率'
    },
    color: ['#3B82F6', '#10B981'],
    tooltip: { trigger: 'axis' },
    legend: {
      top: 0,
      right: '3%'
    },
    grid: { left: '3%', right: '3%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '训练集',
        type: 'bar',
        label: { show: true, position: 'top', formatter: '{c}%' },
        data: [],
        barWidth: 25,
        barGap: '80%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              { offset: 0, color: 'rgb(31,152,248, 0.1)' },
              { offset: 1, color: '#3B82F6' }
            ]
          },
          borderRadius: [15, 15, 0, 0]
        }
      },
      {
        name: '测试集',
        type: 'bar',
        label: { show: true, position: 'top', formatter: '{c}%' },
        data: [],
        barWidth: 25,
        barGap: '80%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              { offset: 0, color: 'rgb(96,250,179, 0.1)' },
              { offset: 1, color: '#10B981' }
            ]
          },
          borderRadius: [15, 15, 0, 0]
        }
      }
    ]
  });

  mockModelData.result.model_accuracy_json.forEach(it => {
    let labelXAxis = ''
    switch (it.Model) {
      case 'rf':
        labelXAxis = '随机森林模型'
        break
      case 'svm':
        labelXAxis = '支持向量机模型'
        break
      case 'xgboost':
        labelXAxis = '梯度提升树模型'
        break
      case 'mlp':
        labelXAxis = '多层感知机模型'
        break
    }
    chartOption.value.xAxis.data.push(labelXAxis)
    chartOption.value.series[0].data.push(Number(it.CV_Score * 100).toFixed(2))
    chartOption.value.series[1].data.push(Number(it.Test_Score * 100).toFixed(2))
  })

  accuracyChart.setOption(chartOption.value);
};
const initKeyFeatureControlFactorWeightPieChart = () => {
  const keyFeatureControlFactorWeightPieChart = echarts.init(keyFeatureControlFactorWeightPieChartRef.value);

  const chartOption = ref({
    title: {
      text: '关键特征控制因素权重比'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} {c}%'
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 0,
      top: 20,
      bottom: 20
    },
    grid: { left: '3%', right: '3%', bottom: '3%', containLabel: true },
    series: [
      {
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        label: {
          formatter: '{b} {c}%',
          color: 'inherit'
        },
        labelLine: {
          length: 15,
          length2: 5
        },
        data: []
      }
    ]
  })

  let maxAbs = 0
  const maxMinEachLine = {}
  const filterFieldMapping = {}
  Object.entries(fieldMapping).forEach(it => {
    Object.keys(mockProcessData.result.processed_feature).forEach(k => {
      if (it[0] === k) {
        filterFieldMapping[k] = it[1]
      }
    })
  })

  Object.entries(mockProcessData.result.processed_feature).forEach(it => {
    chartOption.value.series[0].data.push({
      name: filterFieldMapping[it[0]],
      value: Number(it[1] * 100).toFixed(2)
    })

    // 特征值对固井质量影响程度，这里组装一下每一个特征值的极值
    mockModelData.result.shap_json_test.forEach(itm => {
      const itmv = itm.shap_values[it[0]]
      if (maxAbs < Math.ceil(Math.abs(itmv))) {
        maxAbs = Math.ceil(Math.abs(itmv))
      }

      maxMinEachLine[it[0]] = {
        max: 0,
        min: 0
      }
      if (maxMinEachLine[it[0]].max < itmv) {
        maxMinEachLine[it[0]].max = itmv
      }

      if (maxMinEachLine[it[0]].min > itmv) {
        maxMinEachLine[it[0]].min > itmv
      }
    })
  })

  keyFeatureControlFactorWeightPieChart.setOption(chartOption.value);
};

const handleCloseResultAnalysisDialog = () => {
  showResultAnalysisDialog.value = false;
};


const secondPictureData = ref({
  leftTableData: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  leftTableTitle: "不合格控制项",
});

const secondPictureData2 = ref({
  leftTableData: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  leftTableTitle: "不合格控制项",
});

const iconList = ref([
  {
    id: 1,
    icon: "formulation",
    title: "配方体系",
    activeName: "first",
    stepName: "stepDataOne",
  },
  {
    id: 2,
    icon: "material",
    title: "材料准备",
    activeName: "second",
    stepName: "stepDataTwo",
  },
  {
    id: 3,
    icon: "experiment",
    title: "入井流体实验",
    activeName: "third",
    stepName: "stepDataThree",
  },
  {
    id: 4,
    icon: "construction",
    title: "固井施工设计",
    activeName: "fourth",
    stepName: "stepDataFour",
  },
  {
    id: 5,
    icon: "condition",
    title: "井眼条件",
    activeName: "fifth",
    stepName: "stepDataFive",
  },
  {
    id: 6,
    icon: "workrecord",
    title: "下套管作业",
    activeName: "sixth",
    stepName: "stepDataSix",
  },
  {
    id: 7,
    icon: "prepare",
    title: "固井施工准备",
    activeName: "seventh",
    stepName: "stepDataSeven",
  },
  {
    id: 8,
    icon: "gujing",
    title: "固井施工",
    activeName: "eighth",
    stepName: "stepDataEight",
  },
  {
    id: 9,
    icon: "geology",
    title: "复杂地质条件",
    activeName: "ninth",
    stepName: "stepDataNine",
  },
]);

// 页面加载完成后初始化图表
onMounted(() => {
  setTimeout(() => {
    initCharts();
  });
});

// 查询处理
const handleQuery = () => {
  ElMessage.success("查询成功");
  // 实际项目中调用API获取数据并更新图表
};

// 重置处理
const handleReset = () => {
  dateRange.value = [];
  wellType.value = "";
  wellCategory.value = "";
  ElMessage.info("已重置筛选条件");
};

// 分页处理
const handleSizeChange = (size) => {
  pageSize.value = size;
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
};
</script>

<style scoped lang="less">
.cementing-quality-dashboard {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* 图表样式 */
.top-charts,
.bottom-charts {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.chart-card {
  flex: 1;
  min-width: 300px;
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
}

.chart-title {
  font-size: 14px;
  color: #5e6573;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #f0f2f5;
  position: relative;
}

.pie-table {
  display: flex;
  flex-direction: column;
  width: 42%;
  height: auto;
  position: absolute;
  left: 56%;
  top: 54%;
  transform: translateY(-50%);
  border-radius: 10px;
  border: 1px #5b8ff5 solid;

  .title {
    text-align: center;
    border-bottom: 1px #d9d7d7 dashed;
  }

  .table-item {
    display: inline-flex;
    align-items: center;
    padding: 4px 20px;
    border-bottom: 1px #d9d7d7 dashed;

    &:last-child {
      border-bottom: none;
    }

    .circle {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #5b8ff5;
      margin-left: 10px;
    }

    .title {
      font-size: 12px;
      margin-left: 10px;
      border-bottom: none;
    }

    .value {
      color: #5b8ff5;
      margin-left: auto;
      margin-right: 10px;
      text-align: justify;
      text-align-last: justify;
      font-size: 14px;
      font-weight: 900;
    }
  }
}

.chart-container {
  width: 100%;
  height: 300px;
}

/* 筛选表单 */
.filter-form {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* 表格样式 */
.data-table {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.operation-btn {
  color: #409eff;
  padding: 0 5px;
}

/* 分页样式 */
.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.time-selector {
  width: 250px;

  :deep(.el-date-editor.el-input) {
    width: 100%;
  }

  :deep(.el-range-editor.el-input__wrapper) {
    width: 100%;
    align-items: center;
    display: inline-flex;
    padding: 0 10px;
    vertical-align: middle;
  }
}
</style>