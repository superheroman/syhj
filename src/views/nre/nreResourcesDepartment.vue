<template>
  <el-card>
    <template v-for="(item, index) in data.mouldData" :key="item.productId">
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
              <el-input-number v-model="row.moldCavityCount" :min="0" controls-position="right" />
            </template>
          </el-table-column>
          <el-table-column label="模次数" width="180">
            <template #default="{ row }">
              <el-input-number v-model="row.modelNumber" :min="0" controls-position="right" />
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="count" width="180" />
          <el-table-column label="单价" width="180">
            <template #default="{ row }">
              <el-input-number v-model="row.unitPrice" :min="0" controls-position="right" />
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
          <el-button type="primary" @click="handleCalculation(item, index)">计算</el-button>
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
import getQuery from "@/utils/getQuery"
import { ElMessage } from "element-plus"

const { auditFlowId = 1 }: any = getQuery()

const data = reactive<any>({
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

const handleCalculation = async (record: any, i: number) => {
  console.log(record, "record")
  try {
    const { result, success } = await PostCalculateMouldInventory({
      auditFlowId,
      resourcesManagementModels: [
        {
          mouldInventory: record.mouldInventoryModels,
          productId: record.productId
        }
      ]
    })
    if (!success) ElMessage.success("计算成功")
    const { mouldInventory = [] }: any = result[0] || []
    data.mouldData[i].mouldInventoryModels = mouldInventory
    console.log(result, "[PostCalculateMouldInventory res]")
  } catch (err) {
    console.log(err, "[PostCalculateMouldInventory err ]")
    ElMessage.error("计算失败")
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
