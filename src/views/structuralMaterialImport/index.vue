<template>
  <div class="electronic-import">
    <div class="electronic-import__btn-container">
      <el-form :inline="true">
        <el-form-item label="">
          <el-upload
            action="http://139.196.216.165:44311/api/services/app/StructionBom/LoadExcel"
            :on-success="handleSuccess"
            :show-file-list="false"
          >
            <el-button type="primary">结构料上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="downLoadTemplate">模板文件下载</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-upload
            action="http://139.196.216.165:44311/api/services/app/FileCommonService/UploadFile"
            :on-success="handleSuccess3D"
            :show-file-list="false"
          >
            <el-button type="primary">3D爆炸图</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <h5>结构料导入</h5>
    <el-table :data="data.tableData" border style="width: 100%" height="700">
      <el-table-column prop="categoryName" label="物料大类" width="180" />
      <el-table-column prop="typeName" label="物料种类" width="180" />
      <el-table-column prop="isInvolveItem" label="是否涉及" width="180" />
      <el-table-column prop="sapItemNum" label="物料编号" width="180" />
      <el-table-column prop="sapItemName" label="材料名称" width="180" />
      <el-table-column prop="assemblyQuantity" label="装配数量" width="180" />
      <el-table-column prop="encapsulationSize" label="封装（需要体现PAD的数量）" />
    </el-table>

    <el-form :model="data.logisticsForm" inline>
      <h5>物流基础信息</h5>
      <h6>外包装体积</h6>
      <el-form-item label="外包装长">
        <el-input v-model="data.logisticsForm.outerPackagingLength" />
      </el-form-item>
      <el-form-item label="外包装宽">
        <el-input v-model="data.logisticsForm.outerPackagingWidth" />
      </el-form-item>
      <el-form-item label="外包装高">
        <el-input v-model="data.logisticsForm.outerPackagingHeight" />
      </el-form-item>
      <h6>重量</h6>
      <el-form-item label="外包装长">
        <el-input v-model="data.logisticsForm.outerPackagingLength" />
      </el-form-item>
      <el-form-item label="外包装宽">
        <el-input v-model="data.logisticsForm.outerPackagingWidth" />
      </el-form-item>
      <h5>包装基础信息</h5>
      <h6>内包装体积</h6>
      <el-form-item label="内包装长">
        <el-input v-model="data.logisticsForm.innerPackagingLength" />
      </el-form-item>
      <el-form-item label="内包装宽">
        <el-input v-model="data.logisticsForm.innerPackagingWidth" />
      </el-form-item>
      <el-form-item label="内包装高">
        <el-input v-model="data.logisticsForm.innerPackagingHeight" />
      </el-form-item>
      <el-form-item label="是否打托">
        <el-select v-model="data.logisticsForm.isHit" placeholder="Select">
          <el-option label="是" value="1" />
          <el-option label="否" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="每托盘箱数">
        <el-input v-model="data.logisticsForm.boxesPerPallet" />
      </el-form-item>
      <el-form-item label="单箱包装数量">
        <el-input v-model="data.logisticsForm.quantityPerBox" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="data.logisticsForm.remarks" type="textarea" />
      </el-form-item>
    </el-form>
    <div style="float: right; margin-top: 20px">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue"
import type { UploadProps } from "element-plus"
import { SaveStructionBom, CommonDownloadFile, SaveBOM } from "@/api/bom"
const data = reactive({
  tableDataList: [
    [
      {
        categoryName: "1",
        typeName: "12",
        isInvolveItem: "是",
        sapItemNum: "123",
        sapItemName: "321",
        assemblyQuantity: "12312",
        encapsulationSize: "123123"
      }
    ]
  ],
  tableData: [],
  setVisible: false,
  logisticsForm: {
    outerPackagingLength: "",
    outerPackagingWidth: "",
    outerPackagingHeight: "",
    singleProductWeight: "",
    singleBoxQuantity: "",
    innerPackagingLength: "",
    innerPackagingWidth: "",
    innerPackagingHeight: "",
    isHit: "",
    boxesPerPallet: "",
    quantityPerBox: "",
    remarks: ""
  }
})

const handleSuccess: UploadProps["onSuccess"] = (res: any) => {
  console.log(res)
  if (res.success) {
    // data.tableDataList[data.activeIndex] = res.result
    data.tableData = res.result
  }
}
const handleSuccess3D: UploadProps["onSuccess"] = (res: any) => {
  console.log(res)
  if (res.success) {
    // data.tableDataList[data.activeIndex] = res.result
    // console.log()
  }
}

const downLoadTemplate = async () => {
  let res: any = await CommonDownloadFile(1)
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
}
const submit = async () => {
  let params: SaveBOM = Object.assign(
    { processNumber: "1", partNumber: "测试零件", structureBomDtos: data.tableData },
    data.logisticsForm
  )
  let res: any = await SaveStructionBom(params)
  console.log(res)
}
</script>
<style lang="scss" scoped>
.electronic-import {
  &__btn-container {
    margin: 20px 0;
    position: relative;
  }
}
</style>
