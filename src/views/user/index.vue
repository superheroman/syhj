<template>
  <div class="user">
    <div class="user__btn-container">
      <el-form :model="data.searchForm" inline>
        <el-form-item label="关键字">
          <el-input v-model="data.searchForm.keyword" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user__btn-container user__flex">
      <el-button type="primary" @click="data.dialogVisible = true">创建用户</el-button>
      <el-button type="primary" @click="downLoadTemplate">用户导入模板下载</el-button>
      <el-upload
        action="/api/services/app/User/ExcelImport"
        :on-success="handleSuccess"
        :show-file-list="false"
        style="margin-left: 20px"
        name="excle"
      >
        <el-button type="primary">用户导入</el-button>
      </el-upload>
    </div>
    <el-table :data="data.tableData">
      <el-table-column label="id" prop="id" />
      <!-- <el-table-column label="用户名" prop="userName" /> -->
      <el-table-column label="姓名" prop="name" />
      <!-- <el-table-column label="surname" prop="surname" /> -->
      <!-- <el-table-column label="邮箱" prop="emailAddress" /> -->
      <el-table-column label="激活状态" prop="isActive">
        <template #default="scope">
          <el-switch
            v-model="scope.row.isActive"
            size="large"
            active-text="激活"
            inactive-text="关闭"
            @change="(val) => activeChange(val, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="roleNames" />
      <el-table-column label="操作" width="300" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" @click="handlePsEdit(scope.$index, scope.row)">密码修改</el-button>
          <el-button size="small" @click="handlePsResetEdit(scope.$index, scope.row)">重置密码</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dictionary__btn-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="data.total"
        :page-size="data.pageSize"
        v-model:currentPage="data.pageNo"
        @update:current-page="handlePageChange"
      />
    </div>
    <el-dialog v-model="data.dialogVisible" title="用户信息" @close="clearForm">
      <el-form :model="data.userForm" ref="userForm">
        <el-form-item label="名字" :label-width="data.formLabelWidth">
          <el-input v-model="data.userForm.name" />
        </el-form-item>
        <el-form-item label="职位" :label-width="data.formLabelWidth">
          <el-input v-model="data.userForm.position" />
        </el-form-item>
        <!-- <el-form-item label="部门" :label-width="data.formLabelWidth">
          <el-input v-model="data.userForm.departmentId" />
        </el-form-item> -->
        <!-- <el-form-item label="姓" :label-width="data.formLabelWidth">
          <el-input v-model="data.userForm.surname" />
        </el-form-item>
        <el-form-item label="职位" :label-width="data.formLabelWidth">
          <el-input v-model="data.userForm.position" />
        </el-form-item> -->
        <el-form-item label="工号" :label-width="data.formLabelWidth">
          <el-input v-model="data.userForm.number" />
        </el-form-item>
        <!-- <el-form-item label="用户名" :label-width="data.formLabelWidth">
          <el-input v-model="data.userForm.userName" />
        </el-form-item> -->
        <!-- <el-form-item label="邮箱" :label-width="data.formLabelWidth">
          <el-input v-model="data.userForm.emailAddress" />
        </el-form-item> -->
        <el-form-item label="密码" :label-width="data.formLabelWidth" v-if="!data.isEdit">
          <el-input v-model="data.userForm.password" />
        </el-form-item>
        <el-form-item label="角色选择" :label-width="data.formLabelWidth">
          <el-select v-model="data.userForm.roleNames" multiple>
            <el-option :value="item.name" v-for="item in data.roleOption" :key="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" :label-width="data.formLabelWidth">
          <!-- <el-cascader v-model="data.userForm.departmentId" :options="data.departmentOptions" /> -->
          <el-select v-model="data.userForm.departmentId">
            <el-option v-for="item in data.departmentOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveUser">保存</el-button>
          <el-button @click="resetForm(userForm)">重置</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="data.psVisible" title="修改密码">
      <el-form :model="data.psForm">
        <el-form-item label="旧密码" :label-width="data.formLabelWidth">
          <el-input v-model="data.psForm.currentPassword" type="password" />
        </el-form-item>
        <el-form-item label="新密码" :label-width="data.formLabelWidth">
          <el-input v-model="data.psForm.newPassword" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.psVisible = false">取消</el-button>
          <el-button type="primary" @click="updatePassword">保存</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="data.psResetVisible" title="重置密码">
      <el-form :model="data.psResetForm">
        <el-form-item label="管理员密码" :label-width="data.formLabelWidth">
          <el-input v-model="data.psResetForm.adminPassword" type="password" />
        </el-form-item>
        <el-form-item label="用户新密码" :label-width="data.formLabelWidth">
          <el-input v-model="data.psResetForm.newPassword" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.psResetVisible = false">取消</el-button>
          <el-button type="primary" @click="resetPassword">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect, ref } from "vue"
