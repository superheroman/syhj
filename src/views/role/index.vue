<template>
  <div class="role">
    <div class="role__btn-container">
      <el-button type="primary" @click="data.dialogVisible = true">创建角色</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" prop="id" />
      <el-table-column label="name" prop="name" />
      <el-table-column label="displayName" prop="displayName" />
      <el-table-column label="isStatic" prop="isStatic" />
      <el-table-column label="isDefault" prop="isDefault" />
      <el-table-column label="creationTime" prop="creationTime" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="data.dialogVisible" title="角色信息">
      <el-form :model="data.roleForm">
        <el-form-item label="名称" :label-width="data.formLabelWidth">
          <el-input v-model="data.roleForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="显示名称" :label-width="data.formLabelWidth">
          <el-input v-model="data.roleForm.displayName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户名" :label-width="data.formLabelWidth">
          <el-input v-model="data.roleForm.normalizedName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" :label-width="data.formLabelWidth">
          <el-input v-model="data.roleForm.description" autocomplete="off" type="textarea" />
        </el-form-item>
        <el-form-item label="权限选择" :label-width="data.formLabelWidth">
          <el-select />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="data.dialogVisible = false">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
// import { useRoute, useRouter } from "vue-router"
import { ElMessage, ElMessageBox } from "element-plus"

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
const data = reactive({
  tableData: [],
  dialogVisible: false,
  formLabelWidth: "140px",
  roleForm: {
    id: "",
    name: "",
    displayName: "",
    normalizedName: "",
    description: "",
    grantedPermissions: []
  }
})

const handleEdit = (index: number, row: role) => {
  console.log(index, row)
  data.roleForm = row
  data.dialogVisible = true
}
const handleDelete = (index: number, row: role) => {
  console.log(index, row)
  ElMessageBox.confirm("确定删除该角色?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功"
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消成功"
      })
    })
}
interface role {
  id?: string
  name: string
  displayName: string
  normalizedName: string
  description: string
  grantedPermissions: Array<number>
}

const tableData: role[] = [
  {
    id: "1",
    name: "Tom",
    displayName: "No. 189, Grove St, Los Angeles",
    normalizedName: "222",
    description: "123123",
    grantedPermissions: []
  }
]
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
<style scoped lang="scss">
.role {
  &__btn-container {
    margin: 20px 0;
  }
}
</style>
