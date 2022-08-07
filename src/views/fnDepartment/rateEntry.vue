<template>
  <el-card header="费率录入">
    <el-table :data="tableData" style="width: 100%; margin-top: 25px" border>
      <el-table-column label="年份" prop="name" />
      <el-table-column label="直接制造率">
        <template #default="{ row }">
          <el-input v-model="row.directManufacturingRate" />
        </template>
      </el-table-column>
      <el-table-column label="间接人工率">
        <template #default="{ row }">
          <el-input v-model="row.indirectLaborRate" />
        </template>
      </el-table-column>
      <el-table-column label="间接折旧率">
        <template #default="{ row }">
          <el-input v-model="row.indirectDepreciationRate" />
        </template>
      </el-table-column>
      <el-table-column label="间接制造率">
        <template #default="{ row }">
          <el-input v-model="row.indirectManufacturingRate" />
        </template>
      </el-table-column>
    </el-table>
    <div style="float: right; margin: 20px 0">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, onMounted, watchEffect } from "vue"
import { GetRateEntry, SaveRateEntryInput } from "./service"
import { RateEntryInfo } from "./data.type"
import { ElMessage } from "element-plus"

/**
 * 数据部分
 */
const tableData = ref<RateEntryInfo[]>([])

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  initFetch()
})

watchEffect(() => {})

const initFetch = async () => {
  try {
    const { success, result } = await GetRateEntry()
    if (!success) throw Error()
    tableData.value = result.rateEntryInfos || []
  } catch (err: any) {
    console.log("[GetRateEntry Error]", err)
  }
}

const submit = async () => {
  try {
    const { success } = await SaveRateEntryInput({
      rateEntryInfos: tableData.value
    })
    if (!success) throw Error()
    ElMessage.success("提交成功")
  } catch (err: any) {
    console.log("[SaveRateEntryInput Error]", err)
    ElMessage.error("提交失败")
  }
}
</script>
<style scoped lang="scss"></style>
