<template>
  <el-card class="wrap m-2">
    <el-card header="结构料单价" class="table-wrap">
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
                </template>
              </el-table-column>
            </el-table-column>
            <!-- <el-table-column prop="materialsSystemPrice" label="系统单价" width="150">
            <template #default="scope">
              <el-input v-if="scope.row.isEdit" v-model="scope.row.materialsSystemPrice" />
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
              />
            </el-table-column>
            <el-table-column prop="pricingEndTime" label="确认人" />
          </el-table>
        </el-card>
      </div>
    </el-card>
    <el-row justify="end" style="margin-top: 20px">
      <el-button type="primary" @click="handleSetBomState(true)">同意</el-button>
      <el-button type="danger" @click="handleSetBomState(false)">拒绝</el-button>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { ConstructionDto } from "../resourcesDepartment/data.type"
import { GetStructural, SetBomState } from "../resourcesDepartment/common/request"
import { getExchangeRate } from "./../demandApply/service"
import { getYears } from "../pmDepartment/service"
import getQuery from "@/utils/getQuery"
import { ElMessageBox } from "element-plus"

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
  fetchConstructionInitData()
})

const fetchOptionsData = async () => {
  const exchangeSelect: any = await getExchangeRate({
    maxResultCount: 100,
    skipCount: 0
  })
  exchangeSelectOptions.value = exchangeSelect.result.items || []
}

// 获取结构料初始化数据
const fetchConstructionInitData = async () => {
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

const handleSetBomState = (isAgree: boolean) => {
  ElMessageBox.confirm(`您确定要${isAgree ? "同意" : "拒绝"}嘛？`, "请审核", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    await SetBomState({
      isAgree,
      auditFlowId,
      bomCheckType: 3
    })
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
