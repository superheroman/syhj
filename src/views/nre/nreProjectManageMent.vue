<template>
  <div style="padding: 0 10px">
    <h5>手板件费用</h5>
    <div style="float: right; margin-bottom: 20px">
      <el-button type="primary" @click="addHandboardCost">新增</el-button>
    </div>
    <el-table :data="data.handboardCostData" style="width: 100%" border height="300">
      <el-table-column type="index" width="50" />
      <el-table-column label="零件名" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carFactory" />
        </template>
      </el-table-column>
      <el-table-column label="料号" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="单价" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="数量" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="费用" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="备注" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ $index }">
          <el-button @click="deletehandboardCost($index)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <h5>其它费用</h5>
    <div style="float: right; margin-bottom: 20px">
      <el-button type="primary" @click="addOtherCostData">新增</el-button>
    </div>
    <el-table
      :data="data.otherCostData"
      style="width: 100%"
      border
      :summary-method="getSummaries"
      show-summary
      height="300"
    >
      <el-table-column type="index" width="50" />
      <el-table-column label="费用名称" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carFactory" />
        </template>
      </el-table-column>
      <el-table-column label="费用" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="备注" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ $index }">
          <el-button @click="deleteOtherCostData($index)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <h5>差旅费</h5>
    <div style="float: right; margin-bottom: 20px">
      <el-button type="primary" @click="addTravelCostData">新增</el-button>
    </div>
    <el-table
      :data="data.travelCostData"
      style="width: 100%"
      border
      :summary-method="getSummaries"
      show-summary
      height="300"
    >
      <el-table-column type="index" width="50" />
      <el-table-column label="事由" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carFactory" />
        </template>
      </el-table-column>
      <el-table-column label="人数" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="费用/天" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="天数" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="费用" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="备注" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ $index }">
          <el-button @click="deleteTravelCostData($index)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="float: right; margin: 20px 0">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults"

interface SummaryMethodProps<T = []> {
  columns: TableColumnCtx<T>[]
  data: T[]
}

const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param
  console.log(columns, data)
  const sums: string[] | number[] = []

  return sums
}

//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({
  handboardCostData: [],
  otherCostData: [],
  travelCostData: []
})
const deletehandboardCost = (i: number) => {
  data.handboardCostData.splice(i, 1)
}
const deleteTravelCostData = (i: number) => {
  data.handboardCostData.splice(i, 1)
}
const deleteOtherCostData = (i: number) => {
  data.otherCostData.splice(i, 1)
}
const addHandboardCost = () => {
  data.handboardCostData.push({ carFactory: "" })
}
const addOtherCostData = () => {
  data.otherCostData.push({ carFactory: "" })
}
const addTravelCostData = () => {
  data.travelCostData.push({ carFactory: "" })
}
const submit = () => {}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})
</script>
<style scoped lang="scss"></style>
