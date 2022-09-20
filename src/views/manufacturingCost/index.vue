<template>
  <div>
    <!-- <div style="float: right; margin: 20px 10px">
      <el-button @click="addTableF" type="primary">新增</el-button>
    </div> -->
    <el-table :data="data.tableF" border style="margin: 20px 0" height="500">
      <el-table-column prop="year" label="年份" width="180" />
      <el-table-column label="直接制造成本" width="180">
        <el-table-column label="直接人工" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="设备折旧" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="换线成本" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="制造费用" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="小计" width="180" prop="cost" />
      </el-table-column>
      <el-table-column label="间接制造成本" width="180">
        <el-table-column label="直接人工" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="设备折旧" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="制造费用" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="小计" width="180" prop="cost" />
      </el-table-column>
      <el-table-column label="合计" width="180" prop="cost" />
    </el-table>

    <el-table :data="data.tableS" border height="500">
      <el-table-column prop="year" label="年份" width="180" />
      <el-table-column label="直接制造成本" width="180">
        <el-table-column label="直接人工" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="设备折旧" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="换线成本" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="制造费用" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="小计" width="180" prop="cost" />
      </el-table-column>
      <el-table-column label="间接制造成本" width="180">
        <el-table-column label="直接人工" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="设备折旧" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="制造费用" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="小计" width="180" prop="cost" />
      </el-table-column>
      <el-table-column label="合计" width="180" prop="cost" />
    </el-table>
    <div style="float: right; margin: 20px 10px">
      <el-button @click="submit" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
import { ElMessage } from "element-plus"
import { getAllYearsFrom } from "./service"
import getQuery from "@/utils/getQuery"
let { auditFlowId } = getQuery()

// import { useRoute, useRouter } from "vue-router"
/**
 * 仓库
 */
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
  years: [] as number[],
  tableF: [] as any[],
  tableS: [] as any[]
})
// const addTableF = () => {
//   data.tableF.push({})
// }
// const addTableS = () => {
//   data.tableS.push({})
// }
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  ElMessage.success("获取一下数据")
  let { result } = (await getAllYearsFrom(auditFlowId)) as any
  data.years = result
  data.years.forEach((year) => {
    data.tableF.push({ year })
    data.tableS.push({ year })
  })
})
const submit = () => {
  console.log(123)
}
watchEffect(() => {})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})
</script>
<style scoped lang="sass"></style>
