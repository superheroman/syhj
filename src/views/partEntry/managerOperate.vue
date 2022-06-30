<template>
  <div class="manager-operate">
    <el-form :model="formData">
      <el-card class="manager-operate__card">
        <h4>核价团队</h4>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="电子工程师:">
              <SearchPerson v-model="formData.electronicEngineerNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结构工程师:">
              <SearchPerson v-model="formData.structureEngineerNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资源管理部:">
              <SearchPerson v-model="formData.resourceManagementNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工程技术部:">
              <SearchPerson v-model="formData.engineeringTechnologyNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="财务部:">
              <SearchPerson v-model="formData.financeNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产管理部:">
              <SearchPerson v-model="formData.productionManagementNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品保部:">
              <SearchPerson v-model="formData.qualityNum" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="manager-operate__card">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="是否为首款产品:">
              <el-select v-model="formData.isFirst" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="T-R主方案:">
              <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="1">
                <el-button type="primary">文件上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否NRE核价:">
              <el-select v-model="formData.isNRE" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
    <div>
      <el-button @click="save" type="primary" size="large">保存录入</el-button>
    </div>
    <el-steps :active="1" direction="vertical">
      <el-step title="Step 1" description="Some description" />
      <el-step title="Step 2" description="Some description" />
      <el-step title="Step 3" description="Some description" />
    </el-steps>
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from "vue"
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { SearchPerson } from "@/components/SearchPerson"
import { PostManagement } from "@/api/partEntry"
import { UserInputInfo } from "./data.type"
// import { useStore } from "vuex"
// import { useRoute, useRouter } from "vue-router"
// import type { TabsPaneContext } from "element-plus"
// import { Edit, View as IconView } from "@element-plus/icons-vue"
const formData: UserInputInfo = reactive({
  electronicEngineerNum: "",
  engineeringTechnologyNum: "",
  fileId: 1,
  financeNum: "",
  // id?: number
  isFirst: "1",
  isNRE: "1",
  productionManagementNum: "",
  qualityNum: "",
  resourceManagementNum: "",
  structureEngineerNum: ""
})
const options = [
  {
    value: "1",
    label: "是"
  },
  {
    value: "0",
    label: "否"
  }
]
const save = async () => {
  console.log(formData)
  let res = await PostManagement(formData)
  console.log(res)
}
/**
 * 仓库
 */
// const store = useStore()
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
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
// defineExpose({
//   ...toRefs(data)
// })
</script>
<style scoped lang="scss">
.manager-operate {
  &__card {
    margin: 20px 0;
  }
}
</style>
