<template>
  <div class="demand-apply">
    <el-form :model="state.quoteForm" ref="refForm" :rules="rules">
      <!-- 拟稿人信息 -->
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="标题:" prop="title">
              <el-input v-model="state.quoteForm.title">
                <template #append>
                  <el-button @click="generateTitle">自动生成</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿人:" prop="drafter">
              <el-input v-model="state.quoteForm.drafter" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿人工号:" prop="drafterNumber">
              <el-input v-model="state.quoteForm.drafterNumber" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿公司:" prop="draftingCompany">
              <el-input v-model="state.quoteForm.draftingCompany" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿部门:" prop="draftingDepartment">
              <el-input v-model="state.quoteForm.draftingDepartment" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿日期:" prop="draftDate">
              <el-date-picker v-model="state.quoteForm.draftDate" @change="generateTitle" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单据编号:" prop="number">
              <el-input v-model="state.quoteForm.number" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 项目信息 -->
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目名称:" prop="projectName">
              <el-input v-model="state.quoteForm.projectName" placeholder="与PLM系统保持一致" @change="generateTitle" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目代码:" prop="projectCode">
              <el-input v-model="state.quoteForm.projectCode" placeholder="与PLM系统保持一致" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户名称:" prop="customerName">
              <el-input v-model="state.quoteForm.customerName" @change="generateTitle" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户性质:" prop="customerNature">
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
            <el-form-item label="终端名称:" prop="terminalName">
              <el-input v-model="state.quoteForm.terminalName" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="终端性质:" prop="terminalNature">
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
            <el-form-item label="报价形式:" prop="quotationType">
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
          <!-- <el-col :span="6">
            <el-form-item label="样品报价类型:" prop="sampleQuotationType">
              <el-select v-model="state.quoteForm.sampleQuotationType" placeholder="Select">
                <el-option
                  v-for="item in state.sampleQuotationTypeOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="sop时间:" prop="sopTime">
              <el-date-picker
                type="year"
                placeholder="Pick a year"
                v-model="state.quoteForm.sopTime"
                value-format="YYYY"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目周期:" prop="projectCycle">
              <el-input-number v-model="state.quoteForm.projectCycle" @change="yearChange" :min="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <h5>项目走量</h5>
        <h6>终端走量（单位：PCS）</h6>
        <div class="demand-apply__btn-container">
          <el-button type="primary" class="demand-apply__add-btn" @click="addPCS">新增</el-button>
        </div>
        <el-table :data="pcsTableData" style="width: 100%" border :summary-method="getSummaries" show-summary>
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
          <el-table-column :label="year + ''" v-for="(year, index) in state.yearCols" :key="year + ''" width="100">
            <template #default="{ row }">
              <el-input v-model="row.pcsYearList[index].quantity" @input="pcsYearQuantitySum(row)" />
            </template>
          </el-table-column>
          <el-table-column prop="rowSum" label="合计" />
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
        <el-table :data="moduleTableData" style="width: 100%" border>
          <el-table-column type="index" width="50" />
          <el-table-column label="客户零件号" width="180">
            <template #default="{ row }">
              <el-input v-model="row.partNumber" placeholder="若没有，填写 /" />
            </template>
          </el-table-column>
          <el-table-column label="产品名称" width="180">
            <template #default="{ row }">
              <el-input v-model="row.product" />
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
              <el-input v-model="row.marketShare">
                <template #append>%</template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="模组搭载率" width="180">
            <template #default="{ row }">
              <el-input v-model="row.moduleCarryingRate">
                <template #append>%</template>
              </el-input>
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
          <el-table-column label="模组总量" prop="modelTotal" width="180">
            <template #default="{ row }">
              <el-input v-model="row.modelTotal" />
            </template>
          </el-table-column>
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
          <el-table-column label="年降率(%)">
            <template #default="{ row }">
              <el-input v-model="row.annualDeclineRate">
                <template #append>%</template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="年度返利要求(%)">
            <template #default="{ row }">
              <el-input v-model="row.annualRebateRequirements">
                <template #append>%</template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="一次性折让率(%)">
            <template #default="{ row }">
              <el-input v-model="row.oneTimeDiscountRate">
                <template #append>%</template>
              </el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="模具费分摊:" prop="allocationOfMouldCost">
              <el-select v-model="state.quoteForm.allocationOfMouldCost" placeholder="Select">
                <el-option :value="true" label="是" />
                <el-option :value="false" label="否" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="治具费分摊:" prop="allocationOfFixtureCost">
              <el-select v-model="state.quoteForm.allocationOfFixtureCost" placeholder="Select">
                <el-option :value="true" label="是" />
                <el-option :value="false" label="否" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="设备费分摊:" prop="allocationOfEquipmentCost">
              <el-select v-model="state.quoteForm.allocationOfEquipmentCost" placeholder="Select">
                <el-option :value="true" label="是" />
                <el-option :value="false" label="否" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信赖性费用分摊:" prop="reliabilityCost">
              <el-select v-model="state.quoteForm.reliabilityCost" placeholder="Select">
                <el-option :value="true" label="是" />
                <el-option :value="false" label="否" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开发费分摊:" prop="developmentCost">
              <el-select v-model="state.quoteForm.developmentCost" placeholder="Select">
                <el-option :value="true" label="是" />
                <el-option :value="false" label="否" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="落地工厂:" prop="landingFactory">
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
          <el-table-column label="目标价" width="180" fixed="left">
            <template #default="{ row }">
              <el-input v-model="row.name">
                <template #append>元</template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="Sensor" width="400">
            <template #default="{ row }">
              <el-input v-model="row.sensor" placeholder="品牌/型号">
                <template #prepend>
                  <el-select v-model="row.sensorTypeSelect">
                    <el-option label="我司推荐" :value="1" />
                    <el-option label="客户指定" :value="2" />
                    <el-option label="客户供应" :value="3" />
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.sensorPrice" placeholder="单价">
                    <template #append>元</template>
                  </el-input>
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="Lens" width="400">
            <template #default="{ row }">
              <el-input v-model="row.lens" placeholder="品牌/型号">
                <template #prepend>
                  <el-select v-model="row.lensTypeSelect">
                    <el-option label="我司推荐" :value="1" />
                    <el-option label="客户指定" :value="2" />
                    <el-option label="客户供应" :value="3" />
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.lensPrice" placeholder="单价">
                    <template #append>元</template>
                  </el-input>
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="ISP" width="400">
            <template #default="{ row }">
              <el-input v-model="row.isp" placeholder="品牌/型号">
                <template #prepend>
                  <el-select v-model="row.ispTypeSelect">
                    <el-option label="我司推荐" :value="1" />
                    <el-option label="客户指定" :value="2" />
                    <el-option label="客户供应" :value="3" />
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.ispPrice" placeholder="单价">
                    <template #append>元</template>
                  </el-input>
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="串行芯片" width="400">
            <template #default="{ row }">
              <el-input v-model="row.serialChip" placeholder="品牌/型号">
                <template #prepend>
                  <el-select v-model="row.serialChipTypeSelect">
                    <el-option label="我司推荐" :value="1" />
                    <el-option label="客户指定" :value="2" />
                    <el-option label="客户供应" :value="3" />
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.serialChipPrice" placeholder="单价">
                    <template #append>元</template>
                  </el-input>
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="线缆" width="400">
            <template #default="{ row }">
              <el-input v-model="row.cable" placeholder="品牌/型号">
                <template #prepend>
                  <el-select v-model="row.cableTypeSelect">
                    <el-option label="我司推荐" :value="1" />
                    <el-option label="客户指定" :value="2" />
                    <el-option label="客户供应" :value="3" />
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.cablePrice" placeholder="单价">
                    <template #append>元</template>
                  </el-input>
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="LED" width="400">
            <template #default="{ row }">
              <el-input v-model="row.led" placeholder="品牌/型号">
                <template #prepend>
                  <el-select v-model="row.ledTypeSelect">
                    <el-option label="我司推荐" :value="1" />
                    <el-option label="客户指定" :value="2" />
                    <el-option label="客户供应" :value="3" />
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.ledPrice" placeholder="单价">
                    <template #append>元</template>
                  </el-input>
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
        </el-table>
        <h6>客户指定/供应详情</h6>
        <el-button @click="generateCustomTable" type="primary" style="margin: 20px 0">点击生成</el-button>
        <el-table :data="specifyTableData" style="width: 100%" border>
          <el-table-column prop="productType" label="类型" />
          <el-table-column prop="productName" label="产品名称" />
          <el-table-column prop="main" label="核心部件" />
          <el-table-column prop="type" label="品牌/型号" />
          <el-table-column prop="price" label="单价" />
        </el-table>
      </el-card>
      <!-- 商务需求 -->
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="贸易方式:" prop="tradeMode">
              <el-input v-model="state.quoteForm.tradeMode" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="销售类型:" prop="salesType">
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
            <el-form-item label="付款方式:" prop="paymentMethod">
              <el-input v-model="state.quoteForm.paymentMethod" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报价币种:" prop="currency">
              <el-select v-model="state.quoteForm.currency" placeholder="Select" @change="rateChange">
                <!-- <el-option
                  v-for="item in state.currencyOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                /> -->
                <el-option
                  v-for="item in state.ExchangeSelectOptions"
                  :key="item.id"
                  :label="item.exchangeRateKind"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户目标价:" prop="customerTargetPrice">
              <el-input v-model="state.quoteForm.customerTargetPrice" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="汇率:" prop="exchangeRate">
              <el-input v-model="state.quoteForm.exchangeRate" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户特殊性要求:" prop="customerSpecialRequest">
              <el-input type="textarea" :rows="10" v-model="state.quoteForm.customerSpecialRequest" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 其它 -->
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="运输方式:" prop="shippingType">
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
            <el-form-item label="包装方式:" prop="packagingType">
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
            <el-form-item label="核价要求完成时间:" prop="deadline">
              <el-date-picker type="date" placeholder="Pick a day" v-model="state.quoteForm.deadline" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目经理:" prop="projectManager">
              <SearchPerson v-model="state.quoteForm.projectManager" />
              <!-- <el-input :suffix-icon="Search" v-model="state.quoteForm.projectManager" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出口国家:" prop="country">
              <el-select v-model="state.quoteForm.country" placeholder="Select">
                <el-option
                  v-for="item in state.countryOptions"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交货地点:" prop="placeOfDelivery">
              <el-input type="textarea" :rows="10" v-model="state.quoteForm.placeOfDelivery" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核价原因:" prop="reason">
              <el-input type="textarea" :rows="10" v-model="state.quoteForm.reason" />
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
        <el-button type="primary" size="large" style="float: right; margin: 20px 0" @click="save(refForm)"
          >提交</el-button
        >
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
import { productTypeMap, Pcs, YearListItem, modelCount, productModel, specifyModel, requireData } from "./data.type"
// import getQuery from "@/utils/getQuery"
import { useRoute } from "vue-router"
// import { Search } from "@element-plus/icons-vue"

