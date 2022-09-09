<template>
  <div>
    <div style="margin: 20px 0">
      <el-button type="primary" @click="downLoad" style="margin-left: 10px">成本信息表下载</el-button>
      <el-button-group style="margin-right: 10px; float: right">
        <el-button type="primary" @click="postOffer(1)" v-havedone>报价</el-button>
        <el-button type="primary" @click="postOffer(0)" v-havedone>不报价</el-button>
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
          :label="item.grossMargin + '%'"
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
          :label="item.grossMargin + '%'"
          v-for="(item, index) in data.pooledAnalysis[0]?.grossMarginList"
          :key="index"
          width="150"
        >
          <template #default="scope">
            <span>{{ scope.row.grossMarginList[index]?.grossMarginNumber.toFixed(2) }} </span>
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right; margin: 20px 0">
        <el-button @click="openDialog" type="primary">年份维度对比</el-button>
      </div>
    </el-card>
    <el-card class="card">
      <el-table :data="data.productBoard" style="width: 100%" border>
        <el-table-column label="产品" prop="productName" />
        <el-table-column label="单车产品数量" prop="productNumber" />
        <el-table-column label="目标价（内部）">
          <el-table-column label="单价" prop="interiorTargetUnitPrice">
            <template #default="{ row }">
              {{ row?.interiorTargetUnitPrice?.toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column label="毛利率" prop="interiorTargetGrossMargin">
            <template #default="{ row }">
              {{ row.interiorTargetGrossMargin.toFixed(2) }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="目标价（客户）">
          <el-table-column label="单价" prop="clientTargetUnitPrice">
            <template #default="scope">
              <el-input v-model="scope.row.clientTargetUnitPrice">
                <template #append>
                  <el-button
                    @click="
                      calculateFullGrossMargin(
                        scope.row,
                        scope.$index,
                        scope.row.clientTargetUnitPrice,
                        'clientTargetGrossMargin'
                      )
                    "
                    >计算</el-button
                  >
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="毛利率" prop="clientTargetGrossMargin">
            <template #default="{ row }">
              {{ row.clientTargetGrossMargin?.toFixed(2) || "-" }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="本次报价">
          <el-table-column label="单价">
            <template #default="scope">
              <el-input v-model="scope.row.offerUnitPrice">
                <template #append>
                  <el-button
                    @click="calculateFullGrossMargin(scope.row, scope.$index, scope.row.offerUnitPrice, 'grossMargin')"
                    >计算</el-button
                  >
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="毛利率" prop="grossMargin">
            <template #default="{ row }">
              {{ row.grossMargin?.toFixed(2) || "-" }}
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
              <div>{{ item.unitPrice.toFixed(2) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="毛利率">
            <template>
              <div>{{ item.grossMargin.toFixed(2) }}</div>
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
    <div id="revenueGrossMarginChart" />
    <div style="float: right">
      <el-button @click="toNREPriceList">在线预览NRE核价表</el-button>
      <el-button @click="toProductPriceList">在线预览核价表</el-button>
      <el-button>点击生成待审批的报价表</el-button>
    </div>
    <el-dialog v-model="dialogVisible" title="年份维度对比" width="50%" style="height: 300px">
      <div v-for="item in data.dialogTable" :key="item" class="common-card">
        <el-card class="table-wrap" :header="item.project">
          <el-table :data="[item]" style="width: 100%">
            <template v-for="(yearItem, i) in item.yearList" :key="yearItem">
              <el-table-column :prop="`yearList.${i}.value`" :label="yearItem.year">
                <template #default="{ row }">
                  {{ row.yearList[i].value.toFixed(2) }}
                </template>
              </el-table-column>
            </template>
            <el-table-column prop="grossMargin" label="毛利率" :formatter="getTofixed" />
            <el-table-column prop="totak" label="总和" />
          </el-table>
        </el-card>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <!-- <el-button @click="dialogVisible = false">Cancel</el-button> -->
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect, onBeforeUnmount, ref } from "vue"
import { useRouter } from "vue-router"
import * as echarts from "echarts"
import {
  getStatementAnalysisBoard,
  postCalculateFullGrossMargin,
  getSpreadSheetCalculate,
  postIsOffer,
  getDownloadMessage,
  GetYearDimensionalityComparison
} from "./service"
import { NreMarketingDepartmentModel } from "./data.type"
import getQuery from "@/utils/getQuery"
import debounce from "lodash/debounce"

// let mouldInventoryData = ref<NreMarketingDepartmentModel[]>([])

/**
 * 路由对象
 */
// const route = useRoute()
/**
 * 路由实例
 */
const router = useRouter()
//console.log('1-开始创建组件-setup')
const getTofixed = (row: any) => {
  return row.grossMargin?.toFixed(2)
}
let dialogVisible = ref(false)
let ProjectUnitPrice: any = {
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
  // yAxis: {
  //   type: "value"
  // },
  yAxis: [
    {
      type: "value",
      name: "单价",
      min: 0,
      max: 1000,
      interval: 200,
      axisLabel: {
        formatter: "{value} 元"
      }
    },
    {
      type: "value",
      name: "毛利率",
      min: 0,
      max: 0.5,
      interval: 0.02,
      axisLabel: {
        formatter: "{value}"
      }
    }
  ],
  series: []
}
let RevenueGrossMargin = {
  title: {
    text: "收入和毛利率对比"
  },
  xAxis: {
    type: "category",
    data: ["目标价", "本次报价", "上一轮"]
  },
  legend: {},
  yAxis: [
    {
      type: "value",
      name: "收入",
      min: 0,
      max: 1000,
      interval: 200,
      axisLabel: {
        formatter: "{value} 元"
      }
    },
    {
      type: "value",
      name: "毛利率",
      min: 0,
      max: 0.5,
      interval: 0.02,
      axisLabel: {
        formatter: "{value}"
      }
    }
  ],
  series: [
    {
      data: [120, 200, 150],
      type: "bar",
      name: "OV方案销售收入"
    },
    {
      data: [0, 0.05, 0.1],
      type: "line",
      name: "OV方案毛利率",
      yAxisIndex: 1
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
  auditFlowId: 1,
  dialogTable: []
})
const calculateFullGrossMargin = debounce(async (row: any, index: number, unitPrice: number, key: string) => {
  // console.log(data.auditFlowId)
  let { result }: any = await postCalculateFullGrossMargin(row, data.auditFlowId, unitPrice)
  // row.oldOffer[index].grossMargin = res.result.productBoardGrosses[0].offeGrossMargin

  const { grossMargin } = result?.productBoardGrosses[0] || ""
  console.log(grossMargin, "毛利率计算")
  data.productBoard[index][key] = grossMargin
}, 300)
const setData = () => {
  ProjectUnitPrice.series = data.productBoard.map((item: any) => {
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
      data: [item.clientTargetUnitPrice, item.offerUnitPrice || 100, item.oldOffer[0]?.unitPrice || 110]
    }
  })
  ProjectUnitPrice.series.push({
    yAxisIndex: 1,
    name: "整体毛利率",
    type: "line",
    data: [0.1, 0.2, 0.4]
  })
  chart1.setOption(ProjectUnitPrice)
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
    auditFlowId: data.auditFlowId,
    nre: data.nre
  })
  console.log(res)
}
const downLoad = async () => {
  let res: any = await getDownloadMessage(data.auditFlowId, "成本信息表")
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
const toProductPriceList = () => {
  let query = getQuery()
  router.push({
    path: "/nupriceManagement/productPriceList",
    query
  })
}
const toNREPriceList = () => {
  let query = getQuery()
  router.push({
    path: "/nre/nrePricelist",
    query
  })
}
const openDialog = () => {
  getDialogData()
  dialogVisible.value = true
}
const getDialogData = async () => {
  const { result } = await GetYearDimensionalityComparison({
    id: data.auditFlowId
  })
  console.log(result, "res")
  data.dialogTable = result
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')

  chart1 = initCharts("unitpriceChart", ProjectUnitPrice)
  chart2 = initCharts("revenueGrossMarginChart", RevenueGrossMargin)
  let query = getQuery()
  data.auditFlowId = Number(query.auditFlowId)

  let { result } = (await getStatementAnalysisBoard(data.auditFlowId)) as any
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
#revenueGrossMarginChart {
  height: 400px;
}
</style>
