<template>
  <el-card>
    <div v-for="item in data.tableData" :key="item" class="common-card">
      <el-card class="table-wrap" :header="item.project">
        <el-table :data="[item]" style="width: 100%">
          <template v-for="(yearItem, i) in item.yearList" :key="yearItem">
            <el-table-column :prop="`yearList.${i}.value`" :label="yearItem.year" />
          </template>
          <el-table-column prop="grossMargin" label="毛利率" />
          <el-table-column prop="totak" label="总和" />
        </el-table>
      </el-card>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, onMounted } from "vue"
import { GetYearDimensionalityComparison } from "./service"

/**
 * 数据部分
 */
const data = reactive<{
  tableData: any
  projects: any
}>({
  tableData: [],
  projects: []
})

onBeforeMount(() => {})

onMounted(() => {
  init()
})

const init = async () => {
  const { result } = await GetYearDimensionalityComparison({})
  console.log(result, "res")
  data.tableData = result
}
</script>
<style scoped lang="scss">
.common-card {
  margin-top: 10px;
}
</style>
