<template>
  <div class="electronic-import">
    <el-form :inline="true">
      <el-form-item label="">
        <el-upload
          action="/api/services/app/ElectronicBom/UploadExcel"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <el-button type="primary">电子料上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="downLoadTemplate">模板文件下载</el-button>
      </el-form-item>
    </el-form>

    <h5>电子料导入</h5>
    <el-tabs v-model="data.activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane :label="item.name" :name="item.id" v-for="(item, index) in data.productList" :key="item.id">
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
      <el-tab-pane label="零件2" name="second">Config</el-tab-pane>
      <el-tab-pane label="零件3" name="third">Role</el-tab-pane>
      <el-tab-pane label="零件4" name="fourth">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue"
import type { UploadProps } from "element-plus"
import type { TabsPaneContext } from "element-plus"

const data = reactive({
  activeName: 1,
  productList: [
    {
      name: "零件1",
      id: 1
    }
  ],
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
  ]
})
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile)
}

const handleSuccess: UploadProps["onSuccess"] = (res: any) => {
  console.log(res)
}
const downLoadTemplate = () => {
  window.open("https:www.baidu.com")
}
</script>
