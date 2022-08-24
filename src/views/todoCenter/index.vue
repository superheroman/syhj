<template>
  <div class="todo-center">
    <el-card class="card">
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
    <el-card class="card">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="待办" name="upcoming">
          <el-table :data="auditFlowIdInfoList" style="width: 100%">
            <el-table-column type="expand">
              <template #default="scopeP">
                <el-table :data="scopeP.row.auditFlowRightDetailList">
                  <el-table-column label="流程界面" prop="processName" />
                  <el-table-column label="是否回退">
                    <template #default="scope">
                      {{ scope.row.isRetype ? "是" : "否" }}
                    </template>
                  </el-table-column>
                  <el-table-column label="跳转至流程">
                    <template #default="scope">
                      <el-button @click="clickToPage(scope.row, scopeP)">跳转</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="流程ID" prop="auditFlowId" />
            <el-table-column label="流程标题" prop="auditFlowTitle" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已办/查看" name="check">
          <el-table :data="auditFlowIdInfoListCheck" style="width: 100%">
            <el-table-column type="expand">
              <template #default="scopeP">
                <el-table :data="scopeP.row.auditFlowRightDetailList">
                  <el-table-column label="流程界面" prop="processName" />
                  <el-table-column label="是否回退">
                    <template #default="scope">
                      {{ scope.row.isRetype ? "是" : "否" }}
                    </template>
                  </el-table-column>
                  <el-table-column label="跳转至流程">
                    <template #default="scope">
                      <el-button @click="clickToPage(scope.row, scopeP)">跳转</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="流程ID" prop="auditFlowId" />
            <el-table-column label="流程标题" prop="auditFlowTitle" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from "vue"
import { ref, reactive, onBeforeMount, onMounted, watchEffect } from "vue"
import { savaNewAuditFlowInfo, getAllAuditFlowInfos } from "./service"
import urlMap from "./constant"
// import { useStore } from "vuex"
import { useRouter } from "vue-router"
import _ from "lodash"

// import getQuery from "@/utils/getQuery"

/**
 * 路由对象
 */
// const route = useRoute()
/**
 * 路由实例
 */
const router = useRouter()
const activeName = ref("upcoming")
const form = reactive({
  quoteProjectName: "",
  quoteProjectNumber: "",
  quoteVersion: "",
  remarks: ""
})
let auditFlowIds = ref([])
let auditFlowIdInfoList = ref([])
let auditFlowIdInfoListCheck = ref([])
// let userStorage = window.sessionStorage.getItem("user")
// let userInfo: any = userStorage ? JSON.parse(userStorage) : {}
const saveNew = async () => {
  let res: any = await savaNewAuditFlowInfo(form)
  if (res.success) {
    console.log(res.result)
    // geAuditFlowIds()
  }
}

const clickToPage = (row: any, scopeP: any) => {
  router.push({
    path: `${urlMap[row.processIdentifier as keyof typeof urlMap]}`,
    query: {
      auditFlowId: scopeP.row.auditFlowId
    }
  })
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
  // geAuditFlowIds()
  // let a = getQuery()

  // getAuditFlowIds()
  // getProcessRights()

  let res: any = await getAllAuditFlowInfos()
  // auditFlowIdInfoList.value = res.result || [
  //   {
  //     auditFlowId: 1,
  //     auditFlowTitle: "测试流程",
  //     auditFlowRightDetailList: [
  //       {
  //         processName: "123",
  //         processIdentifier: "231",
  //         isRetype: "222",
  //         right: "222233"
  //       }
  //     ]
  //   }
  // ]
  // 待办
  auditFlowIdInfoList.value = _.cloneDeep(res.result)
  auditFlowIdInfoList.value.forEach((item: any) => {
    item.auditFlowRightDetailList = item.auditFlowRightDetailList.filter((i: any) => {
      return i.right === 1
    })
  })
  // 已办
  auditFlowIdInfoListCheck.value = _.cloneDeep(res.result)
  auditFlowIdInfoListCheck.value.forEach((item: any) => {
    item.auditFlowRightDetailList = item.auditFlowRightDetailList.filter((i: any) => {
      return i.right === 2
    })
  })
  // console.log(res)
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
  .card {
    margin: 20px 0;
  }
}
</style>
