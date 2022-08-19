<template>
  <div class="manager-operate">
    <el-form :model="formData">
      <el-card class="manager-operate__card">
        <h4>核价团队</h4>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="产品部-电子工程师:">
              <SearchPerson v-model="formData.electronicEngineerId" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品部-结构工程师:">
              <SearchPerson v-model="formData.structureEngineerId" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资源管理部-电子资源开发:">
              <SearchPerson v-model="formData.resourceElecId" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资源管理部-结构子资源开发:">
              <SearchPerson v-model="formData.resourceStructId" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工程技术部-损耗率录入员:">
              <SearchPerson v-model="formData.engineerLossRateId" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工程技术部-工序工时录入员::">
              <SearchPerson v-model="formData.engineerWorkHourId" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品质保证部-实验费用录入员:">
              <SearchPerson v-model="formData.qualityBenchId" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品质保证部-检具费用录入员:">
              <SearchPerson v-model="formData.qualityToolId" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="生产管理部-物流成本录入员:">
              <SearchPerson v-model="formData.productManageId" />
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
              <!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="1">
                <el-button type="primary">文件上传</el-button>
              </el-upload> -->
              <el-upload action="api/services/app/FileCommonService/UploadFile" :on-success="handleSuccess" :limit="1">
                <el-button type="primary">文件上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="是否NRE核价:">
              <el-select v-model="formData.isNRE" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-card>
    </el-form>
    <el-button @click="save" type="primary" style="float: right" size="large">保存录入</el-button>
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from "vue"
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { SearchPerson } from "@/components/SearchPerson"
import { PostManagement } from "@/api/partEntry"
import { UserInputInfo } from "./data.type"
import type { UploadProps } from "element-plus"

// import { useStore } from "vuex"
// import { useRoute, useRouter } from "vue-router"
// import type { TabsPaneContext } from "element-plus"
// import { Edit, View as IconView } from "@element-plus/icons-vue"
const formData: UserInputInfo = reactive({
  // electronicEngineerNum: "",
  // engineeringTechnologyNum: "",
  fileId: null,
  financeNum: "",
  isFirst: "是",
  isNRE: "是",
  // productionManagementNum: "",
  // qualityNum: "",
  // resourceManagementNum: "",
  // structureEngineerNum: "",

  auditFlowId: 1,
  electronicEngineerId: undefined,
  engineerLossRateId: undefined,
  engineerWorkHourId: undefined,

  id: 0,

  product: null,
  productId: 1,
  productManageId: undefined,
  qualityBenchId: undefined,
  qualityToolId: undefined,
  resourceElecId: undefined,
  resourceStructId: undefined,
  structureEngineerId: undefined
})
// interface user {
//   department?: null | string
//   id: number
//   position?: null | string
//   userName?: string
//   userNum?: null | string
// }
const handleSuccess: UploadProps["onSuccess"] = (res: any) => {
  console.log(res)
  if (res.success) {
    formData.fileId = res.result.fileId
  }
}
// const users = reactive({
//   electronicEngineer: [] as user[],
//   structureEngineer: [] as user[],
//   resourceManagement: [] as user[],
//   engineeringTechnology: [] as user[],
//   finance: [] as user[],
//   productionManagement: [] as user[],
//   quality: [] as user[]
// })
const options = [
  {
    value: "是",
    label: "是"
  },
  {
    value: "否",
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
onMounted(async () => {
  // let res: any = await GetUserInput()
  // let {
  //   electronicEngineer,
  //   structureEngineer,
  //   resourceManagement,
  //   engineeringTechnology,
  //   finance,
  //   productionManagement,
  //   quality
  // } = res.result
  // users.electronicEngineer = electronicEngineer
  // users.structureEngineer = structureEngineer
  // users.resourceManagement = resourceManagement
  // users.engineeringTechnology = engineeringTechnology
  // users.finance = finance
  // users.productionManagement = productionManagement
  // users.quality = quality
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
