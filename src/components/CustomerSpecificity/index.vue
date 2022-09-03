<template>
  <div>
    <el-form inline>
      <el-form-item label="客户特殊性要求">
        <el-input v-model="text" type="textarea" />
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="downLoadSor">点击下载SOR附件</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
import { useRoute } from "vue-router"
import { getSorFile, getSorByAuditFlowId } from "./service"

/**
 * 路由对象
 */
const route = useRoute()
/**
 * 路由实例
 */
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({})
const text = ref("")
let sorFileName = ""
const downLoadSor = async () => {
  let { auditFlowId } = route.query
  let res: any = await getSorFile(auditFlowId)
  const blob = res
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = function () {
    let url = URL.createObjectURL(new Blob([blob]))
    let a = document.createElement("a")
    document.body.appendChild(a) //此处增加了将创建的添加到body当中
    a.href = url
    a.download = sorFileName
    a.target = "_blank"
    a.click()
    a.remove() //将a标签移除
  }
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  let { auditFlowId } = route.query
  try {
    const res: any = await getSorByAuditFlowId(auditFlowId)
    text.value = res.result.customerSpecialRequest
    sorFileName = res.result.sorFileName
  } catch (err: any) {
    console.log(err)
  }
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
