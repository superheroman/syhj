<template>
  <el-card class="marketingQuotation-page" header="报价审核">
    <el-descriptions :column="2" border>
      <el-descriptions-item label="直接客户名称">
        {{ data.marketingQuotationData.directCustomerName }}
      </el-descriptions-item>
      <el-descriptions-item label="客户性质"> {{ data.marketingQuotationData.clientNature }} </el-descriptions-item>
      <el-descriptions-item label="终端客户名称">
        {{ data.marketingQuotationData.terminalCustomerName }}
      </el-descriptions-item>
      <el-descriptions-item label="终端客户性质">
        {{ data.marketingQuotationData.terminalClientNature }}
      </el-descriptions-item>
      <el-descriptions-item label="开发计划">
        <el-input style="width: 200px" v-model="data.developmentPlan" />
      </el-descriptions-item>
      <el-descriptions-item label="汇率"> {{ data.marketingQuotationData.exchangeRate }} </el-descriptions-item>
    </el-descriptions>
    <el-card header="sop5年内走量信息" m="2">
      <el-table :data="data.marketingQuotationData.motionMessage" border>
        <el-table-column type="index" width="100" />
        <el-table-column label="名称" prop="messageName" />
        <el-table-column
          v-for="(item, index) in data.motionMessageSop"
          :key="item.year"
          :label="item.year"
          :prop="`sop${index}.value`"
        />
      </el-table>
    </el-card>
    <el-card header="核心部件：" m="2">
      <div>
        产品名称：
        <el-input class="m-2" v-model="data.projectName" placeholder="请输入产品名称" style="width: 200px" />
      </div>
      <template v-for="item in data.marketingQuotationData.coreComponent" :key="item.messageName">
        <el-card :header="item.componentName" class="m-2">
          <el-table :data="item.productSubclass" border>
            <!-- <el-table-column type="index" width="100" /> -->
            <el-table-column label="核心部件" prop="coreComponent" />
            <el-table-column label="型号" prop="model" />
            <el-table-column label="类型" prop="type" />
            <el-table-column label="备注" prop="remark" />
          </el-table>
        </el-card>
      </template>
    </el-card>
    <el-card header="NRE费用：" m="2">
      <template v-for="item in data.marketingQuotationData.nreCost" :key="item.messageName">
        <el-card :header="item.nreCostModuleName" class="m-2">
          <el-table :data="item.nreCostModels" border>
            <el-table-column type="index" width="100" />
            <el-table-column label="费用类别" prop="name" />
            <el-table-column label="成本" prop="cost" />
          </el-table>
        </el-card>
      </template>
    </el-card>
    <el-card header="内部核价信息：" m="2">
      <template v-for="item in data.marketingQuotationData.pricingMessage" :key="item.messageName">
        <el-card :header="item.pricingMessageName" class="m-2">
          <el-table :data="item.pricingMessageModels" border>
            <el-table-column label="序号" type="index" width="100" />
            <el-table-column label="费用类别" prop="name" />
            <el-table-column label="成本值" prop="costValue" />
          </el-table>
        </el-card>
      </template>
    </el-card>
    <el-card header="报价策略：" m="2">
      <el-table :data="data.marketingQuotationData.biddingStrategy" border>
        <el-table-column type="index" width="100" />
        <el-table-column label="产品" prop="product" />
        <el-table-column label="成本" prop="cost" />
        <el-table-column label="毛利率" prop="grossMargin" />
        <el-table-column label="样件价格" prop="price" />
      </el-table>
    </el-card>
    <el-card header="费用表：" m="2">
      <el-table :data="data.marketingQuotationData.expensesStatement" border>
        <el-table-column type="index" width="100" />
        <el-table-column label="费用类别" prop="formName" />
        <el-table-column label="核价金额" prop="offerMoney" />
        <el-table-column label="报价系数" prop="offerCoefficient" />
        <el-table-column label="备注" prop="remark" />
      </el-table>
    </el-card>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { GetQuotationList } from "./service"
import getQuery from "@/utils/getQuery"
import { getYears } from "../pmDepartment/service"

const { auditFlowId = 1 }: any = getQuery()
/**
 * 数据部分
 */
const data = reactive<any>({
  projectName: "",
  developmentPlan: "",
  marketingQuotationData: {},
  motionMessageSop: []
})

const columns = reactive({
  sopData: []
})

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  initFetch()
  fetchSopYear()
})

const initFetch = async () => {
  const { result } = await GetQuotationList({ Id: auditFlowId })
  data.marketingQuotationData = result
  data.motionMessageSop = result.motionMessage[0].sop.map((item: any) => item)
  console.log(result, "result")
}

const fetchSopYear = async () => {
  const { result } = (await getYears(auditFlowId)) || {}
  columns.sopData = result || []
}

watchEffect(() => {})
</script>
<style scoped lang="scss">
.demandApply-result-page {
  margin: 10px;
}
</style>
