<template>
  <div class="margin-top">
    <el-card class="table-wrap" header="电子料单价录入界面" v-loading="tableLoading">
      <el-table :data="electronicBomList" height="75vh">
        <el-table-column prop="categoryName" label="物料大类" width="180" fixed="left" />
        <el-table-column prop="typeName" label="物料种类" width="180" fixed="left" />
        <el-table-column prop="sapItemNum" label="物料编号" width="180" fixed="left" />
        <el-table-column prop="sapItemName" label="材料名称" width="180" fixed="left" />
        <el-table-column prop="materialsUseCount" label="项目物料的使用量">
          <el-table-column
            v-for="(item, index) in allColums?.materialsUseCountYears"
            :key="item"
            :label="`${item}`"
            :prop="`materialsUseCount[${index}].value`"
            width="180"
          />
        </el-table-column>
        <el-table-column prop="currency" label="币种" width="150">
          <template #default="scope">
            <el-select v-if="scope.row.isEdit" v-model="scope.row.currency" placeholder="选择币种">
              <el-option
                v-for="item in exchangeSelectOptions"
                :key="item.id"
                :label="item.exchangeRateKind"
                :value="item.exchangeRateKind"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="systemiginalCurrency" label="系统单价（原币）">
          <el-table-column
            v-for="(item, index) in allColums?.systemiginalCurrencyYears"
            :key="item"
            :label="`${item}`"
            :prop="`systemiginalCurrency[${index}].value`"
            width="180"
          />
        </el-table-column>
        <el-table-column prop="inTheRate" label="年降率">
          <el-table-column
            v-for="(item, index) in allColums?.inTheRateYears"
            :key="item"
            :label="`${item}`"
            :prop="`inTheRate[${index}].value`"
            width="180"
          >
            <template #default="scope">
              <el-input
                v-if="scope.row.isEdit"
                v-model="scope.row.inTheRate[index].value"
                @keyup.enter="handleCalculation(scope.row, scope.$index)"
              >
                <template #append> % </template>
              </el-input>
              <span v-else>{{ scope.row?.inTheRate[index]?.value }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="iginalCurrency" label="原币">
          <el-table-column
            v-for="(item, index) in allColums?.iginalCurrencyYears"
            :key="item"
            :label="`${item?.toString()}`"
            :prop="`iginalCurrency[${index}].value`"
            width="180"
          >
            <template #default="scope">
              <el-input-number
                v-if="scope.row.isEdit"
                v-model="scope.row.iginalCurrency[index].value"
                controls-position="right"
                :min="0"
                @keyup.enter="handleCalculationIginalCurrency(scope.row, scope.$index)"
              />
              <span v-if="!scope.row.isEdit">{{ scope.row.iginalCurrency[index].value }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="standardMoney" label="本位币">
          <el-table-column
            v-for="(item, index) in allColums?.standardMoneyYears"
            :key="item"
            :label="`${item?.toString()}`"
            :prop="`standardMoney[${index}].value`"
            width="180"
          />
        </el-table-column>
        <el-table-column prop="moq" label="MOQ" width="180">
          <template #default="{ row }">
            <el-input-number v-if="row.isEdit" v-model="row.moq" controls-position="right" :min="0" />
            <span v-if="!row.isEdit">{{ row.moq }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rebateMoney" label="物料返利金额" width="180">
          <template #default="{ row }">
            <el-input-number v-if="row.isEdit" v-model="row.rebateMoney" controls-position="right" :min="0" />
            <span v-if="!row.isEdit">{{ row.rebateMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template #default="{ row }">
            <el-input v-if="row.isEdit" v-model="row.remark" />
            <span v-if="!row.isEdit">{{ row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="peopleName" label="确认人" />
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="scope">
            <el-button link :disabled="scope.row.isSubmit" @click="handleSubmit(scope.row, 0)" type="danger" v-havedone
              >确认</el-button
            >
            <el-button
              v-if="scope.row.isEntering"
              link
              :disabled="scope.row.isSubmit"
              @click="handleSubmit(scope.row, 1)"
              type="warning"
              v-havedone
            >
              提交
            </el-button>
            <el-button v-if="!scope.row.isEdit" link @click="handleEdit(scope.row, true)" type="primary" v-havedone>
              修改
            </el-button>
            <el-button v-if="scope.row.isEdit" link @click="handleEdit(scope.row, false)" v-havedone>取消</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-row justify="end">
        <el-button class="margin-top" @click="handleCalculation" type="primary"> 计算 </el-button>
      </el-row> -->
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { useUserStore } from "@/store/modules/user"
import { ElectronicDto } from "./data.type"
import { ElMessage } from "element-plus"
import {
  GetElectronic,
  PostElectronicMaterialCalculate,
  PostElectronicMaterialEntering,
  PosToriginalCurrencyCalculate
} from "./common/request"
import { getExchangeRate } from "./../demandApply/service"
import getQuery from "@/utils/getQuery"

const { auditFlowId = 1, productId }: any = getQuery()

// 获取仓库的值
const store = useUserStore()

const tableLoading = ref(false)

// 电子料 - table数据
const electronicBomList = ref<ElectronicDto[]>([])

// 表单子列数据
const allColums = reactive<any>({
  materialsUseCountYears: [], // 项目物料的使用量
  systemiginalCurrencyYears: [], // 系统单价（原币）
  inTheRateYears: [], // 年降率
  iginalCurrencyYears: [], // 原币
  standardMoneyYears: [] // 本位币
})

const exchangeSelectOptions = ref<any>([])

const fetchOptionsData = async () => {
  const exchangeSelect: any = await getExchangeRate({
    maxResultCount: 100,
    skipCount: 0
  })
  exchangeSelectOptions.value = exchangeSelect.result.items || []
}

onBeforeMount(() => {
  console.log(store.userInfo, "store")
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  console.log(electronicBomList.value, "electronicBomList")
  fetchInitData()
  fetchOptionsData()
})

// 获取初始化数据
const fetchInitData = async () => {
  const { result } = await GetElectronic(auditFlowId, productId)
  if (!result) return false
  console.log(result, "获取初始化数据")

  // 初始化表头数据
  const { materialsUseCount, systemiginalCurrency, inTheRate, iginalCurrency, standardMoney } = result[0] || {}
  allColums.materialsUseCountYears = materialsUseCount?.map((item: any) => item.year) || []
  allColums.systemiginalCurrencyYears = systemiginalCurrency?.map((item: any) => item.year) || []
  allColums.inTheRateYears = inTheRate?.map((item: any) => item.year) || []
  allColums.iginalCurrencyYears = iginalCurrency?.map((item: any) => item.year) || []
  allColums.standardMoneyYears = standardMoney?.map((item: any) => item.year) || []
  electronicBomList.value = result
}

// 提交电子料单价行数据
const handleSubmit = async (record: ElectronicDto, isSubmit: number) => {
  try {
    const { success } = await PostElectronicMaterialEntering({
      isSubmit,
      electronicDtoList: [record],
      auditFlowId
    })
    if (!success) throw Error()
    ElMessage.success(`${isSubmit ? "提交" : "确认"}成功`)
    if (isSubmit) {
      record.isEntering = true
    } else {
      record.isSubmit = true
    }
    // fetchInitData()
  } catch (err) {
    ElMessage.error("提交失败~")
    console.log(err, "确认")
  }
}

// 修改
const handleEdit = (row: any, isEdit: boolean) => {
  row.isEdit = isEdit
}

// 根据汇率计算
const handleCalculation = async (row: any, index: number) => {
  try {
    tableLoading.value = true
    const { success, result } = await PostElectronicMaterialCalculate(row)
    if (!success && !result.length) throw Error()
    electronicBomList.value[index] = { ...(result || {}), isEdit: true }
    console.log(success, "handleSubmit")
    tableLoading.value = false
  } catch (err) {
    console.log
    ElMessage.error("计算失败~")
    tableLoading.value = false
  }
}

// 根据原币计算
const handleCalculationIginalCurrency = async (row: any, index: number) => {
  try {
    tableLoading.value = true
    const { success, result } = await PosToriginalCurrencyCalculate(row)
    if (!success && !result.length) throw Error()
    electronicBomList.value[index] = { ...(result || {}), isEdit: true }
    tableLoading.value = false
    console.log(success, "handleSubmit")
  } catch (err) {
    console.log(err, "[根据原币计算 计算失败]")
    tableLoading.value = false
    ElMessage.error("计算失败~")
  }
}

watchEffect(() => {})
</script>
<style lang="scss">
.margin-top {
  margin: 20px;
}
</style>
