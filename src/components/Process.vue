<template>
  <div class="cementing-quality-page">
    <!-- 顶部筛选区域 -->
    <el-form :inline="true" class="filter-form" label-width="100px">
      <el-form-item label="项目部">
        <el-select v-model="filters.projectDept" placeholder="全部" clearable style="width: 120px;">
          <el-option label="全部" value="" />
          <el-option label="一部" value="一部" />
          <el-option label="二部" value="二部" />
          <el-option label="三部" value="三部" />
          <el-option label="四部" value="四部" />
          <el-option label="五部" value="五部" />
        </el-select>
      </el-form-item>

      <el-form-item label="队号">
        <el-select v-model="filters.teamNo" placeholder="全部" clearable style="width: 120px;">
          <el-option label="全部" value="" />
          <el-option label="自有队" value="自有队" />
          <el-option label="招标队" value="招标队" />
        </el-select>
      </el-form-item>

      <el-form-item label="井号">
        <el-select v-model="filters.wellNo" placeholder="全部" clearable style="width: 120px;">
          <el-option label="全部" value="" />
          <el-option label="高石001" value="高石001" />
          <el-option label="高石002" value="高石002" />
          <el-option label="高石003" value="高石003" />
          <el-option label="高石004" value="高石004" />
          <el-option label="高石005" value="高石005" />
        </el-select>
      </el-form-item>

      <el-form-item label="甲方项目组">
        <el-select v-model="filters.clientGroup" placeholder="全部" clearable style="width: 120px;">
          <el-option label="全部" value="" />
          <el-option label="z页岩油" value="z页岩油" />
          <el-option label="五部天然气" value="五部天然气" />
          <el-option label="z油田" value="z油田" />
        </el-select>
      </el-form-item>

      <el-form-item label="井别">
        <el-select v-model="filters.wellType" placeholder="全部" clearable style="width: 120px;">
          <el-option label="全部" value="" />
          <el-option label="油开井" value="油开井" />
          <el-option label="气开井" value="气开井" />
        </el-select>
      </el-form-item>

      <el-form-item label="井型">
        <el-select v-model="filters.wellModel" placeholder="全部" clearable style="width: 120px;">
          <el-option label="全部" value="" />
          <el-option label="水平井" value="水平井" />
          <el-option label="定向井" value="定向井" />
        </el-select>
      </el-form-item>

      <el-form-item label="固井类别">
        <el-select v-model="filters.cementingType" placeholder="全部" clearable style="width: 120px;">
          <el-option label="全部" value="" />
        </el-select>
      </el-form-item>

      <el-form-item label="开次">
        <el-select v-model="filters.openTimes" placeholder="全部" clearable style="width: 120px;">
          <el-option label="全部" value="" />
        </el-select>
      </el-form-item>

      <el-form-item label="施工任务">
        <el-select v-model="filters.constructionTask" placeholder="全部" clearable style="width: 120px;">
          <el-option label="全部" value="" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 分类标签区域 -->
    <div class="tag-group">
      <el-tag type="danger">I 一类井</el-tag>
      <el-tag type="warning">II 二类井</el-tag>
      <el-tag type="primary">III 三类井</el-tag>
      <el-tag type="success">★ 升级管控井</el-tag>
      <el-tag type="info">📊 数字化井队</el-tag>
      <el-tag type="info">🔄 新数据</el-tag>
    </div>

    <!-- 数据表格 -->
    <el-table :data="tableData" border style="width: 100%; margin: 10px 0" header-cell-class-name="table-header">
      <el-table-column prop="sequence" label="序列" width="80" align="center" />
      <el-table-column prop="wellNo" label="井号" min-width="100" align="center" />
      <el-table-column prop="clientUnit" label="甲方单位" min-width="120" align="center" />
      <el-table-column prop="projectDept" label="项目部" min-width="100" align="center" />

      <!-- 不合格要素数(项) 合并表头 -->
      <el-table-column label="不合格要素数(项)" align="center">
        <el-table-column prop="unqualified.formulaSystem" label="配方体系" width="90" align="center" />
        <el-table-column prop="unqualified.materialPrepare" label="材料准备" width="90" align="center" />
        <el-table-column prop="unqualified.fluidsTest" label="入井流体实验" width="110" align="center" />
        <el-table-column prop="unqualified.cementingDesign" label="固井施工设计" width="110" align="center" />
        <el-table-column prop="unqualified.wellboreCondition" label="井眼条件" width="90" align="center" />
        <el-table-column prop="unqualified.casingOperation" label="下套管作业" width="100" align="center" />
        <el-table-column prop="unqualified.cementingPrepare" label="固井施工准备" width="110" align="center" />
        <el-table-column prop="unqualified.cementingWork" label="固井施工" width="90" align="center" />
        <el-table-column prop="unqualified.geologicalCondition" label="复杂地质条件" width="120" align="center" />
        <el-table-column prop="unqualified.total" label="总计" width="80" align="center" />
      </el-table-column>

      <el-table-column prop="expert" label="值班专家" min-width="100" align="center" />

      <el-table-column label="操作" width="100" align="center">
        <template #default>
          <el-button type="primary" size="small" @click="openDetailDialog(row)">查询</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页控件 -->
    <div class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 50, 100]" :page-size="pageSize" layout="prev, pager, next, jumper, sizes, total"
        :total="totalCount" />
    </div>

    <!-- 详情弹窗 -->
    <el-dialog v-model="dialogVisible" title="固井质量不合格项详情" :width="'90%'" :before-close="handleClose">
      <!-- 弹窗内容 -->
      <template #header>
        <div class="header-wrapper">
          <p class="title-message">
            <span style="color: #9d9c9c;">查询结果：不合格总数</span>：<span style="color: #bd0303">{{ titleNumber }}</span>
          </p>
          <div class="select-well">
            <span style="margin-right: 4px">邻井选择：</span>
            <el-select style="width: 60%">
              <el-option label="选项1" value="1" />
              <el-option label="选项2" value="2" />
            </el-select>
          </div>
          <div class="choose-wrapper">
            <span style="margin-right: 4px">当前显示：</span>
            <el-radio-group v-model="showType">
              <el-radio :value="1">
                不合格
              </el-radio>
              <el-radio :value="0">
                合格
              </el-radio>
              <el-radio :value="2">
                全部
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </template>
      <NewQueryResult :show-type="showType" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import NewQueryResult from '../mock/newQueryResult.vue';

