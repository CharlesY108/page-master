<template>
  <div class="well-management-page">
    <!-- 顶部筛选表单 -->
    <el-form :inline="true" class="top-filter-form" label-width="60px">
      <el-form-item label="项目部" label-width="100px">
        <el-select v-model="filters.dept" placeholder="全部" style="width: 120px;">
          <el-option label="全部" value="" />
          <el-option label="一部" value="一部" />
          <el-option label="二部" value="二部" />
          <el-option label="三部" value="三部" />
          <el-option label="四部" value="四部" />
          <el-option label="苏里格" value="苏里格" />
        </el-select>
      </el-form-item>

      <el-form-item label="队号" label-width="100px">
        <el-select v-model="filters.teamNo" placeholder="全部" style="width: 120px;">
          <el-option label="全部" value="" />
          <el-option label="自有队" value="自有队" />
          <el-option label="招标队" value="招标队" />
        </el-select>
      </el-form-item>

      <el-form-item label="井号" label-width="100px">
        <el-select v-model="filters.wellNo" placeholder="全部" style="width: 120px;">
          <el-option label="全部" value="" />
          <el-option label="环H9-3" value="环H9-3" />
          <el-option label="环H9-1" value="环H9-1" />
          <el-option label="桃2-13-3" value="桃2-13-3" />
        </el-select>
      </el-form-item>

      <el-form-item label="甲方项目组" label-width="100px">
        <el-select v-model="filters.clientGroup" placeholder="全部" style="width: 120px;">
          <el-option label="全部" value="" />
          <el-option label="陇东页岩油" value="陇东页岩油" />
          <el-option label="苏里格天然气" value="苏里格天然气" />
          <el-option label="玉门油田" value="玉门油田" />
          <el-option label="采油一厂" value="采油一厂" />
        </el-select>
      </el-form-item>

      <el-form-item label="井别" label-width="100px">
        <el-select v-model="filters.wellType" placeholder="全部" style="width: 120px;">
          <el-option label="全部" value="" />
          <el-option label="油开井" value="油开井" />
          <el-option label="气开井" value="气开井" />
        </el-select>
      </el-form-item>

      <el-form-item label="井型" label-width="100px">
        <el-select v-model="filters.wellModel" placeholder="全部" style="width: 120px;">
          <el-option label="全部" value="" />
          <el-option label="水平井" value="水平井" />
          <el-option label="定向井" value="定向井" />
        </el-select>
      </el-form-item>

      <el-form-item label="固井类别" label-width="100px">
        <el-select v-model="filters.cementingType" placeholder="全部" style="width: 120px;">
          <el-option label="全部" value="" />
        </el-select>
      </el-form-item>

      <el-form-item label="开次" label-width="100px">
        <el-select v-model="filters.openTimes" placeholder="全部" style="width: 120px;">
          <el-option label="全部" value="" />
        </el-select>
      </el-form-item>

      <el-form-item label="施工任务" label-width="100px">
        <el-select v-model="filters.constructionTask" placeholder="全部" style="width: 120px;">
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

    <!-- 分类标签 -->
    <div class="tags-container">
      <el-tag type="info">I 一类井</el-tag>
      <el-tag type="warning">II 二类井</el-tag>
      <el-tag type="primary">III 三类井</el-tag>
      <el-tag type="success">★ 升级管控井</el-tag>
      <el-tag type="danger">📊 数字化井队</el-tag>
      <el-tag type="info">🔄 新数据</el-tag>
    </div>

    <!-- 二级筛选表单 -->
    <el-form :inline="true" class="second-filter-form" label-width="0">
      <el-form-item label-width="100px" label="井号">
        <el-input v-model="secondFilters.wellNo" placeholder="请输入井号" style="width: 140px;" />
      </el-form-item>

      <el-form-item label-width="100px" label="甲方单位">
        <el-input v-model="secondFilters.clientUnit" placeholder="甲方单位 请输入甲方单位" style="width: 160px;" />
      </el-form-item>

      <el-form-item label-width="100px" label="项目部">
        <el-select v-model="secondFilters.dept" placeholder="项目部 请选择项目部" style="width: 140px;">
          <el-option label="一部" value="一部" />
          <el-option label="二部" value="二部" />
          <el-option label="三部" value="三部" />
          <el-option label="四部" value="四部" />
          <el-option label="苏里格" value="苏里格" />
        </el-select>
      </el-form-item>

      <el-form-item label-width="100px" label="井别">
        <el-input v-model="secondFilters.wellType" placeholder="井别 请输入井别" style="width: 140px;" />
      </el-form-item>

      <el-form-item label-width="100px" label="井型">
        <el-input v-model="secondFilters.wellModel" placeholder="井型 请输入井型" style="width: 140px;" />
      </el-form-item>

      <el-form-item label-width="100px" label="钻井队伍">
        <el-select v-model="secondFilters.drillingTeam" placeholder="钻井队伍 请选择" style="width: 140px;">
          <el-option label="自有队" value="自有队" />
          <el-option label="招标队" value="招标队" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table :data="filteredData" border style="width: 100%; margin-bottom: 20px;"
      header-cell-class-name="table-header">
      <el-table-column prop="index" label="序号" width="60" align="center" />
      <el-table-column prop="wellNo" label="井号" align="center" />
      <el-table-column prop="clientUnit" label="甲方单位" align="center" />
      <el-table-column prop="dept" label="项目部" align="center" />
      <el-table-column prop="wellType" label="井别" align="center" />
      <el-table-column prop="wellModel" label="井型" align="center" />
      <el-table-column prop="teamNo" label="队号" align="center" />

      <!-- 五条红线读图结果 - 合并表头 -->
      <el-table-column label="五条红线读图结果" align="center">
        <el-table-column prop="redLine.formulaSystem" label="配方体系" width="80" align="center" />
        <el-table-column prop="redLine.materialPrepare" label="材料准备" width="80" align="center" />
        <el-table-column prop="redLine.injectionTest" label="入井流实验" width="90" align="center" />
        <el-table-column prop="redLine.cementingDesign" label="固井施工设计" width="100" align="center" />
        <el-table-column prop="redLine.wellboreCondition" label="井眼条件" width="80" align="center" />
      </el-table-column>

      <!-- 过程考核不合格要素 - 合并表头 -->
      <el-table-column label="过程考核不合格要素(项)" align="center">
        <el-table-column prop="process.lowerCasing" label="下套管作业" width="90" align="center" />
        <el-table-column prop="process.cementingPrepare" label="固井施工准备" width="100" align="center" />
        <el-table-column prop="process.cementingWork" label="固井施工" width="80" align="center" />
        <el-table-column prop="process.pumpCondition" label="架泵地条件" width="90" align="center" />
      </el-table-column>

      <el-table-column prop="total" label="合计" width="70" align="center" />

      <el-table-column label="操作" width="120" align="center">
        <template #default="scope">
          <el-tooltip effect="light" content="筛选出过程控制不合格井和五条红线不合格井，筛选出的井点击流程控制即可进入流程控制项，查询流程控制详细要去情况" placement="top"
            :enterable="true">
            <el-button type="text" @click="handleProcessControl(scope.row)" style="color: #1890ff; padding: 0;">
              流程控制
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页和提示 -->
    <div class="page-info">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

