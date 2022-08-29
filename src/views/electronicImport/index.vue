<template>
  <div class="electronic-import">
    <div class="electronic-import__btn-container">
      <el-form :inline="true">
        <el-form-item label="">
          <el-upload
            action="/api/services/app/ElectronicBom/UploadExcel"
            :on-success="handleSuccess"
            :show-file-list="false"
          >
            <el-button type="primary">电子料上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="data.setVisible = true">电子料模版下载</el-button>
        </el-form-item>
      </el-form>
    </div>

    <h5>电子料导入</h5>
    <!-- <el-tabs v-model="data.activeIndex" @tab-click="handleClick" type="border-card">
      <el-tab-pane :label="item.name" :name="index" v-for="(item, index) in data.productList" :key="item.id">
        <el-table :data="data.tableDataList[index]" border style="width: 100%">
          <el-table-column prop="categoryName" label="物料大类" width="180" />
          <el-table-column prop="typeName" label="物料种类" width="180" />
          <el-table-column prop="isInvolveItem" label="是否涉及" width="180" />
          <el-table-column prop="sapItemNum" label="物料编号" width="180" />
          <el-table-column prop="sapItemName" label="材料名称" width="180" />
          <el-table-column prop="assemblyQuantity" label="装配数量" width="180" />
          <el-table-column prop="encapsulationSize" label="封装（需要体现PAD的数量）" />
        </el-table>
      </el-tab-pane>
    </el-tabs> -->
    <el-table :data="data.tableData" border style="width: 100%" height="700">
      <el-table-column prop="categoryName" label="物料大类" width="180" />
      <el-table-column prop="typeName" label="物料种类" width="180" />
      <el-table-column prop="isInvolveItem" label="是否涉及" width="180" />
      <el-table-column prop="sapItemNum" label="物料编号" width="180" />
      <el-table-column prop="sapItemName" label="材料名称" width="180" />
      <el-table-column prop="assemblyQuantity" label="装配数量" width="180" />
      <el-table-column prop="encapsulationSize" label="封装（需要体现PAD的数量）" />
    </el-table>
    <div style="float: right; margin-top: 20px">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>

    <el-dialog v-model="data.setVisible">
      <el-form :model="data.downloadSetForm">
        <el-form-item label="板部件数量">
          <el-input v-model="data.downloadSetForm.number" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.setVisible = false">取消</el-button>
          <el-button type="primary" @click="downLoadTemplate">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted } from "vue"
import type { UploadProps } from "element-plus"
import { ElMessage } from "element-plus"
// import type { TabsPaneContext } from "element-plus"
import { SaveElectronicBom, DownloadFile } from "@/api/bom"
import getQuery from "@/utils/getQuery"

let auditFlowId = 1
let productId = 1
const data = reactive({
  activeIndex: 0,
  productList: [],
  tableData: [],
  setVisible: false,
  downloadSetForm: {
    number: 0
  }
})
// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event)
// }

const handleSuccess: UploadProps["onSuccess"] = (res: any) => {
  console.log(res)
  if (res.success) {
    // data.tableDataList[data.activeIndex] = res.result

    if (res.result.isSuccess === false) {
      ElMessage({
        message: res.result.message,
        type: "error"
      })
    } else {
      data.tableData = res.result.electronicBomDtos
    }
  }
}
const downLoadTemplate = async () => {
  let res: any = await DownloadFile(Number(data.downloadSetForm.number))
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
  data.setVisible = false
}
const submit = async () => {
  let res: any = await SaveElectronicBom({
    auditFlowId,
    productId,
    electronicBomDtos: data.tableData
  })
  console.log(res)
}
onMounted(async () => {
  let query = getQuery()
  auditFlowId = Number(query.auditFlowId) || 1
  productId = Number(query.productId) || 1
})
</script>
<style lang="scss" scoped>
.electronic-import {
  &__btn-container {
    margin: 20px 0;
    position: relative;
  }
}
</style>
