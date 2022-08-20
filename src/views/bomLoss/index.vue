<template>
  <div class="bom-loss">
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>bom损耗率表单</span>
        </div>
      </template>
      <h4>电子料</h4>
      <el-table :data="data.bomLossElecData" border style="width: 100%" height="500">
        <el-table-column type="index" width="50" />
        <el-table-column prop="superType" label="种类" width="180" />
        <el-table-column prop="categoryName" label="物料大类" width="180" />
        <el-table-column :label="year + ''" v-for="(year, index) in data.years" :key="year">
          <template #default="{ row }">
            <el-input v-model="row.lossRateYearList[index].rate" type="number">
              <template #append>%</template>
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <h4>结构料</h4>
      <el-table :data="data.bomLossStructData" border style="width: 100%" height="500">
        <el-table-column type="index" width="50" />
        <el-table-column prop="superType" label="种类" width="180" />
        <el-table-column prop="categoryName" label="物料大类" width="180" />
        <el-table-column :label="year + ''" v-for="(year, index) in data.years" :key="year">
          <template #default="{ row }">
            <el-input v-model="row.lossRateYearList[index].rate" type="number">
              <template #append>%</template>
            </el-input>
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
import {
  // getLossRateType,
  getElecOldLossRateInfo,
  getStructOldLossRateInfo,
  // getOldLossRateInfo,
  saveLossRateInfo,
  getYears,
  getElecLossRateType,
  getStructLossRateType
} from "./service"
import { ElMessage } from "element-plus"
import { LossRateYearDto } from "./data.type"
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
  // bomLossData: [
  //   {
  //     categoryName: "1123",
  //     lossRateYearList: [] as LossRateYearDto[],
  //     auditFlowId: 2,
  //     productId: 2,
  //     product: "string",
  //     superType: "string"
  //   }
  // ],
  bomLossElecData: [],
  bomLossStructData: [],
  years: [] as number[]
})

let auditFlowId = 1
let productId = 1
let isOld = "false"
const submit = async () => {
  let bomLossData = [] as any[]
  bomLossData.concat(data.bomLossElecData, data.bomLossStructData)
  let res: any = await saveLossRateInfo({
    auditFlowId: auditFlowId,
    productId: productId,
    lossRateDtoList: bomLossData.map((item: any) => {
      return {
        ...item,
        lossRateYearList: item.lossRateYearList.map((i: LossRateYearDto) => {
          return {
            year: i.year,
            rate: (Number(i.rate) / 100).toFixed(4)
          }
        })
      }
    })
  })
  if (res.success) {
    ElMessage({
      type: "success",
      message: "保存成功"
    })
  }
}
// const years = (index: number) => {
//   let sop = new Date().getFullYear()
//   let yearList: number[] = [sop]
//   for (let i = 1; i < index; i++) {
//     yearList.push(sop + i)
//   }
//   return yearList
// }
onBeforeMount(() => {
  // console.log(VITE_BASE_API)
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  let query = getQuery()
  auditFlowId = query.auditFlowId ? Number(query.auditFlowId) : 1
  productId = query.productId ? Number(query.productId) : 1
  let { result } = (await getYears(auditFlowId)) as any
  data.years = result
  if (isOld === "true") {
    // let resOld: any = await getOldLossRateInfo({ auditFlowId, productId })
    // data.bomLossData = resOld.result

    let resOldElec: any = await getElecOldLossRateInfo({ auditFlowId, productId })
    data.bomLossElecData = resOldElec.result

    let resOldStruct: any = await getStructOldLossRateInfo({ auditFlowId, productId })
    data.bomLossStructData = resOldStruct.result
  } else {
    // let res: any = await getLossRateType({ auditFlowId, productId })
    // 获取电子料 结构料初始值
    let resElec: any = await getElecLossRateType({ auditFlowId, productId })
    let resStruct: any = await getStructLossRateType({ auditFlowId, productId })
    data.bomLossElecData = resElec.result
    data.bomLossStructData = resStruct.result
  }
  data.bomLossElecData.forEach((item: any) => {
    item.lossRateYearList = []
    item.lossRateYearList = data.years.map((year) => ({ year, rate: "" }))
  })
  data.bomLossStructData.forEach((item: any) => {
    item.lossRateYearList = []
    item.lossRateYearList = data.years.map((year) => ({ year, rate: "" }))
  })
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
