<template>
  <el-card class="demandApply-result-page" header="报价形式：">
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
    <el-card header="开发计划：" class="card-margin">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="sop时间"> kooriookami </el-descriptions-item>
        <el-descriptions-item label="项目生命周期"> kooriookami </el-descriptions-item>
        <el-descriptions-item label="销售类型"> kooriookami </el-descriptions-item>
        <el-descriptions-item label="贸易方式"> kooriookami </el-descriptions-item>
        <el-descriptions-item label="付款方式"> kooriookami </el-descriptions-item>
        <el-descriptions-item label="报价币种"> kooriookami </el-descriptions-item>
        <el-descriptions-item label="汇率"> kooriookami </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card header="sop5年内走量信息" class="card-margin">
      <el-table :data="data.sopTableData" style="width: 100%" border>
        <el-table-column type="index" width="100" />
        <el-table-column label="年份" prop="name" />
        <el-table-column label="走量" prop="name" />
        <el-table-column label="年降率" prop="name" />
        <el-table-column label="年度返利要求" prop="name" />
        <el-table-column label="一次性折让率" prop="name" />
      </el-table>
    </el-card>
    <!-- <h5>项目名称：1223</h5> -->
    <!-- <h5>核心部件：</h5> -->
    <!-- 核心部件先空着 -->
    <el-card header="NRE费用：" class="card-margin">
      <el-table :data="data.nreTableData" style="width: 100%" border>
        <el-table-column type="index" width="100" />
        <el-table-column label="费用类别" prop="name" />
        <el-table-column label="样品阶段" prop="name" />
        <el-table-column label="MP阶段100K" prop="name" />
        <el-table-column label="" prop="name" />
        <!-- <el-table-column label="一次性折让率" prop="name" /> -->
      </el-table>
    </el-card>
    <el-card header="内部核价信息：" class="card-margin">
      <el-table :data="data.internalPricingData" style="width: 100%" border>
        <el-table-column type="index" width="100" />
        <el-table-column label="费用类别" prop="name" />
        <el-table-column label="样品阶段" prop="name" />
        <el-table-column label="MP阶段100K" prop="name" />
        <el-table-column label="" prop="name" />
      </el-table>
    </el-card>
    <el-card header="报价策略：" class="card-margin">
      <el-table :data="data.strategyData" style="width: 100%" border>
        <el-table-column type="index" width="100" />
        <el-table-column label="走量" prop="name" />
        <el-table-column label="成本" prop="name" />
        <el-table-column label="毛利率" prop="name" />
        <el-table-column label="样件价格" prop="name" />
      </el-table>
    </el-card>
    <el-card class="card-margin">
      <el-table :data="data.sopTableData" style="width: 100%" border>
        <el-table-column type="费用" width="100" />
        <el-table-column label="MP阶段100K" prop="name" />
        <el-table-column label="系数" prop="name" />
        <el-table-column label="报价策略" prop="name" />
        <!-- <el-table-column label="样件价格" prop="name" /> -->
      </el-table>
    </el-card>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { getPriceEvaluationTable } from "./service"
// import { useRoute, useRouter } from "vue-router"

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
const data = reactive({
  sopTableData: [],
  nreTableData: [],
  internalPricingData: [],
  strategyData: []
})

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  initFetch()
})

const initFetch = async () => {
  const res = await getPriceEvaluationTable({})
  console.log(res, "res")
}

watchEffect(() => {})
</script>
<style scoped lang="scss">
.demandApply-result-page {
  margin: 10px;
}
.card-margin {
  margin-top: 10px;
}
</style>