// 筛选条件
const filters = ref({
  projectDept: '',
  teamNo: '',
  wellNo: '',
  clientGroup: '',
  wellType: '',
  wellModel: '',
  cementingType: '',
  openTimes: '',
  constructionTask: ''
});

// 分页参数
const currentPage = ref(1);
const pageSize = ref(100);
const totalCount = ref(0);

// 表格数据
const tableData = ref([
  {
    sequence: 1,
    wellNo: '高石001',
    clientUnit: '',
    projectDept: '',
    unqualified: {
      formulaSystem: 8,
      materialPrepare: 7,
      fluidsTest: 9,
      cementingDesign: 8,
      wellboreCondition: 7,
      casingOperation: 9,
      cementingPrepare: 8,
      cementingWork: 9,
      geologicalCondition: 6,
      total: 61
    },
    expert: ''
  },
  {
    sequence: 2,
    wellNo: '高石002',
    clientUnit: '',
    projectDept: '',
    unqualified: {
      formulaSystem: 8,
      materialPrepare: 7,
      fluidsTest: 9,
      cementingDesign: 8,
      wellboreCondition: 7,
      casingOperation: 9,
      cementingPrepare: 8,
      cementingWork: 9,
      geologicalCondition: 6,
      total: 61
    },
    expert: ''
  },
  {
    sequence: 3,
    wellNo: '高石003',
    clientUnit: '',
    projectDept: '',
    unqualified: {
      formulaSystem: 8,
      materialPrepare: 7,
      fluidsTest: 9,
      cementingDesign: 8,
      wellboreCondition: 7,
      casingOperation: 9,
      cementingPrepare: 8,
      cementingWork: 9,
      geologicalCondition: 6,
      total: 61
    },
    expert: ''
  },
  {
    sequence: 4,
    wellNo: '高石004',
    clientUnit: '',
    projectDept: '',
    unqualified: {
      formulaSystem: 8,
      materialPrepare: 7,
      fluidsTest: 9,
      cementingDesign: 8,
      wellboreCondition: 7,
      casingOperation: 9,
      cementingPrepare: 8,
      cementingWork: 9,
      geologicalCondition: 6,
      total: 61
    },
    expert: ''
  },
  {
    sequence: 5,
    wellNo: '高石005',
    clientUnit: '',
    projectDept: '',
    unqualified: {
      formulaSystem: 8,
      materialPrepare: 7,
      fluidsTest: 9,
      cementingDesign: 8,
      wellboreCondition: 7,
      casingOperation: 9,
      cementingPrepare: 8,
      cementingWork: 9,
      geologicalCondition: 6,
      total: 61
    },
    expert: ''
  },
  {
    sequence: 6,
    wellNo: '高石006',
    clientUnit: '',
    projectDept: '',
    unqualified: {
      formulaSystem: 8,
      materialPrepare: 7,
      fluidsTest: 9,
      cementingDesign: 8,
      wellboreCondition: 7,
      casingOperation: 9,
      cementingPrepare: 8,
      cementingWork: 9,
      geologicalCondition: 6,
      total: 61
    },
    expert: ''
  },
  {
    sequence: 7,
    wellNo: '高石007',
    clientUnit: '',
    projectDept: '',
    unqualified: {
      formulaSystem: 8,
      materialPrepare: 7,
      fluidsTest: 9,
      cementingDesign: 8,
      wellboreCondition: 7,
      casingOperation: 9,
      cementingPrepare: 8,
      cementingWork: 9,
      geologicalCondition: 6,
      total: 61
    },
    expert: ''
  }
]);

