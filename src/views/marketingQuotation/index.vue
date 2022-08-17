<template>
  <el-card class="marketingQuotation-page" header="报价审核">
    <el-descriptions :column="2" border>
      <el-descriptions-item label="直接客户名称"> kooriookami </el-descriptions-item>
      <el-descriptions-item label="项目生命周期"> kooriookami </el-descriptions-item>
      <el-descriptions-item label="销售类型"> kooriookami </el-descriptions-item>
      <el-descriptions-item label="贸易方式"> kooriookami </el-descriptions-item>
      <el-descriptions-item label="付款方式"> kooriookami </el-descriptions-item>
      <el-descriptions-item label="汇率"> kooriookami </el-descriptions-item>
    </el-descriptions>
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
    <el-card header="核心部件：" class="card-margin">
      <div>
        产品名称：
        <el-input class="m-2" v-model="data.product" placeholder="请输入产品名称" style="width: 200px" />
      </div>
      <el-table :data="data.strategyData" style="width: 100%" border>
        <!-- <el-table-column type="index" width="100" /> -->
        <el-table-column label="核心部件" prop="name" />
        <el-table-column label="型号" prop="name" />
        <el-table-column label="单价" prop="name" />
        <el-table-column label="备注" prop="name" />
      </el-table>
    </el-card>
    <el-card header="NRE费用：" class="card-margin">
      <el-card header="SM 三目" class="m-2">
        <el-table :data="data.nreTableData" style="width: 100%" border>
          <el-table-column type="index" width="100" />
          <el-table-column label="费用类别" prop="name" />
          <el-table-column label="成本" prop="name" />
        </el-table>
      </el-card>
      <el-card header="SM 后向70" class="m-2">
        <el-table :data="data.nreTableData" style="width: 100%" border>
          <el-table-column type="index" width="100" />
          <el-table-column label="费用类别" prop="name" />
          <el-table-column label="成本" prop="name" />
        </el-table>
      </el-card>
      <el-card header="内核报价信息：" class="m-2">
        <el-table :data="data.nreTableData" style="width: 100%" border>
          <el-table-column type="index" width="100" />
          <el-table-column label="走量" prop="name" />
          <el-table-column label="核价信息" prop="name" />
        </el-table>
      </el-card>
    </el-card>
    <el-card header="成本单价信息：" class="card-margin">
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
      <el-table :data="data.strategyData" style="width: 100%" border>
        <el-table-column type="index" width="100" />
        <el-table-column label="费用类别" prop="name" />
        <el-table-column label="成本" prop="name" />
        <el-table-column label="报价系数" prop="name" />
        <el-table-column label="报价策略" prop="name" />
      </el-table>
    </el-card>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
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
  strategyData: [],
  product: ""
})

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  initFetch()
})

const initFetch = async () => {}

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
