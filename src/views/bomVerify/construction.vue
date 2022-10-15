<template>
  <el-card class="wrap m-2" header="结构bom单价审核">
    <el-card
      v-for="item in constructionBomList"
      :header="item.superTypeName"
      :key="item.superTypeName"
      class="table-wrap"
    >
      <el-table :data="item.structureMaterial" style="width: 100%" height="75vh" v-loading="loading">
        <el-table-column type="index" label="序号" width="70" fixed />
        <el-table-column prop="categoryName" label="物料大类" fixed width="150" />
        <el-table-column prop="typeName" label="物料种类" fixed width="150" />
        <el-table-column prop="sapItemNum" label="物料编号" fixed width="150" />
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
                :value="item.id"
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
        <!-- <el-table-column label="Sop" align="center" v-if="allColums?.sop.length">
          <el-table-column
            v-for="(item, index) in allColums?.sop"
            :key="item"
            :label="`${item}`"
            :prop="`sop[${index}].value`"
            width="150"
          />
        </el-table-column> -->
        <el-table-column prop="iginalCurrency" label="原币">
          <el-table-column
            v-for="(item, iginalCurrencyIndex) in allColums?.sop"
            :key="`construction-iginalCurrency${item}`"
            :label="`${item?.toString()}`"
            :prop="`iginalCurrency[${iginalCurrencyIndex}].value`"
            width="180"
          >
            <template #default="{ row }">
              {{ (row?.iginalCurrency && row?.iginalCurrency[iginalCurrencyIndex]?.value).toFixed(3) || 0 }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="standardMoney" label="本位币">
          <el-table-column
            v-for="(item, index) in allColums?.sop"
            :key="`construction-standardMoney${item}`"
            :label="`${item?.toString()}`"
            :prop="`standardMoney[${index}].value`"
            width="180"
          >
            <template #default="{ row }">
              {{ (row.standardMoney && row.standardMoney[index]?.value).toFixed(3) || 0 }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="peopleName" fixed="right" />
      </el-table>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          v-for="standardMoneyItem in allColums.sop"
          :key="standardMoneyItem"
          :label="`${standardMoneyItem} 本位币汇总`"
        >
          {{ calculationAllStandardMoney(item.structureMaterial)[standardMoneyItem] || 0 }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-row justify="end" style="margin-top: 20px" v-if="data.auditFlowId && data.productId">
      <el-button type="primary" @click="handleSetBomState(true)" v-havedone>同意</el-button>
      <el-button type="danger" @click="handleSetBomState(false)" v-havedone>拒绝</el-button>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { GetBOMStructuralSingle, SetBomState } from "./service"
import { getExchangeRate } from "./../demandApply/service"
import { getYears } from "../pmDepartment/service"
import getQuery from "@/utils/getQuery"
import { ElMessageBox } from "element-plus"
import useJump from "@/hook/useJump"

const { jumpTodoCenter } = useJump()

const { auditFlowId, productId }: any = getQuery()

// 结构料 - table数据
const constructionBomList = ref<any[]>([])
const loading = ref(false)
// 表单子列
const allColums = reactive<any>({
  sop: []
})

const data = reactive({
  auditFlowId,
  productId
})

const exchangeSelectOptions = ref<any>([])

onBeforeMount(() => {
  fetchOptionsData()
  fetchSopYear()
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  console.log(constructionBomList.value, "constructionBomList")
  fetchConstructionInitData()
})

// const toFixedThree = (_recoed: any, _row: any, val: any) => {
//   if (typeof val === "number" && val > 0) return val.toFixed(3)
//   return val
// }
const fetchOptionsData = async () => {
  const exchangeSelect: any = await getExchangeRate({
    maxResultCount: 100,
    skipCount: 0
  })
  exchangeSelectOptions.value = exchangeSelect.result.items || []
}

// 计算总值
const reduceArr = (arr: any[]) => {
  return arr.reduce((a, b) => a + b)
}

// 获取结构料初始化数据
const fetchConstructionInitData = async () => {
  try {
    loading.value = true
    const { result } = await GetBOMStructuralSingle(auditFlowId, productId)
    console.log(result, "获取初始化数据")
    constructionBomList.value = result
    loading.value = false
  } catch {
    loading.value = false
  }
}

const calculationAllStandardMoney = (structureMaterial: any) => {
  let obj: any = {}
  const standardMoney = structureMaterial?.map((item: any) => item.standardMoney) || []
  const flatArr = standardMoney.flat(Infinity)
  allColums?.sop.forEach((item: any) => {
    const arr: any = []
    flatArr.forEach((y: any) => {
      if (y.year === item) {
        arr.push(y.value || 0)
      }
    })
    obj[item] = reduceArr(arr).toFixed(5)
  })
  return obj
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
      bomCheckType: 4,
      opinionDescription: !isAgree ? val.value : ""
    })
    if (success) jumpTodoCenter()
  })
}

const fetchSopYear = async () => {
  const { result } = (await getYears(auditFlowId)) || {}
  allColums.sop = result || []
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
