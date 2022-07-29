<template>
  <div class="bom-loss">
    <h5>bom损耗率表单</h5>
    <el-table :data="data.bomLossData" border style="width: 100%" height="500">
      <el-table-column prop="categoryName" label="物料大类" width="180" />
      <el-table-column :label="year + ''" v-for="(year, index) in data.years" :key="year">
        <template #default="{ row }">
          <el-input v-model="row.yearList[index].bomLoss" />
        </template>
      </el-table-column>
    </el-table>
    <div style="float: right; margin-top: 20px">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
/**
 * 路由对象
 */
/**
 * 路由实例
 */
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({
  bomLossData: [],
  years: [2022, 2023]
})

const submit = () => {}
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
