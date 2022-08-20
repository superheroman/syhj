<template>
  <div style="padding: 0 10px">
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
            <el-input v-model="row.unitPrice" />
          </template>
        </el-table-column>
        <el-table-column label="数量（set）" width="180">
          <template #default="{ row }">
            <el-input-number v-model="row.count" :min="0" controls-position="right" />
          </template>
        </el-table-column>

        <el-table-column label="费用" width="180">
          <template #default="{ row }">
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
import { getQaqcDepartmentsSummaries } from "./common/nreQCDepartmentSummaries"
import { PostQADepartment } from "./common/request"
import { ElMessage } from "element-plus"
import getQuery from "@/utils/getQuery"

const { auditFlowId = 1, productId = 1 }: any = getQuery()

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

const deleteQaqcDepartmentsData = (i: number) => {
  data.qaqcDepartments.splice(i, 1)
}

const addQaqcDepartmentsData = () => {
  data.qaqcDepartments.push({
    cost: 0,
    count: 0,
    qc: null,
    remark: "",
    unitPrice: "",
    useWorkstation: null
  })
}

const submit = async () => {
  try {
    const { success } = await PostQADepartment({
      auditFlowId,
      qaDepartments: [
        {
          productId,
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
    if (!success) throw Error()
    ElMessage.success("提交成功")
  } catch (err) {
    ElMessage.error("提交失败")
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
