<template>
  <div>
    <el-table :data="data.bomData" border style="width: 100%; margin: 20px 0" height="500">
      <el-table-column prop="sapItemNum" label="年份" width="180" />
      <el-table-column label="直接制造成本" width="180">
        <el-table-column label="直接人工" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="设备折旧" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="换线成本" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="制造费用" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="小计" width="180" prop="cost" />
      </el-table-column>
      <el-table-column label="间接制造成本" width="180">
        <el-table-column label="直接人工" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="设备折旧" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="制造费用" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="小计" width="180" prop="cost" />
      </el-table-column>
      <el-table-column label="合计" width="180" prop="cost" />
    </el-table>

    <el-table :data="data.bomData" border style="width: 100%" height="500">
      <el-table-column prop="sapItemNum" label="年份" width="180" />
      <el-table-column label="直接制造成本" width="180">
        <el-table-column label="直接人工" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="设备折旧" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="换线成本" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="制造费用" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="小计" width="180" prop="cost" />
      </el-table-column>
      <el-table-column label="间接制造成本" width="180">
        <el-table-column label="直接人工" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="设备折旧" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="制造费用" width="180">
          <template #default="{ row }">
            <el-input v-model="row.cable" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="小计" width="180" prop="cost" />
      </el-table-column>
      <el-table-column label="合计" width="180" prop="cost" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
// import { useRoute, useRouter } from "vue-router"
/**
 * 仓库
 */
/**
 * 路由对象
 */
// const route = useRoute()
/**
 * 路由实例
 */
// const router = useRouter()
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
