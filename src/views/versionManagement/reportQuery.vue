<template>
  <div class="reportQuery-wrap">
    <EZFilter
      :filterNnum="ReportfilterNnum"
      :show-btn="true"
      :initFilterValue="InitReportFilterValue"
      :onSubmit="queryTable"
    />
    <el-card class="table-wrap" header="整体差异表">
      <el-table :data="reportQueryData">
        <el-table-column prop="projectName" label="模块" />
        <el-table-column prop="versionNo" label="版本1" />
        <el-table-column prop="processNo" label="版本2" />
        <el-table-column prop="draftTime" label="差异" />
      </el-table>
      <el-row :gutter="12" align="bottom">
        <el-col :span="8">
          <el-card class="moretable-item" header="单模组1">
            <el-table :data="reportQueryData">
              <el-table-column prop="projectName" label="模块" />
              <el-table-column prop="versionNo" label="版本1" />
              <el-table-column prop="processNo" label="版本2" />
              <el-table-column prop="draftTime" label="差异" />
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="table-wrap" header="单模组2">
            <el-table :data="reportQueryData">
              <el-table-column prop="projectName" label="模块" />
              <el-table-column prop="versionNo" label="版本1" />
              <el-table-column prop="processNo" label="版本2" />
              <el-table-column prop="draftTime" label="差异" />
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="table-wrap" header="单模组3">
            <el-table :data="reportQueryData">
              <el-table-column prop="projectName" label="模块" />
              <el-table-column prop="versionNo" label="版本1" />
              <el-table-column prop="processNo" label="版本2" />
              <el-table-column prop="draftTime" label="差异" />
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="table-wrap" header="成本差异表">
      <el-table :data="reportQueryData" style="width: 100%">
        <el-table-column prop="projectName" label="模块">
          <el-table-column prop="projectName" label="boom成本" />
          <el-table-column prop="versionNo" label="物料大类" />
          <el-table-column prop="processNo" label="物料种类" />
        </el-table-column>
        <el-table-column prop="versionNo" label="版本1">
          <el-table-column prop="projectName" label="数量" />
          <el-table-column prop="versionNo" label="单价（原币）" />
          <el-table-column prop="processNo" label="单价（本位币）" />
          <el-table-column prop="processNo" label="物料种类（原币）" />
          <el-table-column prop="processNo" label="金额（本位币）" />
        </el-table-column>
        <el-table-column prop="processNo" label="版本2">
          <el-table-column prop="projectName" label="数量" />
          <el-table-column prop="versionNo" label="单价（原币）" />
          <el-table-column prop="processNo" label="单价（本位币）" />
          <el-table-column prop="processNo" label="物料种类（原币）" />
          <el-table-column prop="processNo" label="金额（本位币）" />
        </el-table-column>

        <el-table-column prop="draftTime" label="差异">
          <el-table-column prop="projectName" label="数量" />
          <el-table-column prop="versionNo" label="单价（原币）" />
          <el-table-column prop="processNo" label="单价（本位币）" />
          <el-table-column prop="processNo" label="物料种类（原币）" />
          <el-table-column prop="processNo" label="金额（本位币）" />
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import EZFilter from "@/components/EZFilter/index.vue"
import type { FormInstance } from "element-plus"
import { InitReportFilterValue, ReportfilterNnum } from "./common/const"
import { reportQueryMockData } from "./common/mock"
import { ReportItem } from "./data.type"

const queryTable = (formValue: FormInstance | undefined) => {
  console.log(formValue, "formValue")
}

//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const reportQueryData = reactive<ReportItem[]>(reportQueryMockData)
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {})
</script>
<style scoped lang="scss">
.reportQuery-wrap {
  margin: 0 10px;
}
.table-wrap {
  margin-top: 20px;
}
</style>
