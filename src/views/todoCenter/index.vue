<template>
  <div class="todo-center">
    <!-- <el-button type="primary">工序添加</el-button> -->
    <!-- <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table> -->
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
import { ref, onBeforeMount, onMounted, watchEffect } from "vue"

// import { useStore } from "vuex"
// import { useRoute, useRouter } from "vue-router"

import type { TabsPaneContext } from "element-plus"
// import { Edit, View as IconView } from "@element-plus/icons-vue"

const activeName = ref("first")

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
