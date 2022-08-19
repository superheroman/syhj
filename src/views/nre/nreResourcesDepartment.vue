<template>
  <el-card>
    <template v-for="item in data.mouldData" :key="item.productId">
      <el-card class="margin-top" :header="`零件${item.productId}`">
        <el-table
          :data="item.mouldInventoryModels"
          style="width: 100%"
          border
          :summary-method="getMouldSummaries"
          show-summary
        >
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
          <el-table-column label="数量" prop="count" width="180" />
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
        <div style="float: right; margin: 20px 0">
          <el-button type="primary" @click="handleCalculation(item)">计算</el-button>
          <el-button type="primary" @click="submit(item)">提交</el-button>
        </div>
      </el-card>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { PostResourcesManagement, GetInitialResourcesManagement, PostCalculateMouldInventory } from "./common/request"
import { getMouldSummaries } from "./common/mouldSummaries"
import { transformNumber } from "./common/utils"
import getQuery from "@/utils/getQuery"

const { auditFlowId = 1 }: any = getQuery()

const data = reactive({
  mouldData: [],
  resourcesManagementModels: []
})

const initFetch = async () => {
  const { result } = await GetInitialResourcesManagement({ id: auditFlowId })
  data.mouldData = result.mouldInventoryModels
  data.resourcesManagementModels = result.mouldInventoryModels
}

const submit = async (record: any) => {
  await PostResourcesManagement({
    auditFlowId,
    resourcesManagementModels: [
      {
        mouldInventory: record.mouldInventoryModels,
        productId: record.productId
      }
    ]
  })
}

const handleCalculation = async (record: any) => {
  console.log(record, "record")
  try {
    const res = await PostCalculateMouldInventory({
      auditFlowId,
      resourcesManagementModels: [
        {
          mouldInventory: record.mouldInventoryModels,
          productId: record.productId
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
