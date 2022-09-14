<template>
  <div style="padding: 0 10px">
    <el-card class="margin-top">
      <template #header>
        <el-row style="width: 100%" justify="space-between" align="middle">
          实验费用
          <el-button type="primary" @click="addLaboratoryFeeModel" v-havedone>新增</el-button>
        </el-row>
      </template>
      <el-table
        :data="data.laboratoryFeeModels"
        border
        :summary-method="getLaboratoryFeeSummaries"
        show-summary
        height="70vh"
      >
        <el-table-column type="index" width="50" />
        <el-table-column label="试验项目（根据与客户协定项目）" width="180">
          <template #default="{ row }">
            <el-input v-model="row.testItem" />
          </template>
        </el-table-column>
        <el-table-column label="是否指定第三方" width="150">
          <template #default="{ row }">
            <el-select v-model="row.isThirdParty">
              <el-option :value="true" label="是" />
              <el-option :value="false" label="否" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="单价" width="120">
          <template #default="{ row }">
            <el-input-number v-model="row.unitPrice" :min="0" controls-position="right" />
          </template>
        </el-table-column>
        <el-table-column label="数量" width="120">
          <template #default="{ row }">
            <el-input-number v-model="row.count" :min="0" controls-position="right" />
          </template>
        </el-table-column>
        <el-table-column label="时间-摸底" width="180">
          <template #default="{ row }">
            <el-date-picker v-model="row.dataThoroughly" type="date" />
          </template>
        </el-table-column>
        <el-table-column label="时间-DV" width="180">
          <template #default="{ row }">
            <el-date-picker v-model="row.dataDV" type="date" />
          </template>
        </el-table-column>
        <el-table-column label="时间-PV" width="180">
          <template #default="{ row }">
            <el-date-picker v-model="row.dataPV" type="date" />
          </template>
        </el-table-column>
        <el-table-column label="单位" width="180">
          <template #default="{ row }">
            <el-input v-model="row.unit" />
          </template>
        </el-table-column>
        <!-- <el-table-column label="时间" width="250">
          <template #default="{ row }">
            <el-date-picker size="small" v-model="row.time" type="datetime" />
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="时间-摸底" width="180">
        <template #default="{ row }">
          <el-input v-model="row.time" />
        </template>
      </el-table-column>
      <el-table-column label="时间-DV" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column>
      <el-table-column label="时间-PV" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column> -->
        <!-- <el-table-column label="单位" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column> -->
        <el-table-column label="总费用" width="150">
          <template #default="{ row }"> ￥ {{ row.unitPrice * row.count }} </template>
        </el-table-column>
        <!-- <el-table-column label="单位" width="180">
        <template #default="{ row }">
          <el-input v-model="row.carModel" />
        </template>
      </el-table-column> -->
        <el-table-column label="备注" width="180">
          <template #default="{ row }">
            <el-input v-model="row.remark" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="90">
          <template #default="{ $index }">
            <el-button @click="deleteLaboratoryFeeModel($index)" type="danger" v-havedone>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div style="float: right; margin: 20px 0">
      <el-button type="primary" @click="submit" v-havedone>提交</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { PostProductDepartment, GetProductDepartment } from "./common/request"
import { getLaboratoryFeeSummaries } from "./common/nrePilotprojectsSummaries"
import { LaboratoryFeeModel } from "./data.type"
import getQuery from "@/utils/getQuery"
import { ElMessage } from "element-plus"

const deleteLaboratoryFeeModel = (i: number) => {
  data.laboratoryFeeModels.splice(i, 1)
}
let { auditFlowId, productId } = getQuery()
const addLaboratoryFeeModel = () => {
  data.laboratoryFeeModels.push({ unitPrice: 0, allCost: 0, count: 0 })
}

/**
 * 数据部分
 */
const data = reactive<{
  laboratoryFeeModels: LaboratoryFeeModel[]
}>({
  laboratoryFeeModels: []
})

const initFetch = async () => {
  const { result } = (await GetProductDepartment(auditFlowId, productId)) || {}
  data.laboratoryFeeModels = result.laboratoryFeeModels || []
}

const submit = async () => {
  try {
    const { success } = await PostProductDepartment({
      auditFlowId,
      productDepartmentModels: {
        productId,
        laboratoryFeeModels:
          data.laboratoryFeeModels.map((item) => ({
            ...item,
            allCost: (item.unitPrice || 0) * (item.count || 0)
          })) || []
      }
    })
    if (success) ElMessage.success("提交成功！")
    console.log(success, "[PostProductDepartment RES]")
  } catch (err) {
    console.log(err, "[PostProductDepartment err]")
  }
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  initFetch()
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {})
</script>
<style scoped lang="scss">
.margin-top {
  margin-top: 20px;
}
</style>
