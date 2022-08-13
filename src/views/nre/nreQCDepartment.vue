<template>
  <div style="padding: 0 10px">
    <el-card class="margin-top">
      <template #header>
        <el-row style="width: 100%" justify="space-between" align="middle">
          试验项目（根据与客户协定项目）
          <el-button type="primary" @click="addQaTestDepartments">新增</el-button>
        </el-row>
      </template>
      <el-table
        :data="data.qaTestDepartments"
        style="width: 100%"
        border
        :summary-method="getQaTestDepartmentsSummaries"
        show-summary
      >
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
            <el-input v-model="row.unitPrice" type="number" :formatter="transformNumber" :min="0" />
          </template>
        </el-table-column>
        <el-table-column label="数量" width="180">
          <template #default="{ row }">
            <el-input v-model="row.count" type="number" :formatter="transformNumber" :min="0" />
          </template>
        </el-table-column>
        <el-table-column label="总费用" width="180">
          <template #default="{ row }">
            <!-- <el-input v-model="row.allCost" type="number" :formatter="transformNumber" :min="0" /> -->
            {{ row.unitPrice * row.count }}
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
            <el-input v-model="row.unit" type="number" :formatter="transformNumber" :min="0" />
          </template>
        </el-table-column>
        <el-table-column label="备注" width="180">
          <template #default="{ row }">
            <el-input v-model="row.remark" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="85px">
          <template #default="{ $index }">
            <el-button @click="deleteQaTestDepartments($index)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="margin-top">
      <template #header>
        <el-row style="width: 100%" justify="space-between" align="middle">
          项目制程QC量检具
          <el-button type="primary" @click="addQaqcDepartmentsData">新增</el-button>
        </el-row>
      </template>
      <el-table
        :data="data.qaqcDepartments"
        style="width: 100%"
        border
        :summary-method="getQaqcDepartmentsSummaries"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column label="项目制程QC量检具" width="180">
          <template #default="{ row }">
            <el-input v-model="row.qc" />
          </template>
        </el-table-column>
        <el-table-column label="单价" width="180">
          <template #default="{ row }">
            <el-input v-model="row.unitPrice" type="number" :formatter="transformNumber" :min="0" />
          </template>
        </el-table-column>
        <el-table-column label="数量（set）" width="180">
          <template #default="{ row }">
            <el-input v-model="row.count" type="number" :formatter="transformNumber" :min="0" />
          </template>
        </el-table-column>

        <el-table-column label="费用" width="180">
          <template #default="{ row }">
            <!-- <el-input v-model="row.cost" type="number" :formatter="transformNumber" :min="0" /> -->
            {{ row.unitPrice * row.count }}
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
            <el-button @click="deleteQaqcDepartmentsData($index)" type="danger">删除</el-button>
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
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { QADepartmentTestModel, QADepartmentQCModel } from "./data.type"
import { transformNumber } from "./common/utils"
import { getQaTestDepartmentsSummaries, getQaqcDepartmentsSummaries } from "./common/nreQCDepartmentSummaries"
import { PostQADepartment } from "./common/request"
import console from "console"

/**
 * 数据部分
 */
const data = reactive<{
  qaTestDepartments: QADepartmentTestModel[]
  qaqcDepartments: QADepartmentQCModel[]
}>({
  qaTestDepartments: [],
  qaqcDepartments: []
})

const deleteQaTestDepartments = (i: number) => {
  data.qaTestDepartments.splice(i, 1)
}

const deleteQaqcDepartmentsData = (i: number) => {
  data.qaqcDepartments.splice(i, 1)
}

const addQaTestDepartments = () => {
  data.qaTestDepartments.push({
    allCost: 0,
    count: 0,
    isThirdParty: false,
    projectName: "",
    remark: "",
    unit: "",
    unitPrice: 0
  })
}

const addQaqcDepartmentsData = () => {
  data.qaqcDepartments.push({
    cost: 0,
    count: 0,
    qc: null,
    remark: "",
    unitPrice: 0,
    useWorkstation: null
  })
}

const submit = async () => {
  try {
    const res = await PostQADepartment({
      auditFlowId: 123,
      qaDepartments: [
        {
          productId: 123,
          qaTestDepartments: data.qaTestDepartments.map((item) => ({
            ...item,
            cost: (item.unitPrice || 0) * (item.count || 0)
          })),
          qaqcDepartments: data.qaqcDepartments.map((item) => ({
            ...item,
            allCost: (item.unitPrice || 0) * (item.count || 0)
          }))
        }
      ]
    })
    console.log(res, "RES")
  } catch (err) {
    console.log(err, "[PostQADepartment err]")
  }
}

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})

watchEffect(() => {})
</script>
<style scoped lang="scss">
.margin-top {
  margin-top: 20px;
}
</style>
