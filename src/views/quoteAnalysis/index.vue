<template>
  <div>
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>单价表</span>
        </div>
      </template>
      <el-table :data="data.tableData" style="width: 100%" border>
        <el-table-column label="产品" prop="year" />
        <el-table-column label="单车产品数量" prop="product" />
        <el-table-column label="测算1" prop="product" />
      </el-table>
    </el-card>
    <el-card class="card">
      <el-table :data="data.tableData" style="width: 100%" border>
        <el-table-column label="产品" prop="year" />
        <el-table-column label="单车产品数量" prop="product" />
        <el-table-column label="目标价（内部）" prop="product">
          <el-table-column label="单价" prop="product" />
          <el-table-column label="毛利率" prop="product" />
        </el-table-column>
        <el-table-column label="目标价（内部）" prop="product">
          <el-table-column label="单价" prop="product" />
          <el-table-column label="毛利率" prop="product" />
        </el-table-column>
        <el-table-column label="目标价（客户）" prop="product">
          <el-table-column label="单价" prop="product" />
          <el-table-column label="毛利率" prop="product" />
        </el-table-column>
        <el-table-column label="本次报价" prop="product">
          <el-table-column label="单价" prop="product">
            <template #default="{ row }">
              <el-input v-model="row.bomLoss" />
            </template>
          </el-table-column>
          <el-table-column label="毛利率" prop="product">
            <template #default="{ row }">
              <el-input v-model="row.bomLoss" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="测算1" prop="product">
          <el-table-column label="测算1" prop="product" />
        </el-table-column>
        <el-table-column label="第一轮报价" prop="product">
          <el-table-column label="单价" prop="product" />
          <el-table-column label="毛利率" prop="product" />
        </el-table-column>
        <el-table-column label="第n轮报价" prop="product">
          <el-table-column label="单价" prop="product" />
          <el-table-column label="毛利率" prop="product" />
        </el-table-column>
        <el-table-column label="价格敏感度" prop="product" />
      </el-table>
    </el-card>
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>汇总分析表</span>
        </div>
      </template>
      <el-table :data="data.tableData" style="width: 100%" border>
        <el-table-column label="项目" prop="year" />
        <el-table-column label="测算1" prop="product" />
      </el-table>
    </el-card>
    <el-card class="card">
      <el-table :data="data.tableData" style="width: 100%" border>
        <el-table-column label="项目" prop="year" />
        <el-table-column label="目标价（内部）" prop="product" />
        <el-table-column label="目标价（客户）" prop="product" />
        <el-table-column label="本次报价" prop="product" />
        <el-table-column label="第一轮" prop="product" />
        <el-table-column label="第n轮" prop="product" />
      </el-table>
    </el-card>
    <div id="unitpriceChart" />
    <div id="yearChart" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect, onBeforeUnmount } from "vue"
// import { useRoute, useRouter } from "vue-router"
import * as echarts from "echarts"

/**
 * 路由对象
 */
// const route = useRoute()
/**
 * 路由实例
 */
// const router = useRouter()
//console.log('1-开始创建组件-setup')

let data1 = {
  title: {
    text: "项目单价对比"
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // Use axis to trigger tooltip
      type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {},
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      name: "Direct",
      type: "bar",
      stack: "total",
      label: {
        show: true
      },
      emphasis: {
        focus: "series"
      },
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: "Mail Ad",
      type: "bar",
      stack: "total",
      label: {
        show: true
      },
      emphasis: {
        focus: "series"
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: "Affiliate Ad",
      type: "bar",
      stack: "total",
      label: {
        show: true
      },
      emphasis: {
        focus: "series"
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: "Video Ad",
      type: "bar",
      stack: "total",
      label: {
        show: true
      },
      emphasis: {
        focus: "series"
      },
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: "Search Engine",
      type: "bar",
      stack: "total",
      label: {
        show: true
      },
      emphasis: {
        focus: "series"
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ]
}
let data2 = {
  title: {
    text: "收入和毛利率对比"
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar"
    }
  ]
}

let chart1: any = null
let chart2: any = null
const initCharts = (id: string, chartOption: any) => {
  // 基于准备好的dom，初始化echarts实例
  let chartEl: HTMLElement | null = document.getElementById(id)
  if (chartEl) {
    var chart = echarts.init(chartEl)
    // 绘制图表
    chart.setOption(chartOption)
    return chart
  }
}
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
  chart1 = initCharts("unitpriceChart", data1)
  chart2 = initCharts("yearChart", data2)
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
onBeforeUnmount(() => {
  console.log("destory")
  chart1.dispose()
  chart2.dispose()
})
watchEffect(() => {})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})
</script>
<style scoped lang="scss">
.card {
  margin: 10px;
}
#unitpriceChart {
  height: 400px;
}
#yearChart {
  height: 400px;
}
</style>
