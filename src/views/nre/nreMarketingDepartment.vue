<template>
  <div style="padding: 0 10px">
    <el-card class="margin-top">
      <template #header> 营销部 - 业务员 </template>
      <el-table :data="mouldInventoryData" style="width: 100%" border :summary-method="getMouldSummaries" show-summary>
        <el-table-column type="index" width="50" />
        <el-table-column label="表单名称" width="180">
          <template #default="{ row }">
            <el-input v-model="row.formName" />
          </template>
        </el-table-column>
        <el-table-column label="核价金额" width="180">
          <template #default="{ row }">
            <el-input v-model="row.pricingMoney" type="number" :formatter="transformNumber" :min="0" />
          </template>
        </el-table-column>
        <el-table-column label="报价系数" width="180">
          <template #default="{ row }">
            <el-input v-model="row.offerCoefficient" type="number" :formatter="transformNumber" :min="0" />
          </template>
        </el-table-column>
        <el-table-column label="报价金额" width="180">
          <template #default="{ row }">
            <el-input v-model="row.offerMoney" type="number" :formatter="transformNumber" :min="0" />
          </template>
        </el-table-column>
        <el-table-column label="备注" width="180">
          <template #default="{ row }">
            <el-input v-model="row.remark" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div style="float: right; margin: 20px 0">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, onMounted, watchEffect } from "vue"
import { GetInitialSalesDepartment, PostSalesDepartment } from "./common/request"
import { getMouldSummaries } from "./common/mouldSummaries"
import { NreMarketingDepartmentModel } from "./data.type"
import { transformNumber } from "./common/utils"
import { ElMessage } from "element-plus"

const mouldInventoryData = ref<NreMarketingDepartmentModel[]>([])

const initFetch = async () => {
  try {
    const { success, result } = await GetInitialSalesDepartment({ id: 123 })
    if (!success) throw Error()
    console.log(result, "result")
    mouldInventoryData.value = result
  } catch (err) {
    console.log(err, "GetInitialSalesDepartment result")
  }
}

const submit = async () => {
  try {
    const { success } = await PostSalesDepartment(mouldInventoryData.value)
    if (!success) throw Error()
    ElMessage.success("提交成功~")
  } catch (err) {
    console.log(err, "[ PostSalesDepartment ERROR ]")
  }
}

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  initFetch()
})

watchEffect(() => {})
</script>
<style scoped lang="scss">
.margin-top {
  margin-top: 20px;
}
</style>
