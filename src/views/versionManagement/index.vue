<template>
  <div class="versionManagement-wrap">
    <EZFilter
      :filterNnum="VerisonfilterNnum"
      :show-btn="true"
      :initFilterValue="InitVersionFilterValue"
      :onSubmit="queryTable"
    />
    <el-card class="table-wrap" header="系统版本管理表">
      <el-table :data="versionManageData" style="width: 100%">
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="versionNo" label="版本号" />
        <el-table-column prop="processNo" label="流程单号" />
        <el-table-column prop="draftTime" label="拟稿时间" />
        <el-table-column prop="pricingEndTime" label="核价节点结束时间" />
        <el-table-column prop="quotationEndTime" label="报价结束时间" />
      </el-table>
    </el-card>
    <!-- <h3>时效性管理</h3> -->
    <el-card class="table-wrap" header="系统版本操作记录表">
      <el-table :data="operationRecordData" style="width: 100%">
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="versionNo" label="版本号" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="lastMotifier" label="最后修改人" />
        <el-table-column prop="lastMotifyTIme" label="最后修改时间" />
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { InitVersionFilterValue, VerisonfilterNnum } from "./common/const"
import { versionMockdata, operationRecordMockData } from "./common/mock"
import { VersionManageItem, RecordItem } from "./data.type"
import EZFilter from "@/components/EZFilter/index.vue"

// 系统版本管理表-table数据
const versionManageData = reactive<VersionManageItem[]>(versionMockdata)
// 系统版本操作记录表-table数据
const operationRecordData = reactive<RecordItem[]>(operationRecordMockData)

const queryTable = (formValue: any) => {
  console.log(formValue.projectName, "formValue")
}

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})

watchEffect(() => {})
</script>
<style scoped lang="scss">
.table-wrap {
  margin-top: 20px;
}
.versionManagement-wrap {
  margin: 0px 10px 20px 10px;
}
</style>
