<template>
  <div class="pm-department">
    <div class="pm-department__btn-container">
      <el-button type="primary">SOR查看</el-button>
      <el-button type="primary">查看物流&包装基础数据</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="单PCS包装价格/元">
        <template #default="{ row }">
          <el-input v-model="row.a" />
        </template>
      </el-table-column>
      <el-table-column label="运费/月">
        <template #default="{ row }">
          <el-input v-model="row.a" />
        </template>
      </el-table-column>
      <el-table-column label="仓储费用/月">
        <template #default="{ row }">
          <el-input v-model="row.a" />
        </template>
      </el-table-column>
      <el-table-column label="月底需求量">
        <template #default="{ row }">
          <el-input v-model="row.a" />
        </template>
      </el-table-column>
      <el-table-column label="单PCS运输费">
        <template #default="{ row }">
          <el-input v-model="row.a" />
        </template>
      </el-table-column>
      <el-table-column label="单PCS总物流料成本">
        <template #default="{ row }">
          <el-input v-model="row.a" />
        </template>
      </el-table-column>

      <el-table-column label="运费/月" prop="name" />

      <el-table-column label="年份" prop="year" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from "vue"
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"

// import { useRoute, useRouter } from "vue-router"
interface User {
  date: string
  name: string
  address: string
  year: string
}
const tableData: User[] = [
  {
    date: "2022",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    year: "2022"
  },
  {
    date: "2023",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    year: "2023"
  },
  {
    date: "2024",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    year: "2024"
  },
  {
    date: "2025",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    year: "2025"
  }
]
/**
 * 路由对象
 */
// const route = useRoute()
// /**
//  * 路由实例
//  */
// const router = useRouter()
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})
</script>
<style scoped lang="scss">
.pm-department {
  &__btn-container {
    margin: 20px 0;
  }
}
</style>
