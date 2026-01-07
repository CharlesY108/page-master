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
        <el-table-column prop="序号" label="序号" align="center" />
        <el-table-column prop="井号" label="井号" align="center" />
        <el-table-column prop="项目部" label="项目部" align="center" />
        <el-table-column prop="项目组" label="项目组" align="center" />
        <el-table-column prop="区块" label="区块" align="center" />
        <el-table-column prop="队号" label="队号" align="center" />
        <el-table-column prop="任务类型" label="任务类型" align="center" />
        <el-table-column prop="井别" label="井别" align="center" />
        <el-table-column prop="井型" label="井型" align="center" />
        <el-table-column prop="完钻日期" label="完钻日期" align="center" />
        <el-table-column prop="完钻周期" label="完钻周期" align="center" />
        <el-table-column prop="过程评分" label="过程评分" align="center" />
        <el-table-column prop="结果评分" label="结果评分" align="center" />
        <el-table-column prop="封固合格率" label="封固合格率" align="center" />
        <el-table-column prop="不合格红线（总条数）" label="不合格红线（总条数）" align="center" />
      </el-table>
    </el-card>

    <!-- 单井对比图表模块 -->
    <el-card class="module-card" shadow="hover" style="margin-top: 20px">
      <template #header>
        <div class="card-header">
          <span>单井对比查询</span>
        </div>
      </template>
      <!-- 查询表单 -->
      <el-form :inline="true" class="filter-form">
        <el-form-item label="井号">
          <el-input v-model="wellNumber" placeholder="请输入井号" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleAddWell">
            添加井号
            <el-divider direction="vertical" />
            <el-icon>
              <BottomRight />
            </el-icon>
          </el-button>
          <el-button type="primary" @click="handleQueryWell">
            展开井号数据库
            <el-divider direction="vertical" />
            <el-icon>
              <Menu />
            </el-icon>
          </el-button>
        </el-form-item>
      </el-form>
      <div class="chart-group">
        <div class="chart-item">
          <h4>单井封固合格率对比</h4>
          <div ref="scoreRateChart" class="chart-container"></div>
        </div>
        <div class="chart-item">
          <h4>单井结果评分对比</h4>
          <div ref="qualifiedRateChart" class="chart-container"></div>
        </div>
        <div class="chart-item">
          <h4>单井过程评分对比</h4>
          <div ref="unqualifiedChart" class="chart-container"></div>
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
      <!-- 查询表单 -->
      <el-form :inline="true" class="filter-form">
        <el-form-item label="井号">
          <el-input v-model="wellNumberAnalysis" placeholder="请输入井号" />
        </el-form-item>
        <el-form-item label="项目部">
          <el-input v-model="projectDeptAnalysis" placeholder="请输入项目部" />
        </el-form-item>
        <el-form-item label="项目组">
          <el-input v-model="projectGroupAnalysis" placeholder="请输入项目组" />
        </el-form-item>
        <el-form-item label="区块">
          <el-input v-model="blockAnalysis" placeholder="请输入区块" />
        </el-form-item>
        <el-form-item label="任务类型">
          <el-input v-model="taskTypeAnalysis" placeholder="请输入任务类型" />
        </el-form-item>
        <el-form-item label="井别">
          <el-input v-model="wellCategoryAnalysis" placeholder="请输入井别" />
        </el-form-item>
        <el-form-item label="井型">
          <el-input v-model="wellTypeAnalysis" placeholder="请输入井型" />
        </el-form-item>
        <el-form-item label="时间段">
          <el-date-picker v-model="dateRangeAnalysis" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQueryQualityAnalysis">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="wellQualityData" border style="width: 100%">
        <el-table-column type="index" :index="index" label="序号" width="80" align="center" />
        <el-table-column prop="井号" label="井号" align="center" />
        <el-table-column prop="井别" label="井别" align="center" />
        <el-table-column prop="井型" label="井型" align="center" />
        <el-table-column prop="任务类型" label="任务类型" align="center" width="100px" />
        <el-table-column prop="红线是否合格" label="红线是否合格" align="center">
          <el-table-column prop="红线1" label="红线1" align="center" />
          <el-table-column prop="红线2" label="红线2" align="center" />
          <el-table-column prop="红线3" label="红线3" align="center" />
          <el-table-column prop="红线4" label="红线4" align="center" />
          <el-table-column prop="红线5" label="红线5" align="center" />
        </el-table-column>
        <el-table-column prop="过程考核不合格项" label="过程考核不合格项" align="center">
          <el-table-column prop="配方体系" label="配方体系" align="center" />
          <el-table-column prop="材料准备" label="材料准备" align="center" />
          <el-table-column prop="入井流体实验" label="入井流体实验" align="center" />
          <el-table-column prop="固井施工设计" label="固井施工设计" align="center" />
          <el-table-column prop="井眼条件" label="井眼条件" align="center" />
          <el-table-column prop="下套管作业" label="下套管作业" align="center" />
          <el-table-column prop="固井施工准备" label="固井施工准备" align="center" />
          <el-table-column prop="固井施工" label="固井施工" align="center" />
          <el-table-column prop="复杂地质条件" label="复杂地质条件" align="center" />
          <el-table-column prop="合计" label="合计" align="center" />
        </el-table-column>
        <el-table-column prop="过程评分" label="过程评分" width="100" align="center" />
        <el-table-column prop="结果评分" label="结果评分" width="100" align="center" />
        <el-table-column prop="封固合格率" label="封固合格率" width="100" align="center" />
        <!-- 操作列 -->
        <el-table-column prop="操作" label="操作" width="350" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="success" @click="handleProcessScoreCheck(row)">过程分析</el-button>
            <el-button type="primary" @click="handleDataAnalysis(row)">结果分析</el-button>
            <el-button type="danger" @click="handleExpertAnalysis(row)">专家分析</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 过程分析模块弹窗 -->
    <el-dialog v-model="processScoreCheckDialog" width="50%">
      <template #header>
        <div class="card-header">
          <span>过程分析</span>
          &nbsp;&nbsp;
          <el-divider direction="vertical" />
          <span class="total-score">总分：{{ processScoreCheckDialogTotalScore }}</span>
        </div>
      </template>
      <div style="display: flex; gap: 20px; height: 60vh;">
        <el-table :data="processScoreCheckDialogTableData" style="width: 100%;height: 100%;" row-key="id" border
          default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          :row-class-name="getRowClassName" class="weight-table">
          <el-table-column prop="name" label="控制项" min-width="200">
            <template #default="{ row }">
              <span :class="row.value1 ? 'level-one-name' : 'level-two-name'">
                {{ row.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="value1" label="一级权重基准值" width="150" align="center">
            <template #default="{ row }">
              <span v-if="row.value1" class="weight-value level-one-weight">
                {{ row.value1.toFixed(2) }}
              </span>
              <span v-else class="weight-placeholder">-</span>
            </template>
          </el-table-column>
          <el-table-column prop="value1score" label="一级权重得分" width="150" align="center">
            <template #default="{ row }">
              <span v-if="row.value1" class="weight-value-base level-one-weight-base">
                {{ row.value1score.toFixed(2) }}
              </span>
              <span v-else class="weight-placeholder">-</span>
            </template>
          </el-table-column>
          <el-table-column prop="value2" label="二级权重基准值" width="150" align="center">
            <template #default="{ row }">
              <span v-if="row.value2" class="weight-value level-two-weight">
                {{ row.value2.toFixed(2) }}
              </span>
              <span v-else class="weight-placeholder">-</span>
            </template>
          </el-table-column>
          <el-table-column prop="value2score" label="二级权重得分" width="150" align="center">
            <template #default="{ row }">
              <span v-if="row.value2" class="weight-value-base level-two-weight-base">
                {{ row.value2score.toFixed(2) }}
              </span>
              <span v-else class="weight-placeholder">-</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="processScoreCheckDialogHandleCancel">取 消</el-button>
          <el-button type="primary" @click="processScoreCheckDialogHandleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 结果分析弹窗 -->
    <el-dialog v-model="resultAnalysisDialog" title="结果分析" width="80%">
      <div class="result-analysis-content" style="height: 60vh;">
        <!-- 特征值对固井质量影响程度分析图 -->
        <div ref="featureValueAnalysisChartRef" class="chart-container" style="width: 50%; height: 100%;">
        </div>
        <!-- 单井分析图 -->
        <div ref="singleWellAnalysisChartRef" class="chart-container" style="width: 50%; height: 100%;">
        </div>
      </div>
    </el-dialog>

    <!-- 专家分析弹窗 -->
    <el-dialog v-model="expertAnalysisDialog" title="专家分析" width="80%" style="margin-top: 5vh;">
      <div class="expert-analysis-content" style="height: 80vh;">
        <div class="expert-analysis-content-left">
          <div class="expert-analysis-content-left-title">
            <div class="expert-info">
              <el-form :model="expertInfo" inline disabled="true"
                style="width: 100%;display: flex;flex-direction: row;justify-content: space-between;">
                <el-form-item label="专家姓名">
                  <el-input v-model="expertInfo.name" />
                </el-form-item>
                <el-form-item label="工号">
                  <el-input v-model="expertInfo.工号" />
                </el-form-item>
                <el-form-item label="职称">
                  <el-input v-model="expertInfo.职称" />
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input v-model="expertInfo.联系方式" />
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="expertInfo.邮箱" />
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="expertInfo.备注" />
                </el-form-item>
              </el-form>
            </div>
            <!-- 表格样式美化一下，要区分一级权重和二级权重，并且默认展开所有一级权重 -->
            <el-table :data="expertAnalysisData" style="width: 100%;height: 500px;" row-key="id" border
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :row-class-name="getRowClassName"
              class="weight-table">
              <el-table-column label="序号" align="center" width="80">
                <template #default="{ row }">
                  {{ row.id }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="标准项" min-width="200">
                <template #header>
                  <span>标准项</span>
                  <el-button type="primary" size="small" style="margin-left: 10px;"
                    @click="handleExpertAnalysisAddLevel1">新增标准项</el-button>
                </template>
                <template #default="{ row }">
                  <span :class="row.level === '1' ? 'level-one-name' : 'level-two-name'">
                    {{ row.name }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="isQualified" label="评分等级" align="center">
                <template #default="{ row }">
                  <el-radio-group v-model="row.isQualified">
                    <el-radio label="A" value="A" />
                    <el-radio label="B" value="B" />
                    <el-radio label="C" value="C" />
                    <el-radio label="D" value="D" />
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="操作" align="center">
                <template #default="{ row }">
                  <el-button type="danger" size="small" @click="handleExpertAnalysisDelete(row)">删除标准项</el-button>
                  <el-button v-if="row.children" type="primary" size="small"
                    @click="handleExpertAnalysisAdd(row)">新增子标准项</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 其他意见 -->
            <div style="margin-top: 20px; width: 100%; height: 300px;overflow: auto;">
              <!-- 上面表格评分等级的统计图，一级控制项使用柱状图，二级控制项使用饼图 -->
              <div style="font-size: 16px;font-weight: bold; margin-bottom: 10px;">评分等级统计</div>
              <div
                style="width: 100%;height: calc(100% - 40px); overflow: auto;display: flex;flex-direction: row;justify-content: space-between;">
                <!-- 一级指标的柱状图 -->
                <div ref="scoreLevelChartRef" class="chart-container"
                  style="width: 50%; height: 100%; border-radius: 5px;">
                </div>
                <!-- 一级指标的饼图 -->
                <div ref="scoreLevelPieChartRef" class="chart-container" v-if="false"
                  style="width: 25%; height: 100%; border-radius: 5px;"> </div>
                <!-- 二级指标的柱状图 -->
                <div ref="scoreLevelChart2Ref" class="chart-container"
                  style="width: 50%; height: 100%; border-radius: 5px;">
                </div>
                <!-- 二级指标的饼图 -->
                <div ref="scoreLevelPieChart2Ref" class="chart-container" v-if="false"
                  style="width: 25%; height: 100%; border-radius: 5px;"> </div>
              </div>

            </div>
            <!-- 其他意见 -->
            <div style="width: 100%; height: 120px;padding: 10px;">
              <div style="font-size: 16px;font-weight: bold; margin-bottom: 10px;">
                其他意见（示例：入井流体实验+水泥浆+D，该意见将同步到9大控制项影响因素中）
              </div>
              <el-input v-model="otherOpinion" type="textarea" :rows="3" style="width: 100%;" />
            </div>

          </div>
        </div>
      </div>
      <template #footer>
        <!-- 取消确认 -->
        <div class="cancel-confirm-button">
          <el-button type="primary" @click="expertAnalysisDialogHandleCancel">取消</el-button>
          <el-button type="primary" @click="expertAnalysisDialogHandleSubmit">提交</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 新增标准项弹窗 -->
    <el-dialog v-model="addExpertAnalysisDialog1" title="新增标准项" width="50%">
      <el-form :model="addExpertAnalysisForm1">
        <el-form-item label="标准项名称">
          <el-input v-model="addExpertAnalysisForm1.name" />
        </el-form-item>
        <el-form-item label="标准项评分等级">
          <el-radio-group v-model="addExpertAnalysisForm1.isQualified">
            <el-radio label="A" value="A" />
            <el-radio label="B" value="B" />
            <el-radio label="C" value="C" />
            <el-radio label="D" value="D" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="cancel-confirm-button">
          <el-button type="primary" @click="addExpertAnalysisDialog1HandleCancel">取消</el-button>
          <el-button type="primary" @click="addExpertAnalysisDialog1HandleSubmit">提交</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 新增子标准项弹窗 -->
    <el-dialog v-model="addExpertAnalysisDialog" title="新增子标准项" width="50%">
      <el-form :model="addExpertAnalysisForm">
        <el-form-item label="子标准项名称">
          <el-input v-model="addExpertAnalysisForm.name" />
        </el-form-item>
        <el-form-item label="子标准项评分等级">
          <el-radio-group v-model="addExpertAnalysisForm.isQualified">
            <el-radio label="A" value="A" />
            <el-radio label="B" value="B" />
            <el-radio label="C" value="C" />
            <el-radio label="D" value="D" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="cancel-confirm-button">
          <el-button type="primary" @click="addExpertAnalysisDialogHandleCancel">取消</el-button>
          <el-button type="primary" @click="addExpertAnalysisDialogHandleSubmit">提交</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, watch } from 'vue';
import * as echarts from 'echarts';
import { Menu } from '@element-plus/icons-vue';
import { BottomRight } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { mockProcessData } from '../mock/mock-process-data';
import { mockModelData } from '../mock/mock-model-data';
import { fieldMapping } from '../mock/processFieldMap';
import { colorByNumber } from '../utils/utils-manage';
import { mockSingleData } from '../mock/mock-single-data';

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
const wellNumberAnalysis = ref('');
const projectDeptAnalysis = ref('');
const projectGroupAnalysis = ref('');
const blockAnalysis = ref('');
const taskTypeAnalysis = ref('');
const wellCategoryAnalysis = ref('');
const wellTypeAnalysis = ref('');
const dateRangeAnalysis = ref([]);

const otherOpinion = ref('');

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
/**
 * 单井质量分析数据
 * @type {Array<Object>}
 */
const wellQualityData = [
  {
    井号: 'S001-1',
    井别: '生产井',
    井型: '直井',
    任务类型: '常规固井',
    红线1: '合格',
    红线2: '合格',
    红线3: '合格',
    红线4: '合格',
    红线5: '合格',
    配方体系: 0,
    材料准备: 1,
    入井流体实验: 0,
    固井施工设计: 0,
    井眼条件: 2,
    下套管作业: 0,
    固井施工准备: 1,
    固井施工: 1,
    复杂地质条件: 0,
    合计: 5,
    过程评分: 85,
    结果评分: 88,
    封固合格率: 90
  },
  {
    井号: 'S001-2',
    井别: '注水井',
    井型: '定向井',
    任务类型: '特殊固井',
    红线1: '合格',
    红线2: '不合格',
    红线3: '合格',
    红线4: '合格',
    红线5: '合格',
    配方体系: 2,
    材料准备: 0,
    入井流体实验: 1,
    固井施工设计: 1,
    井眼条件: 0,
    下套管作业: 1,
    固井施工准备: 0,
    固井施工: 2,
    复杂地质条件: 1,
    合计: 8,
    过程评分: 78,
    结果评分: 82,
    封固合格率: 85
  },
  {
    井号: 'S001-3',
    井别: '生产井',
    井型: '水平井',
    任务类型: '常规固井',
    红线1: '合格',
    红线2: '合格',
    红线3: '合格',
    红线4: '合格',
    红线5: '合格',
    配方体系: 0,
    材料准备: 0,
    入井流体实验: 0,
    固井施工设计: 0,
    井眼条件: 1,
    下套管作业: 0,
    固井施工准备: 0,
    固井施工: 0,
    复杂地质条件: 0,
    合计: 1,
    过程评分: 90,
    结果评分: 92,
    封固合格率: 95
  },
  {
    井号: 'S001-4',
    井别: '生产井',
    井型: '直井',
    任务类型: '常规固井',
    红线1: '合格',
    红线2: '合格',
    红线3: '不合格',
    红线4: '合格',
    红线5: '合格',
    配方体系: 1,
    材料准备: 1,
    入井流体实验: 0,
    固井施工设计: 2,
    井眼条件: 1,
    下套管作业: 1,
    固井施工准备: 1,
    固井施工: 1,
    复杂地质条件: 0,
    合计: 8,
    过程评分: 82,
    结果评分: 85,
    封固合格率: 87
  },
  {
    井号: 'S001-5',
    井别: '注水井',
    井型: '定向井',
    任务类型: '特殊固井',
    红线1: '不合格',
    红线2: '合格',
    红线3: '合格',
    红线4: '合格',
    红线5: '合格',
    配方体系: 2,
    材料准备: 2,
    入井流体实验: 1,
    固井施工设计: 1,
    井眼条件: 2,
    下套管作业: 0,
    固井施工准备: 1,
    固井施工: 3,
    复杂地质条件: 1,
    合计: 13,
    过程评分: 72,
    结果评分: 75,
    封固合格率: 78
  },
  {
    井号: 'S001-6',
    井别: '生产井',
    井型: '水平井',
    任务类型: '常规固井',
    红线1: '合格',
    红线2: '合格',
    红线3: '合格',
    红线4: '合格',
    红线5: '合格',
    配方体系: 0,
    材料准备: 0,
    入井流体实验: 0,
    固井施工设计: 0,
    井眼条件: 0,
    下套管作业: 0,
    固井施工准备: 0,
    固井施工: 0,
    复杂地质条件: 0,
    合计: 0,
    过程评分: 95,
    结果评分: 96,
    封固合格率: 98
  },
  {
    井号: 'S001-7',
    井别: '生产井',
    井型: '直井',
    任务类型: '常规固井',
    红线1: '合格',
    红线2: '合格',
    红线3: '合格',
    红线4: '不合格',
    红线5: '合格',
    配方体系: 1,
    材料准备: 0,
    入井流体实验: 1,
    固井施工设计: 0,
    井眼条件: 1,
    下套管作业: 1,
    固井施工准备: 0,
    固井施工: 2,
    复杂地质条件: 0,
    合计: 6,
    过程评分: 80,
    结果评分: 83,
    封固合格率: 86
  },
  {
    井号: 'S001-8',
    井别: '注水井',
    井型: '定向井',
    任务类型: '特殊固井',
    红线1: '合格',
    红线2: '合格',
    红线3: '合格',
    红线4: '合格',
    红线5: '不合格',
    配方体系: 1,
    材料准备: 1,
    入井流体实验: 0,
    固井施工设计: 1,
    井眼条件: 0,
    下套管作业: 1,
    固井施工准备: 1,
    固井施工: 1,
    复杂地质条件: 1,
    合计: 7,
    过程评分: 79,
    结果评分: 81,
    封固合格率: 84
  },
  {
    井号: 'S001-9',
    井别: '生产井',
    井型: '水平井',
    任务类型: '常规固井',
    红线1: '合格',
    红线2: '合格',
    红线3: '合格',
    红线4: '合格',
    红线5: '合格',
    配方体系: 0,
    材料准备: 0,
    入井流体实验: 0,
    固井施工设计: 1,
    井眼条件: 0,
    下套管作业: 0,
    固井施工准备: 0,
    固井施工: 0,
    复杂地质条件: 0,
    合计: 1,
    过程评分: 88,
    结果评分: 90,
    封固合格率: 92
  },
  {
    井号: 'S001-10',
    井别: '生产井',
    井型: '直井',
    任务类型: '常规固井',
    红线1: '不合格',
    红线2: '不合格',
    红线3: '合格',
    红线4: '合格',
    红线5: '合格',
    配方体系: 3,
    材料准备: 2,
    入井流体实验: 2,
    固井施工设计: 2,
    井眼条件: 2,
    下套管作业: 1,
    固井施工准备: 2,
    固井施工: 4,
    复杂地质条件: 1,
    合计: 19,
    过程评分: 65,
    结果评分: 68,
    封固合格率: 72
  }
];

// ---------- 图表初始化（echarts） ----------
const scoreRateChart = ref(null);   // 单井平均得分率图表
const unqualifiedChart = ref(null); // 不合格井个数图表
const qualifiedRateChart = ref(null); // 完井平均合格率图表

// ---------- 下钻功能相关状态 ----------
/**
 * 当前下钻层级：'block' 表示区块层，'controlItem' 表示控制项层
 * @type {Ref<string>}
 */
const currentDrillLevel = ref('block');

/**
 * 当前选中的区块（用于下钻）
 * @type {Ref<string|null>}
 */
const selectedBlock = ref(null);

/**
 * 合格率图表实例
 * @type {any}
 */
let qualifiedRateInstance = null;

// handleQueryWell 展开井号数据库
const handleQueryWell = () => {
  console.log('展开井号数据库');
  // 弹出窗口，窗口内容为井号数据库
};

// handleAddWell 添加井号
const handleAddWell = () => {
  console.log('添加井号');
};

// handleQueryQualityAnalysis 查询质量分析
const handleQueryQualityAnalysis = () => {
  console.log('查询质量分析');
};

const featureValueAnalysisChartRef = ref(null);
const singleWellAnalysisChartRef = ref(null);

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

  const singleDataRaw = mockSingleData.sample_1.data_raw
  const singleDataRawKeys = Object.keys(singleDataRaw[0])
  const singleDataRawData = []
  singleDataRaw.forEach(it => {
    singleDataRawKeys.forEach(k => {
      if (Object.prototype.hasOwnProperty.call(it, k)) {
        singleDataRawData.push({
          label: k,
          value: it[k]
        })
      }
    })
  })

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
      data: echartsRef4ForData.map(it => singleDataRawData.find(it2 => it2.label === it.label)?.value + " = " + filterFieldMapping[it.label])
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

const initCharts = () => {
  // 1. 单井封固合格率对比
  const scoreRateInstance = echarts.init(scoreRateChart.value);
  scoreRateInstance.setOption({
    // 柱子显示圆角，圆角大小为10
    barCategoryGap: '80%',
    barGap: '80%',
    barWidth: 25,
    itemStyle: {
      borderRadius: [15, 15, 0, 0],
    },
    xAxis: { type: 'category', data: ['井号1', '井号2', '井号3', '井号4', '井号5', '井号6', '井号7'] },
    yAxis: { type: 'value', name: '封固合格率(%)' },
    grid: { left: '3%', right: '3%', bottom: '3%', containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    series: [{
      data: [85, 78, 82, 87, 79, 94, 71],
      type: 'bar',
      color: ['#4895ef', '#f9c74f', '#4cc9f0', '#f94144', '#7209b7', '#f9844a', '#4cc9f0'],
    }],
  });

  // 2. 单井过程评分对比
  const unqualifiedInstance = echarts.init(unqualifiedChart.value);
  unqualifiedInstance.setOption({
    xAxis: { type: 'category', data: ['井号1', '井号2', '井号3', '井号4', '井号5', '井号6', '井号7'] },
    yAxis: { type: 'value', name: '得分' },
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

  // 3. 单井结果评分对比 （带下钻功能）
  /**
   * 区块数据
   * @type {string[]}
   */
  const blocks = ['区块1', '区块2', '区块3', '区块4', '区块5', '区块6', '区块7'];

  /**
   * 区块对应的控制项数据（模拟数据）
   * @type {Object<string, Array<{name: string, value: number}>>}
   */
  const blockControlItemData = {
    '区块1': [
      { name: '配方体系', value: 85 },
      { name: '材料准备', value: 78 },
      { name: '入井流体实验', value: 92 },
      { name: '固井施工设计', value: 88 },
      { name: '井眼条件', value: 88 },
      { name: '下套管作业', value: 88 },
      { name: '固井施工准备', value: 88 },
      { name: '固井施工', value: 88 },
      { name: '复杂地质条件', value: 88 }
    ],
    '区块2': [
      { name: '配方体系', value: 82 },
      { name: '材料准备', value: 90 },
      { name: '入井流体实验', value: 75 },
      { name: '固井施工设计', value: 88 },
      { name: '井眼条件', value: 88 },
      { name: '下套管作业', value: 88 },
      { name: '固井施工准备', value: 88 },
      { name: '固井施工', value: 88 },
      { name: '复杂地质条件', value: 88 }
    ],
    '区块3': [
      { name: '配方体系', value: 79 },
      { name: '材料准备', value: 86 },
      { name: '入井流体实验', value: 91 },
      { name: '固井施工设计', value: 83 },
      { name: '井眼条件', value: 88 },
      { name: '下套管作业', value: 88 },
      { name: '固井施工准备', value: 88 },
      { name: '固井施工', value: 88 },
      { name: '复杂地质条件', value: 88 }
    ],
    '区块4': [
      { name: '配方体系', value: 88 },
      { name: '材料准备', value: 85 },
      { name: '入井流体实验', value: 90 },
      { name: '固井施工设计', value: 87 },
      { name: '井眼条件', value: 88 },
      { name: '下套管作业', value: 88 },
      { name: '固井施工准备', value: 88 },
      { name: '固井施工', value: 88 },
      { name: '复杂地质条件', value: 88 }
    ],
    '区块5': [
      { name: '配方体系', value: 76 },
      { name: '材料准备', value: 89 },
      { name: '入井流体实验', value: 84 },
      { name: '固井施工设计', value: 81 },
      { name: '井眼条件', value: 88 },
      { name: '下套管作业', value: 88 },
      { name: '固井施工准备', value: 88 },
      { name: '固井施工', value: 88 },
      { name: '复杂地质条件', value: 88 }
    ],
    '区块6': [
      { name: '配方体系', value: 93 },
      { name: '材料准备', value: 88 },
      { name: '入井流体实验', value: 90 },
      { name: '固井施工设计', value: 85 },
      { name: '井眼条件', value: 88 },
      { name: '下套管作业', value: 88 },
      { name: '固井施工准备', value: 88 },
      { name: '固井施工', value: 88 },
      { name: '复杂地质条件', value: 88 }
    ],
    '区块7': [
      { name: '配方体系', value: 80 },
      { name: '材料准备', value: 87 },
      { name: '入井流体实验', value: 87 },
      { name: '固井施工设计', value: 82 },
      { name: '井眼条件', value: 88 },
      { name: '下套管作业', value: 88 },
      { name: '固井施工准备', value: 88 },
      { name: '固井施工', value: 88 },
      { name: '复杂地质条件', value: 88 }
    ]
  };

  /**
   * 区块的合格率数据（第一层显示）
   * @type {number[]}
   */
  const blockQualifiedRates = [85, 82, 79, 88, 76, 93, 80];

  /**
   * 更新合格率图表配置
   * @param {string} level - 当前层级：'block' 或 'controlItem'
   * @param {string|null} blockName - 选中的区块名称（仅在下钻时使用）
   */
  const updateQualifiedRateChart = (level, blockName = null) => {
    if (!qualifiedRateInstance) {
      qualifiedRateInstance = echarts.init(qualifiedRateChart.value);
    }

    let option;

    if (level === 'block') {
      // 第一层：显示区块
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params) => {
            const param = params[0];
            return `${param.name}<br/>合格率: ${param.value}%<br/><span style="color: #999; font-size: 12px;">点击柱状图查看详情</span>`;
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: blocks,
          axisLabel: {
            interval: 0,
            rotate: 0
          }
        },
        yAxis: {
          type: 'value',
          name: '合格率(%)',
          max: 100
        },
        series: [{
          name: '合格率',
          type: 'bar',
          data: blockQualifiedRates,
          itemStyle: {
            borderRadius: [15, 15, 0, 0],
            color: function (params) {
              const colors = ['#4895ef', '#f9c74f', '#4cc9f0', '#f94144', '#7209b7', '#f9844a', '#4cc9f0'];
              return colors[params.dataIndex % colors.length];
            }
          },
          barWidth: 30,
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
    } else {
      // 第二层：显示控制项
      const controlItemData = blockControlItemData[blockName] || [];
      const controlItemNames = controlItemData.map(item => item.name);
      const controlItemValues = controlItemData.map(item => item.value);

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params) => {
            const param = params[0];
            return `${param.name}<br/>合格率: ${param.value}%`;
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: controlItemNames,
          axisLabel: {
            interval: 0,
            rotate: 0
          }
        },
        yAxis: {
          type: 'value',
          name: '合格率(%)',
          max: 100
        },
        graphic: [
          {
            type: 'text',
            right: '3%',
            top: '0',
            id: 'backButton',
            style: {
              text: `${blockName} 控制项` + ' - 返回',
              fill: '#000000',
              fontSize: 14,
            },
            z: 2000,
          }
        ],
        series: [{
          name: '合格率',
          type: 'bar',
          data: controlItemValues,
          itemStyle: {
            borderRadius: [15, 15, 0, 0],
            color: function (params) {
              const colors = ['#4895ef', '#f9c74f', '#4cc9f0', '#f94144', '#7209b7', '#f9844a', '#4cc9f0'];
              return colors[params.dataIndex % colors.length];
            }
          },
          barWidth: 30,
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
    }

    qualifiedRateInstance.setOption(option, true);
  };

  // 初始化图表实例
  if (!qualifiedRateInstance) {
    qualifiedRateInstance = echarts.init(qualifiedRateChart.value);

    // 只注册一次事件监听器
    qualifiedRateInstance.on('click', (params) => {
      console.log('点击了返回按钮', params.componentType, params);
      // 检查是否点击了返回按钮
      if (params.componentType === 'graphic' && params.event.target.parent.id === 'backButton') {
        console.log('点击了返回按钮');
        // 返回区块层
        currentDrillLevel.value = 'block';
        selectedBlock.value = null;
        updateQualifiedRateChart('block');
        return;
      }

      // 在区块层时，点击柱状图下钻到控制项层
      if (currentDrillLevel.value === 'block' && params.componentType === 'series') {
        const clickedBlock = params.name;
        currentDrillLevel.value = 'controlItem';
        selectedBlock.value = clickedBlock;
        updateQualifiedRateChart('controlItem', clickedBlock);
      }
    });
  }

  // 初始化第一层（区块层）
  updateQualifiedRateChart('block');
};

// handleProcessScoreCheck 过程评分校核
const processScoreCheckDialog = ref(false);
const handleProcessScoreCheck = (row) => {
  console.log('过程评分校核', row);
  // 弹出窗口，窗口内容为过程评分校核
  processScoreCheckDialog.value = true;
  setTimeout(() => {
    initProcessScoreCheckDialogTableData();
  });
};
const processScoreCheckDialogHandleCancel = () => {
  processScoreCheckDialog.value = false;
};
const processScoreCheckDialogHandleSubmit = () => {
  console.log('过程评分校核提交', processScoreCheckDialogTableData.value);
  processScoreCheckDialog.value = false;
};
const processScoreCheckDialogTableData = ref([]);
const processScoreCheckDialogTotalScore = ref(98.56);
const initProcessScoreCheckDialogTableData = () => {
  /**
   * value1score 总分100 随机生成
   * value2score 总分100 随机生成
   */
  processScoreCheckDialogTableData.value = [
    {
      id: "1",
      name: '入井流体实验',
      value1: 0.183,
      value1score: Math.ceil(Math.random() * 100),
      children: [
        {
          id: "1.1",
          name: '水泥浆稠化时间',
          value2: 0.411,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "1.2",
          name: '初始稠度',
          value2: 0.136,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "1.3",
          name: '水泥石抗压强度(24h)',
          value2: 0.349,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "1.4",
          name: '水泥浆静置后上下密度差',
          value2: 0.104,
          value2score: Math.ceil(Math.random() * 100),
        }
      ]
    },
    {
      id: "2",
      name: '井眼条件',
      value1: 0.189,
      value1score: Math.ceil(Math.random() * 100),
      children: [
        {
          id: "2.1",
          name: '环空上返速度',
          value2: 0.121,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "2.2",
          name: '钻井液循环周次',
          value2: 0.084,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "2.3",
          name: '进出口密度差',
          value2: 0.093,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "2.4",
          name: '上窜速度',
          value2: 0.041,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "2.5",
          name: '固井前钻井液塑性粘度',
          value2: 0.148,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "2.6",
          name: '钻头-套管尺寸（环空间隙）',
          value2: 0.135,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "2.7",
          name: '井径扩大率',
          value2: 0.378,
          value2score: Math.ceil(Math.random() * 100),
        }
      ]
    },
    {
      id: "3",
      name: '下套管作业',
      value1: 0.084,
      value1score: Math.ceil(Math.random() * 100),
      children: [
        {
          id: "3.1",
          name: '套管居中度',
          value2: 0.541,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "3.2",
          name: '人工井底距油层底界',
          value2: 0.264,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "3.3",
          name: '油井阻流环与浮鞋间距',
          value2: 0.195,
          value2score: Math.ceil(Math.random() * 100),
        }
      ]
    },
    {
      id: "4",
      name: '固井施工',
      value1: 0.341,
      value1score: Math.ceil(Math.random() * 100),
      children: [
        {
          id: "4.1",
          name: '前置液体积量占裸眼环空高度',
          value2: 0.0581,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.2",
          name: '前置液紊流接触时间',
          value2: 0.0745,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.3",
          name: '浆柱密度差',
          value2: 0.0431,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.4",
          name: '隔离液在循环温度下动塑比',
          value2: 0.0325,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.5",
          name: '隔离液滤失量',
          value2: 0.024,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.6",
          name: '水泥浆密度记录偏差',
          value2: 0.0479,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.7",
          name: '测量记录间隔',
          value2: 0.0311,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.8",
          name: '中停时间',
          value2: 0.0795,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.9",
          name: '施工参数（排量、压力、水泥浆密度、注入量等）记录',
          value2: 0.0341,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.10",
          name: '胶塞入井',
          value2: 0.0727,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.11",
          name: '替量符合固井施工设计要求',
          value2: 0.103,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.12",
          name: '顶替过程连续',
          value2: 0.0705,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.13",
          name: '压力有监控记录',
          value2: 0.0205,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.14",
          name: '排量有监控记录',
          value2: 0.0235,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.15",
          name: '井口返出情况有监控记录',
          value2: 0.0282,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.16",
          name: '碰压',
          value2: 0.063,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.17",
          name: '无碰压现象，顶替量－设计顶替量',
          value2: 0.0691,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.18",
          name: '小排量碰压，碰压附加值',
          value2: 0.033,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "4.19",
          name: '下胶塞清水静压穿透压力',
          value2: 0.0161,
          value2score: Math.ceil(Math.random() * 100),
        }
      ]
    },
    {
      id: "5",
      name: '水泥浆返高',
      value1: 0.203,
      value1score: Math.ceil(Math.random() * 100),
      children: [
        {
          id: "5.1",
          name: '表层套管',
          value2: 0.144,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "5.2",
          name: '技术套管',
          value2: 0.281,
          value2score: Math.ceil(Math.random() * 100),
        },
        {
          id: "5.3",
          name: '生产套管',
          value2: 0.575,
          value2score: Math.ceil(Math.random() * 100),
        }
      ]
    }
  ];
};

const resultAnalysisDialog = ref(false);
// handleDataAnalysis 数据分析
const handleDataAnalysis = (row) => {
  console.log('数据分析', row);
  // 弹出窗口，窗口内容为数据分析
  resultAnalysisDialog.value = true;
  setTimeout(() => {
    initFeatureValueAnalysisChart();
    initSingleWellAnalysisChart();
  });
};

const expertAnalysisDialog = ref(false);
const expertAnalysisData = ref([]);
const expertInfo = ref({
  name: '张三',
  工号: '123456',
  职称: '高级工程师',
  联系方式: '1234567890',
  邮箱: '1234567890@qq.com',
  备注: '特聘专家',
});

const handleExpertAnalysisDelete = (row) => {
  console.log('删除标准项', row);
  expertAnalysisData.value = expertAnalysisData.value.filter(item => item.id !== row.id);
  ElMessage.success('删除标准项成功');
};

const addExpertAnalysisDialog1 = ref(false);
const addExpertAnalysisForm1 = ref({});
const handleExpertAnalysisAddLevel1 = () => {
  addExpertAnalysisDialog1.value = true;

};

const addExpertAnalysisDialog1HandleCancel = () => {
  addExpertAnalysisDialog1.value = false;
};
const addExpertAnalysisDialog1HandleSubmit = () => {
  console.log('addExpertAnalysisForm1', addExpertAnalysisForm1.value);

  if (addExpertAnalysisForm1.value.name == null) {
    ElMessage.error('请填写标准项名称');
    return;
  }
  addExpertAnalysisForm1.value = {
    id: `${expertAnalysisData.value.length + 1}`,
    name: addExpertAnalysisForm1.value.name,
    value1: null,
    level: "1",
    isQualified: addExpertAnalysisForm1.value.isQualified,
    children: [],
  };
  expertAnalysisData.value.push(JSON.parse(JSON.stringify(addExpertAnalysisForm1.value)));
  addExpertAnalysisDialog1.value = false;
  ElMessage.success('新增标准项提交成功');
};

const addExpertAnalysisDialog = ref(false);
const addExpertAnalysisForm = ref({});
const addExpertAnalysisStandby = ref(null);

const handleExpertAnalysisAdd = (row) => {
  addExpertAnalysisDialog.value = true;
  addExpertAnalysisStandby.value = row;
};

const addExpertAnalysisDialogHandleCancel = () => {
  addExpertAnalysisDialog.value = false;
};
const addExpertAnalysisDialogHandleSubmit = () => {
  if (addExpertAnalysisForm.value.name == null || addExpertAnalysisForm.value.isQualified == null) {
    ElMessage.error('请填写子标准项名称和评分等级');
    return;
  }
  addExpertAnalysisForm.value = {
    id: `${addExpertAnalysisStandby.value.id}.${addExpertAnalysisStandby.value.children.length + 1}`,
    name: addExpertAnalysisForm.value.name,
    value2: null,
    level: "2",
    isQualified: addExpertAnalysisForm.value.isQualified,
  };
  addExpertAnalysisStandby.value.children.push(JSON.parse(JSON.stringify(addExpertAnalysisForm.value)));
  addExpertAnalysisDialog.value = false;
  ElMessage.success('新增子标准项提交成功');
};

const expertAnalysisDialogHandleSubmit = () => {
  console.log('专家分析数据', expertAnalysisData.value);
  expertAnalysisDialog.value = false;
  ElMessage.success('专家分析提交成功');
};
// handleExpertAnalysis 专家分析
const handleExpertAnalysis = (row) => {
  // 弹出窗口，窗口内容为专家分析
  expertAnalysisDialog.value = true;
  expertAnalysisData.value = [
    {
      id: "1",
      name: '配方体系',
      value1: 0.183,
      level: "1", // 1:一级权重，2:二级权重
      isQualified: "",
      children: [
        {
          id: "1.1",
          name: '水泥浆密度',
          value2: 0.411,
          isQualified: "",
          level: "2",
          isQualified: "",
        },
        {
          id: "1.2",
          name: '水泥浆失水量',
          value2: 0.136,
          isQualified: "",
          level: "2",
          isQualified: "",
        },
        {
          id: "1.3",
          name: '初始稠度',
          value2: 0.349,
          isQualified: "",
          level: "2",
          isQualified: "",
        },
        {
          id: "1.4",
          name: '水泥浆稠化时间',
          value2: 0.104,
          isQualified: "",
          level: "2",
        },
        {
          id: "1.5",
          name: '混合流体相容性稠化时间',
          value2: 0.104,
          isQualified: "",
          level: "2",
          isQualified: "",
        },
        {
          id: "1.6",
          name: '游离液',
          value2: 0.104,
          isQualified: "",
          level: "2",
          isQualified: "",
        },
        {
          id: "1.7",
          name: '沉降稳定性',
          value2: 0.104,
          isQualified: "",
          level: "2",
          isQualified: "",
        },
        {
          id: "1.8",
          name: '水泥浆抗压强度',
          value2: 0.104,
          isQualified: "",
          level: "2",
          isQualified: "",
        }
      ]
    },
    {
      id: "2",
      name: '材料准备',
      value1: 0.189,
      isQualified: "",
      level: "1",
      children: [
        {
          id: "2.1",
          name: '水泥浆材料三证齐全',
          value2: 0.121,
          isQualified: "",
          isQualified: "",
          level: "2",
        },
        {
          id: "2.2",
          name: '水泥混拌单与配方的一致性',
          value2: 0.121,
          isQualified: "",
          isQualified: "",
          level: "2",
        },
        {
          id: "2.3",
          name: '性能检验',
          value2: 0.121,
          isQualified: "",
          isQualified: "",
          level: "2",
        },
        {
          id: "2.4",
          name: '混拌前对混拌缸清理余灰',
          value2: 0.121,
          isQualified: "",
          isQualified: "",
          level: "2",
        },
        {
          id: "2.5",
          name: '混拌过程有专人负责并可追溯',
          value2: 0.121,
          isQualified: "",
          isQualified: "",
          level: "2",
        },
        {
          id: "2.6",
          name: '混拌质量检验有专人负责并可追溯',
          value2: 0.121,
          isQualified: "",
          isQualified: "",
          level: "2",
        },
        {
          id: "2.7",
          name: '混拌次数',
          value2: 0.121,
          isQualified: "",
          isQualified: "",
          level: "2",
        },
        {
          id: "2.8",
          name: '成品取样检验',
          value2: 0.121,
          isQualified: "",
          isQualified: "",
          level: "2",
        },
        {
          id: "2.9",
          name: '水泥浆大样稠化时间',
          value2: 0.121,
          isQualified: "",
          isQualified: "",
          level: "2",
        },
        {
          id: "2.10",
          name: '水泥浆大样密度测试',
          value2: 0.121,
          isQualified: "",
          isQualified: "",
          level: "2",
        },
        {
          id: "2.11",
          name: '井下流体相容性稠化时间',
          value2: 0.121,
          isQualified: "",
          isQualified: "",
          level: "2",
        },
      ]
    },
    {
      id: "3",
      name: '入井流体实验',
      value1: 0.084,
      isQualified: "",
      level: "1",
      children: [
        {
          id: "3.1",
          name: '水泥浆稠化时间',
          value2: 0.541,
          isQualified: "",
          isQualified: "",
          level: "2",
        },
        {
          id: "3.2",
          name: '初始稠度',
          value2: 0.264,
          isQualified: "",
          isQualified: "",
          level: "2",
        },
        {
          id: "3.3",
          name: '水泥浆抗压强度',
          value2: 0.195,
          isQualified: "",
          isQualified: "",
          level: "2",
        },
        {
          id: "3.4",
          name: '水泥浆静置后上下密度差',
          value2: 0.195,
          isQualified: "",
          level: "2",
        }
      ]
    },
    {
      id: "4",
      name: '固井施工设计',
      value1: 0.341,
      isQualified: "",
      level: "1",
      children: [
        {
          id: "4.1",
          name: '固井施工设计完整性',
          value2: 0.0581,
          isQualified: "",
          level: "2",
        },
        {
          id: "4.2",
          name: '浆体流动度',
          value2: 0.0745,
          isQualified: "",
          level: "2",
        },
        {
          id: "4.3",
          name: '沉降稳定性',
          value2: 0.0431,
          isQualified: "",
          level: "2",
        },
        {
          id: "4.4",
          name: '水泥石抗压强度',
          value2: 0.0325,
          isQualified: "",
          level: "2",
        },
        {
          id: "4.5",
          name: '水泥浆密度',
          value2: 0.024,
          isQualified: "",
          level: "2",
        },
        {
          id: "4.6",
          name: '水泥头产品合格证',
          value2: 0.0479,
          isQualified: "",
          level: "2",
        },
        {
          id: "4.7",
          name: '水泥浆用量附加量',
          value2: 0.0311,
          isQualified: "",
          level: "2",
        },
        {
          id: "4.8",
          name: '顶替液附加量',
          value2: 0.0795,
          isQualified: "",
          level: "2",
        },
      ]
    },
    {
      id: "5",
      name: '井眼条件',
      value1: 0.203,
      isQualified: "",
      level: "1",
      children: [
        {
          id: "5.1",
          name: '环空返速',
          value2: 0.144,
          isQualified: "",
          level: "2",
        },
        {
          id: "5.2",
          name: '井眼承压能力',
          value2: 0.281,
          isQualified: "",
          level: "2",
        },
        {
          id: "5.3",
          name: '井筒压力',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "5.4",
          name: '钻井液循环周次',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "5.5",
          name: '进出口密度差',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "5.6",
          name: '上窜速度',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "5.7",
          name: '钻井液PH',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "5.8",
          name: '钻井液塑性粘度',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "5.9",
          name: '钻井液摩阻系数',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "5.10",
          name: '钻井液失水量',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "5.11",
          name: '环空间隙',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "5.12",
          name: '全角变化率',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "5.13",
          name: '平均井径扩大率',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "5.14",
          name: '井斜角',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
      ],
    },
    {
      id: "6",
      name: '下套管作业',
      value1: 0.084,
      isQualified: "",
      level: "1",
      children: [
        {
          id: "6.1",
          name: '扶正器安放',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "6.2",
          name: '人工井底距油层底界',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "6.3",
          name: '人工井底距气层底界',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "6.4",
          name: '阻流环与浮鞋间距',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
      ]
    },
    {
      id: "7",
      name: '固井施工准备',
      value1: 0.084,
      isQualified: "",
      level: "1",
      children: [
        {
          id: "7.1",
          name: '固井施工用水量',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "7.2",
          name: '水质PH值',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "7.3",
          name: '供水设施',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "7.4",
          name: '固井设备',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "7.5",
          name: '仪表性能参数',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
      ]
    },
    {
      id: "8",
      name: '固井施工',
      value1: 0.084,
      isQualified: "",
      level: "1",
      children: [
        {
          id: "8.1",
          name: '前置液体积量占裸眼环空高度',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.2",
          name: '前置液紊流接触时间',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.3",
          name: '冲洗液密度',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.4",
          name: '隔离液密度',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.5",
          name: '隔离液动塑比',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.6",
          name: '隔离液滤失量',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.7",
          name: '注水泥顺序',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.8",
          name: '水泥浆密度',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.9",
          name: '测量记录间隔',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.10",
          name: '中停时间',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.11",
          name: '注水泥浆量',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.12",
          name: '泵注排量',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.13",
          name: '胶塞入井',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.14",
          name: '顶替量',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.15",
          name: '顶替过程连续',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.16",
          name: '压力',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.17",
          name: '井口返出情况',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.18",
          name: '碰压',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.19",
          name: '无碰压现象顶替量差值',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.20",
          name: '小排量碰压附加值',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.21",
          name: '下胶塞清水静压穿透压力',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.22",
          name: '试压标准',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "8.23",
          name: '允许压降',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
      ]
    },
    {
      id: "9",
      name: '复杂地质条件',
      value1: 0.084,
      isQualified: "",
      level: "1",
      children: [
        {
          id: "9.1",
          name: '水泥返高要求',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "9.2",
          name: '井漏处置措施',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "9.3",
          name: '溢漏同存处置措施',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
        {
          id: "9.4",
          name: '油气侵处置措施',
          value2: 0.575,
          isQualified: "",
          level: "2",
        },
      ]
    }
  ]
  setTimeout(() => {
    initScoreLevelChart1();
    initScoreLevelChart2();
  });
};

// ---------- 一级指标评分等级统计图表初始化 ----------
const scoreLevelChartRef = ref(null);
const scoreLevelPieChartRef = ref(null);
let scoreLevelChart = null;
let scoreLevelPieChart = null;

const initScoreLevelChart1 = () => {
  scoreLevelChart = echarts.init(scoreLevelChartRef.value);
  scoreLevelChart.setOption({
    grid: { left: '4%', right: '4%', bottom: '0%', top: '20%', containLabel: true },
    title: {
      text: '一级指标评分等级统计',
      left: 'center',
      top: '0',
      textStyle: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(50,50,50,0.9)',
      textStyle: { color: '#fff' },
      formatter: function (params) {
        let tar = params[0]?.data;
        let detailList = '';
        if (tar && tar.remark && tar.remark.length > 0) {
          detailList = '<br/>' + tar.remark.map((x, i) => ` > ${x}`).join('<br/>');
        }
        return `${params[0].name} 数量: ${tar.value}${detailList}`;
      }
    },
    legend: {
      show: true,
      data: ['A', 'B', 'C', 'D'],
      textStyle: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 15,
      },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 10,
    },
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D'],
      axisLabel: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 15,
        rotate: 0
      },
      axisLine: { lineStyle: { color: '#bbb' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '数量',
      show: false,
      axisLabel: { color: '#666' },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#eee'
        }
      }
    },
    series: [{
      data: [
        {
          value: expertAnalysisData.value.filter(item => item.isQualified === "A").length,
          name: 'A',
          remark: expertAnalysisData.value.filter(item => item.isQualified === "A").map(item => item.name)
        },
        {
          value: expertAnalysisData.value.filter(item => item.isQualified === "B").length,
          name: 'B',
          remark: expertAnalysisData.value.filter(item => item.isQualified === "B").map(item => item.name)
        },
        {
          value: expertAnalysisData.value.filter(item => item.isQualified === "C").length,
          name: 'C',
          remark: expertAnalysisData.value.filter(item => item.isQualified === "C").map(item => item.name)
        },
        {
          value: expertAnalysisData.value.filter(item => item.isQualified === "D").length,
          name: 'D',
          remark: expertAnalysisData.value.filter(item => item.isQualified === "D").map(item => item.name)
        },
      ],
      type: 'bar',
      itemStyle: {
        borderRadius: [10, 10, 0, 0],
        color: function (params) {
          const colorList = [
            '#4fa8f9', // 蓝
            '#5ad8a6', // 绿
            '#faad14', // 黄
            '#f2637b', // 红
          ];
          return colorList[params.dataIndex];
        },
        shadowColor: 'rgba(0,0,0,0.12)',
        shadowBlur: 8
      },
      barWidth: '35%',
      label: {
        show: true,
        position: 'top',
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16
      }
    }],
    animationDuration: 900,
    animationEasing: 'cubicOut',
  });
  // 点击柱状图， 实现下钻
  scoreLevelChart.on('click', (params) => {
    console.log('点击了柱状图', params);
    currentDrillLevel.value = 'controlItem';
    selectedBlock.value = params.name;
    scoreLevelChart.setOption({
      grid: { left: '4%', right: '4%', bottom: '0%', top: '20%', containLabel: true },
      series: params.data.remark.map(item => {
        return {
          type: 'bar',
          name: item,
          data: [
            1, 2, 3, 4
          ]
        }
      }),
      animationDuration: 900,
      animationEasing: 'cubicOut',
    })
  });
};

// ---------- 二级指标评分等级统计图表初始化 ----------
const scoreLevelChart2Ref = ref(null);
const scoreLevelPieChart2Ref = ref(null);
let scoreLevelChart2 = null;
let scoreLevelPieChart2 = null;
const initScoreLevelChart2 = () => {
  scoreLevelChart2 = echarts.init(scoreLevelChart2Ref.value);
  scoreLevelChart2.setOption({
    grid: { left: '4%', right: '4%', bottom: '0%', top: '20%', containLabel: true },
    title: {
      text: '二级指标评分等级统计',
      left: 'center',
      top: '0',
      textStyle: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(50,50,50,0.9)',
      textStyle: { color: '#fff' },
      formatter: function (params) {
        console.log('params', params);
        let tar = params[0]?.data;
        let detailList = '';
        if (tar && tar.remark && tar.remark.length > 0) {
          detailList = '<br/>' + tar.remark.flat().map((x, i) => ` > ${x}`).join('<br/>');
        }
        return `${params[0].name} 数量: ${tar.value}${detailList}`;
      }
    },
    legend: {
      show: true,
      data: ['A', 'B', 'C', 'D'],
      textStyle: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 15,
      },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 10,
    },
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D'],
      axisLabel: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 15,
        rotate: 0
      },
      axisLine: { lineStyle: { color: '#bbb' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '数量',
      show: false,
      axisLabel: { color: '#666' },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#eee'
        }
      }
    },
    series: [{
      data: [
        {
          value: expertAnalysisData.value.reduce((total, item) => total + item.children.filter(x => x.isQualified === "A").length, 0),
          name: 'A',
          remark: expertAnalysisData.value.map(item => item.children.filter(x => x.isQualified === "A")).flat().map(x => x.name)
        },
        {
          value: expertAnalysisData.value.reduce((total, item) => total + item.children.filter(x => x.isQualified === "B").length, 0),
          name: 'B',
          remark: expertAnalysisData.value.map(item => item.children.filter(x => x.isQualified === "B")).flat().map(x => x.name)
        },
        {
          value: expertAnalysisData.value.reduce((total, item) => total + item.children.filter(x => x.isQualified === "C").length, 0),
          name: 'C',
          remark: expertAnalysisData.value.map(item => item.children.filter(x => x.isQualified === "C")).flat().map(x => x.name)
        },
        {
          value: expertAnalysisData.value.reduce((total, item) => total + item.children.filter(x => x.isQualified === "D").length, 0),
          name: 'D',
          remark: expertAnalysisData.value.map(item => item.children.filter(x => x.isQualified === "D")).flat().map(x => x.name)
        },
      ],
      type: 'bar',
      itemStyle: {
        borderRadius: [10, 10, 0, 0],
        color: function (params) {
          const colorList = [
            // 跟上面的区别开
            '#4fa8f9', // 二级指标蓝
            '#5ad8a6', // 二级指标绿
            '#faad14', // 二级指标黄
            '#f2637b', // 二级指标红
          ];
          return colorList[params.dataIndex];
        },
        shadowColor: 'rgba(0,0,0,0.12)',
        shadowBlur: 8
      },
      barWidth: '35%',
      label: {
        show: true,
        position: 'top',
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16
      }
    }],
    animationDuration: 900,
    animationEasing: 'cubicOut',
  });
  // 点击柱状图， 展开该控制项有多少个
  scoreLevelChart2.on('click', (params) => {
    console.log('点击了柱状图', params);
    scoreLevelPieChart2 = echarts.init(scoreLevelPieChart2Ref.value);
    scoreLevelPieChart2.setOption({
      grid: { left: '0%', right: '0%', bottom: '0%', top: '0%', containLabel: true },
      legend: {
        show: true,
        data: params.data.remark
      },
      series: [{
        name: '评分等级',
        type: 'pie',
        radius: '50%',
        label: {
          show: true,
          position: 'outside',
          color: '#333',
          fontWeight: 'bold',
          fontSize: 16,
          formatter: '{c} ({d}%)'
        },
        data: params.data.remark.map(item => {
          return {
            name: item,
            value: expertAnalysisData.value.find(x => x.name === item).children.length,
          }
        }),
      }]
    });
  });
};

watch(expertAnalysisData, (newVal) => {
  if (scoreLevelChart) {
    scoreLevelChart.setOption({
      series: [
        {
          data: [
            {
              value: expertAnalysisData.value.filter(item => item.isQualified === "A").length,
              name: 'A',
              remark: expertAnalysisData.value.filter(item => item.isQualified === "A").map(item => item.name)
            },
            {
              value: expertAnalysisData.value.filter(item => item.isQualified === "B").length,
              name: 'B',
              remark: expertAnalysisData.value.filter(item => item.isQualified === "B").map(item => item.name)
            },
            {
              value: expertAnalysisData.value.filter(item => item.isQualified === "C").length,
              name: 'C',
              remark: expertAnalysisData.value.filter(item => item.isQualified === "C").map(item => item.name)
            },
            {
              value: expertAnalysisData.value.filter(item => item.isQualified === "D").length,
              name: 'D',
              remark: expertAnalysisData.value.filter(item => item.isQualified === "D").map(item => item.name)
            },
          ],
          type: 'bar'
        }],
    });
  }
  if (scoreLevelPieChart) {
    scoreLevelPieChart.setOption({
      series: [{ data: [newVal.filter(item => item.isQualified === "A").length, newVal.filter(item => item.isQualified === "B").length, newVal.filter(item => item.isQualified === "C").length, newVal.filter(item => item.isQualified === "D").length], type: 'pie' }],
    });
  }
  if (scoreLevelChart2) {
    scoreLevelChart2.setOption({
      series: [{
        data: [{
          value: expertAnalysisData.value.reduce((total, item) => total + item.children.filter(x => x.isQualified === "A").length, 0),
          name: 'A',
          remark: expertAnalysisData.value.map(item => item.children.filter(x => x.isQualified === "A")).flat().map(x => x.name)
        },
        {
          value: expertAnalysisData.value.reduce((total, item) => total + item.children.filter(x => x.isQualified === "B").length, 0),
          name: 'B',
          remark: expertAnalysisData.value.map(item => item.children.filter(x => x.isQualified === "B")).flat().map(x => x.name)
        },
        {
          value: expertAnalysisData.value.reduce((total, item) => total + item.children.filter(x => x.isQualified === "C").length, 0),
          name: 'C',
          remark: expertAnalysisData.value.map(item => item.children.filter(x => x.isQualified === "C").flat().map(x => x.name))
        },
        {
          value: expertAnalysisData.value.reduce((total, item) => total + item.children.filter(x => x.isQualified === "D").length, 0),
          name: 'D',
          remark: expertAnalysisData.value.map(item => item.children.filter(x => x.isQualified === "D").flat().map(x => x.name))
        }]
      }],
    });
  }
  if (scoreLevelPieChart2) {
    scoreLevelPieChart2.setOption({
      series: [{ data: [newVal.filter(item => item.isQualified === "A").length, newVal.filter(item => item.isQualified === "B").length, newVal.filter(item => item.isQualified === "C").length, newVal.filter(item => item.isQualified === "D").length], type: 'pie' }],
    });
  }
}, {
  deep: true,
});


onMounted(() => {
  setTimeout(() => {
    initCharts();
  });
});
</script>

<style scoped lang="less">
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

.result-analysis-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.result-analysis-content-left {
  flex: 1;
}

.result-analysis-content-right {
  flex: 1;
}

.result-analysis-content-left-title {
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.result-analysis-content-right-title {
  font-size: 16px;
  font-weight: bold;
}

.result-analysis-content-left-table {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.result-analysis-content-right-table {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.result-analysis-content-left-table-title {
  font-size: 16px;
  font-weight: bold;
}

.result-analysis-content-right-table-title {
  font-size: 16px;
  font-weight: bold;
}

.expert-analysis-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 800px;

}

.expert-analysis-content-left {
  flex: 1;
  height: 100%;
  overflow-y: auto;
}

.expert-analysis-content-right {
  flex: 1;
  overflow-y: auto;
}

.expert-analysis-content-left-title {
  font-size: 16px;
  font-weight: bold;
  height: 100%;
}

.expert-analysis-content-right-title {
  font-size: 16px;
  font-weight: bold;
}

.expert-info {
  height: 50px;
}

.expert-info-item {
  margin-right: 10px;
}

.total-score {
  font-size: 16px;
  font-weight: bold;
  color: #3385ff;
}

.weight-table {
  border-radius: 5px;

  :deep(.el-table__header) {
    th {
      border: 1px solid #b3d8ff;
      border-right: none;
      border-left: none;
      background-color: #ecf5ff;
      color: #303133;
      font-weight: 600;
      border-bottom: 2px solid #b3d8ff;
      border-right: none;
    }
  }

  :deep(.el-table__row) {
    background-color: #fafafa;

    &:hover {
      background-color: #f0f0f0 !important;
    }

    :deep(.el-table__body) {
      td {
        border-bottom: 2px solid #b3d8ff;
        border-right: none;
      }
    }
  }
}

/* 一级权重较基准值颜色 */
.level-one-weight-base {
  color: #3385ff;
  font-weight: bold;
}

/* 二级权重较基准值颜色 */
.level-two-weight-base {
  color: #3385ff;
  font-weight: bold;
}

/* 一级权重得分颜色 */
.level-one-weight {
  color: #999999;
}

/* 二级权重得分颜色 */
.level-two-weight {
  color: #999999;
}

.level-one-name {
  font-weight: bold;
  font-size: 16px;
  color: #3385ff;
}

.level-two-name {
  font-weight: bold;
  margin-left: 40px;
  color: #999999;
}
</style>