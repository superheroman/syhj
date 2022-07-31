<template>
  <div style="padding: 0 10px">
    <el-card class="margin-top" header="手板件费用">
      <el-table :data="data.handPieceCost" style="width: 100%" border :summary-method="getMouldSummaries" show-summary>
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
        <el-table-column prop="quantity" label="数量" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card>
    <!-- <el-card class="margin-top" header="工装费用">
    <el-table :data="data.qaqcDepartments" style="width: 100%" border :summary-method="getMouldSummaries" show-summary>
        <el-table-column type="index" width="50" />
        <el-table-column prop="qc" label="工装名称" />
        <el-table-column prop="unitPrice" label="单价" />
        <el-table-column prop="quantity" label="数量" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card> -->
    <!-- <el-card class="margin-top" header="治具费用">
      <el-table :data="data." style="width: 100%" border :summary-method="getMouldSummaries" show-summary>
        <el-table-column type="index" width="50" />
        <el-table-column prop="partName" label="手板件名称" />
        <el-table-column prop="partNumber" label="料号" />
        <el-table-column prop="unitPrice" label="单价" />
        <el-table-column prop="quantity" label="数量" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card> -->
    <!-- <el-card class="margin-top" header="检具费用">
      <el-table :data="data.qaqcDepartments" style="width: 100%" border :summary-method="getMouldSummaries" show-summary>
        <el-table-column type="index" width="50" />
        <el-table-column prop="qc" label="检具名称" />
        <el-table-column prop="unitPrice" label="单价" />
        <el-table-column prop="quantity" label="数量" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card> -->
    <!-- <el-card class="margin-top" header="生产设备费用">
      <el-table :data="mouldInventoryData" style="width: 100%" border :summary-method="getMouldSummaries" show-summary>
        <el-table-column type="index" width="50" />
        <el-table-column prop="partName" label="手板件名称" />
        <el-table-column prop="partNumber" label="料号" />
        <el-table-column prop="unitPrice" label="单价" />
        <el-table-column prop="quantity" label="数量" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card> -->
    <el-card class="margin-top" header="实验费用">
      <el-table
        :data="data.laboratoryFeeModels"
        style="width: 100%"
        border
        :summary-method="getMouldSummaries"
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
        <el-table-column prop="quantity" label="数量" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card>
    <!-- <el-card class="margin-top" header="测试软件费用">
    <el-table :data="mouldInventoryData" style="width: 100%" border :summary-method="getMouldSummaries" show-summary>
        <el-table-column type="index" width="50" />
        <el-table-column prop="partName" label="手板件名称" />
        <el-table-column prop="partNumber" label="料号" />
        <el-table-column prop="unitPrice" label="单价" />
        <el-table-column prop="quantity" label="数量" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card> -->
    <el-card class="margin-top" header="差旅费用">
      <el-table :data="data.travelExpense" style="width: 100%" border :summary-method="getMouldSummaries" show-summary>
        <el-table-column type="index" width="50" />
        <el-table-column prop="partName" label="事由" />
        <el-table-column prop="peopleCount" label="人数" />
        <el-table-column prop="costSky" label="费用/天" />
        <el-table-column prop="skyCount" label="天数" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card>
    <el-card class="margin-top" header="其他费用">
      <el-table :data="data.restsCost" style="width: 100%" border :summary-method="getMouldSummaries" show-summary>
        <el-table-column type="index" width="50" />
        <el-table-column prop="rroject" label="项目" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card>
    <!-- <div style="float: right; margin: 20px 0">
      <el-button type="primary" @click="submit">提交</el-button>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, onMounted, watchEffect } from "vue"
import { GetPricingForm } from "./common/request"
import { getMouldSummaries } from "./common/mouldSummaries"
import { pricingForm } from "./data.type"
import console from "console"
// import { ElMessage } from "element-plus"

const data = ref<pricingForm>({
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
    const { success, result } = await GetPricingForm({ Id: 123, PartId: 123 })
    if (!success) throw Error()
    console.log(result, "result")
    // data.value = result
  } catch (err) {
    console.log(err, "[ GetPricingForm err ]")
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
