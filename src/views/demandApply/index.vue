<template>
  <div class="demand-apply">
    <el-form :model="state.quoteForm" ref="refForm">
      <!-- 拟稿人信息 -->
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="标题:">
              <el-input v-model="state.quoteForm.title">
                <template #append>
                  <el-button @click="generateTitle">自动生成</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿人:">
              <el-input v-model="state.quoteForm.drafter" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿人工号:">
              <el-input v-model="state.quoteForm.drafterNumber" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿公司:">
              <el-input v-model="state.quoteForm.draftingCompany" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿部门:">
              <el-input v-model="state.quoteForm.draftingDepartment" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿日期:">
              <el-date-picker v-model="state.quoteForm.draftDate" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单据编号:">
              <el-input v-model="state.quoteForm.number" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 项目信息 -->
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目名称:">
              <el-input v-model="state.quoteForm.projectName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目代码:">
              <el-input v-model="state.quoteForm.projectCode" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户名称:">
              <el-input v-model="state.quoteForm.customerName" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户性质:">
              <el-select v-model="state.quoteForm.customerNature" placeholder="Select">
                <el-option
                  v-for="item in state.customerNatureOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="终端名称:">
              <el-input v-model="state.quoteForm.terminalName" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="终端性质:">
              <el-select v-model="state.quoteForm.terminalNature" placeholder="Select">
                <el-option
                  v-for="item in state.terminalNatureOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="报价形式:">
              <el-select v-model="state.quoteForm.quotationType" placeholder="Select">
                <el-option
                  v-for="item in state.quotationTypeOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="样品报价类型:">
              <el-select v-model="state.quoteForm.sampleQuotationType" placeholder="Select">
                <el-option
                  v-for="item in state.sampleQuotationTypeOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="sop时间:">
              <el-date-picker type="year" placeholder="Pick a year" v-model="state.quoteForm.sopTime" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目周期:">
              <el-input-number v-model="state.quoteForm.projectCycle" @change="yearChange" />
            </el-form-item>
          </el-col>
        </el-row>
        <h5>项目走量</h5>
        <h6>终端走量（PCS）</h6>
        <div class="demand-apply__btn-container">
          <el-button type="primary" class="demand-apply__add-btn" @click="addPCS">新增</el-button>
        </div>
        <el-table :data="pcsTableData" style="width: 100%" border :summary-method="getSummaries">
          <el-table-column label="车厂" width="180" fixed="left">
            <template #default="{ row }">
              <el-input v-model="row.carFactory" />
            </template>
          </el-table-column>
          <el-table-column label="车型" width="180" fixed="left">
            <template #default="{ row }">
              <el-input v-model="row.carModel" />
            </template>
          </el-table-column>
          <el-table-column :label="year + ''" v-for="(year, index) in state.yearCols" :key="year + ''" width="180">
            <template #default="{ row }">
              <el-input v-model="row.pcsYearList[index].quantity" @input="pcsYearQuantitySum(row)" />
            </template>
          </el-table-column>
          <el-table-column prop="sum" label="合计" />
          <el-table-column label="操作" fixed="right">
            <template #default="{ $index }">
              <el-button @click="deletePcs($index)" type="danger" :disabled="pcsTableData.length === 1">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <h6>模组数量</h6>
        <div class="demand-apply__btn-container">
          <el-button type="primary" class="demand-apply__add-btn" @click="addProduct">新增模组</el-button>
        </div>
        <el-table :data="moduleTableData" style="width: 100%" border :summary-method="getSummaries">
          <el-table-column type="index" width="50" />
          <el-table-column label="客户零件号" width="180">
            <template #default="{ row }">
              <el-input v-model="row.partNumber" />
            </template>
          </el-table-column>
          <el-table-column label="产品名称" width="180">
            <template #default="{ row }">
              <el-select v-model="row.product" placeholder="Select">
                <el-option
                  v-for="item in state.productOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="产品小类" width="180">
            <template #default="{ row }">
              <el-select v-model="row.productType" placeholder="Select">
                <el-option
                  v-for="item in state.productTypeOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="市场份额" width="180">
            <template #default="{ row }">
              <el-input v-model="row.marketShare" />
            </template>
          </el-table-column>
          <el-table-column label="模组搭载率" width="180">
            <template #default="{ row }">
              <el-input v-model="row.moduleCarryingRate" />
            </template>
          </el-table-column>
          <el-table-column label="单车产品数量" width="180">
            <template #default="{ row }">
              <el-input v-model="row.singleCarProductsQuantity" />
            </template>
          </el-table-column>
          <el-table-column :label="year + ''" v-for="(year, index) in state.yearCols" :key="year + ''" width="180">
            <template #default="{ row }">
              <el-input v-model="row.modelCountYearList[index].quantity" @input="modelCountYearListQuantitySum(row)" />
            </template>
          </el-table-column>
          <el-table-column label="模组总量" prop="modelTotal" width="180" />
          <el-table-column label="操作" fixed="right">
            <template #default="{ $index }">
              <el-button @click="deleteProduct($index)" type="danger" :disabled="moduleTableData.length === 1"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <h6>要求</h6>
        <el-table :data="requireTableData" style="width: 100%; margin: 20px 0" border>
          <el-table-column label="年份" width="180" prop="year" />
          <el-table-column label="年降率">
            <template #default="{ row }">
              <el-input v-model="row.annualDeclineRate" />
            </template>
          </el-table-column>
          <el-table-column label="年度返利要求">
            <template #default="{ row }">
              <el-input v-model="row.annualRebateRequirements" />
            </template>
          </el-table-column>
          <el-table-column label="一次性折让率">
            <template #default="{ row }">
              <el-input v-model="row.oneTimeDiscountRate" />
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="模具费分摊:">
              <el-select v-model="state.quoteForm.allocationOfMouldCost" placeholder="Select">
                <el-option
                  v-for="item in state.allocationOfMouldCostOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="治具费分摊:">
              <el-select v-model="state.quoteForm.allocationOfFixtureCost" placeholder="Select">
                <el-option
                  v-for="item in state.allocationOfFixtureCostOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="设备费分摊:">
              <el-select v-model="state.quoteForm.allocationOfEquipmentCost" placeholder="Select">
                <el-option
                  v-for="item in state.allocationOfEquipmentCostOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信赖性费用分摊:">
              <el-select v-model="state.quoteForm.reliabilityCost" placeholder="Select">
                <el-option
                  v-for="item in state.reliabilityCostOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开发费分摊:">
              <el-select v-model="state.quoteForm.developmentCost" placeholder="Select">
                <el-option
                  v-for="item in state.developmentCostOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="落地工厂:">
              <el-select v-model="state.quoteForm.landingFactory" placeholder="Select">
                <el-option
                  v-for="item in state.landingFactoryOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 产品信息 -->
      <el-card class="demand-apply__card">
        <h6>产品信息</h6>
        <el-table :data="productTableData" style="width: 100%" border>
          <el-table-column label="产品名称" width="180" fixed="left">
            <template #default="{ row }">
              <el-input v-model="row.name" />
            </template>
          </el-table-column>
          <el-table-column label="Sensor" width="400">
            <template #default="{ row }">
              <el-input v-model="row.sensor" placeholder="名称">
                <template #prepend>
                  <el-select v-model="row.sensorTypeSelect">
                    <el-option
                      v-for="item in state.TypeSelectOptions"
                      :key="item.id"
                      :label="item.displayName"
                      :value="item.id"
                    />
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.sensorPrice" placeholder="单价" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="Lens" width="400">
            <template #default="{ row }">
              <el-input v-model="row.lens" placeholder="名称">
                <template #prepend>
                  <el-select v-model="row.lensTypeSelect">
                    <el-option
                      v-for="item in state.TypeSelectOptions"
                      :key="item.id"
                      :label="item.displayName"
                      :value="item.id"
                    />
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.lensPrice" placeholder="单价" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="ISP" width="400">
            <template #default="{ row }">
              <el-input v-model="row.isp" placeholder="名称">
                <template #prepend>
                  <el-select v-model="row.ispTypeSelect">
                    <el-option
                      v-for="item in state.TypeSelectOptions"
                      :key="item.id"
                      :label="item.displayName"
                      :value="item.id"
                    />
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.ispPrice" placeholder="单价" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="串行芯片" width="400">
            <template #default="{ row }">
              <el-input v-model="row.serialChip" placeholder="名称">
                <template #prepend>
                  <el-select v-model="row.serialChipTypeSelect">
                    <el-option
                      v-for="item in state.TypeSelectOptions"
                      :key="item.id"
                      :label="item.displayName"
                      :value="item.id"
                    />
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.serialChipPrice" placeholder="单价" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="线缆" width="400">
            <template #default="{ row }">
              <el-input v-model="row.cable" placeholder="名称">
                <template #prepend>
                  <el-select v-model="row.cableTypeSelect">
                    <el-option
                      v-for="item in state.TypeSelectOptions"
                      :key="item.id"
                      :label="item.displayName"
                      :value="item.id"
                    />
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.cablePrice" placeholder="单价" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="LED" width="400">
            <template #default="{ row }">
              <el-input v-model="row.led" placeholder="名称">
                <template #prepend>
                  <el-select v-model="row.ledTypeSelect">
                    <el-option
                      v-for="item in state.TypeSelectOptions"
                      :key="item.id"
                      :label="item.displayName"
                      :value="item.id"
                    />
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.ledPrice" placeholder="单价" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="制程" width="180">
            <template #default="{ row }">
              <el-input v-model="row.manufactureProcess" />
            </template>
          </el-table-column>
          <el-table-column label="安装位置" width="180">
            <template #default="{ row }">
              <el-input v-model="row.installationPosition" />
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ $index }">
              <el-button @click="deleteProduct($index)" type="danger">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <h6>客户指定/供应详情</h6>
        <el-button @click="generateCustomTable" type="primary" style="margin: 20px 0">点击生成</el-button>
        <el-table :data="specifyTableData" style="width: 100%" border>
          <el-table-column prop="name" label="类型" />
          <el-table-column prop="name" label="产品名称" />
          <el-table-column prop="name" label="核心部件" />
          <el-table-column prop="name" label="品牌/型号" />
          <el-table-column label="单价">
            <template #default="{ row }">
              <el-input v-model="row.prize" />
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 商务需求 -->
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="贸易方式:">
              <el-input v-model="state.quoteForm.tradeMode" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="销售类型:">
              <el-select v-model="state.quoteForm.salesType" placeholder="Select">
                <el-option
                  v-for="item in state.salesTypeOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="付款方式:"> <el-input v-model="state.quoteForm.paymentMethod" /> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报价币种:">
              <el-select v-model="state.quoteForm.currency" placeholder="Select">
                <el-option
                  v-for="item in state.currencyOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户目标价:">
              <el-input v-model="state.quoteForm.customerTargetPrice" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="汇率:"> <el-input v-model="state.quoteForm.exchangeRate" /> </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户特殊性要求:">
              <el-input type="textarea" :rows="10" v-model="state.quoteForm.customerSpecialRequest" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 其它 -->
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="运输方式:">
              <el-select v-model="state.quoteForm.shippingType" placeholder="Select">
                <el-option
                  v-for="item in state.shippingTypeOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="包装方式:">
              <el-select v-model="state.quoteForm.packagingType" placeholder="Select">
                <el-option
                  v-for="item in state.packagingTypeOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="核价要求完成时间:">
              <el-date-picker type="date" placeholder="Pick a day" v-model="state.quoteForm.deadline" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目经理:">
              <el-input :suffix-icon="Search" v-model="state.quoteForm.projectManager" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交货地点:">
              <el-input type="textarea" :rows="10" v-model="state.quoteForm.placeOfDelivery" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-upload
                v-model:file-list="fileList"
                action="http://139.196.216.165:44311/api/services/app/FileCommonService/UploadFile"
                :on-success="handleSuccess"
                :on-change="handleFileChange"
                multiple
              >
                <el-button>SOR文件上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" size="large" style="float: right; margin: 20px 0" @click="save">提交</el-button>
      </el-card>
    </el-form>
    <div class="demand-apply__step">
      <el-steps :active="1" direction="vertical">
        <el-step title="Step 1" description="Some description" />
        <el-step title="Step 2" description="Some description" />
        <el-step title="Step 3" description="Some description" />
      </el-steps>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, toRefs, watch } from "vue"
