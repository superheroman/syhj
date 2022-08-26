<template>
  <div class="versionManagement-wrap">
    <EZFilter
      :filterNnum="data.verisonfilterNnum"
      :show-btn="true"
      :initFilterValue="InitVersionFilterValue"
      :onSubmit="queryTable"
    />
    <el-card class="table-wrap" header="系统版本管理表">
      <el-table :data="data.versionManageData" style="width: 100%">
        <el-table-column prop="versionFilterInputDto.projectName" label="项目名称">
          <template #default="{ row }">
            <el-button type="primary" link @click="pathToOperationRecord(row.versionFilterInputDto?.auditFlowId)">
              {{ row.versionFilterInputDto.projectName }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="versionFilterInputDto.version" label="版本号" />
        <el-table-column prop="versionFilterInputDto.auditFlowId" label="流程单号" />
        <el-table-column prop="versionFilterInputDto.draftDate" label="拟稿时间">
          <template #default="{ row }">
            {{ formatDateTime(row.versionFilterInputDto.draftDate || "") }}
          </template>
        </el-table-column>
        <el-table-column prop="versionFilterInputDto.finishedDate" label="完成时间">
          <template #default="{ row }">
            {{ formatDateTime(row.versionFilterInputDto.finishedDate || "") }}
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right">
          <template #default="{ row }">
            <el-button @click="getPriceEvaluationTableList(row.priceEvaluationTableList)" type="primary" link
              >查看核价表</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="核价表" width="80%" v-model="data.visible">
      <el-tabs type="border-card">
        <template v-for="(item, index) in data.priceEvaluationTableList" :key="index">
          <el-tab-pane :label="`核价表${index + 1}`">
            标题：{{ item.title }}
            <div m="4">
              <el-card header="项目核价表（量产/样品）" m="2">
                <el-table :data="item.material" style="width: 100%" border>
                  <el-table-column type="index" width="50" />
                  <el-table-column label="sap" prop="sap" width="180" />
                  <el-table-column label="材料名称" prop="materialName" width="180" />
                  <el-table-column label="装配数量" prop="" width="180" />
                  <el-table-column label="材料单价（原币）" prop="assemblyCount" width="180" />
                  <el-table-column label="币别" prop="currencyText" width="180" />
                  <el-table-column label="汇率" prop="exchangeRate" width="180" />
                  <el-table-column label="材料单价（人民币）" prop="materialPriceCyn" width="180" />
                  <el-table-column label="合计金额（人民币）" prop="totalMoneyCyn" width="180" />
                  <el-table-column label="损耗" prop="loss" width="180" />
                  <el-table-column label="材料成本（含损耗）" prop="materialCost" width="180" />
                  <el-table-column label="投入量" prop="inputCount" width="180" />
                  <el-table-column label="采购量" prop="purchaseCount" width="180" />
                  <el-table-column label="MOQ分摊成本" prop="moqShareCount" width="180" />
                  <el-table-column label="MOQ" prop="moq" width="180" />
                  <el-table-column label="可用库存" prop="availableInventory" width="180" />
                  <el-table-column label="备注" prop="remarks" width="180" />
                </el-table>
              </el-card>
              <el-card m="2">
                <el-table :data="[item.manufacturingCost]" style="width: 100%" border>
                  <el-table-column label="梯度K/Y（模组数量）" prop="gradientKy" width="180" />
                  <el-table-column label="直接制造成本">
                    <el-table-column label="直接人工" prop="manufacturingCostDirect.directLabor">
                      <template #default="{ row }">
                        {{ row.manufacturingCostDirect?.directLabor?.toFixed(2) || "-" }}
                      </template>
                    </el-table-column>
                    <el-table-column label="设备折旧" prop="manufacturingCostDirect.equipmentDepreciation">
                      <template #default="{ row }">
                        {{ row.manufacturingCostDirect?.equipmentDepreciation?.toFixed(2) || "-" }}
                      </template>
                    </el-table-column>
                    <el-table-column label="换线成本" prop="manufacturingCostDirect.lineChangeCost">
                      <template #default="{ row }">
                        {{ row.manufacturingCostDirect?.lineChangeCost?.toFixed(2) || "-" }}
                      </template>
                    </el-table-column>

                    <el-table-column label="制造费用" prop="manufacturingCostDirect.manufacturingExpenses" />
                    <el-table-column label="小计" prop="subtotal" />
                  </el-table-column>
                  <el-table-column label="间接制造成本">
                    <el-table-column label="直接人工" prop="manufacturingCostIndirect.directLabor">
                      <template #default="{ row }">
                        {{ row.manufacturingCostIndirect?.directLabor?.toFixed(2) || "-" }}
                      </template>
                    </el-table-column>
                    <el-table-column label="设备折旧" prop="manufacturingCostIndirect.equipmentDepreciation">
                      <template #default="{ row }">
                        {{ row.manufacturingCostIndirect?.equipmentDepreciation?.toFixed(2) || "-" }}
                      </template>
                    </el-table-column>
                    <el-table-column label="换线成本" prop="manufacturingCostIndirect.lineChangeCost">
                      <template #default="{ row }">
                        {{ row.manufacturingCostIndirect?.lineChangeCost?.toFixed(2) || "-" }}
                      </template>
                    </el-table-column>
                    <el-table-column label="制造费用" prop="manufacturingCostIndirect.manufacturingExpenses" />
                    <el-table-column label="小计" prop="subtotal" />
                  </el-table-column>
                  <el-table-column label="合计" prop="" />
                </el-table>
              </el-card>
              <el-card m="2">
                <el-table :data="item.lossCost" style="width: 100%" border>
                  <el-table-column label="成本项目" prop="name" width="180" />
                  <el-table-column label="损耗成本" prop="wastageCost" width="180" />
                  <el-table-column label="MOQ分摊成本" prop="moqShareCount" width="180" />
                  <!-- <el-table-column label="合计" prop="" width="180" /> -->
                </el-table>
              </el-card>
              <el-card m="2">
                <el-table :data="[item.otherCostItem]" style="width: 100%" border>
                  <el-table-column label="夹具" prop="fixture" width="180" />
                  <el-table-column label="物流费" prop="logisticsFee" width="180" />
                  <el-table-column label="质量成本" prop="qualityCost" width="180">
                    <el-table-column label="产品类别" prop="productCategory" width="180" />
                    <el-table-column label="成本比例" prop="costProportion" width="180" />
                    <el-table-column label="质量成本(MAX)" prop="qualityCost" width="180" />
                  </el-table-column>
                  <el-table-column label="财务成本" prop="financialCost" width="180">
                    <el-table-column label="账期" prop="accountingPeriod" width="180" />
                    <el-table-column label="资金成本率" prop="capitalCostRate" width="180" />
                    <el-table-column label="财务成本" prop="financialCost" width="180" />
                  </el-table-column>
                  <el-table-column label="税务成本" prop="taxCost" width="180" />
                  <el-table-column label="合计" prop="total" width="180" />
                </el-table>
              </el-card>
            </div>
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { InitVersionFilterValue } from "./common/const"
import { VersionManageItem } from "./data.type"
import EZFilter from "@/components/EZFilter/index.vue"
import { GetVersionInfos, GetAllAuditFlowProjectNameAndVersion } from "./service"
import { useRouter } from "vue-router"
import { formatDateTime } from "@/utils"
const router = useRouter()

// 获取项目已有核价流程所有项目名称以及对应版本号
const getAllAuditFlowProjectName = async () => {
  const { result } = await GetAllAuditFlowProjectNameAndVersion()
  data.verisonfilterNnum[0].options = result.map((item: any) => {
    let obj: any = {}
    obj[item.projectName] = item.versions.map((vNo: any) => ({ label: vNo, value: vNo }))
    data.versionsEnum = obj
    return { label: item.projectName, value: item.projectName }
  })
}

// 获取项目名称对应版本号
const getAllAuditFlowVersion = async (projectName: any) => {
  data.verisonfilterNnum[1].options = data.versionsEnum[projectName]
}

// 系统版本管理表-table数据
const data = reactive<{
  versionManageData: VersionManageItem[]
  verisonfilterNnum: any[]
  priceEvaluationTableList: any[]
  visible: boolean
  versionsEnum: any
}>({
  versionManageData: [],
  verisonfilterNnum: [
    // 版本管理 - 筛选项
    {
      label: "项目名称",
      key: "ProjectName",
      role: "select",
      options: [],
      onchange: getAllAuditFlowVersion
    },
    {
      label: "版本号",
      key: "Version",
      role: "select",
      options: []
    },
    {
      label: "流程单号",
      key: "AuditFlowId"
    },
    {
      label: "拟稿时间",
      key: "DraftDate",
      role: "timePicker"
    },
    {
      label: "完成时间",
      key: "FinishedDate",
      role: "timePicker"
    }
  ],
  priceEvaluationTableList: [],
  visible: false,
  versionsEnum: {}
})

const queryTable = async (formValue: any) => {
  console.log(formValue, "formValue")
  const { DraftDate, ProjectName, Version, AuditFlowId, FinishedDate } = formValue
  const { result } = await GetVersionInfos({
    ProjectName: ProjectName,
    Version,
    AuditFlowId,
    DraftStartTime: DraftDate[0] || "",
    DraftEndTime: DraftDate[1] || "",
    FinishedStartTime: FinishedDate[0] || "",
    FinishedEndTime: FinishedDate[1] || ""
  })
  data.versionManageData = result || []
  console.log(result, "queryTable")
}

const getPriceEvaluationTableList = (arr: any) => {
  data.priceEvaluationTableList = arr
  data.visible = true
}

const pathToOperationRecord = (AuditFlowId: number) => {
  router.push(`/versionManagement/operationRecord?AuditFlowId=${AuditFlowId}`).catch((err) => {
    console.warn(err)
  })
}

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  getAllAuditFlowProjectName()
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})

watchEffect(() => {})
</script>
<style scoped lang="scss">
.table-wrap {
  margin-top: 20px;
}
.versionManagement-wrap {
  margin: 0px 10px 20px 10px;
}
</style>
