<template>
  <div>
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>Nre</span>
        </div>
      </template>
      <el-table :data="data.nre" style="width: 100%" border show-summary>
        <el-table-column type="index" width="50" />
        <el-table-column label="费用名称" width="180" />
        <el-table-column prop="pricingMoney" label="核价金额" width="180" />
        <el-table-column label="报价系数" width="180">
          <template #default="{ row }">
            <el-input v-model="row.offerCoefficient" type="number" :min="0" />
          </template>
        </el-table-column>
        <el-table-column label="报价金额" width="180">
          <template #default="{ row }">
            {{ row.pricingMoney * row.offerCoefficient }}
          </template>
        </el-table-column>
        <el-table-column label="备注" width="180">
          <template #default="{ row }">
            <el-input v-model="row.remark" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>单价表</span>
        </div>
      </template>
      <!-- 表头可固定，可变化数据 -->
      <el-table :data="data.unitPrice" style="width: 100%" border v-if="data.unitPrice.length > 0">
        <el-table-column label="产品" prop="productName" />
        <el-table-column label="单车产品数量" prop="productNumber" />
        <el-table-column
          :label="'测算' + (index + 1) + item.grossMargin"
          v-for="(item, index) in data.unitPrice[0].grossMarginList"
          :key="index"
        >
          <template #default="scope">
            <span>{{ scope.row.grossMarginList[index].grossMarginNumber }} </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>汇总分析表</span>
        </div>
      </template>
      <el-table :data="data.pooledAnalysis" style="width: 100%" border v-if="data.pooledAnalysis.length > 0">
        <el-table-column label="项目名称" prop="projectName" />
        <el-table-column
          :label="'测算' + (index + 1) + item.grossMargin"
          v-for="(item, index) in data.pooledAnalysis[0].grossMarginList"
          :key="index"
        >
          <template #default="scope">
            <span>{{ scope.row.grossMarginList[index].grossMarginNumber }} </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="card">
      <el-table :data="data.productBoard" style="width: 100%" border>
        <el-table-column label="产品" prop="productName" />
        <el-table-column label="单车产品数量" prop="productNumber" />
        <el-table-column label="目标价（内部）">
          <el-table-column label="单价" prop="interiorTargetUnitPrice" />
          <el-table-column label="毛利率" prop="interiorTargetGrossMargin" />
        </el-table-column>
        <!-- <el-table-column label="目标价（内部）" prop="product">
          <el-table-column label="单价" prop="product" />
          <el-table-column label="毛利率" prop="product" />
        </el-table-column> -->
        <el-table-column label="目标价（客户）">
          <el-table-column label="单价" prop="clientTargetUnitPrice" />
          <el-table-column label="毛利率" prop="clientTargetGrossMargin" />
        </el-table-column>
        <el-table-column label="本次报价">
          <el-table-column label="单价">
            <template #default="{ row }">
              <el-input v-model="row.offerUnitPrice" />
            </template>
          </el-table-column>
          <el-table-column label="毛利率">
            <template #default="{ row }">
              <el-input v-model="row.offeGrossMargin" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          :label="'第' + (index + 1) + '轮'"
          v-for="(item, index) in data.productBoard.length > 0 ? data.productBoard[0].oldOffer : []"
          :key="index"
        >
          <el-table-column label="单价">
            <template>
              <div>{{ item.unitPrice }}</div>
            </template>
          </el-table-column>
          <el-table-column label="毛利率">
            <template>
              <div>{{ item.grossMargin }}</div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="card">
      <el-table :data="data.projectBoard" style="width: 100%" border>
        <el-table-column label="项目" prop="projectName" />
        <el-table-column label="目标价（内部）">
          <template #default="scope">
            <div>{{ scope.row.interiorTarge.grossMargin }}</div>
            <div>{{ scope.row.interiorTarge.value }}</div>
          </template>
        </el-table-column>
        <el-table-column label="目标价（客户）">
          <template #default="scope">
            <div>{{ scope.row.clientTarget.grossMargin }}</div>
            <div>{{ scope.row.clientTarget.value }}</div>
          </template>
        </el-table-column>
        <el-table-column label="本次报价">
          <template #default="scope">
            <div>{{ scope.row.offer.grossMargin }}</div>
            <div>{{ scope.row.offer.value }}</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="'第' + (index + 1) + '轮'"
          v-for="(item, index) in data.projectBoard.length > 0 ? data.projectBoard[0].oldOffer : []"
          :key="index"
        >
          <template #default="scope">
            <el-input v-model="scope.row.oldOffer[index].grossMargin" />
            <el-input v-model="scope.row.oldOffer[index].unitPrice">
              <template #append>
                <el-button @click="calculateFullGrossMargin(scope.row, index, scope.row.oldOffer[index].unitPrice)"
                  >计算</el-button
                >
              </template>
            </el-input>
            <!-- <div>{{ scope.row.oldOffer[index].grossMargin }}</div>
            <div>{{ scope.row.oldOffer[index].unitPrice }}</div> -->
          </template>
        </el-table-column>
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
import { getStatementAnalysisBoard, postCalculateFullGrossMargin } from "./service"
import { NreMarketingDepartmentModel } from "./data.type"
import getQuery from "@/utils/getQuery"

// let mouldInventoryData = ref<NreMarketingDepartmentModel[]>([])

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
  tableData: [],
  nre: [] as NreMarketingDepartmentModel[],
  unitPrice: [],
  pooledAnalysis: [],
  productBoard: [],
  projectBoard: [],
  auditFlowId: 0
})
const calculateFullGrossMargin = async (row: any, index: number, unitPrice: number) => {
  let res: any = await postCalculateFullGrossMargin(row, data.auditFlowId, unitPrice)
  row.oldOffer[index].grossMargin = res.result.productBoardGrosses[0].offeGrossMargin
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')

  chart1 = initCharts("unitpriceChart", data1)
  chart2 = initCharts("yearChart", data2)
  let query = getQuery()
  data.auditFlowId = Number(query.auditFlowId)

  let { result } = (await getStatementAnalysisBoard(1)) as any
  let { nre, unitPrice, pooledAnalysis, productBoard, projectBoard } = result
  data.nre = nre
  data.unitPrice = unitPrice
  data.pooledAnalysis = pooledAnalysis
  data.productBoard = productBoard.productBoard // 有疑问
  data.projectBoard = projectBoard
  console.log(result)
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
