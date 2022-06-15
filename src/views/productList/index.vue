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
interface User {
  date: string
  name: string
  address: string
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
