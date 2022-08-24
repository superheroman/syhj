<template>
  <div>
    <div>
      <el-button type="primary" @click="downLoad" style="margin-left: 10px">成本信息表下载</el-button>
      <el-button-group style="margin-right: 10px; float: right">
        <el-button type="primary" @click="postOffer(1)">报价</el-button>
        <el-button type="primary" @click="postOffer(0)">不报价</el-button>
      </el-button-group>
    </div>
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>Nre</span>
        </div>
      </template>
      <el-table :data="data.nre" style="width: 100%" border show-summary>
        <el-table-column type="index" width="50" />
        <el-table-column label="费用名称" width="180" prop="formName" />
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
        <el-table-column label="备注">
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
        <el-table-column label="产品" prop="productName" width="150" />
        <el-table-column label="单车产品数量" prop="productNumber" width="150" />
        <el-table-column
          :label="'测算' + (index + 1) + item.grossMargin"
          v-for="(item, index) in data.unitPrice[0].grossMarginList"
          :key="index"
          width="150"
        >
          <template #default="scope">
            <span>{{ scope.row.grossMarginList[index]?.grossMarginNumber.toFixed(2) }} </span>
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
        <el-table-column label="项目名称" prop="projectName" width="150" />
        <el-table-column
          :label="'测算' + (index + 1) + item.grossMargin"
          v-for="(item, index) in data.pooledAnalysis[0]?.grossMarginList"
          :key="index"
          width="150"
        >
          <template #default="scope">
            <span>{{ scope.row.grossMarginList[index]?.grossMarginNumber.toFixed(2) }} </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="card">
      <el-table :data="data.productBoard" style="width: 100%" border>
        <el-table-column label="产品" prop="productName" />
        <el-table-column label="单车产品数量" prop="productNumber" />
        <el-table-column label="目标价（内部）">
          <el-table-column label="单价" prop="interiorTargetUnitPrice">
            <template #default="{ row }">
              {{ row.interiorTargetUnitPrice.toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column label="毛利率" prop="interiorTargetGrossMargin">
            <template #default="{ row }">
              {{ row.interiorTargetGrossMargin.toFixed(2) }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="目标价（客户）">
          <el-table-column label="单价" prop="clientTargetUnitPrice" />
          <el-table-column label="毛利率" prop="clientTargetGrossMargin" />
        </el-table-column>
        <el-table-column label="本次报价">
          <el-table-column label="单价">
            <template #default="scope">
              <el-input v-model="scope.row.offerUnitPrice">
                <template #append>
                  <el-button @click="calculateFullGrossMargin(scope.row, scope.$index, scope.row.offerUnitPrice)"
                    >计算</el-button
                  >
                </template>
              </el-input>
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
          width="150"
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
      <el-descriptions title="" border>
        <el-descriptions-item label="目标价(内部)整套毛利率">{{
          Number(data.allClientGrossMargin).toFixed(2)
        }}</el-descriptions-item>
        <el-descriptions-item label="目标价(客户)整套毛利率">{{
          Number(data.allInteriorGrossMargin).toFixed(2)
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="card">
      <el-table :data="data.projectBoard" style="width: 100%" border>
        <el-table-column label="项目" prop="projectName" width="150" />
        <el-table-column label="目标价（内部）" width="150">
          <template #default="scope">
            <div>{{ scope.row.interiorTarget?.grossMargin.toFixed(2) }}</div>
            <div>{{ scope.row.interiorTarget?.grossMarginNumber.toFixed(2) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="目标价（客户）" width="150">
          <template #default="scope">
            <div>{{ scope.row.clientTarget?.grossMargin.toFixed(2) }}</div>
            <div>{{ scope.row.clientTarget?.grossMarginNumber.toFixed(2) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="本次报价">
          <template #default="scope">
            <div>{{ scope.row.offer?.grossMargin.toFixed(2) }}</div>
            <div>{{ scope.row.offer?.grossMarginNumber.toFixed(2) }}</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="'第' + (index + 1) + '轮'"
          v-for="(item, index) in data.projectBoard.length > 0 ? data.projectBoard[0]?.oldOffer : []"
          :key="index"
        >
          <template #default="scope">
            <el-input v-model="scope.row.oldOffer[index].grossMargin" />
            <el-input v-model="scope.row.oldOffer[index].unitPrice">
              <template #append>
                <el-button @click="spreadSheetCalculate(scope.row)">计算</el-button>
              </template>
            </el-input>
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
import {
  getStatementAnalysisBoard,
  postCalculateFullGrossMargin,
  getSpreadSheetCalculate,
  postIsOffer,
  getDownloadMessage
} from "./service"
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
    data: ["目标价", "本次报价", "上一轮"]
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
      data: [320, 302, 301]
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
      data: [120, 132, 101]
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
      data: [220, 182, 191]
    }
  ]
}
let data2 = {
  title: {
    text: "收入和毛利率对比"
  },
  xAxis: {
    type: "category",
    data: ["目标价", "本次报价", "上一轮"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [120, 200, 150],
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
  unitPrice: [] as any[],
  pooledAnalysis: [] as any[],
  productBoard: [] as any[],
  allInteriorGrossMargin: "",
  allClientGrossMargin: "",
  projectBoard: [] as any[],
  auditFlowId: 1
})
const calculateFullGrossMargin = async (row: any, index: number, unitPrice: number) => {
  // console.log(data.auditFlowId)
  let res: any = await postCalculateFullGrossMargin(row, data.auditFlowId, unitPrice)
  row.oldOffer[index].grossMargin = res.result.productBoardGrosses[0].offeGrossMargin
}
const setData = () => {
  data1.series = data.productBoard.map((item: any) => {
    return {
      name: item.productName,
      type: "bar",
      stack: "total",
      label: {
        show: true
      },
      emphasis: {
        focus: "series"
      },
      data: [320, 302, 301]
    }
  })
}
const spreadSheetCalculate = async (row: any) => {
  let res: any = await getSpreadSheetCalculate(row.id, row.rossMargin)
  console.log(res)
}
const postOffer = (isOffer: number) => {
  let res = postIsOffer({
    unitPrice: data.unitPrice,
    pooledAnalysis: data.pooledAnalysis,
    productBoard: {
      allInteriorGrossMargin: data.allInteriorGrossMargin,
      allClientGrossMargin: data.allClientGrossMargin,
      productBoard: data.productBoard
    },
    projectBoard: data.projectBoard,
    isOffer,
    auditFlowId: data.auditFlowId
  })
  console.log(res)
}
const downLoad = async () => {
  let res: any = await getDownloadMessage(1, "成本信息表")
  const blob = res
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = function () {
    let url = URL.createObjectURL(new Blob([blob]))
    let a = document.createElement("a")
    document.body.appendChild(a) //此处增加了将创建的添加到body当中
    a.href = url
    a.download = "成本信息表.xlsx"
    a.target = "_blank"
    a.click()
    a.remove() //将a标签移除
  }
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')

  chart1 = initCharts("unitpriceChart", data1)
  chart2 = initCharts("yearChart", data2)
  let query = getQuery()
  data.auditFlowId = Number(query.auditFlowId) || 1

  let { result } = (await getStatementAnalysisBoard(1)) as any
  let { nre, unitPrice, pooledAnalysis, productBoard, projectBoard } = result
  data.nre = nre
  data.unitPrice = unitPrice
  console.log(data.unitPrice, "data.unitPrice")
  data.pooledAnalysis = pooledAnalysis
  data.productBoard = productBoard.productBoard // 有疑问
  data.allInteriorGrossMargin = productBoard.allInteriorGrossMargin
  data.allClientGrossMargin = productBoard.allClientGrossMargin
  data.projectBoard = projectBoard

  setData()
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
