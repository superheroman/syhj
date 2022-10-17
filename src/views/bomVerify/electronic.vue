<template>
  <el-card class="wrap m-2">
    <el-card class="table-wrap" header="电子料单价">
      <el-table :data="electronicBomList" style="width: 100%" v-loading="loading" height="75vh">
        <el-table-column prop="categoryName" label="物料大类" fixed="left" width="150" />
        <el-table-column prop="typeName" label="物料种类" fixed="left" width="150" />
        <el-table-column prop="sapItemNum" label="物料编号" fixed="left" width="150" />
        <el-table-column prop="sapItemName" label="材料名称" fixed="left" width="150" />
        <el-table-column prop="materialsUseCount" label="项目物料的使用量">
          <el-table-column
            v-for="(item, index) in allColums?.materialsUseCountYears"
            :key="item"
            :label="`${item}`"
            :prop="`materialsUseCount[${index}].value`"
            width="150"
          >
            <template #default="scope">
              <span>{{ scope.row.materialsUseCount[index].value }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="currency" label="币种" width="150">
          <!-- <template #default="scope">
            <el-select v-if="scope.row.isEdit" v-model="scope.row.currency" placeholder="选择币种">
              <el-option
                v-for="item in exchangeSelectOptions"
                :key="item.id"
                :label="item.exchangeRateKind"
                :value="item.exchangeRateKind"
              />
            </el-select>
          </template> -->
        </el-table-column>
        <el-table-column prop="systemiginalCurrency" label="系统单价（原币）">
          <el-table-column
            v-for="(item, index) in allColums?.systemiginalCurrencyYears"
            :key="item"
            :label="`${item}`"
            :prop="`systemiginalCurrency[${index}].value`"
            width="150"
          >
            <template #default="scope">
              <span>{{ scope.row.systemiginalCurrency[index].value.toFixed(3) }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="inTheRate" label="年降率">
          <el-table-column
            v-for="(item, index) in allColums?.inTheRateYears"
            :key="item"
            :label="`${item}`"
            :prop="`inTheRate[${index}].value`"
            width="150"
          />
        </el-table-column>
        <el-table-column prop="iginalCurrency" label="原币">
          <el-table-column
            v-for="(item, index) in allColums?.iginalCurrencyYears"
            :key="item"
            :label="`${item}`"
            :prop="`iginalCurrency[${index}].value`"
            width="150"
          >
            <template #default="{ row }">
              {{ row.iginalCurrency[index]?.value.toFixed(3) || 0 }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="standardMoney" label="本位币">
          <el-table-column
            v-for="(item, index) in allColums?.standardMoneyYears"
            :key="item"
            :label="`${item}`"
            :prop="`standardMoney[${index}].value`"
            width="150"
          >
            <template #default="{ row }">
              {{ row.standardMoney[index]?.value.toFixed(5) || 0 }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="moq" label="MOQ" width="150" />
        <el-table-column prop="rebateMoney" label="物料返利金额" width="150" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="peopleName" fixed="right" />
      </el-table>
      <el-descriptions :column="2" border>
        <el-descriptions-item v-for="item in allColums?.standardMoneyYears" :key="item" :label="`${item} 本位币汇总`">
          {{ allStandardMoney[item].toFixed(5) || 0 }}
        </el-descriptions-item>
      </el-descriptions>
      <!-- <el-row justify="end">
        <el-button class="margin-top" @click="handleCalculation" type="primary"> 计算 </el-button>
      </el-row> -->
    </el-card>
    <el-row justify="end" style="margin-top: 20px" v-if="data.auditFlowId && data.productId">
      <el-button type="primary" @click="handleSetBomState(true)" v-havedone>同意</el-button>
      <el-button type="danger" @click="handleSetBomState(false)" v-havedone>拒绝</el-button>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount, onMounted, watchEffect, computed } from "vue"
import { ElectronicDto } from "../resourcesDepartment/data.type"
import { GetBOMElectronicSingle, SetBomState } from "./service"
import { getExchangeRate } from "./../demandApply/service"
import { getYears } from "../pmDepartment/service"
import getQuery from "@/utils/getQuery"
import { ElMessageBox } from "element-plus"
import useJump from "@/hook/useJump"

const { jumpTodoCenter } = useJump()
const { auditFlowId, productId }: any = getQuery()

// 电子料 - table数据
const electronicBomList = ref<ElectronicDto[]>([])
const loading = ref(true)
// 表单子列
const allColums = reactive<any>({
  sop: []
})

const data = reactive({
  auditFlowId,
  productId,
  allStandardMoney: 0
})

const exchangeSelectOptions = ref<any>([])

onBeforeMount(() => {
  fetchOptionsData()
  fetchSopYear()
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  fetchElectronicInitData()
})

const fetchOptionsData = async () => {
  try {
    loading.value = true
    const exchangeSelect: any = await getExchangeRate({
      maxResultCount: 100,
      skipCount: 0
    })
    exchangeSelectOptions.value = exchangeSelect.result.items || []
    loading.value = false
  } catch {
    loading.value = false
  }
}

// 计算总值
const reduceArr = (arr: any[]) => {
  return arr.reduce((a, b) => a + b)
}

const allStandardMoney = computed(() => {
  let obj: any = {}
  const standardMoney = electronicBomList.value?.map((item: any) => item.standardMoney) || []
  const flatArr = standardMoney.flat(Infinity)
  allColums?.standardMoneyYears.forEach((item: any) => {
    const arr: any = []
    flatArr.forEach((y: any) => {
      if (y.year === item) {
        arr.push(y.value || 0)
      }
    })
    obj[item] = reduceArr(arr)
  })
  return obj
})

// 获取电子料初始化数据
const fetchElectronicInitData = async () => {
  const { result } = await GetBOMElectronicSingle(auditFlowId, productId)
  console.log(result, "获取初始化数据")
  electronicBomList.value = result
  // 初始化表头数据
  const { materialsUseCount, systemiginalCurrency, inTheRate, iginalCurrency, standardMoney } =
    electronicBomList?.value[0] || {}
  allColums.materialsUseCountYears = materialsUseCount?.map((item) => item.year) || []
  allColums.systemiginalCurrencyYears = systemiginalCurrency?.map((item) => item.year) || []
  allColums.inTheRateYears = inTheRate?.map((item) => item.year) || []
  allColums.iginalCurrencyYears = iginalCurrency?.map((item) => item.year) || []
  allColums.standardMoneyYears = standardMoney?.map((item) => item.year) || []
}

const fetchSopYear = async () => {
  const { result } = (await getYears(auditFlowId)) || {}
  allColums.sop = result || []
}

const handleSetBomState = (isAgree: boolean) => {
  let text = isAgree ? "您确定要同意嘛？" : "请输入拒绝理由"
  ElMessageBox[!isAgree ? "prompt" : "confirm"](text, "请审核", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async (val) => {
    const { success } = await SetBomState({
      isAgree,
      auditFlowId,
      bomCheckType: 3,
      opinionDescription: !isAgree ? val?.value : ""
    })
    if (success) jumpTodoCenter()
  })
}

watchEffect(() => {})
</script>
<style scoped lang="scss">
.wrap {
  margin-bottom: 20px;
}
.table-wrap {
  margin-top: 10px;
}
</style>
