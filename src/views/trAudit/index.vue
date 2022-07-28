<template>
  <div>
    <el-form :model="data.form">
      <el-form-item label="标题">
        <el-input v-model="data.form.title" />
      </el-form-item>
      <el-form-item label="Tr主方案">
        <el-button>点击查看</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">同意</el-button>
        <el-button>拒绝</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
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
