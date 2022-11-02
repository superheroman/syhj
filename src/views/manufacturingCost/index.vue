<template>
  <div>
    <!-- <div style="float: right; margin: 20px 10px">
      <el-button @click="addsmt" type="primary">新增</el-button>
    </div> -->
    <el-card header="SMT" m="2">
      <el-table :data="data.smt" border style="margin: 20px 0" height="500">
        <el-table-column prop="year" label="年份" width="180">
          <template #default="{ row }">
            <div v-if="row.year">{{ row.year }}</div>
            <div v-else>全生命周期</div>
          </template>
        </el-table-column>
        <el-table-column label="直接制造成本" width="180">
          <el-table-column label="直接人工" width="180">
            <template #default="{ row }">
              <el-input-number controls-position="right" :min="0" v-model="row.directLabor1" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="设备折旧" width="180">
            <template #default="{ row }">
              <el-input-number controls-position="right" :min="0" v-model="row.equipmentDepreciation1" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="换线成本" width="180">
            <template #default="{ row }">
              <el-input-number controls-position="right" :min="0" v-model="row.lineChangeCost1" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="制造费用" width="180">
            <template #default="{ row }">
              <el-input-number controls-position="right" :min="0" v-model="row.manufacturingExpenses1" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="小计" width="180" prop="cost">
            <template #default="{ row }">
              <div>{{ row.subtotal1 }}</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="间接制造成本" width="180">
          <el-table-column label="直接人工" width="180">
            <template #default="{ row }">
              <el-input-number controls-position="right" :min="0" v-model="row.directLabor2" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="设备折旧" width="180">
            <template #default="{ row }">
              <el-input-number controls-position="right" :min="0" v-model="row.equipmentDepreciation2" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="制造费用" width="180">
            <template #default="{ row }">
              <el-input-number controls-position="right" :min="0" v-model="row.manufacturingExpenses2" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="小计" width="180" prop="cost">
            <template #default="{ row }">
              <div>{{ row.subtotal2 }}</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="合计" width="180" prop="cost" fixed="right">
          <template #default="{ row }">
            <div>{{ row.subtotal }}</div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card header="COB" m="2">
      <el-table :data="data.cob" border style="margin: 20px 0" height="500">
        <el-table-column prop="year" label="年份" width="180">
          <template #default="{ row }">
            <div v-if="row.year">{{ row.year }}</div>
            <div v-else>全生命周期</div>
          </template>
        </el-table-column>
        <el-table-column label="直接制造成本" width="180">
          <el-table-column label="直接人工" width="180">
            <template #default="{ row }">
              <el-input-number controls-position="right" :min="0" v-model="row.directLabor1" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="设备折旧" width="180">
            <template #default="{ row }">
              <el-input-number controls-position="right" :min="0" v-model="row.equipmentDepreciation1" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="换线成本" width="180">
            <template #default="{ row }">
              <el-input-number controls-position="right" :min="0" v-model="row.lineChangeCost1" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="制造费用" width="180">
            <template #default="{ row }">
              <el-input-number controls-position="right" :min="0" v-model="row.manufacturingExpenses1" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="小计" width="180" prop="cost">
            <template #default="{ row }">
              <div>{{ row.subtotal1 }}</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="间接制造成本" width="180">
          <el-table-column label="直接人工" width="180">
            <template #default="{ row }">
              <el-input-number controls-position="right" :min="0" v-model="row.directLabor2" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="设备折旧" width="180">
            <template #default="{ row }">
              <el-input-number controls-position="right" :min="0" v-model="row.equipmentDepreciation2" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="制造费用" width="180">
            <template #default="{ row }">
              <el-input-number controls-position="right" :min="0" v-model="row.manufacturingExpenses2" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="小计" width="180" prop="cost">
            <template #default="{ row }">
              <div>{{ row.subtotal2 }}</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="合计" width="180" prop="cost" fixed="right">
          <template #default="{ row }">
            <div>{{ row.subtotal }}</div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card header="Other" m="2">
      <el-table :data="data.other" border style="margin: 20px 0" height="500">
        <el-table-column prop="year" label="年份" width="180">
          <template #default="{ row }">
            <div v-if="row.year">{{ row.year }}</div>
            <div v-else>全生命周期</div>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="180" prop="cost" fixed="right">
          <template #default="{ row }">
            <el-input controls-position="right" v-model="row.remark" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="合计" width="180" prop="cost" fixed="right">
          <template #default="{ row }">
            <el-input-number controls-position="right" :min="0" v-model="row.subtotal" placeholder="" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div style="float: right; margin: 20px 10px">
      <el-button @click="submit" type="primary" v-havedone>提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect, watch } from "vue"
import { ElMessage } from "element-plus"
import { getAllYearsFrom, manufacturingCostInput, getInputManufacturingCost } from "./service"
import getQuery from "@/utils/getQuery"
let { auditFlowId, productId: modelCountId } = getQuery()

// import { useRoute, useRouter } from "vue-router"
/**
 * 仓库
 */
/**
 * 路由对象
 */
// const route = useRoute()
/**
 * 路由实例
 */
// const router = useRouter()
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({
  years: [] as number[],
  smt: [] as any[],
  cob: [] as any[],
  other: [] as any[]
})
// const addsmt = () => {
//   data.smt.push({})
// }
// const addcob = () => {
//   data.cob.push({})
// }
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  if (auditFlowId && modelCountId) {
    let getResData: any = await getInputManufacturingCost({ auditFlowId, modelCountId })
    if (getResData.result) {
      data.smt = getResData.result.smt
      data.cob = getResData.result.cob
      data.other = getResData.result.other
    } else {
      let { result } = (await getAllYearsFrom(auditFlowId)) as any
      data.years = result
      data.years.forEach((year) => {
        data.smt.push({ year })
        data.cob.push({ year })
        data.other.push({ year })
      })
      data.smt.push({ year: 0 })
      data.cob.push({ year: 0 })
      data.other.push({ year: 0 })
    }
  }
})

watch(
  () => data.smt,
  (val) => {
    val.forEach((item: any) => {
      item.subtotal1 =
        item.directLabor1 + item.equipmentDepreciation1 + item.lineChangeCost1 + item.manufacturingExpenses1
      item.subtotal2 = item.directLabor2 + item.equipmentDepreciation2 + item.manufacturingExpenses2
      item.subtotal = item.subtotal1 + item.subtotal2
    })
  },
  { deep: true }
)
watch(
  () => data.cob,
  (val) => {
    val.forEach((item: any) => {
      item.subtotal1 =
        item.directLabor1 + item.equipmentDepreciation1 + item.lineChangeCost1 + item.manufacturingExpenses1
      item.subtotal2 = item.directLabor2 + item.equipmentDepreciation2 + item.manufacturingExpenses2
      item.subtotal = item.subtotal1 + item.subtotal2
    })
  },
  { deep: true }
)
const submit = async () => {
  let { smt, cob, other } = data
  let res: any = await manufacturingCostInput({
    auditFlowId,
    modelCountId,
    smt,
    cob,
    other
  })
  if (res.success) {
    ElMessage.success("提交成功")
  }
}

watchEffect(() => {})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})
</script>
<style scoped lang="sass"></style>
