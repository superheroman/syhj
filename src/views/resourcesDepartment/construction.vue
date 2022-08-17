<template>
  <div class="margin-top">
    <div v-for="item in constructionBomList" :key="item.superTypeName">
      <el-card class="table-wrap" :header="item.superTypeName">
        <el-table :data="item.structureMaterial" style="width: 100%" height="500">
          <el-table-column label="bom" align="center">
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
                    :value="item.id"
                  />
                </el-select>
                <!-- <el-input v-model="scope.row.currency" v-if="scope.row.isEdit" /> -->
              </template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column prop="materialsSystemPrice" label="系统单价" width="150">
            <template #default="scope">
              <el-input v-if="scope.row.isEdit" :formatter="transformNumber" v-model="scope.row.materialsSystemPrice" />
              <span v-if="!scope.row.isEdit">{{ scope.row.materialsSystemPrice }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="Sop" align="center" v-if="allColums?.sop.length">
            <el-table-column
              v-for="(item, index) in allColums?.sop"
              :key="item"
              :label="`Sop + ${index + 1}`"
              :prop="`sop[${index}].value`"
              width="150"
            >
              <template #default="scope">
                <el-input v-if="scope.row.isEdit" :formatter="transformNumber" v-model="scope.row.sop[index].value" />
                <span v-if="!scope.row.isEdit">{{ scope.row.sop[index].value }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="pricingEndTime" label="确认人" />
          <el-table-column label="操作" fixed="right" width="200">
            <template #default="scope">
              <el-button link @click="handleSubmit(scope.row, false)" type="danger">确认</el-button>
              <el-button link @click="handleSubmit(scope.row, true)" type="warning"> 提交 </el-button>
              <el-button v-if="!scope.row.isEdit" link @click="handleEdit(scope.row, true)" type="primary"
                >修改</el-button
              >
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
import { GetStructural, PostStructuralMemberEntering } from "./common/request"
import { getExchangeRate } from "./../demandApply/service"
import { getYears } from "../pmDepartment/service"
import getQuery from "@/utils/getQuery"

const { auditFlowId = 1 }: any = getQuery()

// 结构料 - table数据
const constructionBomList = ref<ConstructionDto[]>([])

// 表单子列
const allColums = reactive<any>({
  sop: []
})

const exchangeSelectOptions = ref([])

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
  console.log(record, "record")
  try {
    const res = await PostStructuralMemberEntering({
      isSubmit,
      structuralMaterialEntering: [record],
      auditFlowId
    })
    console.log(res, "res")
  } catch (err) {
    console.log(err, "确认")
  }
}

const fetchSopYear = async () => {
  const { result } = (await getYears(auditFlowId)) || {}
  allColums.sop = result || []
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