// 查询数据
const handleQuery = () => {
  ElMessage.success('查询成功');
  // 实际项目中调用API接口获取数据
};

// 重置筛选条件
const handleReset = () => {
  Object.keys(filters.value).forEach(key => {
    filters.value[key] = '';
  });
  currentPage.value = 1;
  ElMessage.info('筛选条件已重置');
};

// 分页大小变更
const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1;
};

// 当前页码变更
const handleCurrentChange = (page) => {
  currentPage.value = page;
};


// 弹窗相关
const dialogVisible = ref(false);
const currentRow = ref(null);
const totalUnqualified = ref(71);
const neighborWell = ref('');
const displayType = ref('unqualified');
const activeTag = ref('material'); // 默认选中材料准备

// 打开弹窗
const openDetailDialog = (row) => {
  currentRow.value = row;
  dialogVisible.value = true;
};

// 关闭弹窗
const handleClose = () => {
  dialogVisible.value = false;
};

</script>

<style scoped>
.cementing-quality-page {
  padding: 20px;
  background-color: #fff;
  box-sizing: border-box;
}

/* 筛选表单样式 */
.filter-form {
  margin-bottom: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

/* 标签组样式 */
.tag-group {
  margin: 15px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

/* 表格工具栏 */
.table-tools {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  color: #666;
}

/* 表格样式 */
::v-deep .table-header {
  background-color: #f5f7fa !important;
  font-weight: 500;
}

::v-deep .el-table th,
::v-deep .el-table td {
  padding: 8px 0;
  text-align: center;
}

/* 页面说明 */
.page-description {
  text-align: center;
  font-size: 18px;
  color: #333;
  margin: 20px 0;
  font-weight: 500;
}

/* 分页容器 */
.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
}

::v-deep .el-pagination {
  margin: 0;
}

/* 弹窗样式 */
.dialog-content {
  padding: 10px 0;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.total-count {
  font-size: 16px;
  font-weight: 500;
}

.count {
  color: #f56c6c;
  font-weight: bold;
}

.unqualified-tags {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.tag-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f7fa;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  min-width: 150px;
  transition: all 0.3s;
}

.tag-item.active {
  background: #409eff;
  color: white;
}

.icon {
  font-size: 20px;
}

.tag-title {
  font-weight: 500;
}

.tag-count {
  font-size: 12px;
  opacity: 0.8;
}

/* 树状图样式 */
.detail-tree {
  margin-top: 20px;
  padding-left: 20px;
}

.root-node {
  margin-bottom: 30px;
}

.node-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #f5f7fa;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  max-width: 800px;
}

.node-icon {
  font-size: 24px;
  margin-top: 3px;
}

.node-content {
  flex: 1;
}

.node-title {
  font-weight: 500;
  margin-bottom: 5px;
  font-size: 15px;
}

.node-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}

.child-nodes {
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.child-node {
  position: relative;
}

.node-line {
  position: absolute;
  left: 15px;
  top: 30px;
  bottom: -10px;
  width: 2px;
  background: #ddd;
}

.grandchild-node {
  position: relative;
  padding-left: 30px;
  margin-top: 10px;
}

.error-node {
  background: #fff1f0;
  border: 1px solid #ffe3e3;
}

.node-result {
  color: #f56c6c;
  margin: 5px 0;
  font-weight: 500;
}

.error-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #f56c6c;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  margin-left: 10px;
}

.node-standard {
  font-size: 12px;
  color: #888;
  font-style: italic;
}

.header-wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  .select-well {
    width: 20%;
    display: flex;
    align-items: center;
  }

  .choose-wrapper {
    display: flex;
    align-items: center;
    width: 20%;
  }

  .title-message {
    width: 60%;
    font-size: 20px;
    font-weight: 900;
  }
}
</style>