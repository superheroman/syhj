<template>
  <div>
    <el-card class="card">
      <el-table :data="data.tableData" style="width: 100%; margin-top: 25px" border>
        <el-table-column type="index" width="80" />
        <el-table-column label="类别" prop="category" width="180" />
        <el-table-column label="是否首款产品" width="180">
          <template #default="{ row }">
            {{ row.isFirst ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column label="质量成本比例" width="180" />
        <el-table-column :label="year + ''" v-for="(year, index) in data.years" :key="year">
          <template #default="{ row }">
            <el-input v-model="row.qualityRateYearList[index].rate" />
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
// import { useRoute, useRouter } from "vue-router"
import { getQualityCost, saveQualityCost } from "./service"
import { QualityCostProportionEntryInfo } from "./data.type"
/**
 * 路由对象
 */
// const route = useRoute()
/**
 * 路由实例
 */
// const router = useRouter()
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({
  tableData: [
    {
      category: "string",
      isFirst: true,
      qualityRateYearList: []
    }
  ],
  years: [] as number[]
})
const years = (index: number) => {
  let sop = new Date().getFullYear()
  let yearList: number[] = [sop]
  for (let i = 1; i < index; i++) {
    yearList.push(sop + i)
  }
  return yearList
}
const submit = async () => {
  let res = await saveQualityCost(data.tableData as QualityCostProportionEntryInfo[])
  console.log(res)
}
onBeforeMount(() => {
  data.years = years(5)
  data.tableData.forEach((item: any) => {
    item.qualityRateYearList = data.years.map((year) => ({ year, rate: "" }))
  })
})
onMounted(async () => {
  let res: any = await getQualityCost()
  // data.tableData = res.result.qualityCosts || []
  console.log(res)
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
  margin: 20px 0;
}
</style>