// import { useRouter } from "vue-router"
import { Search } from "@element-plus/icons-vue"
// import SearchPerson from '@/components/SearchPerson'
// import type { UploadProps, UploadUserFile, ElMessage, ElMessageBox } from "element-plus"
import type { UploadProps, UploadUserFile } from "element-plus"
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults"
// import type { User } from "./data.type"
import _ from "lodash"
// import type { User, InputModal } from "./data.type"
import { saveApplyInfo } from "@/api/demandApply"
import { getDictionaryAndDetail } from "@/api/dictionary"

import dayjs from "dayjs"

interface Product {
  id: string
  name: string
  amount1: string
  amount2: string
  amount3: number
}
interface Options {
  id: number
  displayName: string
}
interface SummaryMethodProps<T = Product> {
  columns: TableColumnCtx<T>[]
  data: T[]
}

const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param
  const sums: string[] = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "Total Cost"
      return
    }
    const values = data.map((item) => Number(item.name))
    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = `$ ${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
    } else {
      sums[index] = "N/A"
    }
  })

  return sums
}
let userStorage = window.sessionStorage.getItem("user")
let userInfo: any = userStorage ? JSON.parse(userStorage) : {}
const state = reactive({
  quoteForm: {
    title: "" as any,
    drafter: "",
    drafterNumber: "",
    draftingDepartment: "",
    draftingCompany: "",
    draftDate: new Date(),
    number: "",
    projectName: "",
    projectCode: "",
    customerName: "",
    customerNature: "",
    terminalName: "",
    terminalNature: "",
    quotationType: "",
    sampleQuotationType: "",
    sopTime: new Date(),
    projectCycle: 0,
    pcs: [] as any,
    modelCount: [] as any,
    requirement: [] as any,
    allocationOfMouldCost: 0,
    allocationOfFixtureCost: 0,
    allocationOfEquipmentCost: 0,
    reliabilityCost: 0,
    developmentCost: 0,
    landingFactory: 0,
    productInformation: [] as any,
    tradeMode: "",
    salesType: 0,
    paymentMethod: "",
    currency: 0,
    customerTargetPrice: 0,
    exchangeRate: 0,
    customerSpecialRequest: "",
    shippingType: 0,
    packagingType: 0,
    placeOfDelivery: "",
    deadline: "",
    projectManager: 0,
    sorFile: [] as any
  },
  yearCols: [] as Number[],
  customerNatureOptions: [] as unknown as Options[],
  terminalNatureOptions: [] as unknown as Options[],
  quotationTypeOptions: [] as unknown as Options[],
  sampleQuotationTypeOptions: [] as unknown as Options[],
  countryOptions: [] as unknown as Options[],
  productOptions: [] as unknown as Options[],
  productTypeOptions: [] as unknown as Options[],
  allocationOfMouldCostOptions: [] as unknown as Options[],
  allocationOfFixtureCostOptions: [] as unknown as Options[],
  allocationOfEquipmentCostOptions: [] as unknown as Options[],
  reliabilityCostOptions: [] as unknown as Options[],
  developmentCostOptions: [] as unknown as Options[],
  landingFactoryOptions: [] as unknown as Options[],
  salesTypeOptions: [] as unknown as Options[],
  currencyOptions: [] as unknown as Options[],
  shippingTypeOptions: [] as unknown as Options[],
  packagingTypeOptions: [] as unknown as Options[],
  TypeSelectOptions: [] as unknown as Options[]
})
const fileList = ref<UploadUserFile[]>([
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
  }
])
const yearCount = ref(0)
// pcs 数据类型
interface Pcs {
  carFactory: String
  carModel: String
  pcsYearList: YearListItem[]
  sum: Number
}
interface YearListItem {
  year: any
  quantity: string | number
}
const pcsYearQuantitySum = (row: Pcs) => {
  let sum = 0
  row.pcsYearList.forEach((item: any) => {
    sum = sum + Number(item.quantity)
  })
  row.sum = sum
}
interface modelCount {
  partNumber: String | null | Number
  product: Number
  productType: Number
  marketShare: Number
  moduleCarryingRate: Number
  singleCarProductsQuantity: Number
  modelTotal: Number
  modelCountYearList: YearListItem[]
}
const modelCountYearListQuantitySum = (row: modelCount) => {
  let sum = 0
  row.modelCountYearList.forEach((item: any) => {
    sum = sum + Number(item.quantity)
  })
  row.modelTotal = sum
}
const save = async () => {
  let { quoteForm } = state
  quoteForm.pcs = pcsTableData
  quoteForm.modelCount = moduleTableData
  quoteForm.requirement = requireTableData
  quoteForm.productInformation = productTableData
  quoteForm.sorFile = fileList.value.map((item: any) => item.response.result.fileId)
  debugger
  let res = await saveApplyInfo(quoteForm)
  console.log(res)
}
//终端走量（PCS）table
const pcsTableData: Pcs[] = reactive([
  {
    carFactory: "",
    carModel: "",
    pcsYearList: [] as YearListItem[],
    sum: 0
  }
])
//模组数量table
const moduleTableData: modelCount[] = reactive([
  {
    partNumber: "",
    product: 0,
    productType: 0,
    marketShare: 0,
    moduleCarryingRate: 0,
    singleCarProductsQuantity: 0,
    modelTotal: 0,
    modelCountYearList: [] as YearListItem[]
  }
])
interface requireData {
  annualDeclineRate: Number
  annualRebateRequirements: Number
  oneTimeDiscountRate: Number
  year: Number
}
//要求
const requireTableData: requireData[] = reactive([])
//产品零件
interface productModel {
  /**
   * 线缆
   */
  cable: string
  /**
   * 线缆 单价
   */
  cablePrice?: number | null
  /**
   * 线缆
   * 类型选择（字典明细表主键，根据字典名，调用【FinanceDictionary/GetFinanceDictionaryAndDetailByName】取字典，字典名Name是【TypeSelect】）
   */
  cableTypeSelect: number
  /**
   * 安装位置
   */
  installationPosition: string
  /**
   * LED
   */
  led: string
  /**
   * LED 单价
   */
  ledPrice?: number | null
  /**
   * LED
   * 类型选择（字典明细表主键，根据字典名，调用【FinanceDictionary/GetFinanceDictionaryAndDetailByName】取字典，字典名Name是【TypeSelect】）
   */
  ledTypeSelect: number
  /**
   * Lens
   */
  lens: string
  /**
   * Lens单价
   */
  lensPrice?: number | null
  /**
   *
   * Lens类型选择（字典明细表主键，根据字典名，调用【FinanceDictionary/GetFinanceDictionaryAndDetailByName】取字典，字典名Name是【TypeSelect】）
   */
  lensTypeSelect: number
  /**
   * isp
   */
  isp: string
  /**
   * Lsp单价
   */
  ispPrice?: number | null
  /**
   *
   * Lsp类型选择（字典明细表主键，根据字典名，调用【FinanceDictionary/GetFinanceDictionaryAndDetailByName】取字典，字典名Name是【TypeSelect】）
   */
  ispTypeSelect: number
  /**
   * 制程
   */
  manufactureProcess: string
  /**
   * 产品名称
   */
  name: string
  /**
   * Sensor
   */
  sensor: string
  /**
   * Sensor单价
   */
  sensorPrice?: number | null
  /**
   *
   * Sensor类型选择（字典明细表主键，根据字典名，调用【FinanceDictionary/GetFinanceDictionaryAndDetailByName】取字典，字典名Name是【TypeSelect】）
   */
  sensorTypeSelect: number
  /**
   * 串行芯片
   */
  serialChip: string
  /**
   * 串行芯片 单价
   */
  serialChipPrice?: number | null
  /**
   * 串行芯片
   * 类型选择（字典明细表主键，根据字典名，调用【FinanceDictionary/GetFinanceDictionaryAndDetailByName】取字典，字典名Name是【TypeSelect】）
   */
  serialChipTypeSelect: number
}
const productTableData: productModel[] = reactive([
  {
    name: "",
    sensor: "",
    sensorTypeSelect: 0,
    sensorPrice: 0,
    lens: "",
    lensTypeSelect: 0,
    lensPrice: 0,
    isp: "",
    ispTypeSelect: 0,
    ispPrice: 0,
    serialChip: "",
    serialChipTypeSelect: 0,
    serialChipPrice: 0,
    cable: "",
    cableTypeSelect: 0,
    cablePrice: 0,
    led: "",
    ledTypeSelect: 0,
    ledPrice: 0,
    manufactureProcess: "",
    installationPosition: ""
  }
])
//指定
interface specifyModel {
  main: string
  price: number | null | undefined
  productName: string
  type: string
  productType: string
}
const specifyTableData: specifyModel[] = reactive([])
const addPCS = () => {
  pcsTableData.push(_.cloneDeep(pcsTableData[0]))
}
const addProduct = () => {
  moduleTableData.push(_.cloneDeep(moduleTableData[0]))
  productTableData.push(_.cloneDeep(productTableData[0]))
}

const yearChange = (val: number | undefined) => {
  if (val) {
    yearCount.value = val
    let i = state.quoteForm.projectCycle
    state.yearCols = []
    for (let j = 0; j < i; j++) {
      state.yearCols.push(state.quoteForm.sopTime.getFullYear() + j)
    }
    console.log(state.yearCols, "state.yearCols ")
  }
}

// 监听年数的变化，对应表格赋值年份
watch(
  () => state.yearCols,
  (val) => {
    pcsTableData.forEach((row) => {
      row.pcsYearList = val.map((item) => {
        return {
          year: item,
          quantity: 0
        }
      })
    })
    moduleTableData.forEach((row) => {
      row.modelCountYearList = val.map((item) => {
        return {
          year: item,
          quantity: 0
        }
      })
    })
    // 要求表格动态加载行数
    requireTableData.splice(0, requireTableData.length)
    val.forEach((year) => {
      requireTableData.push({
        year,
        annualDeclineRate: 0,
        annualRebateRequirements: 0,
        oneTimeDiscountRate: 0
      })
    })

    console.log(pcsTableData)
  }
)
const deleteProduct = (i: number) => {
  moduleTableData.splice(i, 1)
  productTableData.splice(i, 1)
}
const deletePcs = (i: number) => {
  pcsTableData.splice(i, 1)
}

const handleSuccess: UploadProps["onSuccess"] = (res: any) => {
  console.log(res)
}
const handleFileChange: UploadProps["onChange"] = (file, uploadFiles) => {
  console.log(uploadFiles)
  console.log(fileList, "fileList")
}

const generateTitle = () => {
  let { quoteForm } = state
  let nowDate = dayjs(quoteForm.draftDate ? quoteForm.draftDate : new Date()).format("YYYY-MM-DD")
  let userDepartment = quoteForm.draftingDepartment
  let title = `${nowDate + userDepartment}关于${quoteForm.customerName + quoteForm.projectName}的核价报价申请`
  state.quoteForm.title = title
}
const generateCustomTable = () => {
  specifyTableData.splice(0, specifyTableData.length) // 清空数据
  productTableData.forEach((item) => {
    if (item.sensorTypeSelect === 1) {
      let price = item.sensorPrice
      let productName = item.name
      let main = "sensor"
      let type = item.sensor
      let productType = "客户指定"
      specifyTableData.push({
        price,
        productName,
        main,
        type,
        productType
      })
    }
    if (item.lensTypeSelect === 1) {
      let price = item.lensPrice
      let productName = item.name
      let main = "lens"
      let type = item.lens
      let productType = "客户指定"
      specifyTableData.push({
        price,
        productName,
        main,
        type,
        productType
      })
    }
    if (item.ispTypeSelect === 1) {
      let price = item.ispPrice
      let productName = item.name
      let main = "isp"
      let type = item.isp
      let productType = "客户指定"
      specifyTableData.push({
        price,
        productName,
        main,
        type,
        productType
      })
    }
    if (item.serialChipTypeSelect === 1) {
      let price = item.serialChipPrice
      let productName = item.name
      let main = "serialChip"
      let type = item.serialChip
      let productType = "客户指定"
      specifyTableData.push({
        price,
        productName,
        main,
        type,
        productType
      })
    }
    if (item.ledTypeSelect === 1) {
      let price = item.ledPrice
      let productName = item.name
      let main = "led"
      let type = item.led
      let productType = "客户指定"
      specifyTableData.push({
        price,
        productName,
        main,
        type,
        productType
      })
    }
  })
}
onMounted(async () => {
  state.quoteForm.drafter = userInfo.name
  state.quoteForm.drafterNumber = userInfo.userNumber
  state.quoteForm.draftingCompany = userInfo.userCompany
  state.quoteForm.draftingDepartment = userInfo.userDepartment
  let customerNature: any = await getDictionaryAndDetail("CustomerNature") //客户性质
  state.customerNatureOptions = customerNature.result.financeDictionaryDetailList

  let terminalNature: any = await getDictionaryAndDetail("TerminalNature") //终端性质
  state.terminalNatureOptions = terminalNature.result.financeDictionaryDetailList

  let quotationType: any = await getDictionaryAndDetail("QuotationType") //报价形式
  state.quotationTypeOptions = quotationType.result.financeDictionaryDetailList

  let sampleQuotationType: any = await getDictionaryAndDetail("SampleQuotationType") //样品报价类型
  state.sampleQuotationTypeOptions = sampleQuotationType.result.financeDictionaryDetailList

  let country: any = await getDictionaryAndDetail("Country") // 客户国家
  state.countryOptions = country.result.financeDictionaryDetailList

  let product: any = await getDictionaryAndDetail("Product") // 产品
  state.productOptions = product.result.financeDictionaryDetailList

  let productType: any = await getDictionaryAndDetail("ProductType") // 产品小类
  state.productTypeOptions = productType.result.financeDictionaryDetailList

  let allocationOfMouldCost: any = await getDictionaryAndDetail("AllocationOfMouldCost") // 模具费分摊
  state.allocationOfMouldCostOptions = allocationOfMouldCost.result.financeDictionaryDetailList

  let allocationOfFixtureCost: any = await getDictionaryAndDetail("AllocationOfFixtureCost") //治具费分摊
  state.allocationOfFixtureCostOptions = allocationOfFixtureCost.result.financeDictionaryDetailList

  let allocationOfEquipmentCost: any = await getDictionaryAndDetail("AllocationOfEquipmentCost") // 设备费分摊
  state.allocationOfEquipmentCostOptions = allocationOfEquipmentCost.result.financeDictionaryDetailList

  let reliabilityCost: any = await getDictionaryAndDetail("ReliabilityCost") //信赖性费用分摊
  state.reliabilityCostOptions = reliabilityCost.result.financeDictionaryDetailList

  let developmentCost: any = await getDictionaryAndDetail("DevelopmentCost") //开发费分摊
  state.developmentCostOptions = developmentCost.result.financeDictionaryDetailList

  let landingFactory: any = await getDictionaryAndDetail("LandingFactory") //落地工厂
  state.landingFactoryOptions = landingFactory.result.financeDictionaryDetailList

  let salesType: any = await getDictionaryAndDetail("SalesType") //销售类型
  state.salesTypeOptions = salesType.result.financeDictionaryDetailList

  let currency: any = await getDictionaryAndDetail("Currency") //报价币种
  state.currencyOptions = currency.result.financeDictionaryDetailList

  let shippingType: any = await getDictionaryAndDetail("ShippingType") //运输方式
  state.shippingTypeOptions = shippingType.result.financeDictionaryDetailList

  let packagingType: any = await getDictionaryAndDetail("PackagingType") //包装方式
  state.packagingTypeOptions = packagingType.result.financeDictionaryDetailList

  let typeSelect: any = await getDictionaryAndDetail("TypeSelect") //类型
  state.TypeSelectOptions = typeSelect.result.financeDictionaryDetailList

  console.log(
    customerNature,
    terminalNature,
    quotationType,
    sampleQuotationType,
    country,
    product,
    productType,
    allocationOfMouldCost,
    allocationOfFixtureCost,
    allocationOfEquipmentCost,
    reliabilityCost,
    developmentCost,
    landingFactory,
    salesType,
    currency,
    shippingType,
    packagingType
  )
})
// const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
//   ElMessage.warning(
//     `The limit is 3, you selected ${files.length} files this time, add up to ${
//       files.length + uploadFiles.length
//     } totally`
//   )
// }

// const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
//   return ElMessageBox.confirm(`Cancel the transfert of ${uploadFile.name} ?`).then(
//     () => true,
//     () => false
//   )
// }
defineExpose({
  ...toRefs(state)
})
</script>

<style lang="scss" scoped>
.demand-apply {
  &__step {
    margin: 20px 0;
    height: 400px;
  }
  &__card {
    margin: 10px 0;
  }
  &__mass-production-table {
    margin: 20px 0;
  }
  &__btn-container {
    height: 60px;
    position: relative;
  }
  &__add-btn {
    position: absolute;
    right: 0px;
    top: 15px;
  }
}
</style>
