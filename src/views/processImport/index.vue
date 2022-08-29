<template>
  <div class="electronic-import">
    <el-card class="m-2">
      <template #header>
        <el-row align="middle" justify="space-between">
          <span>工序工时导入</span>
          <el-row align="middle">
            <el-upload
              action="/api/services/app/WorkingHours/UploadExcel"
              :on-success="handleSuccess"
              :show-file-list="false"
              class="m-2"
            >
              <el-button type="primary">工序工时上传</el-button>
            </el-upload>
            <el-button class="m-2" type="primary" @click="downLoadTemplate">工序工时模版下载</el-button>
          </el-row>
        </el-row>
      </template>
      <el-card>
        <el-table :data="data.tableData" border style="width: 100%" height="700">
          <el-table-column label="设备部分" class-name="columnColor1">
            <template v-for="(item, index) in data.equipmentPart?.equipmentDetails" :key="`equipmentPart-${index}`">
              <el-table-column
                :prop="`equipmentPart.equipmentDetails[${index}].equipmentName`"
                :label="`设备${index + 1}`"
                width="180"
              />
              <el-table-column
                :prop="`equipmentPart.equipmentDetails[${index}].status`"
                :label="`设备${index + 1}状态`"
                width="180"
              />
              <el-table-column
                :prop="`equipmentPart.equipmentDetails[${index}].number`"
                :label="`设备${index + 1}数量`"
                width="180"
              />
              <el-table-column
                :prop="`equipmentPart.equipmentDetails[${index}].price`"
                :label="`设备${index + 1}单价`"
                width="180"
              />
            </template>
            <el-table-column prop="equipmentPart.total" label="设备总价" width="180" />
          </el-table-column>
          <el-table-column label="追溯部分" class-name="columnColor2">
            <template v-for="(item, index) in data.retrospectPart?.equipmentDetails" :key="`retrospectPart-${index}`">
              <el-table-column
                :prop="`retrospectPart.equipmentDetails[${index}].equipmentName`"
                :label="`设备${index + 1}`"
                width="180"
              />
              <el-table-column :prop="`retrospectPart.equipmentDetails[${index}].status`" label="状态" width="180" />
              <el-table-column :prop="`retrospectPart.equipmentDetails[${index}].number`" label="数量" width="180" />
              <el-table-column :prop="`retrospectPart.equipmentDetails[${index}].price`" label="单价" width="180" />
            </template>
            <el-table-column prop="retrospectPart.openGraphSoftware" label="开图软件" width="180" />
            <el-table-column prop="retrospectPart.openGraphSoftware" label="软件" width="180" />
            <el-table-column prop="retrospectPart.openGraphFee" label="开发费(开图)" width="180" />
            <el-table-column prop="retrospectPart.total" label="开发总价" width="180" />
          </el-table-column>
          <el-table-column label="工装治具部分" class-name="columnColor3">
            <template
              v-for="(item, index) in data.toolingFixturePart?.equipmentDetails"
              :key="`toolingFixturePart-${index}`"
            >
              <el-table-column
                :prop="`toolingFixturePart.equipmentDetails[${index}].equipmentName`"
                :label="`治具${index + 1}`"
                width="180"
              />
              <el-table-column
                :prop="`toolingFixturePart.equipmentDetails[${index}].status`"
                label="状态"
                width="180"
              />
              <el-table-column
                :prop="`toolingFixturePart.equipmentDetails[${index}].number`"
                label="数量"
                width="180"
              />
              <el-table-column
                :prop="`toolingFixturePart.equipmentDetails[${index}].price`"
                :label="`治具单价${index + 1}`"
                width="180"
              />
            </template>
            <el-table-column prop="toolingFixturePart.toolingName" label="工装名称" width="180" />
            <el-table-column prop="toolingFixturePart.toolingNum" label="数量" width="180" />
            <el-table-column prop="toolingFixturePart.toolingPrice" label="工装单价" width="180" />
            <el-table-column prop="toolingFixturePart.testName" label="测试线名称" width="180" />
            <el-table-column prop="toolingFixturePart.testNum" label="数量" width="180" />
            <el-table-column prop="toolingFixturePart.testPrice" label="线束单价" width="180" />
            <el-table-column prop="toolingFixturePart.total" label="工装治具总价" width="180" />
          </el-table-column>
          <template
            v-for="(item, index) in data.humanMachineHoursDetailList"
            :key="`humanMachineHoursDetailList-${index}`"
          >
            <el-table-column :label="index === 0 ? 'SOP' : `SOP + ${index + 1}`" class-name="columnColor4">
              <el-table-column
                :prop="`humanMachineHoursDetailList[${index}]laborTime`"
                label="标准人工工时"
                width="180"
              />
              <el-table-column
                :prop="`humanMachineHoursDetailList[${index}]machineHours`"
                label="标准机器工时"
                width="180"
              />
              <el-table-column
                :prop="`humanMachineHoursDetailList[${index}]personnelNumber`"
                label="人员数量"
                width="180"
              />
            </el-table-column>
          </template>
        </el-table>
        <div style="float: right" class="m-2">
          <!-- <el-button type="primary" @click="handleSubmit">提交</el-button> -->
          <el-button type="primary" @click="handleSaveWorkingHour">保存</el-button>
        </div>
      </el-card>
      <el-card style="margin-top: 20px">
        <template #header>
          <el-row align="middle" justify="space-between">
            <span>根线/切线工时</span>
          </el-row>
        </template>
        <el-row align="middle" style="width: 350px; flex-wrap: nowrap"
          >UPH值: <el-input style="width: 180px" class="m-2" v-model="data.uph" type="number" placeholder="请输入UPH值"
        /></el-row>
        <el-table :data="data.tangent">
          <el-table-column label="年份" prop="year" />
          <el-table-column label="人工工时" prop="`laborTime`" width="175">
            <template #default="{ row }">
              <el-input-number v-model="row.laborTime" :min="0" controls-position="right" />
            </template>
          </el-table-column>
          <el-table-column label="标准机器工时" prop="machineHours" width="175">
            <template #default="{ row }">
              <el-input-number v-model="row.machineHours" :min="0" controls-position="right" />
            </template>
          </el-table-column>
          <el-table-column label="人员数量" prop="personnelNumber" width="175">
            <template #default="{ row }">
              <el-input-number v-model="row.personnelNumber" :min="0" controls-position="right" />
            </template>
          </el-table-column>
        </el-table>
        <el-row align="middle" justify="end" m="2">
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button type="primary" @click="handleSaveTangentHours">保存</el-button>
        </el-row>
      </el-card>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted } from "vue"
