<template>
  <div style="padding: 0 10px">
    <h5>实验费用</h5>
    <div style="float: right; margin-bottom: 20px">
      <el-button type="primary" @click="addCostData">新增</el-button>
    </div>
    <el-table :data="data.qaTestDepartments" style="width: 100%" border :summary-method="getSummaries" show-summary>
      <el-table-column type="index" width="50" />
      <el-table-column label="试验项目（根据与客户协定项目）" width="180">
        <template #default="{ row }">
          <el-input v-model="row.projectName" />
        </template>
      </el-table-column>
      <el-table-column label="是否指定第三方" width="180">
        <template #default="{ row }">
          <el-select v-model="row.isThirdParty">
            <el-option :value="true" label="是" />
            <el-option :value="false" label="否" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="180">
        <template #default="{ row }">
          <el-input v-model="row.unitPrice" />
        </template>
      </el-table-column>
      <el-table-column label="数量" width="180">
        <template #default="{ row }">
          <el-input v-model="row.count" />
        </template>
      </el-table-column>
      <el-table-column label="时间-摸底" width="180">
        <template #default="{ row }">
          <el-input v-model="row.dataThoroughly" />
        </template>
      </el-table-column>
      <el-table-column label="时间-DV" width="180">
        <template #default="{ row }">
          <el-input v-model="row.dataDV" />
        </template>
      </el-table-column>
      <el-table-column label="时间-PV" width="180">
        <template #default="{ row }">
          <el-input v-model="row.dataPV" />
        </template>
      </el-table-column>
      <el-table-column label="单位" width="180">
        <template #default="{ row }">
          <el-input v-model="row.unit" />
        </template>
      </el-table-column>
      <el-table-column label="总费用" width="180">
        <template #default="{ row }">
          <el-input v-model="row.allCost" />
        </template>
      </el-table-column>
      <el-table-column label="单价" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="备注" width="180">
        <template #default="{ row }">
          <el-input v-model="row.remark" />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ $index }">
          <el-button @click="deleteCostData($index)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="float: right; margin-bottom: 20px">
      <el-button type="primary" @click="addCostData">新增</el-button>
    </div>
    <el-table :data="data.qaTestDepartments" style="width: 100%" border :summary-method="getSummaries" show-summary>
      <el-table-column type="index" width="50" />
      <el-table-column label="项目制程QC量检具" width="180">
        <template #default="{ row }">
          <el-input v-model="row.qc" />
        </template>
      </el-table-column>
      <el-table-column label="单价" width="180">
        <template #default="{ row }">
          <el-input v-model="row.unitPrice" />
        </template>
      </el-table-column>
      <el-table-column label="数量（set）" width="180">
        <template #default="{ row }">
          <el-input v-model="row.count" />
        </template>
      </el-table-column>

      <el-table-column label="费用" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="使用工站" width="180">
        <template #default="{ row }">
          <el-input v-model="row.useWorkstation" />
        </template>
      </el-table-column>
      <el-table-column label="备注" width="180">
        <template #default="{ row }">
          <el-input v-model="row.remark" />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ $index }">
          <el-button @click="deleteCostData($index)" type="danger">删除</el-button>
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
const deleteCostData = (i: number) => {
  data.qaTestDepartments.splice(i, 1)
}
const addCostData = () => {
  data.qaTestDepartments.push({ carFactory: "" })
}
const submit = () => {}
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
  qaTestDepartments: []
})
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
