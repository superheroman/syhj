<template>
  <div class="dictionary">
    <div class="dictionary__btn-container">
      <el-form :model="data.searchForm" inline>
        <!-- <el-form-item label="字典名">
          <el-input v-model="data.searchForm.name" />
        </el-form-item> -->
        <el-form-item label="字典显示名">
          <el-input v-model="data.searchForm.displayName" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="data.searchForm.remark" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="data.dialogVisible = true">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="dictionary__btn-container">
      <el-button type="primary" @click="data.dialogVisible = true">创建字典</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" prop="id" />
      <el-table-column label="字典名" prop="name" />
      <el-table-column label="字典显示名" prop="displayName" />
      <el-table-column label="备注" prop="remark" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情列表</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dictionary__btn-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="data.total"
        v-model:currentPage="data.pageNo"
        @update:current-page="handlePageChange"
      />
    </div>
    <el-dialog v-model="data.dialogVisible" title="字典编辑">
      <el-form :model="data.editForm">
        <el-form-item label="字典名" :label-width="data.formLabelWidth">
          <el-input v-model="data.editForm.name" />
        </el-form-item>
        <el-form-item label="字典显示名" :label-width="data.formLabelWidth">
          <el-input v-model="data.editForm.displayName" />
        </el-form-item>
        <el-form-item label="备注" :label-width="data.formLabelWidth">
          <el-input v-model="data.editForm.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveDictionary">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
import { useRoute } from "vue-router"
import { addDictionary, editDictionary, deleteDictionary, getDictionary } from "@/api/dictionary"

import { ElMessage, ElMessageBox } from "element-plus"
interface dictionary {
  id?: number
  name: string
  displayName: string
  remark: string
}
interface tableRow extends dictionary {
  id: number
}
interface DictionarySearch {
  /**
   * 字典显示名
   */
  displayName: null | string
  /**
   * 字典名  获取字段列表的依据
   */
  name: null | string
  /**
   * 备注
   */
  remark?: null | string
  maxResultCount: number
  skipCount: number
  financeDictionaryId: number
}
/**
 * 路由对象
 */
const route = useRoute()
/**
 * 路由实例
 */
// const router = useRouter()
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
console.log(route)
const data = reactive({
  tableData: [],
  dialogVisible: false,
  formLabelWidth: "140px",
  searchForm: {
    // name: "",
    displayName: "",
    remark: ""
  },
  editForm: {
    id: -1,
    name: "",
    displayName: "",
    remark: ""
  },
  pageNo: 1,
  pageSize: 20,
  total: 0
})

const getList = async () => {
  let params: DictionarySearch = {
    displayName: "",
    remark: "",
    maxResultCount: 20,
    skipCount: 1,
    name: null,
    financeDictionaryId: 0
  }
  // params.name = data.searchForm.name
  params.displayName = data.searchForm.displayName
  params.remark = data.searchForm.remark
  params.skipCount = data.pageNo
  params.maxResultCount = data.pageSize

  let res: any = getDictionary(params)
  data.tableData = res.data.list
  data.total = res.data.totalCount
}
const handleEdit = (index: number, row: tableRow) => {
  console.log(index, row)
  data.editForm = row
  data.dialogVisible = true
  // console.log(data.page)
}
const handlePageChange = () => {
  getList()
}
const saveDictionary = async () => {
  let res: any = null
  if (!data.editForm.id) {
    res = await addDictionary(data.editForm)
  } else {
    res = await editDictionary(data.editForm)
  }

  if (res.code === "200") {
    data.editForm = {
      id: -1,
      name: "",
      displayName: "",
      remark: ""
    }
    ElMessage({
      type: "success",
      message: "保存成功"
    })
    getList()
  }
}
const handleDelete = (index: number, row: tableRow) => {
  console.log(index, row)
  ElMessageBox.confirm("确定删除该字典?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      let res: any = await deleteDictionary(row.id)
      if (res.code === "200") {
        ElMessage({
          type: "success",
          message: "删除成功"
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消成功"
      })
    })
}

const tableData: tableRow[] = [
  {
    id: 1,
    name: "Tom",
    displayName: "No. 189, Grove St, Los Angeles",
    remark: "123123"
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
.dictionary {
  &__btn-container {
    margin: 20px 0;
  }
}
</style>
