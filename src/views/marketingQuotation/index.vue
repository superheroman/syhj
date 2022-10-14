<template>
  <el-card class="marketingQuotation-page" header="报价审核" m="2">
    <div style="margin: 20px 0; float: right" v-if="data.isShowBtn">
      <el-button class="m-2" type="primary" @click="downLoadSOR">SOR下载</el-button>
      <el-button class="m-2" type="primary" @click="downLoad3DExploded">3D爆炸图下载</el-button>
      <el-button class="m-2" type="primary" @click="downTrFile">TR-主方案下载</el-button>
      <el-button type="primary" @click="jumpToAnalysis">点击查看报价分析看板</el-button>
      <el-button class="m-2" type="primary" @click="jumpToElec">点击查看电子料返利金额</el-button>
      <el-button class="m-2" type="primary" @click="jumpToStru">点击查看结构料返利金额</el-button>
      <el-button class="m-2" @click="toNREPriceList" type="primary">在线预览NRE核价表</el-button>
      <el-button class="m-2" @click="toProductPriceList" type="primary">在线预览核价表</el-button>
    </div>
    <el-descriptions :column="2" border>
      <el-descriptions-item label="直接客户名称">
        {{ data.marketingQuotationData.directCustomerName }}
      </el-descriptions-item>
      <el-descriptions-item label="客户性质"> {{ data.marketingQuotationData.clientNature }} </el-descriptions-item>
      <el-descriptions-item label="终端客户名称">
        {{ data.marketingQuotationData.terminalCustomerName }}
      </el-descriptions-item>
      <el-descriptions-item label="终端客户性质">
        {{ data.marketingQuotationData.terminalClientNature }}
      </el-descriptions-item>
      <el-descriptions-item label="开发计划">
        {{ data.marketingQuotationData.developmentPlan }}
      </el-descriptions-item>
      <el-descriptions-item label="汇率"> {{ data.marketingQuotationData.exchangeRate }} </el-descriptions-item>
    </el-descriptions>
    <el-card header="走量信息" m="2">
      <el-table :data="data.marketingQuotationData?.motionMessage" border>
        <el-table-column type="index" width="100" />
        <el-table-column label="名称" prop="messageName" />
        <el-table-column
          v-for="(item, index) in data?.motionMessageSop"
          :key="item.year"
          :label="item.year"
          :prop="`sop[${index}].value`"
          :formatter="formatThousandths"
        />
      </el-table>
    </el-card>
    <el-card header="核心部件：" m="2">
      <!-- <div>
        产品名称：{{ data.marketingQuotationData. }}
      </div> -->
      <template v-for="item in data.marketingQuotationData.coreComponent" :key="item.messageName">
        <el-card :header="item.componentName" class="m-2">
          <el-table :data="item.productSubclass" border>
            <!-- <el-table-column type="index" width="100" /> -->
            <el-table-column label="核心部件" prop="coreComponent" />
            <el-table-column label="型号" prop="model" />
            <el-table-column label="类型" prop="type" />
            <el-table-column label="备注" prop="remark" />
          </el-table>
        </el-card>
      </template>
    </el-card>
    <el-card header="NRE费用：" m="2">
      <template v-for="item in data.marketingQuotationData.nreCost" :key="item.messageName">
        <el-card :header="item.nreCostModuleName" class="m-2">
          <el-table :data="item.nreCostModels" border>
            <el-table-column type="index" width="100" />
            <el-table-column label="费用类别" prop="name" />
            <el-table-column label="成本" prop="cost" :formatter="formatThousandths" />
          </el-table>
        </el-card>
      </template>
    </el-card>
    <el-card header="内部核价信息：" m="2">
      <template v-for="item in data.marketingQuotationData.pricingMessage" :key="item.messageName">
        <el-card :header="item.pricingMessageName" class="m-2">
          <el-table :data="item.pricingMessageModels" border>
            <el-table-column label="序号" type="index" width="100" />
            <el-table-column label="费用类别" prop="name" />
            <el-table-column label="成本值" prop="costValue" :formatter="formatThousandths" />
          </el-table>
        </el-card>
      </template>
    </el-card>
    <el-card header="报价策略：" m="2">
      <el-table :data="data.marketingQuotationData.biddingStrategy" border>
        <el-table-column type="index" width="100" />
        <el-table-column label="产品" prop="product" />
        <el-table-column label="成本" prop="cost" :formatter="formatThousandths" />
        <el-table-column label="毛利率" prop="grossMargin" :formatter="formatterP" />
        <el-table-column label="价格" prop="price" :formatter="formatThousandths" />
        <el-table-column label="佣金" prop="commission" :formatter="formatThousandths" />
        <el-table-column label="含佣金的毛利率" prop="grossMarginCommission" :formatter="formatterP" />
      </el-table>
    </el-card>
    <el-card header="费用表：" m="2">
      <el-table :data="data.marketingQuotationData.expensesStatement" border>
        <el-table-column type="index" width="100" />
        <el-table-column label="费用类别" prop="formName" />
        <el-table-column label="核价金额" prop="pricingMoney" :formatter="formatThousandths" />
        <el-table-column label="报价系数" prop="offerCoefficient" :formatter="formatter" />
        <el-table-column label="报价金额" prop="offerMoney" :formatter="formatThousandths" />
        <el-table-column label="备注" prop="remark" />
      </el-table>
    </el-card>
    <el-row justify="end" style="margin-top: 20px">
      <el-button type="primary" @click="handleGeneralManagerQuoteCheck(true)" v-havedone>同意</el-button>
      <el-button type="danger" @click="handleGeneralManagerQuoteCheck(false)" v-havedone>拒绝</el-button>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { GetQuotationList, PostAuditQuotationList } from "./service"
