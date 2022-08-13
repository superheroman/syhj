<template>
  <div class="bom-loss">
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>bom损耗率表单</span>
        </div>
      </template>
      <el-table :data="data.bomLossData" border style="width: 100%" height="500">
        <el-table-column type="index" width="50" />
        <el-table-column prop="superType" label="种类" width="180" />
        <el-table-column prop="categoryName" label="物料大类" width="180" />
        <el-table-column :label="year + ''" v-for="(year, index) in data.years" :key="year">
          <template #default="{ row }">
            <el-input v-model="row.lossRateYearList[index].rate" />
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right; margin: 20px 0">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
import { getLossRateType, getOldLossRateInfo, saveLossRateInfo } from "./service"
import { ElMessage } from "element-plus"
// import { LossRateYearDto } from "./data.type"
import getQuery from "@/utils/getQuery"

/**
 * 路由对象
 */
/**
 * 路由实例
 */
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({
  bomLossData: [
    // {
    //   categoryName: "1123",
    //   lossRateYearList: [] as LossRateYearDto[],
    //   auditFlowId: 2,
    //   productId: 2,
    //   product: "string",
    //   superType: "string"
    // }
  ],
  years: [] as number[]
})

let auditFlowId = 0
let productId = 0
const submit = async () => {
  let res: any = await saveLossRateInfo({
    auditFlowId: auditFlowId,
    productId: productId,
    lossRateDtoList: data.bomLossData
  })
  if (res.success) {
    ElMessage({
      type: "success",
      message: "保存成功"
    })
  }
}
const years = (index: number) => {
  let sop = new Date().getFullYear()
  let yearList: number[] = [sop]
  for (let i = 1; i < index; i++) {
    yearList.push(sop + i)
  }
  return yearList
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
  data.years = years(5)
  data.bomLossData.forEach((item) => {
    item.lossRateYearList = data.years.map((year) => ({ year, rate: "" }))
  })
})
onMounted(async () => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  let query = getQuery()
  auditFlowId = Number(query.auditFlowId)
  productId = Number(query.productId)

  let res: any = await getLossRateType({ auditFlowId, productId })
  console.log(res)
  let resOld: any = await getOldLossRateInfo({ auditFlowId, productId })
  data.bomLossData = resOld.result
})
watchEffect(() => {})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})
</script>
<style scoped lang="scss">
.card {
  margin: 10px 0;
}
</style>
