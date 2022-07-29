<template>
  <div class="pm-department">
    <div class="pm-department__btn-container">
      <el-button type="primary">SOR查看</el-button>
      <el-button type="primary">查看物流&包装基础数据</el-button>
    </div>
    <el-table :data="data.tableData" style="width: 100%" border>
      <el-table-column label="年份" prop="year" />
      <el-table-column label="单PCS包装价格/元">
        <template #default="{ row }">
          <el-input v-model="row.perPackagingPrice" />
        </template>
      </el-table-column>
      <el-table-column label="运费/月">
        <template #default="{ row }">
          <el-input v-model="row.freight" />
        </template>
      </el-table-column>
      <el-table-column label="仓储费用/月">
        <template #default="{ row }">
          <el-input v-model="row.storageExpenses" />
        </template>
      </el-table-column>
      <el-table-column label="月底需求量">
        <template #default="{ row }">
          <el-input v-model="row.monthEndDemand" />
        </template>
      </el-table-column>
      <el-table-column label="单PCS运输费">
        <template #default="{ row }">
          <el-input v-model="row.perFreight" />
        </template>
      </el-table-column>
      <el-table-column label="单PCS总物流料成本">
        <template #default="{ row }">
          <el-input v-model="row.perTotalLogisticsCost" />
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
import { getYears, saveProductionControl, getPcsByPriceEvaluationId } from "./service"
import { ElMessage } from "element-plus"

// import { useRoute, useRouter } from "vue-router"
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
  tableData: [],
  auditFlowId: 0,
  productId: 0
})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  let { result } = (await getYears(1)) as any
  let { result: monthEndDemand } = (await getPcsByPriceEvaluationId(1)) as any
  result = [2022, 2023, 2024]
  console.log(monthEndDemand)
  let warpArr = [] as any[] //二维数组
  monthEndDemand.items.forEach((item: any) => {
    item.pcsYear.forEach((yearItem: any, index: number) => {
      if (!warpArr[index]) {
        warpArr[index] = []
      }
      warpArr[index].push(yearItem.quantity)
    })
  })
  let yearValue = []
  warpArr.forEach((arr, index) => {
    yearValue[index] = arr.reduce((pre: number, cur: number) => {
      return pre + cur
    })
  })
  if (result?.length > 0) {
    data.tableData = result.map((year: number[]) => {
      return {
        year,
        perPackagingPrice: "",
        freight: "",
        storageExpenses: "",
        monthEndDemand: "",
        perFreight: "",
        perTotalLogisticsCost: ""
      }
    })
  }
  console.log(result)
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {})

const submit = () => {
  let { auditFlowId, productId } = data
  let infoList = data.tableData.map((item) => item)
  let res: any = saveProductionControl({
    auditFlowId,
    productId,
    infoList
  })
  if (res.success) {
    ElMessage.success("提交成功")
  }
}
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})
</script>
<style scoped lang="scss">
.pm-department {
  &__btn-container {
    margin: 20px 0;
  }
}
</style>
