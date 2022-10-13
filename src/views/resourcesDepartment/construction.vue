<template>
  <div class="margin-top">
    <el-row justify="end">
      <el-button m="2" type="primary" @click="queryModlueNumber">查看项目走量</el-button>
    </el-row>
    <div v-for="(item, bomIndex) in constructionBomList" :key="item.superTypeName">
      <el-card m="2" :header="item.superTypeName" v-loading="item.loading">
        <el-table :data="item.structureMaterial" height="500">
          <el-table-column type="index" label="序号" width="80" fixed="left" />
          <el-table-column prop="categoryName" label="物料大类" width="150" fixed="left" />
          <el-table-column prop="typeName" label="物料种类" width="150" fixed="left" />
          <el-table-column prop="sapItemNum" label="物料编号" width="150" fixed="left" />
          <el-table-column prop="drawingNumName" label="图号名称" width="150" />
          <el-table-column prop="overallDimensionSize" label="外形尺寸" width="150" />
          <el-table-column prop="materialName" label="材料" width="150" />
          <el-table-column prop="weightNumber" label="重量g" width="150" />
          <el-table-column prop="moldingProcess" label="成型工艺" width="150" />
          <el-table-column prop="secondaryProcessingMethod" label="二次加工方法" width="150" />
          <el-table-column prop="surfaceTreatmentMethod" label="表面处理" width="150" />
          <el-table-column prop="dimensionalAccuracyRemark" label="关键尺寸精度及重要要求" width="150" />
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
          <!-- <el-table-column prop="materialsSystemPrice" label="系统单价" width="150">
            <template #default="scope">
              <el-input v-if="scope.row.isEdit" v-model="scope.row.materialsSystemPrice" />
              <span v-if="!scope.row.isEdit">{{ scope.row.materialsSystemPrice }}</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="iginalCurrency" label="原币">
            <el-table-column
              v-for="(item, iginalCurrencyIndex) in data?.sop"
              :key="`construction-iginalCurrency${item}`"
              :label="`${item?.toString()}`"
              :prop="`iginalCurrency[${iginalCurrencyIndex}].value`"
              width="180"
            >
              <template #default="scope">
                <el-input-number
                  v-if="scope.row.isEdit"
                  v-model="scope.row.iginalCurrency[iginalCurrencyIndex].value"
                  controls-position="right"
                  :min="0"
                  @keyup.enter="handleCalculationIginalCurrency(scope.row, bomIndex, scope.$index)"
                />
                <span v-else>{{ scope.row?.iginalCurrency[iginalCurrencyIndex]?.value || 0 }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="standardMoney" label="本位币">
            <el-table-column
              v-for="(item, index) in data?.sop"
              :key="`construction-standardMoney${item}`"
              :label="`${item?.toString()}`"
              :prop="`standardMoney[${index}].value`"
              width="180"
            >
              <template #default="{ row }">
                {{ row.standardMoney[index]?.value?.toFixed(5) || 0 }}
              </template>
            </el-table-column>
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
          <el-table-column label="操作" fixed="right" width="200">
            <template #default="scope">
              <el-button link :disabled="scope.row.isSubmit" @click="handleSubmit(scope.row, 0)" type="danger"
                >确认</el-button
              >
              <el-button
                v-if="scope.row.isEntering"
                :disabled="scope.row.isSubmit"
                link
                @click="handleSubmit(scope.row, 1)"
                type="warning"
              >
                提交
              </el-button>
              <el-button v-if="!scope.row.isEdit" link @click="handleEdit(scope.row, true)" type="primary">
                修改
              </el-button>
              <el-button v-if="scope.row.isEdit" link @click="handleEdit(scope.row, false)">取消</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="本位币汇总：">
            {{ calculationAllStandardMoney(item.structureMaterial) }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { ConstructionModel } from "./data.type"
import {
  GetStructural,
  PostStructuralMemberEntering,
  ToriginalCurrencyStructural,
  GetProjectGoQuantity
} from "./common/request"
import { useRouter } from "vue-router"

import { getExchangeRate } from "./../demandApply/service"
import { getYears } from "../pmDepartment/service"
import getQuery from "@/utils/getQuery"
import { useUserStore } from "@/store/modules/user"
import { ElMessage } from "element-plus"

// 获取仓库的值
const store = useUserStore()
const router = useRouter()

console.log(store.userInfo, "store")
const { auditFlowId, productId }: any = getQuery()

// 结构料 - table数据
const constructionBomList = ref<any>([])

const data = reactive<any>({
  sop: [], // 表单子列
  moduleNumber: [], // 项目走量
  moduleNumberSop: []
})

const exchangeSelectOptions = ref<any>([])

onBeforeMount(() => {
  fetchOptionsData()
  fetchSopYear()
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  console.log(constructionBomList.value, "constructionBomList")
  fetchInitData()
  fetchModuleNumberData()
})

const fetchOptionsData = async () => {
  const exchangeSelect: any = await getExchangeRate({
    maxResultCount: 100,
    skipCount: 0
  })
  exchangeSelectOptions.value = exchangeSelect.result.items || []
}

// 获取初始化数据
const fetchInitData = async () => {
  const { result } = (await GetStructural({ auditFlowId, productId })) || {}
  constructionBomList.value = result || []
}

// 计算总值
const reduceArr = (arr: any[]) => {
  return arr.reduce((a, b) => a + b)
}

const calculationAllStandardMoney = (structureMaterial: any) => {
  const standardMoneyTotal = structureMaterial.map((item: any) =>
    reduceArr(item.standardMoney.map((y: any) => y.value))
  )
  console.log(standardMoneyTotal, "calculationAllStandardMoney")
  return Number(reduceArr(standardMoneyTotal)).toFixed(2)
}

const queryModlueNumber = () => {
  router.push({
    path: "/resourcesDepartment/moduleNumber",
    query: {
      auditFlowId
    }
  })
}

// 获取项目走量的数据
const fetchModuleNumberData = async () => {
  const { result } = await GetProjectGoQuantity({ Id: auditFlowId })
  data.moduleNumberSop = result[0]?.modelCountYear
  data.moduleNumber = result
}

// 确认结构料单价行数据
const handleSubmit = async (record: ConstructionModel, isSubmit: number) => {
  await PostStructuralMemberEntering({
    isSubmit,
    structuralMaterialEntering: [{ ...record, productId }],
    auditFlowId
  })
  ElMessage.success(`${isSubmit ? "提交" : "确认"}成功！`)
  fetchInitData()
  record.isEdit = false
  // if (isSubmit) {
  //   record.isEntering = true
  // } else {
  //   record.isSubmit = true
  // }
}

const fetchSopYear = async () => {
  const { result } = (await getYears(auditFlowId)) || {}
  data.sop = result || []
}

// 根据原币计算
const handleCalculationIginalCurrency = async (row: any, bomIndex: number, iginalCurrencyIndex: number) => {
  try {
    constructionBomList.value[bomIndex].loading = true
    const { success, result } = await ToriginalCurrencyStructural(row)
    if (!success && !result.length) throw Error()
    const res = { ...(result || {}), isEdit: true }
    constructionBomList.value[bomIndex].structureMaterial[iginalCurrencyIndex] = res
    constructionBomList.value[bomIndex].loading = false
  } catch (err) {
    constructionBomList.value[bomIndex].loading = false
    console.log(err, "[根据原币计算 计算失败]")
    ElMessage.error("计算失败~")
  }
}

// 修改
const handleEdit = (row: any, isEdit: boolean) => {
  row.isEdit = isEdit
}

watchEffect(() => {})
</script>
<style scoped lang="scss">
.table-wrap {
  margin: 20px;
}
</style>
