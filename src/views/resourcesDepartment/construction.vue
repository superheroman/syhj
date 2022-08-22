<template>
  <div class="margin-top">
    <div v-for="item in constructionBomList" :key="item.superTypeName">
      <el-card class="table-wrap" :header="item.superTypeName">
        <el-table :data="item.structureMaterial" style="width: 100%" height="500">
          <el-table-column label="bom">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="categoryName" label="物料大类" width="150" />
            <el-table-column prop="typeName" label="物料种类" width="150" />
            <el-table-column prop="sapItemNum" label="物料编号" width="150" />
            <el-table-column prop="drawingNumName" label="图号名称" width="150" />
            <el-table-column prop="overallDimensionSize" label="外形尺寸" width="150" />
            <el-table-column prop="sapItemName" label="材料" width="150" />
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
                <!-- <el-input v-model="scope.row.currency" v-if="scope.row.isEdit" /> -->
              </template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column prop="materialsSystemPrice" label="系统单价" width="150">
            <template #default="scope">
              <el-input v-if="scope.row.isEdit" v-model="scope.row.materialsSystemPrice" />
              <span v-if="!scope.row.isEdit">{{ scope.row.materialsSystemPrice }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="原币" v-if="allColums?.sop.length">
            <el-table-column
              v-for="(item, index) in allColums?.sop"
              :key="item"
              :label="item"
              :prop="`sop[${index}].value`"
              width="150"
            >
              <template #default="scope">
                <el-input
                  @blur="handleCalculationIginalCurrency(scope.row, scope.$index)"
                  v-if="scope.row.isEdit"
                  v-model.number="scope.row.sop[index].value"
                />
                <span v-if="!scope.row.isEdit">{{ scope.row.sop[index].value }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="standardMoney" label="本位币">
            <el-table-column
              v-for="(item, index) in allColums?.sop"
              :key="item"
              :label="`${item}`"
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
          <el-table-column prop="peopleName" label="确认人" />
          <el-table-column label="操作" fixed="right" width="200">
            <template #default="scope">
              <el-button link @click="handleSubmit(scope.row, false)" type="danger">确认</el-button>
              <el-button :disabled="scope.row.isSubmit" link @click="handleSubmit(scope.row, true)" type="warning">
                提交
              </el-button>
              <el-button v-if="!scope.row.isEdit" link @click="handleEdit(scope.row, true)" type="primary">
                修改
              </el-button>
              <el-button v-if="scope.row.isEdit" link @click="handleEdit(scope.row, false)">取消</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { ConstructionDto, ConstructionModel } from "./data.type"
import { GetStructural, PostStructuralMemberEntering, PosToriginalCurrencyCalculate } from "./common/request"
import { getExchangeRate } from "./../demandApply/service"
import { getYears } from "../pmDepartment/service"
import getQuery from "@/utils/getQuery"
import { useUserStore } from "@/store/modules/user"
import { ElMessage } from "element-plus"

// 获取仓库的值
const store = useUserStore()

console.log(store.userInfo, "store")
const { auditFlowId = 1 }: any = getQuery()

// 结构料 - table数据
const constructionBomList = ref<ConstructionDto[]>([])

// 表单子列
const allColums = reactive<any>({
  sop: []
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
  try {
    const {
      success,
      result: { constructionBomList: tempData }
    } = await GetStructural({ id: auditFlowId })
    console.log(tempData, "获取初始化数据")
    if (!success) throw Error()
    constructionBomList.value = tempData
  } catch (err) {
    console.log(err, "[ 初始化失败 ]")
  }
}

// 确认结构料单价行数据
const handleSubmit = async (record: ConstructionModel, isSubmit: boolean) => {
  try {
    const { success, result } = await PostStructuralMemberEntering({
      isSubmit,
      structuralMaterialEntering: [{ ...record, peopleId: 1 }],
      auditFlowId
    })
    if (!success) throw Error()
    record.peopleName = "admin"
    ElMessage.success(`${isSubmit ? "提交" : "确认"}成功！`)
    fetchInitData()
    console.log(result, "handleSubmit")
  } catch (err) {
    console.log(err, "确认")
    ElMessage.error("请求失败")
  }
}

const fetchSopYear = async () => {
  const { result } = (await getYears(auditFlowId)) || {}
  allColums.sop = result || []
}

// 根据原币计算
const handleCalculationIginalCurrency = async (row: any, index: number) => {
  try {
    const { success, result } = await PosToriginalCurrencyCalculate([row])
    if (!success && !result.length) throw Error()
    constructionBomList.value[index] = { ...(result[0] || {}), isEdit: true }
    console.log(success, "handleSubmit")
  } catch (err) {
    console.log
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
