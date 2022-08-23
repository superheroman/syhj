<template>
  <div>
    <el-card>
      <el-form :model="data.form">
        <el-form-item label="标题">
          <el-input v-model="data.form.title" />
        </el-form-item>
        <el-form-item label="Tr主方案">
          <el-button @click="downLoad">点击下载附件</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">同意</el-button>
          <el-button>拒绝</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
import { getAuditFlowVersion, addPricingPanelTrProgrammeId, downloadFile } from "./service"
import useQueryData from "@/hook/useQueryData"
let { auditFlowId } = useQueryData()

// import { useRoute, useRouter } from "vue-router"
/**
 * 路由对象
//  */
// const route = useRoute()
// /**
//  * 路由实例
//  */
// const router = useRouter()
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({
  form: {
    title: "",
    tr: ""
  }
})
let trFileId: null | number = null
const save = async () => {
  if (trFileId) {
    let res: any = await addPricingPanelTrProgrammeId(auditFlowId.value, trFileId)
    console.log(res)
  }
}
const downLoad = async () => {
  if (trFileId) {
    let res: any = await downloadFile(trFileId)
    const blob = res
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = function () {
      let url = URL.createObjectURL(new Blob([blob]))
      let a = document.createElement("a")
      document.body.appendChild(a) //此处增加了将创建的添加到body当中
      a.href = url
      a.download = "tr主方案.xlsx"
      a.target = "_blank"
      a.click()
      a.remove() //将a标签移除
    }
  }
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  let res: any = await getAuditFlowVersion(auditFlowId.value)
  console.log(res)
  trFileId = res.result.solutionFileIdentifier
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})
</script>
<style scoped lang="scss"></style>
