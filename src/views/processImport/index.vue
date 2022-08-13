<template>
  <div class="electronic-import">
    <div class="electronic-import__btn-container">
      <el-form :inline="true">
        <el-form-item label="">
          <el-upload
            action="api/services/app/WorkingHours/UploadExcel"
            :on-success="handleSuccess"
            :show-file-list="false"
          >
            <el-button type="primary">工序工时上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="downLoadTemplate">工序工时模版下载</el-button>
        </el-form-item>
      </el-form>
    </div>

    <h5>工序工时导入</h5>
    <el-table :data="data.tableData" border style="width: 100%" height="700">
      <el-table-column label="设备部分" class-name="columnColor1">
        <template v-for="(item, index) in data.equipmentPart?.equipmentDetails" :key="item.equipmentName">
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
        <template v-for="(item, index) in data.retrospectPart?.equipmentDetails" :key="item.equipmentName">
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
        <template v-for="(item, index) in data.toolingFixturePart?.equipmentDetails" :key="item.equipmentName">
          <el-table-column
            :prop="`toolingFixturePart.equipmentDetails[${index}].equipmentName`"
            :label="`治具${index + 1}`"
            width="180"
          />
          <el-table-column :prop="`toolingFixturePart.equipmentDetails[${index}].status`" label="状态" width="180" />
          <el-table-column :prop="`toolingFixturePart.equipmentDetails[${index}].number`" label="数量" width="180" />
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
      <template v-for="(item, index) in data.humanMachineHoursDetailList" :key="item.equipmentName">
        <el-table-column :label="index === 0 ? 'SOP' : `SOP + ${index + 1}`" class-name="columnColor4">
          <el-table-column :prop="`humanMachineHoursDetailList[${index}]laborTime`" label="标准人工工时" width="180" />
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
    <div style="float: right; margin-top: 20px">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue"
import type { UploadProps } from "element-plus"
// import { ElMessage } from "element-plus"
// import type { TabsPaneContext } from "element-plus"
import unionBy from "lodash/unionBy"
import { downloadWorkingHoursInfo } from "./service"
const data = reactive<{
  tableData: any
  retrospectPart: any
  toolingFixturePart: any
  equipmentPart: any
  downloadSetForm: any
  humanMachineHoursDetailList: any[]
}>({
  tableData: [],
  downloadSetForm: {
    number: 0
  },
  retrospectPart: { equipmentDetails: [] }, // 追溯部分（硬件及软件开发费用）
  toolingFixturePart: { equipmentDetails: [] }, // 工装治具部分
  equipmentPart: { equipmentDetails: [] }, // 设备部分
  humanMachineHoursDetailList: []
})
// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event)
// }

const formatterArr = (key: string) => {
  return unionBy(
    data.tableData.map((item: any) => item[key].equipmentDetails.map((child) => child)).flat(),
    "equipmentName"
  )
}

const handleSuccess: UploadProps["onSuccess"] = (res: any) => {
  console.log(res)
  if (res.success) {
    data.tableData = res.result.workingHourDetailList
    data.retrospectPart = {
      equipmentDetails: formatterArr("retrospectPart")
    }
    data.toolingFixturePart = {
      equipmentDetails: formatterArr("toolingFixturePart")
    }
    data.equipmentPart = {
      equipmentDetails: formatterArr("equipmentPart")
    }
    data.humanMachineHoursDetailList = data.tableData.map((item) => item.humanMachineHoursDetailList).flat()
    console.log(data.humanMachineHoursDetailList, "data.retrospectPart")
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
const submit = async () => {
  // let res: any = await SaveElectronicBom({
  //   auditFlowId: "1",
  //   partNumber: "测试零件",
  //   electronicBomDtos: data.tableData
  // })
  // console.log(res)
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
