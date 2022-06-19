<template>
  <div class="user">
    <div class="user__btn-container">
      <!-- <el-button type="primary" @click="data.dialogVisible = true">创建角色</el-button> -->
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" prop="id" />
      <el-table-column label="用户名" prop="userName" />
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="surname" prop="surname" />
      <el-table-column label="邮箱" prop="emailAddress" />
      <el-table-column label="激活状态" prop="isActive">
        <template #default="scope">
          <el-switch v-model="scope.row.isActive" size="large" active-text="激活" inactive-text="关闭" />
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="roleNames" />
      <el-table-column label="密码" prop="password" />
      <el-table-column label="操作" width="300" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" @click="handlePsEdit(scope.$index, scope.row)">密码修改</el-button>
          <el-button size="small" @click="handlePsResetEdit(scope.$index, scope.row)">重置密码</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="data.dialogVisible" title="用户信息">
      <el-form :model="data.userForm">
        <el-form-item label="姓名" :label-width="data.formLabelWidth">
          <el-input v-model="data.userForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="surname" :label-width="data.formLabelWidth">
          <el-input v-model="data.userForm.surname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户名" :label-width="data.formLabelWidth">
          <el-input v-model="data.userForm.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="data.formLabelWidth">
          <el-input v-model="data.userForm.emailAddress" />
        </el-form-item>
        <el-form-item label="角色选择" :label-width="data.formLabelWidth">
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
    <el-dialog v-model="data.psVisible" title="修改密码">
      <el-form :model="data.psForm">
        <el-form-item label="旧密码" :label-width="data.formLabelWidth">
          <el-input v-model="data.psForm.currentPassword" autocomplete="off" type="password" />
        </el-form-item>
        <el-form-item label="新密码" :label-width="data.formLabelWidth">
          <el-input v-model="data.psForm.newPassword" autocomplete="off" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.psVisible = false">取消</el-button>
          <el-button type="primary" @click="data.psVisible = false">保存</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="data.psResetVisible" title="重置密码">
      <el-form :model="data.psResetForm">
        <el-form-item label="管理员密码" :label-width="data.formLabelWidth">
          <el-input v-model="data.psResetForm.adminPassword" autocomplete="off" type="password" />
        </el-form-item>
        <el-form-item label="新密码" :label-width="data.formLabelWidth">
          <el-input v-model="data.psResetForm.newPassword" autocomplete="off" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.psResetVisible = false">取消</el-button>
          <el-button type="primary" @click="data.psResetVisible = false">保存</el-button>
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
  psVisible: false,
  psResetVisible: false,
  formLabelWidth: "140px",
  userForm: {
    id: "1",
    name: "Tom",
    surname: "No. 189, Grove St, Los Angeles",
    userName: "222",
    emailAddress: "123123",
    isActive: true,
    roleNames: "超级管理员",
    password: "123456"
  },
  psForm: {
    currentPassword: "",
    newPassword: ""
  },
  psResetForm: {
    adminPassword: "",
    newPassword: ""
  }
})

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
  data.userForm = row
  data.dialogVisible = true
}
const handlePsEdit = (index: number, row: User) => {
  console.log(index, row)
  data.psVisible = true
}
const handlePsResetEdit = (index: number, row: User) => {
  console.log(index, row)
  data.psResetVisible = true
}

const handleDelete = (index: number, row: User) => {
  console.log(index, row)
  ElMessageBox.confirm("确定删除该用户?", "警告", {
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
interface User {
  id?: string
  name: string
  surname: string
  userName: string
  emailAddress: string
  isActive: Boolean
  roleNames: string
  password: string
}

const tableData: User[] = [
  {
    id: "1",
    name: "Tom",
    surname: "No. 189, Grove St, Los Angeles",
    userName: "222",
    emailAddress: "123123",
    isActive: true,
    roleNames: "超级管理员",
    password: "123456"
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
.user {
  &__btn-container {
    margin: 20px 0;
  }
}
</style>
