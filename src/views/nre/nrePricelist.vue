<template>
  <el-card m="2">
    <el-button type="primary" class="m-2" @click="handleFethNreTableDownload" v-if="!hideBtn">NRE核价表下载</el-button>
    <el-card class="margin-top" header="手板件费用">
      <el-table
        :data="data.handPieceCost"
        style="width: 100%"
        border
        :summary-method="(val) => getMouldSummaries(val, '手板件费用')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="partName" label="手板件名称" />
        <el-table-column prop="partNumber" label="料号" />
        <el-table-column prop="unitPrice" label="单价" />
        <el-table-column prop="quantity" label="数量" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card>
    <el-card class="margin-top" header="模具费用">
      <el-table :data="data.mouldInventory" style="width: 100%" border :summary-method="getMouldSummaries" show-summary>
        <el-table-column type="index" width="50" />
        <el-table-column prop="modelName" label="模具名称" />
        <el-table-column prop="moldCavityCount" label="模穴数" />
        <el-table-column prop="unitPrice" label="单价" />
        <el-table-column prop="count" label="数量" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card>
    <el-card class="margin-top" header="实验费用">
      <el-table
        :data="data.laboratoryFeeModels"
        style="width: 100%"
        border
        :summary-method="(val) => getMouldSummaries(val, '实验费用')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="testItem" label="试验项目" />
        <el-table-column prop="isThirdParty" label="是否指定第三方">
          <template #default="{ row }">
            {{ row.isThirdParty ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="unitPrice" label="单价" />
        <el-table-column prop="count" label="数量" />
        <el-table-column prop="allCost" label="费用" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card>
    <el-card class="margin-top" header="差旅费用">
      <el-table
        :data="data.travelExpense"
        style="width: 100%"
        border
        :summary-method="(val) => getMouldSummaries(val, '差旅费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="reasonsName" label="事由" />
        <el-table-column prop="peopleCount" label="人数" />
        <el-table-column prop="costSky" label="费用/天" />
        <el-table-column prop="skyCount" label="天数" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card>
    <el-card class="margin-top" header="其他费用">
      <el-table
        :data="data.restsCost"
        style="width: 100%"
        border
        :summary-method="(val) => getMouldSummaries(val, '其他费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="rroject" label="项目" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card>
    <!-- <div style="float: right; margin: 20px 0">
      <el-button type="primary" @click="submit">提交</el-button>
    </div> -->
    <div m="4">编制时间：{{ formatDateTime(new Date()) }}</div>
  </el-card>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, watchEffect, reactive } from "vue"
import { GetPricingForm, NreTableDownload } from "./common/request"
import { getMouldSummaries } from "./common/mouldSummaries"
import { pricingForm } from "./data.type"
import getQuery from "@/utils/getQuery"
import { formatDateTime, downloadFileExcel } from "@/utils"

const { auditFlowId, productId, year, hideBtn }: any = getQuery()

const data = reactive<pricingForm>({
  handPieceCost: [],
  mouldInventory: [],
  qaqcDepartments: [],
  laboratoryFeeModels: [],
  travelExpense: [],
  restsCost: [],
  rmbAllCost: 0,
  usdAllCost: 0
})

const initFetch = async () => {
  try {
    const { success, result } = await GetPricingForm({ Id: auditFlowId, productId })
    if (!success) throw Error()
    console.log(result, "result")
    data.handPieceCost = result.handPieceCost || []
    data.mouldInventory = result.mouldInventory || []
    data.qaqcDepartments = result.qaqcDepartments || []
    data.laboratoryFeeModels = result.laboratoryFeeModels || []
    data.travelExpense = result.travelExpense || []
    data.restsCost = result.restsCost || []
  } catch (err) {
    console.log(err, "[ GetPricingForm err ]")
  }
}

// NRE核价表下载
const handleFethNreTableDownload = async () => {
  try {
    const res: any = await NreTableDownload({
      Year: year,
      AuditFlowId: auditFlowId,
      ModelCountId: productId
    })
    downloadFileExcel(res, "NRE核价表")
    console.log(res, "NreTableDownload")
  } catch (err: any) {
    console.log(err, "[ NRE核价表下载 失败 ]")
  }
}

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  initFetch()
})

watchEffect(() => {})
</script>
<style scoped lang="scss">
.margin-top {
  margin-top: 20px;
}
</style>
