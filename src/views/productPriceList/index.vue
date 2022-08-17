<template>
  <div>
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>项目核价表（量产/样品）</span>
        </div>
      </template>
      <el-table :data="data.material" style="width: 100%" border>
        <el-table-column type="index" width="50" />
        <el-table-column label="sap" prop="sap" width="180" />
        <el-table-column label="材料名称" prop="materialName" width="180" />
        <el-table-column label="装配数量" prop="" width="180" />
        <el-table-column label="材料单价（原币）" prop="assemblyCount" width="180" />
        <el-table-column label="币别" prop="currencyText" width="180" />
        <el-table-column label="汇率" prop="exchangeRate" width="180" />
        <el-table-column label="材料单价（人民币）" prop="materialPriceCyn" width="180" />
        <el-table-column label="合计金额（人民币）" prop="totalMoneyCyn" width="180" />
        <el-table-column label="损耗" prop="loss" width="180" />
        <el-table-column label="材料成本（含损耗）" prop="materialCost" width="180" />
        <el-table-column label="投入量" prop="inputCount" width="180" />
        <el-table-column label="采购量" prop="purchaseCount" width="180" />
        <el-table-column label="MOQ分摊成本" prop="moqShareCount" width="180" />
        <el-table-column label="MOQ" prop="moq" width="180" />
        <el-table-column label="可用库存" prop="availableInventory" width="180" />
        <el-table-column label="备注" prop="remarks" width="180" />
      </el-table>
    </el-card>
    <el-card>
      <el-table :data="data.manufacturingCost" style="width: 100%" border>
        <el-table-column label="成本项目" prop="" width="180" />
        <el-table-column label="直接制造成本" prop="">
          <!-- <el-table-column label="直接人工" prop="" />
          <el-table-column label="设备折旧" prop="" />
          <el-table-column label="换线成本" prop="" />
          <el-table-column label="制造费用" prop="" />
          <el-table-column label="小计" prop="" /> -->
          <el-table-column label="直接人工" prop="directLabor" />
          <el-table-column label="设备折旧" prop="equipmentDepreciation" />
          <el-table-column label="换线成本" prop="lineChangeCost" />
          <el-table-column label="制造费用" prop="manufacturingExpenses" />
          <el-table-column label="小计" prop="subtotal" />
        </el-table-column>
        <el-table-column label="间接制造成本" prop="">
          <el-table-column label="直接人工" prop="directLabor" />
          <el-table-column label="设备折旧" prop="equipmentDepreciation" />
          <el-table-column label="换线成本" prop="lineChangeCost" />
          <el-table-column label="制造费用" prop="manufacturingExpenses" />
          <el-table-column label="小计" prop="subtotal" />
        </el-table-column>
        <el-table-column label="合计" prop="" />
      </el-table>
    </el-card>
    <el-card>
      <el-table :data="data.lossCost" style="width: 100%" border>
        <el-table-column label="成本项目" prop="name" width="180" />
        <el-table-column label="损耗率" prop="" width="180" />
        <el-table-column label="电子料" prop="" width="180" />
        <el-table-column label="结构料" prop="" width="180" />
        <el-table-column label="胶水" prop="" width="180" />
        <el-table-column label="外协加工" prop="" width="180" />
        <el-table-column label="包装材料" prop="" width="180" />
        <el-table-column label="合计" prop="" width="180" />
      </el-table>
    </el-card>
    <el-card>
      <el-table :data="data.otherCostItem" style="width: 100%" border>
        <el-table-column label="夹具" prop="fixture" width="180" />
        <el-table-column label="物流费" prop="logisticsFee" width="180" />
        <el-table-column label="质量成本" prop="" width="180">
          <el-table-column label="产品类别" prop="productCategory" width="180" />
          <el-table-column label="成本比例" prop="costProportion" width="180" />
          <el-table-column label="质量成本" prop="qualityCost" width="180" />
        </el-table-column>
        <el-table-column label="财务成本" prop="financialCost" width="180">
          <!-- <el-table-column label="账期" prop="accountingPeriod" width="180" />
          <el-table-column label="资金成本率" prop="capitalCostRate" width="180" />
          <el-table-column label="财务成本" prop="financialCost" width="180" /> -->
        </el-table-column>
        <el-table-column label="账期" prop="accountingPeriod" width="180" />
        <el-table-column label="资金成本率" prop="capitalCostRate" width="180" />
        <el-table-column label="财务成本" prop="financialCost" width="180" />
        <el-table-column label="税务成本" prop="taxCost" width="180" />
        <el-table-column label="合计" prop="total" width="180" />
      </el-table>
    </el-card>
    <!-- <div>{{totalCost}}</div> -->
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
// import { useRoute, useRouter } from "vue-router"
import { getPriceEvaluationTable } from "./service"

let auditFlowId = 0
let productId = 0
let inputCount = 0
let year = 0

/**
 * 路由对象
 */
// const route = useRoute()
// /**
//  * 路由实例
//  */
// const router = useRouter()
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({
  material: [],
  manufacturingCost: [],
  lossCost: [],
  otherCostItem: []
})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  let res: any = await getPriceEvaluationTable({
    auditFlowId,
    productId,
    inputCount,
    year
  })
  let { material, manufacturingCost, lossCost, otherCostItem } = res.result
  data.material = material
  data.manufacturingCost = manufacturingCost
  data.lossCost = lossCost
  data.otherCostItem = otherCostItem
})
watchEffect(() => {})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})
</script>
<style scoped lang="scss"></style>