// import { useRoute, useRouter } from "vue-router"
import { ElMessage, ElMessageBox } from "element-plus"
import { User, UserParams } from "./data.type"
import type { UploadProps } from "element-plus"
// import { updateUser, deleteUser, activateUser, deActivateUser, changePassword, changePasswordAd } from "@/api/user"
import {
  createUser,
  updateUser,
  deleteUser,
  activateUser,
  deActivateUser,
  getUserList,
  changePassword,
  changePasswordAd,
  DownloadFile,
  RoleParams,
  getRoleList
} from "./service"
import { getRootDepartment } from "@/api/departmentManage"
import type { FormInstance } from "element-plus"
const userForm = ref<FormInstance>()
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
  searchForm: {
    keyword: ""
  },
  pageNo: 1,
  pageSize: 20,
  maxResultCount: 20,
  total: 0,
  rowSelect: {} as User,
  isEdit: false,
  userForm: {
    name: "",
    surname: "",
    position: "",
    number: "",
    userName: "",
    emailAddress: "",
    isActive: true,
    roleNames: [],
    password: "",
    departmentId: ""
  } as any,
  roleOption: [] as any[],
  psForm: {
    currentPassword: "",
    newPassword: ""
  },
  psResetForm: {
    adminPassword: "",
    newPassword: ""
  },
  departmentOptions: [] as any[]
})
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
  data.isEdit = true
  data.userForm = row
  data.dialogVisible = true
}
const saveUser = async () => {
  let res: any = null
  if (data.isEdit) {
    res = await updateUser(data.userForm)
  } else {
    res = await createUser(data.userForm)
  }
  if (res.success) {
    ElMessage({
      type: "success",
      message: "保存成功"
    })
    data.dialogVisible = false
  }
}
const handlePsEdit = (index: number, row: User) => {
  console.log(index, row)
  data.psVisible = true
}
const clearForm = () => {
  data.isEdit = false
  data.userForm = {
    name: "",
    surname: "",
    position: "",
    number: "",
    userName: "",
    emailAddress: "",
    isActive: true,
    roleNames: [],
    password: ""
  }
}
const handlePsResetEdit = (index: number, row: User) => {
  console.log(index, row)
  data.rowSelect = row
  data.psResetVisible = true
}

const handleDelete = (index: number, row: User) => {
  console.log(index, row)
  ElMessageBox.confirm("确定删除该用户?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      let res = await deleteUser(row.id)
      console.log(res)
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
const handlePageChange = () => {
  getList()
}
const updatePassword = async () => {
  let res: any = await changePassword(data.psForm)
  if (res.success) {
    data.psVisible = false
  }
}
const resetPassword = async () => {
  let params = Object.assign(
    {
      userId: data.rowSelect.id
    },
    data.psResetForm
  )

  let res: any = await changePasswordAd(params)
  if (res.success) {
    data.psVisible = false
  }
}
const search = () => {
  getList()
}
const getList = async () => {
  let params: UserParams = {
    keyword: "",
    maxResultCount: 20,
    skipCount: 0
  }
  params.keyword = data.searchForm.keyword
  params.skipCount = (data.pageNo - 1) * data.pageSize
  params.maxResultCount = data.pageSize

  let res: any = await getUserList(params)
  // console.log(res)
  data.tableData = res.result.items
  data.total = res.result.totalCount
}
const getRoleOption = async () => {
  let params: RoleParams = {
    keyword: "",
    maxResultCount: 100,
    skipCount: 0
  }

  let res: any = await getRoleList(params)
  data.roleOption = res.result.items
}
const activeChange = (val: boolean, row: User) => {
  if (val) {
    activateUser(row.id)
  } else {
    deActivateUser(row.id)
  }
}
const handleSuccess: UploadProps["onSuccess"] = (res: any) => {
  console.log(res)
  if (res.result.isSuccess) {
    ElMessage({
      message: res.result.message,
      type: "success"
    })
    getList()
  } else {
    ElMessage({
      message: res.result.message,
      type: "error"
    })
  }
}
const downLoadTemplate = async () => {
  let res: any = await DownloadFile()
  const blob = res
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = function () {
    let url = URL.createObjectURL(new Blob([blob]))
    let a = document.createElement("a")
    document.body.appendChild(a) //此处增加了将创建的添加到body当中
    a.href = url
    a.download = "模板文件.xlsx"
    a.target = "_blank"
    a.click()
    a.remove() //将a标签移除
  }
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  getList()
  let res: any = await getRootDepartment()
  res.result.items.forEach((item: any) => {
    data.departmentOptions.push(item)
  })
  getRoleOption()
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
  &__flex {
    display: flex;
  }
}
</style>