// 筛选条件
const filters = ref({
  dept: '',
  teamNo: '',
  wellNo: '',
  clientGroup: '',
  wellType: '',
  wellModel: '',
  cementingType: '',
  openTimes: '',
  constructionTask: ''
});

// 二级筛选条件
const secondFilters = ref({
  wellNo: '',
  clientUnit: '',
  dept: '',
  wellType: '',
  wellModel: '',
  drillingTeam: ''
});

// 分页参数
const currentPage = ref(1);
const pageSize = ref(10);
const totalCount = ref(951);

// 原始数据
const tableData = ref([
  {
    index: 1,
    wellNo: '环H9-3',
    clientUnit: '陇东页岩油',
    dept: '二部',
    wellType: '油开井',
    wellModel: '水平井',
    teamNo: '自有队',
    redLine: {
      formulaSystem: 0,
      materialPrepare: 0,
      injectionTest: 0,
      cementingDesign: 0,
      wellboreCondition: 0
    },
    process: {
      lowerCasing: 1,
      cementingPrepare: 0,
      cementingWork: 0,
      pumpCondition: 0
    },
    total: 1
  },
  {
    index: 2,
    wellNo: '环H9-1',
    clientUnit: '陇东页岩油',
    dept: '二部',
    wellType: '油开井',
    wellModel: '水平井',
    teamNo: '自有队',
    redLine: {
      formulaSystem: 0,
      materialPrepare: 0,
      injectionTest: 0,
      cementingDesign: 0,
      wellboreCondition: 0
    },
    process: {
      lowerCasing: 0,
      cementingPrepare: 0,
      cementingWork: 0,
      pumpCondition: 0
    },
    total: 0
  },
  {
    index: 3,
    wellNo: '桃2-13-3',
    clientUnit: '苏里格天然气',
    dept: '苏里格',
    wellType: '气开井',
    wellModel: '定向井',
    teamNo: '招标队',
    redLine: {
      formulaSystem: 2,
      materialPrepare: 0,
      injectionTest: 0,
      cementingDesign: 0,
      wellboreCondition: 1
    },
    process: {
      lowerCasing: 0,
      cementingPrepare: 0,
      cementingWork: 0,
      pumpCondition: 0
    },
    total: 3
  },
  {
    index: 4,
    wellNo: '乐H31-1',
    clientUnit: '陇东页岩油',
    dept: '二部',
    wellType: '油开井',
    wellModel: '水平井',
    teamNo: '自有队',
    redLine: {
      formulaSystem: 0,
      materialPrepare: 0,
      injectionTest: 0,
      cementingDesign: 0,
      wellboreCondition: 0
    },
    process: {
      lowerCasing: 0,
      cementingPrepare: 0,
      cementingWork: 0,
      pumpCondition: 0
    },
    total: 0
  },
  {
    index: 5,
    wellNo: '苏47-33-37',
    clientUnit: '苏里格天然气',
    dept: '苏里格',
    wellType: '气开井',
    wellModel: '定向井',
    teamNo: '招标队',
    redLine: {
      formulaSystem: 1,
      materialPrepare: 0,
      injectionTest: 0,
      cementingDesign: 0,
      wellboreCondition: 1
    },
    process: {
      lowerCasing: 0,
      cementingPrepare: 0,
      cementingWork: 0,
      pumpCondition: 0
    },
    total: 2
  },
  {
    index: 6,
    wellNo: '庆H26-3',
    clientUnit: '陇东页岩油',
    dept: '二部',
    wellType: '油开井',
    wellModel: '水平井',
    teamNo: '自有队',
    redLine: {
      formulaSystem: 0,
      materialPrepare: 0,
      injectionTest: 0,
      cementingDesign: 1,
      wellboreCondition: 0
    },
    process: {
      lowerCasing: 1,
      cementingPrepare: 0,
      cementingWork: 0,
      pumpCondition: 0
    },
    total: 2
  },
  {
    index: 7,
    wellNo: '安探1H',
    clientUnit: '玉门油田',
    dept: '四部',
    wellType: '气开井',
    wellModel: '水平井',
    teamNo: '自有队',
    redLine: {
      formulaSystem: 0,
      materialPrepare: 0,
      injectionTest: 0,
      cementingDesign: 1,
      wellboreCondition: 0
    },
    process: {
      lowerCasing: 0,
      cementingPrepare: 0,
      cementingWork: 0,
      pumpCondition: 0
    },
    total: 1
  },
  {
    index: 8,
    wellNo: '塞6-77-23H',
    clientUnit: '采油一厂',
    dept: '一部',
    wellType: '油开井',
    wellModel: '水平井',
    teamNo: '招标队',
    redLine: {
      formulaSystem: 0,
      materialPrepare: 0,
      injectionTest: 0,
      cementingDesign: 0,
      wellboreCondition: 0
    },
    process: {
      lowerCasing: 0,
      cementingPrepare: 0,
      cementingWork: 0,
      pumpCondition: 0
    },
    total: 0
  },
  {
    index: 9,
    wellNo: '华H69-1',
    clientUnit: '陇东页岩油',
    dept: '二部',
    wellType: '油开井',
    wellModel: '水平井',
    teamNo: '自有队',
    redLine: {
      formulaSystem: 0,
      materialPrepare: 0,
      injectionTest: 0,
      cementingDesign: 1,
      wellboreCondition: 0
    },
    process: {
      lowerCasing: 0,
      cementingPrepare: 0,
      cementingWork: 0,
      pumpCondition: 0
    },
    total: 1
  },
  {
    index: 10,
    wellNo: '庆H48-3',
    clientUnit: '陇东页岩油',
    dept: '二部',
    wellType: '油开井',
    wellModel: '水平井',
    teamNo: '自有队',
    redLine: {
      formulaSystem: 0,
      materialPrepare: 0,
      injectionTest: 0,
      cementingDesign: 1,
      wellboreCondition: 0
    },
    process: {
      lowerCasing: 1,
      cementingPrepare: 0,
      cementingWork: 0,
      pumpCondition: 0
    },
    total: 2
  }
]);

