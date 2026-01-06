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
      <el-table :data="tableDataDetail" border class="data-table">
        <el-table-column type="index" :index="index" label="序号" width="80" align="center" />
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

            <!-- 表格样式美化一下，要区分一级权重和二级权重，并且默认展开所有一级权重 -->
            <div style="width: 100%;height: 100%;">
              <div class="chart-title" style="display: flex;justify-content: space-between;align-items: center;">
                <div>
                  <span>过程评分控制项校核 （注：可以修改权重值，但是不能修改控制项名称）</span>
                  <el-button type="success" size="small" @click="handleAddWeightStandardItem">新增控制项</el-button>
                </div>
                <div>
                  <el-button v-if="isEditing" type="danger" @click="handleSave(row)">保存</el-button>
                  <el-button v-if="isEditing" type="primary" @click="handleCancel">取消</el-button>
                </div>
              </div>
              <el-table :data="tableData" style="width: 100%;height: 100%;" row-key="id" border default-expand-all
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :row-class-name="getRowClassName"
                class="weight-table">
                <el-table-column prop="name" label="控制项" min-width="200">
                  <template #default="{ row }">
                    <span :class="row.value1 ? 'level-one-name' : 'level-two-name'">
                      {{ row.name }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="value1" label="一级权重" width="150" align="center">
                  <template #default="{ row }">
                    <span v-if="row.value1">
                      <span v-if="!isEditing" @click="handleEdit(row)" class="weight-value level-one-weight">{{
                        formatWeight(row.value1) }}</span>
                      <span v-else>
                        <input style="width: 50%;" type="text" class="weight-value level-one-weight"
                          v-model="row.value1" />

                      </span>
                    </span>
                    <span v-else class="weight-placeholder">-</span>
                  </template>
                </el-table-column>
                <el-table-column prop="value2" label="二级权重" width="150" align="center">
                  <template #default="{ row }">
                    <span v-if="row.value2">
                      <span v-if="!isEditing" @click="handleEdit(row)" class="weight-value level-two-weight">{{
                        formatWeight(row.value2) }}</span>
                      <span v-else>
                        <input style="width: 50%;" type="text" class="weight-value level-two-weight"
                          v-model="row.value2" />
                      </span>
                    </span>
                    <span v-else class="weight-placeholder">-</span>
                  </template>
                </el-table-column>
                <!-- 操作列 -->
                <el-table-column label="操作" align="center">
                  <template #default="{ row }">
                    <el-button v-if="row.children" type="primary" size="small" text
                      @click="handleAddWeight(row)">新增子权重</el-button>
                    <el-button type="danger" size="small" text @click="handleDeleteWeight(row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>


          </div>
          <div style="width: 50%; height: 100%;display: flex;flex-direction: column;gap: 10px;">
            <div style="width: 100%; height: 15%;box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);border-radius: 10px;">
              <!-- 展示权重修改的前后对比 -->
              <div style="width: 100%; height: 100%;display: flex;align-items: center;justify-content: center;"
                v-if="false">
                <div style="width: 50%; height: 100%;">
                  <div ref="weightChartRefBefore" class="chart-container" style="width: 100%; height: 100%;"></div>
                </div>
                <div style="width: 50%; height: 100%;">
                  <div ref="weightChartRefAfter" class="chart-container" style="width: 100%; height: 100%;"></div>
                </div>
              </div>

              <!-- 展示权重修改前后的评分结果对比 -->
              <div style="width: 100%; height: 100%; display: flex; flex-direction: row; gap: 16px; padding: 16px 0;">
                <div style="width: 50%; height: 100%; text-align: center;align-content: center;">
                  <div style="color: #333; font-size: 15px; font-weight: 500; letter-spacing: 1px;">权重修改前过程综合评分（平均）
                  </div>
                  <div style="color: darkred; font-size: 28px; font-weight: bold;margin-top: 10px;">
                    <span>85.6</span>
                  </div>
                </div>
                <el-divider style="height: 100%;" direction="vertical" />
                <div style="width: 50%; height: 100%; text-align: center;align-content: center;">
                  <div style="color: #333; font-size: 15px; font-weight: 500; letter-spacing: 1px;">权重修改后过程综合评分（平均）
                  </div>
                  <div style="color: #10b981; font-size: 28px; font-weight: bold; margin-top: 10px;">
                    <CountUp :startVal="0" :endVal="editoredVal" :duration="2" :decimalPlaces="2" />
                  </div>
                </div>
              </div>
            </div>
            <div ref="weightChartRef"
              style="width: 100%; height: 85%;box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);border-radius: 10px;"></div>
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleCloseWeightDialog">取 消</el-button>
            <el-button type="primary" @click="handleCloseWeightDialog">确 定</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 新增控制项弹窗 -->
      <el-dialog v-model="showAddWeightStandardItemDialog" title="新增控制项" width="50%">
        <el-form label-width="120px">
          <el-form-item label="控制项名称">
            <el-input v-model="addWeightStandardItemFormName" />
          </el-form-item>
          <el-form-item label="控制项值">
            <el-input v-model="addWeightStandardItemFormValue" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleCloseAddWeightStandardItemDialog">取 消</el-button>
            <el-button type="primary" @click="handleAddWeightStandardItemDialogHandleSubmit">确 定</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 新增子权重弹窗 -->
      <el-dialog v-model="showAddWeightDialog" title="新增子权重" width="50%">
        <el-form label-width="120px">
          <el-form-item label="子权重名称">
            <el-input v-model="addWeightFormName" />
          </el-form-item>
          <el-form-item label="子权重值">
            <el-input v-model="addWeightFormValue" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleCloseAddWeightDialog">取 消</el-button>
            <el-button type="primary" @click="handleAddWeightDialogHandleSubmit">确 定</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 结果评分详情弹窗 -->
      <el-dialog v-model="showResultAnalysisDialog" title="结果评分详情" width="90%">
        <div style="height: 800px;">
          <div style="width: 100%; height: 50%; display: flex;">
            <!-- 质量分析模型准确率柱状图 -->
            <div ref="accuracyChartRef" class="chart-container" style="width: 100%; height: 100%;"></div>
          </div>
          <div style="width: 100%; height: 50%; display: flex; gap: 20px;">
            <!-- 质量关键要素评分图 -->
            <div ref="projectOverallAnalysisChartRef" class="chart-container" style="width: 50%; height: 100%;">
            </div>
            <!-- 关键特征控制因素权重比饼图 -->
            <div ref="keyFeatureControlFactorWeightPieChartRef" class="chart-container"
              style="width: 50%; height: 100%;">
            </div>
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
import { ElMessage, ElMessageBox } from "element-plus";
import { graphCalc } from "../mock/graph-calc";
import { mockModelData } from "../mock/mock-model-data";
import { mockProcessData } from "../mock/mock-process-data";
import { fieldMapping } from "../mock/processFieldMap";
import { colorByNumber } from "../utils/utils-manage";
import { mockSingleData } from "../mock/mock-single-data";
import CountUp from 'vue-countup-v3'

const editoredVal = ref((Math.random() * 100).toFixed(2));
// 筛选条件
const dateRange = ref([]);
const wellType = ref("");
const wellCategory = ref("");

// 分页参数
const currentPage = ref(1);
const pageSize = ref(10);

// 表格数据
/**
 * <el-table-column prop="serial" label="序号" width="80" align="center" />
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
 */
/**
 * 固井质量详情表格数据
 * @type {Array<Object>}
 */
const tableDataDetail = ref([
  {
    serial: 1,
    projectDept: '一部',
    projectGroup: '一组',
    wellType: '定向井',
    wellCategory: '油井',
    wellCount: 82,
    processScore: 85.6,
    resultScore: 88.2,
    unqualifiedLines: 6
  },
  {
    serial: 3,
    projectDept: '二部',
    projectGroup: '一组',
    wellType: '定向井',
    wellCategory: '油井',
    wellCount: 325,
    processScore: 90.5,
    resultScore: 92.8,
    unqualifiedLines: 5
  },
  {
    serial: 5,
    projectDept: '三部',
    projectGroup: '一组',
    wellType: '定向井',
    wellCategory: '油井',
    wellCount: 528,
    processScore: 91.2,
    resultScore: 93.5,
    unqualifiedLines: 8
  },
  {
    serial: 7,
    projectDept: '四部',
    projectGroup: '一组',
    wellType: '定向井',
    wellCategory: '油井',
    wellCount: 107,
    processScore: 88.7,
    resultScore: 90.3,
    unqualifiedLines: 7
  },
  {
    serial: 10,
    projectDept: '五部',
    projectGroup: '三组',
    wellType: '直井',
    wellCategory: '油井',
    wellCount: 142,
    processScore: 84.1,
    resultScore: 86.6,
    unqualifiedLines: 5
  }
]);

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

const isEditing = ref(false);
const orginBack = ref([]);
const handleEdit = (row) => {
  console.log('编辑权重', row);
  isEditing.value = true;
  orginBack.value = JSON.parse(JSON.stringify(tableData.value));
};

const handleSave = (row) => {
  console.log('保存权重', row);
  isEditing.value = false;
  editoredVal.value = (Math.random() * 100).toFixed(2);
  // initWeightChartAfter();
}

const handleCancel = () => {
  isEditing.value = false;
  tableData.value = JSON.parse(JSON.stringify(orginBack.value));
}

const weightChartRefBefore = ref(null);
const weightChartRefAfter = ref(null);
const initWeightChartBefore = () => {
  const dataBack = JSON.parse(JSON.stringify(tableData.value));
  const weightChartBefore = echarts.init(weightChartRefBefore.value);
  weightChartBefore.setOption({
    title: {
      text: '修改前控制项权重',
      left: 'center',
      top: 15,
      textStyle: {
        color: '#333',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "item",
      axisPointer: { type: "shadow" },
    },
    grid: { left: "3%", right: "10%", bottom: "3%", containLabel: true },
    series: [
      {
        data: dataBack.map(item => {
          return {
            value: item.value1,
            name: item.name,
            label: {
              show: true,
              position: "outside",
              formatter: "{b}: {c} ({d}%)"
            },
          }
        }),
        type: "pie",
      }],
  });
  weightChartBefore.on('click', (params) => {
    const dataBackChildren = dataBack.find(item => item.name === params.name).children;
    weightChartBefore.setOption({
      series: [{
        data: dataBackChildren.map(item => {
          return {
            value: item.value2,
            name: item.name,
            label: {
              show: true,
              position: "outside",
              formatter: "{b}: {c} ({d}%)"
            },
          }
        }),
        type: "pie",
      }],
      graphic: [
        {
          type: 'text',
          right: 50,
          top: 20,
          style: {
            text: '返回上一级',
            fontSize: 14,
            fill: '#333'
          },
          onclick: function () {
            weightChartBefore.setOption({
              title: {
                text: '修改前控制项权重',
                left: 'center',
                top: 15,
                textStyle: {
                  color: '#333',
                  fontSize: 16,
                },
              },
              tooltip: {
                trigger: "item",
                axisPointer: { type: "shadow" },
              },
              grid: { left: "3%", right: "10%", bottom: "3%", containLabel: true },
              series: [
                {
                  data: dataBack.map(item => {
                    return {
                      value: item.value1,
                      name: item.name,
                      label: {
                        show: true,
                        position: "outside",
                        formatter: "{b}: {c} ({d}%)"
                      },
                    }
                  }),
                  type: "pie",
                }],
            })
          }
        }
      ]
    });
  });
}
const initWeightChartAfter = () => {
  const dataBack = tableData.value
  const weightChartAfter = echarts.init(weightChartRefAfter.value);
  weightChartAfter.setOption({
    title: {
      text: '修改后控制项权重',
      left: 'center',
      top: 15,
      textStyle: {
        color: '#333',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "item",
      axisPointer: { type: "shadow" },
    },
    grid: { left: "3%", right: "10%", bottom: "3%", containLabel: true },
    series: [
      {
        data: dataBack.map(item => {
          return {
            value: item.value1,
            name: item.name,
            label: {
              show: true,
              position: "outside",
              formatter: "{b}: {c} ({d}%)"
            },
          }
        }),
        type: "pie",
      }],
  });
  weightChartAfter.on('click', (params) => {
    const dataBackChildren = dataBack.find(item => item.name === params.name).children;
    weightChartAfter.setOption({
      series: [{
        data: dataBackChildren.map(item => {
          return {
            value: item.value2,
            name: item.name,
            label: {
              show: true,
              position: "outside",
              formatter: "{b}: {c} ({d}%)"
            },
          }
        }),
        type: "pie",
      }],
      graphic: [
        {
          type: 'text',
          right: 50,
          top: 20,
          style: {
            text: '返回上一级',
            fontSize: 14,
            fill: '#333'
          },
          onclick: function () {
            weightChartAfter.setOption({
              title: {
                text: '修改后控制项权重',
                left: 'center',
                top: 15,
                textStyle: {
                  color: '#333',
                  fontSize: 16,
                },
              },
              tooltip: {
                trigger: "item",
                axisPointer: { type: "shadow" },
              },
              grid: { left: "3%", right: "10%", bottom: "3%", containLabel: true },
              series: [
                {
                  data: dataBack.map(item => {
                    return {
                      value: item.value1,
                      name: item.name,
                      label: {
                        show: true,
                        position: "outside",
                        formatter: "{b}: {c} ({d}%)"
                      },
                    }
                  }),
                  type: "pie",
                }],
            })
          }
        }
      ]
    });
  });
}

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
      data: ["一部", "二部", "三部", "四部", "五部", "整体"],
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
        五部: true,
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
          { value: 10, name: "五部", label: { color: "#f1bc18" } },
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
          { value: 10, name: "五部", itemStyle: { color: "#f1bc18" } },
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
        五部: true,
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
          { value: 210, name: "五部", label: { color: "#f1bc18" } },
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
          { value: 210, name: "五部", itemStyle: { color: "#f1bc18" } },
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
      data: ["一部", "二部", "三部", "四部", "五部"],
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
      data: ["一部", "二部", "三部", "四部", "五部"],
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

  // 6. 不合格红线（总条数）分布图（内圈+外圈关联关系）
  const controlItemQualificationChart = echarts.init(
    controlItemQualificationRef.value
  );

  // 内圈数据：不合格红线（总条数）
  const innerData = [
    { value: 82, name: "红线1", itemStyle: { color: "#409eff" } },
    { value: 325, name: "红线2", itemStyle: { color: "#5dd5a5" } },
    { value: 528, name: "红线3", itemStyle: { color: "#5c6f8d" } },
    { value: 107, name: "红线4", itemStyle: { color: "#5adbf6" } },
    { value: 210, name: "红线5", itemStyle: { color: "#faad14" } },
  ];

  // 外圈数据：每个红线对应的关联关系（项目部分布）
  const outerData = [
    // 红线1对应的项目部分布
    { value: 20, name: "一部-红线1", itemStyle: { color: "#409eff" } },
    { value: 15, name: "二部-红线1", itemStyle: { color: "#5dd5a5" } },
    { value: 25, name: "三部-红线1", itemStyle: { color: "#5c6f8d" } },
    { value: 12, name: "四部-红线1", itemStyle: { color: "#5adbf6" } },
    { value: 10, name: "五部-红线1", itemStyle: { color: "#faad14" } },
  ];

  controlItemQualificationChart.setOption({
    legend: {
      bottom: "center",
      right: "0",
      orient: 'vertical',
      show: true,
      data: innerData.map(item => item.name),
    },
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        if (params.seriesName === "不合格红线（总条数）") {
          return params.seriesName + " <br/>" + params.name + ": " + params.value + " (" + params.percent + "%)";
        } else {
          return params.seriesName + " <br/>" + params.name + ": " + params.value + " (" + params.percent + "%)";
        }
      },
    },
    series: [
      // 内圈：不合格红线（总条数）
      {
        name: "不合格红线（总条数）",
        type: "pie",
        selectedMode: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
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
        labelLine: {
          show: false,
        },
        radius: ["60%", "80%"],
        center: ["50%", "50%"],
        emphasis: {
          scale: true,
          scaleSize: 8,
          itemStyle: {
            borderRadius: 10,
            borderColor: "rgba(159,159,159,0.4)",
            borderWidth: 2,
          },
        },
        data: innerData,
      },
      // 外圈：关联关系（项目部分布）
      {
        name: "红线关联关系",
        type: "pie",
        selectedMode: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: "#fff",
          borderWidth: 1,
        },
        label: {
          show: true,
          position: "outside",
          formatter: function (params) {
            // 只显示项目部名称，不显示红线名称
            const parts = params.name.split('-');
            return parts[0];
          },
          fontSize: 12,
          color: "#606266",
        },
        labelLine: {
          show: true,
          length: 15,
          length2: 8,
        },
        radius: ["85%", "100%"],
        center: ["50%", "50%"],
        emphasis: {
          scale: true,
          scaleSize: 5,
          itemStyle: {
            borderRadius: 8,
            borderColor: "rgba(159,159,159,0.4)",
            borderWidth: 2,
          },
        },
        data: outerData,
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
    initWeightChartBefore();
    initWeightChartAfter();
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
const projectOverallAnalysisChartRef = ref(null);
const keyFeatureControlFactorWeightPieChartRef = ref(null);

const handleResultAnalysisDialog = () => {
  showResultAnalysisDialog.value = true;
  nextTick(() => {
    initAccuracyChart();
    initProjectOverallAnalysisChart();
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
const initProjectOverallAnalysisChart = () => {
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

  const projectOverallAnalysisChart = echarts.init(projectOverallAnalysisChartRef.value);
  projectOverallAnalysisChart.setOption({
    title: {
      text: '质量关键要素评分'
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
    // echartsRef4ForData 的字段呈现为 柱状图，并且柱状图的宽度为 25，柱状图的间距为 80%
    series: [
      {
        type: 'bar',
        data: echartsRef4ForData.map(it => {
          return {
            value: it.value,
            label: it.label,
            barWidth: 25,
            barGap: '80%',
            color: '#3B82F6',
            label: { show: true, position: it.value > 0 ? 'left' : 'right', color: it.value > 0 ? 'blue' : 'red', formatter: '{c}' },
            textStyle: {
              color: it.value > 0 ? 'blue' : 'red'
            },
            itemStyle: {
              color: it.value > 0 ? 'blue' : 'red'
            }
          }
        }),
      }
    ]
  });
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

/**
 * 格式化权重数值
 * @param {number} value - 权重值
 * @returns {string} 格式化后的权重值
 */
const formatWeight = (value) => {
  if (value === null || value === undefined) return '-';
  return (value * 100).toFixed(2) + '%';
};

/**
 * 获取表格行的类名，用于区分一级和二级权重
 * @param {object} param - 行数据对象
 * @param {number} param.rowIndex - 行索引
 * @param {object} param.row - 行数据
 * @returns {string} 行类名
 */
const getRowClassName = ({ row }) => {
  // 一级权重行（有 value1 且有 children）
  if (row.value1 && row.children) {
    return 'level-one-row';
  }
  // 二级权重行（有 value2 且没有 value1）
  if (row.value2 && !row.value1) {
    return 'level-two-row';
  }
  return '';
};

const showAddWeightStandardItemDialog = ref(false);
const addWeightStandardItemFormName = ref("");
const addWeightStandardItemFormValue = ref(null);

// 新增控制项
const handleAddWeightStandardItem = () => {
  console.log('新增控制项');
  showAddWeightStandardItemDialog.value = true;
};


const handleCloseAddWeightStandardItemDialog = () => {
  showAddWeightStandardItemDialog.value = false;
  addWeightStandardItemFormName.value = "";
  addWeightStandardItemFormValue.value = null;
};

const handleAddWeightStandardItemDialogHandleSubmit = () => {
  console.log('新增控制项弹窗确定', addWeightStandardItemFormName.value);
  if (addWeightStandardItemFormName.value == null || addWeightStandardItemFormName.value == "") {
    ElMessage.error('请输入控制项名称');
    return;
  }
  if (addWeightStandardItemFormValue.value == null || addWeightStandardItemFormValue.value == "") {
    ElMessage.error('请输入控制项值');
    return;
  }
  tableData.value.push({
    id: tableData.value.length + 1,
    name: addWeightStandardItemFormName.value,
    value1: Number(addWeightStandardItemFormValue.value).toFixed(2),
    children: [],
  });
  handleCloseAddWeightStandardItemDialog();
  ElMessage.success('新增控制项成功');
};

const showAddWeightDialog = ref(false);
const addWeightStandardItem = ref(null);
const addWeightFormName = ref("");
const addWeightFormValue = ref(null);
// 新增子权重
const handleAddWeight = (row) => {
  console.log('新增子权重', row);
  showAddWeightDialog.value = true;
  addWeightStandardItem.value = row;
};

// 关闭新增子权重弹窗
const handleCloseAddWeightDialog = () => {
  showAddWeightDialog.value = false;
  addWeightFormName.value = "";
  addWeightFormValue.value = null;
};

// 新增子权重弹窗确定
const handleAddWeightDialogHandleSubmit = () => {
  console.log('新增子权重弹窗确定', addWeightStandardItem.value);
  if (addWeightFormName.value == null || addWeightFormName.value == "") {
    ElMessage.error('请输入子权重名称');
    return;
  }
  if (addWeightFormValue.value == null || addWeightFormValue.value == "") {
    ElMessage.error('请输入子权重值');
    return;
  }
  addWeightStandardItem.value.children.push({
    id: addWeightStandardItem.value.id + '.' + addWeightStandardItem.value.children.length + 1,
    name: addWeightFormName.value,
    value2: Number(addWeightFormValue.value).toFixed(2),
  });
  handleCloseAddWeightDialog();
  ElMessage.success('新增子权重成功');
  editoredVal.value = (Math.random() * 100).toFixed(2);
};

// 删除权重
const handleDeleteWeight = (row) => {
  console.log('删除权重', row);
  ElMessageBox.confirm('确定删除该权重吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    if (row.children) {
      row.children.forEach(item => {
        tableData.value = tableData.value.filter(item => item.id !== item.id);
      });
    } else {
      tableData.value = tableData.value.filter(item => item.id !== row.id);
    }
    editoredVal.value = (Math.random() * 100).toFixed(2);
    nextTick(() => {
      initWeightChart();
    });
    ElMessage.success('删除权重成功');
  }).catch(() => {
    ElMessage.info('取消删除');
  });
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

/* 权重表格样式 */
.weight-table {
  :deep(.el-table__header) {
    th {
      background-color: #f5f7fa;
      color: #303133;
      font-weight: 600;
      text-align: center;
    }
  }

  /* 一级权重行样式 */
  :deep(.level-one-row) {
    background-color: #ecf5ff;
    font-weight: 600;

    &:hover {
      background-color: #d9ecff !important;
    }

    td {
      border-bottom: 2px solid #b3d8ff;
    }
  }

  /* 二级权重行样式 */
  :deep(.level-two-row) {
    background-color: #fafafa;

    &:hover {
      background-color: #f0f0f0 !important;
    }

    td {
      border-bottom: 1px solid #ebeef5;
    }
  }

  /* 一级权重名称样式 */
  .level-one-name {
    color: #409eff;
    font-weight: 600;
    font-size: 14px;
  }

  /* 二级权重名称样式 */
  .level-two-name {
    color: #606266;
    font-size: 13px;
    padding-left: 20px;
  }

  /* 权重值样式 */
  .weight-value {
    width: 80px;
    border: none;
    text-align: center;
    display: inline-block;
    padding: 4px 12px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 13px;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
  }

  /* 一级权重值样式 */
  .level-one-weight {
    background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
    color: #fff;
    box-shadow: 0 2px 4px rgba(64, 158, 255, 0.3);
  }

  /* 二级权重值样式 */
  .level-two-weight {
    background: linear-gradient(135deg, #909399 0%, #b1b3b8 100%);
    color: #fff;
    box-shadow: 0 2px 4px rgba(144, 147, 153, 0.3);
  }

  /* 占位符样式 */
  .weight-placeholder {
    color: #c0c4cc;
    font-size: 13px;
  }

  /* 树形结构展开图标样式 */
  :deep(.el-table__expand-icon) {
    color: #409eff;
    font-size: 14px;
  }

  /* 表格边框美化 */
  :deep(.el-table__body) {
    tr {
      transition: background-color 0.3s ease;
    }
  }
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