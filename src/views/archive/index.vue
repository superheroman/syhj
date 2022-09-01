<template>
  <div>
    <el-card header="归档">
      <el-table :data="data.tableData" height="75vh">
        <el-table-column label="序号" />
        <el-table-column label="表明名" />
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"

//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({
  tableData: []
})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {})
</script>
<style scoped lang="scss"></style>