// 筛选后的数据
const filteredData = computed(() => {
  return tableData.value.filter(item => {
    // 顶部筛选条件
    if (filters.value.dept && item.dept !== filters.value.dept) return false;
    if (filters.value.teamNo && item.teamNo !== filters.value.teamNo) return false;
    if (filters.value.wellNo && item.wellNo !== filters.value.wellNo) return false;
    if (filters.value.wellType && item.wellType !== filters.value.wellType) return false;
    if (filters.value.wellModel && item.wellModel !== filters.value.wellModel) return false;

    // 二级筛选条件
    if (secondFilters.value.wellNo && !item.wellNo.includes(secondFilters.value.wellNo)) return false;
    if (secondFilters.value.clientUnit && !item.clientUnit.includes(secondFilters.value.clientUnit)) return false;
    if (secondFilters.value.dept && item.dept !== secondFilters.value.dept) return false;
    if (secondFilters.value.wellType && !item.wellType.includes(secondFilters.value.wellType)) return false;
    if (secondFilters.value.wellModel && !item.wellModel.includes(secondFilters.value.wellModel)) return false;
    if (secondFilters.value.drillingTeam && item.teamNo !== secondFilters.value.drillingTeam) return false;

    return true;
  });
});

// 处理查询
const handleQuery = () => {
  ElMessage.success('查询成功');
  // 实际项目中此处调用API
};

