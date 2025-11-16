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

            <el-table :data="tableData" style="width: 100%;height: 100%;" row-key="id" border lazy :load="load"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
              <el-table-column prop="name" label="控制项" />
              <el-table-column prop="value1" label="一级权重" />
              <el-table-column prop="value2" label="二级权重" />
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
        <div style="display: flex; gap: 20px; height: 800px;">
          <!-- 质量分析模型准确率柱状图 -->
          <div ref="accuracyChartRef" class="chart-container" style="width: 50%; height: 100%;"></div>
          <!-- 单井分析图 -->
          <div ref="singleWellAnalysisChartRef" class="chart-container" style="width: 50%; height: 100%;"></div>
          <!-- 关键特征控制因素权重比饼图 -->
          <div ref="keyFeatureControlFactorWeightPieChartRef" class="chart-container" style="width: 50%; height: 100%;">
          </div>
          <!-- 特征值对固井质量影响程度分析图 -->
          <div ref="featureValueAnalysisChartRef" class="chart-container" v-show="false"
            style="width: 50%; height: 100%;">
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
import { colorByNumber } from "../utils/utils-manage";
import { mockSingleData } from "../mock/mock-single-data";

// 筛选条件
const dateRange = ref([]);
const wellType = ref("");
const wellCategory = ref("");

// 分页参数
const currentPage = ref(1);
const pageSize = ref(10);

// 表格数据
// < !--
//   打分表 - 主表
// 项目 - 入井流体实验	0.1830
// 项目 - 井眼条件	0.1890
// 项目 - 下套管作业	0.0840
// 项目 - 固井施工	0.3410
// 项目 - 水泥浆返高	0.2030

// 打分表 - 入井流体实验
// 项目 - 水泥浆稠化时间	0.4110
// 项目 - 初始稠度	0.1360
// 项目 - 水泥石抗压强度(24h)	0.3490
// 项目 - 水泥浆静置后上下密度差	0.1040

// 打分表 - 井眼条件
// 项目 - 环空上返速度	0.1210
// 项目 - 钻井液循环周次	0.0840
// 项目 - 进出口密度差	0.0930
// 项目 - 上窜速度	0.041
// 项目 - 固井前钻井液塑性粘度	0.1480
// 项目 - 钻头 - 套管尺寸（环空间隙）	0.1350
// 项目 - 井径扩大率	0.378

// 打分表 - 下套管作业
// 项目 - 套管居中度	0.541
// 项目 - 人工井底距油层底界	0.264
// 项目 - 油井阻流环与浮鞋间距	0.195

// 打分表 - 固井施工
// 项目 - 前置液体积量占裸眼环空高度	0.0581
// 项目 - 前置液紊流接触时间	0.0745
// 项目 - 浆柱密度差	0.0431
// 项目 - 隔离液在循环温度下，动塑比	0.0325
// 项目 - 隔离液滤失量	0.024
// 项目 - 水泥浆密度记录偏差	0.0479
// 项目 - 测量记录间隔	0.0311
// 项目 - 中停时间	0.0795
// 项目 - 施工参数（排量、压力、水泥浆密度、注入量等）记录	0.0341
// 项目 - 胶塞入井	0.0727
// 项目 - 替量符合固井施工设计要求	0.103
// 项目 - 顶替过程连续	0.0705
// 项目 - 压力有监控记录	0.0205
// 项目 - 排量有监控记录	0.0235
// 项目 - 井口返出情况有监控记录	0.0282
// 项目 - 碰压	0.063
// 项目 - 无碰压现象，顶替量－设计顶替量	0.0691
// 项目 - 小排量碰压，碰压附加值	0.033
// 项目 - 下胶塞清水静压穿透压力	0.0161