import type { UploadProps, UploadUserFile } from "element-plus"
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults"
import _ from "lodash"
import { saveApplyInfo, getExchangeRate } from "./service"
import { getDictionaryAndDetail } from "@/api/dictionary"
import type { FormInstance, FormRules } from "element-plus"
import { ElMessage } from "element-plus"
import { SearchPerson } from "@/components/SearchPerson"
import dayjs from "dayjs"
const refForm = ref<FormInstance>()
interface Options {
  id: number
  displayName: string
}
interface SummaryMethodProps<T = Pcs> {
  columns: TableColumnCtx<T>[]
  data: T[]
}
const rules = reactive<FormRules>({
  projectName: [{ required: true, message: "请输入该值", trigger: "blur" }],
  projectCode: [{ required: true, message: "请输入该值", trigger: "blur" }],
  customerName: [{ required: true, message: "请输入该值", trigger: "blur" }],
  customerNature: [{ required: true, message: "请输入该值", trigger: "blur" }],
  country: [{ required: true, message: "请输入该值", trigger: "blur" }],
  quotationType: [{ required: true, message: "请输入该值", trigger: "blur" }],
  sopTime: [{ required: true, message: "请输入该值", trigger: "blur" }],
  projectCycle: [{ required: true, message: "请输入该值", trigger: "blur" }],
  allocationOfMouldCost: [{ required: true, message: "请输入该值", trigger: "blur" }],
  allocationOfFixtureCost: [{ required: true, message: "请输入该值", trigger: "blur" }],
  allocationOfEquipmentCost: [{ required: true, message: "请输入该值", trigger: "blur" }],
  reliabilityCost: [{ required: true, message: "请输入该值", trigger: "blur" }],
  developmentCost: [{ required: true, message: "请输入该值", trigger: "blur" }],
  landingFactory: [{ required: true, message: "请输入该值", trigger: "blur" }],
  tradeMode: [{ required: true, message: "请输入该值", trigger: "blur" }],
  salesType: [{ required: true, message: "请输入该值", trigger: "blur" }],
  paymentMethod: [{ required: true, message: "请输入该值", trigger: "blur" }],
  currency: [{ required: true, message: "请输入该值", trigger: "blur" }],
  customerTargetPrice: [{ required: true, message: "请输入该值", trigger: "blur" }],
  customerSpecialRequest: [{ required: true, message: "请输入该值", trigger: "blur" }],
  shippingType: [{ required: true, message: "请输入该值", trigger: "blur" }],
  packagingType: [{ required: true, message: "请输入该值", trigger: "blur" }],
  placeOfDelivery: [{ required: true, message: "请输入该值", trigger: "blur" }],
  deadline: [{ required: true, message: "请输入该值", trigger: "blur" }],
  projectManager: [{ required: true, message: "请输入该值", trigger: "blur" }],
  sorFile: [{ required: true, message: "请输入该值", trigger: "blur" }]
})
const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param
  const sums: string[] | number[] = []

  let arr = new Array(data[0].pcsYearList.length).fill(0).map(() => {
    return [] as number[]
  })
  data.forEach((item) => {
    item.pcsYearList.forEach((year, i) => {
      arr[i]?.push(Number(year.quantity))
    })
  })
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "合计"
      return
    }
    if (index >= 2) {
      let i = index - 2
      sums[index] = arr[i]?.reduce((prev, curr) => {
        return prev + curr
      })
    } else {
      sums[index] = "N/A"
    }
  })
  state.sumArr = [] as number[]
  sums.forEach((sum) => {
    if (typeof sum === "number") {
      state.sumArr.push(sum)
    }
  })
  if (state.sumArr.length > 0) {
    state.carAnnualTotal = state.sumArr.reduce((prev, curr) => {
      return prev + curr
    })
  }
  // console.log(sums, "sums", state.carAnnualTotal, state.sumArr)
  return sums
}
let userStorage = window.sessionStorage.getItem("user")
let userInfo: any = userStorage ? JSON.parse(userStorage) : {}
const state = reactive({
  quoteForm: {
    title: "" as any,
    drafter: "",
    drafterNumber: null,
    draftingDepartment: "",
    draftingCompany: "",
    draftDate: new Date(),
    number: "",
    projectName: "",
    projectCode: "",
    customerName: "",
    customerNature: "",
    country: "",
    terminalName: "",
    terminalNature: "",
    quotationType: "",
    // sampleQuotationType: "测试mock",
    sopTime: dayjs(new Date()).format("YYYY"),
    projectCycle: 0,
    pcs: [] as any,
    modelCount: [] as any,
    requirement: [] as any,
    allocationOfMouldCost: true,
    allocationOfFixtureCost: true,
    allocationOfEquipmentCost: true,
    reliabilityCost: true,
    developmentCost: true,
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
    deadline: new Date(),
    projectManager: "",
    sorFile: [] as any,
    reason: "",
    auditFlowId: 5 //默认先给一个5
  },
  yearCols: [] as Number[],
  carAnnualTotal: 0, //列年度总量，把sum取出
  sumArr: [] as number[],
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
  TypeSelectOptions: [] as unknown as Options[],
  ExchangeSelectOptions: [] as any
})
const fileList = ref<UploadUserFile[]>([])
const yearCount = ref(0)
let route = useRoute()
const pcsYearQuantitySum = (row: Pcs) => {
  let rowSum = 0
  row.pcsYearList.forEach((item: any) => {
    rowSum = rowSum + Number(item.quantity)
  })
  row.rowSum = rowSum
}

