<template>
  <div style="padding: 0 10px">
    <el-card class="margin-top">
      <template #header> 模具清单 </template>
      <el-table :data="data.mouldData" style="width: 100%" border :summary-method="getMouldSummaries" show-summary>
        <el-table-column type="index" width="50" />
        <el-table-column label="模具名称" width="180">
          <template #default="{ row }">
            <el-input v-model="row.modelName" />
          </template>
        </el-table-column>
        <el-table-column label="模穴数" width="180">
          <template #default="{ row }">
            <el-input v-model="row.moldCavityCount" />
          </template>
        </el-table-column>
        <el-table-column label="模次数" width="180">
          <template #default="{ row }">
            <el-input v-model="row.modelNumber" type="number" :formatter="transformNumber" :min="0" />
          </template>
        </el-table-column>
        <el-table-column label="数量" width="180">
          <!-- <template #default="{ row }">
            <el-input v-model="row.count" />
          </template> -->
        </el-table-column>
        <el-table-column label="单价" width="180">
          <template #default="{ row }">
            <el-input v-model="row.unitPrice" type="number" :formatter="transformNumber" :min="0" />
          </template>
        </el-table-column>
        <el-table-column label="费用" width="180">
          <template #default="{ row }">
            <!-- <el-input v-model="row.cost" /> -->
            {{ row.unitPrice * row.count }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div style="float: right; margin: 20px 0">
      <el-button type="primary" @click="handleCalculation">计算</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { PostResourcesManagement, GetInitialResourcesManagement, PostCalculateMouldInventory } from "./common/request"
import { getMouldSummaries } from "./common/mouldSummaries"
import { transformNumber } from "./common/utils"

const data = reactive({
  mouldData: []
})

const initFetch = async () => {
  await GetInitialResourcesManagement({ id: 123 })
}

const submit = async () => {
  await PostResourcesManagement({
    processId: 123,
    resourcesManagementModels: [
      {
        mouldInventory: data.mouldData,
        partId: 123
      }
    ]
  })
}

const handleCalculation = async () => {
  try {
    const res = await PostCalculateMouldInventory({
      processId: 123,
      resourcesManagementModels: [
        {
          mouldInventory: data.mouldData,
          partId: 123
        }
      ]
    })
    console.log(res, "[PostCalculateMouldInventory res]")
  } catch (err) {
    console.log(err, "[PostCalculateMouldInventory err ]")
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
