<template>
  <div>
    <el-table :data="tableData" style="width: 100%; margin-top: 50px" border>
      <el-table-column label="零件名称" prop="name" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-link type="primary" :href="row.id">点击进入</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
import getQuery from "@/utils/getQuery"
import { getProductByAuditFlowId } from "./service"
interface Product {
  date: string
  name: string
}
const tableData: Product[] = [
  {
    date: "2022",
    name: "Tom"
  },
  {
    date: "2023",
    name: "Tom"
  },
  {
    date: "2024",
    name: "Tom"
  },
  {
    date: "2025",
    name: "Tom"
  },
  {
    date: "2026",
    name: "Tom"
  },
  {
    date: "2027",
    name: "Tom"
  }
]
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({})
onBeforeMount(() => {})
onMounted(async () => {
  let { auditFlowId } = getQuery()
  let res: any = getProductByAuditFlowId(Number(auditFlowId))
  console.log(res)
})
watchEffect(() => {})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})
</script>
<style scoped lang="scss"></style>
