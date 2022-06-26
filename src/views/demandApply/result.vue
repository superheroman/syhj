<template>
  <div>
    <h5>报价形式：</h5>
    <el-descriptions :column="2" border>
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
    <h5>开发计划：</h5>
    <el-descriptions :column="2" border>
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
    <h5>项目名称：1223</h5>
    <h5>核心部件：</h5>
    <!-- 核心部件先空着 -->
    <h5>NRE费用：</h5>
    <el-table :data="sopTableData" style="width: 100%" border>
      <el-table-column type="index" width="100" />
      <el-table-column label="费用类别" prop="name" />
      <el-table-column label="样品阶段" prop="name" />
      <el-table-column label="MP阶段100K" prop="name" />
      <el-table-column label="" prop="name" />
      <!-- <el-table-column label="一次性折让率" prop="name" /> -->
    </el-table>
    <h5>内部核价信息：</h5>
    <el-table :data="sopTableData" style="width: 100%" border>
      <el-table-column type="index" width="100" />
      <el-table-column label="费用类别" prop="name" />
      <el-table-column label="样品阶段" prop="name" />
      <el-table-column label="MP阶段100K" prop="name" />
      <el-table-column label="" prop="name" />
    </el-table>
    <h5>报价策略：</h5>
    <el-table :data="sopTableData" style="width: 100%" border>
      <el-table-column type="index" width="100" />
      <el-table-column label="走量" prop="name" />
      <el-table-column label="成本" prop="name" />
      <el-table-column label="毛利率" prop="name" />
      <el-table-column label="样件价格" prop="name" />
    </el-table>
    <el-table :data="sopTableData" style="width: 100%" border>
      <el-table-column type="费用" width="100" />
      <el-table-column label="MP阶段100K" prop="name" />
      <el-table-column label="系数" prop="name" />
      <el-table-column label="报价策略" prop="name" />
      <!-- <el-table-column label="样件价格" prop="name" /> -->
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
// import { useRoute, useRouter } from "vue-router"
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
// const route = useRoute()
// /**
//  * 路由实例
//  */
// const router = useRouter()
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
