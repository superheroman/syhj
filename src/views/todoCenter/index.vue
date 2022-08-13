<template>
  <div class="todo-center">
    <el-card>
      <el-form :model="form" inline>
        <el-form-item label="核报价项目名称">
          <el-input v-model="form.quoteProjectName" />
        </el-form-item>
        <el-form-item label="核报价项目代码">
          <el-input v-model="form.quoteProjectNumber" />
        </el-form-item>
        <el-form-item label="核报价流程版本">
          <el-input v-model="form.quoteVersion" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks" type="textarea" />
        </el-form-item>
      </el-form>
      <el-button @click="saveNew" type="primary">新建</el-button>
      <div>
        <span>已存在的auditFlowIds:</span>
        <div v-for="number in auditFlowIds" :key="number">{{ number }}</div>
      </div>
    </el-card>

    <div class="todo-center__body">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="待办" name="first">
          <div>
            <el-link href="https://element.eleme.io" target="_blank"
              >default
              <el-icon class="el-icon--right"><icon-view /></el-icon>
            </el-link>
          </div>

          <el-link type="primary">primary</el-link>
          <el-link type="success">success</el-link>
          <el-link type="warning">warning</el-link>
          <el-link type="danger">danger</el-link>
          <el-link type="info">info</el-link>
        </el-tab-pane>
        <el-tab-pane label="转发" name="second">Config</el-tab-pane>
        <el-tab-pane label="抄送" name="third">Role</el-tab-pane>
        <el-tab-pane label="已办" name="fourth">Task</el-tab-pane>
        <el-tab-pane label="跟踪" name="fifth">Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from "vue"
import { ref, reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { savaNewAuditFlowInfo, getAllAuditFlowIds } from "./service"
// import { useStore } from "vuex"
// import { useRoute, useRouter } from "vue-router"

import type { TabsPaneContext } from "element-plus"
import getQuery from "@/utils/getQuery"

const activeName = ref("first")
const form = reactive({
  quoteProjectName: "",
  quoteProjectNumber: "",
  quoteVersion: "",
  remarks: ""
})
let auditFlowIds = ref([])
const saveNew = async () => {
  let res: any = await savaNewAuditFlowInfo(form)
  if (res.success) {
    console.log(res.result)
    geAuditFlowIds()
  }
}
const geAuditFlowIds = async () => {
  let res: any = await getAllAuditFlowIds()
  auditFlowIds.value = res.result
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
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
  geAuditFlowIds()
  let a = getQuery()
  console.log(a, "query")
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
.todo-center {
  &__body {
    margin: 20px 0;
    background: #fff;
    height: 500px;
  }
}
</style>