const modelCountYearListQuantitySum = (row: modelCount) => {
  console.log("暂时功能先去掉", row)
  // let sum = 0
  // row.modelCountYearList.forEach((item: any) => {
  //   sum = sum + Number(item.quantity)
  // })
  // row.modelTotal = sum
}
const save = async (formEl: FormInstance | undefined) => {
  let { auditFlowId } = route.query
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let { quoteForm } = state
      quoteForm.auditFlowId = auditFlowId ? Number(auditFlowId) : 5
      quoteForm.pcs = pcsTableData
      quoteForm.modelCount = moduleTableData
      quoteForm.requirement = requireTableData
      quoteForm.productInformation = productTableData
      quoteForm.sorFile = fileList.value.map((item: any) => item.response.result.fileId)
      let res: any = await saveApplyInfo(quoteForm)
      console.log(res)
      if (res.success) {
        ElMessage({
          type: "success",
          message: "保存成功"
        })
      }
    } else {
      console.log("error submit!", fields)
      console.log(state.quoteForm, "quoteForm")
    }
  })
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
    product: "",
    productType: 0,
    marketShare: 0,
    moduleCarryingRate: 0,
    singleCarProductsQuantity: 0,
    modelTotal: 0,
    modelCountYearList: [] as YearListItem[]
  }
])