// 打分表 - 水泥浆返高
// 项目 - 表层套管	0.144
// 项目 - 技术套管	0.281
// 项目 - 生产套管	0.575
// -->
const tableData = ref([
  {
    id: "1",
    name: '入井流体实验',
    value1: 0.183,
    children: [
      {
        id: "1.1",
        name: '水泥浆稠化时间',
        value2: 0.411,
      },
      {
        id: "1.2",
        name: '初始稠度',
        value2: 0.136,
      },
      {
        id: "1.3",
        name: '水泥石抗压强度(24h)',
        value2: 0.349,
      },
      {
        id: "1.4",
        name: '水泥浆静置后上下密度差',
        value2: 0.104,
      }
    ]
  },
  {
    id: "2",
    name: '井眼条件',
    value1: 0.189,
    children: [
      {
        id: "2.1",
        name: '环空上返速度',
        value2: 0.121,
      },
      {
        id: "2.2",
        name: '钻井液循环周次',
        value2: 0.084,
      },
      {
        id: "2.3",
        name: '进出口密度差',
        value2: 0.093,
      },
      {
        id: "2.4",
        name: '上窜速度',
        value2: 0.041,
      },
      {
        id: "2.5",
        name: '固井前钻井液塑性粘度',
        value2: 0.148,
      },
      {
        id: "2.6",
        name: '钻头-套管尺寸（环空间隙）',
        value2: 0.135,
      },
      {
        id: "2.7",
        name: '井径扩大率',
        value2: 0.378,
      }
    ]
  },
  {
    id: "3",
    name: '下套管作业',
    value1: 0.084,
    children: [
      {
        id: "3.1",
        name: '套管居中度',
        value2: 0.541,
      },
      {
        id: "3.2",
        name: '人工井底距油层底界',
        value2: 0.264,
      },
      {
        id: "3.3",
        name: '油井阻流环与浮鞋间距',
        value2: 0.195,
      }
    ]
  },
  {
    id: "4",
    name: '固井施工',
    value1: 0.341,
    children: [
      {
        id: "4.1",
        name: '前置液体积量占裸眼环空高度',
        value2: 0.0581,
      },
      {
        id: "4.2",
        name: '前置液紊流接触时间',
        value2: 0.0745,
      },
      {
        id: "4.3",
        name: '浆柱密度差',
        value2: 0.0431,
      },
      {
        id: "4.4",
        name: '隔离液在循环温度下动塑比',
        value2: 0.0325,
      },
      {
        id: "4.5",
        name: '隔离液滤失量',
        value2: 0.024,
      },
      {
        id: "4.6",
        name: '水泥浆密度记录偏差',
        value2: 0.0479,
      },
      {
        id: "4.7",
        name: '测量记录间隔',
        value2: 0.0311,
      },
      {
        id: "4.8",
        name: '中停时间',
        value2: 0.0795,
      },
      {
        id: "4.9",
        name: '施工参数（排量、压力、水泥浆密度、注入量等）记录',
        value2: 0.0341,
      },
      {
        id: "4.10",
        name: '胶塞入井',
        value2: 0.0727,
      },
      {
        id: "4.11",
        name: '替量符合固井施工设计要求',
        value2: 0.103,
      },
      {
        id: "4.12",
        name: '顶替过程连续',
        value2: 0.0705,
      },
      {
        id: "4.13",
        name: '压力有监控记录',
        value2: 0.0205,
      },
      {
        id: "4.14",
        name: '排量有监控记录',
        value2: 0.0235,
      },
      {
        id: "4.15",
        name: '井口返出情况有监控记录',
        value2: 0.0282,
      },
      {
        id: "4.16",
        name: '碰压',
        value2: 0.063,
      },
      {
        id: "4.17",
        name: '无碰压现象，顶替量－设计顶替量',
        value2: 0.0691,
      },
      {
        id: "4.18",
        name: '小排量碰压，碰压附加值',
        value2: 0.033,
      },
      {
        id: "4.19",
        name: '下胶塞清水静压穿透压力',
        value2: 0.0161,
      }
    ]
  },
  {
    id: "5",
    name: '水泥浆返高',
    value1: 0.203,
    children: [
      {
        id: "5.1",
        name: '表层套管',
        value2: 0.144,
      },
      {
        id: "5.2",
        name: '技术套管',
        value2: 0.281,
      },
      {
        id: "5.3",
        name: '生产套管',
        value2: 0.575,
      }
    ]
  }
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
const featureValueAnalysisChartRef = ref(null);
const singleWellAnalysisChartRef = ref(null);
const handleResultAnalysisDialog = () => {
  showResultAnalysisDialog.value = true;
  nextTick(() => {
    initAccuracyChart();
    initKeyFeatureControlFactorWeightPieChart();
    initFeatureValueAnalysisChart();
    initSingleWellAnalysisChart();
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
const initFeatureValueAnalysisChart = () => {
  let maxAbs = 0
  const maxMinEachLine = {}
  // 关键特征控制因素权重比
  Object.entries(mockProcessData.result.processed_feature).forEach(it => {
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
  const featureValueAnalysisChart = echarts.init(featureValueAnalysisChartRef.value);
  // 过滤特征要素
  const filterFieldMapping = {}
  Object.entries(fieldMapping).forEach(it => {
    Object.keys(mockProcessData.result.processed_feature).forEach(k => {
      if (it[0] === k) {
        filterFieldMapping[k] = it[1]
      }
    })
  })
  // 特征值对固井质量影响程度
  const modelShapJsonTestData = []
  mockModelData.result.shap_json_test.forEach(it => {
    Object.keys(it.shap_values).forEach(k => {
      modelShapJsonTestData.push({
        name: filterFieldMapping[k],
        value: [it.shap_values[k], filterFieldMapping[k]],
        itemStyle: {
          color: colorByNumber(it.shap_values[k], maxMinEachLine[k].min, maxMinEachLine[k].max)
        }
      })
    })
  })
  featureValueAnalysisChart.setOption({
    title: {
      text: '特征值对固井质量影响程度/单井智能预测得分'
    },
    color: ['#3B82F6', '#10B981'],
    tooltip: { trigger: 'item' },
    legend: {
      top: 0,
      right: '6%'
    },
    grid: {
      left: '3%',
      right: '7%',
      bottom: '3%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      },
      max: maxAbs,
      min: -maxAbs
    },
    yAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0
      },
      data: Object.values(filterFieldMapping)
    },
    graphic: [
      {
        type: 'group',
        right: 30,
        top: 'center',
        children: [
          {
            type: 'rect',
            z: 100,
            left: 'center',
            top: 'middle',
            shape: {
              width: 10,
              height: 550,
              r: [10]
            },
            style: {
              fill: {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  { offset: 0, color: 'blue' },
                  { offset: 1, color: 'red' }
                ]
              }
            }
          }
        ]
      },
      {
        type: 'group',
        right: 0,
        top: 0,
        children: [
          {
            type: 'text',
            z: 100,
            style: {
              fill: '#333',
              overflow: 'break',
              text: 'High',
              font: '14px Microsoft YaHei',
              fontWeight: 'bolder'
            }
          }
        ]
      },
      {
        type: 'group',
        right: 0,
        bottom: 0,
        children: [
          {
            type: 'text',
            z: 100,
            style: {
              fill: '#333',
              overflow: 'break',
              text: 'Low',
              font: '14px Microsoft YaHei',
              fontWeight: 'bolder'
            }
          }
        ]
      },
      {
        type: 'group',
        right: 0,
        bottom: 'center',
        rotation: -23.55,
        children: [
          {
            type: 'text',
            z: 100,
            style: {
              fill: '#333',
              overflow: 'break',
              text: 'Feature Value',
              font: '14px Microsoft YaHei'
            }
          }
        ]
      },
      {
        type: 'group',
        right: 240,
        bottom: 0,
        children: [
          {
            type: 'text',
            z: 100,
            style: {
              fill: '#333',
              overflow: 'break',
              text: 'SHAP Value(impact on model output)',
              font: '14px Microsoft YaHei'
            }
          }
        ]
      }
    ],
    series: [
      {
        type: 'scatter',
        symbolSize: 5,
        data: modelShapJsonTestData
      }
    ]
  });
};
const initSingleWellAnalysisChart = () => {
  // 过滤特征要素
  const filterFieldMapping = {}
  Object.entries(fieldMapping).forEach(it => {
    Object.keys(mockProcessData.result.processed_feature).forEach(k => {
      if (it[0] === k) {
        filterFieldMapping[k] = it[1]
      }
    })
  })
  // 单井特征值影响分析
  const echartsRef4ForData = []
  const narrowWidth = 0.015
  let startPoint = narrowWidth // 累加值
  const singleShapValues = mockSingleData.sample_1.shap_values
  const singleEfx = mockSingleData.sample_1.E_fx
  for (const key in singleShapValues) {
    if (Object.prototype.hasOwnProperty.call(singleShapValues, key)) {
      const v = singleShapValues[key]
      echartsRef4ForData.push({
        label: key,
        value: v
      })
    }
  }
  const maxVal = echartsRef4ForData.reduce((pre, cur) => cur.value + pre, 0)

  const singleWellAnalysisChart = echarts.init(singleWellAnalysisChartRef.value);
  singleWellAnalysisChart.setOption({
    title: {
      text: '单井特征值影响分析'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter(itm) {
        if (itm.find(it => it.value !== '-').value !== '-') {
          return itm.find(it => it.value !== '-').axisValue + ': ' + itm.find(it => it.value !== '-').value
        }
      }
    },
    grid: {
      left: '3%',
      right: '10%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      // 显示 singleEfx 作为基准线（原0点位置现在显示 singleEfx）
      axisLabel: {
        formatter: function (value) {
          // 显示原始值而非差值
          if (value + singleEfx === singleEfx) {
            return `E[f(x)] = ${Number(value + singleEfx).toFixed(2)}`
          } else {
            return Number(value + singleEfx).toFixed(2)
          }
        }
      },
      // 突出显示 singleEfx 基准线（原0刻度线）
      splitLine: {
        lineStyle: {
          color: function (params) {
            return params.value === 0 ? 'red' : '#eee' // 0位置对应实际50
          },
          width: function (params) {
            return params.value === 0 ? 2 : 1
          }
        }
      },
      min: -maxVal,
      max: maxVal
    },
    yAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0
      },
      axisLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      data: echartsRef4ForData.map(it => filterFieldMapping[it.label])
    },
    graphic: [
      {
        type: 'group',
        right: 0,
        top: 0,
        children: [
          {
            type: 'text',
            right: 0,
            top: 'middle', // 相对父元素居中
            style: {
              text: '预测结果：' + mockSingleData.sample_1.predicted_class,
              fill: '#FF0d10',
              fontSize: 14,
              textAlign: 'center'
            }
          },
          {
            type: 'text',
            right: 0,
            bottom: -30,
            style: {
              text: '实际结果：' + mockSingleData.sample_1.true_class,
              fill: '#188df0',
              fontSize: 14,
              textAlign: 'center'
            }
          },
          {
            type: 'text',
            right: 0,
            top: -30,
            style: {
              text: '预测为合格的概率：' + Number(mockSingleData.sample_1.fx * 100).toFixed(2) + '%',
              fontSize: 14,
              textAlign: 'center'
            }
          }
        ]
      }
    ],
    series: echartsRef4ForData.map((it, idx, arr) => {
      return {
        type: 'custom',
        data: new Array(arr.length).fill('-').map((_, itDataIdx) => {
          if (idx === itDataIdx) {
            return it.value
          } else {
            return _
          }
        }),
        renderItem: function (params, api) {
          // 1. 获取当前数据值-x轴值，需要减去上一个元素的值
          const value = api.value(0)
          // 2. 获取当前类目在y轴中的位置-y轴坐标
          const y = api.coord([0, api.value(1)])[1] // api.value(1)是当前索引
          // 3. 图形高度（每个类目的高度）
          const height = 20
          // 4. 定义多边形顶点（基于数据值和坐标系转换）
          if (idx > 0) {
            if (!isNaN(value)) {
              if (arr[idx - 1].value !== 0) {
                startPoint += (arr[idx - 1].value + narrowWidth)
              }
            }
          }
          const points = [
            [api.coord([value === 0 ? startPoint : startPoint, api.value(1)])[0], y - height / 2], // 起点
            [
              api.coord(
                [
                  value === 0 ? startPoint : value > 0 ? startPoint + value - narrowWidth : startPoint + value + narrowWidth,
                  api.value(1)
                ]
              )[0],
              y - height / 2
            ], // 上右
            [
              api.coord(
                [
                  startPoint + value,
                  api.value(1)
                ]
              )[0],
              y
            ], // 右上顶点
            [
              api.coord(
                [
                  value === 0 ? startPoint : value > 0 ? startPoint + value - narrowWidth : startPoint + value + narrowWidth,
                  api.value(1)
                ]
              )[0],
              y + height / 2
            ], // 下右
            [api.coord([value === 0 ? startPoint : startPoint, api.value(1)])[0], y + height / 2] // 左下
          ]

          // 5. 返回多边形图形
          return {
            type: 'polygon',
            shape: {
              points // 多边形顶点数组
            },
            style: {
              fill: api.value(0) > 0 ? '#FF0d10' : '#188df0',
              lineWidth: 0
            },
            textContent: {
              style: {
                // 文本内容，可以使用富文本，这里简单显示一个值
                text: isNaN(value) ? '' : value > 0 ? `+${value}` : value,
                fill: value > 0 ? '#FF0d10' : '#188df0',
                fontSize: 14,
                fontWeight: 'bolder',
                textAlign: 'center'
              }
            },
            // 文本的布局配置 (textConfig)
            textConfig: {
              position: 'right',
              // 偏移量 [横向, 纵向]，单位是像素（px）
              offset: [0, 0],
              autoRotate: false
            },
            // 文本的层级，确保文本显示在图形上方
            z2: 100,
            // 6. 定义鼠标hover的交互区域
            emphasis: {
              style: {
                fill: api.value(0) > 0 ? '#FF0d1099' : '#188df099'
              }
            }
          }
        },
        // 7. 声明数据维度（x轴为数值，y轴为索引）
        encode: {
          x: 0, // 第0维度对应x轴
          y: 1 // 第1维度对应y轴（自动使用数据索引）
        }
      }
    })
  });
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