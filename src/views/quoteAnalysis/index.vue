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
          <span>NRE</span>
        </div>
      </template>
      <el-table :data="data.nre" style="width: 100%" border show-summary>
        <el-table-column type="index" width="50" />
        <el-table-column label="费用名称" width="180" prop="formName" />
        <el-table-column prop="pricingMoney" label="核价金额" width="180" />
        <el-table-column label="报价系数" width="180">
          <template #default="scope">
            <el-input-number
              v-model="scope.row.offerCoefficient"
              controls-position="right"
              type="number"
              :min="0"
              @blur="(val) => changeOfferMoney(scope.row, scope.$index, val)"
            />
          </template>
        </el-table-column>
        <el-table-column label="报价金额" width="180" prop="offerMoney">
          <template #default="{ row }">
            {{ row.offerCoefficient * row.pricingMoney }}
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
    </el-card>
    <el-card class="card">
      <el-row justify="end" m="2">
        <el-button @click="openDialog" type="primary">年份维度对比</el-button>
      </el-row>
      <el-table :data="data.productBoard" border>
        <el-table-column label="产品" prop="productName" width="150" />
        <el-table-column label="单车产品数量" prop="productNumber" width="150" />
        <el-table-column label="目标价（内部）" width="300">
          <el-table-column label="单价" prop="interiorTargetUnitPrice" width="150">
            <template #default="{ row }">
              {{ row?.interiorTargetUnitPrice?.toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column label="毛利率" prop="interiorTargetGrossMargin" width="150">
            <template #default="{ row }">
              {{ row.interiorTargetGrossMargin.toFixed(2) }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="目标价（客户）" width="300">
          <el-table-column label="单价" prop="clientTargetUnitPrice" width="150">
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
          <el-table-column label="毛利率" prop="clientTargetGrossMargin" width="150">
            <template #default="{ row }">
              {{ row.clientTargetGrossMargin?.toFixed(2) || "-" }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="本次报价" width="300">
          <el-table-column label="单价" width="150">
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
          <el-table-column label="毛利率" prop="grossMargin" width="150">
            <template #default="{ row }">
              {{ row.grossMargin?.toFixed(2) || "-" }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          :label="'第' + (index + 1) + '轮'"
          v-for="(item, index) in data.productBoard.length > 0 ? data.productBoard[0].oldOffer : []"
          :key="index"
          width="300"
        >
          <el-table-column label="单价" width="150">
            <template>
              <div>{{ item.unitPrice.toFixed(2) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="毛利率" width="150">
            <template>
              <div>{{ item.grossMargin.toFixed(2) }}</div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-descriptions title="" border :column="1">
        <el-descriptions-item label="目标价(内部)整套单价">{{
          calculatedValue("interiorTargetUnitPrice")
        }}</el-descriptions-item>
        <el-descriptions-item label="目标价(客户)整套单价">{{
          calculatedValue("clientTargetUnitPrice")
        }}</el-descriptions-item>
        <el-descriptions-item label="本次报价整套单价">{{ calculatedValue("offerUnitPrice") }}</el-descriptions-item>
        <el-descriptions-item label="目标价(内部)平均单价">{{
          calculatedValue("interiorTargetUnitPrice", "average")
        }}</el-descriptions-item>
        <el-descriptions-item label="目标价(客户)平均单价">{{
          calculatedValue("clientTargetUnitPrice", "average")
        }}</el-descriptions-item>
        <el-descriptions-item label="本次报价平均单价">{{
          calculatedValue("offerUnitPrice", "average")
        }}</el-descriptions-item>
        <el-descriptions-item label="目标价(内部)整套毛利率">{{
          Number(data.allClientGrossMargin).toFixed(2)
        }}</el-descriptions-item>
        <el-descriptions-item label="目标价(客户)整套毛利率">{{
          Number(data.allInteriorGrossMargin).toFixed(2)
        }}</el-descriptions-item>
        <el-descriptions-item label="本次报价整套毛利率">{{
          calculatedValue("grossMargin")?.toFixed(2)
        }}</el-descriptions-item>
      </el-descriptions>
      <!-- <div style="float: right; margin: 20px 0">
        <el-button @click="openDialog" type="primary">年份维度对比</el-button>
      </div> -->
    </el-card>

    <el-card class="card">
      <el-table :data="data.projectBoard" style="width: 100%" border>
        <el-table-column label="项目" prop="projectName" width="150" />
        <el-table-column label="目标价（内部）" width="150">
          <template #default="scope">
            <!-- <div>{{ scope.row.interiorTarget?.grossMargin.toFixed(2) }}</div> -->
            <div>{{ scope.row.interiorTarget?.grossMarginNumber.toFixed(2) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="目标价（客户）" width="150">
          <template #default="scope">
            <!-- <div>{{ scope.row.clientTarget?.grossMargin.toFixed(2) }}</div> -->
            <div>{{ scope.row.clientTarget?.grossMarginNumber.toFixed(2) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="本次报价">
          <template #default="scope">
            <!-- <div>{{ scope.row.offer?.grossMargin.toFixed(2) }}</div> -->
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
              <!-- <template #append>
                <el-button @click="spreadSheetCalculate(scope.row)">计算</el-button>
              </template> -->
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
      <el-button @click="toDemandApplyResult">点击生成待审批的报价表</el-button>
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
import { reactive, onBeforeMount, onMounted, watchEffect, onBeforeUnmount, ref } from "vue"
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
import { ElLoading } from "element-plus"

// let mouldInventoryData = ref<NreMarketingDepartmentModel[]>([])

/**
 * 路由对象
 */
// const route = useRoute()
/**
 * 路由实例
 */
let query = getQuery()
const router = useRouter()
//console.log('1-开始创建组件-setup')
const getTofixed = (row: any) => {
  return row.grossMargin?.toFixed(2)
}
let dialogVisible = ref(false)
const fullscreenLoading = ref(false)
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
    data: ["目标价（内部）", "目标价（客户）", "本次报价", "上一轮"]
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
let RevenueGrossMargin: any = {
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
    // {
    //   data: [120, 200, 150],
    //   type: "bar",
    //   name: "OV方案销售收入"
    // },
    // {
    //   data: [0, 0.05, 0.1],
    //   type: "line",
    //   name: "OV方案毛利率",
    //   yAxisIndex: 1
    // }
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
const data = reactive<any>({
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

// 报价分析看板 单价计算
const calculateFullGrossMargin = debounce(async (row: any, index: number, unitPrice: number, key: string) => {
  // console.log(data.auditFlowId)
  let { result }: any = await postCalculateFullGrossMargin(row, data.auditFlowId, unitPrice)
  // row.oldOffer[index].grossMargin = res.result.productBoardGrosses[0].offeGrossMargin

  const { grossMargin } = result?.productBoardGrosses[0] || ""

  data.productBoard[index][key] = grossMargin
  const grossMarginValue = calculatedValue("grossMargin") // 本次报价整套毛利率
  const AllUnitPrice = calculatedValue("offerUnitPrice") // 本次报价整套单价
  spreadSheetCalculate(grossMarginValue, AllUnitPrice)
}, 300)

const setData = () => {
  ProjectUnitPrice.series = data.productBoard.map((item: any) => {
    return {
      name: item.productName + item.interiorTargetUnitPrice,
      type: "bar",
      stack: "total",
      label: {
        show: true
      },
      emphasis: {
        focus: "series"
      },
      data: [item.interiorTargetUnitPrice, item.clientTargetUnitPrice, item.offerUnitPrice].concat(
        item.oldOffer.map((offer: any) => offer.unitPrice)
      )
    }
  })
  ProjectUnitPrice.series.push({
    yAxisIndex: 1,
    name: "整体毛利率",
    type: "line",
    data: [0.1, 0.2, 0.4] //需要替换
  })
  chart1.setOption(ProjectUnitPrice)
  RevenueGrossMargin.series = data.projectBoard.map((item: any) => {
    return {
      name: item.projectName,
      type: "bar",
      stack: "total",
      label: {
        show: true
      },
      emphasis: {
        focus: "series"
      },
      data: [item.interiorTarget.grossMarginNumber, item.clientTarget.grossMarginNumber]
    }
  })
  RevenueGrossMargin.series.push({
    yAxisIndex: 1,
    name: "整体毛利率",
    type: "line",
    data: [0.1, 0.2, 0.4] //需要替换
  })
  chart2.setOption(RevenueGrossMargin)
}

const spreadSheetCalculate = async (grossMarginValue: any, AllUnitPrice: any) => {
  let { result }: any = await getSpreadSheetCalculate(data.auditFlowId, grossMarginValue, AllUnitPrice)
  result.forEach((element: any, index: number) => {
    data.projectBoard[index].offer = {
      grossMarginNumber: element.value
    }
  })
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
  router.push({
    path: "/nupriceManagement/productPriceList",
    query
  })
}

const toNREPriceList = () => {
  router.push({
    path: "/nre/nrePricelist",
    query
  })
}
const toDemandApplyResult = () => {
  router.push({
    path: "/demandApply/result",
    query
  })
}

const openDialog = () => {
  getDialogData()
  dialogVisible.value = true
}

const getDialogData = async () => {
  const grossMargin = calculatedValue("grossMargin") // 本次报价整套毛利率
  const unitPrice = calculatedValue("offerUnitPrice") // 本次报价整套单价
  const { result } = await GetYearDimensionalityComparison({
    id: data.auditFlowId,
    unitPrice,
    grossMargin
  })
  console.log(result, "res")
  data.dialogTable = result
}

const calculatedValue = (key: string, type?: string) => {
  if (data.productBoard.length === 0) return 0
  if (data.productBoard.length === 1) return data.productBoard[0][key]
  const totolValue = data.productBoard?.reduce((a: any, b: any) => a[key] + (b[key] || 0)) || 0
  if (!type) return totolValue
  return totolValue / data.productBoard.length
}

// 初始化
const init = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)"
  })
  try {
    chart1 = initCharts("unitpriceChart", ProjectUnitPrice)
    chart2 = initCharts("revenueGrossMarginChart", RevenueGrossMargin)

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
    fullscreenLoading.value = false
    loading.close()
  } catch (err: any) {
    console.log(err, "报价分析")
    fullscreenLoading.value = false
    loading.close()
  }
}

// 改变报价金额
const changeOfferMoney = (record: any, index: number) => {
  console.log(record, "changeOfferMoney")
  data.nre[index].offerMoney = record.offerCoefficient * record.pricingMoney
}

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(async () => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  init()
})

onBeforeUnmount(() => {
  console.log("destory")
  chart1.dispose()
  chart2.dispose()
})

watchEffect(() => {})
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