//要求
const requireTableData: requireData[] = reactive([])

const productTableData: productModel[] = reactive([
  {
    name: "",
    sensor: "",
    sensorTypeSelect: 1,
    sensorPrice: 0,
    lens: "",
    lensTypeSelect: 1,
    lensPrice: 0,
    isp: "",
    ispTypeSelect: 1,
    ispPrice: 0,
    serialChip: "",
    serialChipTypeSelect: 1,
    serialChipPrice: 0,
    cable: "",
    cableTypeSelect: 1,
    cablePrice: 0,
    led: "",
    ledTypeSelect: 1,
    ledPrice: 0,
    manufactureProcess: "",
    installationPosition: ""
  }
])

const specifyTableData: specifyModel[] = reactive([])
const addPCS = () => {
  // let newLine = {
  //   carFactory: "",
  //   carModel: "",
  //   pcsYearList: [] as YearListItem[],
  //   sum: 0
  // }
  pcsTableData.push(_.cloneDeep(pcsTableData[0]))
  // pcsTableData.push(Object.assign({}, _.cloneDeep(pcsTableData[0]), newLine))
}
const addProduct = () => {
  let newLineP = {
    name: "",
    sensor: "",
    sensorTypeSelect: 1,
    sensorPrice: 0,
    lens: "",
    lensTypeSelect: 1,
    lensPrice: 0,
    isp: "",
    ispTypeSelect: 1,
    ispPrice: 0,
    serialChip: "",
    serialChipTypeSelect: 1,
    serialChipPrice: 0,
    cable: "",
    cableTypeSelect: 1,
    cablePrice: 0,
    led: "",
    ledTypeSelect: 1,
    ledPrice: 0,
    manufactureProcess: "",
    installationPosition: ""
  }
  productTableData.push(Object.assign(_.cloneDeep(productTableData[0]), newLineP))
  let moduleTableDataNew = Object.assign(_.cloneDeep(moduleTableData[0]), {
    partNumber: "",
    product: "",
    productType: 0,
    marketShare: 0,
    moduleCarryingRate: 0,
    singleCarProductsQuantity: 0,
    modelTotal: 0
  })
  moduleTableDataNew.modelCountYearList.forEach((item) => {
    item.quantity = ""
  })
  moduleTableData.push(moduleTableDataNew)
  // productTableData.push(_.cloneDeep(productTableData[0]))
  // moduleTableData.push(newLineM)
  // productTableData.push(newLineP)
  //模组上的产品名称进行复制
  productTableData.forEach((item, index) => {
    item.name = moduleTableData[index].product
  })
}

