<template>
  <div class="m-2">
    <!-- <h3>时效性管理</h3> -->
    <el-card class="table-wrap" header="系统版本操作记录表">
      <el-table :data="data.operationRecordData" style="width: 100%">
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="version" label="版本号" />
        <el-table-column prop="startTime" label="创建时间" :formatter="fomatterDate" />
        <el-table-column prop="userName" label="最后修改人" />
        <el-table-column prop="lastModifyTime" label="最后修改时间" :formatter="fomatterDate" />
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, onMounted } from "vue"
import { GetAuditFlowOperateReocrd } from "./service"
import getQuery from "@/utils/getQuery"
import { formatDateTime } from "@/utils"

const { AuditFlowId }: any = getQuery()
// 系统版本操作记录表-table数据
const data = reactive<any>({
  operationRecordData: []
})

const fomatterDate = (_record: any, _: any, val: any) => {
  return formatDateTime(val)
}

//console.log('1-开始创建组件-setup')

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  init()
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})

const init = async () => {
  const { result } = await GetAuditFlowOperateReocrd({ flowId: AuditFlowId })
  data.operationRecordData = result
  console.log(result, "init")
}
</script>
<style scoped lang="scss"></style>