// 处理重置
const handleReset = () => {
  // 重置顶部筛选
  Object.keys(filters.value).forEach(key => {
    filters.value[key] = '';
  });

  // 重置二级筛选
  Object.keys(secondFilters.value).forEach(key => {
    secondFilters.value[key] = '';
  });

  currentPage.value = 1;
  ElMessage.info('已重置筛选条件');
};

// 处理流程控制
const handleProcessControl = (row) => {
  ElMessage(`查看 ${row.wellNo} 的流程控制详情`);
  // 实际项目中跳转到详情页或打开弹窗
};

// 分页事件
const handleSizeChange = (val) => {
  pageSize.value = val;
  currentPage.value = 1;
};

const handleCurrentChange = (val) => {
  currentPage.value = val;
};
</script>

<style scoped>
.well-management-page {
  padding: 20px;
  background-color: #fff;
}

/* 筛选表单样式 */
.top-filter-form {
  margin-bottom: 15px;
  padding: 10px 0;
}

.second-filter-form {
  margin-bottom: 20px;
  padding: 10px 0;
  border-top: 1px dashed #e8e8e8;
  border-bottom: 1px dashed #e8e8e8;
}

/* 标签容器 */
.tags-container {
  width: 100%;
  margin: 15px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

/* 表格样式 */
::v-deep .table-header {
  background-color: #f5f7fa !important;
}

::v-deep .el-table__header-wrapper th {
  font-weight: 500;
}

::v-deep .el-table__cell {
  padding: 8px 0 !important;
}

/* 分页和提示 */
.page-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.tip-text {
  color: #888;
}

::v-deep .el-pagination {
  margin-top: 0 !important;
}
</style>