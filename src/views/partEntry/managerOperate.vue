<template>
  <div class="manager-operate">
    <el-form :model="formData">
      <el-card class="manager-operate__card">
        <h4>核价团队</h4>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="产品部-电子工程师:">
              <SearchDepartMentPerson v-model="formData.electronicEngineerId" roleName="产品开发部-电子工程师" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品部-结构工程师:">
              <SearchDepartMentPerson v-model="formData.structureEngineerId" roleName="产品开发部-结构工程师" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资源管理部-电子资源开发:">
              <SearchDepartMentPerson v-model="formData.resourceElecId" roleName="资源管理部-电子单价录入员" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资源管理部-结构子资源开发:">
              <SearchDepartMentPerson v-model="formData.resourceStructId" roleName="资源管理部-结构单价录入员" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工程技术部-损耗率录入员:">
              <SearchDepartMentPerson v-model="formData.engineerLossRateId" roleName="工程技术部-损耗率录入员" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工程技术部-工序工时录入员::">
              <SearchDepartMentPerson v-model="formData.engineerWorkHourId" roleName="工程技术部-工序工时录入员" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品质保证部-实验费用录入员:">
              <SearchDepartMentPerson v-model="formData.qualityBenchId" roleName="品质保证部-实验费用录入员" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品质保证部-检具费用录入员:">
              <SearchDepartMentPerson v-model="formData.qualityToolId" roleName="品质保证部-检具费用录入员" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="生产管理部-物流成本录入员:">
              <SearchDepartMentPerson v-model="formData.productManageId" roleName="生产管理部-物流成本录入员" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="manager-operate__card">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="是否为首款产品:">
              <el-select v-model="formData.isFirst" placeholder="Select">
                <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="TR-主方案:">
              <!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="1">
                <el-button type="primary">文件上传</el-button>
              </el-upload> -->
              <el-upload action="/api/services/app/FileCommonService/UploadFile" :on-success="handleSuccess" :limit="1">
                <el-button type="primary" v-havedone>文件上传</el-button>
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
    <el-button @click="save" type="primary" style="float: right" size="large" v-havedone>保存录入</el-button>
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from "vue"
import { reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { SearchDepartMentPerson } from "@/components/SearchDepartMentPerson"

import { PostManagement, getManagement } from "@/api/partEntry"
import type { UploadProps } from "element-plus"
import getQuery from "@/utils/getQuery"
import { ElMessage } from "element-plus"
let formData: any = reactive({
  fileId: null,
  isFirst: true,
  auditFlowId: null,
  electronicEngineerId: undefined,
  engineerLossRateId: undefined,
  engineerWorkHourId: undefined,
  id: 0,
  productId: null,
  productManageId: undefined,
  qualityBenchId: undefined,
  qualityToolId: undefined,
  resourceElecId: undefined,
  resourceStructId: undefined,
  structureEngineerId: undefined
})

const handleSuccess: UploadProps["onSuccess"] = (res: any) => {
  if (res.success) {
    formData.fileId = res.result.fileId
  }
}
const options = [
  {
    value: true,
    label: "是"
  },
  {
    value: false,
    label: "否"
  }
]
const save = async () => {
  let res: any = await PostManagement(formData)
  if (res.success) {
    ElMessage.success("提交成功")
  }
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
  let query = getQuery()
  if (query.auditFlowId) {
    formData.auditFlowId = Number(query.auditFlowId)
  }
  if (query.productId) {
    formData.productId = Number(query.productId)
  }
  if (query.right) {
    let res: any = await getManagement(query.auditFlowId)
    let keys = Object.keys(formData)
    keys.forEach((key) => {
      formData[key] = res.result[key]
    })
  }
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
