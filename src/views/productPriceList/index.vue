<template>
  <el-card m="2">
    <el-row>
      <div v-if="pageType === 'result'">
        是否为全生命周期：
        <el-select placeholder="请选择" v-model="data.isAll">
          <el-option v-for="opt in options" :key="opt.label" :label="opt.label" :value="opt.value" />
        </el-select>
      </div>
      <el-row justify="space-between" v-else>
        <EZFilter :filterNnum="data.filterNnum" :show-btn="true" :onSubmit="fetchPriceEvaluationTable" />
        <el-button type="primary" class="m-2" @click="handleFetchPriceEvaluationTableDownload">
          产品核价表下载
        </el-button>
      </el-row>
    </el-row>

    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>项目核价表（量产/样品）</span>
        </div>
      </template>

      <el-table :data="data.material" border>
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
    <el-card class="card">
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
    <el-card class="card">
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
    <el-card class="card">
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
    <el-descriptions :column="3" border>
      <el-descriptions-item label="日期"> {{ data.date }} </el-descriptions-item>
      <el-descriptions-item label="投出量"> {{ data.inputCount }} </el-descriptions-item>
      <el-descriptions-item label="需求量"> {{ data.requiredCount }} </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
// import { useRoute, useRouter } from "vue-router"
import { getPriceEvaluationTable, getPriceEvaluationTableResult, PriceEvaluationTableDownload } from "./service"
import getQuery from "@/utils/getQuery"
import EZFilter from "@/components/EZFilter/index.vue"
import { getYears } from "../pmDepartment/service"
import { downloadFileZip } from "@/utils/index"
const { auditFlowId, productId, pageType } = getQuery()

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
const changeYears = (val: any) => (data.year = val)

const data = reactive({
  material: [],
  manufacturingCost: [],
  lossCost: [],
  otherCostItem: [],
  isAll: 0,
  date: "",
  inputCount: "",
  requiredCount: "",
  year: "",
  filterNnum: [
    {
      label: "年份",
      key: "year",
      role: "select",
      options: [],
      onchange: changeYears
    },
    {
      label: "投入量",
      key: "inputCount"
    }
  ]
})

const options = [
  {
    label: "是",
    value: 1
  },
  {
    label: "否",
    value: 0
  }
]

const fetchPriceEvaluationTableResult = async () => {
  const { result }: any = await getPriceEvaluationTableResult({
    auditFlowId,
    productId,
    isAll: !!data.isAll
  })
  console.log(result)
}

const fetchPriceEvaluationTable = async (props?: any) => {
  const { inputCount, year } = props
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
}

const fetchSopYear = async () => {
  const { result } = (await getYears(auditFlowId)) || {}
  data.filterNnum[0].options = result.map((item: any) => ({ label: item })) || []
}

// 产品核价表下载
const handleFetchPriceEvaluationTableDownload = async () => {
  try {
    const res: any = await PriceEvaluationTableDownload({
      Year: data.year,
      AuditFlowId: auditFlowId,
      ModelCountId: productId
    })

    downloadFileZip(res, "产品核价表")
    // console.log(result, "产品核价表下载")
  } catch (err: any) {
    console.log(err, "[ 产品核价表下载据失败 ]")
  }
}

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(async () => {
  fetchSopYear()
  pageType === "result" && fetchPriceEvaluationTableResult()
})

watchEffect(() => {})
</script>
<style scoped lang="scss">
.card {
  margin: 20px 0;
}
</style>
