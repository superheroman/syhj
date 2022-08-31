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
import { getSorFile } from "./service"
import { downloadFileExcel } from "@/utils/index"

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
const downLoadSor = async () => {
  let { auditFlowId } = route.query
  try {
    const res: any = await getSorFile(auditFlowId)
    downloadFileExcel(res, "SOR文件")
    // console.log(result, "产品核价表下载")
  } catch (err: any) {
    console.log(err, "[ SOR文件下载失败 ]")
  }
}
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
<style scoped lang="scss"></style>
