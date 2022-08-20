<template>
  <div class="margin-top">
    <el-card class="table-wrap" header="电子料单价录入界面">
      <el-table :data="electronicBomList" style="width: 100%" height="500">
        <el-table-column prop="categoryName" label="物料大类" width="150" />
        <el-table-column prop="typeName" label="物料种类" width="150" />
        <el-table-column prop="sapItemNum" label="物料编号" width="150" />
        <el-table-column prop="sapItemName" label="材料名称" width="150" />
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
        <el-table-column prop="systemiginalCurrency" label="系统单价（原币）">
          <el-table-column
            v-for="(item, index) in allColums?.systemiginalCurrencyYears"
            :key="item"
            :label="`${item}`"
            :prop="`systemiginalCurrency[${index}].value`"
            width="150"
          >
            <template #default="scope">
              <span>{{ scope.row.systemiginalCurrency[index].value }}</span>
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
          >
            <template #default="scope">
              <el-input
                v-if="scope.row.isEdit"
                :formatter="transformNumber"
                v-model="scope.row.inTheRate[index].value"
                @blur="handleCalculation(scope.row, scope.$index)"
              />
              <span v-if="!scope.row.isEdit">{{ scope.row.inTheRate[index].value }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="iginalCurrency" label="原币">
          <el-table-column
            v-for="(item, index) in allColums?.iginalCurrencyYears"
            :key="item"
            :label="`${item}`"
            :prop="`iginalCurrency[${index}].value`"
            width="150"
          >
            <template #default="scope">
              <el-input
                v-if="scope.row.isEdit"
                :formatter="transformNumber"
                v-model="scope.row.iginalCurrency[index].value"
                @blur="handleCalculationOriginalCurrency(scope.row, scope.$index)"
              />
              <span v-if="!scope.row.isEdit">{{ scope.row.iginalCurrency[index].value }}</span>
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
            <template #default="scope">
              <el-input
                v-if="scope.row.isEdit"
                :formatter="transformNumber"
                v-model="scope.row.standardMoney[index].value"
              />
              <span v-if="!scope.row.isEdit">{{ scope.row.standardMoney[index].value }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="rebateMoney" label="物料返利金额" width="150">
          <template #default="{ row }">
            <el-input v-if="row.isEdit" :formatter="transformNumber" v-model="row.rebateMoney" />
            <span v-if="!row.isEdit">{{ row.rebateMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pricingEndTime" label="确认人" />
        <el-table-column label="操作" fixed="right" width="200">
          <template #default="scope">
            <el-button link @click="handleSubmit(scope.row, false)" type="danger" v-if="!scope.row.isSubmit"
              >确认
            </el-button>
            <!-- <el-button link class="margin-top" @click="handleCalculation(scope.row, scope.$index)" type="primary">
              计算
            </el-button> -->
            <el-button
              link
              @click="handleSubmit(scope.row, true)"
              type="warning"
              v-if="scope.row.isEntering && !scope.row.isSubmit"
            >
              提交
            </el-button>
            <el-button v-if="scope.row.isSubmit" type="text"> 已提交 </el-button>
            <el-button v-if="!scope.row.isSubmit" link @click="handleEdit(scope.row, true)" type="primary"
              >修改</el-button
            >
            <el-button v-if="scope.row.isEdit" link @click="handleEdit(scope.row, false)">取消</el-button>
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
import { transformNumber } from "./common/util"
import { ElMessage } from "element-plus"
import {
  GetElectronic,
  PostElectronicMaterialCalculate,
  PostElectronicMaterialEntering,
  PosToriginalCurrencyCalculate
} from "./common/request"
import getQuery from "@/utils/getQuery"

const { auditFlowId = 1 }: any = getQuery()

// 获取仓库的值
const store = useUserStore()
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

onBeforeMount(() => {
  console.log(store.userInfo, "store")
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  console.log(electronicBomList.value, "electronicBomList")
  fetchInitData()
})

// 获取初始化数据
const fetchInitData = async () => {
  try {
    const {
      success,
      result: { electronicBomList: tempData }
    } = await GetElectronic({ id: auditFlowId })
    if (!success) throw Error()
    console.log(tempData, "获取初始化数据")
    electronicBomList.value = tempData
    // 初始化表头数据
    const { materialsUseCount, systemiginalCurrency, inTheRate, iginalCurrency, standardMoney } =
      electronicBomList?.value[0] || {}
    allColums.materialsUseCountYears = materialsUseCount?.map((item) => item.year) || []
    allColums.systemiginalCurrencyYears = systemiginalCurrency?.map((item) => item.year) || []
    allColums.inTheRateYears = inTheRate?.map((item) => item.year) || []
    allColums.iginalCurrencyYears = iginalCurrency?.map((item) => item.year) || []
    allColums.standardMoneyYears = standardMoney?.map((item) => item.year) || []
  } catch (err) {
    console.log(err, "[ 初始化失败 ]")
  }
}

// 确认电子料单价行数据
const handleSubmit = async (record: ElectronicDto, isSubmit: boolean) => {
  try {
    const res = await PostElectronicMaterialEntering({
      isSubmit,
      electronicDtoList: [record],
      auditFlowId
    })
    console.log(res, "res")
  } catch (err) {
    console.log(err, "确认")
  }
}

// 修改
const handleEdit = (row: any, isEdit: boolean) => {
  row.isEdit = isEdit
}

// 计算
const handleCalculation = async (row: any, index: number) => {
  try {
    const { success, result } = await PostElectronicMaterialCalculate([row])
    if (!success && !result.length) throw Error()
    electronicBomList.value[index] = result[0]
    ElMessage.success("计算成功~")
    console.log(success, "handleSubmit")
  } catch (err) {
    ElMessage.error("计算失败~")
  }
} // 根据原币 计算
const handleCalculationOriginalCurrency = async (row: any, index: number) => {
  try {
    const { success, result } = await PosToriginalCurrencyCalculate([row])
    if (!success && !result.length) throw Error()
    electronicBomList.value[index] = result[0]
    ElMessage.success("计算成功~")
    console.log(success, "handleSubmit")
  } catch (err) {
    ElMessage.error("计算失败~")
  }
}

watchEffect(() => {})
</script>
<style scoped lang="scss">
.margin-top {
  margin: 20px;
}
</style>