import { ElMessage, UploadProps } from "element-plus"
// import { ElMessage } from "element-plus"
// import type { TabsPaneContext } from "element-plus"
import {
  downloadWorkingHoursInfo,
  SaveWorkingHour,
  SaveTangentHours,
  getTangentHoursList,
  SubmitWorkingHourAndSwitchLine
} from "./service"
import getQuery from "@/utils/getQuery"
const { auditFlowId = 1, productId = 1 }: any = getQuery

const data = reactive<{
  tableData: any
  retrospectPart: any
  toolingFixturePart: any
  equipmentPart: any
  downloadSetForm: any
  humanMachineHoursDetailList: any[]
  sop: any[]
  tangent: any[]
  uph: number | null
}>({
  tableData: [],
  downloadSetForm: {
    number: 0
  },
  retrospectPart: { equipmentDetails: [] }, // 追溯部分（硬件及软件开发费用）
  toolingFixturePart: { equipmentDetails: [] }, // 工装治具部分
  equipmentPart: { equipmentDetails: [] }, // 设备部分
  humanMachineHoursDetailList: [],
  sop: [],
  tangent: [], // 根线/切线工时
  uph: null
})
// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event)
// }

const formatterArr = (key: string, childKey = "equipmentDetails") => {
  return Math.max.apply(
    null,
    data.tableData.map((item: any) => {
      if (childKey) return item[key].equipmentDetails.length
      else return item[key].length
    })
  )
}

const handleSuccess: UploadProps["onSuccess"] = (res: any) => {
  if (res.success && res.result?.workingHourDetailList.length > 0) {
    data.tableData = res.result?.workingHourDetailList
    console.log(data.tableData, "data.tableData")
    data.retrospectPart = {
      equipmentDetails: new Array(formatterArr("retrospectPart"))
    }
    data.toolingFixturePart = {
      equipmentDetails: new Array(formatterArr("toolingFixturePart"))
    }
    data.equipmentPart = {
      equipmentDetails: new Array(formatterArr("equipmentPart"))
    }
    data.humanMachineHoursDetailList = new Array(formatterArr("humanMachineHoursDetailList", null))
  }
}

const downLoadTemplate = async () => {
  let res: any = await downloadWorkingHoursInfo()
  const blob = res
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = function () {
    let url = URL.createObjectURL(new Blob([blob]))
    let a = document.createElement("a")
    document.body.appendChild(a) //此处增加了将创建的添加到body当中
    a.href = url
    a.download = "模板文件.xlsx"
    a.target = "_blank"
    a.click()
    a.remove() //将a标签移除
  }
  // data.setVisible = false
}

const handleSaveWorkingHour = async () => {
  try {
    let { success }: any = await SaveWorkingHour({
      auditFlowId,
      productId,
      workingHourDetailList: data.tableData
    })
    if (!success) throw Error()
    ElMessage.success("请求成功！")
  } catch {
    ElMessage.error("请求失败")
  }
}

const handleSubmit = async () => {
  await SubmitWorkingHourAndSwitchLine(auditFlowId)
  ElMessage.success("提交成功！")
}

onMounted(async () => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  getAllSop()
})

const getAllSop = async () => {
  // data.tangent = result.map((item: number) => ({ laborTime: 0, machineHours: 0, personnelNumber: 0, year: item }))

  let { result } = await getTangentHoursList(auditFlowId, productId)
  data.tangent = result?.tangentHoursDetailList || []
}

// 保存切线工时
const handleSaveTangentHours = async () => {
  try {
    const { success } = await SaveTangentHours({
      uph: Number(data.uph || 0),
      auditFlowId,
      productId,
      tangentHoursDetailList: data.tangent
    })
    if (!success) throw Error()
    ElMessage.success("请求成功！")
  } catch {
    ElMessage.error("请求失败")
  }
}
</script>

<style lang="scss" scoped>
.electronic-import {
  &__btn-container {
    margin: 20px 0;
    position: relative;
  }
}

.columnColor1 {
  color: red !important;
}
</style>
<style>
.columnColor1 {
  background-color: #409eff !important;
  color: #fff !important;
}
.columnColor2 {
  background-color: #67c23a !important;
  color: #fff !important;
}

.columnColor3 {
  background-color: #e6a23c !important;
  color: #fff !important;
}

.columnColor4 {
  background-color: #909399 !important;
  color: #fff !important;
}
</style>
