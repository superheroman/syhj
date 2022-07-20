<template>
  <div>
    <h5>年降信息</h5>
    <el-table :data="data.bomData" border style="width: 100%" height="500">
      <el-table-column prop="sapItemNum" label="年份" width="180" />
      <el-table-column prop="sapItemName" label="年降率" width="180" />
      <el-table-column prop="typeName" label="累计降幅" width="180" />
      <el-table-column prop="categoryName" label="物料大类" width="180" />
      <el-table-column prop="assemblyQuantity" label="装配数量" width="180" />
      <el-table-column prop="assemblyQuantity" label="单价" width="180" />
      <el-table-column prop="assemblyQuantity" label="币别" width="180" />
      <el-table-column prop="assemblyQuantity" label="汇率" width="180" />
      <el-table-column prop="assemblyQuantity" label="材料单价（人民币）" width="180" />
      <el-table-column prop="assemblyQuantity" label="合计金额（人民币）" width="180" />
      <el-table-column prop="isInvolveItem" label="损耗率" width="180" />
      <el-table-column prop="encapsulationSize" label="损耗" width="180" />
      <el-table-column prop="encapsulationSize" label="材料成本（含损耗）" />
    </el-table>

    <el-table :data="data.bomData" border style="width: 100%" height="500">
      <el-table-column prop="sapItemName" label="项目" width="180" />
      <el-table-column prop="sapItemNum" label="年份" width="180" />
      <el-table-column prop="sapItemName" label="工时" width="180">
        <el-table-column prop="typeName" label="人工工时" width="180" />
        <el-table-column prop="typeName" label="机器工时" width="180" />
        <el-table-column prop="typeName" label="制造工时" width="180" />
      </el-table-column>
      <el-table-column prop="typeName" label="月需求（pcs/m）" width="180" />
      <el-table-column prop="categoryName" label="UPH" width="180" />
      <el-table-column prop="assemblyQuantity" label="月产能" width="180" />
      <el-table-column prop="assemblyQuantity" label="每班月产能" width="180" />
      <el-table-column prop="assemblyQuantity" label="每班日产能" width="180" />
      <el-table-column prop="assemblyQuantity" label="人员工资" width="180">
        <el-table-column prop="assemblyQuantity" label="人员单价" width="180" />
        <el-table-column prop="assemblyQuantity" label="人员数量" width="180" />
        <el-table-column prop="assemblyQuantity" label="班次" width="180" />
        <el-table-column prop="assemblyQuantity" label="直接人工" width="180" />
        <el-table-column prop="assemblyQuantity" label="换线人员" width="180" />
        <el-table-column prop="assemblyQuantity" label="制造辅助" width="180" />
        <el-table-column prop="assemblyQuantity" label="工资合计" width="180" />
      </el-table-column>
      <el-table-column prop="assemblyQuantity" label="设备折旧" width="180">
        <el-table-column prop="assemblyQuantity" label="设备金额" width="180" />
        <el-table-column prop="assemblyQuantity" label="NRE已报价" width="180" />
        <el-table-column prop="assemblyQuantity" label="扣除NRE报价设备金额" width="180" />
        <el-table-column prop="assemblyQuantity" label="产线数量" width="180" />
        <el-table-column prop="assemblyQuantity" label="产线设备月折扣" width="180" />
        <el-table-column prop="assemblyQuantity" label="产能利用率" width="180" />
        <el-table-column prop="assemblyQuantity" label="分摊后折旧" width="180" />
        <el-table-column prop="assemblyQuantity" label="助设备月折" width="180" />
        <el-table-column prop="assemblyQuantity" label="月折旧汇总" width="180" />
        <el-table-column prop="assemblyQuantity" label="制造费用（直接）" width="180" />
        <el-table-column prop="assemblyQuantity" label="制造费用（间接）" width="180" />
      </el-table-column>
      <el-table-column prop="assemblyQuantity" label="直接制造成本" width="180">
        <el-table-column prop="assemblyQuantity" label="直接人工" width="180" />
        <el-table-column prop="assemblyQuantity" label="设备折旧" width="180" />
        <el-table-column prop="assemblyQuantity" label="换线成本" width="180" />
        <el-table-column prop="assemblyQuantity" label="制造费用" width="180" />
        <el-table-column prop="assemblyQuantity" label="小计" width="180" />
      </el-table-column>
      <el-table-column prop="assemblyQuantity" label="间接制造成本" width="180">
        <el-table-column prop="assemblyQuantity" label="直接人工" width="180" />
        <el-table-column prop="assemblyQuantity" label="设备折旧" width="180" />
        <el-table-column prop="assemblyQuantity" label="制造费用" width="180" />
        <el-table-column prop="assemblyQuantity" label="小计" width="180" />
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
/**
 * 仓库
 */
/**
 * 路由对象
 */
const route = useRoute()
/**
 * 路由实例
 */
const router = useRouter()
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({
  bomData: []
})
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
<style scoped lang="sass"></style>