import getQuery from "@/utils/getQuery"
import { getYears } from "../pmDepartment/service"
import { ElMessageBox, ElMessage } from "element-plus"
import useJump from "@/hook/useJump"
import { useRouter } from "vue-router"
import { CommonDownloadFile } from "@/api/bom"
import { GetPicture3DByAuditFlowId } from "../processImport/service"
import { getSorByAuditFlowId } from "@/components/CustomerSpecificity/service"
import { downloadFile, getAuditFlowVersion } from "../trAudit/service"

const router = useRouter()
const query = useJump()
const { jumpTodoCenter, jumpPage } = query
const { auditFlowId = 1 }: any = getQuery()
/**
 * 数据部分
 */
const data = reactive<any>({
  projectName: "",
  developmentPlan: "",
  marketingQuotationData: {
    motionMessage: []
  },
  motionMessageSop: [],
  isShowBtn: false,
  sor: {
    sorFileName: "",
    fileId: null
  }
})

const columns = reactive({
  sopData: []
})
const formatter = (_record: any, _row: any, cellValue: any) => {
  return Number(cellValue).toFixed(2)
}
const formatterP = (_record: any, _row: any, cellValue: any) => {
  return Number(cellValue).toFixed(2) + "%"
}
const formatThousandths = (_record: any, _row: any, cellValue: any) => {
  return (cellValue.toFixed(2) + "").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,")
}
onBeforeMount(() => {
  let userInfo = JSON.parse(window.localStorage.getItem("user") || "")
  if (userInfo.userJobs === "总经理") {
    data.isShowBtn = true
  }
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  initFetch()
  fetchSopYear()
})
const jumpToAnalysis = () => {
  jumpPage("/quoteAnalysis/index", {
    auditFlowId
  })
}
const jumpToElec = () => {
  jumpPage("/bomVerify/electronic", {
    auditFlowId,
    right: 1
  })
}
const jumpToStru = () => {
  jumpPage("/bomVerify/construction", {
    auditFlowId,
    right: 1
  })
}
const initFetch = async () => {
  const { result } = await GetQuotationList({ Id: auditFlowId })
  data.marketingQuotationData = result
  data.motionMessageSop = result.motionMessage[0].sop.map((item: any) => item)
  console.log(result, "result")
}

const fetchSopYear = async () => {
  const { result } = (await getYears(auditFlowId)) || {}
  columns.sopData = result || []
}

const handleGeneralManagerQuoteCheck = (isAgree: boolean) => {
  let text = isAgree ? "您确定要同意嘛？" : "请输入拒绝理由"
  ElMessageBox[!isAgree ? "prompt" : "confirm"](text, "报价审核", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async (val) => {
    if (!isAgree && !val?.value) {
      ElMessage.warning("拒绝理由必填")
      return
    }
    const { success } = await PostAuditQuotationList({
      ...data.marketingQuotationData,
      isPass: isAgree,
      auditFlowId,
      opinionDescription: !isAgree ? val?.value : ""
    })
    if (success) jumpTodoCenter()
  })
}
const toProductPriceList = () => {
  router.push({
    path: "/nupriceManagement/productPriceList",
    query: {
      auditFlowId,
      disabled: 1
    }
  })
}

// SOR下载
const downLoadSOR = async () => {
  const { result }: any = (await getSorByAuditFlowId(auditFlowId)) || {}
  if (!result.sorFileName) return false
  let res: any = await CommonDownloadFile(result.sorFileId)
  const blob = res
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = function () {
    let url = URL.createObjectURL(new Blob([blob]))
    let a = document.createElement("a")
    document.body.appendChild(a) //此处增加了将创建的添加到body当中
    a.href = url
    a.download = result.sorFileName
    a.target = "_blank"
    a.click()
    a.remove() //将a标签移除
  }
}

// TR主方案下载
const downTrFile = async () => {
  let res: any = await getAuditFlowVersion(Number(auditFlowId))
  const trFileId = res.result.solutionFileIdentifier
  const solutionFileName = res.result.solutionFileName
  if (trFileId) {
    try {
      let res: any = await downloadFile(trFileId)
      const blob = res
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onload = function () {
        let url = URL.createObjectURL(new Blob([blob]))
        let a = document.createElement("a")
        document.body.appendChild(a) //此处增加了将创建的添加到body当中
        a.href = url
        a.download = solutionFileName
        a.target = "_blank"
        a.click()
        a.remove() //将a标签移除
      }
    } catch (err) {
      console.log(err, "downLoadError")
    }
  }
}

// 3D爆炸图下载
const downLoad3DExploded = async () => {
  let downRes: any = await GetPicture3DByAuditFlowId(auditFlowId)
  if (!downRes.result.threeDFileId) return false
  let res: any = await CommonDownloadFile(downRes.result.threeDFileId)
  const blob = res
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = function () {
    let url = URL.createObjectURL(new Blob([blob]))
    let a = document.createElement("a")
    document.body.appendChild(a) //此处增加了将创建的添加到body当中
    a.href = url
    a.download = downRes.result.threeDFileName
    a.target = "_blank"
    a.click()
    a.remove() //将a标签移除
  }
  // data.setVisible = false
}

const toNREPriceList = () => {
  router.push({
    path: "/nre/nrePricelist",
    query: {
      auditFlowId,
      hideBtn: 1
    }
  })
}

watchEffect(() => {})
</script>
<style scoped lang="scss">
.demandApply-result-page {
  margin: 10px;
}
</style>
