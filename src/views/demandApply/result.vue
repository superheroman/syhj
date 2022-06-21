<template>
  <div>
    <el-descriptions title="With border" :column="2" border>
      <el-descriptions-item label="直接客户名称"> kooriookami </el-descriptions-item>
      <el-descriptions-item label="客户性质"> kooriookami </el-descriptions-item>
      <el-descriptions-item label="终端客户名称"> kooriookami </el-descriptions-item>
      <el-descriptions-item label="终端客户性质"> kooriookami </el-descriptions-item>
      <!-- <el-descriptions-item>
        <template #label>
          <div class="cell-item">Telephone</div>
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item label="123"> kooriookami </el-descriptions-item> -->
    </el-descriptions>
    <el-descriptions title="With border" :column="2" border>
      <el-descriptions-item label="sop时间"> kooriookami </el-descriptions-item>
      <el-descriptions-item label="项目生命周期"> kooriookami </el-descriptions-item>
      <el-descriptions-item label="销售类型"> kooriookami </el-descriptions-item>
      <el-descriptions-item label="贸易方式"> kooriookami </el-descriptions-item>
      <el-descriptions-item label="付款方式"> kooriookami </el-descriptions-item>
      <el-descriptions-item label="报价币种"> kooriookami </el-descriptions-item>
      <el-descriptions-item label="汇率"> kooriookami </el-descriptions-item>
    </el-descriptions>
    <h5>sop5年内走量信息</h5>
    <el-table :data="sopTableData" style="width: 100%" border>
      <el-table-column type="index" width="100" />
      <el-table-column label="年份" prop="name" />
      <el-table-column label="走量" prop="name" />
      <el-table-column label="年降率" prop="name" />
      <el-table-column label="年度返利要求" prop="name" />
      <el-table-column label="一次性折让率" prop="name" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
interface sopData {
  name: string
}
let sopTableData: sopData[] = [
  {
    name: "123"
  }
]
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
<style scoped lang="sass"></style>