const yearChange = (val: number | undefined) => {
  if (val) {
    yearCount.value = val
    let i = state.quoteForm.projectCycle
    state.yearCols = []
    state.quoteForm.sopTime
    for (let j = 0; j < i; j++) {
      state.yearCols.push(Number(state.quoteForm.sopTime) + j)
    }
    // console.log(state.yearCols, "state.yearCols ")
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
          quantity: null
        }
      })
    })
    moduleTableData.forEach((row) => {
      row.modelCountYearList = val.map((item) => {
        return {
          year: item,
          quantity: null
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
  }
)
//同步产品名称
watch(
  moduleTableData,
  (val) => {
    val.forEach((item, index) => {
      productTableData[index].name = item.product
      moduleTableData.forEach((row) => {
        row.modelCountYearList.forEach((item, index) => {
          if (row.marketShare && row.moduleCarryingRate && row.singleCarProductsQuantity && state.sumArr[index]) {
            item.quantity =
              (row.marketShare * row.moduleCarryingRate * row.singleCarProductsQuantity * state.sumArr[index]) / 10000
          }
        })
      })
      if (item.marketShare && item.moduleCarryingRate && item.singleCarProductsQuantity && state.carAnnualTotal) {
        item.modelTotal =
          (item.marketShare * item.moduleCarryingRate * item.singleCarProductsQuantity * state.carAnnualTotal) / 10000
      }
    })
  },
  { deep: true }
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
    if (item.sensorTypeSelect !== productTypeMap.recommend) {
      let price = item.sensorPrice
      let productName = item.name
      let main = "sensor"
      let type = item.sensor
      let productType = productTypeMap[item.sensorTypeSelect] === "cspecify" ? "客户指定" : "客户供应"
      specifyTableData.push({
        price,
        productName,
        main,
        type,
        productType
      })
    }
    if (item.lensTypeSelect !== productTypeMap.recommend) {
      let price = item.lensPrice
      let productName = item.name
      let main = "lens"
      let type = item.lens
      let productType = productTypeMap[item.lensTypeSelect] === "cspecify" ? "客户指定" : "客户供应"
      specifyTableData.push({
        price,
        productName,
        main,
        type,
        productType
      })
    }
    if (item.ispTypeSelect !== productTypeMap.recommend) {
      let price = item.ispPrice
      let productName = item.name
      let main = "isp"
      let type = item.isp
      let productType = productTypeMap[item.ispTypeSelect] === "cspecify" ? "客户指定" : "客户供应"
      specifyTableData.push({
        price,
        productName,
        main,
        type,
        productType
      })
    }
    if (item.serialChipTypeSelect !== productTypeMap.recommend) {
      let price = item.serialChipPrice
      let productName = item.name
      let main = "serialChip"
      let type = item.serialChip
      let productType = productTypeMap[item.serialChipTypeSelect] === "cspecify" ? "客户指定" : "客户供应"
      specifyTableData.push({
        price,
        productName,
        main,
        type,
        productType
      })
    }
    if (item.ledTypeSelect !== productTypeMap.recommend) {
      let price = item.ledPrice
      let productName = item.name
      let main = "led"
      let type = item.led
      let productType = productTypeMap[item.ledTypeSelect] === "cspecify" ? "客户指定" : "客户供应"
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
const setNumber = () => {
  let { quoteForm } = state
  let nowDate = dayjs(quoteForm.draftDate ? quoteForm.draftDate : new Date()).format("YYYYMMDD")
  let number = "BJHJ-ZL" + nowDate + "-001"
  quoteForm.number = number
}
const rateChange = (val: any) => {
  // state.quoteForm.exchangeRate = 0
  state.ExchangeSelectOptions.forEach((item: any) => {
    if (item.id === val) {
      item.exchangeRateValue.forEach((yearItem: any) => {
        if (yearItem.year === Number(state.quoteForm.sopTime)) {
          state.quoteForm.exchangeRate = yearItem.value
        }
      })
    }
  })
}
onMounted(async () => {
  // let query = getQuery()
  // let auditFlowId = Number(query.auditFlowId)
  // console.log(auditFlowId)
  state.quoteForm.drafter = userInfo.name
  state.quoteForm.drafterNumber = userInfo.userNumber.name || "0527"
  state.quoteForm.draftingCompany = userInfo.userCompany.name || "前端假数据"
  state.quoteForm.draftingDepartment = userInfo.userDepartment.name || "前端假数据"
  // 设置单据编号
  setNumber()
  try {
    let customerNature: any = await getDictionaryAndDetail("CustomerNature") //客户性质
    state.customerNatureOptions = customerNature.result.financeDictionaryDetailList

    let terminalNature: any = await getDictionaryAndDetail("TerminalNature") //终端性质
    state.terminalNatureOptions = terminalNature.result.financeDictionaryDetailList

    let quotationType: any = await getDictionaryAndDetail("QuotationType") //报价形式
    state.quotationTypeOptions = quotationType.result.financeDictionaryDetailList

    let country: any = await getDictionaryAndDetail("Country") // 出国国家
    state.countryOptions = country.result.financeDictionaryDetailList

    let productType: any = await getDictionaryAndDetail("ProductType") // 产品小类
    state.productTypeOptions = productType.result.financeDictionaryDetailList

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

    let exchangeSelect: any = await getExchangeRate({
      maxResultCount: 100,
      skipCount: 0
    })
    state.ExchangeSelectOptions = exchangeSelect.result.items
  } catch (error) {
    console.log(error)
  }
})
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
