<template>
  <div class="fn-department">
    <h6>质量成本比例录入</h6>
    <el-table :data="tableData" style="width: 100%; margin-top: 25px" border>
      <el-table-column label="环境感知">
        <el-table-column prop="state" label="首款产品">
          <template #default="{ row }">
            <el-input v-model="row.val" />
          </template>
        </el-table-column>
        <el-table-column prop="city" label="非首款产品">
          <template #default="{ row }">
            <el-input v-model="row.val" />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="外摄显像">
        <el-table-column prop="state" label="首款产品">
          <template #default="{ row }">
            <el-input v-model="row.val" />
          </template>
        </el-table-column>
        <el-table-column prop="city" label="非首款产品">
          <template #default="{ row }">
            <el-input v-model="row.val" />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="舱内检测">
        <el-table-column prop="state" label="首款产品">
          <template #default="{ row }">
            <el-input v-model="row.val" />
          </template>
        </el-table-column>
        <el-table-column prop="city" label="非首款产品">
          <template #default="{ row }">
            <el-input v-model="row.val" />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="sop" prop="date" />
    </el-table>
    <h6>汇率录入</h6>
    <el-table :data="tableData" style="width: 100%; margin-top: 25px" border>
      <el-table-column label="美元">
        <template #default="{ row }">
          <el-input v-model="row.val" />
        </template>
      </el-table-column>
      <el-table-column label="欧元">
        <template #default="{ row }">
          <el-input v-model="row.val" />
        </template>
      </el-table-column>
      <el-table-column label="sop" prop="date" />
    </el-table>
    <h6>单价库录入</h6>
    <el-table :data="tableData" style="width: 100%; margin-top: 25px" border>
      <el-table-column :label="col.name" :prop="col.key" v-for="col in unitCols" :key="col.key" width="150" />
    </el-table>
    <div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        multiple
        :limit="1"
      >
        <el-button type="primary">文件上传</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
import type { UploadProps } from "element-plus"

import unitCols from "@/constant/column"
interface User {
  date: string
  name: string
  address: string
}
const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile)
}
const tableData: User[] = [
  {
    date: "2022",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2023",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2024",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2025",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2026",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2027",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
]
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})
</script>
<style scoped lang="scss"></style>
